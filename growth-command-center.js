/* Growth Command Center
   Decision-first homepage using only verified Roblox responses.
   No estimates are substituted for missing creator analytics. */
export const growthCommandMarkup = String.raw`
<section class="gc-shell wrap" id="growth" aria-labelledby="gc-title">
  <div class="gc-overline">
    <span class="gc-brandtag">KVN CLOTHING <span>/</span> GROWTH INTELLIGENCE</span>
    <span class="gc-status" id="gc-status"><span class="gc-status-dot"></span><span id="gc-status-text">CONNECTING TO ROBLOX</span></span>
  </div>
  <div class="gc-hero">
    <div class="gc-intro">
      <div class="gc-kicker"><span class="gc-kicker-line"></span> TRENDING EMOTES! / LIVE PERFORMANCE</div>
      <h1 id="gc-title">GROW THE GAME.<br><em>KEEP THE PLAYERS.</em></h1>
      <p>One clear place to understand your Roblox game's player momentum. Verified live activity, a fair 24-hour comparison and the next thing worth checking.</p>
      <div class="gc-actions"><a href="#gc-decision" class="gc-primary-action">SEE WHAT MATTERS <span aria-hidden="true">↗</span></a><a class="gc-secondary-action" href="#analytics">EXPLORE HISTORY <span aria-hidden="true">↘</span></a></div>
      <div class="gc-trust"><span class="gc-small-dot"></span> No fake numbers <span aria-hidden="true">·</span> Clearly labelled data sources <span aria-hidden="true">·</span> Updated from Roblox</div>
    </div>
    <article class="gc-live-panel" aria-labelledby="gc-live-label">
      <div class="gc-live-head"><span id="gc-live-label">PLAYERS ONLINE NOW</span><span class="gc-live-icon" aria-hidden="true">↗</span></div>
      <div class="gc-live-number" id="gc-live-value">—</div>
      <p class="gc-live-detail" id="gc-live-detail">Waiting for the first verified Roblox reading.</p>
      <div class="gc-chart-head"><span>OBSERVED PLAYER HISTORY / 24H</span><span id="gc-chart-coverage">CONNECTING</span></div>
      <svg class="gc-spark" id="gc-spark" viewBox="0 0 560 132" preserveAspectRatio="none" role="img" aria-label="Waiting for sampled Roblox player history"><line x1="0" y1="113" x2="560" y2="113" stroke="#34516c" stroke-width="1"/><line x1="0" y1="58" x2="560" y2="58" stroke="#29425a" stroke-width="1" stroke-dasharray="4 7"/><path id="gc-spark-path" d="" fill="none" stroke="#69c8ff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <div class="gc-live-foot"><span>24H AGO</span><span id="gc-last-sample">AWAITING HISTORY</span><span>NOW</span></div>
    </article>
  </div>
  <div class="gc-kpis" aria-label="Growth indicators">
    <article class="gc-kpi"><div class="gc-kpi-top"><span>24H AVG. PLAYERS</span><span class="gc-info" title="Average of recorded concurrent-player samples, not daily active users">ⓘ</span></div><strong id="gc-avg">—</strong><p id="gc-avg-note">Awaiting a reliable sample window</p></article>
    <article class="gc-kpi"><div class="gc-kpi-top"><span>VS. PREVIOUS 24H</span><span class="gc-info" title="Only displayed after both 24-hour periods contain enough measured samples">ⓘ</span></div><strong id="gc-change">—</strong><p id="gc-change-note">No trend verdict without full-period coverage</p></article>
    <article class="gc-kpi"><div class="gc-kpi-top"><span>RECORDED VISITS / ~24H</span><span class="gc-info" title="Change in the Roblox visits counter when at least 90% of the period is covered; not unique users">ⓘ</span></div><strong id="gc-visits">—</strong><p id="gc-visits-note">Collecting visit-counter history</p></article>
    <article class="gc-kpi gc-kpi-quality"><div class="gc-kpi-top"><span>DATA CONFIDENCE</span><span class="gc-info" title="Comparison requires sufficient observations in both full periods">ⓘ</span></div><strong id="gc-confidence">CHECKING</strong><p id="gc-confidence-note">Checking recorded history and source</p></article>
  </div>
  <div class="gc-decision-layout" id="gc-decision">
    <article class="gc-decision">
      <div class="gc-mini-heading"><span class="gc-mini-spark" aria-hidden="true">✦</span> YOUR GROWTH BRIEF <span class="gc-mini-index">/ 01</span></div>
      <div id="gc-decision-state" class="gc-decision-state" data-trend="waiting">AWAITING VERIFIED DATA</div>
      <h2 id="gc-decision-title">Know what is changing.</h2>
      <p id="gc-decision-text">A reliable comparison needs enough real concurrent-player readings for the past 24 hours and the 24 hours before that. Until then, no growth verdict is shown.</p>
      <div class="gc-decision-bottom"><span id="gc-decision-method">METHOD: AVERAGE SAMPLED CCU, 24H VS PREVIOUS 24H</span><a href="#officialMetrics">SEE OFFICIAL INSIGHTS ↗</a></div>
    </article>
    <aside class="gc-priorities" aria-labelledby="gc-priorities-title">
      <div class="gc-priorities-head"><span class="gc-mini-heading">NEXT BEST CHECKS</span><span>03 STEPS</span></div>
      <h3 id="gc-priorities-title">Turn insight into action.</h3>
      <ol id="gc-priorities-list">
        <li><b>01</b><span>Gather enough recorded history before declaring growth or decline.</span></li>
        <li><b>02</b><span>Check session duration and D1 retention in Roblox Creator Analytics.</span></li>
        <li><b>03</b><span>Review client FPS and crashes if players report lag.</span></li>
      </ol>
    </aside>
  </div>
  <div class="gc-funnel-head"><div><span class="gc-mini-heading">THE GROWTH LOOP / 02</span><h2>REACH <span>→</span> ENGAGE <span>→</span> RETURN</h2></div><a href="https://create.roblox.com/dashboard/creations" target="_blank" rel="noopener noreferrer">OPEN CREATOR DASHBOARD ↗</a></div>
  <div class="gc-funnel">
    <article><span class="gc-step">01 / REACH</span><strong id="gc-loop-reach">—</strong><p id="gc-loop-reach-note">Observed visit-counter change once there is enough history.</p></article>
    <article><span class="gc-step">02 / ENGAGE</span><strong id="gc-loop-stay">—</strong><p id="gc-loop-stay-note">Average session length requires authorized Creator Analytics.</p></article>
    <article><span class="gc-step">03 / RETURN</span><strong id="gc-loop-return">—</strong><p id="gc-loop-return-note">D1 retention requires authorized Creator Analytics.</p></article>
  </div>
  <p class="gc-disclaimer"><strong>READ THIS CORRECTLY.</strong> CCU is concurrent players, not unique players. 24-hour comparisons use only observed samples with sufficient coverage. Creator-only engagement and retention metrics stay blank until a verified, authorized Roblox response is available. Gaps are never filled with invented values.</p>
  <div class="gc-section-jump"><a href="#dashboard">LIVE GAME METRICS <span>↘</span></a><a href="#analytics">DETAILED TRENDS <span>↘</span></a><a href="#officialMetrics">OFFICIAL CREATOR DATA <span>↘</span></a></div>
</section>`;

export const growthCommandCSS = String.raw`
/* A focused, responsive first fold, intentionally separate from legacy cards. */
html{scroll-padding-top:96px}
body .hero,body .ticker{display:none!important}
.gc-shell{position:relative;padding-top:38px;padding-bottom:34px;color:#f4f8ff}
.gc-shell *{box-sizing:border-box}
.gc-overline{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:0 0 22px;border-bottom:1px solid rgba(144,183,228,.15)}
.gc-brandtag{color:#aebfda;font:800 10px/1.4 'Outfit',system-ui,sans-serif;letter-spacing:.17em}.gc-brandtag span{color:#5dbeff;margin:0 8px}
.gc-status{display:flex;align-items:center;gap:9px;border:1px solid #315b78;padding:9px 13px;border-radius:100px;background:rgba(17,47,76,.7);color:#92c7e9;font:800 10px/1.4 'Outfit',sans-serif;letter-spacing:.075em}
.gc-status-dot{width:7px;height:7px;flex:none;border-radius:50%;background:#f9bc79;box-shadow:0 0 11px #f9bc7960}
.gc-status[data-status="live"] .gc-status-dot{background:#63e2b5;box-shadow:0 0 12px #63e2b55c}
.gc-status[data-status="stale"] .gc-status-dot{background:#f9bc79}
.gc-hero{display:grid;grid-template-columns:minmax(0,1.12fr) minmax(0,.88fr);gap:clamp(30px,5vw,70px);padding:64px 0 38px;align-items:center}
.gc-kicker{color:#78c9ff;font:800 10px/1.4 'Outfit',sans-serif;letter-spacing:.19em;display:flex;align-items:center;gap:12px}
.gc-kicker-line{width:24px;height:2px;background:#65c9ff}
.gc-intro h1{font:900 clamp(45px,5.15vw,77px)/.99 'Archivo','Outfit',sans-serif;letter-spacing:-.058em;margin:25px 0 20px;color:#f4f8ff;max-width:830px}
.gc-intro h1 em{font-style:normal;color:#73c7ff}
.gc-intro p{max-width:580px;font:500 14px/1.8 'Outfit',system-ui,sans-serif;color:#afc3dc}
.gc-actions{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-top:29px}
.gc-actions a{display:inline-flex;align-items:center;justify-content:center;gap:16px;padding:14px 18px;border-radius:10px;font:800 11px/1.3 'Outfit',sans-serif;letter-spacing:.055em;transition:transform .2s,border-color .2s}
.gc-actions a:hover{transform:translateY(-2px)}
.gc-primary-action{background:#77cbff;color:#081c31!important;border:1px solid #77cbff}
.gc-secondary-action{border:1px solid #3d658a;color:#d6eafe!important;background:rgba(12,32,56,.4)}
.gc-trust{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:25px;font:600 10px/1.5 'Outfit',sans-serif;color:#829cb8}
.gc-small-dot{display:inline-block;width:5px;height:5px;background:#6fe2be;border-radius:50%}
.gc-live-panel{min-width:0;position:relative;padding:30px 28px 22px;border:1px solid #3a6b94;border-radius:22px;background:radial-gradient(circle at 88% 12%,rgba(89,189,255,.17),transparent 45%),linear-gradient(146deg,#152d4e,#091c35 75%);box-shadow:0 24px 90px rgba(0,5,24,.36)}
.gc-live-panel:before{content:"";position:absolute;inset:8px;pointer-events:none;border:1px solid rgba(153,210,255,.05);border-radius:17px}
.gc-live-head{display:flex;align-items:center;justify-content:space-between;color:#9dcaeb;font:800 10px/1.3 'Outfit',sans-serif;letter-spacing:.17em}
.gc-live-icon{display:grid;place-items:center;width:33px;height:33px;border:1px solid #47749d;border-radius:11px;color:#79d3ff;font-size:18px}
.gc-live-number{font:900 clamp(84px,9vw,144px)/1 'Archivo','Outfit',sans-serif;letter-spacing:-.075em;color:#e9f7ff;margin:22px 0 0;font-variant-numeric:tabular-nums;overflow-wrap:anywhere}
.gc-live-detail{font:600 11px/1.6 'Outfit',sans-serif;color:#94b5d1;min-height:35px}
.gc-chart-head{display:flex;gap:9px;justify-content:space-between;align-items:center;margin-top:27px;font:800 9px/1.5 'Outfit',sans-serif;letter-spacing:.11em;color:#90b1d1}
.gc-chart-head span:last-child{color:#6cdbb6;text-align:right}
.gc-spark{display:block;width:100%;height:125px;margin:7px 0 0;overflow:visible}
.gc-live-foot{display:flex;justify-content:space-between;gap:8px;color:#7693b1;font:700 9px/1.5 'Outfit',sans-serif;letter-spacing:.07em}
.gc-live-foot span:nth-child(2){text-align:center;color:#a2b9d5}
.gc-kpis{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin:2px 0 25px}
.gc-kpi{padding:22px 23px 23px;min-height:169px;background:linear-gradient(160deg,rgba(23,47,78,.92),rgba(10,28,53,.92));border:1px solid #2b4b70;border-radius:16px;min-width:0}
.gc-kpi-top{display:flex;justify-content:space-between;gap:9px;align-items:center;color:#92b6d8;font:800 10px/1.5 'Outfit',sans-serif;letter-spacing:.115em}
.gc-info{font-size:15px;cursor:help;color:#7394b5}
.gc-kpi strong{display:block;color:#f1f9ff;font:900 clamp(28px,2.8vw,43px)/1.2 'Archivo','Outfit',sans-serif;letter-spacing:-.035em;margin-top:17px;font-variant-numeric:tabular-nums;overflow-wrap:anywhere}
.gc-kpi strong[data-direction="up"]{color:#75e1bc}.gc-kpi strong[data-direction="down"]{color:#ffae9e}
.gc-kpi p{color:#8eaaca;font:500 11px/1.6 'Outfit',sans-serif;margin:7px 0 0}
.gc-kpi-quality{background:linear-gradient(160deg,#153550,#0c223c);border-color:#3d7395}.gc-kpi-quality strong{font-size:clamp(21px,2vw,30px);letter-spacing:-.01em;color:#9edbff}
.gc-decision-layout{display:grid;grid-template-columns:minmax(0,1.23fr) minmax(0,.77fr);gap:14px;scroll-margin-top:110px}
.gc-decision,.gc-priorities{padding:29px 31px;border-radius:19px;min-width:0}
.gc-decision{background:radial-gradient(circle at 90% 10%,rgba(109,184,255,.13),transparent 45%),linear-gradient(145deg,#163656,#0c233c);border:1px solid #3f7195;display:flex;flex-direction:column}
.gc-mini-heading{display:inline-flex;gap:9px;align-items:center;color:#83c8f7;font:800 10px/1.45 'Outfit',sans-serif;letter-spacing:.14em}.gc-mini-spark{font-size:17px}.gc-mini-index{color:#7291ae}
.gc-decision-state{align-self:flex-start;color:#9dc7f0;background:rgba(105,178,248,.13);border:1px solid rgba(132,191,241,.27);border-radius:30px;padding:7px 12px;margin:24px 0 13px;font:800 10px/1.2 'Outfit',sans-serif;letter-spacing:.06em}
.gc-decision-state[data-trend="up"]{color:#79e1be;background:#3c9e7d17;border-color:#66c69a55}
.gc-decision-state[data-trend="down"]{color:#ffc2ac;background:#f19e7c14;border-color:#efad985a}
.gc-decision h2{color:#f0f7ff;font:900 clamp(26px,2.7vw,38px)/1.12 'Archivo','Outfit',sans-serif;letter-spacing:-.04em}
.gc-decision>p{color:#a9c1dc;font:500 13px/1.8 'Outfit',sans-serif;margin:13px 0 24px;max-width:600px}
.gc-decision-bottom{margin-top:auto;padding-top:19px;border-top:1px solid #3a6080;display:flex;justify-content:space-between;align-items:center;gap:13px;flex-wrap:wrap}
.gc-decision-bottom span{color:#86a6c5;font:800 9px/1.6 'Outfit',sans-serif;letter-spacing:.07em}
.gc-decision-bottom a{color:#8cd1ff;font:800 10px/1.5 'Outfit',sans-serif}
.gc-priorities{background:#0d203b;border:1px solid #294a6a}
.gc-priorities-head{display:flex;justify-content:space-between;gap:9px;align-items:center;color:#819fbd;font:800 9px/1.4 'Outfit',sans-serif;letter-spacing:.08em}
.gc-priorities h3{font:900 clamp(22px,2.1vw,28px)/1.2 'Archivo','Outfit',sans-serif;letter-spacing:-.025em;color:#e9f5ff;margin:17px 0 18px}
.gc-priorities ol{list-style:none;margin:0;padding:0}
.gc-priorities li{display:flex;gap:14px;align-items:flex-start;padding:13px 0;border-top:1px solid #26445f;font:500 12px/1.65 'Outfit',sans-serif;color:#a8c0da}
.gc-priorities li b{color:#7dd0ff;font:800 11px/1.6 'Outfit',sans-serif}
.gc-funnel-head{display:flex;justify-content:space-between;align-items:end;gap:18px;margin-top:55px;margin-bottom:20px}
.gc-funnel-head h2{color:#f2f8ff;font:900 clamp(25px,3vw,42px)/1.12 'Archivo','Outfit',sans-serif;letter-spacing:-.035em;margin-top:10px}
.gc-funnel-head h2 span{color:#73c7ff;margin:0 4px}
.gc-funnel-head a{color:#9ecff1;font:800 10px/1.6 'Outfit',sans-serif;letter-spacing:.05em;white-space:nowrap}
.gc-funnel{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.gc-funnel article{min-width:0;min-height:170px;border:1px solid #315170;border-radius:15px;padding:23px 24px;background:#0f2643}
.gc-step{color:#8dc8f5;font:800 10px/1.5 'Outfit',sans-serif;letter-spacing:.1em}
.gc-funnel strong{display:block;margin:16px 0 7px;font:900 clamp(27px,3vw,42px)/1.12 'Archivo','Outfit',sans-serif;color:#f3faff;letter-spacing:-.035em;font-variant-numeric:tabular-nums}
.gc-funnel p{color:#9fb6cf;font:500 11px/1.65 'Outfit',sans-serif}
.gc-disclaimer{margin:18px 0 25px;color:#86a0be;font:500 11px/1.7 'Outfit',sans-serif;max-width:1060px}.gc-disclaimer strong{color:#a8cbe9;margin-right:4px}
.gc-section-jump{display:flex;gap:10px;flex-wrap:wrap}.gc-section-jump a{color:#b9d4ec;border:1px solid #2a4a69;background:#0c213a;border-radius:8px;padding:10px 14px;font:800 10px/1.3 'Outfit',sans-serif;letter-spacing:.06em}.gc-section-jump span{color:#76c9fa;margin-left:12px}
@media(max-width:1060px){.gc-hero{grid-template-columns:1fr 1fr;gap:26px}.gc-intro h1{font-size:clamp(39px,5.5vw,64px)}.gc-kpis{grid-template-columns:repeat(2,minmax(0,1fr))}.gc-decision-layout{grid-template-columns:1fr 1fr}}
@media(max-width:760px){.gc-shell{padding-top:20px}.gc-overline{gap:10px}.gc-brandtag{font-size:9px;letter-spacing:.08em}.gc-status{font-size:9px;padding:7px 9px;letter-spacing:.01em}.gc-hero{grid-template-columns:1fr;padding:41px 0 28px;gap:29px}.gc-intro h1{font-size:clamp(43px,8vw,70px);letter-spacing:-.05em;margin:18px 0}.gc-intro p{font-size:13px}.gc-live-panel{padding:24px 21px 17px}.gc-live-number{font-size:clamp(80px,17vw,128px)}.gc-decision-layout{grid-template-columns:1fr}.gc-funnel-head{display:block;margin-top:38px}.gc-funnel-head a{display:inline-block;margin-top:16px}.gc-funnel{grid-template-columns:1fr}.gc-funnel article{min-height:0}.gc-funnel strong{font-size:34px}}
@media(max-width:460px){.gc-overline{align-items:flex-start;flex-direction:column}.gc-hero{padding-top:28px}.gc-intro h1{font-size:clamp(37px,10.2vw,48px)}.gc-actions a{font-size:10px;padding:13px 14px}.gc-kpis{gap:9px}.gc-kpi{padding:17px 15px;min-height:154px}.gc-kpi-top{font-size:9px}.gc-kpi strong{font-size:clamp(24px,7vw,34px)}.gc-kpi-quality strong{font-size:21px}.gc-decision,.gc-priorities{padding:23px 20px}.gc-spark{height:100px}.gc-funnel-head h2{font-size:27px}.gc-funnel-head h2 span{margin:0 2px}}
@media(prefers-reduced-motion:reduce){.gc-actions a{transition:none}}
`;

export const growthCommandJS = String.raw`
(function(){
 'use strict';
 const root=document.getElementById('growth');
 if(!root)return;
 const el=id=>document.getElementById(id);
 const nice=n=>Number.isFinite(n)?new Intl.NumberFormat('en-US',{maximumFractionDigits:1}).format(n):'—';
 const dateTime=t=>Number.isFinite(t)?new Date(t).toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'}):'—';
 const DAY=86400000;
 let lastValidStats=null,historyPayload=null,historyProblem=false,historyInFlight=false;
 function status(mode,message){
   const a=el('gc-status');a.dataset.status=mode;
   el('gc-status-text').textContent=message;
 }
 function live(s){
   if(!s||!Number.isSafeInteger(s.playing)||s.playing<0||!Number.isFinite(s.timestamp))return;
   const age=Date.now()-s.timestamp;
   const fresh=!s.stale&&age>=-30000&&age<=90000;
   el('gc-live-value').textContent=nice(s.playing);
   el('gc-live-detail').textContent=(fresh?'Verified Roblox measurement':'Previously verified measurement · not live')+' · '+dateTime(s.timestamp);
   el('gc-last-sample').textContent='LAST CHECK '+dateTime(s.timestamp);
   status(fresh?'live':'stale',fresh?'LIVE ROBLOX SIGNAL':'LAST VERIFIED / NOT LIVE');
   if(fresh)lastValidStats=s;
 }
 function drawSpark(points){
   const valid=points.filter(p=>p&&Number.isFinite(p.t)&&Number.isFinite(p.ccu)&&p.ccu>=0).sort((a,b)=>a.t-b.t);
   const path=el('gc-spark-path');
   if(valid.length<2){path.setAttribute('d','');el('gc-spark').setAttribute('aria-label','Not enough observed history for a player chart');return;}
   const first=valid[0].t,last=valid[valid.length-1].t;
   const vals=valid.map(p=>p.ccu),min=Math.min(...vals),max=Math.max(...vals),range=Math.max(1,max-min);
   const x=t=>12+(t-first)/Math.max(1,last-first)*536;
   const y=v=>113-(v-min)/range*95;
   let cmd='';
   for(let i=0;i<valid.length;i++){
     const p=valid[i],gap=i>0?p.t-valid[i-1].t:0;
     const verb=(i===0||gap>1800000)?'M':'L';
     cmd+=verb+x(p.t).toFixed(1)+' '+y(p.ccu).toFixed(1)+' ';
   }
   path.setAttribute('d',cmd.trim());
   el('gc-spark').setAttribute('aria-label',valid.length+' observed concurrent-player measurements from '+dateTime(first)+' to '+dateTime(last)+'. Gaps longer than 30 minutes are not connected.');
 }
 function setPriorities(rows){
   const box=el('gc-priorities-list');
   box.replaceChildren();
   rows.forEach((value,i)=>{
     const li=document.createElement('li'),b=document.createElement('b'),span=document.createElement('span');
     b.textContent=String(i+1).padStart(2,'0');
     span.textContent=value;
     li.append(b,span);box.append(li);
   });
 }
 function verdict(kind,chip,title,description,steps){
   const tag=el('gc-decision-state');
   tag.dataset.trend=kind;tag.textContent=chip;
   el('gc-decision-title').textContent=title;
   el('gc-decision-text').textContent=description;
   setPriorities(steps);
 }
 function renderHistory(){
   const body=historyPayload,pts=Array.isArray(body?.points)?body.points.filter(p=>p&&Number.isFinite(p.t)).sort((a,b)=>a.t-b.t):[];
   if(body?.storage==='cloud'&&pts.length>=2)drawSpark(pts);
   else drawSpark([]);
   el('gc-chart-coverage').textContent=body?.storage==='cloud'&&pts.length>=2?nice(pts.length)+' RECORDED POINTS':'NOT ENOUGH HISTORY';
   const trustworthy=body?.storage==='cloud'&&body.comparison?.state==='ready'
     &&body.comparison.metric==='sampled_average_ccu'
     &&body.comparison.range==='24h'
     &&Number.isFinite(body.comparison.current)&&Number.isFinite(body.comparison.previous);
   const avg=trustworthy?body.comparison.current:null;
   el('gc-avg').textContent=nice(avg);
   el('gc-avg-note').textContent=trustworthy?'Verified sampled CCU · past 24 hours':'Requires full coverage for both periods';
   const span=pts.length>=2?pts[pts.length-1].t-pts[0].t:0;
   const visitsReady=body?.storage==='cloud'&&span>=DAY*.9
     &&Number.isFinite(pts[0]?.visits)&&Number.isFinite(pts[pts.length-1]?.visits)
     &&pts[pts.length-1].visits>=pts[0].visits;
   const visits=visitsReady?pts[pts.length-1].visits-pts[0].visits:null;
   el('gc-visits').textContent=nice(visits);
   el('gc-visits-note').textContent=visitsReady?'Recorded visit-counter difference; not unique users':'At least 90% observed window needed';
   el('gc-loop-reach').textContent=nice(visits);
   el('gc-loop-reach-note').textContent=visitsReady?'Observed new visits, over at least 90% of 24H':'Awaiting observed visit-counter history';
   if(!trustworthy){
     el('gc-change').textContent='—';el('gc-change').removeAttribute('data-direction');
     el('gc-change-note').textContent='Not enough samples to compare two full days';
     el('gc-confidence').textContent=historyProblem?'DATA DELAY':'BUILDING';
     el('gc-confidence-note').textContent=body?.storage==='cloud'?'Need both 24H windows sampled':'History unavailable or D1 not connected';
     verdict('waiting','INSUFFICIENT COMPARISON DATA','Build a reliable baseline first.',
       'No growth or decline verdict yet. Two complete 24-hour windows need enough recorded Roblox player samples. Missing data is never treated as zero.',
       ['Keep automated history collection active so both periods become comparable.',
        'Review the player trend once enough verified observations are available.',
        'Use Creator Analytics to check session time, D1 retention and performance.']);
     return;
   }
   const prev=body.comparison.previous;
   const diff=avg-prev;
   const pct=prev>0?100*diff/prev:null;
   el('gc-change').textContent=pct===null?(avg>0?'FROM ZERO':'0%'):(pct>0?'+':'')+pct.toFixed(1)+'%';
   el('gc-change').dataset.direction=diff>0?'up':diff<0?'down':'flat';
   el('gc-change-note').textContent='Sampled average '+nice(avg)+' vs '+nice(prev)+' CCU';
   el('gc-confidence').textContent='VERIFIED';
   el('gc-confidence-note').textContent='Both 24H periods meet 70%+ sample coverage';
   if(prev===0&&avg>0){
     verdict('up','ACTIVITY RECOVERED FROM ZERO','Players are back online.',
       'The measured average concurrent-player count rose above zero. Keep tracking the trend; CCU alone cannot establish the source of new players.',
       ['Review discovery traffic in Roblox Creator Dashboard.',
        'Check whether players stay through the first minute and return the next day.',
        'Confirm mobile FPS and crash metrics remain healthy.']);
   }else if(pct!==null&&pct<=-10){
     verdict('down','LOWER PLAYER ACTIVITY','Find out what changed.',
       'Average observed CCU is '+Math.abs(pct).toFixed(1)+'% lower than the previous 24 hours. This is a measured activity change, not proof that retention or discovery caused it.',
       ['Compare discovery impressions and click-through in Creator Analytics.',
        'Inspect session duration, D1 retention and recent game updates.',
        'Check FPS/crash metrics, especially if players mention lag.']);
   }else if(pct!==null&&pct>=10){
     verdict('up','HIGHER PLAYER ACTIVITY','Protect the momentum.',
       'Average observed CCU is '+pct.toFixed(1)+'% higher than the previous 24 hours. Confirm the improvement persists and watch the quality of those player sessions.',
       ['Identify which discovery source or update coincided with the change.',
        'Check average session length and D1 retention alongside CCU.',
        'Track mobile performance so the experience remains smooth.']);
   }else{
     verdict('flat','SIMILAR PLAYER ACTIVITY','Run one focused improvement test.',
       'Average observed CCU changed by '+(pct===null?'an unquantified amount':Math.abs(pct).toFixed(1)+'%')+' versus the previous 24 hours. Test one change at a time and monitor verified results.',
       ['Review discovery impressions and thumbnail click-through.',
        'Test a clearer first-minute experience, then check session length.',
        'Compare the next full 24-hour period without mixing multiple changes.']);
   }
 }
 function renderOfficial(){
   const data=window.__kvnPublishedAnalytics;
   const find=id=>Array.isArray(data?.metrics)?data.metrics.find(m=>m?.id===id&&m.state==='ready'&&Number.isFinite(m.latest?.value)):null;
   const stay=find('AverageSessionLengthMinutes');
   const ret=find('ForwardD1Retention');
   if(stay&&stay.latest.value>=0){
     el('gc-loop-stay').textContent=nice(stay.latest.value)+' min';
     el('gc-loop-stay-note').textContent='Roblox Creator Analytics · '+(stay.latest.date||'last complete day');
   }else{
     el('gc-loop-stay').textContent='—';
     el('gc-loop-stay-note').textContent='Requires verified Creator Analytics session duration';
   }
   if(ret&&ret.latest.value>=0&&ret.latest.value<=1){
     el('gc-loop-return').textContent=(ret.latest.value*100).toFixed(1)+'%';
     el('gc-loop-return-note').textContent='Official D1 cohort · '+(ret.latest.date||'last complete day');
   }else{
     el('gc-loop-return').textContent='—';
     el('gc-loop-return-note').textContent='Requires verified official D1 retention (fractional value)';
   }
 }
 async function refreshHistory(){
   if(historyInFlight||document.hidden)return;
   historyInFlight=true;
   const ctrl=new AbortController(),timer=setTimeout(()=>ctrl.abort(),7500);
   try{
     const r=await fetch('/api/history?range=24h',{cache:'no-store',signal:ctrl.signal});
     if(!r.ok)throw new Error('History API unavailable');
     const d=await r.json();
     if(!d||!['cloud','browser'].includes(d.storage))throw new Error('Invalid history response');
     historyPayload=d;historyProblem=false;
   }catch{
     historyProblem=true;
   }finally{
     clearTimeout(timer);historyInFlight=false;renderHistory();
   }
 }
 window.addEventListener('kvn:verified-stats',e=>live(e.detail?.stats));
 window.addEventListener('kvn:stats-unavailable',()=>{
   status('stale','LIVE DATA TEMPORARILY UNAVAILABLE');
   if(lastValidStats)el('gc-live-detail').textContent='Last verified at '+dateTime(lastValidStats.timestamp)+' · refresh delayed';
 });
 window.addEventListener('kvn:official-analytics',renderOfficial);
 window.addEventListener('online',refreshHistory);
 document.addEventListener('visibilitychange',()=>{if(!document.hidden){refreshHistory();renderOfficial();}});
 setInterval(refreshHistory,120000);
 renderOfficial();refreshHistory();
})();`;
