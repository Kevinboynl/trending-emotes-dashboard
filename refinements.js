/* KVN CLOTHING / preserving the original blue palette. */
export const refinementCSS = String.raw`
/* KVN CLOTHING / refinement layer
   Intentionally no new brand colors: this layer consumes the existing design tokens only. */
:root{--ease-lux:cubic-bezier(.18,.7,.18,1);--ease-enter:cubic-bezier(.16,1,.3,1)}
body{font-synthesis:none;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
main{position:relative}
button,a{-webkit-tap-highlight-color:transparent}
::selection{background:var(--blue);color:var(--white)}
a:focus-visible,button:focus-visible,[tabindex]:focus-visible{outline:2px solid var(--cyan);outline-offset:4px}
.top{transition:background .35s var(--ease-lux),box-shadow .35s var(--ease-lux),border-color .35s var(--ease-lux)}
.top.nav-scrolled{box-shadow:0 16px 52px rgba(0,0,0,.38);border-bottom-color:color-mix(in srgb,var(--cyan) 30%,transparent)}
.navlinks{isolation:isolate}
.navlinks a{position:relative;transition:background .28s var(--ease-lux),color .28s var(--ease-lux)}
.navlinks a:after{content:"";height:2px;left:16px;right:16px;bottom:5px;position:absolute;border-radius:3px;background:var(--cyan);transform:scaleX(0);transform-origin:center;transition:transform .4s var(--ease-enter)}
.navlinks a[aria-current="location"]{color:var(--white);background:color-mix(in srgb,var(--blue) 17%,transparent)}
.navlinks a[aria-current="location"]:after{transform:scaleX(1)}
.hero{isolation:isolate}
.hero-sheen{position:absolute;z-index:-1;left:50%;top:50%;width:330px;height:330px;border-radius:50%;opacity:.23;pointer-events:none;filter:blur(42px);background:radial-gradient(circle,var(--blue) 0%,transparent 70%);transform:translate3d(-50%,-50%,0);will-change:transform}
.hero h1{max-width:750px}
.hero .eyebrow{animation:refineIn .75s .08s var(--ease-enter) both}
.hero .lead{max-width:590px}
.hero .hero-actions{animation:refineIn .8s .16s var(--ease-enter) both}
.hero .hero-note{animation:refineIn .8s .25s var(--ease-enter) both}
.hero .floatbadge{backdrop-filter:blur(20px) saturate(125%)}
.hero-poster{backface-visibility:hidden}
.bar{position:relative}
.bar:before{content:"";position:absolute;top:0;right:0;left:0;height:1px;background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--blue) 24%,transparent),transparent);opacity:.38;pointer-events:none}
.bar h2{line-height:1.1;text-wrap:balance}
.bar .desc{margin-top:8px;max-width:610px}
.sec-label,.metric-label{font-variant-numeric:tabular-nums}
.metrics .card,.official-card,.signal-card,.chart-panel,.detail,.game-card{contain:paint}
.metrics .card{transform-style:preserve-3d;backface-visibility:hidden}
.metrics.reveal.show .card{animation:refineCard .8s var(--ease-enter) both;animation-delay:calc(var(--stagger,0) * 65ms)}
.metrics .card:focus-within,.detail:focus-within{border-color:var(--cyan)}
.metrics .card .number,.official-card strong,.signal-card strong{font-variant-numeric:tabular-nums}
.metrics .card .metric-label{white-space:normal;line-height:1.5}
.metrics .primary .card-content{min-height:240px}
.metrics .primary .metric-info{max-width:350px}
.metrics .primary:before{border-radius:inherit}
.metrics .card:not(.primary) .metric-info{max-width:265px}
.metrics .card:not(.primary) .card-content{min-height:172px}
.card .corner{display:inline-grid;place-items:center;transition:transform .4s var(--ease-enter),opacity .25s}
.card:hover .corner{transform:translate(3px,-3px)}
.card .number{transition:filter .3s var(--ease-lux)}
.metrics .number,.detail .value{text-wrap:nowrap}
.metrics .primary .number{line-height:1.04}
.metrics .card .metric-info{line-height:1.75}
.metrics .card::after{transition:opacity .3s var(--ease-lux)}
.metrics .card:hover::after{opacity:1}
.sparkline{width:100%;height:38px;display:block;margin-top:8px;overflow:visible;opacity:.96;pointer-events:none}
.primary .sparkline{height:57px;max-width:425px;margin-top:20px;opacity:.85}
.sparkline path.spark-fill{fill:color-mix(in srgb,var(--blue) 12%,transparent)}
.sparkline path.spark-stroke{fill:none;stroke:var(--cyan);stroke-width:2;vector-effect:non-scaling-stroke;stroke-linecap:round;stroke-linejoin:round}
.primary .sparkline path.spark-stroke{stroke-width:2.5}
.metrics .number[data-updated]{animation:tinyPop .52s var(--ease-enter)}
.metrics.is-loading .card .number{position:relative;color:transparent!important;text-shadow:none!important;min-height:1em}
.metrics.is-loading .card .number::after{content:"";display:block;position:absolute;inset:12% auto 8% 0;width:62%;border-radius:10px;background:linear-gradient(100deg,color-mix(in srgb,var(--surface2) 85%,transparent),color-mix(in srgb,var(--blue) 20%,transparent),color-mix(in srgb,var(--surface2) 85%,transparent));background-size:210% 100%;animation:skeletonSweep 1.7s ease-in-out infinite}
.metrics.is-loading .primary .number::after{width:46%}
.metrics.is-loading .primary .number{min-height:1.16em}
.nav-right .playbtn,.hero-actions .playbtn,.gamelinks .playbtn,.outlinebtn{position:relative;overflow:hidden;isolation:isolate}
.playbtn:after,.outlinebtn:after{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(110deg,transparent 25%,color-mix(in srgb,var(--white) 18%,transparent) 50%,transparent 75%);transform:translateX(-155%) skewX(-12deg);transition:transform .7s var(--ease-lux)}
.playbtn:hover:after,.outlinebtn:hover:after{transform:translateX(155%) skewX(-12deg)}
.playbtn:active,.outlinebtn:active{transform:translateY(1px) scale(.98)}
.updated .pulse{flex:none}
.chart-panel{position:relative}
.chart-panel:before{content:"";position:absolute;pointer-events:none;top:0;left:7%;right:7%;height:1px;background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--cyan) 35%,transparent),transparent)}
.panel-head h3{letter-spacing:-.9px}
.metric-switch,.switches{scrollbar-width:thin;scrollbar-color:var(--line) transparent}
.switches button,.metric-switch button{transition:background .26s var(--ease-lux),color .26s var(--ease-lux),border-color .26s var(--ease-lux),transform .2s var(--ease-lux)}
.switches button:active,.metric-switch button:active{transform:scale(.96)}
.metric-switch button.active:before{content:"";display:inline-block;width:5px;height:5px;background:var(--cyan);border-radius:50%;margin-right:7px;vertical-align:2px}
.chart-wrap{isolation:isolate}
.chart-wrap:after{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(90deg,color-mix(in srgb,var(--surface2) 24%,transparent),transparent 7%,transparent 93%,color-mix(in srgb,var(--surface2) 24%,transparent));opacity:.7}
.chart-grid-labels{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:space-between;pointer-events:none;padding:12px 9px 16px;z-index:1}
.chart-grid-labels span{display:block;width:max-content;padding:3px 5px;color:var(--muted);font-size:10px;background:color-mix(in srgb,var(--surface2) 72%,transparent);border-radius:4px;opacity:.8}
#chart{position:relative;z-index:2}
.chart-crosshair{position:absolute;inset:0 auto 0 0;width:1px;background:linear-gradient(to bottom,transparent,color-mix(in srgb,var(--cyan) 38%,transparent),transparent);pointer-events:none;z-index:3;opacity:0;transform:translateX(0);transition:opacity .17s var(--ease-lux)}
.chart-wrap.hovering .chart-crosshair{opacity:1}
.chart-wrap #tooltip{display:block!important;opacity:0;transform:translate(-50%,calc(-110% + 9px));transition:opacity .18s var(--ease-lux),transform .18s var(--ease-lux);will-change:opacity,transform;max-width:calc(100% - 12px);overflow:hidden;text-overflow:ellipsis}
.chart-wrap.hovering #tooltip{opacity:1;transform:translate(-50%,-110%)}
.chart-key{display:flex;align-items:center;gap:10px;justify-content:space-between;flex-wrap:wrap;margin:14px 0 0;color:var(--muted);font-size:11px}
.chart-key .key-left{display:flex;align-items:center;gap:9px;min-width:0}
.chart-key .key-mark{width:16px;height:3px;border-radius:3px;background:var(--cyan);box-shadow:0 0 12px color-mix(in srgb,var(--cyan) 35%,transparent)}
.chart-key .key-name{color:var(--soft);font-weight:700}
.chart-key .key-source{font-size:10px}
.chart-axis{margin-top:11px}
.chart-foot .big{font-variant-numeric:tabular-nums}
.game-card .game-cover img{transition:transform .65s var(--ease-enter),filter .65s var(--ease-enter)}
.game-card:hover .game-cover img{filter:saturate(1.045);transform:scale(1.035)}
.tabs{position:relative;isolation:isolate}
.tabs button{position:relative;z-index:2}
.tabs.enhanced button.active{background:transparent;box-shadow:none}
.tabs .tab-indicator{pointer-events:none;position:absolute;left:0;top:0;z-index:1;border-radius:10px;background:linear-gradient(120deg,var(--blue),var(--cyan));box-shadow:0 7px 20px color-mix(in srgb,var(--blue) 35%,transparent);transition:transform .48s var(--ease-enter),width .45s var(--ease-enter),height .45s var(--ease-enter);transform:translate3d(0,0,0)}
.tabbody.active{animation:panelEnter .47s var(--ease-enter) both}
.tabbody .card:nth-child(1){animation:refineIn .5s var(--ease-enter) both}
.tabbody .card:nth-child(2){animation:refineIn .5s .08s var(--ease-enter) both}
.tabbody .card:nth-child(3){animation:refineIn .5s .16s var(--ease-enter) both}
.official-card{transition:transform .35s var(--ease-lux),border-color .3s var(--ease-lux),box-shadow .3s var(--ease-lux)}
.official-card:hover{box-shadow:0 24px 45px rgba(0,0,0,.23),inset 0 1px color-mix(in srgb,var(--cyan) 12%,transparent)}
.official-message{border-radius:18px}
.official-grid{gap:17px}
.official-card strong{letter-spacing:-1.5px}
#details{scroll-margin-top:110px}
#dashboard,#analytics,#officialMetrics{scroll-margin-top:115px}
footer .footer-brand{letter-spacing:-.4px}
@keyframes refineCard{from{opacity:0;transform:translateY(25px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes refineIn{from{opacity:0;transform:translateY(17px)}to{opacity:1;transform:translateY(0)}}
@keyframes panelEnter{from{opacity:0;transform:translate3d(0,12px,0)}to{opacity:1;transform:translate3d(0,0,0)}}
@keyframes skeletonSweep{to{background-position-x:-210%}}
@keyframes tinyPop{0%{filter:brightness(1)}50%{filter:brightness(1.16)}100%{filter:brightness(1)}}
@media(min-width:900px) and (pointer:fine) and (hover:hover){
.metrics .card[data-tilt="1"]:hover{transform:perspective(900px) translateY(-5px) rotateX(var(--tilt-x,0deg)) rotateY(var(--tilt-y,0deg));transition:transform .2s ease-out,border-color .3s,box-shadow .3s}
}
@media(max-width:900px){
.hero-sheen{width:240px;height:240px;opacity:.14;filter:blur(30px)}
}
@media(max-width:680px){
.metrics .card:not(.primary) .card-content{min-height:154px}
.metrics .primary .card-content{min-height:160px}
.metrics.is-loading .primary .number{min-height:1.08em}
.sparkline{height:28px;margin-top:7px}
.primary .sparkline{height:39px;margin-top:10px}
.chart-grid-labels{padding:8px 7px 12px}
.chart-grid-labels span{font-size:9px}
.chart-key{font-size:10px}
.bar h2{text-wrap:pretty}
.metrics .number{font-size:clamp(24px,7vw,38px)}
.metrics .metric-info{overflow-wrap:anywhere}
.signal-card{min-width:0}
.signal-card strong{overflow-wrap:anywhere}
.official-grid{gap:10px}
.official-card{min-width:0}
}
@media(hover:none),(pointer:coarse){
.hero-sheen{display:none}
.metrics .card:hover{transform:none}
.card .corner{transform:none}
}
@media(prefers-reduced-motion:reduce){
.hero .eyebrow,.hero .hero-actions,.hero .hero-note,.metrics.reveal.show .card,
.tabbody.active,.tabbody .card,.metrics .number[data-updated]{animation:none!important}
.metrics .card,.tabs .tab-indicator,.chart-wrap #tooltip,.official-card{transition:none!important}
.metrics .card[data-tilt="1"]:hover{transform:none!important}
.metrics.is-loading .card .number::after{animation:none!important}
.hero-sheen{display:none!important}
}
`;
export const refinementJS = String.raw`
/* A progressive enhancement. It never requests private data or changes API payloads. */
(()=>{
'use strict';
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
const fine=window.matchMedia('(hover:hover) and (pointer:fine)');
const root=document.documentElement;
const throttle=(fn)=>{let task=0,latest;return(...args)=>{latest=args;if(task)return;task=requestAnimationFrame(()=>{task=0;fn(...latest)})}};
const metricMap={playing:['ccu','Players online'],visits:['visits','Visits'],favorites:['favorites','Favorites']};
const format=n=>Number.isFinite(n)?Intl.NumberFormat('nl-NL',{maximumFractionDigits:0}).format(n):'—';
const $id=id=>document.getElementById(id);
const safeArray=(arr)=>Array.isArray(arr)?arr:[];

// 1. Navigation: scroll spy does not alter the original navigation structure.
const nav=document.querySelector('.top');
const navLinks=[...document.querySelectorAll('.navlinks a[href^="#"]')].filter(a=>a.hash.length>1);
const sections=navLinks.map(a=>document.getElementById(a.hash.slice(1))).filter(Boolean);
function markCurrent(id){
  navLinks.forEach(a=>{
    if(a.hash==='#'+id)a.setAttribute('aria-current','location');
    else a.removeAttribute('aria-current');
  });
}
const navUpdate=throttle(()=>{
  nav?.classList.toggle('nav-scrolled',window.scrollY>20);
  const best=[...sections].reverse().find(s=>s.getBoundingClientRect().top<=window.innerHeight*.37);
  if(best)markCurrent(best.id);
});
window.addEventListener('scroll',navUpdate,{passive:true});
window.addEventListener('resize',navUpdate,{passive:true});
navLinks.forEach(a=>a.addEventListener('click',()=>markCurrent(a.hash.slice(1))));
navUpdate();

// 2. Entrance choreography and palette-preserving cursor light.
document.querySelectorAll('.metrics .card').forEach((card,i)=>card.style.setProperty('--stagger',String(i)));
const hero=document.querySelector('.hero');
if(hero&&!reduce.matches&&fine.matches){
  const light=document.createElement('i');
  light.className='hero-sheen';light.setAttribute('aria-hidden','true');
  hero.append(light);
  hero.addEventListener('pointermove',throttle(e=>{
    const r=hero.getBoundingClientRect();
    light.style.transform='translate3d('+(e.clientX-r.left-165)+'px,'+(e.clientY-r.top-165)+'px,0)';
  }),{passive:true});
  hero.addEventListener('pointerleave',()=>{light.style.transform='translate3d(-700px,-700px,0)'});
}
if(!reduce.matches&&fine.matches){
  for(const card of document.querySelectorAll('.metrics .card')){
    card.dataset.tilt='1';
    const onMove=throttle(e=>{
      const r=card.getBoundingClientRect();
      const nx=Math.max(-1,Math.min(1,(e.clientX-r.left)/r.width*2-1));
      const ny=Math.max(-1,Math.min(1,(e.clientY-r.top)/r.height*2-1));
      card.style.setProperty('--tilt-x',(-ny*1.35).toFixed(2)+'deg');
      card.style.setProperty('--tilt-y',(nx*1.5).toFixed(2)+'deg');
    });
    card.addEventListener('pointermove',onMove,{passive:true});
    card.addEventListener('pointerleave',()=>{
      card.style.setProperty('--tilt-x','0deg');
      card.style.setProperty('--tilt-y','0deg');
    });
  }
}

// 3. Loading skeletons use DOM state, not guesses. Unavailable Roblox data remains unavailable.
const grid=document.querySelector('.metrics');
const state=$id('status');
if(grid && state && /CONNECTING/i.test(state.textContent||'')){
  grid.classList.add('is-loading');
  const watching=new MutationObserver(()=>{
    if(!/CONNECTING/i.test(state.textContent||'')){
      grid.classList.remove('is-loading');
      watching.disconnect();
    }
  });
  watching.observe(state,{childList:true,subtree:true,characterData:true});
  setTimeout(()=>{grid.classList.remove('is-loading');watching.disconnect()},15000);
}

// 4. Tab selection indicator (positioned relative to the actual active tab).
const tabBar=$id('tabs');
if(tabBar){
  const indicator=document.createElement('div');
  indicator.className='tab-indicator';indicator.setAttribute('aria-hidden','true');
  tabBar.prepend(indicator);
  tabBar.classList.add('enhanced');
  const shift=()=>{
    const active=tabBar.querySelector('button.active');
    if(!active)return;
    indicator.style.width=active.offsetWidth+'px';
    indicator.style.height=active.offsetHeight+'px';
    indicator.style.transform='translate3d('+active.offsetLeft+'px,'+active.offsetTop+'px,0)';
  };
  tabBar.addEventListener('click',()=>requestAnimationFrame(shift));
  window.addEventListener('resize',throttle(shift),{passive:true});
  tabBar.addEventListener('scroll',throttle(shift),{passive:true});
  requestAnimationFrame(shift);
}

// 5. Interactive chart atmosphere: crosshair, legend, plotted data labels.
const chart=$id('chart'),curve=$id('curve');
const frame=document.querySelector('.chart-wrap');
if(chart && frame && curve){
  const cross=document.createElement('div');cross.className='chart-crosshair';cross.setAttribute('aria-hidden','true');
  frame.append(cross);
  const rows=document.createElement('div');rows.className='chart-grid-labels';
  rows.setAttribute('aria-hidden','true');
  for(let i=0;i<4;i++)rows.append(document.createElement('span'));
  frame.prepend(rows);
  const foot=document.createElement('div');foot.className='chart-key';
  foot.innerHTML='<div class="key-left"><i class="key-mark" aria-hidden="true"></i><span class="key-name">Live activity</span></div><span class="key-source">Gemeten Roblox-data • geen schattingen</span>';
  const chartAxis=document.querySelector('.chart-axis');
  if(chartAxis) chartAxis.before(foot);
  const mark=throttle(e=>{
    const rect=chart.getBoundingClientRect();
    const fraction=Math.max(0,Math.min(1,(e.clientX-rect.left)/rect.width));
    cross.style.transform='translateX('+(fraction*rect.width)+'px)';
    frame.classList.add('hovering');
  });
  chart.addEventListener('pointermove',mark,{passive:true});
  chart.addEventListener('pointerleave',()=>frame.classList.remove('hovering'));
  chart.addEventListener('pointercancel',()=>frame.classList.remove('hovering'));
  function refreshChart(){
    const pts=safeArray(typeof chartPoints!=='undefined'?chartPoints:[]);
    const label=typeof valueFields!=='undefined'?valueFields[currentMetric]:currentMetric;
    const legend=foot.querySelector('.key-name');
    legend.textContent=label+' · '+(currentRange||'24h').toUpperCase();
    if(pts.length){
      const values=pts.map(x=>x.raw?.[currentMetric]).filter(Number.isFinite);
      if(values.length){
        const lo=Math.min(...values),hi=Math.max(...values);
        const ticks=[hi,hi-(hi-lo)/3,hi-(hi-lo)*2/3,lo];
        rows.querySelectorAll('span').forEach((el,i)=>el.textContent=format(ticks[i]));
      }
    } else rows.querySelectorAll('span').forEach(el=>el.textContent='');
    renderSparks();
  }
  const observeChart=new MutationObserver(throttle(refreshChart));
  observeChart.observe(curve,{attributes:true,attributeFilter:['d']});
  requestAnimationFrame(refreshChart);
  document.querySelector('#metrics')?.addEventListener('click',()=>requestAnimationFrame(refreshChart));
  document.querySelector('#ranges')?.addEventListener('click',()=>setTimeout(refreshChart,100));
}

// 6. Mini charts: real samples only; no filler lines when history is empty.
function renderSparks(){
  const range=typeof currentRange==='string'&&spans[currentRange]?currentRange:'24h';
  const base=typeof usingCloud!=='undefined'&&usingCloud?cloudHistory:browserHistory;
  const filtered=safeArray(base).filter(p=>Number.isFinite(p?.t)&&p.t>=Date.now()-spans[range]);
  for(const [target,[field,label]] of Object.entries(metricMap)){
    const num=$id(target);const card=num?.closest('.card');if(!num||!card)continue;
    let svg=card.querySelector('.sparkline');
    const points=filtered.filter(p=>Number.isFinite(p[field])).sort((a,b)=>a.t-b.t);
    if(points.length<2){
      if(svg)svg.remove();
      continue;
    }
    const max=Math.max(...points.map(p=>p[field])),min=Math.min(...points.map(p=>p[field]));
    const t0=points[0].t,t1=points[points.length-1].t;
    const coords=points.map((p,i)=>({
      x: t1===t0?i/(points.length-1)*190:(p.t-t0)/(t1-t0)*190,
      y: 37-(p[field]-min)/(max-min||1)*29
    }));
    const d=coords.map((p,i)=>(i?'L':'M')+p.x.toFixed(1)+' '+p.y.toFixed(1)).join(' ');
    if(!svg){
      svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
      svg.classList.add('sparkline');
      svg.setAttribute('viewBox','0 0 190 44');
      svg.setAttribute('preserveAspectRatio','none');
      svg.setAttribute('role','img');
      svg.setAttribute('aria-label','Gemeten trend voor '+label);
      const fill=document.createElementNS('http://www.w3.org/2000/svg','path');
      fill.setAttribute('class','spark-fill');
      const stroke=document.createElementNS('http://www.w3.org/2000/svg','path');
      stroke.setAttribute('class','spark-stroke');
      svg.append(fill,stroke);
      const info=card.querySelector('.metric-info');
      if(info)info.after(svg);else card.querySelector('.card-content')?.append(svg);
    }
    svg.children[0]?.setAttribute('d',d+' L190 44 L0 44 Z');
    svg.children[1]?.setAttribute('d',d);
  }
}

// 7. Mark new numbers for subtle visual feedback; no extra API calls.
const statNodes=['playing','visits','favorites','rating','heroCCU','peak'];
for(const name of statNodes){
  const el=$id(name);if(!el)continue;
  let last=el.textContent;
  let settle;
  const watch=new MutationObserver(()=>{
    if(el.textContent===last)return;
    last=el.textContent;
    clearTimeout(settle);
    if(reduce.matches || last==='—')return;
    settle=setTimeout(()=>{
      if(!el.isConnected || !el.closest('.metrics'))return;
      el.animate([{opacity:.84,transform:'translateY(2px)'},{opacity:1,transform:'translateY(0)'}],
        {duration:340,easing:'cubic-bezier(.16,1,.3,1)'});
    },780);
  });
  watch.observe(el,{childList:true,characterData:true,subtree:true});
}
})();
`;
