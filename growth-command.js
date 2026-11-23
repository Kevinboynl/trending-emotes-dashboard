/* Growth HQ: actionable, verified Roblox player-intelligence overview. */
export const growthCommandMarkup = String.raw`
<section class="gc-wrap wrap" id="growth-hq" aria-labelledby="gc-title">
  <div class="gc-heading">
    <div><p class="gc-kicker"><span class="gc-dot" aria-hidden="true"></span> GROWTH HQ / CREATOR COMMAND CENTER</p>
      <h2 id="gc-title">MAKE THE NEXT <span>MOVE.</span></h2>
      <p>One focus: grow TRENDING EMOTES! with real player signals and a practical next step.</p>
    </div>
    <div class="gc-status" id="gc-freshness" role="status" aria-live="polite" data-mode="waiting"><span class="gc-status-dot"></span><span id="gc-freshness-text">Connecting to Roblox…</span></div>
  </div>
  <div class="gc-main">
    <article class="gc-live" aria-label="Live player growth">
      <div class="gc-card-top"><span class="gc-overline">01 / PLAYER MOMENTUM</span><span class="gc-source">ROBLOX VERIFIED DATA</span></div>
      <div class="gc-live-main"><div><div class="gc-big" id="gc-live-count" aria-live="off">—</div><span class="gc-big-label" id="gc-live-label">PLAYERS RIGHT NOW</span></div>
        <div class="gc-movement" id="gc-movement" data-direction="waiting"><strong id="gc-delta">—</strong><span id="gc-delta-caption">Collecting measured change</span></div>
      </div>
      <div class="gc-chart-heading"><div><strong>PLAYER SIGNAL</strong><span id="gc-period-caption">Verified observations over the last hour</span></div>
        <div class="gc-ranges" role="group" aria-label="Player signal time range">
          <button type="button" data-gc-range="1h" class="is-selected" aria-pressed="true">1H</button>
          <button type="button" data-gc-range="24h" aria-pressed="false">24H</button>
        </div>
      </div>
      <div class="gc-chart" role="img" id="gc-chart-label" aria-label="Waiting for verified player measurements">
        <svg viewBox="0 0 540 154" preserveAspectRatio="none" aria-hidden="true">
          <line x1="12" y1="139" x2="528" y2="139" class="gc-grid-line"/>
          <line x1="12" y1="78" x2="528" y2="78" class="gc-grid-line gc-grid-dashed"/>
          <line x1="12" y1="18" x2="528" y2="18" class="gc-grid-line gc-grid-dashed"/>
          <path id="gc-line" d="" class="gc-chart-line"/>
          <g id="gc-points"></g>
        </svg>
        <span class="gc-chart-empty" id="gc-chart-empty">Waiting for verified measurements</span>
      </div>
      <div class="gc-chart-meta"><span id="gc-chart-start">—</span><span id="gc-chart-count">0 verified samples</span><span id="gc-chart-end">—</span></div>
    </article>
    <article class="gc-action" aria-labelledby="gc-action-heading" data-direction="waiting" id="gc-action-card">
      <div class="gc-card-top"><span class="gc-overline">02 / YOUR NEXT MOVE</span><span class="gc-action-icon" aria-hidden="true">↗</span></div>
      <span class="gc-action-label" id="gc-action-state">WAITING FOR A VERIFIED SIGNAL</span>
      <h3 id="gc-action-heading">Build a reliable baseline.</h3>
      <p id="gc-action-copy">Once Roblox measurements arrive, this panel will turn them into a focused next step.</p>
      <div class="gc-reason"><span>WHY THIS MATTERS</span><p id="gc-action-reason">Good decisions start with observations, not estimates.</p></div>
      <div class="gc-action-links"><a id="gc-primary-link" href="#analytics">VIEW PLAYER HISTORY <span aria-hidden="true">↗</span></a>
        <a class="gc-text-link" href="https://create.roblox.com/dashboard/creations" target="_blank" rel="noopener noreferrer">CREATOR ANALYTICS ↗</a>
      </div>
    </article>
  </div>
  <div class="gc-bottom" aria-label="Verified summary of player activity">
    <div class="gc-mini"><span>24H OBSERVED PEAK</span><strong id="gc-peak">—</strong><small>Highest measured concurrent players</small></div>
    <div class="gc-mini"><span>24H OBSERVED AVERAGE</span><strong id="gc-average">—</strong><small>Average across available samples</small></div>
    <div class="gc-mini"><span>DATA COVERAGE</span><strong id="gc-coverage">—</strong><small id="gc-coverage-note">Collecting real measurements</small></div>
    <div class="gc-mini gc-brief"><span>CREATOR SNAPSHOT</span><p>Share the latest verified signal without invented statistics.</p><button type="button" id="gc-copy">COPY GROWTH BRIEF <span aria-hidden="true">↗</span></button></div>
  </div>
  <p class="gc-disclaimer">Observed CCU is the number of concurrent players, not unique visitors. Missing periods are not zero. Momentum does not identify why a change happened. All times are shown in your device's timezone.</p>
</section>
`;

export const growthCommandCSS = String.raw`
/* Deliberately scoped to Growth HQ; existing charts, API handlers and sections stay intact. */
.gc-wrap{scroll-margin-top:92px;padding-top:35px;padding-bottom:38px;color:#f1f7ff}
.gc-heading{display:flex;align-items:end;justify-content:space-between;gap:20px;margin:0 0 21px}
.gc-kicker{font:800 10px/1.5 'Outfit',Arial,sans-serif;letter-spacing:.17em;color:#75baff;display:flex;align-items:center;gap:10px}
.gc-dot,.gc-status-dot{width:7px;height:7px;border-radius:50%;background:#6dcaff;box-shadow:0 0 0 4px rgba(104,195,255,.11);display:inline-block;flex:none}
.gc-heading h2{font:900 clamp(34px,4.8vw,68px)/.98 'Archivo','Outfit',sans-serif;letter-spacing:-.063em;margin:12px 0 11px}
.gc-heading h2 span{color:#70bdff}
.gc-heading>div:first-child>p:last-child{max-width:660px;color:#99b0d2;font:500 13px/1.65 'Outfit',Arial,sans-serif}
.gc-status{display:flex;align-items:center;gap:10px;flex:none;background:rgba(11,31,58,.9);border:1px solid rgba(95,170,253,.24);border-radius:100px;padding:11px 14px;color:#a1d7ff;font:800 10px/1.4 'Outfit',sans-serif;letter-spacing:.04em;max-width:100%}
.gc-status[data-mode="stale"]{color:#ffd59d;border-color:#ad885d66}
.gc-status[data-mode="stale"] .gc-status-dot{background:#ffcb84;box-shadow:0 0 0 4px rgba(255,188,108,.12)}
.gc-main{display:grid;grid-template-columns:minmax(0,1.58fr) minmax(300px,.9fr);gap:14px}
.gc-live,.gc-action{border:1px solid rgba(113,166,235,.23);background:radial-gradient(circle at 94% 0%,rgba(44,111,195,.18),transparent 45%),linear-gradient(150deg,#112a4d,#0a1b34 75%);border-radius:22px;min-width:0;padding:26px;overflow:hidden}
.gc-live{position:relative}
.gc-live:before{content:'';position:absolute;top:-105px;right:-90px;width:245px;height:245px;border-radius:50%;background:rgba(70,160,255,.1);filter:blur(60px);pointer-events:none}
.gc-card-top{display:flex;justify-content:space-between;align-items:center;gap:12px}
.gc-overline,.gc-source{font:800 10px/1.4 'Outfit',Arial,sans-serif;letter-spacing:.14em;color:#91b9e6}
.gc-source{font-size:9px;color:#6a94c8}
.gc-live-main{display:flex;align-items:end;justify-content:space-between;gap:24px;margin:28px 0 36px;min-height:104px}
.gc-big{font:900 clamp(68px,8.2vw,124px)/.84 'Archivo','Outfit',sans-serif;letter-spacing:-.085em;color:#f2f9ff;font-variant-numeric:tabular-nums}
.gc-big-label{display:block;font:800 10px/1.4 'Outfit',Arial,sans-serif;letter-spacing:.14em;color:#8fb2dd;margin-top:14px}
.gc-movement{text-align:right;border:1px solid rgba(111,184,255,.25);border-radius:15px;background:rgba(5,20,41,.46);padding:13px 16px;min-width:170px}
.gc-movement strong{display:block;font:900 clamp(21px,2.5vw,29px)/1.2 'Archivo','Outfit',sans-serif;color:#e5efff;white-space:nowrap;font-variant-numeric:tabular-nums}
.gc-movement span{display:block;font:600 11px/1.5 'Outfit',Arial,sans-serif;color:#91aacd;max-width:190px;margin-top:4px}
.gc-movement[data-direction="up"] strong{color:#78edd1}
.gc-movement[data-direction="down"] strong{color:#ffc29b}
.gc-chart-heading{display:flex;justify-content:space-between;align-items:center;gap:13px;margin-bottom:17px}
.gc-chart-heading>div:first-child{display:flex;flex-direction:column;gap:5px}
.gc-chart-heading strong{font:800 11px/1.3 'Outfit',sans-serif;letter-spacing:.1em}
.gc-chart-heading span{font:500 11px/1.4 'Outfit',sans-serif;color:#85a4c8}
.gc-ranges{display:flex;gap:4px;background:rgba(1,12,29,.48);border:1px solid rgba(126,178,239,.18);border-radius:10px;padding:4px}
.gc-ranges button{border:0;background:none;color:#83a7d3;padding:8px 12px;border-radius:7px;font:800 10px 'Outfit',sans-serif}
.gc-ranges button.is-selected{background:#64b9ff;color:#0b2140}
.gc-ranges button:focus-visible,.gc-brief button:focus-visible,.gc-action-links a:focus-visible{outline:2px solid #fff;outline-offset:3px}
.gc-chart{position:relative;height:154px;background:linear-gradient(180deg,rgba(87,153,240,.055),transparent);border-radius:10px}
.gc-chart svg{width:100%;height:100%;display:block}
.gc-grid-line{stroke:rgba(135,177,230,.2);stroke-width:1;vector-effect:non-scaling-stroke}
.gc-grid-dashed{stroke-dasharray:4 7}
.gc-chart-line{fill:none;stroke:#6bc5ff;stroke-width:3;stroke-linejoin:round;stroke-linecap:round;vector-effect:non-scaling-stroke}
.gc-chart-point{fill:#b3eaff;stroke:#183b60;stroke-width:2;vector-effect:non-scaling-stroke}
.gc-chart-empty{position:absolute;inset:0;display:grid;place-items:center;color:#89a6ca;font:600 12px 'Outfit',sans-serif;text-align:center;padding:12px}
.gc-chart-empty[hidden]{display:none}
.gc-chart-meta{display:flex;justify-content:space-between;gap:14px;margin-top:8px;font:600 10px 'Outfit',sans-serif;color:#7e9ec5}
.gc-chart-meta span:nth-child(2){text-align:center}
.gc-action{display:flex;flex-direction:column;background:radial-gradient(circle at 100% 0%,rgba(57,123,200,.25),transparent 51%),linear-gradient(145deg,#172f50,#0e2039);border-color:rgba(116,179,251,.3)}
.gc-action-icon{display:grid;place-items:center;width:34px;height:34px;border-radius:11px;background:rgba(123,194,255,.13);color:#a7dcff;font:800 20px 'Outfit',sans-serif}
.gc-action-label{color:#7bc8ff;font:800 10px/1.5 'Outfit',sans-serif;letter-spacing:.13em;margin-top:32px}
.gc-action h3{font:900 clamp(26px,2.7vw,39px)/1.08 'Archivo','Outfit',sans-serif;letter-spacing:-.042em;margin:10px 0 14px}
.gc-action>p{font:500 13px/1.7 'Outfit',sans-serif;color:#aec4de}
.gc-reason{border-top:1px solid rgba(135,183,236,.17);padding-top:20px;margin-top:24px}
.gc-reason span{color:#7faddd;font:800 10px 'Outfit',sans-serif;letter-spacing:.12em}
.gc-reason p{color:#a4bfdc;font:500 12px/1.6 'Outfit',sans-serif;margin-top:8px}
.gc-action-links{display:flex;flex-wrap:wrap;align-items:center;gap:15px;margin-top:auto;padding-top:24px}
.gc-action-links>a:first-child{display:inline-flex;justify-content:space-between;gap:15px;align-items:center;padding:12px 15px;border-radius:9px;background:#71beff;color:#071d38;font:900 10px 'Outfit',sans-serif;letter-spacing:.07em}
.gc-action-links>a:first-child:hover{background:#a2d7ff}
.gc-text-link{color:#b9d6f0;font:800 10px 'Outfit',sans-serif;letter-spacing:.05em}
.gc-bottom{display:grid;grid-template-columns:repeat(3,minmax(0,1fr)) minmax(0,1.25fr);gap:12px;margin-top:13px}
.gc-mini{border:1px solid rgba(111,167,229,.18);border-radius:17px;background:rgba(10,29,52,.89);padding:20px 19px;min-width:0}
.gc-mini>span{display:block;color:#8db3dd;font:800 10px/1.35 'Outfit',sans-serif;letter-spacing:.09em}
.gc-mini strong{display:block;margin:13px 0 7px;color:#eff7ff;font:900 clamp(24px,2.3vw,33px)/1.2 'Archivo','Outfit',sans-serif;font-variant-numeric:tabular-nums}
.gc-mini small{color:#819dc1;font:500 11px/1.5 'Outfit',sans-serif}
.gc-brief{background:linear-gradient(130deg,rgba(33,68,112,.86),rgba(11,29,52,.95))}
.gc-brief p{color:#9dbadc;font:500 11px/1.55 'Outfit',sans-serif;margin:9px 0 13px}
.gc-brief button{border:0;padding:0;background:none;color:#8fd2ff;font:900 10px 'Outfit',sans-serif;letter-spacing:.08em}
.gc-brief button:hover{text-decoration:underline}
.gc-disclaimer{color:#7995ba;font:500 10px/1.65 'Outfit',sans-serif;margin:12px 2px 0}
@media(max-width:1060px){.gc-bottom{grid-template-columns:repeat(2,minmax(0,1fr))}.gc-main{grid-template-columns:1.3fr 1fr}}
@media(max-width:800px){.gc-heading{align-items:flex-start;flex-direction:column}.gc-main{grid-template-columns:1fr}.gc-action{min-height:280px}}
@media(max-width:520px){.gc-wrap{padding-top:24px;padding-bottom:26px}.gc-heading h2{font-size:clamp(34px,10vw,52px)}.gc-main{gap:10px}.gc-live,.gc-action{padding:19px;border-radius:18px}.gc-source{font-size:8px;letter-spacing:.05em}.gc-live-main{margin:23px 0 25px;gap:10px;align-items:end}.gc-big{font-size:clamp(59px,17vw,91px);letter-spacing:-.075em}.gc-movement{padding:9px;min-width:126px}.gc-movement strong{font-size:20px}.gc-movement span{font-size:10px}.gc-chart{height:140px}.gc-bottom{gap:9px}.gc-mini{padding:14px;border-radius:14px}.gc-mini strong{font-size:23px}.gc-mini>span{font-size:9px}.gc-mini small{font-size:10px}.gc-brief{grid-column:1/-1}.gc-chart-meta{font-size:9px}}
@media(prefers-reduced-motion:reduce){.gc-chart-line{transition:none}}
`;

export const growthCommandJS = String.raw`
(function(){
'use strict';
const root=document.getElementById('growth-hq');
if(!root)return;
const get=id=>document.getElementById(id);
const chart=get('gc-chart-label'),line=get('gc-line'),dots=get('gc-points');
const empty=get('gc-chart-empty'),status=get('gc-freshness'),fresh=get('gc-freshness-text');
const movement=get('gc-movement'),delta=get('gc-delta'),deltaNote=get('gc-delta-caption');
const action=get('gc-action-card'),actionState=get('gc-action-state');
const heading=get('gc-action-heading'),advice=get('gc-action-copy'),reason=get('gc-action-reason');
const primary=get('gc-primary-link'),copy=get('gc-copy');
const format=n=>Math.round(n).toLocaleString('en-US');
const localTime=t=>new Date(t).toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit'});
const valid=p=>p&&Number.isFinite(p.t)&&p.t>0&&p.t<=Date.now()+30000&&Number.isSafeInteger(p.ccu)&&p.ccu>=0;
let selected='1h',last=null;
const ranges={ '1h':3600000,'24h':86400000 };
function makeAction(code,title,body,why,href,label){
 action.dataset.direction=code;
 actionState.textContent=code==='up'?'GROWTH OPPORTUNITY':code==='down'?'CHECK THE TREND':code==='stale'?'DATA QUALITY FIRST':code==='stable'?'NEXT EXPERIMENT':'BASELINE FIRST';
 heading.textContent=title; advice.textContent=body;reason.textContent=why;
 primary.href=href;primary.firstChild.textContent=label+' ';
}
function getPoints(){
 if(!last)return[];
 const seen=new Map(),now=Date.now();
 for(const p of last.history){
  if(valid(p)&&p.t<=now&&p.t>=now-86400000)seen.set(p.t,{t:p.t,ccu:p.ccu});
 }
 const s=last.stats;
 if(s&&!s.stale&&valid({t:s.timestamp,ccu:s.playing})&&s.timestamp<=now){
  seen.set(s.timestamp,{t:s.timestamp,ccu:s.playing});
 }
 return [...seen.values()].sort((a,b)=>a.t-b.t);
}
function plot(series,now){
 const elapsed=ranges[selected],start=now-elapsed;
 const subset=series.filter(p=>p.t>=start);
 get('gc-chart-count').textContent=subset.length+' VERIFIED SAMPLE'+(subset.length===1?'':'S');
 get('gc-chart-start').textContent=localTime(start);
 get('gc-chart-end').textContent=localTime(now);
 get('gc-period-caption').textContent='Verified observations / last '+(selected==='1h'?'hour':'24 hours');
 line.setAttribute('d','');
 dots.replaceChildren();
 if(subset.length===0){
  empty.hidden=false;
  empty.textContent='Collecting real player measurements';
  chart.setAttribute('aria-label','No verified CCU samples for the selected time range');
  return subset;
 }
 if(subset.length===1){
  empty.hidden=false;
  empty.textContent='One verified sample available · trend needs at least two';
 }else empty.hidden=true;
 const max=Math.max(1,...subset.map(p=>p.ccu));
 const x=t=>12+Math.max(0,Math.min(1,(t-start)/elapsed))*516;
 const y=v=>139-v/max*121;
 const gap=selected==='1h'?12*60000:90*60000;
 let path='',prev=null;
 for(const p of subset){
  const px=x(p.t).toFixed(2),py=y(p.ccu).toFixed(2);
  path+=(prev&&p.t-prev.t<=gap?' L ':' M ')+px+' '+py;
  prev=p;
 }
 line.setAttribute('d',path.trim());
 // Preserve readability and avoid excessive DOM nodes on dense history.
 for(const p of subset.filter((_,i)=>i===0||i===subset.length-1||i%Math.max(1,Math.ceil(subset.length/34))===0)){
  const dot=document.createElementNS('http://www.w3.org/2000/svg','circle');
  dot.setAttribute('class','gc-chart-point');dot.setAttribute('cx',x(p.t).toFixed(2));
  dot.setAttribute('cy',y(p.ccu).toFixed(2));dot.setAttribute('r',subset.length<3?'4':'2.7');
  dots.appendChild(dot);
 }
 chart.setAttribute('aria-label',subset.length+' verified CCU samples during the last '+(selected==='1h'?'hour':'24 hours')+'; highest observed '+format(max)+' players');
 return subset;
}
function render(){
 if(!last)return;
 const s=last.stats,now=Date.now(),series=getPoints(),last24=series.filter(p=>p.t>=now-86400000);
 const isFresh=Boolean(s&&!s.stale&&valid({t:s.timestamp,ccu:s.playing})&&now-s.timestamp<=120000);
 status.dataset.mode=isFresh?'live':s?.stale?'stale':'waiting';
 fresh.textContent=isFresh?'VERIFIED · '+localTime(s.timestamp):s?.stale?'DELAYED ROBLOX SIGNAL':'WAITING FOR FRESH DATA';
 get('gc-live-count').textContent=Number.isSafeInteger(s?.playing)&&s.playing>=0?format(s.playing):'—';
 get('gc-live-label').textContent=isFresh?'PLAYERS RIGHT NOW':'LAST REPORTED PLAYER COUNT';
 get('gc-peak').textContent=last24.length?format(Math.max(...last24.map(p=>p.ccu))):'—';
 get('gc-average').textContent=last24.length?format(last24.reduce((sum,p)=>sum+p.ccu,0)/last24.length):'—';
 get('gc-coverage').textContent=last24.length?format(last24.length):'—';
 get('gc-coverage-note').textContent=last24.length?'Verified samples / past 24h':'No verified samples in the last 24h';
 const displayed=plot(series,now);
 // A directional signal needs multiple real samples with at least ten minutes of span.
 const hour=series.filter(p=>p.t>=now-3600000);
 const first=hour[0],end=hour[hour.length-1];
 const interval=first&&end?end.t-first.t:0;
 const comparable=hour.length>=3&&interval>=10*60000;
 movement.dataset.direction='waiting';
 delta.textContent='—';
 deltaNote.textContent='Need 3 samples spanning 10+ min';
 if(!isFresh){
  makeAction('stale','Restore a fresh signal.','The most recent live Roblox request has not been verified. Avoid interpreting the cached number as a current trend.','A delayed reading is not evidence that players left.','#dashboard','CHECK SIGNAL');
  return;
 }
 if(!comparable){
  makeAction('waiting','Build your growth baseline.','Collect time-separated CCU samples first. A Cloudflare D1 database with cron enables history even when the page is closed.','A single reading cannot tell you whether your game is gaining or losing players.','https://github.com/Kevinboynl/trending-emotes-dashboard/blob/main/docs/24-7-history.md','SET UP HISTORY');
  return;
 }
 const net=end.ccu-first.ccu,minutes=Math.round(interval/60000);
 movement.dataset.direction=net>0?'up':net<0?'down':'stable';
 delta.textContent=(net>0?'+':net<0?'−':'')+format(Math.abs(net));
 deltaNote.textContent='Net CCU / '+minutes+' observed min';
 if(net>0){
  makeAction('up','Turn momentum into learning.','CCU rose by '+format(net)+' players across the observed interval. Compare visits and favorites, and review what changed in your experience.','Growth is visible, but these public readings cannot tell which update or source caused it.','#analytics','COMPARE HISTORY');
 }else if(net<0){
  makeAction('down','Investigate the player drop.','CCU fell by '+format(Math.abs(net))+' across the observed interval. Check recent changes, first-minute usability, and session duration in Creator Analytics.','A CCU decline alone does not prove a retention or discovery problem.','https://create.roblox.com/dashboard/creations','OPEN ANALYTICS');
 }else{
  makeAction('stable','Test one improvement.','Player counts stayed level across the observed interval. Try one clear change, like improving the first emote experience, then compare fresh measurements.','A stable net count does not mean nobody joined or left.','#analytics','MEASURE RESULTS');
 }
}
root.querySelectorAll('[data-gc-range]').forEach(button=>{
 button.addEventListener('click',()=>{
  selected=button.dataset.gcRange;
  root.querySelectorAll('[data-gc-range]').forEach(b=>{
   const active=b===button;b.classList.toggle('is-selected',active);b.setAttribute('aria-pressed',String(active));
  });
  render();
 });
});
window.addEventListener('kvn:verified-stats',event=>{
 const d=event.detail||{};
 if(!d.stats||!Array.isArray(d.history))return;
 last={stats:d.stats,history:d.history};
 render();
});
document.addEventListener('visibilitychange',()=>{if(!document.hidden)render();});
if(copy)copy.addEventListener('click',()=>{
 if(!last)return;
 const s=last.stats;
 const report='TRENDING EMOTES! — VERIFIED GROWTH BRIEF\n'+
  'Measured at: '+(Number.isFinite(s?.timestamp)?new Date(s.timestamp).toLocaleString():'Unavailable')+'\n'+
  'Current status: '+(s?.stale?'Cached / delayed':'Verified')+'\n'+
  'Concurrent players: '+(Number.isSafeInteger(s?.playing)?format(s.playing):'Unavailable')+'\n'+
  'Measured 24h peak CCU: '+get('gc-peak').textContent+'\n'+
  'Observed 24h average CCU: '+get('gc-average').textContent+'\n'+
  'Verified samples (24h): '+get('gc-coverage').textContent+'\n'+
  'Next move: '+heading.textContent+'\n'+
  'Source: Roblox public statistics. Missing data is not estimated.';
 const success=()=>{copy.firstChild.textContent='COPIED ';setTimeout(()=>{copy.firstChild.textContent='COPY GROWTH BRIEF ';},1800);};
 if(navigator.clipboard&&navigator.clipboard.writeText){
  navigator.clipboard.writeText(report).then(success,()=>{copy.firstChild.textContent='COPY NOT AVAILABLE ';});
 }else copy.firstChild.textContent='COPY NOT AVAILABLE ';
});
})();
`;