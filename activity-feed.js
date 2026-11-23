/* Dedicated live-player activity panel. Uses existing verified Roblox CCU events only. */
export const activityFeedCSS = String.raw`
.kvn-activity{position:relative;isolation:isolate;overflow:hidden;margin:22px 0 10px;border:1px solid rgba(94,161,245,.33);border-radius:22px;background:linear-gradient(133deg,rgba(16,38,77,.96),rgba(8,19,41,.98) 68%);box-shadow:0 23px 66px rgba(0,5,22,.20),inset 0 1px rgba(171,217,255,.08)}
.kvn-activity:before{content:"";position:absolute;pointer-events:none;width:480px;height:330px;right:-120px;top:-190px;background:radial-gradient(ellipse,rgba(38,131,255,.21),transparent 70%)}
.kvn-activity-inner{position:relative;z-index:1;padding:28px clamp(18px,3vw,34px)}
.kvn-activity-top{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;flex-wrap:wrap}
.kvn-activity-top h3{font:700 clamp(26px,3vw,36px)/1.1 'Space Grotesk',sans-serif;letter-spacing:-1.4px;color:#f4f9ff;margin:9px 0}
.kvn-activity-top p{max-width:670px;color:#a7bcde;font-size:12px;line-height:1.7}
.kvn-activity-status{display:inline-flex;align-items:center;gap:10px;border:1px solid rgba(86,163,252,.34);background:rgba(24,66,126,.25);border-radius:999px;padding:10px 13px;color:#addaff;font:800 10px 'Outfit',sans-serif;letter-spacing:.5px}
.kvn-activity-status i{display:inline-block;flex:none;width:7px;height:7px;background:#7dcfff;border-radius:50%;box-shadow:0 0 0 4px rgba(74,177,255,.13)}
.kvn-activity-status[data-state="delayed"]{color:#d2d9e8}.kvn-activity-status[data-state="delayed"] i{background:#a2b0c9;box-shadow:none}
.kvn-activity-grid{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:18px;margin-top:25px}
.kvn-activity-feature,.kvn-activity-timeline{min-width:0;border:1px solid rgba(101,156,235,.19);background:rgba(8,24,51,.67);border-radius:16px;padding:21px}
.kvn-activity-eyebrow{font:800 10px 'Outfit',sans-serif;letter-spacing:1.35px;color:#8ebae8}
.kvn-activity-number{display:block;min-height:75px;margin:10px 0 0;font:700 clamp(53px,6vw,76px)/1.1 'Space Grotesk',sans-serif;letter-spacing:-3px;font-variant-numeric:tabular-nums;color:#e7f4ff}
.kvn-activity-number[data-direction="up"]{color:#78d8ff;text-shadow:0 0 43px rgba(62,185,255,.18)}
.kvn-activity-number[data-direction="down"]{color:#b0bfdb}
.kvn-activity-feature-note{color:#9fb1d3;font-size:12px;line-height:1.6;min-height:20px}
.kvn-activity-caption{margin-top:17px;padding-top:15px;border-top:1px solid rgba(115,157,214,.16);color:#7f9cc7;font-size:11px}
.kvn-activity-timeline-head{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;padding-bottom:13px;border-bottom:1px solid rgba(115,157,214,.16)}
.kvn-activity-timeline-head span:last-child{font-size:10px;letter-spacing:.5px;color:#7d9dcb}
.kvn-activity-list{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:3px}
.kvn-activity-event{display:flex;align-items:center;gap:12px;padding:13px 0;border-bottom:1px solid rgba(115,157,214,.10)}
.kvn-activity-event:last-child{border-bottom:0}
.kvn-activity-delta{min-width:75px;font:800 22px/1.15 'Space Grotesk',sans-serif;font-variant-numeric:tabular-nums;color:#7cdbff}
.kvn-activity-event[data-direction="down"] .kvn-activity-delta{color:#b1c5e4}
.kvn-activity-detail{display:flex;flex-direction:column;gap:4px;min-width:0}
.kvn-activity-detail strong{color:#e7f0ff;font-size:12px;font-weight:700}
.kvn-activity-detail small{color:#8ba4ca;font-size:10px}
.kvn-activity-event time{margin-left:auto;white-space:nowrap;color:#9badd0;font-size:11px;font-variant-numeric:tabular-nums}
.kvn-activity-empty{color:#a1b3d0;line-height:1.6;font-size:12px;padding:24px 0 12px}
.kvn-activity-disclaimer{margin:18px 0 0;color:#819cc1;font-size:11px;line-height:1.7}
.kvn-activity-new .kvn-activity-number{animation:kvnActivityArrive .55s cubic-bezier(.22,.75,.2,1) both}
@keyframes kvnActivityArrive{from{opacity:.3;transform:translateY(7px)}to{opacity:1;transform:translateY(0)}}
@media(max-width:760px){.kvn-activity-grid{grid-template-columns:1fr;gap:10px}.kvn-activity-inner{padding:20px}.kvn-activity-top h3{font-size:27px}.kvn-activity-feature,.kvn-activity-timeline{padding:18px}.kvn-activity-number{font-size:58px;min-height:63px}.kvn-activity-event{gap:8px}.kvn-activity-delta{min-width:65px;font-size:19px}.kvn-activity-event time{font-size:10px}}
@media(prefers-reduced-motion:reduce){.kvn-activity-new .kvn-activity-number{animation:none}}
`;
export const activityFeedJS = String.raw`
/* Source of truth: kvn:verified-stats from the existing Roblox stats fetch. */
(()=>{
'use strict';
const metricGrid=document.querySelector('#dashboard .metrics');
if(!metricGrid||document.getElementById('kvnActivity'))return;
const panel=document.createElement('section');
panel.id='kvnActivity';
panel.className='kvn-activity';
panel.setAttribute('aria-labelledby','kvnActivityTitle');
panel.innerHTML='<div class="kvn-activity-inner">'+
 '<div class="kvn-activity-top"><div><div class="sec-label">LIVE / PLAYER MOMENTUM</div><h3 id="kvnActivityTitle">The player pulse.</h3><p>Follow verified changes in concurrent players as they happen, without confusing CCU movement with individual joins or leaves.</p></div><span class="kvn-activity-status" id="kvnActivityStatus" data-state="loading"><i aria-hidden="true"></i><span>WAITING FOR ROBLOX</span></span></div>'+
 '<div class="kvn-activity-grid"><div class="kvn-activity-feature"><span class="kvn-activity-eyebrow">LATEST VERIFIED CHANGE</span><strong class="kvn-activity-number" id="kvnActivityNumber">—</strong><p class="kvn-activity-feature-note" id="kvnActivityNote" aria-live="polite">Waiting for two verified player counts.</p><div class="kvn-activity-caption" id="kvnActivityCaption">Only real Roblox measurements</div></div>'+
 '<div class="kvn-activity-timeline"><div class="kvn-activity-timeline-head"><span class="kvn-activity-eyebrow">RECENT MOVEMENTS</span><span>THIS BROWSER TAB</span></div><ol class="kvn-activity-list" id="kvnActivityList"><li class="kvn-activity-empty">Live changes will appear here when the measured player count moves.</li></ol></div></div>'+
 '<p class="kvn-activity-disclaimer">Each entry is the net difference between two verified CCU readings, not a count of people joining or leaving. Activity is saved only for this browser tab, not published or shared.</p></div>';
const anchor=document.querySelector('#dashboard .signal-strip')||metricGrid;
anchor.insertAdjacentElement('afterend',panel);
const byId=id=>document.getElementById(id);
const state=byId('kvnActivityStatus');
const number=byId('kvnActivityNumber');
const note=byId('kvnActivityNote');
const caption=byId('kvnActivityCaption');
const list=byId('kvnActivityList');
const key='kvn-activity-feed-v1';
const maxAge=12*60*60*1000;
const fmt=n=>n.toLocaleString('en-US');
const clock=t=>new Date(t).toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'});
const valid=e=>e&&Number.isSafeInteger(e.t)&&e.t>0&&e.t<=Date.now()+30000
  &&Date.now()-e.t<=maxAge&&Number.isSafeInteger(e.before)&&Number.isSafeInteger(e.after)
  &&e.before>=0&&e.after>=0&&e.before!==e.after&&typeof e.returned==='boolean';
let entries=[];
try{
 const saved=JSON.parse(sessionStorage.getItem(key)||'[]');
 if(Array.isArray(saved))entries=saved.filter(valid).sort((a,b)=>b.t-a.t).slice(0,8);
}catch{}
function persist(){try{sessionStorage.setItem(key,JSON.stringify(entries));}catch{}}
function setState(mode,label){state.dataset.state=mode;state.querySelector('span').textContent=label;}
function render(){
 list.replaceChildren();
 if(!entries.length){
  const empty=document.createElement('li');empty.className='kvn-activity-empty';
  empty.textContent='Waiting for the player count to change between two verified Roblox measurements.';
  list.append(empty);
  number.textContent='—';number.removeAttribute('data-direction');
  note.textContent='Waiting for two verified player counts.';
  caption.textContent='No movement recorded in this browser tab';
  return;
 }
 const last=entries[0],diff=last.after-last.before;
 number.textContent=(diff>0?'+':'−')+fmt(Math.abs(diff));
 number.dataset.direction=diff>0?'up':'down';
 note.textContent=fmt(last.before)+' → '+fmt(last.after)+' players online';
 caption.textContent=(last.returned?'Since your last visit':'Between two Roblox readings')+' · '+clock(last.t);
 for(const e of entries){
  const change=e.after-e.before;
  const item=document.createElement('li');item.className='kvn-activity-event';
  item.dataset.direction=change>0?'up':'down';
  const delta=document.createElement('strong');delta.className='kvn-activity-delta';
  delta.textContent=(change>0?'+':'−')+fmt(Math.abs(change));
  const detail=document.createElement('div');detail.className='kvn-activity-detail';
  const title=document.createElement('strong');title.textContent=fmt(e.before)+' → '+fmt(e.after)+' online';
  const small=document.createElement('small');
  small.textContent=e.returned?'Compared with last visible reading':'Compared with previous verified sample';
  detail.append(title,small);
  const time=document.createElement('time');time.dateTime=new Date(e.t).toISOString();time.textContent=clock(e.t);
  item.append(delta,detail,time);list.append(item);
 }
}
render();
setState('loading',entries.length?'SHOWING PREVIOUS READINGS':'WAITING FOR ROBLOX');
window.addEventListener('kvn:verified-stats',event=>{
 const info=event.detail||{},d=info.stats,p=info.previous,now=Date.now();
 const fresh=d&&!d.stale&&Number.isSafeInteger(d.playing)&&d.playing>=0
  &&Number.isSafeInteger(d.timestamp)&&d.timestamp<=now+30000&&now-d.timestamp>=0
  &&now-d.timestamp<=120000;
 if(!fresh){setState('delayed','VERIFICATION DELAYED');return;}
 setState('live','LIVE · VERIFIED');
 const comparable=p&&!p.stale&&Number.isSafeInteger(p.playing)&&p.playing>=0
  &&Number.isSafeInteger(p.timestamp)&&p.timestamp>0&&p.timestamp<d.timestamp;
 if(!comparable){if(!entries.length)note.textContent='First verified sample received. Watching for a change.';return;}
 if(d.playing===p.playing){if(!entries.length)note.textContent='CCU is unchanged. Waiting for movement.';return;}
 if(entries.some(x=>x.t===d.timestamp))return;
 entries.unshift({t:d.timestamp,before:p.playing,after:d.playing,returned:info.context==='return'});
 entries=entries.filter(valid).slice(0,8);
 persist();render();
 panel.classList.remove('kvn-activity-new');
 if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  void number.offsetWidth;panel.classList.add('kvn-activity-new');
 }
});
window.addEventListener('kvn:stats-unavailable',()=>setState('delayed','ROBLOX REFRESH DELAYED'));
document.addEventListener('visibilitychange',()=>{
 if(document.hidden)setState('delayed','UPDATES PAUSED IN BACKGROUND');
 else setState('loading','CHECKING NEW MEASUREMENT');
});
})();
`;
