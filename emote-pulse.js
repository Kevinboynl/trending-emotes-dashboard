/* Emote Pulse: topic-focused experience layer; no new API calls or fake values. */
export const pulseMarkup = String.raw`
<section class="ep-section wrap" id="pulse" aria-labelledby="ep-title">
  <div class="ep-heading">
    <div>
      <div class="ep-overline"><span class="ep-star" aria-hidden="true">✦</span> THE LIVE EMOTE PULSE <span class="ep-index">/ 001</span></div>
      <h2 id="ep-title">FEEL THE <span>PULSE.</span></h2>
      <p>One Roblox experience. A live signal from the players in it. Follow the crowd as it moves.</p>
    </div>
    <div class="ep-heading-side"><span class="ep-small-dot" aria-hidden="true"></span><span>POWERED BY VERIFIED ROBLOX DATA</span></div>
  </div>
  <div class="ep-board">
    <div class="ep-live-pane">
      <div class="ep-pane-kicker"><span class="ep-dot" aria-hidden="true"></span><span id="ep-state">CONNECTING TO ROBLOX</span><span class="ep-panel-index">SIGNAL / 01</span></div>
      <div class="ep-count-wrap"><strong id="ep-count" aria-label="Verified concurrent players">—</strong><span class="ep-ccu-tag">CCU<span>LIVE PLAYERS</span></span></div>
      <div class="ep-delta" id="ep-delta" data-direction="unknown" role="status" aria-live="polite">Waiting for the first verified measurement</div>
      <div class="ep-signal-line" aria-hidden="true"></div>
      <div class="ep-pane-footer"><span>LAST VERIFIED MEASUREMENT</span><time id="ep-time">—</time></div>
    </div>
    <div class="ep-graph-pane">
      <div class="ep-graph-top"><div><span class="ep-overline">THE PLAYER RHYTHM</span><h3>Live activity</h3></div><span class="ep-chart-label">MEASURED CCU / LAST 12 SAMPLES</span></div>
      <div class="ep-bars" id="ep-bars" aria-label="Waiting for verified player count samples">
        <div class="ep-chart-empty" id="ep-empty">Waiting for Roblox measurements…</div>
      </div>
      <div class="ep-graph-bottom">
        <div><small>HIGHEST SEEN THIS VISIT</small><strong id="ep-visit-high">—</strong></div>
        <div><small>VERIFIED SAMPLES SHOWN</small><strong id="ep-samples">—</strong></div>
      </div>
      <p class="ep-disclaimer">Only observed player counts are shown. The bars use a relative scale; missing intervals are never filled in.</p>
    </div>
  </div>
  <div class="ep-footline"><span>01 — LIVE SIGNAL</span><span>02 — <a href="#dashboard">EXPERIENCE OVERVIEW</a></span><span>03 — <a href="#analytics">GROWTH & ACTIVITY</a></span></div>
</section>
`;

export const pulseCSS = String.raw`
/* EMOTE PULSE: KVN's existing deep-navy and electric-blue palette. */
.ep-section{position:relative;padding-top:42px;padding-bottom:30px;scroll-margin-top:116px}
.ep-heading{display:flex;justify-content:space-between;align-items:flex-end;gap:22px;margin:0 0 27px}
.ep-heading .ep-overline,.ep-overline{font:800 10px/1.3 'Outfit',Arial,sans-serif;letter-spacing:.21em;color:#69bfff}
.ep-star{font-size:15px;vertical-align:middle;margin-right:7px}
.ep-index{color:#6983a5}
.ep-heading h2{font:900 clamp(45px,5.2vw,83px)/1.02 'Archivo','Outfit',Arial,sans-serif;letter-spacing:-.057em;margin:16px 0 15px;color:#f3f8ff}
.ep-heading h2 span{color:#5ab8ff}
.ep-heading p{max-width:620px;font:500 14px/1.7 'Outfit',Arial,sans-serif;color:#a3b7d3}
.ep-heading-side{display:flex;align-items:center;gap:10px;flex:none;padding-bottom:8px;font:700 10px 'Outfit',Arial,sans-serif;letter-spacing:.1em;color:#88a9d0}
.ep-small-dot,.ep-dot{display:inline-block;width:8px;height:8px;flex:0 0 8px;border-radius:50%;background:#5dc7ff;box-shadow:0 0 0 4px rgba(71,175,255,.12),0 0 18px rgba(71,175,255,.5)}
.ep-board{display:grid;grid-template-columns:1.05fr .95fr;gap:1px;overflow:hidden;border:1px solid rgba(111,180,249,.35);border-radius:24px;background:rgba(111,180,249,.29);box-shadow:0 30px 92px rgba(0,11,42,.37),0 0 0 1px rgba(44,135,250,.045)}
.ep-live-pane,.ep-graph-pane{min-width:0;position:relative;padding:35px 39px 32px;background:linear-gradient(132deg,#11284c,#0c1b35 65%,#0a162d)}
.ep-live-pane:before{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at 15% 16%,rgba(49,170,255,.13),transparent 65%),repeating-linear-gradient(90deg,transparent,transparent 58px,rgba(87,157,255,.028) 59px,transparent 60px)}
.ep-live-pane>*{position:relative}
.ep-pane-kicker{display:flex;align-items:center;gap:10px;color:#b0d6f4;letter-spacing:.13em;font:800 10px 'Outfit',Arial,sans-serif}
.ep-panel-index{margin-left:auto;color:#6485b3}
.ep-count-wrap{display:flex;align-items:end;gap:22px;min-width:0;margin-top:50px}
.ep-count-wrap strong{display:block;line-height:.9;min-width:0;max-width:100%;font:900 clamp(76px,10vw,158px)/.95 'Archivo','Outfit',Arial,sans-serif;letter-spacing:-.065em;white-space:nowrap;font-variant-numeric:tabular-nums;background:linear-gradient(100deg,#fff 0%,#e0f6ff 44%,#60baff);-webkit-background-clip:text;background-clip:text;color:transparent}
.ep-ccu-tag{display:flex;flex-direction:column;gap:3px;margin:0 0 5px;color:#4ab6ff;font:800 14px 'Outfit',Arial,sans-serif;letter-spacing:.1em}
.ep-ccu-tag span{white-space:nowrap;color:#9eb4d6;font:700 9px 'Outfit',Arial,sans-serif;letter-spacing:.07em}
.ep-delta{display:flex;align-items:center;min-height:40px;margin:13px 0 35px;font:700 12px/1.5 'Outfit',Arial,sans-serif;color:#96b0d2}
.ep-delta[data-direction="up"]{color:#8be0ff}
.ep-delta[data-direction="down"]{color:#cad7ee}
.ep-delta[data-direction="flat"]{color:#b6c9e5}
.ep-signal-line{height:1px;background:linear-gradient(90deg,rgba(85,178,255,.9),rgba(85,178,255,.16) 67%,transparent)}
.ep-pane-footer{margin-top:18px;display:flex;justify-content:space-between;gap:12px;align-items:center;flex-wrap:wrap}
.ep-pane-footer>span{font:800 10px 'Outfit',Arial,sans-serif;letter-spacing:.12em;color:#7394bf}
.ep-pane-footer time{font:700 11px 'Outfit',Arial,sans-serif;color:#c0d5ee;font-variant-numeric:tabular-nums}
.ep-graph-pane{background:radial-gradient(ellipse at 100% 0%,rgba(37,98,185,.15),transparent 62%),linear-gradient(150deg,#0b1b35,#09172e);display:flex;flex-direction:column}
.ep-graph-top{display:flex;justify-content:space-between;gap:12px;align-items:center}
.ep-graph-top h3{font:800 24px 'Archivo','Outfit',Arial,sans-serif;letter-spacing:-.04em;margin:9px 0 0;color:#eef8ff}
.ep-chart-label{color:#7f9bbd;text-align:right;font:800 9px/1.5 'Outfit',Arial,sans-serif;letter-spacing:.08em}
.ep-bars{display:flex;align-items:flex-end;justify-content:space-between;gap:7px;position:relative;flex:1;min-height:160px;max-height:190px;margin:26px 0 23px;padding:12px 1px 0;border-bottom:1px solid rgba(119,169,236,.35);background:repeating-linear-gradient(to top,transparent 0,transparent 39px,rgba(80,137,217,.13) 40px,transparent 41px)}
.ep-bar{flex:1 1 0;min-width:0;max-width:42px;min-height:3px;border-radius:5px 5px 0 0;background:linear-gradient(0deg,#2051a0,#288de7 75%,#7bd6ff);box-shadow:0 0 14px rgba(40,141,231,.12);transform-origin:bottom;animation:ep-grow .48s cubic-bezier(.2,.75,.2,1) both}
.ep-bar:last-child{background:linear-gradient(0deg,#2972c9,#4bb7ff 70%,#b5efff);box-shadow:0 0 15px rgba(61,172,255,.2)}
.ep-chart-empty{position:absolute;inset:0;display:grid;place-items:center;padding:20px;text-align:center;color:#8ca9ce;font:600 12px 'Outfit',Arial,sans-serif;line-height:1.6}
.ep-graph-bottom{display:grid;grid-template-columns:1fr 1fr;gap:17px;border-top:1px solid rgba(116,170,238,.15);padding-top:21px}
.ep-graph-bottom>div{display:flex;flex-direction:column;gap:6px;min-width:0}
.ep-graph-bottom small{font:800 9px/1.5 'Outfit',Arial,sans-serif;letter-spacing:.11em;color:#84a3cb}
.ep-graph-bottom strong{font:800 30px/1.1 'Archivo','Outfit',Arial,sans-serif;letter-spacing:-.045em;color:#e4f5ff;font-variant-numeric:tabular-nums}
.ep-disclaimer{margin-top:17px;font:500 10px/1.65 'Outfit',Arial,sans-serif;color:#819dc1}
.ep-footline{display:flex;justify-content:space-between;gap:14px;margin:18px 2px 0;color:#7c9cc4;font:800 9px/1.5 'Outfit',Arial,sans-serif;letter-spacing:.11em}
.ep-footline a{color:#b0d4f4;text-decoration:underline;text-decoration-color:rgba(117,184,241,.45);text-underline-offset:4px}
#pulse[data-signal="delayed"] .ep-dot,#pulse[data-signal="unavailable"] .ep-dot{background:#b8c5d9;box-shadow:0 0 0 4px rgba(184,197,217,.1)}
#pulse[data-signal="live"] .ep-dot{animation:ep-signal 2.2s ease-in-out infinite}
.hero .eyebrow{letter-spacing:2.4px}
.hero .lead{max-width:520px}
@keyframes ep-signal{50%{box-shadow:0 0 0 9px rgba(71,175,255,0),0 0 18px rgba(71,175,255,.38)}}
@keyframes ep-grow{from{transform:scaleY(.1);opacity:.25}to{transform:scaleY(1);opacity:1}}
@media(max-width:1100px){.ep-board{grid-template-columns:1fr 1fr}.ep-live-pane,.ep-graph-pane{padding:27px 26px}.ep-count-wrap{margin-top:45px}.ep-count-wrap strong{font-size:clamp(64px,9.2vw,122px)}.ep-ccu-tag{font-size:11px}.ep-heading-side{display:none}}
@media(max-width:760px){.ep-section{padding-top:32px}.ep-heading h2{font-size:clamp(42px,9vw,67px)}.ep-board{grid-template-columns:1fr}.ep-live-pane,.ep-graph-pane{padding:26px 24px}.ep-count-wrap{margin-top:30px}.ep-count-wrap strong{font-size:clamp(85px,18vw,130px)}.ep-graph-pane{min-height:350px}.ep-bars{min-height:130px;max-height:155px}.ep-footline{flex-wrap:wrap;gap:9px}}
@media(max-width:410px){.ep-heading h2{font-size:39px}.ep-heading p{font-size:12px}.ep-live-pane,.ep-graph-pane{padding:22px 18px}.ep-count-wrap{gap:12px}.ep-count-wrap strong{font-size:clamp(68px,19vw,99px)}.ep-ccu-tag{font-size:10px}.ep-ccu-tag span{font-size:8px}.ep-graph-top{align-items:flex-start}.ep-chart-label{max-width:95px}.ep-footline{font-size:8px}}
@media(prefers-reduced-motion:reduce){#pulse .ep-bar,#pulse .ep-dot{animation:none!important}}
`;

export const pulseJS = String.raw`
/* Subscribe to the dashboard's existing verified event; zero extra requests. */
(()=>{
'use strict';
const panel=document.getElementById('pulse');
if(!panel)return;
const get=id=>document.getElementById(id);
const count=get('ep-count'),state=get('ep-state'),delta=get('ep-delta');
const bars=get('ep-bars'),empty=get('ep-empty');
const time=get('ep-time'),visitHigh=get('ep-visit-high'),sampleCount=get('ep-samples');
let highest=null,lastObserved=null;
const valid=p=>p&&Number.isSafeInteger(p.ccu)&&p.ccu>=0&&
  Number.isFinite(p.t)&&p.t>0&&p.t<=Date.now()+30000;
const format=n=>n.toLocaleString('en-US');
const stamp=t=>new Date(t).toLocaleString('en-GB',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'});
function signal(kind,wording){panel.dataset.signal=kind;state.textContent=wording;}
function plot(history){
  const unique=new Map();
  for(const sample of history){
    if(valid(sample)&&Date.now()-sample.t<=86400000)unique.set(sample.t,sample.ccu);
  }
  const samples=[...unique].sort((a,b)=>a[0]-b[0]).slice(-12);
  sampleCount.textContent=samples.length?String(samples.length):'—';
  bars.replaceChildren();
  if(!samples.length){
    bars.append(empty);
    bars.setAttribute('aria-label','No verified CCU history available yet');
    return;
  }
  const values=samples.map(x=>x[1]),lo=Math.min(...values),hi=Math.max(...values);
  const span=Math.max(1,hi-lo);
  for(const [t,v] of samples){
    const bar=document.createElement('div');
    bar.className='ep-bar';
    bar.style.height=(hi===lo?52:20+(v-lo)/span*74).toFixed(1)+'%';
    bar.title=stamp(t)+' · '+format(v)+' verified concurrent players';
    bar.setAttribute('aria-hidden','true');
    bars.append(bar);
  }
  bars.setAttribute('aria-label',samples.length+' verified CCU measurements. Lowest '+format(lo)+', highest '+format(hi)+'. Bars are on a relative scale.');
}
window.addEventListener('kvn:verified-stats',event=>{
  const payload=event.detail||{},d=payload.stats;
  if(!d||d.stale||!Number.isSafeInteger(d.playing)||d.playing<0||
     !Number.isFinite(d.timestamp)||d.timestamp<=0||
     d.timestamp>Date.now()+30000||Date.now()-d.timestamp>300000){
    signal('delayed','LAST VERIFIED · WAITING FOR ROBLOX');
    return;
  }
  count.textContent=format(d.playing);
  time.textContent=stamp(d.timestamp);
  time.dateTime=new Date(d.timestamp).toISOString();
  signal('live','LIVE · VERIFIED ROBLOX DATA');
  if(!lastObserved||d.timestamp>lastObserved.t){
    highest=highest===null?d.playing:Math.max(highest,d.playing);
    visitHigh.textContent=format(highest);
    const previous=payload.previous;
    const previousValid=previous&&!previous.stale&&
      Number.isSafeInteger(previous.playing)&&previous.playing>=0&&
      Number.isFinite(previous.timestamp)&&previous.timestamp<d.timestamp;
    if(previousValid){
      const change=d.playing-previous.playing;
      delta.dataset.direction=change>0?'up':change<0?'down':'flat';
      delta.textContent=change>0?'↗ +'+format(change)+' players since the last verified sample':
        change<0?'↘ −'+format(Math.abs(change))+' players since the last verified sample':
        '→ No change since the last verified sample';
    }else{
      delta.dataset.direction='unknown';
      delta.textContent='Verified now · waiting for another sample to compare';
    }
    lastObserved={t:d.timestamp,ccu:d.playing};
  }
  const hist=Array.isArray(payload.history)?payload.history:[];
  plot(hist.concat([{t:d.timestamp,ccu:d.playing}]));
});
window.addEventListener('kvn:stats-unavailable',()=>{
  signal('unavailable',lastObserved?'REFRESH DELAYED · LAST VERIFIED SHOWN':'ROBLOX DATA TEMPORARILY UNAVAILABLE');
});
document.addEventListener('visibilitychange',()=>{
  if(document.hidden&&lastObserved)signal('delayed','PAUSED · LAST VERIFIED SHOWN');
});
})();
`;
