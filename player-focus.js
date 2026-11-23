/* Focus layer: LIVE PLAYER PULSE. Presentation only; no network calls or new data collection. */
export const playerFocusCSS = String.raw`
/* Reuses the existing KVN blue design tokens; all displayed values are verified measurements. */
#player-focus{position:relative;isolation:isolate;overflow:hidden;margin:18px 0 0;border:1px solid rgba(80,166,252,.28);border-radius:19px;background:linear-gradient(113deg,rgba(13,38,80,.91),rgba(9,19,41,.96) 57%,rgba(10,27,57,.98));box-shadow:0 18px 65px rgba(0,8,30,.18)}
#player-focus::before{content:"";position:absolute;inset:0 0 auto;height:1px;background:linear-gradient(90deg,transparent,var(--cyan),transparent);opacity:.65;pointer-events:none}
#player-focus::after{content:"";position:absolute;width:340px;height:340px;right:-170px;top:-210px;background:radial-gradient(circle,rgba(38,132,254,.17),transparent 72%);pointer-events:none}
.kvn-pf-header{position:relative;z-index:1;display:flex;justify-content:space-between;align-items:center;gap:16px;padding:24px 27px 20px;border-bottom:1px solid rgba(105,167,234,.16)}
.kvn-pf-eyebrow{display:flex;align-items:center;gap:9px;color:var(--cyan);font-size:10px;font-weight:800;letter-spacing:1.8px;text-transform:uppercase}
.kvn-pf-eyebrow::before{content:"";width:7px;height:7px;border-radius:50%;background:var(--cyan);box-shadow:0 0 0 5px rgba(75,190,255,.09)}
.kvn-pf-title{margin:8px 0 6px;font:700 clamp(23px,2.6vw,34px)/1.08 'Space Grotesk','Outfit',sans-serif;letter-spacing:-1.2px;color:var(--white)}
.kvn-pf-intro{font-size:12px;line-height:1.6;color:#b0c6df;max-width:630px}
.kvn-pf-status{flex:0 0 auto;display:inline-flex;align-items:center;gap:9px;border:1px solid rgba(91,174,249,.24);background:rgba(8,24,53,.8);color:#bbdfff;border-radius:100px;padding:10px 13px;font-weight:800;font-size:10px;letter-spacing:1px}
.kvn-pf-status-dot{width:7px;height:7px;display:inline-block;border-radius:50%;background:#91a8c1}
.kvn-pf-status[data-state="live"] .kvn-pf-status-dot{background:#57c8ff;box-shadow:0 0 0 4px rgba(76,193,255,.12)}
.kvn-pf-status[data-state="delayed"] .kvn-pf-status-dot{background:#e1b887}
.kvn-pf-grid{position:relative;z-index:1;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr) minmax(0,1.65fr)}
.kvn-pf-cell{min-width:0;padding:22px 27px 21px}
.kvn-pf-cell+.kvn-pf-cell{border-left:1px solid rgba(105,167,234,.16)}
.kvn-pf-label{display:block;font-size:10px;letter-spacing:1.35px;color:#8fb4df;font-weight:800;text-transform:uppercase}
.kvn-pf-value{margin:13px 0 7px;color:var(--white);font:700 clamp(35px,4vw,54px)/1 'Space Grotesk','Outfit',sans-serif;letter-spacing:-2px;font-variant-numeric:tabular-nums}
.kvn-pf-value[data-direction="up"]{color:#76d1ff}
.kvn-pf-value[data-direction="down"]{color:#b9cce1}
.kvn-pf-note{color:#95afcc;font-size:11px;line-height:1.55;min-height:18px}
.kvn-pf-charthead{display:flex;justify-content:space-between;gap:12px;align-items:center;flex-wrap:wrap}
.kvn-pf-charthead small{font-size:10px;font-weight:700;color:#789fca}
.kvn-pf-trace{position:relative;margin:7px 0 5px;height:83px}
.kvn-pf-trace svg{display:block;width:100%;height:100%;overflow:visible}
.kvn-pf-trace .kvn-pf-area{fill:rgba(69,163,255,.12)}
.kvn-pf-trace .kvn-pf-line{fill:none;stroke:#63c7ff;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke;filter:drop-shadow(0 0 4px rgba(80,180,255,.4))}
.kvn-pf-trace .kvn-pf-point{fill:#c8f0ff;stroke:#329fff;stroke-width:2}
.kvn-pf-empty{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;color:#8eb0d7;font-size:11px}
.kvn-pf-trace[data-ready="true"] .kvn-pf-empty{display:none}
.kvn-pf-footer{position:relative;z-index:1;padding:13px 27px;border-top:1px solid rgba(105,167,234,.16);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px}
.kvn-pf-footer span{font-size:10px;color:#8ca9c9;line-height:1.5}
.kvn-pf-link{color:#8bd5ff;font-weight:800;font-size:11px;letter-spacing:.3px;text-decoration:none}
.kvn-pf-link:hover{text-decoration:underline;text-underline-offset:4px}
.kvn-pf-link:focus-visible{outline:2px solid var(--cyan);outline-offset:4px}
@media(max-width:850px){.kvn-pf-grid{grid-template-columns:1fr 1fr}.kvn-pf-cell:last-child{grid-column:1/-1;border-left:0;border-top:1px solid rgba(105,167,234,.16)}}
@media(max-width:580px){.kvn-pf-header{padding:20px 18px;align-items:flex-start;flex-direction:column}.kvn-pf-grid{grid-template-columns:1fr 1fr}.kvn-pf-cell{padding:18px 15px}.kvn-pf-cell:last-child{padding:19px 18px}.kvn-pf-value{font-size:clamp(29px,8vw,43px)}.kvn-pf-note{font-size:10px}.kvn-pf-footer{padding:13px 18px}}
@media(max-width:360px){.kvn-pf-grid{grid-template-columns:1fr}.kvn-pf-cell+.kvn-pf-cell{border-left:0;border-top:1px solid rgba(105,167,234,.16)}.kvn-pf-cell:last-child{grid-column:auto}}
@media(prefers-reduced-motion:reduce){#player-focus *,#player-focus *::before,#player-focus *::after{animation:none!important;transition:none!important}}
`;

export const playerFocusJS = String.raw`
(()=>{
  'use strict';
  const section=document.getElementById('dashboard');
  const metrics=section&&section.querySelector('.metrics');
  if(!metrics||document.getElementById('player-focus'))return;

  // Set a single clear topic: live player activity. All original sections and IDs remain intact.
  const heroLabel=document.querySelector('.hero .eyebrow');
  const heroLead=document.querySelector('.hero .lead');
  if(heroLabel)heroLabel.textContent='LIVE ROBLOX PLAYER INTELLIGENCE';
  if(heroLead)heroLead.textContent='Track who is playing right now, how the live player count changes, and what the verified activity history reveals.';
  const overviewLabel=section.querySelector('.bar .sec-label');
  const overviewTitle=section.querySelector('.bar h2');
  if(overviewLabel)overviewLabel.textContent='01 / LIVE PLAYER ACTIVITY';
  if(overviewTitle){
    const period=document.createElement('span');
    period.textContent='.';
    period.style.color='var(--green)';
    overviewTitle.replaceChildren(document.createTextNode('PLAYER ACTIVITY'),period);
  }
  const analytics=document.getElementById('analytics');
  const analyticsLabel=analytics&&analytics.querySelector('.sec-label');
  const analyticsTitle=analytics&&analytics.querySelector('h2');
  if(analyticsLabel)analyticsLabel.textContent='02 / PLAYER HISTORY';
  if(analyticsTitle){
    const period=document.createElement('span');
    period.textContent='.';
    period.style.color='var(--green)';
    analyticsTitle.replaceChildren(document.createTextNode('MOMENTUM & HISTORY'),period);
  }
  const navOverview=document.querySelector('.navlinks a[href="#dashboard"]');
  const navAnalytics=document.querySelector('.navlinks a[href="#analytics"]');
  if(navOverview)navOverview.textContent='PLAYER PULSE';
  if(navAnalytics)navAnalytics.textContent='HISTORY';

  const panel=document.createElement('section');
  panel.id='player-focus';
  panel.setAttribute('aria-label','Live Roblox player activity snapshot');
  panel.innerHTML=[
    '<div class="kvn-pf-header"><div><div class="kvn-pf-eyebrow">LIVE ACTIVITY / REAL SIGNALS</div>',
    '<h3 class="kvn-pf-title">The Player Pulse.</h3>',
    '<p class="kvn-pf-intro">A focused look at player activity. Every number comes from verified Roblox measurements, not predictions.</p>',
    '</div><div class="kvn-pf-status" data-state="loading"><i class="kvn-pf-status-dot" aria-hidden="true"></i><span id="kvn-pf-state">AWAITING ROBLOX</span></div></div>',
    '<div class="kvn-pf-grid">',
    '<div class="kvn-pf-cell"><span class="kvn-pf-label">Players online</span><div class="kvn-pf-value" id="kvn-pf-now">—</div><div class="kvn-pf-note" id="kvn-pf-now-note">Checking verified CCU…</div></div>',
    '<div class="kvn-pf-cell"><span class="kvn-pf-label">Movement since last sample</span><div class="kvn-pf-value" id="kvn-pf-delta">—</div><div class="kvn-pf-note" id="kvn-pf-delta-note">Waiting for a newer measurement</div></div>',
    '<div class="kvn-pf-cell"><div class="kvn-pf-charthead"><span class="kvn-pf-label">Recent player activity</span><small>UP TO 24H</small></div>',
    '<div class="kvn-pf-trace" id="kvn-pf-trace" data-ready="false"><svg viewBox="0 0 360 82" preserveAspectRatio="none" role="img" aria-label="No verified activity trend yet">',
    '<path class="kvn-pf-area"></path><path class="kvn-pf-line"></path><circle class="kvn-pf-point" r="3.5" opacity="0"></circle></svg>',
    '<div class="kvn-pf-empty">The activity line appears after 2 real samples.</div></div>',
    '<div class="kvn-pf-note" id="kvn-pf-trace-note">Collecting verified player counts</div></div></div>',
    '<div class="kvn-pf-footer"><span>Live counts refresh approximately every 20 seconds when this page is active.</span>',
    '<a class="kvn-pf-link" href="#analytics">EXPLORE COMPLETE HISTORY ↓</a></div>'
  ].join('');
  metrics.after(panel);

  const byId=id=>document.getElementById(id);
  const current=byId('kvn-pf-now');
  const currentNote=byId('kvn-pf-now-note');
  const movement=byId('kvn-pf-delta');
  const movementNote=byId('kvn-pf-delta-note');
  const trace=byId('kvn-pf-trace');
  const traceNote=byId('kvn-pf-trace-note');
  const status=panel.querySelector('.kvn-pf-status');
  const statusText=byId('kvn-pf-state');
  const svg=trace.querySelector('svg');
  const line=trace.querySelector('.kvn-pf-line');
  const area=trace.querySelector('.kvn-pf-area');
  const point=trace.querySelector('.kvn-pf-point');
  const fmt=new Intl.NumberFormat('en-US');
  const formatTime=stamp=>new Date(stamp).toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'});
  const validCount=v=>Number.isSafeInteger(v)&&v>=0&&v<=1000000000;
  const setStatus=(label,state)=>{statusText.textContent=label;status.dataset.state=state;};
  const drawTrace=raw=>{
    const start=Date.now()-86400000;
    const samples=Array.isArray(raw)?raw.filter(p=>
      p&&Number.isFinite(p.t)&&p.t>=start&&p.t<=Date.now()+30000&&validCount(p.ccu)
    ).sort((a,b)=>a.t-b.t):[];
    const distinct=samples.filter((p,i)=>i===0||p.t!==samples[i-1].t);
    if(distinct.length<2){
      trace.dataset.ready='false';
      line.setAttribute('d','');area.setAttribute('d','');point.setAttribute('opacity','0');
      traceNote.textContent=distinct.length===1?'1 verified sample recorded · more needed for a trend':'Waiting for verified measurements';
      svg.setAttribute('aria-label','Not enough verified CCU data to show a trend');
      return;
    }
    const stride=Math.max(1,Math.ceil(distinct.length/90));
    const plotted=distinct.filter((p,i)=>i%stride===0||i===distinct.length-1);
    const values=plotted.map(p=>p.ccu);
    const min=Math.min(...values),max=Math.max(...values);
    const minT=plotted[0].t,maxT=plotted[plotted.length-1].t;
    const width=360,height=82,pad=7;
    const coords=plotted.map(p=>({
      x:pad+(p.t-minT)/Math.max(1,maxT-minT)*(width-pad*2),
      y:height-pad-(p.ccu-min)/Math.max(1,max-min)*(height-pad*2)
    }));
    const d=coords.map((p,i)=>(i?'L':'M')+p.x.toFixed(1)+' '+p.y.toFixed(1)).join(' ');
    const last=coords[coords.length-1];
    line.setAttribute('d',d);
    area.setAttribute('d',d+' L '+last.x.toFixed(1)+' '+(height-pad)+' L '+coords[0].x.toFixed(1)+' '+(height-pad)+' Z');
    point.setAttribute('cx',last.x.toFixed(1));
    point.setAttribute('cy',last.y.toFixed(1));
    point.setAttribute('opacity','1');
    trace.dataset.ready='true';
    traceNote.textContent=distinct.length+' verified samples · sampled low '+fmt.format(min)+' / high '+fmt.format(max);
    svg.setAttribute('aria-label','Recent verified concurrent players. Lowest '+min+', highest '+max+', latest '+plotted[plotted.length-1].ccu+'.');
  };

  window.addEventListener('kvn:verified-stats',event=>{
    const detail=event.detail||{};
    const d=detail.stats||{};
    const timestamp=Number(d.timestamp);
    const fresh=!d.stale&&validCount(d.playing)&&Number.isFinite(timestamp)&&
      timestamp>0&&timestamp<=Date.now()+30000&&Date.now()-timestamp<=180000;
    if(fresh){
      current.textContent=fmt.format(d.playing);
      currentNote.textContent='Verified at '+formatTime(timestamp)+' · Roblox CCU';
      setStatus('LIVE / VERIFIED','live');
      const prev=detail.previous;
      if(prev&&validCount(prev.playing)&&Number.isFinite(prev.timestamp)&&prev.timestamp<timestamp){
        const diff=d.playing-prev.playing;
        movement.textContent=(diff>0?'+':diff<0?'−':'')+fmt.format(Math.abs(diff));
        movement.dataset.direction=diff>0?'up':diff<0?'down':'flat';
        movementNote.textContent=diff>0?'More players than the previous verified sample':
          diff<0?'Fewer players than the previous verified sample':'No change since the previous verified sample';
      }else{
        movement.textContent='—';
        movement.removeAttribute('data-direction');
        movementNote.textContent='Awaiting a second distinct verified sample';
      }
    }else{
      if(validCount(d.playing)&&current.textContent==='—'){
        current.textContent=fmt.format(d.playing);
        currentNote.textContent='Last reported count · verification pending';
      }
      setStatus('RECENT / NOT LIVE','delayed');
      movement.textContent='—';
      movement.removeAttribute('data-direction');
      movementNote.textContent='Waiting for a new verified reading';
    }
    drawTrace(detail.history);
  });
  window.addEventListener('kvn:stats-unavailable',()=>{
    setStatus('REFRESH DELAYED','delayed');
    if(current.textContent!=='—')currentNote.textContent='Last recorded count · refresh delayed';
    movement.textContent='—';
    movement.removeAttribute('data-direction');
    movementNote.textContent='Movement unavailable until the next verified update';
  });
})();
`;
