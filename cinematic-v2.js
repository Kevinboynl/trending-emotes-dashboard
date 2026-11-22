/* Progressive cinematic UX layer: no analytics or secret handling. */
export const cinematicCSS = String.raw`
/* TRENDING EMOTES! — cinematic v2 / deliberate motion and responsive polish.
   Presentation only: never alter data series, API inputs or authentication. */
:root{--kvn-cinema-ease:cubic-bezier(.22,1,.36,1);--kvn-cinema-fast:.22s;--kvn-cinema-medium:.55s}
html{scroll-padding-top:112px}
body{overflow-x:clip}
body.kvn-page-hidden .kvn-star,body.kvn-page-hidden .kvn-sidefx *,
body.kvn-page-hidden .orbit,body.kvn-page-hidden .halo,
body.kvn-page-hidden .ticker-inner{animation-play-state:paused!important}
.kvn-pointer-core{position:fixed;left:0;top:0;z-index:0;pointer-events:none;width:275px;height:275px;border-radius:50%;opacity:0;transform:translate3d(-999px,-999px,0) translate(-50%,-50%);background:radial-gradient(circle,rgba(71,179,255,.21) 0%,rgba(48,133,255,.09) 28%,transparent 70%);filter:blur(12px);will-change:transform,opacity;transition:opacity .28s ease}
.hero{contain:layout}
.hero .hero-copy{isolation:isolate}
.hero .hero-copy h1{display:block;text-wrap:balance}
.hero h1 .kvn-hero-line{display:block;width:max-content;max-width:100%;white-space:nowrap;line-height:.91}
.hero h1 .kvn-line-one{background:none!important;color:#f6fbff!important;-webkit-text-fill-color:#f6fbff!important}
.hero h1 .kvn-line-two{background:linear-gradient(108deg,#e8f6ff,#9bd4ff 34%,#4b94ff 72%,#a8e6ff);background-clip:text;-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero .hero-note{opacity:.94}
.hero .hero-actions{align-items:center}
.hero .hero-actions a{white-space:nowrap}
.hero .hero-poster{backface-visibility:hidden}
.hero .hero-poster img{display:block}
.hero .visual{contain:layout}
@keyframes kvnCinemaReveal{from{opacity:0;transform:translate3d(0,24px,0)}to{opacity:1;transform:translate3d(0,0,0)}}
@keyframes kvnCinemaSmall{from{opacity:0;transform:translate3d(0,11px,0)}to{opacity:1;transform:translate3d(0,0,0)}}
@keyframes kvnCinemaLine{from{opacity:0;transform:translate3d(0,31px,0)}to{opacity:1;transform:translate3d(0,0,0)}}
@keyframes kvnCinemaVisual{from{opacity:0;transform:translate3d(0,21px,0) scale(.95)}to{opacity:1;transform:translate3d(0,0,0) scale(1)}}
@keyframes kvnCinemaLineGrow{from{transform:scaleX(0);opacity:.25}to{transform:scaleX(1);opacity:1}}
@keyframes kvnCinemaBadge{from{opacity:0;translate:0 12px}to{opacity:1;translate:0 0}}
@keyframes kvnCinemaShine{0%{left:-38%;opacity:0}15%{opacity:.24}55%{opacity:.12}100%{left:125%;opacity:0}}
@keyframes kvnCardEntrance{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
body.kvn-intro-active .wordmark{animation:kvnCinemaSmall .48s .08s var(--kvn-cinema-ease) both}
body.kvn-intro-active .navlinks{animation:kvnCinemaSmall .48s .13s var(--kvn-cinema-ease) both}
body.kvn-intro-active .nav-right{animation:kvnCinemaSmall .48s .19s var(--kvn-cinema-ease) both}
body.kvn-intro-active .hero .eyebrow{animation:kvnCinemaSmall .6s .25s var(--kvn-cinema-ease) both!important}
body.kvn-intro-active .hero .hero-copy h1 .kvn-line-one{animation:kvnCinemaLine .7s .36s var(--kvn-cinema-ease) both!important}
body.kvn-intro-active .hero .hero-copy h1 .kvn-line-two{animation:kvnCinemaLine .75s .53s var(--kvn-cinema-ease) both!important}
body.kvn-intro-active .hero .lead{animation:kvnCinemaReveal .7s .69s var(--kvn-cinema-ease) both}
body.kvn-intro-active .hero .hero-actions{animation:kvnCinemaReveal .7s .83s var(--kvn-cinema-ease) both!important}
body.kvn-intro-active .hero .hero-note{animation:kvnCinemaSmall .65s .99s var(--kvn-cinema-ease) both!important}
body.kvn-intro-active .hero .visual{animation:kvnCinemaVisual .9s .85s var(--kvn-cinema-ease) both!important}
body.kvn-intro-active .hero .floatbadge{animation:kvnCinemaBadge .75s 1.28s var(--kvn-cinema-ease) both!important}
body.kvn-intro-active .hero .eyebrow::before{animation:kvnCinemaLineGrow .6s .25s ease-out both}
.hero h1 .kvn-line-two{position:relative;overflow:visible}
.hero h1 .kvn-line-two::after{content:"";position:absolute;top:6%;bottom:10%;width:23%;left:-38%;transform:skewX(-18deg);background:linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent);pointer-events:none;opacity:0}
body.kvn-intro-active .hero h1 .kvn-line-two::after{animation:kvnCinemaShine 1.2s 1.18s ease-in-out 1 both}
.bar.reveal.show .sec-label{animation:kvnCinemaSmall .6s var(--kvn-cinema-ease) both}
.bar.reveal.show h2{animation:kvnCinemaReveal .75s .06s var(--kvn-cinema-ease) both}
.bar.reveal.show .desc,.bar.reveal.show .official-sub{animation:kvnCinemaSmall .72s .13s var(--kvn-cinema-ease) both}
.metrics.reveal.show .card{animation:kvnCardEntrance .62s var(--kvn-cinema-ease) both;animation-delay:calc(var(--stagger,0) * 65ms)}
.kvn-fade-up{animation:kvnCardEntrance .55s var(--kvn-cinema-ease) both;animation-delay:calc(var(--kvn-stagger,0) * 42ms)}
.kvn-reveal-details{animation:kvnCinemaReveal .6s var(--kvn-cinema-ease) both}
.metrics .card{transition:transform .3s var(--kvn-cinema-ease),border-color .24s ease,box-shadow .28s ease}
@media(min-width:900px) and (hover:hover) and (pointer:fine){
 .metrics .card[data-tilt="1"]:hover{transform:translateY(-4px)!important;transition:transform .28s var(--kvn-cinema-ease),border-color .24s ease,box-shadow .28s ease}
 .card:not(.primary):hover{transform:translateY(-4px)}
}
.metrics .card:focus-within,.game-card:focus-within,.detail:focus-within{border-color:#80cfff;box-shadow:0 0 0 1px rgba(80,175,255,.3),0 20px 54px rgba(0,9,35,.4)}
.metrics .card .metric-label,.official-card small,.kvn-insight-card .k-label{line-height:1.5}
.metrics .number,.official-card strong,.kvn-insight-card .k-value{font-variant-numeric:tabular-nums lining-nums}
.metrics .card .metric-info{max-width:40ch}
.primary .card-content{min-width:0}
.card .number{overflow-wrap:normal}
.chart-panel{position:relative;isolation:isolate}
.chart-panel::before{content:"";position:absolute;left:28px;right:28px;top:0;height:1px;background:linear-gradient(90deg,transparent,rgba(120,204,255,.6),transparent);pointer-events:none;opacity:.5}
.chart-wrap #tooltip{background:rgba(11,29,66,.96);border:1px solid rgba(109,193,255,.54);box-shadow:0 15px 40px rgba(0,6,28,.45),0 0 22px rgba(33,109,242,.13);color:#ebf7ff;font-weight:700;max-width:calc(100% - 18px);white-space:normal;line-height:1.5;padding:11px 14px;border-radius:12px;backdrop-filter:blur(15px)}
.chart-wrap:focus-within{outline:1px solid rgba(96,179,255,.42);outline-offset:4px}
#chart:focus-visible{outline:2px solid #85d3ff;outline-offset:3px;border-radius:8px}
.chart-key,.chart-grid-labels,.chart-foot{font-variant-numeric:tabular-nums}
.chart-grid-labels{pointer-events:none}
.chart-nodata{padding:25px;gap:11px;max-width:100%;text-align:center}
.chart-nodata strong{font-size:clamp(13px,1.2vw,16px);line-height:1.4}
.chart-nodata span{max-width:46ch;line-height:1.6}
.kvn-data-status{display:flex;align-items:center;gap:11px;max-width:100%}
.kvn-data-status #lastUpdate{overflow-wrap:anywhere}
.kvn-refresh-data{font:700 17px var(--kvn-type-body,'DM Sans',sans-serif);line-height:1;flex:0 0 auto;width:32px;height:32px;display:grid;place-items:center;color:#9edcff;border:1px solid rgba(91,167,255,.3);border-radius:9px;background:rgba(29,78,150,.17);transition:background .2s,transform .3s var(--kvn-cinema-ease),border-color .2s}
.kvn-refresh-data:hover{color:#fff;background:rgba(37,99,255,.36);border-color:#62beff;transform:rotate(24deg)}
.kvn-refresh-data:active{transform:rotate(48deg) scale(.94)}
.kvn-refresh-data:disabled{opacity:.6;cursor:wait}
.kvn-refresh-data[aria-busy=true]{animation:kvnRotateWait .9s linear infinite}
@keyframes kvnRotateWait{to{transform:rotate(360deg)}}
.kvn-data-status[data-state=warning] #lastUpdate{color:#ffc7b7}
.ticker-inner,.tabs button{font-variant-numeric:tabular-nums}
.tabs{scrollbar-width:thin;scrollbar-color:rgba(100,175,255,.4) transparent}
.tabbody.active{animation:kvnCinemaReveal .36s var(--kvn-cinema-ease) both}
.detail,.official-card,.kvn-insight-card{transition:transform .3s var(--kvn-cinema-ease),border-color .25s ease,box-shadow .3s ease}
.official-message{line-height:1.75}
.game-card .game-cover{isolation:isolate}
.game-card .game-cover::before{content:"";position:absolute;inset:0;z-index:2;pointer-events:none;border:1px solid rgba(143,215,255,.1)}
.game-cover img{object-position:center center}
.playbtn,.outlinebtn{min-height:43px}
.playbtn:active,.outlinebtn:active{transform:translateY(0) scale(.985)}
.kvn-button-motion{position:relative}
.kvn-button-motion .kvn-button-arrow{display:inline-block;transition:translate .24s var(--kvn-cinema-ease)}
.kvn-button-motion:hover .kvn-button-arrow{translate:3px 0}
.kvn-sidefx--right .kvn-sidefx__ring,.kvn-sidefx--right .kvn-sidefx__core{top:43%;left:44%}
.kvn-sidefx--right .kvn-sidefx__hud{top:15%}
.kvn-sidefx--right .kvn-sidefx__ticks{top:74%}
.kvn-sidefx{pointer-events:none}
html{scrollbar-color:#315b91 #071328;scrollbar-width:thin}
@media(max-width:1100px){
 .hero .hero-copy h1{font-size:clamp(55px,7.8vw,97px);letter-spacing:-.068em}
 .workspace{gap:14px}
 .navlinks a{min-height:38px}
 .chart-wrap{min-width:0}
}
@media(max-width:890px){
 .hero{grid-template-columns:minmax(0,1fr) minmax(0,.84fr)}
 .hero .hero-copy h1{font-size:clamp(48px,7.2vw,76px)}
 .hero .visual{min-width:0}
 .metrics{gap:12px}
 .chart-panel{min-width:0}
 .chart-foot{flex-wrap:wrap}
}
@media(max-width:690px){
 html{scroll-padding-top:145px}
 .wrap{padding-left:16px;padding-right:16px}
 .hero{grid-template-columns:minmax(0,1fr);padding-top:30px;padding-bottom:28px;overflow:hidden;min-width:0}
 .hero .hero-copy h1{font-size:clamp(51px,13.2vw,79px);line-height:.92;letter-spacing:-.075em}
 .hero h1 .kvn-hero-line{max-width:100%}
 .hero .lead{max-width:42ch}
 .hero .hero-actions{align-items:stretch;gap:8px}
 .hero .hero-actions .playbtn,.hero .hero-actions .outlinebtn{min-height:44px;justify-content:center}
 .hero .hero-actions .tiny{width:100%;font-size:10px}
 .hero .visual{height:265px}
 .hero .hero-poster{width:184px}
 .hero .floatbadge{right:0;top:10%}
 .kvn-pointer-core{display:none}
 .bar{align-items:flex-start}
 .bar h2{font-size:clamp(28px,7.3vw,43px)}
 .updated{min-width:0;max-width:100%;padding:9px 11px;gap:6px}
 .kvn-data-status{gap:7px}
 .kvn-refresh-data{width:30px;height:30px}
 .metrics{gap:10px}
 .metrics .card .metric-label{letter-spacing:.06em}
 .metrics .card:not(.primary) .card-content{padding:18px}
 .metrics .card:not(.primary) .number{font-size:clamp(24px,7vw,38px);letter-spacing:-.06em}
 .metrics .primary .number{font-size:clamp(75px,17vw,111px)}
 .workspace{grid-template-columns:minmax(0,1fr)}
 .chart-panel{padding:17px}
 .chart-wrap{height:245px}
 .metric-switch{display:flex;flex-wrap:nowrap;overflow-x:auto;scrollbar-width:thin;max-width:100%;gap:6px;padding-bottom:6px}
 .metric-switch button{flex:0 0 auto;min-height:41px}
 .switches{width:100%}
 .switches button{min-height:40px}
 .tabs{margin-top:30px}
 .tabs button{min-height:44px}
 .official-grid,.kvn-insights,.details{grid-template-columns:minmax(0,1fr)}
 .official-card,.kvn-insight-card{min-width:0}
 .game-card .game-cover{max-height:300px}
 .playbtn,.outlinebtn{min-height:44px}
}
@media(max-width:390px){
 .hero .hero-copy h1{font-size:clamp(48px,12.9vw,62px)}
 .navlinks a{font-size:9px;padding:10px 5px}
 .hero .visual{height:250px}
 .chart-panel{padding:14px}
 .bar h2{font-size:29px}
 .hero .hero-actions .tiny{font-size:9px}
 .number{letter-spacing:-1.6px}
}
@media(hover:none),(pointer:coarse){.kvn-pointer-core{display:none!important}.kvn-button-motion:hover .kvn-button-arrow{translate:0 0}}
@media(prefers-reduced-motion:reduce){
 .kvn-pointer-core{display:none!important}
 body.kvn-intro-active .wordmark,body.kvn-intro-active .navlinks,body.kvn-intro-active .nav-right,
 body.kvn-intro-active .hero .eyebrow,body.kvn-intro-active .hero h1 .kvn-hero-line,
 body.kvn-intro-active .hero .lead,body.kvn-intro-active .hero .hero-actions,
 body.kvn-intro-active .hero .hero-note,body.kvn-intro-active .hero .visual,
 body.kvn-intro-active .hero .floatbadge,.bar.reveal.show .sec-label,
 .bar.reveal.show h2,.bar.reveal.show .desc,.metrics.reveal.show .card,
 .kvn-fade-up,.tabbody.active{animation:none!important;opacity:1!important;transform:none!important;translate:none!important}
 .kvn-refresh-data[aria-busy=true]{animation:none!important}
 body.kvn-intro-active .hero h1 .kvn-line-two::after{animation:none!important}
}
`;
export const cinematicJS = String.raw`
/* Motion is progressive enhancement. The unenhanced document stays usable. */
(()=>{
'use strict';
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
const fine=window.matchMedia('(hover:hover) and (pointer:fine)');
const hero=document.querySelector('.hero');
if(hero){
  const title=hero.querySelector('h1');
  if(title && !title.querySelector('.kvn-line-one')){
    const first=[...title.childNodes].find(node=>node.nodeType===Node.TEXT_NODE&&node.textContent.trim());
    if(first){
      const firstLine=document.createElement('span');
      firstLine.className='kvn-hero-line kvn-line-one';
      firstLine.textContent=first.textContent.trim();
      title.replaceChild(firstLine,first);
      const br=title.querySelector('br');
      if(br)br.remove();
      const second=title.querySelector('span:not(.kvn-line-one)');
      if(second)second.classList.add('kvn-hero-line','kvn-line-two');
    }
  }
}
if(!reduce.matches)document.body.classList.add('kvn-intro-active');
const pulseStatus=document.querySelector('.updated');
const currentStatus=document.getElementById('status');
if(currentStatus)currentStatus.setAttribute('role','status');
if(pulseStatus && !pulseStatus.querySelector('.kvn-refresh-data')){
  pulseStatus.classList.add('kvn-data-status');
  const refresh=document.createElement('button');refresh.type='button';refresh.className='kvn-refresh-data';
  refresh.setAttribute('aria-label','Refresh verified Roblox statistics');
  refresh.title='Refresh Roblox statistics';refresh.textContent='↻';
  refresh.addEventListener('click',async()=>{
    if(refresh.disabled || typeof stats!=='function')return;
    refresh.disabled=true;refresh.setAttribute('aria-busy','true');
    try{await stats();}finally{refresh.disabled=false;refresh.removeAttribute('aria-busy');}
  });
  pulseStatus.append(refresh);
}
const statusCheck=()=>{
  const note=document.querySelector('.kvn-data-status');
  if(note && currentStatus)note.dataset.state=/UNAVAILABLE|ERROR|CACHED|RATE.LIMIT/i.test(currentStatus.textContent||'')?'warning':'ready';
};
if(currentStatus){
  new MutationObserver(statusCheck).observe(currentStatus,{childList:true,characterData:true,subtree:true});
  statusCheck();
}
// Button arrow easing without removing links, labels or accessible names.
for(const link of document.querySelectorAll('a.playbtn,a.outlinebtn')){
  link.classList.add('kvn-button-motion');
  const child=[...link.childNodes].find(node=>node.nodeType===Node.TEXT_NODE&&/↗/.test(node.textContent||''));
  if(child){
    const full=child.textContent;
    const idx=full.lastIndexOf('↗');
    const before=document.createTextNode(full.slice(0,idx));
    const arrow=document.createElement('span');arrow.className='kvn-button-arrow';arrow.textContent='↗';
    const after=document.createTextNode(full.slice(idx+1));
    link.replaceChild(after,child);link.insertBefore(arrow,after);link.insertBefore(before,arrow);
  }
}
const setPressed=(selector)=>{
  const bar=document.querySelector(selector);
  if(!bar)return;
  bar.setAttribute('role','group');
  const update=()=>bar.querySelectorAll('button').forEach(b=>{
    b.setAttribute('aria-pressed',String(b.classList.contains('active')));
    b.setAttribute('aria-controls','chart');
    b.type='button';
  });
  update();
  bar.addEventListener('click',()=>requestAnimationFrame(update));
};
setPressed('#ranges');
setPressed('#metrics');
// Group chart accessible for keyboard use. Never create synthetic data points.
const chart=document.getElementById('chart');
if(chart){
  chart.tabIndex=0;chart.setAttribute('role','group');
  chart.setAttribute('aria-label','Verified Roblox historical chart. Use left and right arrow keys to explore measurements.');
  let index=0;
  const tooltip=document.getElementById('tooltip'),point=document.getElementById('point');
  const move=(to)=>{
    if(typeof chartPoints==='undefined'||!Array.isArray(chartPoints)||chartPoints.length<2)return;
    index=Math.max(0,Math.min(chartPoints.length-1,to));
    const p=chartPoints[index];
    if(!p||!Number.isFinite(p.raw?.[currentMetric]))return;
    const box=chart.getBoundingClientRect();
    if(!box.width||!box.height)return;
    point?.setAttribute('cx',p.x);point?.setAttribute('cy',p.y);
    point?.setAttribute('visibility','visible');
    if(tooltip){
      tooltip.style.display='block';
      tooltip.style.left=Math.max(80,Math.min(box.width-80,p.x/860*box.width))+'px';
      tooltip.style.top=p.y/300*box.height+'px';
      tooltip.textContent=dateTime(p.raw.t)+' · '+fmt(p.raw[currentMetric])+' '+valueFields[currentMetric];
    }
  };
  chart.addEventListener('keydown',e=>{
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;
    if(typeof chartPoints==='undefined'||!Array.isArray(chartPoints)||chartPoints.length<2)return;
    e.preventDefault();
    move(e.key==='Home'?0:e.key==='End'?chartPoints.length-1:index+(e.key==='ArrowRight'?1:-1));
  });
  chart.addEventListener('focus',()=>move(index));
  chart.addEventListener('blur',()=>{if(tooltip)tooltip.style.display='none';point?.setAttribute('visibility','hidden');});
  const curve=document.getElementById('curve');
  if(curve)new MutationObserver(()=>{index=0;}).observe(curve,{attributes:true,attributeFilter:['d']});
}
// Two composited, differently paced side movements add depth without
// resizing the statistics column or forcing layout on every scroll.
if(!reduce.matches && window.matchMedia('(min-width: 1201px) and (pointer:fine)').matches){
  const sideLayers=[...document.querySelectorAll('.kvn-sidefx')];
  if(sideLayers.length===2){
    let frame=0;
    const paint=()=>{
      frame=0;
      const shift=Math.min(24,Math.max(-24,window.scrollY*.017));
      sideLayers[0].style.translate='0 '+(-shift).toFixed(1)+'px';
      sideLayers[1].style.translate='0 '+(shift*.68).toFixed(1)+'px';
    };
    window.addEventListener('scroll',()=>{
      if(document.hidden||frame)return;
      frame=requestAnimationFrame(paint);
    },{passive:true});
    paint();
  }
}

const empty=document.getElementById('noData');
if(empty){
  empty.setAttribute('role','status');
  empty.setAttribute('aria-live','polite');
  const text=empty.querySelector('strong');
  if(text && /Collecting your first measurements|We verzamelen/i.test(text.textContent)){
    text.textContent='Waiting for verified history';
  }
}
const decorateCards=()=>{
  const cards=document.querySelectorAll('#publicMetricsContent .official-card,.tabbody .kvn-insight-card');
  let n=0;
  for(const card of cards){
    if(card.dataset.kvnEnhanced)continue;
    card.dataset.kvnEnhanced='1';
    card.style.setProperty('--kvn-stagger',String((n++)%8));
    if(!reduce.matches)card.classList.add('kvn-fade-up');
  }
};
const official=document.getElementById('publicMetricsContent');
if(official){
  decorateCards();
  new MutationObserver(decorateCards).observe(official,{subtree:true,childList:true});
}
const tabs=document.getElementById('tabs');
if(tabs){
  const run=()=>requestAnimationFrame(decorateCards);
  tabs.addEventListener('click',run);
}
// A smaller, eased halo complements the existing immediate cursor glow.
// The animation loop stops after settling and while the tab is hidden.
if(fine.matches&&!reduce.matches){
  const halo=document.createElement('div');halo.className='kvn-pointer-core';
  halo.setAttribute('aria-hidden','true');document.body.append(halo);
  let x=-900,y=-900,goalX=-900,goalY=-900,tick=0,visible=false;
  const update=()=>{
    tick=0;if(document.hidden||!visible)return;
    x+=(goalX-x)*.27;y+=(goalY-y)*.27;
    halo.style.transform='translate3d('+x+'px,'+y+'px,0) translate(-50%,-50%)';
    if(Math.abs(x-goalX)+Math.abs(y-goalY)>.75)tick=requestAnimationFrame(update);
  };
  window.addEventListener('pointermove',e=>{
    if(e.pointerType && e.pointerType!=='mouse' && e.pointerType!=='pen')return;
    if(!visible){x=e.clientX;y=e.clientY;visible=true;halo.style.opacity='.85';}
    goalX=e.clientX;goalY=e.clientY;
    if(!tick)tick=requestAnimationFrame(update);
  },{passive:true});
  document.documentElement.addEventListener('pointerleave',()=>{visible=false;halo.style.opacity='0';if(tick)cancelAnimationFrame(tick);tick=0;},{passive:true});
  window.addEventListener('blur',()=>{visible=false;halo.style.opacity='0';if(tick)cancelAnimationFrame(tick);tick=0;});
  document.addEventListener('visibilitychange',()=>{
    document.body.classList.toggle('kvn-page-hidden',document.hidden);
    if(document.hidden){if(tick)cancelAnimationFrame(tick);tick=0;halo.style.opacity='0';}
    else if(visible){halo.style.opacity='.85';if(!tick)tick=requestAnimationFrame(update);}
  },{passive:true});
} else document.addEventListener('visibilitychange',()=>{
  document.body.classList.toggle('kvn-page-hidden',document.hidden);
},{passive:true});
})();
`;
