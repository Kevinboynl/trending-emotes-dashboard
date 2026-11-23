/* Focused Growth Brief: only verified observed samples, never estimates. */
export const growthBriefMarkup = String.raw`
<section class="gb-wrap wrap" id="growthBrief" aria-labelledby="gb-title">
  <div class="gb-intro">
    <div><span class="gb-kicker"><span class="gb-kicker-dot" aria-hidden="true"></span> GROWTH COMMAND CENTER / 01</span>
      <h2 id="gb-title">MAKE EVERY <em>PLAYER COUNT.</em></h2>
      <p>One mission: understand player momentum and decide what deserves attention next. All figures come from observed Roblox measurements.</p>
    </div>
    <span class="gb-status" id="gb-signal" role="status" aria-live="polite">CONNECTING TO ROBLOX</span>
  </div>
  <div class="gb-command">
    <article class="gb-main" aria-labelledby="gb-main-title">
      <div class="gb-main-upper"><span class="gb-label" id="gb-main-title">CONCURRENT PLAYERS / VERIFIED</span><span class="gb-main-arrow" aria-hidden="true">↗</span></div>
      <div class="gb-live-row"><strong class="gb-live-count" id="gb-live-count">—</strong><div class="gb-live-side"><span class="gb-live-indicator" aria-hidden="true"></span><span>PLAYERS<br>RIGHT NOW</span></div></div>
      <p class="gb-live-note" id="gb-live-note">Waiting for the first verified reading from Roblox.</p>
      <div class="gb-chart-header"><div><span class="gb-label">24-HOUR ACTIVITY MAP</span><p>Hourly average · measured CCU</p></div><span id="gb-chart-coverage">0 / 24 HOURS MEASURED</span></div>
      <div class="gb-bars" id="gb-bars" role="img" aria-label="No verified hourly samples yet"></div>
      <div class="gb-chart-footer"><span>24 HOURS AGO</span><span>NOW</span></div>
      <p class="gb-chart-disclaimer">Empty hours mean missing measurements, not zero players. Chart scale is relative to observed hourly values.</p>
    </article>
    <aside class="gb-decision" aria-labelledby="gb-action-title">
      <div class="gb-decision-top"><span class="gb-label">YOUR NEXT MOVE / LIVE SIGNAL</span><span class="gb-decision-glyph" aria-hidden="true">✦</span></div>
      <div class="gb-action-state" id="gb-action-state">AWAITING DATA</div>
      <h3 id="gb-action-title">Build your baseline.</h3>
      <p id="gb-action-copy">Once real player measurements arrive, you will see a practical next step based on the observed trend.</p>
      <div class="gb-decision-rule"></div>
      <div class="gb-mini-row"><span>24H MEASURED PEAK</span><strong id="gb-day-peak">—</strong></div>
      <div class="gb-mini-row"><span>HOURS WITH DATA</span><strong id="gb-day-hours">—</strong></div>
      <a class="gb-decision-link" href="#analytics">EXPLORE PLAYER TRENDS <span aria-hidden="true">↗</span></a>
    </aside>
  </div>
  <div class="gb-grid" aria-label="Verified growth summary">
    <article class="gb-tile gb-lead"><span class="gb-label">PLAYER MOMENTUM / LATEST CHECK</span><strong id="gb-direction" data-state="waiting">Waiting for data</strong><span class="gb-detail" id="gb-movement">Two verified readings are needed to compare.</span><div class="gb-track"><span id="gb-track-fill"></span></div></article>
    <article class="gb-tile"><span class="gb-label">NET CHANGE / OBSERVED LAST HOUR</span><strong id="gb-hour">—</strong><span class="gb-detail" id="gb-hour-note">Awaiting measurements within the hour</span></article>
    <article class="gb-tile"><span class="gb-label">LAST VERIFIED SIGNAL</span><strong id="gb-freshness">—</strong><span class="gb-detail" id="gb-freshness-note">Checking Roblox connection</span></article>
  </div>
  <article class="gb-explain" aria-labelledby="gb-explain-title"><div class="gb-explain-icon" aria-hidden="true">✦</div><div><span class="gb-label">WHAT THE MEASUREMENTS MEAN</span><h3 id="gb-explain-title">Player growth intelligence</h3><p id="gb-explain-copy" aria-live="polite">Waiting for enough verified measurements to explain the trend.</p><span id="gb-explain-quality" class="gb-quality">DATA QUALITY · COLLECTING</span></div></article>
  <div class="gb-jumps"><a href="#pulse">LIVE PULSE ↗</a><a href="#peak-hours">BUSIEST HOURS ↗</a><a href="#analytics">PERFORMANCE CHARTS ↗</a><a href="#details">ADVANCED METRICS ↗</a></div>
  <p class="gb-footnote">The recent change compares only the earliest and latest available observations within the last hour. Stale data is never presented as live, and gaps are never filled with invented values.</p>
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

/* Growth Command Center — focused editorial hierarchy and accessible 24-hour readings. */
.gb-wrap{padding-top:46px;padding-bottom:50px;scroll-margin-top:100px}
.gb-intro{display:flex;justify-content:space-between;align-items:flex-end;gap:22px;margin-bottom:25px}
.gb-intro>div{max-width:790px}.gb-intro h2{font-size:clamp(38px,5.2vw,72px);letter-spacing:-.065em;line-height:.99;margin:15px 0 15px}
.gb-intro p{font-size:14px;max-width:670px}.gb-kicker{display:inline-flex;align-items:center;gap:9px}
.gb-kicker-dot{width:8px;height:8px;border-radius:50%;background:#60bbff;box-shadow:0 0 0 5px #4daeff1b}
.gb-status{display:inline-flex;align-items:center;justify-content:center;padding:11px 14px;max-width:220px;border:1px solid rgba(118,188,255,.25);background:rgba(79,141,214,.1);border-radius:999px;color:#a9d9ff;font:800 10px/1.4 'Outfit',sans-serif;letter-spacing:.09em;text-align:center;white-space:normal}
.gb-status[data-state="live"]{border-color:rgba(87,225,188,.35);color:#7ee8ce}.gb-status[data-state="delayed"]{color:#ffcd93;border-color:rgba(255,203,147,.32)}
.gb-command{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(275px,.83fr);gap:14px;margin-bottom:14px}
.gb-main,.gb-decision{min-width:0;border-radius:24px;border:1px solid rgba(122,183,244,.24);overflow:hidden;box-shadow:0 16px 46px rgba(0,7,25,.18)}
.gb-main{padding:clamp(22px,3vw,38px);background:radial-gradient(ellipse at 78% -15%,rgba(75,169,255,.23),transparent 55%),linear-gradient(135deg,#10294e,#0a1a34 62%,#0a1830)}
.gb-main-upper,.gb-chart-header,.gb-chart-footer,.gb-decision-top{display:flex;justify-content:space-between;align-items:center;gap:18px}
.gb-main-arrow{font-size:30px;color:#8acfff;line-height:1}
.gb-live-row{display:flex;align-items:center;gap:22px;min-height:134px;padding-top:10px}
.gb-live-count{display:block;font:900 clamp(77px,10vw,148px)/.93 'Archivo','Outfit',sans-serif;letter-spacing:-.075em;color:#f3faff;font-variant-numeric:tabular-nums}
.gb-live-side{display:flex;align-items:center;gap:10px;color:#9ac8eb;font:800 11px/1.5 'Outfit',sans-serif;letter-spacing:.1em}
.gb-live-indicator{display:block;width:11px;height:11px;border-radius:50%;background:#7891b2;box-shadow:0 0 0 5px #7299c21a}
.gb-main[data-state="live"] .gb-live-indicator{background:#58e7b5;box-shadow:0 0 0 5px #58e7b51b}
.gb-main[data-state="delayed"] .gb-live-indicator{background:#ffbc86}
.gb-live-note{color:#9fb5d3;font:500 12px/1.5 'Outfit',sans-serif;min-height:18px}
.gb-chart-header{margin-top:37px;margin-bottom:12px}.gb-chart-header p{font:500 11px/1.5 'Outfit',sans-serif;color:#94aac8;margin-top:5px}
#gb-chart-coverage{font:800 10px/1.5 'Outfit',sans-serif;letter-spacing:.06em;color:#9dc6eb;text-align:right}
.gb-bars{height:112px;display:grid;grid-template-columns:repeat(24,minmax(0,1fr));gap:5px;align-items:end;border-bottom:1px solid rgba(158,198,239,.22);padding-top:6px}
.gb-bar{height:100%;display:flex;align-items:end;min-width:0}.gb-bar i{display:block;width:100%;border-radius:5px 5px 2px 2px;background:linear-gradient(180deg,#8ad8ff,#398ce8);min-height:4px}
.gb-bar[data-missing="true"] i{background:rgba(132,168,209,.15);min-height:2px!important}
.gb-bar[data-best="true"] i{background:linear-gradient(180deg,#91ffe5,#4daef1)}
.gb-chart-footer{margin-top:10px;color:#7290b2;font:800 9px/1.4 'Outfit',sans-serif;letter-spacing:.1em}
.gb-chart-disclaimer{color:#7897b8;font:500 10px/1.6 'Outfit',sans-serif;margin-top:10px}
.gb-decision{display:flex;flex-direction:column;padding:clamp(22px,2.7vw,32px);background:linear-gradient(155deg,#153860,#0b2244 60%,#0a1c38)}
.gb-decision-glyph{display:grid;place-items:center;width:34px;height:34px;border:1px solid rgba(148,208,255,.27);border-radius:10px;color:#a8d8ff;font-size:18px}
.gb-action-state{align-self:flex-start;margin-top:36px;padding:8px 10px;background:#51a9fa17;border:1px solid #64b9ff35;border-radius:7px;color:#84ceff;font:800 9px/1.4 'Outfit',sans-serif;letter-spacing:.14em}
.gb-action-state[data-state="positive"]{color:#8feaca;border-color:#60e4b43b;background:#3dedaa13}
.gb-action-state[data-state="caution"]{color:#ffce9c;border-color:#ffca8f45;background:#ffca8f12}
.gb-decision h3{color:#f0f8ff;font:900 clamp(27px,3vw,39px)/1.1 'Archivo','Outfit',sans-serif;letter-spacing:-.04em;margin:18px 0 12px}
.gb-decision p{color:#abc0dd;font:500 13px/1.65 'Outfit',sans-serif;max-width:45ch}
.gb-decision-rule{height:1px;background:rgba(139,192,249,.17);margin-top:auto;margin-bottom:18px;transform:translateY(4px)}
.gb-mini-row{display:flex;justify-content:space-between;align-items:center;gap:14px;border-bottom:1px solid rgba(153,190,234,.1);padding:12px 0}
.gb-mini-row span{color:#90aaca;font:700 10px/1.4 'Outfit',sans-serif;letter-spacing:.06em}
.gb-mini-row strong{font:800 19px/1.25 'Archivo','Outfit',sans-serif;color:#eff8ff;font-variant-numeric:tabular-nums}
.gb-decision-link{display:flex;justify-content:space-between;align-items:center;gap:15px;padding:15px 17px;margin-top:19px;background:#71c8ff;color:#081f3b;border-radius:10px;font:900 11px/1.35 'Outfit',sans-serif;letter-spacing:.07em;transition:background .2s,transform .2s}
.gb-decision-link:hover{background:#a3e0ff;transform:translateY(-2px)}
.gb-grid{grid-template-columns:1.2fr 1fr 1fr}.gb-tile{min-height:160px;padding:21px 23px;border-radius:16px;box-shadow:none}
.gb-tile strong{font-size:clamp(24px,2.4vw,34px);margin-top:14px}.gb-explain{border-radius:16px}
.gb-jumps{display:flex;flex-wrap:wrap;gap:9px;margin-top:14px}
.gb-jumps a{border:1px solid rgba(132,180,237,.2);border-radius:9px;background:rgba(16,38,74,.72);color:#abd2f6;padding:12px 14px;font:800 10px/1.3 'Outfit',sans-serif;letter-spacing:.09em}
.gb-jumps a:hover,.gb-jumps a:focus-visible{border-color:#78c9ff;color:#fff}
.gb-wrap :focus-visible{outline:2px solid #a4ddff;outline-offset:3px}
@media(max-width:960px){.gb-command{grid-template-columns:1fr}.gb-decision-rule{margin-top:24px}}
@media(max-width:700px){.gb-intro{align-items:flex-start;flex-direction:column}.gb-grid{grid-template-columns:1fr}.gb-lead{grid-column:auto}.gb-main{padding:22px}.gb-live-row{min-height:105px}.gb-live-count{font-size:clamp(68px,16vw,110px)}.gb-bars{height:95px;gap:3px}.gb-decision{padding:23px}.gb-action-state{margin-top:22px}.gb-jumps{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))}.gb-jumps a{text-align:center}}
@media(max-width:390px){.gb-live-row{gap:12px}.gb-live-side{font-size:9px}.gb-live-count{font-size:68px}.gb-chart-header{align-items:flex-start}.gb-jumps{grid-template-columns:1fr}}
@media(prefers-reduced-motion:reduce){.gb-decision-link{transition:none}}

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

function renderCenter(points,recent,d,now,isDelayed){
 const live=get('gb-live-count'),liveNote=get('gb-live-note'),state=get('gb-signal'),root=document.querySelector('.gb-main');
 const top=get('gb-day-peak'),hours=get('gb-day-hours'),coverage=get('gb-chart-coverage'),bars=get('gb-bars');
 const flag=get('gb-action-state'),title=get('gb-action-title'),copy=get('gb-action-copy');
 if(!live||!bars||!root||!flag)return;
 const delayedNow=isDelayed||Boolean(d.stale)||now-d.timestamp>90000;
 root.dataset.state=delayedNow?'delayed':'live';
 state.dataset.state=delayedNow?'delayed':'live';
 state.textContent=delayedNow?'LAST VERIFIED / DELAYED':'● VERIFIED ROBLOX SIGNAL';
 live.textContent=format(d.playing);
 liveNote.textContent=delayedNow?'Last verified count shown. Live updates are delayed.':'Verified at '+new Date(d.timestamp).toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit'})+' · updates are checked approximately every 20 seconds.';
 const since=now-24*3600000;
 const recentDay=points.filter(p=>p.t>=since&&p.t<=now);
 const peak=recentDay.length?Math.max(...recentDay.map(p=>p.ccu)):null;
 top.textContent=peak===null?'—':format(peak);
 const anchor=new Date(now);anchor.setMinutes(0,0,0);
 const start=anchor.getTime();
 const buckets=new Map();
 for(const p of recentDay){
  const hourStart=Math.floor(p.t/3600000)*3600000;
  const bucket=buckets.get(hourStart)||{sum:0,count:0};
  bucket.sum+=p.ccu;bucket.count++;buckets.set(hourStart,bucket);
 }
 const observed=[];
 for(let n=23;n>=0;n--){
  const hour=start-n*3600000;observed.push({hour,data:buckets.get(hour)});
 }
 const used=observed.filter(x=>x.data).length;
 hours.textContent=used+' / 24';
 coverage.textContent=used+' / 24 HOURS MEASURED';
 const max=Math.max(1,...observed.filter(x=>x.data).map(x=>x.data.sum/x.data.count));
 bars.replaceChildren();
 for(const item of observed){
  const bar=document.createElement('div');
  bar.className='gb-bar';bar.dataset.missing=String(!item.data);
  bar.dataset.best=String(Boolean(item.data&&peak!==null&&(item.data.sum/item.data.count)>=max));
  const label=new Date(item.hour).toLocaleString(undefined,{weekday:'short',hour:'2-digit'});
  bar.title=item.data?label+' · observed average '+format(Math.round(item.data.sum/item.data.count))+' CCU ('+item.data.count+' readings)':label+' · no reading';
  const fill=document.createElement('i');
  fill.style.height=item.data?Math.max(4,Math.round(item.data.sum/item.data.count/max*100))+'%':'2px';
  bar.append(fill);bars.append(bar);
 }
 bars.setAttribute('aria-label',used+' of 24 hourly slots contain measured Roblox CCU. Missing slots are not zero.');
 const first=recent[0],lastPoint=recent[recent.length-1];
 const span=first&&lastPoint?lastPoint.t-first.t:0;
 if(delayedNow){
  flag.textContent='LIVE SIGNAL DELAYED';flag.dataset.state='caution';
  title.textContent='Check data freshness.';
  copy.textContent='The latest Roblox request has not produced a fresh reading. Review the last confirmed trend, then refresh once measurements resume.';
 }else if(recent.length<2||span<5*60000){
  flag.textContent='COLLECTING A BASELINE';flag.dataset.state='';
  title.textContent='Let the trend develop.';
  copy.textContent='One reading is a snapshot, not a trend. Compare at least two measurements five minutes apart before making a growth decision.';
 }else{
  const change=lastPoint.ccu-first.ccu,mins=Math.max(1,Math.round(span/60000));
  if(change>0){
   flag.textContent='POSITIVE MOMENTUM';flag.dataset.state='positive';
   title.textContent='Find what drives the rise.';
   copy.textContent='Concurrent players increased by '+format(change)+' across '+mins+' observed minutes. Compare the 24-hour chart and recent game changes to investigate what may be working.';
  }else if(change<0){
   flag.textContent='MOMENTUM TO REVIEW';flag.dataset.state='caution';
   title.textContent='Check the longer pattern.';
   copy.textContent='Concurrent players decreased by '+format(Math.abs(change))+' across '+mins+' observed minutes. Compare busier time slots and longer periods before drawing conclusions.';
  }else{
   flag.textContent='NET COUNT UNCHANGED';flag.dataset.state='';
   title.textContent='Look for the next pattern.';
   copy.textContent='The observed starting and ending player counts match. Check peak hours and engagement to see whether an update improves the trend.';
  }
 }
}

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
 renderCenter(distinct,recent,d,now,delayed);
 const age=Math.max(0,now-d.timestamp),minutes=Math.floor(age/60000);
 fresh.textContent=delayed||d.stale?'Delayed':minutes<1?'Just now':minutes+'m ago';
 freshNote.textContent=delayed||d.stale?'Showing last verified signal; retrying':'Last actual Roblox CCU measurement';
}
window.addEventListener('kvn:verified-stats',event=>{
 const detail=event.detail||{},d=detail.stats;
 if(!d||!Number.isSafeInteger(d.playing)||d.playing<0||!Number.isFinite(d.timestamp))return;
 last={stats:d,previous:detail.previous,history:Array.isArray(detail.history)?detail.history:[]};
 delayed=Boolean(d.stale);render();
});
window.addEventListener('kvn:stats-unavailable',()=>{delayed=true;render();if(!last){fresh.textContent='Unavailable';freshNote.textContent='Roblox has not returned a verified signal';}});
document.addEventListener('visibilitychange',()=>{if(!document.hidden)render();});
})();
`;
