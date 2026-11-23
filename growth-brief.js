/* Focused Growth Brief: only verified observed samples, never estimates. */
export const growthBriefMarkup = String.raw`
<section class="gb-wrap wrap" id="growthBrief" aria-labelledby="gb-title">
  <div class="gb-intro"><span class="gb-kicker">GROWTH BRIEF / LIVE INTELLIGENCE</span><h2 id="gb-title">IS THE GAME <em>GROWING?</em></h2><p>A clear snapshot of actual player movement. Every comparison uses observed Roblox player counts, never predictions.</p></div>
  <div class="gb-grid">
    <article class="gb-tile gb-lead"><span class="gb-label">PLAYER MOMENTUM</span><strong id="gb-direction" data-state="waiting">Waiting for data</strong><span class="gb-detail" id="gb-movement">Two verified measurements are needed to measure change.</span><div class="gb-track"><span id="gb-track-fill"></span></div></article>
    <article class="gb-tile"><span class="gb-label">CHANGE / LAST HOUR</span><strong id="gb-hour">—</strong><span class="gb-detail" id="gb-hour-note">Awaiting measurements within the last hour</span></article>
    <article class="gb-tile"><span class="gb-label">LAST VERIFIED SIGNAL</span><strong id="gb-freshness">—</strong><span class="gb-detail" id="gb-freshness-note">Checking Roblox connection</span></article>
  </div>
  <article class="gb-explain" aria-labelledby="gb-explain-title"><div class="gb-explain-icon" aria-hidden="true">✦</div><div><span class="gb-label">WHAT THE DATA TELLS YOU</span><h3 id="gb-explain-title">Growth interpretation</h3><p id="gb-explain-copy" aria-live="polite">Waiting for enough verified measurements to explain the trend.</p><span id="gb-explain-quality" class="gb-quality">DATA QUALITY · COLLECTING</span></div></article>
  <p class="gb-footnote">Hour change compares the first and last available measurements in that window, which may not cover the full hour. A missing or stale signal is not a zero-player count.</p>
</section>
`;
export const growthBriefCSS = String.raw`
.gb-wrap{scroll-margin-top:110px;padding:35px 0 42px}
.gb-intro{margin:0 0 22px}
.gb-kicker,.gb-label{font:800 10px/1.4 'Outfit',Arial,sans-serif;letter-spacing:.17em;color:#7fc7ff}
.gb-intro h2{font:900 clamp(32px,4.4vw,64px)/1.02 'Archivo','Outfit',sans-serif;letter-spacing:-.052em;color:#f4f8ff;margin:12px 0}
.gb-intro h2 em{font-style:normal;color:#65c1ff}
.gb-intro p,.gb-footnote{font:500 13px/1.65 'Outfit',Arial,sans-serif;color:#98adc9;max-width:730px}
.gb-grid{display:grid;grid-template-columns:1.3fr 1fr 1fr;gap:12px}
.gb-tile{min-width:0;display:flex;flex-direction:column;padding:25px 25px 23px;border-radius:19px;background:linear-gradient(150deg,rgba(20,46,83,.92),rgba(8,24,49,.96));border:1px solid rgba(114,178,239,.2);box-shadow:0 16px 36px rgba(0,7,24,.14)}
.gb-lead{border-color:rgba(100,190,255,.4);background:linear-gradient(138deg,rgba(22,67,112,.95),rgba(8,30,57,.97))}
.gb-tile strong{display:block;margin:17px 0 8px;color:#ecf7ff;font:900 clamp(26px,2.7vw,40px)/1.12 'Archivo','Outfit',sans-serif;letter-spacing:-.035em;font-variant-numeric:tabular-nums}
.gb-tile strong[data-state="up"]{color:#77d9ff}.gb-tile strong[data-state="down"]{color:#ffb59c}.gb-tile strong[data-state="flat"]{color:#dae6f7}
.gb-detail{font:500 12px/1.55 'Outfit',Arial,sans-serif;color:#a0b9d6}
.gb-track{height:4px;width:100%;background:rgba(109,166,225,.15);margin-top:auto;border-radius:9px;overflow:hidden;padding-top:0;transform:translateY(12px)}
.gb-track span{display:block;height:100%;width:0;background:#78d2ff;border-radius:inherit;transition:width .55s ease}
.gb-explain{margin-top:14px;padding:22px 24px;display:flex;gap:17px;align-items:flex-start;border-radius:17px;background:linear-gradient(110deg,rgba(18,46,81,.85),rgba(9,24,48,.95));border:1px solid rgba(116,190,244,.25)}
.gb-explain-icon{display:grid;place-items:center;width:38px;height:38px;flex:none;border-radius:12px;background:rgba(108,195,255,.12);color:#8ad4ff;font-size:22px}
.gb-explain h3{font:800 clamp(19px,2.5vw,27px)/1.2 'Archivo','Outfit',sans-serif;letter-spacing:-.03em;color:#f3f8ff;margin:8px 0}
.gb-explain p{font:500 13px/1.65 'Outfit',sans-serif;color:#b7cae2;margin:0 0 13px;max-width:750px}
.gb-quality{display:inline-block;font:800 10px/1.4 'Outfit',sans-serif;letter-spacing:.09em;color:#8dccf4}
.gb-explain[data-trend="up"]{border-color:rgba(93,221,174,.4)}
.gb-explain[data-trend="down"]{border-color:rgba(255,166,143,.38)}
.gb-footnote{margin-top:13px;font-size:11px}
@media(max-width:850px){.gb-grid{grid-template-columns:1fr 1fr}.gb-lead{grid-column:1/-1}}
@media(max-width:530px){.gb-grid{grid-template-columns:1fr}.gb-lead{grid-column:auto}.gb-tile{padding:22px}.gb-wrap{padding:26px 0}}
@media(prefers-reduced-motion:reduce){.gb-track span{transition:none}}
`;
export const growthBriefJS = String.raw`
(()=>{
'use strict';
const get=id=>document.getElementById(id);
const direction=get('gb-direction'),movement=get('gb-movement'),hour=get('gb-hour'),hourNote=get('gb-hour-note'),fresh=get('gb-freshness'),freshNote=get('gb-freshness-note'),fill=get('gb-track-fill');
if(!direction||!hour||!fresh)return;
const format=n=>Math.abs(n).toLocaleString('en-US');
const explanation=get('gb-explain-copy'),quality=get('gb-explain-quality'),panel=explanation&&explanation.closest('.gb-explain');
let last=null,delayed=false;
const valid=p=>p&&Number.isFinite(p.t)&&p.t>0&&p.t<=Date.now()+30000&&Number.isSafeInteger(p.ccu)&&p.ccu>=0;
function render(){
 if(!last)return;
 const now=Date.now(),d=last.stats;
 const points=last.history.filter(valid).filter(p=>p.t<=now);
 if(!d.stale&&Number.isSafeInteger(d.playing)&&d.playing>=0&&Number.isFinite(d.timestamp)&&d.timestamp<=now+30000){
  points.push({t:d.timestamp,ccu:d.playing});
 }
 points.sort((a,b)=>a.t-b.t);
 const distinct=points.filter((p,i)=>i===0||p.t!==points[i-1].t);
 const recent=distinct.filter(p=>p.t>=now-3600000);
 const prev=last.previous;
 // Explain only observed, time-ordered CCU changes. Never infer joins, retention, or acquisition sources.
 if(explanation&&quality&&panel){
   const first=recent[0],end=recent[recent.length-1];
   const gap=first&&end?end.t-first.t:0;
   if(delayed||d.stale){
     panel.dataset.trend='waiting';
     explanation.textContent='The Roblox signal is delayed. Previously measured players remain visible, but the current direction cannot be confirmed until a fresh reading arrives.';
     quality.textContent='DATA QUALITY · DELAYED';
   }else if(recent.length<2||gap<60000){
     panel.dataset.trend='waiting';
     explanation.textContent='Not enough time-separated readings yet. Keep the dashboard open or enable persistent history to identify a real short-term trend.';
     quality.textContent='DATA QUALITY · MORE HISTORY NEEDED';
   }else{
     const change=end.ccu-first.ccu;
     panel.dataset.trend=change>0?'up':change<0?'down':'flat';
     const mins=Math.round(gap/60000);
     const period='over '+mins+' measured minute'+(mins===1?'':'s');
     explanation.textContent=change>0
       ?'Concurrent players increased by '+format(change)+' '+period+'. This indicates positive player-count momentum, but not where those players came from.'
       :change<0
       ?'Concurrent players decreased by '+format(change)+' '+period+'. Check the pattern over a longer period before deciding whether this is a lasting decline.'
       :'Concurrent players were unchanged across the observed interval '+period+'. This is a stable net count, not proof that no players joined or left.';
     quality.textContent='DATA QUALITY · '+recent.length+' VERIFIED SAMPLES';
   }
 }
 const canCompare=prev&&!prev.stale&&Number.isSafeInteger(prev.playing)&&prev.playing>=0&&Number.isFinite(prev.timestamp)&&prev.timestamp<d.timestamp&&!d.stale;
 if(canCompare){
   const change=d.playing-prev.playing;
   const state=change>0?'up':change<0?'down':'flat';
   direction.dataset.state=state;
   direction.textContent=state==='up'?'↗ Growing':state==='down'?'↘ Slowing':'→ Stable';
   movement.textContent=change===0?'No player-count change between the last two verified samples':(change>0?'+':'−')+format(change)+' players since the previous verified sample';
   fill.style.width=Math.min(100,Math.abs(change)/Math.max(1,prev.playing)*100)+'%';
 }else{
   direction.dataset.state='waiting';direction.textContent='Awaiting comparison';
   movement.textContent='Two fresh verified measurements are needed';fill.style.width='0%';
 }
 if(recent.length>=2){
   const first=recent[0],end=recent[recent.length-1],delta=end.ccu-first.ccu;
   hour.textContent=(delta>0?'+':delta<0?'−':'')+format(delta);
   hourNote.textContent='Observed change across '+recent.length+' samples in the last hour';
 }else{
   hour.textContent='—';hourNote.textContent='Not enough observed samples in the past hour';
 }
 const age=Math.max(0,now-d.timestamp),minutes=Math.floor(age/60000);
 fresh.textContent=delayed||d.stale?'Delayed':minutes<1?'Just now':minutes+'m ago';
 freshNote.textContent=delayed||d.stale?'Showing last verified signal; retrying':'Last actual Roblox CCU measurement';
}
window.addEventListener('kvn:stats-updated',event=>{
 const detail=event.detail||{},d=detail.stats;
 if(!d||!Number.isSafeInteger(d.playing)||d.playing<0||!Number.isFinite(d.timestamp))return;
 last={stats:d,previous:detail.previous,history:Array.isArray(detail.history)?detail.history:[]};
 delayed=Boolean(d.stale);render();
});
window.addEventListener('kvn:stats-unavailable',()=>{delayed=true;render();if(!last){fresh.textContent='Unavailable';freshNote.textContent='Roblox has not returned a verified signal';}});
document.addEventListener('visibilitychange',()=>{if(!document.hidden)render();});
})();
`;
