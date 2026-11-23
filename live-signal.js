/* Live Signal: compact read-only diagnostics for existing verified CCU data.
   No extra requests, no estimated player counts, no layout dependencies. */
export const signalMarkup = String.raw`
<section class="kvn-signal" aria-label="Live data signal">
  <div class="kvn-signal-intro">
    <span class="kvn-signal-eyebrow"><span class="kvn-signal-dot" id="kvn-signal-dot"></span> LIVE DATA SIGNAL</span>
    <strong id="kvn-signal-title">Connecting to Roblox</strong>
    <span id="kvn-signal-explain">Waiting for the first verified player measurement.</span>
  </div>
  <div class="kvn-signal-facts">
    <div><span>PLAYER COUNT</span><strong id="kvn-signal-players">—</strong></div>
    <div><span>CONNECTION</span><strong id="kvn-signal-state">CHECKING</strong></div>
    <div><span>LAST CHECK</span><strong id="kvn-signal-checked">WAITING</strong></div>
  </div>
</section>`;
export const signalCSS = String.raw`
.kvn-signal{display:flex;justify-content:space-between;align-items:center;gap:28px;margin:18px 0 36px;padding:22px 26px;border:1px solid rgba(105,166,245,.23);border-radius:17px;background:linear-gradient(120deg,rgba(20,39,72,.83),rgba(12,25,49,.9));color:#e6f3ff;box-shadow:0 14px 40px rgba(0,5,22,.13)}
.kvn-signal-intro{display:flex;flex-direction:column;align-items:flex-start;gap:7px;min-width:0}
.kvn-signal-eyebrow{display:flex;align-items:center;gap:9px;color:#8fcaff;font:700 10px/1.3 system-ui,sans-serif;letter-spacing:.16em}
.kvn-signal-dot{width:7px;height:7px;border-radius:50%;background:#8fabc6;flex:none}
.kvn-signal[data-mode="live"] .kvn-signal-dot{background:#62dcb3;box-shadow:0 0 12px rgba(98,220,179,.45)}
.kvn-signal[data-mode="stale"] .kvn-signal-dot{background:#f5c174}
.kvn-signal-intro strong{font:700 clamp(16px,1.8vw,22px)/1.2 'Outfit',system-ui,sans-serif}
.kvn-signal-intro>span:last-child{font:400 12px/1.5 system-ui,sans-serif;color:#9eb7d2}
.kvn-signal-facts{display:flex;gap:0;flex:none}
.kvn-signal-facts>div{padding:0 22px;border-left:1px solid rgba(157,191,228,.14);display:flex;flex-direction:column;gap:6px}
.kvn-signal-facts>div:last-child{padding-right:0}
.kvn-signal-facts span{font:700 9px/1.4 system-ui,sans-serif;letter-spacing:.12em;color:#92abc8}
.kvn-signal-facts strong{font:700 13px/1.4 'Outfit',system-ui,sans-serif;font-variant-numeric:tabular-nums}
@media(max-width:780px){.kvn-signal{align-items:stretch;flex-direction:column;padding:20px;margin-bottom:28px}.kvn-signal-facts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.kvn-signal-facts>div{min-width:0;padding:0 8px 0 0;border-left:0;border-right:1px solid rgba(157,191,228,.14)}.kvn-signal-facts>div:last-child{border:0}.kvn-signal-facts strong{font-size:12px;overflow-wrap:anywhere}}
@media(prefers-reduced-motion:no-preference){.kvn-signal-dot{transition:background-color .25s,box-shadow .25s}}
`;
export const signalJS = String.raw`
(function(){
  var root=document.querySelector('.kvn-signal');
  var playing=document.getElementById('playing');
  var status=document.getElementById('status');
  var updated=document.getElementById('lastUpdate');
  if(!root||!playing||!status||!updated)return;
  var $=function(id){return document.getElementById(id)};
  var timer=0;
  function render(){
    var count=(playing.textContent||'').trim();
    var state=(status.textContent||'').trim();
    var check=(updated.textContent||'').trim();
    var valid=/^\d[\d,\.\s]*$/.test(count);
    var stale=/stale|cached|offline|error|failed|unavailable/i.test(state+' '+check);
    var mode=stale?'stale':valid?'live':'waiting';
    root.dataset.mode=mode;
    $('kvn-signal-players').textContent=valid?count:'—';
    $('kvn-signal-state').textContent=mode==='live'?'CONNECTED':mode==='stale'?'DELAYED':'CHECKING';
    $('kvn-signal-checked').textContent=check&&!/waiting/i.test(check)?check:'WAITING';
    $('kvn-signal-title').textContent=mode==='live'?'Live activity is updating':mode==='stale'?'Showing the last available reading':'Connecting to Roblox';
    $('kvn-signal-explain').textContent=mode==='live'?'Player count is sourced from the Roblox public API.':mode==='stale'?'The live source is delayed. Figures may be outdated.':'Waiting for the first verified player measurement.';
  }
  var observer=new MutationObserver(function(){clearTimeout(timer);timer=setTimeout(render,40)});
  [playing,status,updated].forEach(function(el){observer.observe(el,{subtree:true,childList:true,characterData:true})});
  render();
})();
`;