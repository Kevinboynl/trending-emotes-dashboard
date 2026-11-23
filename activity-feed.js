/* Live Activity Feed: only verified DOM readings from existing Roblox updates. */
export const activityFeedMarkup = String.raw`
<section class="kvn-activity-feed" aria-labelledby="kvn-feed-title">
  <div class="kvn-feed-head">
    <div><div class="kvn-feed-kicker"><span class="kvn-feed-indicator"></span> LIVE PLAYER MOVEMENT / SESSION</div>
      <h3 id="kvn-feed-title">THE ACTIVITY <span>FEED.</span></h3>
      <p>See when verified concurrent players rise or fall, as they happen.</p>
    </div>
    <div class="kvn-feed-summary"><small>CHANGE SINCE FIRST READING</small><strong id="kvn-feed-total">—</strong></div>
  </div>
  <div class="kvn-feed-events" id="kvn-feed-events" role="log" aria-live="off" aria-label="Recent verified player count changes">
    <p class="kvn-feed-empty">Waiting for the first two verified player readings…</p>
  </div>
  <div class="kvn-feed-footer"><span>TRACKING ONLY WHILE THIS PAGE IS OPEN</span><span>NO ESTIMATED PLAYER COUNTS</span></div>
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
@media(max-width:640px){.kvn-activity-feed{padding:20px 16px}.kvn-feed-head{align-items:flex-start;flex-direction:column}.kvn-feed-summary{text-align:left}.kvn-feed-event{gap:9px;padding:10px}.kvn-feed-footer{font-size:8px}}
`;
export const activityFeedJS = String.raw`
(function(){
  var source=document.getElementById('playing'), list=document.getElementById('kvn-feed-events'), total=document.getElementById('kvn-feed-total');
  if(!source||!list||!total)return;
  var baseline=null, previous=null, events=[], lastRendered='', maxEvents=6;
  var fmt=function(n){return n.toLocaleString('en-US');};
  function render(){
    var raw=(source.textContent||'').trim();
    // Accept only formatted non-negative integer readings (never placeholder text).
    if(!/^\\d[\\d,.\\s]*$/.test(raw))return;
    var count=Number(raw.replace(/[,\\s.]/g,''));
    if(!Number.isSafeInteger(count)||count<0)return;
    if(raw===lastRendered&&count===previous)return;
    lastRendered=raw;
    if(previous===null){previous=count;baseline=count;total.textContent='0';return;}
    if(count===previous)return;
    var difference=count-previous, direction=difference>0?'up':'down';
    previous=count;
    var since=count-baseline;
    total.textContent=(since>0?'+':'')+fmt(since);
    total.dataset.trend=since>0?'up':since<0?'down':'neutral';
    events.unshift({count:count,diff:difference,dir:direction,time:new Date()});
    events=events.slice(0,maxEvents);
    list.replaceChildren();
    events.forEach(function(event){
      var row=document.createElement('div');row.className='kvn-feed-event';row.dataset.trend=event.dir;
      var arrow=document.createElement('span');arrow.className='kvn-feed-arrow';arrow.textContent=event.dir==='up'?'↗':'↘';arrow.setAttribute('aria-hidden','true');
      var detail=document.createElement('div');detail.className='kvn-feed-detail';
      var heading=document.createElement('strong');heading.textContent=(event.diff>0?'+':'')+fmt(event.diff)+' players';
      var note=document.createElement('small');note.textContent=fmt(event.count)+' concurrent players measured';
      detail.append(heading,note);
      var time=document.createElement('time');time.className='kvn-feed-time';time.dateTime=event.time.toISOString();time.textContent=event.time.toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit',second:'2-digit'});
      row.append(arrow,detail,time);list.append(row);
    });
  }
  var observer=new MutationObserver(render);observer.observe(source,{childList:true,subtree:true,characterData:true});render();
})();
`;
