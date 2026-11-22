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
  ForwardD1Retention: { label:'Day 1 retention', short:'D1 retention', unit:'API value', dp:3, category:'Retention' },
  ForwardD7Retention: { label:'Day 7 retention', short:'D7 retention', unit:'API value', dp:3, category:'Retention' },
  ForwardD30Retention: { label:'Day 30 retention', short:'D30 retention', unit:'API value', dp:3, category:'Retention' },
  UniqueUsersWithImpressions: { label:'Unique users with impressions', short:'Impression reach', unit:'users', dp:0, category:'Acquisition' },
  ImpressionCVR: { label:'Impression click-through (raw value)', short:'Impression CTR', unit:'API value', dp:3, category:'Acquisition' },
  ClientFpsAvg: { label:'Average client frame rate', short:'Average FPS', unit:'fps', dp:1, category:'Performance' },
  ClientCrashRate15m: { label:'Client crash rate (raw API value)', short:'Crash rate', unit:'API value', dp:3, category:'Performance' },
  PayingUsersCVR: { label:'Paying-user conversion (raw API value)', short:'Payer conversion', unit:'API value', dp:3, category:'Monetization' },
  UniqueUsersWithClicks: { label:'Unique detail-page visitors', short:'Page visitors', unit:'users', dp:0, category:'Acquisition' },
  ClickCVR: { label:'Users detail page CTR (raw API value)', short:'Detail-page CTR', unit:'API value', dp:3, category:'Acquisition' },
  EndToEndCVR: { label:'Play rate per unique user (raw API value)', short:'Play-through rate', unit:'API value', dp:3, category:'Acquisition' },
  ThumbnailImpressions: { label:'Thumbnail impressions', short:'Thumbnail impressions', unit:'impressions', dp:0, category:'Acquisition' },
  ClientMemoryUsageAvg: { label:'Average client memory usage', short:'Client memory', unit:'API value', dp:2, category:'Performance' },
  ClientCpuTimeAvg: { label:'Average client CPU time', short:'Client CPU', unit:'API value', dp:2, category:'Performance' },
  // Sensitive financial metrics are optional; do not enable publicly by default.
  DailyRevenue: { label:'Daily Robux revenue', short:'Robux revenue', unit:'Robux', dp:0, category:'Monetization' },
  AverageRevenuePerUser: { label:'Average revenue per daily active user', short:'ARPDAU', unit:'Robux', dp:2, category:'Monetization' },
  AverageRevenuePerPayingUser: { label:'Average revenue per paying user', short:'ARPPU', unit:'Robux', dp:2, category:'Monetization' }
});
const PLACE_ID = '134944031090971';
const BASE = 'https://apis.roblox.com/analytics-query-api/';
const TTL = 10 * 60 * 1000;
const cache = new Map();
let universeCache = null;

function selectedMetrics(env) {
  const raw = typeof env.PUBLIC_ANALYTICS_METRICS === 'string' ? env.PUBLIC_ANALYTICS_METRICS : '';
  const selected = [...new Set(raw.split(',').map(x => x.trim()).filter(x => Object.prototype.hasOwnProperty.call(ANALYTICS_CATALOG, x)))];
  return selected.slice(0, 24);
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
  // Technical performance metrics only retain 28 days in the official API.
  const days = ['ClientFpsAvg','ClientCrashRate15m','ClientMemoryUsageAvg','ClientCpuTimeAvg'].includes(metric) ? 27 : 31;
  const startTime = new Date(midnight.getTime()-days*86400000).toISOString();
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

/* Detailed insight tabs, based exclusively on already-published Open Cloud values. */
.kvn-insights{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:15px}
.kvn-insight-card{position:relative;min-width:0;padding:25px;border:1px solid #295082;border-radius:18px;background:linear-gradient(150deg,#132e5a 0%,#0a1b39 83%);box-shadow:inset 0 1px #b0d7ff13;overflow:hidden;transition:border-color .25s,transform .25s}
.kvn-insight-card:hover{transform:translateY(-3px);border-color:#4797e9}
.kvn-insight-card .k-label{display:flex;align-items:center;gap:8px;font-size:11px;font-weight:800;letter-spacing:1.1px;text-transform:uppercase;color:#91bff4}
.kvn-insight-card .k-label:before{content:"";display:block;width:7px;height:7px;border-radius:50%;background:#4986d7;flex:none}
.kvn-insight-card.is-ready .k-label:before{background:#6cc9ff;box-shadow:0 0 12px #5dbbff66}
.kvn-insight-card .k-value{font:700 clamp(30px,4vw,46px) 'Space Grotesk',sans-serif;letter-spacing:-1.7px;color:#edf7ff;line-height:1.2;margin:21px 0 8px;overflow-wrap:anywhere;font-variant-numeric:tabular-nums}
.kvn-insight-card .k-status{font-size:12px;color:#9fb9da;line-height:1.7;min-height:38px}
.kvn-insight-card .k-meta{display:block;margin-top:18px;color:#7cadd9;font-size:10px;letter-spacing:.6px}
.kvn-insight-card svg{display:block;width:100%;height:65px;margin:15px 0 0;overflow:visible}
.kvn-insight-banner{display:flex;flex-direction:column;justify-content:center;gap:12px;padding:26px;border:1px dashed #315987;background:#0d2144;border-radius:18px;color:#bdd5f5;line-height:1.7}
.kvn-insight-banner strong{font-size:15px;color:#e8f4ff}
.kvn-insight-banner p{font-size:12px;color:#9bb5d7;line-height:1.8}
.kvn-insight-banner a{font-size:12px;font-weight:700;color:#80cbff;text-decoration:underline;text-underline-offset:4px}
.tabbody[data-page="acquisition"] .details{grid-template-columns:repeat(2,minmax(0,1fr))}
.tabbody[data-page="acquisition"] .kvn-insight-card{min-height:220px}
@media(max-width:950px){.kvn-insights{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:680px){.kvn-insights,.tabbody[data-page="acquisition"] .details{grid-template-columns:1fr}.kvn-insight-card{padding:20px}.kvn-insight-card .k-value{font-size:34px}}
@media(prefers-reduced-motion:reduce){.kvn-insight-card{transition:none}.kvn-insight-card:hover{transform:none}}
`;
export const publicAnalyticsMarkup = String.raw`
<section class="wrap" id="officialMetrics" aria-label="Geselecteerde officiële Roblox statistieken">
 <div class="bar reveal"><div><div class="sec-label">04 / AUTHORIZED ANALYTICS</div>
 <h2>OFFICIAL <span style="color:#74c6ff">INSIGHTS.</span></h2>
 <p class="official-sub">Only owner-approved aggregated Roblox Creator Analytics. No private player data, unpublished revenue, or fabricated estimates.</p></div>
 <span class="livepill">OPEN CLOUD • READ ONLY</span></div>
 <div id="publicMetricsContent" aria-live="polite"><div class="official-grid" aria-hidden="true">
   <div class="official-card"><div class="official-placeholder"></div><p>Loading authorized metrics...</p></div>
   <div class="official-card"><div class="official-placeholder"></div><p>Owner-approved metrics only</p></div>
 </div></div>
</section>`;
export const publicAnalyticsClient = String.raw`
(()=>{
 const root=document.getElementById('publicMetricsContent');
 if(!root)return;
 const fmt=(n,dp=0)=>Number(n).toLocaleString('en-US',{maximumFractionDigits:dp});
 const isRetention=id=>/^ForwardD(?:1|7|30)Retention$/.test(String(id));
 const valueText=(metric)=>{
   if(!metric?.latest || !Number.isFinite(metric.latest.value))return '—';
   const v=metric.latest.value;
   // Retention is a fractional cohort return ratio (e.g. 0.144 => 14.4%).
   if(isRetention(metric.id) && v>=0 && v<=1)return fmt(v*100,1)+'%';
   return fmt(v,metric.dp||0)+(metric.unit==='min'?' min':metric.unit==='fps'?' FPS':metric.unit==='Robux'?' R$':'');
 };
 const statusText=(metric)=>{
   if(!metric?.latest)return '';
   if(isRetention(metric.id))return 'New-player cohort: '+metric.latest.date+' · '+metric.short+' · Roblox API';
   return 'Verified Roblox data · '+metric.latest.date+(metric.unit==='API value'?' · raw API value':'');
 };
 const svgPoints=arr=>{
   if(arr.length<2)return '';
   const min=Math.min(...arr),max=Math.max(...arr);
   return arr.map((v,i)=>((i*300/(arr.length-1)).toFixed(1))+','+((66-(v-min)/(max-min||1)*52).toFixed(1))).join(' ');
 };
 const message=(str)=>{root.replaceChildren();const box=document.createElement('div');box.className='official-message';box.textContent=str;root.append(box)};

 // Build the rich detail panels without exposing additional data. Metrics appear
 // only if the owner has explicitly put their exact ID in PUBLIC_ANALYTICS_METRICS.
 const findMetric=(payload,id)=>Array.isArray(payload?.metrics)?payload.metrics.find(m=>m?.id===id):null;
 const detailMessage=(metric)=>{
   if(!metric)return 'Not published yet. The owner can enable this metric in Cloudflare.';
   const reasons={
     key_or_scope:'Roblox rejected the API key or permissions (401).',
     creator_access:'Roblox denied access for this experience (403).',
     authorization:'Roblox analytics access is not authorized.',
     request_invalid:'Roblox rejected this query.',
     universe_lookup:'Universe ID lookup failed.',
     rate_limited:'Temporarily rate limited by Roblox.',
     no_data:'No verified data for this period yet.',
     pending:'Roblox is preparing this metric.',
     invalid_response:'Roblox returned an unexpected response.',
     upstream:'Roblox analytics are temporarily unavailable.'
   };
   return reasons[metric.reason]||'No verified value is currently available.';
 };
 const makeInsight=(id,title,payload)=>{
   const metric=findMetric(payload,id);
   const ready=metric?.state==='ready' && metric.latest && Number.isFinite(metric.latest.value);
   const card=document.createElement('article');card.className='kvn-insight-card'+(ready?' is-ready':'');
   const header=document.createElement('div');header.className='k-label';header.textContent=title;
   const value=document.createElement('div');value.className='k-value';
   value.textContent=ready?valueText(metric):'—';
   const status=document.createElement('p');status.className='k-status';
   status.textContent=ready?statusText(metric):detailMessage(metric);
   const meta=document.createElement('span');meta.className='k-meta';
   meta.textContent=metric?'ROBLOX OPEN CLOUD':'NOT ENABLED · '+id;
   card.append(header,value,status,meta);
   if(ready && Array.isArray(metric.points) && metric.points.length>1){
     const ns='http://www.w3.org/2000/svg';
     const svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox','0 0 300 75');svg.setAttribute('preserveAspectRatio','none');svg.setAttribute('role','img');svg.setAttribute('aria-label',title+' history');
     const line=document.createElementNS(ns,'polyline');line.setAttribute('points',svgPoints(metric.points.map(x=>x.value)));line.setAttribute('fill','none');line.setAttribute('stroke','#62bdff');line.setAttribute('stroke-width','3');line.setAttribute('vector-effect','non-scaling-stroke');
     svg.append(line);card.append(svg);
   }
   return card;
 };
 const makeBanner=(title,description,href,label)=>{
   const b=document.createElement('div');b.className='kvn-insight-banner';
   const h=document.createElement('strong');h.textContent=title;
   const p=document.createElement('p');p.textContent=description;
   b.append(h,p);
   if(href){const link=document.createElement('a');link.href=href;link.target='_blank';link.rel='noopener noreferrer';link.textContent=label||'Open Creator Dashboard';b.append(link);}
   return b;
 };
 const panelData=[
   ['retention',[['ForwardD1Retention','Day 1 retention'],['ForwardD7Retention','Day 7 retention'],['ForwardD30Retention','Day 30 retention']]],
   ['performance',[['ClientFpsAvg','Average client FPS'],['ClientCrashRate15m','Client crash rate'],['ClientMemoryUsageAvg','Client memory usage'],['ClientCpuTimeAvg','Client CPU time']]],
   ['monetization',[['PayingUsersCVR','Paying-user conversion'],['DailyRevenue','Daily Robux revenue'],['AverageRevenuePerUser','ARPDAU'],['AverageRevenuePerPayingUser','ARPPU']]]
 ];
 const renderPanels=(payload)=>{
   for(const [page,metrics] of panelData){
     const tab=document.querySelector('.tabbody[data-page="'+page+'"]');
     if(!tab)continue;
     const grid=document.createElement('div');grid.className='kvn-insights';
     for(const [id,title] of metrics)grid.append(makeInsight(id,title,payload));
     if(page==='retention')grid.append(makeBanner(
       'Why this may differ from Creator Dashboard',
       'Each percentage above is for the latest finalized first-play cohort shown on its card. D7 and D30 mature later than D1. Creator Dashboard may display an aggregate over a different date range; compare the same cohort date to compare the figures.',
       'https://create.roblox.com/docs/production/analytics/retention','About Roblox retention ↗'));
     if(page==='monetization')grid.append(makeBanner(
       'Revenue stays private',
       'Revenue, ARPDAU and ARPPU are private by default. The owner must explicitly authorize each metric before publishing any of these numbers.',
       'https://create.roblox.com/dashboard/creations','View private revenue ↗'));
     if(page==='performance')grid.append(makeBanner(
       'Official performance telemetry',
       'These graphs use Roblox Open Cloud data, not browser estimates. Enable FPS and crash-rate metrics explicitly to publish them.',
       'https://create.roblox.com/docs/cloud/guides/analytics','Analytics API guide ↗'));
     tab.replaceChildren(grid);
   }
   const acq=document.querySelector('.tabbody[data-page="acquisition"] .details');
   if(acq){
     acq.querySelectorAll('.kvn-insight-card').forEach(x=>x.remove());
     const old=acq.children[2];if(old && !old.classList.contains('kvn-insight-card'))old.remove();
     acq.append(makeInsight('UniqueUsersWithImpressions','Unique impression viewers',payload));
     acq.append(makeInsight('ThumbnailImpressions','Thumbnail impressions (not search)',payload));
     acq.append(makeInsight('UniqueUsersWithClicks','Unique detail-page visitors',payload));
     acq.append(makeInsight('ImpressionCVR','Impression CTR',payload));
     acq.append(makeInsight('ClickCVR','Detail-page CTR',payload));
     acq.append(makeInsight('EndToEndCVR','Play-through rate',payload));
   }
 };
 async function fetchPublished(){
   try{
     const r=await fetch('/api/public-analytics',{cache:'no-store'});
     const data=await r.json();
     renderPanels(data);
     // Reuse ONLY already approved public metrics for the Acquisition cards.
     // This does not expose new private data and does not perform a second API call.
     window.__kvnPublishedAnalytics=(r.ok && ['ready','partial'].includes(data?.state))?data:null;
     window.dispatchEvent(new Event('kvn:official-analytics'));
     if(!Array.isArray(data.metrics) || !data.metrics.length){
       const msg=data.state==='disabled'?'No owner-approved metrics have been selected for public display.':data.state==='not_configured'?'Open Cloud is ready. The owner must configure a Cloudflare Secret to enable the connection.':data.note||'The selected analytics are currently unavailable.';
       message(msg);return;
     }
     root.replaceChildren();const grid=document.createElement('div');grid.className='official-grid';
     for(const metric of data.metrics||[]){
       const card=document.createElement('article');card.className='official-card';
       const heading=document.createElement('small');heading.textContent=metric.label;
       const amount=document.createElement('strong');amount.textContent=valueText(metric);amount.title=metric.latest?'Verified aggregated Roblox data':'No verified value available yet';
       const note=document.createElement('p');note.textContent=metric.state==='ready'?statusText(metric):detailMessage(metric);
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
     if(!grid.children.length){message('No selected metrics available.');return}
     root.append(grid);
   }catch{renderPanels(null);message('Authorized Creator Analytics are temporarily unavailable.');}
 }
 fetchPublished();
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)fetchPublished()});
})();
`;
