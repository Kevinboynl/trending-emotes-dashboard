/* Live Activity Feed: only verified DOM readings from existing Roblox updates. */
export const activityFeedMarkup = String.raw`
<section class="kvn-activity-feed" aria-labelledby="kvn-feed-title">
  <div class="kvn-feed-head">
    <div><div class="kvn-feed-kicker"><span class="kvn-feed-indicator"></span> LIVE PLAYER MOVEMENT / SESSION</div>
      <h3 id="kvn-feed-title">THE ACTIVITY <span>FEED.</span></h3>
      <p>Track verified CCU changes, 5-minute momentum, and the session peak.</p>
    </div>
    <div class="kvn-feed-summary"><small>CHANGE SINCE FIRST READING</small><strong id="kvn-feed-total">—</strong></div>
  </div>
  <div class="kvn-feed-insights" aria-label="Live player movement statistics">
    <div class="kvn-feed-insight"><small>NET CHANGE · LAST 5 MIN</small><strong id="kvn-feed-5m">—</strong><span id="kvn-feed-5m-note">Collecting live readings</span></div>
    <div class="kvn-feed-insight"><small>PEAK · THIS SESSION</small><strong id="kvn-feed-peak">—</strong><span>Highest verified player count</span></div>
    <div class="kvn-feed-insight"><small>DATA STATUS</small><strong id="kvn-feed-status">CONNECTING</strong><span id="kvn-feed-status-note">Waiting for Roblox</span></div>
  </div>
  <div class="kvn-feed-events" id="kvn-feed-events" role="log" aria-live="off" aria-label="Recent verified player count changes">
    <p class="kvn-feed-empty">Waiting for the first two verified player readings…</p>
  </div>
  <div class="kvn-feed-footer"><span>LIVE UPDATES · SESSION-BASED</span><span>CCU CHANGE ≠ EXACT JOINS OR LEAVES</span></div>
</section>`;
export const activityFeedCSS = String.raw`
.kvn-activity-feed{margin:22px 0 40px;padding:27px 30px 21px;border:1px solid rgba(94,164,249,.26);border-radius:21px;background:linear-gradient(125deg,rgba(13,33,67,.94),rgba(9,22,46,.96));box-shadow:0 22px 55px rgba(3,13,35,.2);color:#edf6ff}
.kvn-feed-head{display:flex;justify-content:space-between;align-items:center;gap:20px;margin-bottom:22px}
.kvn-feed-kicker{font:800 10px/1.4 'Outfit',system-ui,sans-serif;letter-spacing:.15em;color:#83c8ff;display:flex;align-items:center;gap:9px}
.kvn-feed-indicator{height:7px;width:7px;border-radius:50%;background:#57bdff;box-shadow:0 0 12px rgba(76,176,255,.5)}
.kvn-feed-head h3{font:900 clamp(24px,3vw,37px)/1.1 'Archivo','Outfit',system-ui,sans-serif;letter-spacing:-.045em;margin:10px 0 7px}
.kvn-feed-head h3 span{color:#70c4ff}
.kvn-feed-head p{color:#9fb6d4;font-size:12px;line-height:1.6}
.kvn-feed-summary{text-align:right;flex:none}
.kvn-feed-summary small{display:block;color:#8eaccd;font:700 9px/1.4 'Outfit',system-ui,sans-serif;letter-spacing:.12em}
.kvn-feed-summary strong{display:block;font:800 29px/1.4 'Outfit',system-ui,sans-serif;font-variant-numeric:tabular-nums}
.kvn-feed-summary strong[data-trend="up"]{color:#66deb7}.kvn-feed-summary strong[data-trend="down"]{color:#ffa39d}
.kvn-feed-events{display:grid;gap:8px}
.kvn-feed-empty{padding:19px;color:#96afce;text-align:center;border:1px dashed rgba(110,169,238,.2);border-radius:11px;font-size:12px}
.kvn-feed-event{display:grid;grid-template-columns:34px minmax(0,1fr) auto;align-items:center;gap:14px;min-height:58px;padding:11px 15px;border:1px solid rgba(107,166,232,.13);border-radius:11px;background:rgba(29,59,106,.21)}
.kvn-feed-arrow{height:32px;width:32px;display:grid;place-items:center;border-radius:9px;background:rgba(91,160,255,.1);font-size:17px;color:#b6d9ff}
.kvn-feed-event[data-trend="up"] .kvn-feed-arrow{color:#70dfb7;background:rgba(68,210,150,.1)}
.kvn-feed-event[data-trend="down"] .kvn-feed-arrow{color:#ffb2a4;background:rgba(246,114,112,.1)}
.kvn-feed-detail{min-width:0}.kvn-feed-detail strong{display:block;font:750 13px/1.4 'Outfit',system-ui,sans-serif}.kvn-feed-detail small{color:#93aecd;font-size:11px}
.kvn-feed-time{color:#90aac9;font:700 11px/1.4 'Outfit',system-ui,sans-serif;font-variant-numeric:tabular-nums}
.kvn-feed-footer{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-top:15px;color:#799abd;font:700 9px/1.6 'Outfit',system-ui,sans-serif;letter-spacing:.1em}
.kvn-feed-insights{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin:0 0 18px}
.kvn-feed-insight{display:flex;flex-direction:column;gap:7px;padding:18px;border-radius:13px;border:1px solid rgba(115,174,242,.18);background:rgba(29,63,116,.25);min-width:0}
.kvn-feed-insight small{font:800 9px/1.5 'Outfit',system-ui,sans-serif;letter-spacing:.1em;color:#92b4db}
.kvn-feed-insight strong{font:800 clamp(19px,2.7vw,30px)/1.1 'Outfit',system-ui,sans-serif;color:#edf6ff;font-variant-numeric:tabular-nums}
.kvn-feed-insight strong[data-trend="up"]{color:#66deb7}
.kvn-feed-insight strong[data-trend="down"]{color:#ffa39d}
.kvn-feed-insight strong[data-state="delayed"]{color:#f3c08a}
.kvn-feed-insight>span{font:500 11px/1.45 'Outfit',system-ui,sans-serif;color:#9bb3d0}
@media(max-width:640px){.kvn-feed-insights{grid-template-columns:1fr 1fr}.kvn-feed-insight:last-child{grid-column:1/-1}}
@media(max-width:640px){.kvn-activity-feed{padding:20px 16px}.kvn-feed-head{align-items:flex-start;flex-direction:column}.kvn-feed-summary{text-align:left}.kvn-feed-event{gap:9px;padding:10px}.kvn-feed-footer{font-size:8px}}
`;
export const activityFeedJS = String.raw`
(function(){
  'use strict';
  const list=document.getElementById('kvn-feed-events');
  const total=document.getElementById('kvn-feed-total');
  const five=document.getElementById('kvn-feed-5m');
  const fiveNote=document.getElementById('kvn-feed-5m-note');
  const peak=document.getElementById('kvn-feed-peak');
  const status=document.getElementById('kvn-feed-status');
  const statusNote=document.getElementById('kvn-feed-status-note');
  if(!list||!total||!five||!peak||!status)return;
  let samples=[],events=[],lastCount=null,baseline=null,high=null,lastTime=null,delayed=false;
  const fmt=n=>n.toLocaleString('en-US');
  const signed=n=>(n>0?'+':'')+fmt(n);
  function display(){
    if(lastCount===null)return;
    const change=lastCount-baseline;
    total.textContent=signed(change);
    total.dataset.trend=change>0?'up':change<0?'down':'neutral';
    peak.textContent=fmt(high);
    const recent=samples.filter(s=>s.t>=lastTime-300000);
    // A five-minute delta needs two readings with actual time separation.
    if(recent.length>=2){
      const delta=recent[recent.length-1].ccu-recent[0].ccu;
      five.textContent=signed(delta);
      five.dataset.trend=delta>0?'up':delta<0?'down':'neutral';
      fiveNote.textContent='Across '+recent.length+' verified readings';
    } else {
      five.textContent='—';
      five.removeAttribute('data-trend');
      fiveNote.textContent='Waiting for more measurements';
    }
    status.textContent=delayed?'DELAYED':'LIVE';
    status.dataset.state=delayed?'delayed':'live';
    statusNote.textContent=delayed?'Roblox unavailable · retrying':'Last verified '+new Date(lastTime).toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit',second:'2-digit'});
  }
  function update(detail){
    const d=detail&&detail.stats;
    if(!d||d.stale||!Number.isSafeInteger(d.playing)||d.playing<0)return;
    const t=Number(d.timestamp);
    if(!Number.isFinite(t)||t<=0||t>Date.now()+30000)return;
    if(lastTime!==null&&t<=lastTime)return;
    const count=d.playing;
    delayed=false;
    if(baseline===null)baseline=count;
    if(high===null||count>high)high=count;
    samples.push({t,ccu:count});
    samples=samples.filter(s=>s.t>=t-300000).slice(-60);
    if(lastCount!==null&&count!==lastCount){
      const diff=count-lastCount;
      events.unshift({count,diff,time:t,dir:diff>0?'up':'down'});
      events=events.slice(0,6);
      list.replaceChildren();
      events.forEach(e=>{
        const row=document.createElement('div');row.className='kvn-feed-event';row.dataset.trend=e.dir;
        const arrow=document.createElement('span');arrow.className='kvn-feed-arrow';arrow.textContent=e.dir==='up'?'↗':'↘';arrow.setAttribute('aria-hidden','true');
        const detail=document.createElement('div');detail.className='kvn-feed-detail';
        const heading=document.createElement('strong');heading.textContent=signed(e.diff)+' net CCU';
        const note=document.createElement('small');note.textContent=fmt(e.count)+' concurrent players measured · not exact joins/leaves';
        detail.append(heading,note);
        const time=document.createElement('time');time.className='kvn-feed-time';
        time.dateTime=new Date(e.time).toISOString();
        time.textContent=new Date(e.time).toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit',second:'2-digit'});
        row.append(arrow,detail,time);list.append(row);
      });
    }
    lastCount=count;lastTime=t;display();
  }
  window.addEventListener('kvn:verified-stats',event=>update(event.detail));
  window.addEventListener('kvn:stats-unavailable',()=>{
    delayed=true;
    status.textContent='DELAYED';
    status.dataset.state='delayed';
    statusNote.textContent=lastTime?'Last verified '+new Date(lastTime).toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit'}):'Waiting for Roblox · retrying';
  });
})();
`;
