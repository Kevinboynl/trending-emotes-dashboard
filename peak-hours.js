/* Focus panel: measured peak hours, never inferred player counts. */
export const peakHoursMarkup = String.raw\`
<section class="kvn-peak-hours" id="peak-hours" aria-labelledby="kvn-peak-title">
  <div class="kvn-peak-heading">
    <div><p class="kvn-peak-eyebrow">PLAYER ACTIVITY / TIME INTELLIGENCE</p>
      <h2 id="kvn-peak-title">WHEN ARE PLAYERS ONLINE?</h2>
      <p>Find your busiest measured hours over the last 24 hours. Times use your device's local timezone.</p>
    </div>
    <span class="kvn-peak-state" id="kvn-peak-state" role="status" aria-live="polite">WAITING FOR MEASUREMENTS</span>
  </div>
  <div class="kvn-peak-summary">
    <div><span>BUSIEST MEASURED HOUR</span><strong id="kvn-peak-best">—</strong></div>
    <div><span>AVERAGE CCU IN THAT HOUR</span><strong id="kvn-peak-avg">—</strong></div>
    <div><span>OBSERVED TIME SLOTS</span><strong id="kvn-peak-coverage">—</strong></div>
  </div>
  <div id="kvn-peak-bars" class="kvn-peak-bars" role="img" aria-label="Hourly concurrent player measurements"></div>
  <p class="kvn-peak-footnote" id="kvn-peak-note">A measured pattern will appear when enough verified samples are available. Empty hours are not treated as zero players.</p>
</section>\`;
export const peakHoursCSS = String.raw\`
.kvn-peak-hours{position:relative;overflow:hidden;margin:28px 0 38px;padding:clamp(19px,3vw,34px);border:1px solid rgba(111,167,255,.22);border-radius:24px;background:linear-gradient(130deg,rgba(12,28,61,.96),rgba(8,17,39,.95));color:#eaf3ff;box-shadow:0 20px 65px rgba(0,0,0,.15)}
.kvn-peak-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;flex-wrap:wrap}
.kvn-peak-heading h2{font:800 clamp(20px,3.2vw,34px)/1.14 'Space Grotesk','Inter',system-ui,sans-serif;letter-spacing:-.04em;margin:7px 0 10px}
.kvn-peak-heading p:not(.kvn-peak-eyebrow){color:#a3b7d7;max-width:620px;line-height:1.6;font-size:13px}
.kvn-peak-eyebrow{color:#75c8ff;font-size:10px;font-weight:800;letter-spacing:2px}
.kvn-peak-state{border:1px solid rgba(121,192,255,.3);border-radius:30px;padding:10px 13px;font-size:10px;letter-spacing:.09em;font-weight:800;color:#9fdcff;background:rgba(73,148,255,.09)}
.kvn-peak-summary{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin:23px 0 22px}
.kvn-peak-summary>div{border:1px solid rgba(115,174,253,.12);background:rgba(255,255,255,.035);border-radius:15px;padding:17px 16px;min-width:0}
.kvn-peak-summary span{font-size:10px;letter-spacing:.08em;color:#91a8cb;display:block;margin-bottom:11px;font-weight:700}
.kvn-peak-summary strong{font-size:clamp(18px,2.4vw,27px);font-weight:800;font-variant-numeric:tabular-nums}
.kvn-peak-bars{display:grid;grid-template-columns:repeat(24,minmax(0,1fr));align-items:end;gap:5px;height:120px;padding-top:15px;border-bottom:1px solid rgba(135,170,220,.24)}
.kvn-peak-bar{height:100%;display:flex;align-items:end;position:relative;min-width:0}
.kvn-peak-bar>span{width:100%;display:block;min-height:3px;border-radius:5px 5px 0 0;background:linear-gradient(0deg,#3765bd,#71c9ff)}
.kvn-peak-bar[data-best="true"]>span{background:linear-gradient(0deg,#42a3db,#a1f4ff);box-shadow:0 0 16px rgba(97,203,255,.28)}
.kvn-peak-bar[data-missing="true"]>span{height:3px!important;background:rgba(164,187,221,.16)}
.kvn-peak-footnote{font-size:11px;color:#91a8c8;line-height:1.6;margin-top:14px}
@media(max-width:650px){.kvn-peak-summary{grid-template-columns:1fr 1fr}.kvn-peak-summary>div:first-child{grid-column:span 2}.kvn-peak-bars{gap:3px;height:90px}}
@media(prefers-reduced-motion:no-preference){.kvn-peak-bar>span{transition:height .5s ease}}
\`;
export const peakHoursJS = String.raw\`
(function(){
  const root=document.getElementById('peak-hours');
  if(!root)return;
  const state=document.getElementById('kvn-peak-state');
  const bestEl=document.getElementById('kvn-peak-best');
  const avgEl=document.getElementById('kvn-peak-avg');
  const coverageEl=document.getElementById('kvn-peak-coverage');
  const bars=document.getElementById('kvn-peak-bars');
  const note=document.getElementById('kvn-peak-note');
  let latest=[];
  const fmt=new Intl.NumberFormat(undefined,{maximumFractionDigits:0});
  function render(){
    const now=Date.now();
    // Keep only valid verified samples in the most recent 24-hour window.
    const unique=new Map();
    for(const p of latest){
      if(!p||!Number.isSafeInteger(p.ccu)||p.ccu<0||!Number.isFinite(p.t)||p.t<now-86400000||p.t>now+30000)continue;
      unique.set(p.t,p);
    }
    const rows=[...unique.values()].sort((a,b)=>a.t-b.t);
    const slots=new Map();
    for(const p of rows){
      const d=new Date(p.t);
      d.setMinutes(0,0,0);
      const k=d.getTime();
      const slot=slots.get(k)||{sum:0,count:0};
      slot.sum+=p.ccu;slot.count++;
      slots.set(k,slot);
    }
    let best=null;
    for(const [t,v] of slots){
      const avg=v.sum/v.count;
      if(!best||avg>best.avg)best={t,avg};
    }
    const coverage=slots.size;
    const enough=rows.length>=8&&coverage>=3&&(rows[rows.length-1].t-rows[0].t)>=2*3600000;
    bestEl.textContent=enough?new Date(best.t).toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit'}):'—';
    avgEl.textContent=enough?fmt.format(best.avg):'—';
    coverageEl.textContent=coverage+'/24';
    state.textContent=enough?'OBSERVED DATA':'COLLECTING DATA';
    note.textContent=enough
      ?'Highest hourly average among observed measurements; this is not a forecast or guaranteed best hour. Missing hours are shown as gaps.'
      :'Need at least 8 verified measurements across 3 different hours and a 2-hour span. Missing hours are never counted as zero.';
    bars.replaceChildren();
    const start=new Date(now);start.setMinutes(0,0,0);
    const hourMs=3600000;
    const vals=[...slots.values()].map(v=>v.sum/v.count);
    const max=Math.max(1,...vals);
    for(let i=23;i>=0;i--){
      const t=start.getTime()-i*hourMs;
      const slot=slots.get(t);
      const bar=document.createElement('div');bar.className='kvn-peak-bar';
      bar.dataset.missing=String(!slot);
      bar.dataset.best=String(enough&&best.t===t);
      const label=new Date(t).toLocaleString(undefined,{weekday:'short',hour:'2-digit',minute:'2-digit'});
      bar.title=slot?label+' · avg '+fmt.format(slot.sum/slot.count)+' CCU ('+slot.count+' samples)':label+' · no measurement';
      const fill=document.createElement('span');
      fill.style.height=slot?(Math.max(4,Math.round((slot.sum/slot.count)/max*100)))+'%':'3px';
      bar.append(fill);bars.append(bar);
    }
    bars.setAttribute('aria-label','Measured hourly CCU, '+coverage+' of 24 hours have samples');
  }
  window.addEventListener('kvn:verified-stats',event=>{
    const detail=event.detail||{};
    const rows=Array.isArray(detail.history)?detail.history:[];
    latest=rows.filter(p=>p&&Number.isSafeInteger(p.ccu));
    const d=detail.stats;
    if(d&&!d.stale&&Number.isSafeInteger(d.playing)&&Number.isFinite(d.timestamp)){
      latest.push({t:d.timestamp,ccu:d.playing});
    }
    render();
  });
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)render()});
  render();
})();
\`;
