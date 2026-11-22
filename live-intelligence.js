/* TRENDING EMOTES! 2026: real-data CCU control-room enhancements. */
export const liveIntelligenceCSS = String.raw`
/* Live CCU dashboard: visual feedback is driven ONLY by verified Roblox API data. */
.metrics .primary{isolation:isolate;min-height:360px}
.metrics .primary .card-content{z-index:2}
.kvn-ccu-status-line{display:flex;flex-wrap:wrap;align-items:center;gap:10px 16px;margin-top:23px;font:800 10px 'Inter','DM Sans',system-ui,sans-serif;letter-spacing:1.2px;color:#a6c5e9}
.kvn-ccu-state{display:inline-flex;align-items:center;gap:8px;white-space:nowrap}
.kvn-ccu-dot{height:6px;width:6px;display:inline-block;border-radius:99px;background:#55caff;box-shadow:0 0 0 4px rgba(66,174,255,.11),0 0 16px rgba(66,170,255,.48)}
.kvn-ccu-state[data-state="cached"] .kvn-ccu-dot{background:#9daec6;box-shadow:0 0 0 4px rgba(141,164,195,.1)}
.kvn-ccu-state[data-state="unavailable"] .kvn-ccu-dot{background:#efb49e;box-shadow:0 0 0 4px rgba(239,180,158,.1)}
.kvn-ccu-delta{font-variant-numeric:tabular-nums;color:#b3c9e5}
.kvn-ccu-delta[data-direction="up"]{color:#86dfff}
.kvn-ccu-delta[data-direction="down"]{color:#b4c5e0}
.kvn-ccu-delta[data-direction="flat"]{color:#99aecf}
.kvn-ccu-delta[data-direction="none"]{color:#8fa4c4}
.kvn-ccu-record{position:relative;display:inline-flex;align-items:center;gap:7px;border:1px solid rgba(103,201,255,.36);background:rgba(43,130,242,.14);border-radius:999px;padding:7px 11px;max-width:max-content;margin-top:14px;font:800 10px 'Inter','DM Sans',system-ui,sans-serif;color:#b9e9ff;letter-spacing:.8px;box-shadow:inset 0 1px rgba(175,233,255,.06)}
.kvn-ccu-record[hidden]{display:none!important}
.kvn-ccu-freshness{display:flex;align-items:center;flex-wrap:wrap;gap:7px;margin-top:13px;font:600 10px 'Inter','DM Sans',system-ui,sans-serif;letter-spacing:.3px;color:#8fa7c9;line-height:1.5}
.kvn-ccu-freshness [data-age]{font-variant-numeric:tabular-nums}
.kvn-ccu-flash{position:absolute;z-index:1;inset:0;border-radius:inherit;pointer-events:none;opacity:0;background:radial-gradient(circle at 54% 40%,rgba(61,180,255,.20),transparent 75%)}
.kvn-ccu-card[data-motion="up"] .kvn-ccu-flash{animation:kvnCcuRise 1.35s cubic-bezier(.16,1,.3,1) both}
.kvn-ccu-card[data-motion="down"] .kvn-ccu-flash{animation:kvnCcuFall 1.05s ease-out both;background:radial-gradient(circle at 54% 40%,rgba(121,151,214,.11),transparent 72%)}
.kvn-ccu-card[data-motion="up"]{box-shadow:0 0 0 1px rgba(96,189,255,.28),0 0 53px rgba(28,127,255,.14),inset 0 1px rgba(194,234,255,.11)}
.kvn-ccu-card .number{font-variant-numeric:tabular-nums;position:relative;z-index:2}
.kvn-ccu-card .sparkline{position:relative;z-index:2}
@keyframes kvnCcuRise{0%{opacity:0}15%{opacity:1}100%{opacity:0}}
@keyframes kvnCcuFall{0%{opacity:0}25%{opacity:.7}100%{opacity:0}}
.kvn-ccu-card .number{margin-top:25px!important}
@media(min-width:1000px){
 .workspace{grid-template-columns:minmax(0,1.95fr) minmax(285px,.9fr);gap:20px}
 .chart-wrap{height:355px}
 .metrics .primary{min-height:380px}
 .metrics .primary .sparkline{position:relative;right:auto;bottom:auto;width:48%;max-width:360px;height:48px;margin:16px 0 8px;opacity:.92}
 .metrics .primary .card-content{padding-bottom:44px}
}
@media(min-width:691px) and (max-width:999px){
 .workspace{grid-template-columns:minmax(0,1fr)}
 .chart-wrap{height:315px}
 .metrics .primary{min-height:330px}
 .metrics .primary .sparkline{position:relative;right:auto;bottom:auto;width:58%;max-width:360px;height:43px;margin:12px 0;opacity:.82}
}
@media(max-width:690px){
 .metrics .primary{min-height:305px}
 .kvn-ccu-status-line{margin-top:14px;gap:8px 12px;font-size:9px;letter-spacing:.7px}
 .kvn-ccu-record{margin-top:10px;padding:6px 9px;font-size:9px}
 .kvn-ccu-freshness{font-size:9px;margin-top:9px}
 .metrics .primary .number{margin-top:16px!important;margin-bottom:7px}
 .metrics .primary .sparkline{display:block;position:relative;right:auto;bottom:auto;width:65%;max-width:270px;height:35px;opacity:.7;margin:8px 0 20px}
 .metrics .primary .card-content{padding-bottom:44px}
 .chart-wrap{height:265px}
 .workspace{grid-template-columns:minmax(0,1fr)}
}
@media(max-width:390px){
 .metrics .primary{min-height:295px}
 .metrics .primary .sparkline{width:70%;height:31px}
 .kvn-ccu-status-line{gap:6px 10px}
}
@media(prefers-reduced-motion:reduce){
 .kvn-ccu-card[data-motion] .kvn-ccu-flash{animation:none!important}
 .kvn-ccu-card[data-motion="up"]{box-shadow:inset 0 1px rgba(194,234,255,.1)!important}
}
/* Clear CCU movement feedback — only after two distinct verified player counts. */
.kvn-ccu-card{transition:box-shadow .65s ease,border-color .65s ease}
.kvn-ccu-card[data-motion="up"]{
 border-color:rgba(107,217,255,.83)!important;
 box-shadow:0 0 0 1px rgba(94,208,255,.6),0 0 42px rgba(37,141,255,.26),inset 0 0 35px rgba(54,151,255,.11)!important
}
.kvn-ccu-card[data-motion="down"]{
 border-color:rgba(139,173,221,.58)!important;
 box-shadow:0 0 0 1px rgba(139,173,221,.27),0 0 28px rgba(73,110,170,.14)!important
}
.kvn-ccu-flash::after{
 content:"";position:absolute;inset:0;border:2px solid rgba(117,222,255,.85);
 border-radius:inherit;opacity:0;pointer-events:none
}
.kvn-ccu-card[data-motion="up"] .kvn-ccu-flash{animation:kvnCcuVisibleRise 2.8s ease-out both!important}
.kvn-ccu-card[data-motion="down"] .kvn-ccu-flash{animation:kvnCcuVisibleFall 2.4s ease-out both!important}
.kvn-ccu-card[data-motion="up"] .kvn-ccu-flash::after{animation:kvnCcuRing 2.8s ease-out both}
.kvn-ccu-card[data-motion="down"] .kvn-ccu-flash::after{animation:kvnCcuRingDown 2.4s ease-out both;border-color:rgba(144,173,219,.54)}
@keyframes kvnCcuVisibleRise{0%{opacity:0}15%{opacity:1}55%{opacity:.66}100%{opacity:0}}
@keyframes kvnCcuVisibleFall{0%{opacity:0}20%{opacity:.72}55%{opacity:.40}100%{opacity:0}}
@keyframes kvnCcuRing{0%{opacity:.05}18%{opacity:.92}60%{opacity:.4}100%{opacity:0}}
@keyframes kvnCcuRingDown{0%{opacity:.05}18%{opacity:.65}55%{opacity:.28}100%{opacity:0}}
.kvn-ccu-change{
 position:absolute;z-index:6;top:101px;right:28px;display:flex;align-items:center;gap:9px;
 max-width:48%;padding:10px 14px;border-radius:13px;
 font:800 17px 'Space Grotesk','Inter',sans-serif;line-height:1;
 letter-spacing:-.02em;font-variant-numeric:tabular-nums;
 background:rgba(19,69,132,.85);color:#d3f3ff;
 border:1px solid rgba(110,212,255,.7);
 box-shadow:0 12px 38px rgba(4,36,97,.4),0 0 26px rgba(33,165,255,.22);
 opacity:0;transform:translateY(9px) scale(.96);pointer-events:none;
 overflow-wrap:anywhere
}
.kvn-ccu-change[hidden]{display:none!important}
.kvn-ccu-change[data-direction="down"]{
 background:rgba(36,58,97,.92);color:#c5d6ed;border-color:rgba(161,188,226,.5);
 box-shadow:0 12px 34px rgba(0,19,48,.3)
}
.kvn-ccu-change small{font:800 9px 'Inter','DM Sans',sans-serif;letter-spacing:1px;opacity:.82;white-space:nowrap}
.kvn-ccu-change[data-visible="true"]{opacity:1;transform:translateY(0) scale(1);transition:opacity .28s ease,transform .45s cubic-bezier(.16,1,.3,1)}
.kvn-ccu-card .kvn-ccu-delta[data-direction="up"]{color:#91e2ff;font-weight:900}
.kvn-ccu-card .kvn-ccu-delta[data-direction="down"]{color:#bacbe4;font-weight:900}
@media(max-width:690px){
 .kvn-ccu-change{top:101px;right:16px;padding:8px 10px;border-radius:10px;font-size:14px;gap:5px}
 .kvn-ccu-change small{font-size:8px;letter-spacing:.5px}
}
@media(max-width:390px){
 .kvn-ccu-change{top:96px;right:14px;max-width:44%;font-size:13px}
}
@media(prefers-reduced-motion:reduce){
 .kvn-ccu-card[data-motion] .kvn-ccu-flash,
 .kvn-ccu-card[data-motion] .kvn-ccu-flash::after{animation:none!important}
 .kvn-ccu-change[data-visible="true"]{opacity:1;transform:none;transition:none}
 .kvn-ccu-card[data-motion="up"],.kvn-ccu-card[data-motion="down"]{box-shadow:none!important}
}
/* Chart geometry safety: metric selectors must never collide with the plot edge.
   Keep this after older theme layers so all responsive breakpoints agree. */
.workspace,.workspace>*{min-width:0}
.chart-panel{min-width:0;overflow:visible;contain:layout style}
.chart-panel .panel-head{position:relative;z-index:3;min-width:0}
.chart-panel .metric-switch{
 position:relative;z-index:3;display:flex;align-items:center;align-content:center;
 flex-wrap:wrap;gap:8px;max-width:100%;min-width:0;
 margin:18px 0 18px;padding:2px 2px 3px;overflow:visible;
}
.chart-panel .metric-switch button{
 position:relative;flex:0 0 auto;white-space:nowrap;min-height:40px;
 line-height:1.35;margin:0;vertical-align:middle;
}
.chart-panel .chart-wrap{position:relative;z-index:1;min-width:0;width:100%;margin-top:0;overflow:hidden}
.chart-panel #chart{display:block;width:100%;height:100%;max-width:100%;overflow:hidden}
.chart-panel #curve,.chart-panel #shade{pointer-events:none}
.chart-panel .chart-axis,.chart-panel .chart-foot{min-width:0}
.chart-panel .chart-foot .big{overflow-wrap:anywhere}
@media(max-width:690px){
 .chart-panel .metric-switch{
  flex-wrap:nowrap;overflow-x:auto;overflow-y:hidden;overscroll-behavior-inline:contain;
  -webkit-overflow-scrolling:touch;scrollbar-width:thin;gap:7px;
  margin:15px 0 14px;padding:3px 2px 7px;
 }
 .chart-panel .metric-switch button{min-height:42px;padding:10px 12px}
 .chart-panel .panel-head{gap:12px}
 .chart-panel .switches{max-width:100%;min-width:0}
 .chart-panel .switches button{min-width:0}
}
@media(prefers-reduced-motion:reduce){
 .chart-panel .metric-switch button:hover{transform:none}
}

/* Real D1 comparisons; never show placeholders as measured changes. */
.kvn-compare{border-top:1px solid rgba(102,165,255,.19);margin-top:20px;padding:19px 4px 0;display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px 18px}
.kvn-compare-left{display:flex;flex-direction:column;gap:7px;min-width:0;flex:1}
.kvn-compare-title{color:#91c6ff;font:800 10px 'Inter','DM Sans',sans-serif;letter-spacing:1.3px}
.kvn-compare-description{color:#9db2d2;font:500 11px/1.65 'Inter','DM Sans',sans-serif;max-width:46ch}
.kvn-compare-value{display:flex;flex-direction:column;align-items:flex-end;gap:5px;min-width:160px;font-variant-numeric:tabular-nums}
.kvn-compare-value strong{color:#ecf8ff;font:800 clamp(17px,1.6vw,24px) 'Space Grotesk','Inter',sans-serif;letter-spacing:-.7px}
.kvn-compare-value small{color:#9db8d8;font:600 10px 'Inter','DM Sans',sans-serif}
.kvn-compare[data-trend="up"] .kvn-compare-value strong{color:#80d5ff}
.kvn-compare[data-trend="down"] .kvn-compare-value strong{color:#b3c5df}
@media(max-width:690px){
 .kvn-compare{padding:15px 0 0;margin-top:18px}
 .kvn-compare-value{align-items:flex-start}
}

/* Polished 2.2s CCU motion system; existing KVN blue palette unchanged. */
.kvn-ccu-card{isolation:isolate}
.kvn-ccu-number-row{display:flex;align-items:center;gap:10px 18px;flex-wrap:wrap;min-width:0}
.metrics .primary .kvn-ccu-number-row #playing{margin:22px 0 8px!important;min-width:0;white-space:nowrap}
.kvn-ccu-number-row .kvn-ccu-change{
 position:relative;inset:auto;top:auto;right:auto;left:auto;bottom:auto;
 display:inline-flex;align-items:center;gap:6px;
 max-width:100%;margin:8px 0;padding:10px 14px;
 transform:translate3d(0,8px,0) scale(.97);
 white-space:nowrap;overflow:visible;flex:0 0 auto
}
.kvn-ccu-number-row .kvn-ccu-change[hidden]{display:none!important}
.kvn-ccu-change[data-visible="true"]{
 animation:kvnChipFloat 2.2s cubic-bezier(.2,.75,.2,1) both!important;
 transition:none!important
}
@keyframes kvnChipFloat{
 0%{opacity:0;transform:translate3d(0,8px,0) scale(.97)}
 13%{opacity:1;transform:translate3d(0,0,0) scale(1)}
 61%{opacity:1;transform:translate3d(0,-1px,0) scale(1)}
 100%{opacity:0;transform:translate3d(0,-5px,0) scale(.99)}
}
.kvn-roll-slot{position:relative;display:inline-block;overflow:hidden;width:1ch;height:1em;line-height:1;vertical-align:-.03em;white-space:nowrap}
.kvn-roll-track{position:absolute;inset:0 auto auto 0;width:100%;height:2em;display:flex;flex-direction:column;align-items:center;line-height:1}
.kvn-roll-track>span{display:block;width:100%;min-width:0;height:1em;line-height:1em;text-align:center}
.kvn-roll-slot[data-direction="up"] .kvn-roll-track{animation:kvnDigitUp .51s cubic-bezier(.2,.85,.2,1) var(--kvn-roll-delay,0ms) both}
.kvn-roll-slot[data-direction="down"] .kvn-roll-track{animation:kvnDigitDown .51s cubic-bezier(.2,.85,.2,1) var(--kvn-roll-delay,0ms) both}
@keyframes kvnDigitUp{from{transform:translate3d(0,0,0)}to{transform:translate3d(0,-50%,0)}}
@keyframes kvnDigitDown{from{transform:translate3d(0,-50%,0)}to{transform:translate3d(0,0,0)}}
.kvn-ccu-travel{position:absolute;inset:0;border-radius:inherit;padding:2px;z-index:5;pointer-events:none;opacity:0;overflow:hidden;
 -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
 -webkit-mask-composite:xor;mask-composite:exclude
}
.kvn-ccu-travel::before{content:"";position:absolute;inset:-110%;background:conic-gradient(from 0deg,transparent 0deg,transparent 288deg,rgba(92,203,255,.08) 308deg,#91e8ff 325deg,rgba(73,174,255,.2) 338deg,transparent 353deg);transform:rotate(-100deg)}
.kvn-ccu-card[data-motion="down"] .kvn-ccu-travel::before{background:conic-gradient(from 0deg,transparent 0deg,transparent 288deg,rgba(115,153,208,.05) 310deg,#9cb6d9 325deg,rgba(89,133,189,.12) 338deg,transparent 353deg)}
.kvn-ccu-card[data-motion] .kvn-ccu-travel{animation:kvnEdgeOpacity 1.27s ease-out both}
.kvn-ccu-card[data-motion] .kvn-ccu-travel::before{animation:kvnEdgeLap 1.15s cubic-bezier(.45,.1,.5,1) both}
@keyframes kvnEdgeOpacity{0%{opacity:0}8%{opacity:1}75%{opacity:1}100%{opacity:0}}
@keyframes kvnEdgeLap{from{transform:rotate(-100deg)}to{transform:rotate(260deg)}}
.kvn-ccu-wave{position:absolute;left:30%;top:55%;z-index:1;pointer-events:none;width:360px;height:360px;max-width:85vw;border-radius:50%;transform:translate(-50%,-50%) scale(.18);opacity:0;background:radial-gradient(circle,rgba(69,185,255,.21),rgba(71,148,255,.08) 45%,transparent 70%)}
.kvn-ccu-card[data-motion="down"] .kvn-ccu-wave{background:radial-gradient(circle,rgba(130,161,214,.15),rgba(100,139,205,.06) 45%,transparent 70%)}
.kvn-ccu-card[data-motion="up"] .kvn-ccu-wave{animation:kvnWaveUp 1.6s ease-out both}
.kvn-ccu-card[data-motion="down"] .kvn-ccu-wave{animation:kvnWaveDown 1.6s ease-out both}
@keyframes kvnWaveUp{0%{opacity:0;transform:translate(-50%,-50%) scale(.18)}23%{opacity:1}100%{opacity:0;transform:translate(-50%,-50%) scale(1.28)}}
@keyframes kvnWaveDown{0%{opacity:0;transform:translate(-50%,-50%) scale(.18)}23%{opacity:.72}100%{opacity:0;transform:translate(-50%,-50%) scale(1.18)}}
.kvn-ccu-card[data-motion="up"] .kvn-ccu-flash{animation:kvnCcuVisibleRise 1.6s ease-out both!important}
.kvn-ccu-card[data-motion="down"] .kvn-ccu-flash{animation:kvnCcuVisibleFall 1.6s ease-out both!important}
.kvn-ccu-card[data-motion="up"] .kvn-ccu-flash::after{animation:kvnCcuRing 1.6s ease-out both!important}
.kvn-ccu-card[data-motion="down"] .kvn-ccu-flash::after{animation:kvnCcuRingDown 1.6s ease-out both!important}
.kvn-ccu-card[data-motion="up"]{border-color:rgba(89,203,255,.63)!important;box-shadow:0 0 0 1px rgba(74,171,255,.36),0 0 29px rgba(48,131,255,.15)!important}
.kvn-ccu-card[data-motion="down"]{border-color:rgba(133,165,206,.4)!important;box-shadow:0 0 0 1px rgba(130,162,205,.23),0 0 21px rgba(80,112,166,.08)!important}
.kvn-ccu-record{overflow:visible}
.kvn-ccu-record.is-new-peak{animation:kvnPeakAppear 2.6s cubic-bezier(.2,.7,.2,1) both}
.kvn-ccu-record.is-new-peak::before,.kvn-ccu-record.is-new-peak::after{
 content:"";position:absolute;inset:-3px;border-radius:inherit;border:1px solid rgba(117,223,255,.68);pointer-events:none
}
.kvn-ccu-record.is-new-peak::before{animation:kvnPeakRing 1.55s ease-out 0s both}
.kvn-ccu-record.is-new-peak::after{animation:kvnPeakRing 1.55s ease-out .23s both}
@keyframes kvnPeakAppear{0%{opacity:0;transform:translateY(5px)}15%,75%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(-3px)}}
@keyframes kvnPeakRing{0%{opacity:0;transform:scale(1)}18%{opacity:.8}100%{opacity:0;transform:scale(1.12)}}
.primary .sparkline .kvn-spark-head{fill:#c5edff;stroke:#398dff;stroke-width:1.6;vector-effect:non-scaling-stroke;filter:drop-shadow(0 0 3px rgba(105,212,255,.7))}
.sparkline.kvn-spark-new-point .kvn-spark-head{animation:kvnSparkHead 1s ease-out both;transform-box:fill-box;transform-origin:center}
@keyframes kvnSparkHead{0%{opacity:.45;transform:scale(.65)}30%{opacity:1;transform:scale(1.48)}100%{opacity:1;transform:scale(1)}}
@media(max-width:690px){
 .metrics .primary .kvn-ccu-number-row #playing{margin:14px 0 6px!important}
 .kvn-ccu-number-row{gap:6px 11px;align-items:center}
 .kvn-ccu-number-row .kvn-ccu-change{font-size:13px;padding:7px 9px;margin:4px 0}
 .kvn-ccu-travel{padding:1.5px}
 .kvn-ccu-wave{width:260px;height:260px}
}
@media(prefers-reduced-motion:reduce){
 .kvn-roll-slot .kvn-roll-track,.kvn-ccu-card[data-motion] .kvn-ccu-travel,
 .kvn-ccu-card[data-motion] .kvn-ccu-travel::before,
 .kvn-ccu-card[data-motion] .kvn-ccu-wave,
 .kvn-ccu-record.is-new-peak,.kvn-ccu-record.is-new-peak::before,.kvn-ccu-record.is-new-peak::after,
 .sparkline.kvn-spark-new-point .kvn-spark-head{animation:none!important}
 .kvn-ccu-change[data-visible="true"]{animation:none!important;opacity:1!important;transform:none!important}
}

`;
export const liveIntelligenceJS = String.raw`
/* Event-driven CCU presentation: never alters or estimates Roblox data. */
(()=>{
'use strict';
const card=document.querySelector('.metrics .primary');
const player=document.getElementById('playing');
if(!card||!player)return;
card.classList.add('kvn-ccu-card');
const label=card.querySelector('.label-row');
const line=document.createElement('div');line.className='kvn-ccu-status-line';
const status=document.createElement('span');status.className='kvn-ccu-state';status.dataset.state='loading';
const dot=document.createElement('i');dot.className='kvn-ccu-dot';dot.setAttribute('aria-hidden','true');
const wording=document.createElement('span');wording.textContent='CONNECTING TO ROBLOX';
status.append(dot,wording);
const delta=document.createElement('span');delta.className='kvn-ccu-delta';delta.dataset.direction='none';delta.textContent='AWAITING VERIFIED DATA';
line.append(status,delta);
if(label)label.after(line);
else card.querySelector('.card-content')?.prepend(line);
const record=document.createElement('div');record.className='kvn-ccu-record';record.hidden=true;
record.textContent='✦ NEW PEAK · 24H';
const description=card.querySelector('.metric-info');
if(description)description.after(record);
else card.querySelector('.card-content')?.append(record);
const freshness=document.createElement('div');freshness.className='kvn-ccu-freshness';
freshness.setAttribute('aria-live','off');freshness.textContent='Waiting for a verified Roblox measurement';
record.after(freshness);
const flash=document.createElement('div');flash.className='kvn-ccu-flash';
flash.setAttribute('aria-hidden','true');card.prepend(flash);
const travel=document.createElement('div');travel.className='kvn-ccu-travel';
travel.setAttribute('aria-hidden','true');card.prepend(travel);
const wave=document.createElement('div');wave.className='kvn-ccu-wave';
wave.setAttribute('aria-hidden','true');card.prepend(wave);
const changeChip=document.createElement('span');
changeChip.className='kvn-ccu-change';changeChip.hidden=true;
changeChip.setAttribute('role','status');changeChip.setAttribute('aria-live','polite');
changeChip.setAttribute('aria-label','Verified concurrent player count change');
// This row wraps on small screens, so the floating badge cannot cover digits.
const numberRow=document.createElement('div');numberRow.className='kvn-ccu-number-row';
player.before(numberRow);
numberRow.append(player,changeChip);
let changeChipTimer=null;
function hideChip(){
  if(changeChipTimer){clearTimeout(changeChipTimer);changeChipTimer=null;}
  changeChip.removeAttribute('data-visible');
  changeChip.hidden=true;
}
function revealChip(diff){
  if(!Number.isFinite(diff)||diff===0)return;
  if(changeChipTimer){clearTimeout(changeChipTimer);changeChipTimer=null;}
  const trend=diff>0?'up':'down';
  changeChip.dataset.direction=trend;
  changeChip.textContent=(diff>0?'+':'−')+Math.abs(diff).toLocaleString('en-US')+' ';
  const small=document.createElement('small');small.textContent='CCU';
  changeChip.append(small);
  changeChip.hidden=false;
  // Re-arm the actual CSS entrance on every new verified change.
  changeChip.removeAttribute('data-visible');
  void changeChip.offsetWidth;
  changeChip.dataset.visible='true';
  changeChipTimer=setTimeout(hideChip,2200);
}
let movementTimer=null;
let peakTimer=null;
function hidePeak(){
  if(peakTimer){clearTimeout(peakTimer);peakTimer=null;}
  record.classList.remove('is-new-peak');
  record.hidden=true;
}
function revealPeak(){
  hidePeak();
  record.hidden=false;
  void record.offsetWidth; // Runs only after a newly VERIFIED high.
  record.classList.add('is-new-peak');
  peakTimer=setTimeout(hidePeak,2600);
}
function setState(name,text){status.dataset.state=name;wording.textContent=text;}
function updateTime(stamp,cached){
  if(!Number.isFinite(stamp))return;
  const when=new Date(stamp).toLocaleString('en-GB',{dateStyle:'medium',timeStyle:'short'});
  freshness.textContent=(cached?'Last verified (cached): ':'Last verified: ')+when;
  freshness.title='Timestamp returned with the latest actual Roblox measurement';
}
function clearMovement(){
  if(movementTimer){clearTimeout(movementTimer);movementTimer=null;}
  card.removeAttribute('data-motion');
}
function showMotion(direction){
  clearMovement();
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  void card.offsetWidth; // Only once per verified CCU change.
  card.dataset.motion=direction;
  movementTimer=setTimeout(clearMovement,1600);
}
window.addEventListener('kvn:verified-stats',event=>{
  const info=event.detail||{},d=info.stats;
  if(!d||!Number.isFinite(d.playing)){
    setState('unavailable','METRIC UNAVAILABLE');
    delta.textContent='NO VERIFIED PLAYER COUNT';
    delta.dataset.direction='none';hidePeak();
    clearMovement();hideChip();return;
  }
  const fresh=!d.stale&&Number.isFinite(d.timestamp);
  updateTime(d.timestamp,!fresh);
  setState(fresh?'live':'cached',fresh?'AUTO UPDATING · VERIFIED':'CACHED · NOT LIVE');
  // Never claim a trend between identical timestamps or stale responses.
  const previous=info.previous;
  // A comparison requires two distinct FRESH Roblox measurements.
  // Never derive a motion direction from cached or stale fallback values.
  const priorValue=previous&&!previous.stale&&Number.isFinite(previous.playing)
    && Number.isFinite(previous.timestamp)&&previous.timestamp<d.timestamp
    ?previous.playing:null;
  if(fresh&&Number.isFinite(priorValue)){
    const diff=d.playing-priorValue;
    delta.dataset.direction=diff>0?'up':diff<0?'down':'flat';
    delta.textContent=diff>0?'PLAYER ACTIVITY INCREASED':
      diff<0?'PLAYER ACTIVITY DECREASED':'PLAYER COUNT UNCHANGED';
    if(diff!==0){
      showMotion(diff>0?'up':'down');
      revealChip(diff);
    }else{
      clearMovement();
      hideChip();
    }
  }else{
    delta.dataset.direction='none';
    delta.textContent=fresh?'AWAITING NEXT VERIFIED SAMPLE':'NO LIVE TREND';
    clearMovement();
    hideChip();
  }
  // A new high requires at least two earlier VERIFIED historical samples,
  // spanning five minutes; no "record" label from a single initial reading.
  const history=Array.isArray(info.history)?info.history.filter(p=>
    p&&Number.isFinite(p.t)&&Number.isFinite(p.ccu)&&
    p.t<d.timestamp-45000&&p.t>=d.timestamp-86400000):[];
  const coverage=history.length>=2&&(history[history.length-1].t-history[0].t)>=300000;
  const isPeak=fresh&&Number.isFinite(priorValue)&&d.playing>priorValue
    &&coverage&&d.playing>Math.max(...history.map(p=>p.ccu));
  if(isPeak){
    record.title='New high among actual CCU measurements available from the past 24 hours';
    revealPeak();
  }else if(!peakTimer){
    record.hidden=true;
  } 
});
window.addEventListener('kvn:stats-unavailable',event=>{
  setState('unavailable','REFRESH DELAYED');
  delta.dataset.direction='none';
  delta.textContent=event.detail?.hasPrevious?'LAST VERIFIED SAMPLE':'RETRYING ROBLOX API';
  hidePeak();clearMovement();hideChip();
});
const chartPanel=document.querySelector('.chart-panel');
if(chartPanel){
  const compare=document.createElement('section');compare.className='kvn-compare';
  compare.setAttribute('aria-label','Historical CCU comparison');
  const left=document.createElement('div');left.className='kvn-compare-left';
  const heading=document.createElement('span');heading.className='kvn-compare-title';
  heading.textContent='VERIFIED CCU · PERIOD COMPARISON';
  const explainer=document.createElement('span');explainer.className='kvn-compare-description';
  explainer.textContent='Connect Cloudflare D1 to compare complete measured periods.';
  left.append(heading,explainer);
  const right=document.createElement('div');right.className='kvn-compare-value';
  const change=document.createElement('strong');change.textContent='—';
  const previous=document.createElement('small');previous.textContent='REAL MEASUREMENTS ONLY';
  right.append(change,previous);compare.append(left,right);
  const foot=chartPanel.querySelector('.chart-foot');
  if(foot)foot.after(compare);else chartPanel.append(compare);
  window.addEventListener('kvn:history-loaded',event=>{
    const data=event.detail||{},comparison=data.comparison||{},range=(data.range||'24h').toUpperCase();
    compare.dataset.trend='none';
    heading.textContent='AVERAGE SAMPLED CCU · '+range+' VS PREVIOUS '+range;
    if(comparison.state==='ready'&&Number.isFinite(comparison.current)&&Number.isFinite(comparison.previous)){
      const current=comparison.current,prior=comparison.previous,diff=current-prior;
      const symbol=diff>0?'+':diff<0?'−':'';
      const abs=Math.abs(diff).toLocaleString('en-US',{maximumFractionDigits:1});
      change.textContent=symbol+abs+' PLAYERS';
      compare.dataset.trend=diff>0?'up':diff<0?'down':'flat';
      previous.textContent='PREVIOUS '+range+': '+prior.toLocaleString('en-US',{maximumFractionDigits:1})+' AVG CCU';
      explainer.textContent='Current average: '+current.toLocaleString('en-US',{maximumFractionDigits:1})+
        ' concurrent players · verified 5-minute samples, not DAU.';
    }else{
      change.textContent='—';
      previous.textContent='NO ESTIMATES';
      explainer.textContent=data.error?'History is temporarily unavailable.':
        (!data.cloud?'Connect Cloudflare D1 to compare full periods.':
        'Waiting for sufficient real measurements across both full periods.');
    }
  });
}

})();
`;
