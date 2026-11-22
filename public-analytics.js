/* KVN CLOTHING — public, aggregated Open Cloud Analytics bridge.
 * PRIVACY: No private metrics are released unless selected in PUBLIC_ANALYTICS_METRICS.
 * The API secret is ONLY used here, in Cloudflare server runtime (never in HTML/JSON).
 * Roblox references: https://create.roblox.com/docs/cloud/guides/analytics
 */
export const ANALYTICS_CATALOG = Object.freeze({
  DailyActiveUsers: { label:'Daily active users', short:'DAU', unit:'players', dp:0, category:'Acquisition' },
  Visits: { label:'Daily sessions', short:'Sessions', unit:'sessions', dp:0, category:'Engagement' },
  AverageSessionLengthMinutes: { label:'Average session duration', short:'Session time', unit:'min', dp:1, category:'Engagement' },
  AveragePlayTimeMinutesPerDAU: { label:'Average daily playtime', short:'Playtime / DAU', unit:'min', dp:1, category:'Engagement' },
  ForwardD1Retention: { label:'Day 1 retention (raw API value)', short:'D1 retention', unit:'API value', dp:3, category:'Retention' },
  ForwardD7Retention: { label:'Day 7 retention (raw API value)', short:'D7 retention', unit:'API value', dp:3, category:'Retention' }
});
const PLACE_ID = '134944031090971';
const BASE = 'https://apis.roblox.com/analytics-query-api/';
const TTL = 10 * 60 * 1000;
const cache = new Map();
let universeCache = null;

function selectedMetrics(env) {
  const raw = typeof env.PUBLIC_ANALYTICS_METRICS === 'string' ? env.PUBLIC_ANALYTICS_METRICS : '';
  const selected = [...new Set(raw.split(',').map(x => x.trim()).filter(x => Object.prototype.hasOwnProperty.call(ANALYTICS_CATALOG, x)))];
  return selected.slice(0, 6);
}
function output(body, code = 200) {
  return Response.json(body, {
    status: code,
    headers: {
      'Cache-Control': 'public, max-age=120',
      'X-Content-Type-Options': 'nosniff'
    }
  });
}
async function getUniverse(env, fetcher) {
  const override = typeof env.ROBLOX_UNIVERSE_ID === 'string' ? env.ROBLOX_UNIVERSE_ID.trim() : '';
  if (/^[0-9]{4,20}$/.test(override)) return override;
  if (universeCache) return universeCache;
  const response = await fetcher('https://apis.roblox.com/universes/v1/places/' + PLACE_ID + '/universe', {
    headers: { Accept:'application/json' }, signal:AbortSignal.timeout(8000)
  });
  if (!response.ok) throw new Error('universe-lookup-failed');
  const result = await response.json();
  if (!/^\d+$/.test(String(result.universeId || ''))) throw new Error('universe-lookup-invalid');
  universeCache = String(result.universeId);
  return universeCache;
}
/* Only publish safe, fixed status categories — never the API key or Roblox's raw response. */
function failureReason(error) {
  const code=String(error?.message||'');
  if (code === 'universe-lookup-failed' || code === 'universe-lookup-invalid') return 'universe_lookup';
  if (/^analytics-(upstream|poll)-status-401$/.test(code)) return 'key_or_scope';
  if (/^analytics-(upstream|poll)-status-403$/.test(code)) return 'creator_access';
  if (/^analytics-upstream-status-(400|404|422)$/.test(code) || code === 'analytics-query-rejected-2001') return 'request_invalid';
  if (/^analytics-upstream-status-429$/.test(code) || code === 'analytics-query-rejected-3000') return 'rate_limited';
  if (/^analytics-upstream-status-5\d\d$/.test(code) || /^analytics-poll-status-5\d\d$/.test(code)) return 'upstream';
  if (code === 'invalid-operation-path' || code === 'invalid-analytics-payload' || code === 'invalid-aggregate-series') return 'invalid_response';
  return 'upstream';
}
function publicReasonMessage(reason){
  const labels={
    key_or_scope:'Roblox geeft HTTP 401 terug. Controleer of de Cloudflare Secret geldig is en deze Universe de juiste universe.analytics:read-bevoegdheid heeft.',
    creator_access:'Roblox geeft HTTP 403 terug. Controleer of de sleutel voor deze experience de permission universe.analytics:read in het systeem universe-analytics heeft, en of de sleuteleigenaar analytics mag bekijken.',
    authorization:'Roblox weigert toegang tot analytics. Controleer sleutel, Universe en groepsrechten.',
    request_invalid:'Roblox heeft de analytics-query afgewezen. Controleer of de experience en metric beschikbaar zijn.',
    universe_lookup:'De juiste Universe ID kon niet worden opgehaald. Controleer de Universe ID in Roblox Creator Dashboard.',
    rate_limited:'Roblox heeft tijdelijk een aanvraaglimiet bereikt. De cijfers worden later opnieuw geprobeerd.',
    upstream:'De Roblox Analytics API is tijdelijk niet bereikbaar.',
    invalid_response:'Roblox leverde een onverwacht analytics-antwoord.',
    no_data:'Roblox heeft nog geen definitieve gegevens voor de geselecteerde periode.',
    pending:'Roblox verwerkt deze query nog.'
  };
  return labels[reason]||labels.upstream;
}
async function loadOperation(metric, universeId, key, now, fetcher) {
  const midnight = new Date(now);
  midnight.setUTCHours(0, 0, 0, 0);
  const endTime = midnight.toISOString();
  const startTime = new Date(midnight.getTime()-31*86400000).toISOString();
  const path = 'v1/universes/' + universeId + '/metrics';
  const headers = { 'x-api-key':key, 'Content-Type':'application/json', Accept:'application/json' };
  const response = await fetcher(BASE+path,{
    method:'POST', headers, signal:AbortSignal.timeout(12000),
    body:JSON.stringify({ metric, granularity:'OneDay', startTime, endTime })
  });
  if (!response.ok) throw new Error('analytics-upstream-status-'+response.status);
  let result = await response.json();
  if (!result || typeof result !== 'object') throw new Error('invalid-analytics-payload');

  // Roblox may return a long-running operation. Only follow validated Roblox paths.
  for (let attempt=0;attempt<3&&result.done===false;attempt++){
    const operationPath=result.path;
    const safePath = 'v1/universes/'+universeId+'/operations/metrics/';
    if (typeof operationPath !== 'string' ||
      !operationPath.startsWith(safePath) ||
      !/^v1\/universes\/[0-9]+\/operations\/metrics\/[A-Za-z0-9_-]+$/.test(operationPath))
      throw new Error('invalid-operation-path');
    const poll=await fetcher(BASE+operationPath,{
      method:'GET',
      headers:{'x-api-key':key,Accept:'application/json'},
      signal:AbortSignal.timeout(12000)
    });
    if (!poll.ok) throw new Error('analytics-poll-status-'+poll.status);
    result=await poll.json();
  }
  if (result.done===false) return {state:'pending',reason:'pending',points:[],latest:null};
  if (result.error) throw new Error('analytics-query-rejected-'+(Number.isInteger(result.error.code)?result.error.code:'unknown'));
  if (result.done!==true||!Array.isArray(result.response?.values))
    throw new Error('invalid-analytics-payload');

  // No dimension breakdown is requested. The single aggregate series may omit breakdowns.
  const series=result.response.values.filter(x=>x && (x.breakdowns==null ||
    (Array.isArray(x.breakdowns) && x.breakdowns.length===0)));
  if (series.length!==1 || !Array.isArray(series[0].dataPoints))
    throw new Error('invalid-aggregate-series');
  const points=series[0].dataPoints.filter(p=>p && typeof p.time==='string'
    && typeof p.value==='number' && Number.isFinite(p.value)
    && p.value>=0 && !Array.isArray(p.stringValues)
    && (p.status == null || p.status==='Valid')
    && Number.isFinite(Date.parse(p.time)) && Date.parse(p.time)>=Date.parse(startTime)
    && Date.parse(p.time)<Date.parse(endTime)
  ).map(p=>({date:p.time.slice(0,10),value:p.value}))
    .sort((a,b)=>a.date.localeCompare(b.date)).slice(-31);
  return {
    state: points.length?'ready':'unavailable',
    ...(points.length?{}:{reason:'no_data'}),
    points,latest:points.length?points[points.length-1]:null
  };
}
export async function publicAnalyticsResponse(env,fetcher=fetch,now=Date.now()){
  const selected=selectedMetrics(env||{});
  if (!selected.length) return output({
    state:'disabled',metrics:[],note:'Er zijn geen geaggregeerde statistieken geselecteerd.'
  });
  if (!env.ROBLOX_ANALYTICS_API_KEY) return output({
    state:'not_configured',metrics:[],
    note:'De Cloudflare Secret ontbreekt. Er worden geen privéstatistieken gepubliceerd.'
  });
  // In-memory cache avoids querying Roblox on every visitor's page load.
  const cachedKey=selected.join('|')+'|'+String(env.ROBLOX_UNIVERSE_ID||'');
  const hit=cache.get(cachedKey);
  if(hit&&hit.until>now) return output(hit.body);
  try{
    const universeId=await getUniverse(env,fetcher);
    const results=await Promise.allSettled(selected.map(
      metric=>loadOperation(metric,universeId,env.ROBLOX_ANALYTICS_API_KEY,now,fetcher)
    ));
    const metrics=selected.map((id,i)=>{
      const info=ANALYTICS_CATALOG[id];
      if(results[i].status==='fulfilled')return {id,...info,...results[i].value};
      const reason=failureReason(results[i].reason);
      return {id,...info,state:'unavailable',reason,points:[],latest:null};
    });
    const ready=metrics.filter(m=>m.state==='ready').length;
    const pending=metrics.filter(m=>m.state==='pending').length;
    const state=ready===selected.length?'ready':
      ready?'partial':pending?'pending':'unavailable';
    const reasons=[...new Set(metrics.filter(m=>m.state!=='ready').map(m=>m.reason).filter(Boolean))];
    const body={
      state,metrics,publishedAt:new Date(now).toISOString(),
      source:'Roblox Open Cloud Analytics Query API',
      window:'Last 31 complete UTC days (latest yesterday)',
      // Safe diagnostics: no API key, universe ID, account data, or raw error messages.
      ...(reasons.length?{reason:reasons.length===1?reasons[0]:'mixed',
        note:publicReasonMessage(reasons[0])}: {})
    };
    cache.set(cachedKey,{body,until:now+(ready?TTL:45000)});
    return output(body);
  }catch(err){
    const reason=failureReason(err);
    return output({
      state:'unavailable',reason,metrics:[],
      note:publicReasonMessage(reason)
    },503);
  }
}
export const publicAnalyticsStyles = String.raw`
#officialMetrics{scroll-margin-top:100px}
.official-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.official-card{min-width:0;background:linear-gradient(152deg,#112b5b,#091a38 75%);border:1px solid #285085;border-radius:19px;padding:24px;box-shadow:inset 0 1px #a6d9ff10;transition:transform .25s,border-color .25s}
.official-card:hover{transform:translateY(-4px);border-color:#5f9af6}
.official-card small{display:block;color:#83b9ef;font-size:10px;letter-spacing:1.3px;font-weight:800;text-transform:uppercase}
.official-card strong{display:block;font:700 clamp(26px,3vw,42px) 'Space Grotesk',system-ui,sans-serif;color:#ecf9ff;letter-spacing:-1px;margin:13px 0 6px;font-variant-numeric:tabular-nums}
.official-card p{color:#90add1;font-size:12px;line-height:1.7}
.official-card svg{display:block;width:100%;height:75px;margin:12px 0 0}
.official-card time{color:#72bbed;font-size:10px}
.official-placeholder{background:linear-gradient(110deg,#0c2149,#132d5c,#0c2149);background-size:220% 100%;animation:officialGlow 2s linear infinite;border-radius:10px;height:42px;width:60%;margin:16px 0}
.official-message{border:1px solid #295080;background:#0e2245;border-radius:16px;padding:25px;color:#acccef;line-height:1.8}
.official-message b{color:#edfaff}
.official-head{display:flex;justify-content:space-between;align-items:end;gap:15px;margin-bottom:23px}
.official-sub{color:#9bb4d5;font-size:13px;line-height:1.8;max-width:650px}
@keyframes officialGlow{to{background-position-x:-220%}}
@media(max-width:950px){.official-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:680px){.official-grid{grid-template-columns:1fr}.official-head{display:block}.official-card{padding:20px}}
@media(prefers-reduced-motion:reduce){.official-placeholder{animation:none}.official-card{transition:none}}
`;
export const publicAnalyticsMarkup = String.raw`
<section class="wrap" id="officialMetrics" aria-label="Geselecteerde officiële Roblox statistieken">
 <div class="bar reveal"><div><div class="sec-label">04 / AUTHORIZED ANALYTICS</div>
 <h2>OFFICIAL <span style="color:#74c6ff">INSIGHTS.</span></h2>
 <p class="official-sub">Alleen expliciet door KVN CLOTHING geselecteerde, geaggregeerde Roblox Creator Analytics. Geen spelergegevens, inkomsten of onbetrouwbare schattingen.</p></div>
 <span class="livepill">OPEN CLOUD • READ ONLY</span></div>
 <div id="publicMetricsContent" aria-live="polite"><div class="official-grid" aria-hidden="true">
   <div class="official-card"><div class="official-placeholder"></div><p>Geselecteerde metingen laden...</p></div>
   <div class="official-card"><div class="official-placeholder"></div><p>Alleen geautoriseerde publicaties</p></div>
 </div></div>
</section>`;
export const publicAnalyticsClient = String.raw`
(()=>{
 const root=document.getElementById('publicMetricsContent');
 if(!root)return;
 const fmt=(n,dp=0)=>Number(n).toLocaleString('nl-NL',{maximumFractionDigits:dp});
 const svgPoints=arr=>{
   if(arr.length<2)return '';
   const min=Math.min(...arr),max=Math.max(...arr);
   return arr.map((v,i)=>((i*300/(arr.length-1)).toFixed(1))+','+((66-(v-min)/(max-min||1)*52).toFixed(1))).join(' ');
 };
 const message=(str)=>{root.replaceChildren();const box=document.createElement('div');box.className='official-message';box.textContent=str;root.append(box)};
 async function fetchPublished(){
   try{
     const r=await fetch('/api/public-analytics',{cache:'no-store'});
     const data=await r.json();
     if(!Array.isArray(data.metrics) || !data.metrics.length){
       const msg=data.state==='disabled'?'Er zijn nog geen privé-analytics geselecteerd voor openbare weergave.':data.state==='not_configured'?'De Open Cloud-koppeling is voorbereid. Alleen de eigenaar kan hem met een Cloudflare Secret activeren.':data.note||'De geselecteerde analytics zijn momenteel niet beschikbaar.';
       message(msg);return;
     }
     root.replaceChildren();const grid=document.createElement('div');grid.className='official-grid';
     for(const metric of data.metrics||[]){
       const card=document.createElement('article');card.className='official-card';
       const heading=document.createElement('small');heading.textContent=metric.label;
       const amount=document.createElement('strong');amount.textContent=metric.latest?fmt(metric.latest.value,metric.dp)+(metric.unit==='min'?' min':''): '—';amount.title=metric.latest?'Geautoriseerde, geaggregeerde Roblox-data':'Nog geen geverifieerde waarde beschikbaar';
       const note=document.createElement('p');const problem={key_or_scope:'API-key ongeldig of deze Universe heeft geen analytics:read-toestemming (401).',creator_access:'Analytics-toestemming ontbreekt of de sleuteleigenaar heeft geen toegang (403).',authorization:'Geen toestemming vanuit Roblox voor deze game.',request_invalid:'Roblox heeft de aanvraag geweigerd.',universe_lookup:'Universe ID kan niet worden opgehaald.',rate_limited:'Roblox vraagt om later opnieuw te proberen.',no_data:'Nog geen definitieve meetgegevens.',pending:'Roblox verwerkt deze statistiek nog.',upstream:'Roblox Analytics tijdelijk niet bereikbaar.',invalid_response:'Onverwacht Roblox-antwoord.'};note.textContent=metric.state==='ready'?'Laatste afgeronde dag ('+metric.latest.date+') · '+metric.unit+(metric.unit==='API value'?' (ongeconverteerd)':''):problem[metric.reason]||'Geen betrouwbare, afgeronde meting beschikbaar';
       card.append(heading,amount,note);
       if(Array.isArray(metric.points) && metric.points.length>1){
          const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
          svg.setAttribute('viewBox','0 0 300 75');svg.setAttribute('preserveAspectRatio','none');svg.setAttribute('role','img');svg.setAttribute('aria-label','Dagelijkse historische waarden van '+metric.label);
          const line=document.createElementNS('http://www.w3.org/2000/svg','polyline');
          line.setAttribute('points',svgPoints(metric.points.map(p=>p.value)));
          line.setAttribute('stroke','#68bdff');line.setAttribute('stroke-width','2.5');line.setAttribute('fill','none');line.setAttribute('vector-effect','non-scaling-stroke');
          svg.append(line);card.append(svg);
       }
       grid.append(card);
     }
     if(!grid.children.length){message('Geen geselecteerde statistieken beschikbaar.');return}
     root.append(grid);
   }catch{message('Geselecteerde Creator Analytics zijn tijdelijk niet bereikbaar.')}
 }
 fetchPublished();
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)fetchPublished()});
})();
`;
