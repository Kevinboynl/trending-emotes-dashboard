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
      'X-Content-Type-Options': 'nosniff',
      'Access-Control-Allow-Origin': 'null'
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
async function loadOperation(metric, universeId, key, now, fetcher) {
  const midnight = new Date(now);
  midnight.setUTCHours(0, 0, 0, 0);
  const endTime = midnight.toISOString();
  const startTime = new Date(midnight.getTime() - 31*86400000).toISOString();
  const path = 'v1/universes/' + universeId + '/metrics';
  const headers = { 'x-api-key': key, 'Content-Type':'application/json', Accept:'application/json' };
  const response = await fetcher(BASE + path, {
    method:'POST', headers, signal:AbortSignal.timeout(12000),
    body:JSON.stringify({ metric, granularity:'OneDay', startTime, endTime })
  });
  if (!response.ok) throw new Error('analytics-upstream-status-' + response.status);
  let result = await response.json();
  if (!result || typeof result !== 'object') throw new Error('invalid-analytics-response');
  // Respect Roblox's async operation envelope. Poll at most twice per browser request.
  for (let attempt = 0; attempt < 2 && result.done === false; attempt++) {
    const operationPath = result.path;
    const safePath = 'v1/universes/' + universeId + '/operations/metrics/';
    if (typeof operationPath !== 'string' ||
      !operationPath.startsWith(safePath) ||
      !/^v1\/universes\/[0-9]+\/operations\/metrics\/[A-Za-z0-9_-]+$/.test(operationPath)) {
      throw new Error('invalid-operation-path');
    }
    const r = await fetcher(BASE + operationPath, { headers:{'x-api-key':key, Accept:'application/json'}, signal:AbortSignal.timeout(12000) });
    if (!r.ok) throw new Error('analytics-poll-status-'+r.status);
    result = await r.json();
  }
  if (result.done === false) return { state:'pending', points:[], latest:null };
  if (result.error) throw new Error('analytics-query-rejected');
  if (result.done !== true || !Array.isArray(result.response?.values)) throw new Error('invalid-analytics-payload');
  const series = result.response.values.filter(x => Array.isArray(x.breakdowns) && x.breakdowns.length === 0);
  if (series.length !== 1 || !Array.isArray(series[0].dataPoints)) throw new Error('invalid-aggregate-series');
  const points = series[0].dataPoints
    .filter(p => p && typeof p.time === 'string'
      && typeof p.value === 'number' && Number.isFinite(p.value)
      && p.value >= 0 && !Array.isArray(p.stringValues)
      && (p.status == null || p.status === 'Valid')
      && Date.parse(p.time) >= Date.parse(startTime)
      && Date.parse(p.time) < Date.parse(endTime))
    .map(p => ({ date:p.time.slice(0,10), value:p.value }))
    .sort((a,b) => a.date.localeCompare(b.date))
    .slice(-31);
  return { state:points.length ? 'ready' : 'unavailable', points, latest:points.length ? points[points.length - 1] : null };
}
export async function publicAnalyticsResponse(env, fetcher = fetch, now = Date.now()) {
  const selected = selectedMetrics(env || {});
  if (!selected.length) return output({ state:'disabled', metrics:[], note:'Geen privé-analytics geselecteerd om openbaar te tonen.' });
  if (!env.ROBLOX_ANALYTICS_API_KEY) return output({
    state:'not_configured',
    metrics:[],
    note:'Een Cloudflare Secret ontbreekt. Privé-analytics worden niet getoond.'
  });
  const cachedKey = selected.join('|');
  const hit = cache.get(cachedKey);
  if (hit && hit.until > now) return output(hit.body);
  try {
    const universeId = await getUniverse(env, fetcher);
    const results = await Promise.allSettled(
      selected.map(metric => loadOperation(metric, universeId, env.ROBLOX_ANALYTICS_API_KEY, now, fetcher))
    );
    const metrics = selected.map((id, i) => {
      const info = ANALYTICS_CATALOG[id];
      const res = results[i].status === 'fulfilled' ? results[i].value : { state:'unavailable', points:[], latest:null };
      return { id, ...info, ...res };
    });
    const ready = metrics.filter(m=>m.state === 'ready').length;
    const pending = metrics.filter(m=>m.state === 'pending').length;
    const body = {
      state:ready === selected.length ? 'ready' : (ready ? 'partial' : pending ? 'pending' : 'unavailable'),
      metrics, publishedAt:new Date(now).toISOString(),
      source:'Roblox Open Cloud Analytics Query API',
      window:'Last 31 complete UTC days (latest yesterday)'
    };
    cache.set(cachedKey, { body, until:now+(ready?TTL:45000) });
    return output(body);
  } catch {
    return output({ state:'unavailable', metrics:[], note:'Geautoriseerde statistieken tijdelijk niet beschikbaar.' }, 503);
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
     if(!r.ok || !['ready','partial'].includes(data.state)){
       const msg=data.state==='disabled'?'Er zijn nog geen privé-analytics geselecteerd voor openbare weergave.':data.state==='not_configured'?'De Open Cloud-koppeling is voorbereid. Alleen de eigenaar kan hem met een Cloudflare Secret activeren.':data.state==='pending'?'Roblox verwerkt de geselecteerde statistieken. Probeer het later opnieuw.':'De geselecteerde analytics zijn momenteel niet beschikbaar.';
       message(msg);return;
     }
     root.replaceChildren();const grid=document.createElement('div');grid.className='official-grid';
     for(const metric of data.metrics||[]){
       const card=document.createElement('article');card.className='official-card';
       const heading=document.createElement('small');heading.textContent=metric.label;
       const amount=document.createElement('strong');amount.textContent=metric.latest?fmt(metric.latest.value,metric.dp)+(metric.unit==='min'?' min':''): '—';
       const note=document.createElement('p');note.textContent=metric.state==='ready'?'Laatste afgeronde dag ('+metric.latest.date+') · '+metric.unit+(metric.unit==='API value'?' (ongeconverteerd)':''):'Geen betrouwbare, afgeronde meting beschikbaar';
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
