/* Growth HQ: one clear growth decision surface, powered only by observed Roblox CCU. */
export const growthHQMarkup = String.raw`
<section class="kvn-hq wrap" id="growthHQ" aria-labelledby="kvn-hq-title">
  <div class="kvn-hq__heading">
    <div><span class="kvn-hq__eyebrow"><span class="kvn-hq__light"></span> THE GROWTH COMMAND CENTER / 01</span><h2 id="kvn-hq-title">MAKE EVERY PLAYER <em>COUNT.</em></h2><p>One focused view of how TRENDING EMOTES! is performing — live players, real momentum and the next useful decision.</p></div>
    <span class="kvn-hq__source">VERIFIED ROBLOX DATA <span aria-hidden="true">↗</span></span>
  </div>
  <div class="kvn-hq__layout">
    <article class="kvn-hq__hero" aria-labelledby="kvn-hq-live-label">
      <div class="kvn-hq__hero-top"><span class="kvn-hq__label" id="kvn-hq-live-label">PLAYERS ONLINE RIGHT NOW</span><span class="kvn-hq__state" id="kvn-hq-state" data-state="waiting"><i></i><span id="kvn-hq-state-text">CONNECTING</span></span></div>
      <div class="kvn-hq__count" id="kvn-hq-count" aria-live="off">—</div>
      <p class="kvn-hq__live-desc" id="kvn-hq-fresh">Waiting for the first verified Roblox reading.</p>
      <div class="kvn-hq__chart" aria-label="Measured concurrent player trend in the last 24 hours">
        <svg id="kvn-hq-plot" viewBox="0 0 500 130" preserveAspectRatio="none" role="img" aria-label="Waiting for CCU measurements"><defs><linearGradient id="kvn-hq-gradient" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#56baff" stop-opacity=".27"/><stop offset="1" stop-color="#56baff" stop-opacity="0"/></linearGradient></defs><path id="kvn-hq-fill" fill="url(#kvn-hq-gradient)"/><path id="kvn-hq-line" fill="none" stroke="#79d1ff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/></svg>
        <span id="kvn-hq-plot-empty">The 24-hour chart appears after two verified readings.</span>
      </div>
      <div class="kvn-hq__hero-foot"><span id="kvn-hq-sample-count">0 VERIFIED SAMPLES / 24H</span><a href="#analytics">VIEW FULL HISTORY <span aria-hidden="true">↗</span></a></div>
    </article>
    <div class="kvn-hq__right">
      <div class="kvn-hq__stats">
        <article class="kvn-hq__stat"><span class="kvn-hq__label">SHORT-TERM MOMENTUM</span><strong id="kvn-hq-change">—</strong><small id="kvn-hq-change-note">Waiting for two observations</small></article>
        <article class="kvn-hq__stat"><span class="kvn-hq__label">24H MEASURED PEAK</span><strong id="kvn-hq-peak">—</strong><small id="kvn-hq-peak-note">Not a Roblox all-time record</small></article>
        <article class="kvn-hq__stat"><span class="kvn-hq__label">BUSIEST OBSERVED HOUR</span><strong id="kvn-hq-hour">—</strong><small id="kvn-hq-hour-note">Needs enough historical coverage</small></article>
      </div>
      <article class="kvn-hq__insight" aria-labelledby="kvn-hq-insight-title"><div class="kvn-hq__insight-top"><span class="kvn-hq__label">YOUR NEXT MOVE</span><span class="kvn-hq__number">02 / INSIGHT</span></div><h3 id="kvn-hq-insight-title">Collect reliable momentum.</h3><p id="kvn-hq-insight-copy">The dashboard is gathering real player measurements. Once enough data arrives, this space explains what the observations mean.</p><div class="kvn-hq__action-row"><a href="#analytics">EXPLORE GROWTH <span aria-hidden="true">↗</span></a><a href="https://create.roblox.com/dashboard/creations" target="_blank" rel="noopener noreferrer">CREATOR DASHBOARD <span aria-hidden="true">↗</span></a></div></article>
    </div>
  </div>
  <p class="kvn-hq__disclaimer" id="kvn-hq-disclaimer">Actual observed concurrent-player counts only. Gaps stay gaps; a stale reading is never presented as live or as new growth.</p>
</section>`;

export const growthHQCSS = String.raw`
/* A restrained, readable focal point; existing verified APIs and detailed sections are preserved. */
.kvn-hq{padding-top:38px;padding-bottom:56px;scroll-margin-top:110px}
.kvn-hq,.kvn-hq *{box-sizing:border-box}
.kvn-hq__heading{display:flex;justify-content:space-between;align-items:flex-end;gap:20px;margin-bottom:24px}
.kvn-hq__eyebrow,.kvn-hq__source,.kvn-hq__label,.kvn-hq__state,.kvn-hq__hero-foot,.kvn-hq__number{font:800 10px/1.4 'Outfit',sans-serif;letter-spacing:.13em}
.kvn-hq__eyebrow{display:inline-flex;align-items:center;gap:10px;color:#76c8ff}
.kvn-hq__light{width:7px;height:7px;border-radius:100%;background:#63c5ff;box-shadow:0 0 0 5px #4aa8ff18,0 0 18px #4aa8ff8a}
.kvn-hq__heading h2{font:900 clamp(30px,4.5vw,62px)/1.05 'Archivo','Outfit',sans-serif;letter-spacing:-.055em;margin:13px 0 11px;color:#f4f9ff}
.kvn-hq__heading em{font-style:normal;color:#69bfff}
.kvn-hq__heading p{color:#98aecb;font:500 13px/1.7 'Outfit',sans-serif;max-width:740px}
.kvn-hq__source{white-space:nowrap;color:#82aad5;border:1px solid #5283b632;background:#0e1c31;border-radius:30px;padding:12px 15px}
.kvn-hq__source span{color:#7bcdff;margin-left:6px}
.kvn-hq__layout{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:14px}
.kvn-hq__hero,.kvn-hq__stat,.kvn-hq__insight{border:1px solid rgba(116,167,236,.23);border-radius:21px;box-shadow:0 17px 50px rgba(0,8,27,.12),inset 0 1px rgba(225,242,255,.04);min-width:0}
.kvn-hq__hero{display:flex;flex-direction:column;min-height:470px;padding:clamp(24px,3vw,42px);background:radial-gradient(ellipse 85% 55% at 87% 0%,rgba(42,133,240,.17),transparent),linear-gradient(150deg,#102a50,#081b36 68%,#09172d);overflow:hidden}
.kvn-hq__hero-top{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}
.kvn-hq__label{color:#8eb4db}
.kvn-hq__state{display:inline-flex;align-items:center;gap:8px;border-radius:24px;border:1px solid #4679ad5a;padding:8px 11px;background:#1130556e;color:#9cbde2;white-space:nowrap}
.kvn-hq__state i{display:block;width:6px;height:6px;background:#829bb8;border-radius:50%}
.kvn-hq__state[data-state="live"]{color:#8fe0ff;border-color:#5bc6ff7a}
.kvn-hq__state[data-state="live"] i{background:#70d9ff;box-shadow:0 0 12px #64d5ff}
.kvn-hq__state[data-state="delayed"]{color:#ffce9b;border-color:#e3a55b68}
.kvn-hq__state[data-state="delayed"] i{background:#ffbf78}
.kvn-hq__count{font:900 clamp(80px,11vw,155px)/1.15 'Archivo','Outfit',sans-serif;letter-spacing:-.08em;font-variant-numeric:tabular-nums;color:#f9fcff;margin:24px 0 2px}
.kvn-hq__live-desc{font-size:12px;line-height:1.55;color:#a7bed8;min-height:18px}
.kvn-hq__chart{position:relative;flex:1;min-height:120px;margin:25px 0 15px;border-bottom:1px solid #87bbeb30}
.kvn-hq__chart svg{width:100%;height:100%;display:block;overflow:visible}
.kvn-hq__chart>span{position:absolute;inset:0;display:grid;place-items:center;text-align:center;font:500 12px/1.6 'Outfit',sans-serif;color:#799abf;max-width:30ch;margin:auto}
.kvn-hq__hero-foot{border-top:1px solid #a1c8f421;padding-top:16px;display:flex;justify-content:space-between;align-items:center;gap:14px;color:#85a7c8;flex-wrap:wrap}
.kvn-hq a{font-weight:800;color:#9adaff;text-underline-offset:4px;transition:color .2s}
.kvn-hq a:hover{color:#fff;text-decoration:underline}
.kvn-hq__right{min-width:0;display:flex;flex-direction:column;gap:14px}
.kvn-hq__stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.kvn-hq__stat{min-height:176px;padding:23px 19px;display:flex;flex-direction:column;background:linear-gradient(150deg,#112442,#0a1a33)}
.kvn-hq__stat strong{font:900 clamp(26px,3.2vw,43px)/1.15 'Archivo','Outfit',sans-serif;letter-spacing:-.045em;color:#f3f9ff;margin:20px 0 8px;font-variant-numeric:tabular-nums;overflow-wrap:anywhere}
.kvn-hq__stat strong[data-trend="up"]{color:#85dbff}
.kvn-hq__stat strong[data-trend="down"]{color:#ffd0a3}
.kvn-hq__stat small{font:500 11px/1.55 'Outfit',sans-serif;color:#91accb;margin-top:auto}
.kvn-hq__insight{flex:1;padding:clamp(22px,2.8vw,34px);background:linear-gradient(125deg,rgba(14,45,82,.94),rgba(10,28,54,.97));display:flex;flex-direction:column}
.kvn-hq__insight-top{display:flex;justify-content:space-between;gap:12px;align-items:center}
.kvn-hq__number{color:#5f89b3}
.kvn-hq__insight h3{font:800 clamp(25px,2.7vw,36px)/1.16 'Archivo','Outfit',sans-serif;color:#f0f8ff;letter-spacing:-.037em;margin:25px 0 12px;max-width:21ch}
.kvn-hq__insight p{color:#a0bbd7;font:500 13px/1.8 'Outfit',sans-serif;max-width:65ch}
.kvn-hq__action-row{display:flex;flex-wrap:wrap;gap:10px;margin-top:auto;padding-top:24px}
.kvn-hq__action-row a{display:inline-flex;justify-content:center;gap:10px;align-items:center;min-height:42px;padding:12px 16px;border-radius:9px;border:1px solid #5790bd72;background:#194f86a8;color:#eaf8ff;font:800 10px 'Outfit',sans-serif;letter-spacing:.07em}
.kvn-hq__action-row a+a{background:transparent;color:#94c9ec}
.kvn-hq__disclaimer{font:500 11px/1.6 'Outfit',sans-serif;color:#7895b7;margin:13px 2px 0}
.kvn-hq a:focus-visible{outline:2px solid #94dcff;outline-offset:4px}
.hero{min-height:470px!important;padding-bottom:42px!important}
.ticker{opacity:.72}
@media(max-width:1050px){.kvn-hq__layout{grid-template-columns:1fr}.kvn-hq__hero{min-height:390px}.kvn-hq__chart{min-height:125px}.kvn-hq__heading{align-items:flex-start;flex-direction:column}.kvn-hq__source{align-self:flex-start}}
@media(max-width:650px){.kvn-hq{padding-top:27px;padding-bottom:35px}.kvn-hq__stats{grid-template-columns:1fr 1fr;gap:9px}.kvn-hq__stat:last-child{grid-column:1/-1}.kvn-hq__stat{min-height:150px;padding:18px}.kvn-hq__stat strong{font-size:32px;margin:15px 0 6px}.kvn-hq__hero{padding:23px;min-height:365px;border-radius:17px}.kvn-hq__count{font-size:clamp(73px,19vw,115px);margin:20px 0 0}.kvn-hq__insight{border-radius:17px}.kvn-hq__heading h2{font-size:clamp(32px,8vw,44px)}.kvn-hq__source{font-size:9px}.kvn-hq__hero-foot{font-size:9px}.hero{padding-bottom:23px!important}}
@media(max-width:360px){.kvn-hq__stats{grid-template-columns:1fr}.kvn-hq__stat:last-child{grid-column:auto}.kvn-hq__stat{min-height:120px}}
@media(prefers-reduced-motion:reduce){.kvn-hq *, .kvn-hq *::before,.kvn-hq *::after{animation:none!important;transition:none!important}}
`;

export const growthHQJS = String.raw`
(()=>{
  'use strict';
  const el=id=>document.getElementById(id);
  const root=el('growthHQ');
  if(!root)return;
  const count=el('kvn-hq-count'),status=el('kvn-hq-state'),statusText=el('kvn-hq-state-text');
  const fresh=el('kvn-hq-fresh'),sampleCount=el('kvn-hq-sample-count');
  const change=el('kvn-hq-change'),changeNote=el('kvn-hq-change-note');
  const peak=el('kvn-hq-peak'),peakNote=el('kvn-hq-peak-note');
  const hour=el('kvn-hq-hour'),hourNote=el('kvn-hq-hour-note');
  const title=el('kvn-hq-insight-title'),copy=el('kvn-hq-insight-copy');
  const line=el('kvn-hq-line'),fill=el('kvn-hq-fill'),empty=el('kvn-hq-plot-empty');
  const plot=el('kvn-hq-plot'),disclaimer=el('kvn-hq-disclaimer');
  const format=n=>Number.isSafeInteger(n)?n.toLocaleString('en-GB'):'—';
  let last=null,history=[],delayed=false;

  function samples(rows){
    const seen=new Map();
    for(const p of rows||[]){
      const t=Number(p&&p.t),ccu=Number(p&&p.ccu);
      if(!Number.isFinite(t)||!Number.isSafeInteger(ccu)||ccu<0||t>Date.now()+30000||t<=0)continue;
      seen.set(t,{t,ccu});
    }
    return [...seen.values()].sort((a,b)=>a.t-b.t).filter(x=>x.t>=Date.now()-86400000);
  }
  function setStatus(mode,label){status.dataset.state=mode;statusText.textContent=label;}
  function draw(rows){
    if(rows.length<2){
      line.setAttribute('d','');fill.setAttribute('d','');
      plot.setAttribute('aria-label','Insufficient verified measurements for a trend');
      empty.hidden=false;
      empty.style.display='grid';return;
    }
    empty.hidden=true;empty.style.display='none';
    const lo=Math.min(...rows.map(x=>x.ccu)),hi=Math.max(...rows.map(x=>x.ccu));
    const minT=rows[0].t,maxT=rows[rows.length-1].t;
    const span=Math.max(1,hi-lo);
    const coords=rows.map(p=>[14+(p.t-minT)/Math.max(1,maxT-minT)*472,109-(p.ccu-lo)/span*86]);
    const d=coords.map((p,i)=>(i?'L':'M')+p[0].toFixed(2)+' '+p[1].toFixed(2)).join(' ');
    line.setAttribute('d',d);fill.setAttribute('d',d+' L'+coords[coords.length-1][0].toFixed(2)+' 125 L'+coords[0][0].toFixed(2)+' 125 Z');
    plot.setAttribute('aria-label','Observed CCU from '+format(rows[0].ccu)+' to '+format(rows[rows.length-1].ccu)+' across '+rows.length+' measurements in the last 24 hours');
  }
  function render(){
    const now=Date.now();
    const d=last,valid=d&&Number.isSafeInteger(d.playing)&&d.playing>=0&&Number.isFinite(d.timestamp)&&d.timestamp<=now+30000;
    const live=valid&&!d.stale&&!delayed&&now-d.timestamp<90000;
    count.textContent=valid?format(d.playing):'—';
    setStatus(live?'live':valid?'delayed':'waiting',live?'LIVE / VERIFIED':valid?'LAST READING':'CONNECTING');
    fresh.textContent=!valid?'Waiting for the first verified Roblox reading.':live?'Verified '+new Date(d.timestamp).toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})+' · refreshes about every 20 seconds':'Last measured '+new Date(d.timestamp).toLocaleString('en-GB')+' · not live';
    let rows=samples(history);
    if(live)rows=samples(rows.concat([{t:d.timestamp,ccu:d.playing}]));
    sampleCount.textContent=rows.length+' VERIFIED SAMPLES / 24H';
    draw(rows);

    const recent=rows.filter(p=>p.t>=now-3600000);
    const covered=recent.length>=2?recent[recent.length-1].t-recent[0].t:0;
    let delta=null;
    if(recent.length>=2&&covered>=300000){
      delta=recent[recent.length-1].ccu-recent[0].ccu;
      change.textContent=(delta>0?'+':delta<0?'−':'')+format(Math.abs(delta));
      change.dataset.trend=delta>0?'up':delta<0?'down':'flat';
      changeNote.textContent='Net CCU across '+recent.length+' measured points · '+Math.round(covered/60000)+' min observed';
    }else{
      change.textContent='—';change.dataset.trend='none';
      changeNote.textContent='Needs two readings at least 5 minutes apart';
    }
    if(rows.length){
      peak.textContent=format(Math.max(...rows.map(x=>x.ccu)));
      peakNote.textContent='Highest of '+rows.length+' samples in the last 24h';
    }else{peak.textContent='—';peakNote.textContent='Awaiting 24h measurements';}

    const buckets=new Map();
    for(const point of rows){
      const key=new Date(point.t).getHours();
      const vals=buckets.get(key)||[];
      vals.push(point.ccu);buckets.set(key,vals);
    }
    const eligible=[...buckets].filter(x=>x[1].length>=3)
      .map(([h,vals])=>({h,avg:vals.reduce((sum,n)=>sum+n,0)/vals.length,n:vals.length}))
      .sort((a,b)=>b.avg-a.avg);
    const coverage=rows.length>=12&&rows[rows.length-1].t-rows[0].t>=12*3600000&&buckets.size>=4;
    if(coverage&&eligible.length){
      const best=eligible[0];
      hour.textContent=String(best.h).padStart(2,'0')+':00';
      hourNote.textContent='Local time · '+best.n+' samples · avg '+format(Math.round(best.avg))+' CCU';
    }else{
      hour.textContent='—';
      hourNote.textContent='Needs 12h coverage across at least 4 hours';
    }

    if(!valid){
      title.textContent='Get a trustworthy baseline.';
      copy.textContent='Let verified Roblox readings accumulate. Once at least two independent measurements exist, short-term direction becomes visible.';
    }else if(!live){
      title.textContent='Check the latest live signal.';
      copy.textContent='The current player count is an older verified measurement. Wait for Roblox to recover before making decisions based on new momentum.';
    }else if(delta===null){
      title.textContent='Build a clean growth baseline.';
      copy.textContent='Keep the dashboard collecting. Two readings at least five minutes apart are needed before the growth direction is meaningful.';
    }else if(delta>0){
      title.textContent='Momentum is moving up.';
      copy.textContent='The latest observed CCU is higher than at the start of the measured interval. Record what you changed in the game, then compare with a longer history before attributing the rise to it.';
    }else if(delta<0){
      title.textContent='Investigate the recent drop.';
      copy.textContent='Concurrent players fell across the observed interval. Check longer trends and your Roblox Creator Analytics before deciding whether a thumbnail, update or timing change helped.';
    }else{
      title.textContent='Stable players. Test one change.';
      copy.textContent='The observed player count ended where it started. Try one small game-page improvement, note the time, and compare several verified measurements afterward.';
    }
    disclaimer.textContent='Source: Roblox public game API · '+(rows.length?rows.length+' observed CCU readings in 24h':'history still collecting')+' · missing hours are not filled in · observations do not prove causation.';
  }
  window.addEventListener('kvn:verified-stats',event=>{
    const detail=event.detail||{};
    if(detail.stats)last=detail.stats;
    if(Array.isArray(detail.history))history=detail.history;
    delayed=Boolean(last&&last.stale);
    render();
  });
  window.addEventListener('kvn:history-loaded',()=>{
    if(typeof getVerifiedHistory==='function')history=getVerifiedHistory();
    render();
  });
  window.addEventListener('kvn:stats-unavailable',()=>{delayed=true;render();});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)render();});
  if(typeof getVerifiedHistory==='function')history=getVerifiedHistory();
  if(typeof readVerifiedStatsCache==='function'){
    const cached=readVerifiedStatsCache();
    if(cached)last={...cached,stale:true};
  }
  render();
})();
`;
