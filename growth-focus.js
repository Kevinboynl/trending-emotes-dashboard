export const growthFocusCSS = String.raw`

/* Live Pulse: scoped, lightweight visual layer. No API or analytics changes. */
.kvn-growth-focus{margin-top:clamp(28px,4vw,58px);margin-bottom:clamp(20px,3vw,46px);position:relative;scroll-margin-top:95px}
.kvn-growth-focus,.kvn-growth-focus *{box-sizing:border-box}
.kvn-growth-focus__surface{position:relative;isolation:isolate;overflow:hidden;border:1px solid rgba(108,180,255,.26);border-radius:26px;padding:clamp(22px,3.4vw,48px);background:linear-gradient(125deg,rgba(9,35,69,.97) 0%,rgba(7,22,47,.98) 53%,rgba(4,16,34,.97) 100%);box-shadow:0 25px 95px rgba(0,13,39,.28),inset 0 1px 0 rgba(184,225,255,.13)}
.kvn-growth-focus__surface:before{content:"";position:absolute;inset:-170px -120px auto auto;width:min(520px,75vw);height:400px;border-radius:50%;background:radial-gradient(ellipse,rgba(57,149,255,.2),transparent 72%);pointer-events:none;z-index:-1}
.kvn-growth-focus__surface:after{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(104,175,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(104,175,255,.035) 1px,transparent 1px);background-size:46px 46px;mask-image:linear-gradient(135deg,transparent,black 85%);pointer-events:none;z-index:-1}
.kvn-growth-focus__head{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;margin-bottom:24px}
.kvn-growth-focus__eyebrow{display:flex;align-items:center;gap:9px;color:#7bbcff;font:700 10px/1.4 inherit;letter-spacing:.16em;text-transform:uppercase}
.kvn-growth-focus__eyebrow i,.kvn-growth-focus__signal i{display:inline-block;flex:0 0 auto;width:7px;height:7px;border-radius:50%;background:#61cbff;box-shadow:0 0 0 4px rgba(77,172,255,.12),0 0 18px rgba(79,188,255,.65)}
.kvn-growth-focus h2{font-size:clamp(29px,4.1vw,53px);letter-spacing:-.047em;line-height:1.08;margin:10px 0;color:#f1f9ff}
.kvn-growth-focus h2 span{color:#67b6ff}
.kvn-growth-focus__intro{font-size:13px;line-height:1.7;color:#a3bed9;max-width:590px;margin:0}
.kvn-growth-focus__signal{flex:0 0 auto;display:flex;align-items:center;gap:10px;border:1px solid rgba(113,180,255,.19);border-radius:999px;background:rgba(31,80,137,.13);padding:12px 15px;color:#9dcfff;font-size:10px;font-weight:800;letter-spacing:.095em}
.kvn-growth-focus__signal[data-state="live"]{color:#bceaff;border-color:rgba(94,190,255,.45)}
.kvn-growth-focus__signal[data-state="delayed"]{color:#ffd3a0;border-color:rgba(255,192,120,.28)}
.kvn-growth-focus__signal[data-state="delayed"] i{background:#ffc57e;box-shadow:0 0 12px rgba(255,197,126,.4)}
.kvn-growth-focus__grid{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(245px,.85fr);gap:14px}
.kvn-growth-focus__primary,.kvn-growth-focus__tile,.kvn-growth-focus__timeline{border:1px solid rgba(116,178,255,.15);background:linear-gradient(155deg,rgba(38,94,155,.14),rgba(9,29,60,.38));border-radius:18px;min-width:0}
.kvn-growth-focus__primary{position:relative;min-height:250px;padding:27px;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden}
.kvn-growth-focus__primary:after{content:"";position:absolute;width:280px;height:280px;right:-110px;top:-115px;border:1px solid rgba(122,194,255,.12);border-radius:50%;box-shadow:0 0 0 35px rgba(95,176,255,.025),0 0 0 72px rgba(95,176,255,.018);pointer-events:none}
.kvn-growth-focus__label{display:block;color:#9ebbd9;font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase}
.kvn-growth-focus__value-row{display:flex;align-items:baseline;gap:13px;flex-wrap:wrap}
.kvn-growth-focus__value{font-variant-numeric:tabular-nums;font-size:clamp(72px,10vw,126px);font-weight:850;letter-spacing:-.09em;line-height:1.06;color:#fff;text-shadow:0 0 35px rgba(74,156,255,.17)}
.kvn-growth-focus__unit{font-weight:800;color:#6bbcff;font-size:13px;letter-spacing:.13em}
.kvn-growth-focus__primary-foot{display:flex;align-items:center;gap:9px;color:#90b2d1;font-size:12px;line-height:1.5}
.kvn-growth-focus__primary-foot strong{color:#e0f2ff}
.kvn-growth-focus__side{display:grid;grid-template-rows:1fr 1fr;gap:14px}
.kvn-growth-focus__tile{padding:23px;display:flex;flex-direction:column;justify-content:center;gap:9px}
.kvn-growth-focus__tile-value{color:#eaf7ff;font-size:clamp(30px,3vw,42px);font-weight:850;letter-spacing:-.055em;font-variant-numeric:tabular-nums;line-height:1.05}
.kvn-growth-focus__tile[data-direction="up"] .kvn-growth-focus__tile-value{color:#6bd8ff}
.kvn-growth-focus__tile[data-direction="down"] .kvn-growth-focus__tile-value{color:#ffb4c5}
.kvn-growth-focus__note{margin:0;color:#849fbe;font-size:11px;line-height:1.5}
.kvn-growth-focus__timeline{grid-column:1/-1;position:relative;min-height:181px;padding:19px 24px 17px}
.kvn-growth-focus__timeline-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px}
.kvn-growth-focus__timeline-head small{color:#7299bf;font-size:10px;letter-spacing:.06em}
.kvn-growth-focus__bars{display:flex;align-items:flex-end;gap:7px;height:78px;position:relative;border-bottom:1px solid rgba(147,207,255,.11)}
.kvn-growth-focus__bar{flex:1;min-width:3px;max-width:110px;height:var(--pulse-height,50%);border-radius:6px 6px 0 0;border:1px solid rgba(130,211,255,.5);border-bottom:none;background:linear-gradient(0deg,rgba(65,134,229,.17),rgba(74,166,255,.8));box-shadow:0 0 17px rgba(66,174,255,.1);transition:height .55s ease;position:relative}
.kvn-growth-focus__bar:last-child{background:linear-gradient(0deg,rgba(90,191,255,.32),rgba(138,227,255,.98));box-shadow:0 0 20px rgba(90,194,255,.3)}
.kvn-growth-focus__empty{display:flex;align-items:center;justify-content:center;height:78px;border:1px dashed rgba(132,186,247,.24);border-radius:9px;color:#9bbbd7;font-size:12px;text-align:center;padding:12px}
.kvn-growth-focus__axis{display:flex;justify-content:space-between;gap:10px;margin-top:10px;color:#849fbf;font-size:10px}
.kvn-growth-focus__bottom{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-top:19px}
.kvn-growth-focus__source{margin:0;color:#819fbf;font-size:10px;line-height:1.7}
.kvn-growth-focus__link{display:inline-flex;align-items:center;gap:8px;color:#b9e4ff;font-size:11px;font-weight:800;letter-spacing:.07em;text-decoration:none}
.kvn-growth-focus__link:hover,.kvn-growth-focus__link:focus-visible{color:#fff;text-decoration:underline;text-underline-offset:5px}
.kvn-growth-focus[data-motion="up"] .kvn-growth-focus__primary{box-shadow:inset 0 0 38px rgba(73,182,255,.2)}
.kvn-growth-focus[data-motion="down"] .kvn-growth-focus__primary{box-shadow:inset 0 0 38px rgba(252,144,168,.11)}
@media(max-width:780px){.kvn-growth-focus__head{flex-direction:column}.kvn-growth-focus__grid{grid-template-columns:1fr}.kvn-growth-focus__side{grid-template-columns:1fr 1fr;grid-template-rows:auto}.kvn-growth-focus__primary{min-height:220px}}
@media(max-width:470px){.kvn-growth-focus__surface{padding:18px;border-radius:19px}.kvn-growth-focus__grid,.kvn-growth-focus__side{gap:9px}.kvn-growth-focus__primary{padding:20px;min-height:185px}.kvn-growth-focus__tile{padding:16px}.kvn-growth-focus__tile-value{font-size:29px}.kvn-growth-focus__timeline{padding:17px}.kvn-growth-focus__timeline-head{align-items:flex-start;flex-direction:column}.kvn-growth-focus__signal{font-size:9px;padding:10px 12px}.kvn-growth-focus__value{font-size:clamp(63px,18vw,90px)}}
@media(prefers-reduced-motion:reduce){.kvn-growth-focus__bar,.kvn-growth-focus__primary{transition:none!important}}

`;
export const growthFocusJS = String.raw`

/* Verified CCU-only "Live Pulse" feature, safely isolated from main analytics. */
(()=>{
  'use strict';
  const ticker=document.querySelector('.ticker');
  if(!ticker||document.getElementById('livePulse'))return;
  const node=document.createElement('section');
  node.className='wrap kvn-growth-focus';
  node.id='livePulse';
  node.setAttribute('aria-labelledby','kvnPulseTitle');
  node.innerHTML=
    '<div class="kvn-growth-focus__surface">'+
      '<div class="kvn-growth-focus__head"><div>'+
        '<div class="kvn-growth-focus__eyebrow"><i aria-hidden="true"></i> THE LIVE PLAYER COMMAND CENTER</div>'+
        '<h2 id="kvnPulseTitle">THE LIVE <span>PULSE.</span></h2>'+
        '<p class="kvn-growth-focus__intro">Follow real player movement in TRENDING EMOTES! Every number comes from verified Roblox measurements — never estimates.</p>'+
      '</div><div class="kvn-growth-focus__signal" id="kvnPulseState" data-state="loading" role="status"><i aria-hidden="true"></i><span id="kvnPulseStateText">CONNECTING TO ROBLOX</span></div></div>'+
      '<div class="kvn-growth-focus__grid">'+
        '<div class="kvn-growth-focus__primary"><span class="kvn-growth-focus__label">PLAYERS ONLINE RIGHT NOW</span>'+
          '<div class="kvn-growth-focus__value-row"><strong class="kvn-growth-focus__value" id="kvnPulseCount">—</strong><span class="kvn-growth-focus__unit">CCU</span></div>'+
          '<div class="kvn-growth-focus__primary-foot"><span aria-hidden="true">◉</span><span id="kvnPulseUpdated">Waiting for the first verified sample</span></div>'+
        '</div>'+
        '<div class="kvn-growth-focus__side">'+
          '<div class="kvn-growth-focus__tile" id="kvnPulseChangeTile" data-direction="none"><span class="kvn-growth-focus__label">CHANGE SINCE PREVIOUS VERIFIED SAMPLE</span><strong class="kvn-growth-focus__tile-value" id="kvnPulseChange">—</strong><p class="kvn-growth-focus__note" id="kvnPulseChangeNote">Two distinct fresh measurements are needed</p></div>'+
          '<div class="kvn-growth-focus__tile"><span class="kvn-growth-focus__label">HIGHEST OBSERVED CCU · LAST 24H</span><strong class="kvn-growth-focus__tile-value" id="kvnPulsePeak">—</strong><p class="kvn-growth-focus__note" id="kvnPulsePeakNote">Waiting for measured history</p></div>'+
        '</div>'+
        '<div class="kvn-growth-focus__timeline"><div class="kvn-growth-focus__timeline-head"><span class="kvn-growth-focus__label">RECENT VERIFIED PLAYER MEASUREMENTS</span><small id="kvnPulseSamples">MEASUREMENTS PENDING</small></div>'+
          '<div id="kvnPulseBars" class="kvn-growth-focus__empty">Roblox history will appear when actual samples are available.</div>'+
          '<div class="kvn-growth-focus__axis"><span id="kvnPulseStart">—</span><span id="kvnPulseEnd">—</span></div>'+
        '</div>'+
      '</div>'+
      '<div class="kvn-growth-focus__bottom"><p class="kvn-growth-focus__source" id="kvnPulseSource">Source: verified Roblox public API · missing data is never filled in</p><a href="#analytics" class="kvn-growth-focus__link">EXPLORE FULL ANALYTICS <span aria-hidden="true">↗</span></a></div>'+
    '</div>';
  ticker.insertAdjacentElement('afterend',node);
  const byId=id=>document.getElementById(id);
  const count=byId('kvnPulseCount'),change=byId('kvnPulseChange');
  const changeTile=byId('kvnPulseChangeTile'),changeNote=byId('kvnPulseChangeNote');
  const updated=byId('kvnPulseUpdated'),peak=byId('kvnPulsePeak');
  const peakNote=byId('kvnPulsePeakNote'),source=byId('kvnPulseSource');
  const state=byId('kvnPulseState'),stateText=byId('kvnPulseStateText');
  const fmtCount=n=>Number.isFinite(n)?Math.round(n).toLocaleString('en-US'):'—';
  const fmtTime=t=>new Date(t).toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'});
  let lastFresh=null;
  let history=[];
  let flashTimer=null;
  function setState(kind,label){state.dataset.state=kind;stateText.textContent=label;}
  function measuredHistory(){
    let data=[];
    try{
      if(typeof getVerifiedHistory==='function')data=getVerifiedHistory();
    }catch{}
    return Array.isArray(data)?data:[];
  }
  function refreshHistory(other){
    const now=Date.now(),seen=new Map();
    const records=history.concat(measuredHistory(),Array.isArray(other)?other:[]);
    for(const p of records){
      if(!p||!Number.isFinite(p.t)||!Number.isFinite(p.ccu)||p.ccu<0||p.t>now+30000||p.t<now-86400000)continue;
      seen.set(p.t,{t:p.t,ccu:p.ccu});
    }
    history=[...seen.values()].sort((a,b)=>a.t-b.t);
    if(history.length>2000)history=history.slice(-2000);
    const tail=history.slice(-12);
    byId('kvnPulseSamples').textContent=history.length+' VERIFIED SAMPLE'+(history.length===1?'':'S')+' · 24H';
    const latest=tail[tail.length-1];
    if(!tail.length){
      peak.textContent='—';
      peakNote.textContent='Waiting for measured history';
      byId('kvnPulseBars').className='kvn-growth-focus__empty';
      byId('kvnPulseBars').textContent='Roblox history will appear when actual samples are available.';
      byId('kvnPulseStart').textContent='—';
      byId('kvnPulseEnd').textContent='—';
      return;
    }
    peak.textContent=fmtCount(Math.max(...history.map(p=>p.ccu)));
    peakNote.textContent='Observed in '+history.length+' real sample'+(history.length===1?'':'s')+' · not an official all-time record';
    const bars=byId('kvnPulseBars');
    bars.className='kvn-growth-focus__bars';
    bars.replaceChildren();
    const lowest=Math.min(...tail.map(p=>p.ccu)),highest=Math.max(...tail.map(p=>p.ccu));
    for(const p of tail){
      const bar=document.createElement('span');
      bar.className='kvn-growth-focus__bar';
      const height=highest===lowest?58:30+(p.ccu-lowest)/(highest-lowest)*65;
      bar.style.setProperty('--pulse-height',height.toFixed(2)+'%');
      bar.title=fmtTime(p.t)+' · '+fmtCount(p.ccu)+' real concurrent players';
      bar.setAttribute('aria-label',bar.title);
      bars.append(bar);
    }
    byId('kvnPulseStart').textContent=fmtTime(tail[0].t);
    byId('kvnPulseEnd').textContent=fmtTime(latest.t);
  }
  function showMotion(direction){
    if(flashTimer)clearTimeout(flashTimer);
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    node.dataset.motion=direction;
    flashTimer=setTimeout(()=>node.removeAttribute('data-motion'),1100);
  }
  window.addEventListener('kvn:verified-stats',event=>{
    const data=event.detail||{},d=data.stats;
    if(!d||!Number.isFinite(d.playing)||d.playing<0)return;
    const fresh=!d.stale&&Number.isFinite(d.timestamp)&&d.timestamp<=Date.now()+30000;
    const earlier=data.previous;
    const previous=fresh&&earlier&&!earlier.stale&&Number.isFinite(earlier.playing)
      &&Number.isFinite(earlier.timestamp)&&earlier.timestamp<d.timestamp?earlier:null;
    count.textContent=fmtCount(d.playing);
    updated.textContent=(fresh?'Verified at ':'Last saved verification: ')+
      (Number.isFinite(d.timestamp)?new Date(d.timestamp).toLocaleString('en-GB'):'time unavailable');
    setState(fresh?'live':'delayed',fresh?'LIVE · VERIFIED ROBLOX DATA':'LAST VERIFIED DATA · NOT LIVE');
    changeTile.dataset.direction='none';
    change.textContent='—';
    changeNote.textContent='Two distinct fresh measurements are needed';
    if(previous){
      const delta=d.playing-previous.playing;
      change.textContent=(delta>0?'+':'')+fmtCount(delta);
      changeTile.dataset.direction=delta>0?'up':delta<0?'down':'none';
      changeNote.textContent=data.context==='return'?'Since you last viewed the dashboard':'Compared with the previous verified measurement';
      if(delta!==0)showMotion(delta>0?'up':'down');
    }
    if(fresh)lastFresh=d;
    const samples=Array.isArray(data.history)?data.history:[];
    const observed=fresh&&Number.isFinite(d.timestamp)?[{t:d.timestamp,ccu:d.playing}]:[];
    refreshHistory(samples.concat(observed));
    source.textContent='Source: verified Roblox public API · '+(data.cloud?'Cloudflare D1 history':'browser-measured history')+' · no estimates';
  });
  window.addEventListener('kvn:history-loaded',()=>refreshHistory());
  window.addEventListener('kvn:stats-unavailable',()=>{
    setState('delayed','ROBLOX REFRESH DELAYED');
    change.textContent='—';
    changeTile.dataset.direction='none';
    changeNote.textContent='Live movement paused until a fresh verification';
    if(lastFresh)updated.textContent='Last verified: '+new Date(lastFresh.timestamp).toLocaleString('en-GB')+' · refresh delayed';
  });
  const cached=typeof readVerifiedStatsCache==='function'?readVerifiedStatsCache():null;
  if(cached&&Number.isFinite(cached.playing)){
    count.textContent=fmtCount(cached.playing);
    updated.textContent='Last verified: '+new Date(cached.timestamp).toLocaleString('en-GB')+' · cached';
    setState('delayed','CACHED SAMPLE · NOT LIVE');
  }
  refreshHistory();
  const eyebrow=document.querySelector('.hero .eyebrow');
  if(eyebrow)eyebrow.textContent='THE LIVE PLAYER COMMAND CENTER';
  const lead=document.querySelector('.hero .lead');
  if(lead)lead.textContent='Watch TRENDING EMOTES! grow in real time. Explore live player movement, measured peaks and trustworthy Roblox analytics.';
  document.title='TRENDING EMOTES! · Live Pulse / KVN CLOTHING';
})();

`;
