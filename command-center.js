export const commandCenterCSS = String.raw`
/* Command Center: progressive visual layer. Original brand colors preserved. */
:root{--command-ease:cubic-bezier(.16,1,.3,1)}
html{scroll-padding-top:120px}
body{overflow-x:clip}
#pageProgress{position:fixed;top:0;left:0;height:2px;width:100%;z-index:120;transform:scaleX(0);transform-origin:left;background:linear-gradient(90deg,var(--blue),var(--cyan));box-shadow:0 0 18px var(--blueGlow);pointer-events:none}
.command-status{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-top:19px;color:var(--muted);font-size:11px;font-weight:700;letter-spacing:.04em}
.command-status .command-divider{width:3px;height:3px;border-radius:50%;background:var(--cyan);opacity:.6}
.command-status .status-text{color:var(--soft)}
.top{isolation:isolate}
.hero .visual{transform-style:preserve-3d}
.hero-poster{will-change:transform}
.hero-poster:after{content:"";position:absolute;inset:0;background:linear-gradient(125deg,transparent 25%,rgba(255,255,255,.1) 42%,transparent 65%);transform:translateX(-120%);transition:transform 1.1s var(--command-ease);pointer-events:none}
.hero-poster:hover:after{transform:translateX(120%)}
.metrics .card{transition:transform .45s var(--command-ease),border-color .3s,box-shadow .45s var(--command-ease)}
.primary .number{filter:drop-shadow(0 12px 24px rgba(37,99,255,.18))}
.bar h2{letter-spacing:-.045em}
.chart-panel{overflow:hidden}
.chart-panel .chart-wrap{isolation:isolate}
.chart-panel .chart-wrap:after{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(0deg,transparent 20%,rgba(56,189,248,.025) 50%,transparent 80%);background-size:100% 180%;animation:commandScan 9s linear infinite}
#officialMetrics .official-card{position:relative;isolation:isolate;overflow:hidden;transition:transform .45s var(--command-ease),border-color .3s,box-shadow .45s var(--command-ease)}
#officialMetrics .official-card:after{content:"";position:absolute;inset:0;pointer-events:none;border-radius:inherit;background:radial-gradient(320px circle at var(--command-x,50%) var(--command-y,50%),color-mix(in srgb,var(--cyan) 14%,transparent),transparent 70%);opacity:0;transition:opacity .3s}
#officialMetrics .official-card:hover:after{opacity:1}
#officialMetrics .official-card:hover{box-shadow:0 20px 55px rgba(0,0,0,.26)}
#officialMetrics .official-card svg polyline{stroke-dasharray:900;stroke-dashoffset:0}
.navlinks a,.tabs button,.switches button,.metric-switch button{touch-action:manipulation}
a:focus-visible,button:focus-visible{outline:2px solid var(--cyan);outline-offset:3px}
@keyframes commandScan{to{background-position:0 180%}}
@media(min-width:1000px){.hero{min-height:650px}.workspace{gap:20px}.metrics{gap:17px}}
@media(max-width:690px){.command-status{margin-top:15px;font-size:10px}.chart-panel .chart-wrap:after{display:none}.metrics .card:hover{transform:none}}
@media(prefers-reduced-motion:reduce){#pageProgress{transition:none}.hero-poster:after,.chart-panel .chart-wrap:after{display:none!important}.metrics .card,#officialMetrics .official-card{transition:none!important}}
`;
export const commandCenterJS = String.raw`
/* Optional UI enhancements; no API requests or modifications to metric values. */
(()=>{
 'use strict';
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 const bar=document.createElement('div');
 bar.id='pageProgress';bar.setAttribute('aria-hidden','true');document.body.prepend(bar);
 let ticking=false;
 function updateProgress(){
  ticking=false;
  const max=Math.max(0,document.documentElement.scrollHeight-window.innerHeight);
  const ratio=max>0?Math.max(0,Math.min(1,window.scrollY/max)):0;
  bar.style.transform='scaleX('+ratio+')';
 }
 window.addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(updateProgress)}},{passive:true});
 window.addEventListener('resize',updateProgress,{passive:true});updateProgress();
 const actions=document.querySelector('.hero-actions');
 if(actions){
  const status=document.createElement('div');
  status.className='command-status';
  status.innerHTML='<span class="status-text">REAL ROBLOX DATA</span><span class="command-divider"></span><span>AUTOMATIC UPDATES</span><span class="command-divider"></span><span>NO ESTIMATED METRICS</span>';
  actions.insertAdjacentElement('afterend',status);
 }
 const nav=document.querySelector('.navlinks');
 if(nav){
  const links=Array.from(nav.querySelectorAll('a[href^="#"]'));
  const targets=links.map(link=>document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if('IntersectionObserver' in window&&targets.length){
   const observer=new IntersectionObserver(entries=>{
    const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
    if(!visible)return;
    for(const link of links){
     if(link.getAttribute('href')==='#'+visible.target.id)link.setAttribute('aria-current','location');
     else link.removeAttribute('aria-current');
    }
   },{rootMargin:'-18% 0px -62% 0px',threshold:[0,.1,.5]});
   targets.forEach(el=>observer.observe(el));
  }
 }
 if(!reduced.matches&&window.matchMedia('(hover:hover) and (pointer:fine)').matches){
  for(const card of document.querySelectorAll('.official-card')){
   let raf=0;
   card.addEventListener('pointermove',e=>{
    if(raf)return;
    const r=card.getBoundingClientRect();
    const x=(100*(e.clientX-r.left)/r.width).toFixed(1)+'%';
    const y=(100*(e.clientY-r.top)/r.height).toFixed(1)+'%';
    raf=requestAnimationFrame(()=>{card.style.setProperty('--command-x',x);card.style.setProperty('--command-y',y);raf=0});
   },{passive:true});
  }
 }
})();
`;
