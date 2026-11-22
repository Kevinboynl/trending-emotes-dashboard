/* TRENDING EMOTES! 2026: real-data CCU control-room enhancements. */
export const liveIntelligenceCSS = String.raw`
/* Live CCU dashboard: visual feedback is driven ONLY by verified Roblox API data. */
.metrics .primary{isolation:isolate;min-height:360px}
.metrics .primary .card-content{z-index:2}
.kvn-ccu-status-line{display:flex;flex-wrap:wrap;align-items:center;gap:10px 16px;margin-top:23px;font:800 10px 'Inter','DM Sans',system-ui,sans-serif;letter-spacing:1.2px;color:#a6c5e9}
.kvn-ccu-state{display:inline-flex;align-items:center;gap:8px;white-space:nowrap}
.kvn-ccu-dot{height:6px;width:6px;display:inline-block;border-radius:99px;background:#55caff;box-shadow:0 0 0 4px rgba(66,174,255,.11),0 0 16px rgba(66,170,255,.48)}
.kvn-ccu-state[data-state="cached"] .kvn-ccu-dot{background:#9daec6;box-shadow:0 0 0 4px rgba(141,164,195,.1)}
.kvn-ccu-state[data-state="unavailable"] .kvn-ccu-dot{background:#efb49e;box-shadow:0 0 0 4px rgba(239,180,158,.1)}
.kvn-ccu-delta{font-variant-numeric:tabular-nums;color:#b3c9e5}
.kvn-ccu-delta[data-direction="up"]{color:#86dfff}
.kvn-ccu-delta[data-direction="down"]{color:#b4c5e0}
.kvn-ccu-delta[data-direction="flat"]{color:#99aecf}
.kvn-ccu-delta[data-direction="none"]{color:#8fa4c4}
.kvn-ccu-record{position:relative;display:inline-flex;align-items:center;gap:7px;border:1px solid rgba(103,201,255,.36);background:rgba(43,130,242,.14);border-radius:999px;padding:7px 11px;max-width:max-content;margin-top:14px;font:800 10px 'Inter','DM Sans',system-ui,sans-serif;color:#b9e9ff;letter-spacing:.8px;box-shadow:inset 0 1px rgba(175,233,255,.06)}
.kvn-ccu-record[hidden]{display:none!important}
.kvn-ccu-freshness{display:flex;align-items:center;flex-wrap:wrap;gap:7px;margin-top:13px;font:600 10px 'Inter','DM Sans',system-ui,sans-serif;letter-spacing:.3px;color:#8fa7c9;line-height:1.5}
.kvn-ccu-freshness [data-age]{font-variant-numeric:tabular-nums}
.kvn-ccu-flash{position:absolute;z-index:1;inset:0;border-radius:inherit;pointer-events:none;opacity:0;background:radial-gradient(circle at 54% 40%,rgba(61,180,255,.20),transparent 75%)}
.kvn-ccu-card[data-motion="up"] .kvn-ccu-flash{animation:kvnCcuRise 1.35s cubic-bezier(.16,1,.3,1) both}
.kvn-ccu-card[data-motion="down"] .kvn-ccu-flash{animation:kvnCcuFall 1.05s ease-out both;background:radial-gradient(circle at 54% 40%,rgba(121,151,214,.11),transparent 72%)}
.kvn-ccu-card[data-motion="up"]{box-shadow:0 0 0 1px rgba(96,189,255,.28),0 0 53px rgba(28,127,255,.14),inset 0 1px rgba(194,234,255,.11)}
.kvn-ccu-card .number{font-variant-numeric:tabular-nums;position:relative;z-index:2}
.kvn-ccu-card .sparkline{position:relative;z-index:2}
@keyframes kvnCcuRise{0%{opacity:0}15%{opacity:1}100%{opacity:0}}
@keyframes kvnCcuFall{0%{opacity:0}25%{opacity:.7}100%{opacity:0}}
.kvn-ccu-card .number{margin-top:25px!important}
@media(min-width:1000px){
 .workspace{grid-template-columns:minmax(0,1.95fr) minmax(285px,.9fr);gap:20px}
 .chart-wrap{height:355px}
 .metrics .primary{min-height:380px}
 .metrics .primary .sparkline{position:relative;right:auto;bottom:auto;width:48%;max-width:360px;height:48px;margin:16px 0 8px;opacity:.92}
 .metrics .primary .card-content{padding-bottom:44px}
}
@media(min-width:691px) and (max-width:999px){
 .workspace{grid-template-columns:minmax(0,1fr)}
 .chart-wrap{height:315px}
 .metrics .primary{min-height:330px}
 .metrics .primary .sparkline{position:relative;right:auto;bottom:auto;width:58%;max-width:360px;height:43px;margin:12px 0;opacity:.82}
}
@media(max-width:690px){
 .metrics .primary{min-height:305px}
 .kvn-ccu-status-line{margin-top:14px;gap:8px 12px;font-size:9px;letter-spacing:.7px}
 .kvn-ccu-record{margin-top:10px;padding:6px 9px;font-size:9px}
 .kvn-ccu-freshness{font-size:9px;margin-top:9px}
 .metrics .primary .number{margin-top:16px!important;margin-bottom:7px}
 .metrics .primary .sparkline{display:block;position:relative;right:auto;bottom:auto;width:65%;max-width:270px;height:35px;opacity:.7;margin:8px 0 20px}
 .metrics .primary .card-content{padding-bottom:44px}
 .chart-wrap{height:265px}
 .workspace{grid-template-columns:minmax(0,1fr)}
}
@media(max-width:390px){
 .metrics .primary{min-height:295px}
 .metrics .primary .sparkline{width:70%;height:31px}
 .kvn-ccu-status-line{gap:6px 10px}
}
@media(prefers-reduced-motion:reduce){
 .kvn-ccu-card[data-motion] .kvn-ccu-flash{animation:none!important}
 .kvn-ccu-card[data-motion="up"]{box-shadow:inset 0 1px rgba(194,234,255,.1)!important}
}
`;
export const liveIntelligenceJS = String.raw`
/* Event-driven CCU presentation: never alters or estimates Roblox data. */
(()=>{
'use strict';
const card=document.querySelector('.metrics .primary');
const player=document.getElementById('playing');
if(!card||!player)return;
card.classList.add('kvn-ccu-card');
const label=card.querySelector('.label-row');
const line=document.createElement('div');line.className='kvn-ccu-status-line';
const status=document.createElement('span');status.className='kvn-ccu-state';status.dataset.state='loading';
const dot=document.createElement('i');dot.className='kvn-ccu-dot';dot.setAttribute('aria-hidden','true');
const wording=document.createElement('span');wording.textContent='CONNECTING TO ROBLOX';
status.append(dot,wording);
const delta=document.createElement('span');delta.className='kvn-ccu-delta';delta.dataset.direction='none';delta.textContent='AWAITING VERIFIED DATA';
line.append(status,delta);
if(label)label.after(line);
else card.querySelector('.card-content')?.prepend(line);
const record=document.createElement('div');record.className='kvn-ccu-record';record.hidden=true;
record.textContent='✦ NEW MEASURED PERIOD PEAK';
const description=card.querySelector('.metric-info');
if(description)description.after(record);
else card.querySelector('.card-content')?.append(record);
const freshness=document.createElement('div');freshness.className='kvn-ccu-freshness';
freshness.setAttribute('aria-live','off');freshness.textContent='Waiting for a verified Roblox measurement';
record.after(freshness);
const flash=document.createElement('div');flash.className='kvn-ccu-flash';
flash.setAttribute('aria-hidden','true');card.prepend(flash);
let lastTimestamp=null;
let lastTrustedCCU=null;
function setState(name,text){status.dataset.state=name;wording.textContent=text;}
function updateTime(stamp,cached){
  if(!Number.isFinite(stamp))return;
  const when=new Date(stamp).toLocaleString('en-GB',{dateStyle:'medium',timeStyle:'short'});
  freshness.textContent=(cached?'Last verified (cached): ':'Last verified: ')+when;
  freshness.title='Timestamp returned with the latest actual Roblox measurement';
}
function clearMovement(){
  card.removeAttribute('data-motion');
}
function showMotion(direction){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  clearMovement();
  void card.offsetWidth; // Only on a verified CCU change, not during scrolling.
  card.dataset.motion=direction;
}
window.addEventListener('kvn:verified-stats',event=>{
  const info=event.detail||{},d=info.stats;
  if(!d||!Number.isFinite(d.playing)){
    setState('unavailable','METRIC UNAVAILABLE');
    delta.textContent='NO VERIFIED PLAYER COUNT';
    delta.dataset.direction='none';record.hidden=true;
    clearMovement();return;
  }
  const fresh=!d.stale&&Number.isFinite(d.timestamp);
  updateTime(d.timestamp,!fresh);
  setState(fresh?'live':'cached',fresh?'AUTO UPDATING · VERIFIED':'CACHED · NOT LIVE');
  // Never claim a trend between identical timestamps or stale responses.
  const previous=info.previous;
  const priorValue=previous&&!previous.stale&&Number.isFinite(previous.playing)
    && Number.isFinite(previous.timestamp)&&previous.timestamp<d.timestamp
    ?previous.playing
    :(lastTimestamp!==null&&lastTimestamp<d.timestamp?lastTrustedCCU:null);
  if(fresh&&Number.isFinite(priorValue)){
    const diff=d.playing-priorValue;
    delta.dataset.direction=diff>0?'up':diff<0?'down':'flat';
    delta.textContent=(diff>0?'+':diff<0?'−':'')+
      Math.abs(diff).toLocaleString('en-US')+' SINCE PREVIOUS SAMPLE';
    if(diff!==0)showMotion(diff>0?'up':'down');
    else clearMovement();
  }else{
    delta.dataset.direction='none';
    delta.textContent=fresh?'AWAITING NEXT VERIFIED SAMPLE':'NO LIVE TREND';
    clearMovement();
  }
  if(fresh){lastTimestamp=d.timestamp;lastTrustedCCU=d.playing;}
  // A new high requires at least two earlier VERIFIED historical samples,
  // spanning five minutes; no "record" label from a single initial reading.
  const history=Array.isArray(info.history)?info.history.filter(p=>
    p&&Number.isFinite(p.t)&&Number.isFinite(p.ccu)&&
    p.t<d.timestamp-45000&&p.t>=d.timestamp-86400000):[];
  const coverage=history.length>=2&&(history[history.length-1].t-history[0].t)>=300000;
  const isPeak=fresh&&coverage&&d.playing>Math.max(...history.map(p=>p.ccu));
  record.hidden=!isPeak;
  record.title=isPeak?'Compared with earlier verified history available in the selected chart data':''; 
});
window.addEventListener('kvn:stats-unavailable',event=>{
  setState('unavailable','REFRESH DELAYED');
  delta.dataset.direction='none';
  delta.textContent=event.detail?.hasPrevious?'LAST VERIFIED SAMPLE':'RETRYING ROBLOX API';
  record.hidden=true;clearMovement();
});
})();
`;
