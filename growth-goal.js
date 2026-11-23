/* Player Growth Goal — a focused, verified CCU milestone panel.
   The existing live Roblox API and polling loop remain the single source of truth. */
export const growthGoalCSS = String.raw`
.kvn-growth-goal{--goal-accent:#69caff;position:relative;isolation:isolate;overflow:hidden;margin:24px 0 8px;padding:28px 30px 26px;border-radius:22px;border:1px solid rgba(101,178,255,.28);background:radial-gradient(ellipse at 95% 10%,rgba(45,118,244,.17),transparent 53%),linear-gradient(130deg,rgba(16,34,65,.96),rgba(8,20,44,.96));box-shadow:0 22px 70px rgba(0,7,29,.28),inset 0 1px rgba(190,221,255,.07)}
.kvn-growth-goal::before{content:"";position:absolute;pointer-events:none;inset:0;background:linear-gradient(110deg,transparent 0,rgba(113,203,255,.035) 45%,transparent 80%);z-index:-1}
.kvn-growth-top{display:flex;align-items:flex-start;justify-content:space-between;gap:28px;flex-wrap:wrap}
.kvn-growth-kicker{display:inline-flex;align-items:center;gap:9px;color:#79c9ff;letter-spacing:1.8px;font-size:10px;font-weight:800}
.kvn-growth-kicker::before{content:"";width:7px;height:7px;border-radius:50%;background:#68d9ff;box-shadow:0 0 0 5px rgba(73,180,255,.12)}
.kvn-growth-goal h3{font-family:'Archivo','Outfit',sans-serif;font-size:clamp(23px,3vw,38px);font-weight:800;letter-spacing:-1.1px;margin:12px 0 10px}
.kvn-growth-goal h3 span{color:#74caff}
.kvn-growth-copy{font-size:12px;line-height:1.7;color:#a3b9dc;max-width:570px}
.kvn-growth-form{flex:0 1 250px;min-width:220px}
.kvn-growth-form label{display:block;color:#9fb8d9;font-size:10px;font-weight:800;letter-spacing:1.2px;margin-bottom:9px}
.kvn-growth-inputline{display:flex;gap:8px}
.kvn-growth-inputline input{min-width:0;flex:1;width:110px;padding:12px 13px;border-radius:10px;border:1px solid rgba(102,158,237,.35);background:rgba(6,17,39,.85);color:#fff;font:700 15px 'Outfit',sans-serif;font-variant-numeric:tabular-nums}
.kvn-growth-inputline input:focus-visible{outline:2px solid #82d6ff;outline-offset:2px}
.kvn-growth-inputline button{border:1px solid #549dff;background:#286ff0;color:#fff;border-radius:10px;padding:10px 14px;font-size:11px;font-weight:800;white-space:nowrap;transition:filter .2s,transform .2s}
.kvn-growth-inputline button:hover{filter:brightness(1.17);transform:translateY(-1px)}
.kvn-growth-error{min-height:15px;margin:6px 0 0;color:#ffc0bf;font-size:10px}
.kvn-growth-numbers{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:11px;margin:24px 0 18px}
.kvn-growth-number{padding:17px 19px 14px;border:1px solid rgba(97,156,231,.17);background:rgba(9,23,49,.58);border-radius:13px;min-width:0}
.kvn-growth-number small{display:block;font-size:10px;font-weight:800;letter-spacing:1.1px;color:#9ab3d6;margin-bottom:8px}
.kvn-growth-number strong{display:block;font:800 clamp(23px,3vw,34px)/1.12 'Archivo','Outfit',sans-serif;letter-spacing:-.8px;font-variant-numeric:tabular-nums;overflow-wrap:anywhere}
.kvn-growth-number:first-child strong{color:#8bdcff}
.kvn-growth-progress{height:13px;overflow:hidden;border-radius:999px;background:#102848;border:1px solid rgba(102,168,246,.25);box-shadow:inset 0 2px 6px rgba(0,3,15,.55)}
.kvn-growth-progress-fill{height:100%;width:0;border-radius:inherit;background:linear-gradient(90deg,#247df4,#70d8ff);box-shadow:0 0 18px rgba(76,172,255,.5);transition:width .75s cubic-bezier(.2,.8,.2,1)}
.kvn-growth-foot{display:flex;justify-content:space-between;align-items:baseline;gap:8px 20px;flex-wrap:wrap;margin-top:13px}
.kvn-growth-message{font-size:12px;font-weight:700;color:#c9e2ff;line-height:1.5}
.kvn-growth-updated{font-size:10px;color:#90aaca}
.kvn-growth-picks{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:21px}
.kvn-growth-picks-label{font-size:10px;color:#8daacb;font-weight:700;margin-right:5px}
.kvn-growth-picks button{border-radius:999px;background:rgba(25,57,104,.5);color:#badbff;border:1px solid rgba(99,156,236,.28);padding:7px 13px;font-size:11px;font-weight:700;transition:background .2s,border-color .2s}
.kvn-growth-picks button:hover,.kvn-growth-picks button[aria-pressed="true"]{border-color:#80caff;background:rgba(41,105,194,.35);color:#fff}
.kvn-growth-goal[data-goal-state="reached"]{border-color:rgba(105,218,255,.6);box-shadow:0 15px 60px rgba(0,93,173,.19),inset 0 1px rgba(190,221,255,.07)}
.kvn-growth-goal[data-goal-state="reached"] .kvn-growth-progress-fill{background:linear-gradient(90deg,#2c98ff,#a4edff)}
@media(max-width:690px){.kvn-growth-goal{padding:21px 18px;margin-top:17px;border-radius:17px}.kvn-growth-form{flex:1 1 100%;min-width:0}.kvn-growth-numbers{gap:7px;margin-top:18px}.kvn-growth-number{padding:13px 10px}.kvn-growth-number small{font-size:9px;letter-spacing:.4px}.kvn-growth-number strong{font-size:clamp(21px,6vw,28px)}.kvn-growth-picks{gap:6px}}
@media(prefers-reduced-motion:reduce){.kvn-growth-progress-fill,.kvn-growth-picks button,.kvn-growth-inputline button{transition:none!important}}
`;

export const growthGoalMarkup = String.raw`
<section class="kvn-growth-goal reveal" id="growthGoal" aria-labelledby="growthTitle" data-goal-state="waiting">
  <div class="kvn-growth-top">
    <div><div class="kvn-growth-kicker">PLAYER GROWTH / LIVE MILESTONE</div>
      <h3 id="growthTitle">ROAD TO <span id="growthGoalTitle">50</span> PLAYERS.</h3>
      <p class="kvn-growth-copy">Choose your next CCU goal. Track your progress using verified Roblox player counts — no guessed or simulated numbers.</p>
    </div>
    <form id="growthGoalForm" class="kvn-growth-form">
      <label for="growthGoalInput">YOUR CONCURRENT PLAYER TARGET</label>
      <div class="kvn-growth-inputline"><input id="growthGoalInput" type="number" min="1" max="1000000" step="1" inputmode="numeric" value="50" required><button type="submit">SET GOAL</button></div>
      <p id="growthGoalError" class="kvn-growth-error" aria-live="polite"></p>
    </form>
  </div>
  <div class="kvn-growth-numbers">
    <div class="kvn-growth-number"><small id="growthLiveLabel">LIVE CCU</small><strong id="growthLiveValue">—</strong></div>
    <div class="kvn-growth-number"><small>PLAYERS TO GO</small><strong id="growthToGo">—</strong></div>
    <div class="kvn-growth-number"><small>GOAL PROGRESS</small><strong id="growthPercent">—</strong></div>
  </div>
  <div class="kvn-growth-progress" id="growthProgress" role="progressbar" aria-label="Progress toward concurrent player goal" aria-valuemin="0" aria-valuemax="100" aria-valuetext="Waiting for verified player count"><div class="kvn-growth-progress-fill" id="growthProgressFill"></div></div>
  <div class="kvn-growth-foot"><p class="kvn-growth-message" id="growthMessage" aria-live="polite">Waiting for verified Roblox player count…</p><small class="kvn-growth-updated" id="growthUpdated">Checks follow the live dashboard</small></div>
  <div class="kvn-growth-picks" id="growthQuickGoals"><span class="kvn-growth-picks-label">QUICK GOALS</span><button type="button" data-ccu-target="25">25 CCU</button><button type="button" data-ccu-target="50">50 CCU</button><button type="button" data-ccu-target="100">100 CCU</button><button type="button" data-ccu-target="250">250 CCU</button></div>
</section>
`;

export const growthGoalJS = String.raw`
/* Growth Goal is purely presentational: it never polls Roblox or fabricates metrics. */
(function initGrowthGoal(){
  const root=document.getElementById('growthGoal');
  if(!root)return;
  const el=id=>root.querySelector('#'+id);
  const form=el('growthGoalForm'),input=el('growthGoalInput'),error=el('growthGoalError');
  const storageKey='kvn:player-growth-goal:v1';
  const format=n=>Math.round(n).toLocaleString('en-US');
  let goal=50,observed=null,lastTimestamp=null,live=false;
  try{
    const saved=localStorage.getItem(storageKey);
    const parsed=Number(saved);
    if(saved!==null&&Number.isSafeInteger(parsed)&&parsed>=1&&parsed<=1000000)goal=parsed;
  }catch{}
  function refresh(){
    el('growthGoalTitle').textContent=format(goal);
    input.value=String(goal);
    for(const b of root.querySelectorAll('[data-ccu-target]')){
      b.setAttribute('aria-pressed',String(Number(b.dataset.ccuTarget)===goal));
    }
    if(observed===null){
      root.dataset.goalState='waiting';
      el('growthLiveLabel').textContent='LIVE CCU';
      el('growthLiveValue').textContent='—';
      el('growthToGo').textContent='—';
      el('growthPercent').textContent='—';
      el('growthProgressFill').style.width='0%';
      el('growthProgress').removeAttribute('aria-valuenow');
      el('growthProgress').setAttribute('aria-valuetext','Waiting for verified Roblox player count');
      el('growthMessage').textContent='Waiting for verified Roblox player count…';
      el('growthUpdated').textContent='Checks follow the live dashboard';
      return;
    }
    const remaining=Math.max(0,goal-observed);
    const percent=Math.min(100,Math.round(observed/goal*100));
    root.dataset.goalState=remaining===0?'reached':live?'tracking':'cached';
    el('growthLiveLabel').textContent=live?'LIVE CCU':'LAST VERIFIED CCU';
    el('growthLiveValue').textContent=format(observed);
    el('growthToGo').textContent=format(remaining);
    el('growthPercent').textContent=percent+'%';
    el('growthProgressFill').style.width=percent+'%';
    el('growthProgress').setAttribute('aria-valuenow',String(percent));
    el('growthProgress').setAttribute('aria-valuetext',format(observed)+' concurrent players of '+format(goal)+' goal');
    el('growthMessage').textContent=remaining===0
      ?live?'GOAL REACHED! Your live CCU has hit the milestone.':'Goal reached at the last verified sample.'
      :format(remaining)+' more concurrent '+(remaining===1?'player':'players')+' needed to reach '+format(goal)+' CCU.';
    el('growthUpdated').textContent=lastTimestamp
      ?(live?'Verified ':'Last verified ')+new Date(lastTimestamp).toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})
      :'Verified Roblox data';
  }
  function setGoal(next){
    if(!Number.isSafeInteger(next)||next<1||next>1000000){
      error.textContent='Enter a whole number between 1 and 1,000,000.';
      return;
    }
    goal=next;error.textContent='';
    try{localStorage.setItem(storageKey,String(goal));}catch{}
    refresh();
  }
  form.addEventListener('submit',event=>{
    event.preventDefault();
    const raw=input.value.trim();
    if(!raw||!/^\\d+$/.test(raw)){
      error.textContent='Enter a whole number between 1 and 1,000,000.';
      return;
    }
    setGoal(Number(raw));
  });
  el('growthQuickGoals').addEventListener('click',event=>{
    const button=event.target.closest('[data-ccu-target]');
    if(button)setGoal(Number(button.dataset.ccuTarget));
  });
  window.addEventListener('kvn:verified-stats',event=>{
    const stats=event.detail&&event.detail.stats;
    if(!stats||!Number.isSafeInteger(stats.playing)||stats.playing<0||stats.playing>1000000000||
       !Number.isFinite(stats.timestamp)||stats.timestamp<=0||
       (stats.placeId&&String(stats.placeId)!=='134944031090971'))return;
    // Never overwrite a newer verified sample with an older cached fallback.
    if(lastTimestamp!==null&&stats.timestamp<lastTimestamp)return;
    observed=stats.playing;
    lastTimestamp=stats.timestamp;
    live=!stats.stale;
    refresh();
  });
  window.addEventListener('kvn:stats-unavailable',()=>{
    live=false;
    refresh();
  });
  refresh();
})();
`;
