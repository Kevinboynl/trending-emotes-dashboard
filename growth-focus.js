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
.kvn-growth-focus__bar.is-latest{background:linear-gradient(0deg,rgba(90,191,255,.32),rgba(138,227,255,.98));box-shadow:0 0 20px rgba(90,194,255,.3)}
.kvn-growth-focus__empty{display:flex;align-items:center;justify-content:center;height:78px;border:1px dashed rgba(132,186,247,.24);border-radius:9px;color:#9bbbd7;font-size:12px;text-align:center;padding:12px}
.kvn-growth-focus__axis{display:flex;justify-content:space-between;gap:10px;margin-top:10px;color:#849fbf;font-size:10px}
.kvn-growth-focus__bottom{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-top:19px}
.kvn-growth-focus__source{margin:0;color:#819fbf;font-size:10px;line-height:1.7}
.kvn-growth-focus__link{display:inline-flex;align-items:center;gap:8px;color:#b9e4ff;font-size:11px;font-weight:800;letter-spacing:.07em;text-decoration:none}
.kvn-growth-focus__link:hover,.kvn-growth-focus__link:focus-visible{color:#fff;text-decoration:underline;text-underline-offset:5px}
.kvn-growth-focus[data-motion="up"] .kvn-growth-focus__primary{box-shadow:inset 0 0 38px rgba(73,182,255,.2)}
.kvn-growth-focus[data-motion="down"] .kvn-growth-focus__primary{box-shadow:inset 0 0 38px rgba(252,144,168,.11)}

/* Player Momentum: measured trend and accessible history window controls. */
.kvn-growth-focus__range{display:inline-flex;align-items:center;gap:3px;padding:4px;border:1px solid rgba(130,196,255,.22);background:rgba(4,20,46,.5);border-radius:999px}
.kvn-growth-focus__range button{appearance:none;cursor:pointer;border:0;background:transparent;color:#9dbbdc;border-radius:999px;padding:7px 12px;font:800 11px/1.3 'Inter',system-ui,sans-serif;transition:background .18s ease,color .18s ease}
.kvn-growth-focus__range button[aria-pressed="true"]{background:rgba(74,165,252,.25);color:#f0faff;box-shadow:inset 0 0 0 1px rgba(135,207,255,.34)}
.kvn-growth-focus__range button:focus-visible{outline:2px solid #92d9ff;outline-offset:3px}
.kvn-growth-focus__insight{display:flex;align-items:center;gap:10px;margin-top:17px;padding:13px 15px;border:1px solid rgba(121,192,255,.18);border-radius:11px;background:rgba(25,68,119,.17);color:#b5cfe9;font-size:12px;line-height:1.55}
.kvn-growth-focus__insight-mark{display:inline-flex;flex:0 0 auto;justify-content:center;align-items:center;border-radius:10px;width:29px;height:29px;background:rgba(104,167,239,.12);color:#a7d8ff;font-size:16px;font-weight:800}
.kvn-growth-focus__insight[data-direction="up"]{border-color:rgba(96,206,255,.28);color:#d1f4ff}
.kvn-growth-focus__insight[data-direction="up"] .kvn-growth-focus__insight-mark{background:rgba(64,179,248,.2);color:#82ddff}
.kvn-growth-focus__insight[data-direction="down"]{border-color:rgba(249,161,188,.2);color:#ffd4de}
.kvn-growth-focus__insight[data-direction="down"] .kvn-growth-focus__insight-mark{background:rgba(236,125,154,.13);color:#ffc3d0}
@media(max-width:470px){.kvn-growth-focus__range button{padding:7px 11px}.kvn-growth-focus__insight{padding:11px 12px;font-size:11px}}
@media(max-width:780px){.kvn-growth-focus__head{flex-direction:column}.kvn-growth-focus__grid{grid-template-columns:1fr}.kvn-growth-focus__side{grid-template-columns:1fr 1fr;grid-template-rows:auto}.kvn-growth-focus__primary{min-height:220px}}
@media(max-width:470px){.kvn-growth-focus__surface{padding:18px;border-radius:19px}.kvn-growth-focus__grid,.kvn-growth-focus__side{gap:9px}.kvn-growth-focus__primary{padding:20px;min-height:185px}.kvn-growth-focus__tile{padding:16px}.kvn-growth-focus__tile-value{font-size:29px}.kvn-growth-focus__timeline{padding:17px}.kvn-growth-focus__timeline-head{align-items:flex-start;flex-direction:column}.kvn-growth-focus__signal{font-size:9px;padding:10px 12px}.kvn-growth-focus__value{font-size:clamp(63px,18vw,90px)}}
@media(prefers-reduced-motion:reduce){.kvn-growth-focus__bar,.kvn-growth-focus__primary{transition:none!important}}


/* When the existing Command Center is present, avoid duplicate headline metrics. */
.kvn-growth-focus--history-only{margin-top:20px;margin-bottom:30px}
.kvn-growth-focus--history-only .kvn-growth-focus__surface{padding:clamp(19px,2.4vw,30px)}
.kvn-growth-focus--history-only .kvn-growth-focus__head{margin-bottom:17px}
.kvn-growth-focus--history-only h2{font-size:clamp(25px,3vw,36px)}
.kvn-growth-focus--history-only .kvn-growth-focus__primary,
.kvn-growth-focus--history-only .kvn-growth-focus__side{display:none}
.kvn-growth-focus--history-only .kvn-growth-focus__grid{display:block}
.kvn-growth-focus--history-only .kvn-growth-focus__timeline{width:100%}
.kvn-growth-focus--history-only .kvn-growth-focus__timeline .kvn-growth-focus__bars{height:95px}

/* Accurate time-aligned momentum: never smooth across missing Roblox data. */
.kvn-growth-focus__coverage{margin:0 0 12px;color:#9bbbd7;font:700 10px/1.5 'Outfit',system-ui,sans-serif;letter-spacing:.06em}
.kvn-growth-focus__bars{gap:clamp(2px,.4vw,7px)}
.kvn-growth-focus__bar{flex:1;min-width:0}
.kvn-growth-focus__bar.is-empty{height:20%!important;background:repeating-linear-gradient(135deg,rgba(99,145,202,.08) 0 4px,rgba(99,145,202,.2) 4px 8px);border:1px dashed rgba(126,172,222,.31);box-shadow:none;opacity:.72}
.kvn-growth-focus__bar.is-empty.is-latest{box-shadow:none}
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
        '<div class="kvn-growth-focus__timeline"><div class="kvn-growth-focus__timeline-head"><div><span class="kvn-growth-focus__label">RECENT VERIFIED PLAYER MEASUREMENTS</span><small id="kvnPulseSamples">MEASUREMENTS PENDING</small></div><div class="kvn-growth-focus__range" role="group" aria-label="Player history time range"><button type="button" data-pulse-range="1h" aria-pressed="false">1H</button><button type="button" data-pulse-range="24h" aria-pressed="true">24H</button></div></div>'+
          '<p class="kvn-growth-focus__coverage" id="kvnPulseCoverage">Gaps are shown when there are no verified readings.</p><div id="kvnPulseBars" class="kvn-growth-focus__empty">Roblox history will appear when actual samples are available.</div>'+
          '<div class="kvn-growth-focus__axis"><span id="kvnPulseStart">—</span><span id="kvnPulseEnd">—</span></div>'+ 
      '<div class="kvn-growth-focus__insight" id="kvnPulseInsight" data-direction="none"><span class="kvn-growth-focus__insight-mark" id="kvnPulseInsightIcon" aria-hidden="true">•</span><span id="kvnPulseInsightText">Waiting for enough verified samples to calculate the measured trend.</span></div>'+
        '</div>'+
      '</div>'+
      '<div class="kvn-growth-focus__bottom"><p class="kvn-growth-focus__source" id="kvnPulseSource">Source: verified Roblox public API · missing data is never filled in</p><a href="#analytics" class="kvn-growth-focus__link">EXPLORE FULL ANALYTICS <span aria-hidden="true">↗</span></a></div>'+
    '</div>';
  ticker.insertAdjacentElement('afterend',node);
  if(document.querySelector('.kvn-command')){
    node.classList.add('kvn-growth-focus--history-only');
    const title=node.querySelector('h2');
    if(title)title.innerHTML='PLAYER <span>MOMENTUM.</span>';
    const intro=node.querySelector('.kvn-growth-focus__intro');
    if(intro)intro.textContent='A visual timeline of the most recent verified player measurements — no made-up points.';
  }
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
  let selectedRange='24h';
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

    const period=selectedRange==='1h'?3600000:86400000;
    const selected=history.filter(p=>p.t>=now-period);
    const tail=selected.slice(-12);
    byId('kvnPulseSamples').textContent=selected.length+' VERIFIED SAMPLE'+(selected.length===1?'':'S')+' · '+selectedRange.toUpperCase();

    // The peak stays a 24-hour measurement, even if the graph is showing 1H.
    if(history.length){
      peak.textContent=fmtCount(Math.max(...history.map(p=>p.ccu)));
      peakNote.textContent='Observed in '+history.length+' actual sample'+(history.length===1?'':'s')+' · not an official all-time record';
    }else{
      peak.textContent='—';
      peakNote.textContent='Waiting for measured history';
    }

    const insight=byId('kvnPulseInsight');
    const insightText=byId('kvnPulseInsightText');
    const insightIcon=byId('kvnPulseInsightIcon');
    insight.dataset.direction='none';
    insightIcon.textContent='•';

    if(!tail.length){
      const bars=byId('kvnPulseBars');
      bars.className='kvn-growth-focus__empty';
      bars.textContent='No verified measurements in the selected time range.';
      byId('kvnPulseStart').textContent='—';
      byId('kvnPulseEnd').textContent='—';
      insightText.textContent='Choose 24H or check back after new verified Roblox measurements.';
      return;
    }

    if(selected.length<2){
      insightText.textContent='One verified reading is available. Two different measurements are needed to show player momentum.';
    }else{
      const first=selected[0],last=selected[selected.length-1];
      const delta=last.ccu-first.ccu;
      const minutes=Math.round((last.t-first.t)/60000);
      const coverage=minutes<1?'less than one minute':minutes+' measured minute'+(minutes===1?'':'s');
      insight.dataset.direction=delta>0?'up':delta<0?'down':'flat';
      insightIcon.textContent=delta>0?'↗':delta<0?'↘':'→';
      insightText.textContent='Measured change: '+(delta>0?'+':'')+fmtCount(delta)+' players across '+coverage+' ('+fmtTime(first.t)+'–'+fmtTime(last.t)+'). This compares recorded samples, not a prediction.';
    }

    // Chart bins follow real elapsed time; missing measurements stay visible as gaps.
    // 1H = 12 five-minute bins, 24H = 24 one-hour bins.
    const binsCount=selectedRange==='1h'?12:24;
    const fromTime=now-period;
    const bins=Array.from({length:binsCount},()=>({sum:0,count:0}));
    for(const reading of selected){
      if(reading.t>now+30000)continue;
      const idx=Math.max(0,Math.min(binsCount-1,Math.floor((reading.t-fromTime)/period*binsCount)));
      const bin=bins[idx];bin.sum+=reading.ccu;bin.count++;
    }
    const covered=bins.filter(bin=>bin.count>0).length;
    byId('kvnPulseCoverage').textContent=covered+' / '+binsCount+
      ' TIME INTERVALS MEASURED · '+(selectedRange==='1h'?'5-MINUTE':'HOURLY')+
      ' AVERAGES · HATCHED BARS = NO DATA';
    const bars=byId('kvnPulseBars');
    bars.className='kvn-growth-focus__bars';
    bars.replaceChildren();
    const measured=bins.filter(bin=>bin.count).map(bin=>bin.sum/bin.count);
    const lowest=Math.min(...measured),highest=Math.max(...measured);
    const lastMeasured=bins.reduce((idx,bin,i)=>bin.count?i:idx,-1);
    bins.forEach((bin,i)=>{
      const bar=document.createElement('span');
      bar.className='kvn-growth-focus__bar';
      bar.setAttribute('role','img');
      const intervalStart=fromTime+i*period/binsCount;
      const intervalEnd=fromTime+(i+1)*period/binsCount;
      const label=fmtTime(intervalStart)+'–'+fmtTime(intervalEnd);
      if(!bin.count){
        bar.classList.add('is-empty');
        bar.title=label+' · No verified reading';
      }else{
        const average=bin.sum/bin.count;
        const height=highest===lowest?58:27+(average-lowest)/(highest-lowest)*67;
        bar.style.setProperty('--pulse-height',height.toFixed(1)+'%');
        bar.title=label+' · Average '+average.toLocaleString('en-US',{maximumFractionDigits:1})+
          ' CCU based on '+bin.count+' verified reading'+(bin.count===1?'':'s');
      }
      if(i===lastMeasured)bar.classList.add('is-latest');
      bar.setAttribute('aria-label',bar.title);
      bars.append(bar);
    });
    byId('kvnPulseStart').textContent=fmtTime(fromTime);
    byId('kvnPulseEnd').textContent=fmtTime(now);
  }
  function showMotion(direction){
    if(flashTimer)clearTimeout(flashTimer);
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    node.dataset.motion=direction;
    flashTimer=setTimeout(()=>node.removeAttribute('data-motion'),1100);
  }
  node.querySelectorAll('[data-pulse-range]').forEach(button=>{
    button.addEventListener('click',()=>{
      if(selectedRange===button.dataset.pulseRange)return;
      selectedRange=button.dataset.pulseRange==='1h'?'1h':'24h';
      node.querySelectorAll('[data-pulse-range]').forEach(item=>{
        item.setAttribute('aria-pressed',String(item.dataset.pulseRange===selectedRange));
      });
      refreshHistory();
    });
  });
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
