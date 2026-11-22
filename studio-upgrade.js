/* Optional presentation-only layer. No API / storage changes. */
export const studioUpgradeCSS = String.raw`
/* KVN STUDIOS-inspired editorial polish. All accents reuse the current blue tokens. */
:root{--studio-ease:cubic-bezier(.16,1,.3,1);--studio-hairline:color-mix(in srgb,var(--cyan) 16%,transparent)}
html{scroll-behavior:smooth}
body{overflow-x:clip}
body::before{background:radial-gradient(ellipse 62% 39% at 82% 10%,rgba(32,91,215,.25),transparent 76%),radial-gradient(ellipse 42% 44% at 0% 46%,rgba(15,54,147,.14),transparent 80%),linear-gradient(180deg,#050b1e 0%,#080e23 56%,#050a17 100%)}
body>main,body>.ticker,body>footer{position:relative;z-index:1}
.kvn-cursor-glow{position:fixed;left:0;top:0;width:min(570px,55vw);height:min(570px,55vw);border-radius:50%;z-index:0;pointer-events:none;opacity:0;background:radial-gradient(circle,rgba(48,129,255,.22) 0%,rgba(38,105,249,.12) 28%,rgba(24,78,198,.045) 47%,transparent 73%);filter:blur(18px);transform:translate3d(-1000px,-1000px,0) translate(-50%,-50%);transition:opacity .4s ease;will-change:transform,opacity;mix-blend-mode:screen}
.kvn-scroll-progress{position:fixed;inset:0 0 auto;height:2px;z-index:300;pointer-events:none;background:linear-gradient(90deg,var(--blue),var(--cyan),#a8e3ff);transform:scaleX(0);transform-origin:left center;box-shadow:0 0 14px var(--cyan);will-change:transform}
.kvn-back-top{position:fixed;z-index:120;right:25px;bottom:25px;display:grid;place-items:center;width:46px;height:46px;border:1px solid color-mix(in srgb,var(--cyan) 40%,transparent);border-radius:15px;background:rgba(10,29,67,.83);color:var(--white);box-shadow:0 14px 40px rgba(0,0,0,.38);backdrop-filter:blur(16px);font:700 21px system-ui;cursor:pointer;opacity:0;visibility:hidden;transform:translateY(15px);transition:opacity .3s,transform .4s var(--studio-ease),visibility .3s,background .3s}
.kvn-back-top.visible{opacity:1;visibility:visible;transform:translateY(0)}
.kvn-back-top:hover{background:var(--blue);transform:translateY(-4px)}
.top{position:sticky;top:0;z-index:130;backdrop-filter:blur(26px) saturate(1.5);-webkit-backdrop-filter:blur(26px) saturate(1.5)}
.top.nav-scrolled{background:rgba(4,11,30,.92)}
.wrap{max-width:1520px}
.nav{height:88px}
.wordmark{font-size:21px;letter-spacing:-.85px}
.wordmark b{text-shadow:0 0 27px color-mix(in srgb,var(--cyan) 28%,transparent)}
.navlinks{background:rgba(11,24,53,.78);box-shadow:inset 0 1px rgba(194,226,255,.075),0 10px 30px rgba(0,0,0,.13)}
.navlinks a[aria-current=location]{background:linear-gradient(150deg,rgba(43,110,240,.25),rgba(25,53,117,.16))}
.playbtn{overflow:hidden;position:relative;isolation:isolate}
.playbtn::after{content:"";position:absolute;inset:-50%;z-index:-1;pointer-events:none;background:linear-gradient(115deg,transparent 37%,rgba(255,255,255,.23) 48%,transparent 60%);transform:translateX(-130%);transition:transform .85s var(--studio-ease)}
.playbtn:hover::after{transform:translateX(130%)}
.hero{min-height:595px;padding-top:62px;padding-bottom:82px;overflow:hidden}
.hero::after{opacity:.6;background-size:25px 25px}
.hero .hero-copy{position:relative}
.hero .eyebrow{display:inline-flex;align-items:center;gap:11px;border:1px solid rgba(100,178,255,.27);border-radius:999px;padding:11px 16px;background:linear-gradient(135deg,rgba(39,100,206,.18),rgba(8,21,47,.33));box-shadow:inset 0 1px rgba(220,245,255,.07);font-size:10px;letter-spacing:2.45px}
.hero .eyebrow::before{width:8px;height:8px;border-radius:50%;background:var(--cyan);box-shadow:0 0 0 4px rgba(56,189,248,.12),0 0 16px rgba(56,189,248,.5)}
.hero .hero-copy h1{font-size:clamp(70px,7.8vw,126px);line-height:.9;letter-spacing:-.082em;font-weight:800;margin:29px 0 27px;filter:drop-shadow(0 16px 32px rgba(0,0,0,.2))}
.hero h1 span{background:linear-gradient(105deg,#f7fbff 5%,#9bd5ff 37%,#438bff 73%,#b5f2ff 100%);-webkit-background-clip:text;background-clip:text}
.hero .lead{max-width:585px;font-size:clamp(14px,1.15vw,17px);line-height:1.82;color:#b3c6e7}
.hero .hero-actions{margin-top:30px}
.hero .hero-actions .playbtn{font-weight:700}
.hero .hero-note{letter-spacing:1.5px;font-size:10px;color:#81b4e8}
.hero .visual{height:415px;filter:drop-shadow(0 18px 50px rgba(26,83,194,.13))}
.hero .hero-poster{width:min(330px,75%);border-radius:42px;animation:kvnPosterFloat 8s ease-in-out infinite;box-shadow:0 40px 90px rgba(0,13,55,.9),0 0 86px rgba(36,125,255,.23),0 0 0 10px rgba(42,113,255,.04)}
.hero .hero-poster img{transition:filter .5s,transform .9s var(--studio-ease)}
.hero .hero-poster:hover img{transform:scale(1.055);filter:saturate(1.1)}
.hero .orbit{border-style:dashed;animation:kvnOrbitSpin 70s linear infinite}
.hero .orbit:nth-child(2){border-style:solid;animation:kvnOrbitSpin 26s linear infinite reverse}
.hero .halo{opacity:.47;animation:kvnAuraBreath 8s ease-in-out infinite}
.hero .floatbadge{top:7%;right:0;border-color:rgba(92,162,255,.45);box-shadow:0 23px 75px rgba(0,7,31,.8),0 0 45px rgba(43,117,255,.13);transform:rotate(2deg);transition:transform .7s var(--studio-ease),box-shadow .4s}
.hero .floatbadge:hover{transform:rotate(0) translateY(-6px);box-shadow:0 31px 78px rgba(0,7,31,.87),0 0 45px rgba(43,117,255,.23)}
.kvn-stars{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:1}
.kvn-star{position:absolute;left:var(--sx);top:var(--sy);width:3px;height:3px;border-radius:50%;background:var(--cyan);opacity:.15;box-shadow:0 0 14px 2px rgba(77,162,255,.35);animation:kvnStarPulse calc(2.9s + var(--sd)) ease-in-out infinite;animation-delay:var(--sd)}
.kvn-hero-rail{position:absolute;right:12px;bottom:17px;z-index:2;display:flex;gap:17px;align-items:center;font:700 10px 'DM Sans',sans-serif;letter-spacing:2px;color:rgba(145,193,246,.54);pointer-events:none}
.kvn-hero-rail::before{content:"";display:block;width:80px;height:1px;background:linear-gradient(90deg,transparent,var(--cyan))}
.ticker{overflow:hidden}
.ticker::after{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(90deg,rgba(5,11,30,.88),transparent 14%,transparent 86%,rgba(5,11,30,.88))}
.ticker-inner{font-weight:700}
.bar{position:relative;overflow:hidden;padding-top:6px;padding-bottom:10px}
.bar[data-studio-index]::after{content:attr(data-studio-index);position:absolute;right:1%;top:-16px;font:800 clamp(60px,9vw,140px) 'Space Grotesk',system-ui,sans-serif;letter-spacing:-.1em;line-height:1;color:rgba(100,170,255,.035);pointer-events:none}
.bar h2{font-size:clamp(39px,4vw,60px);font-weight:800;letter-spacing:-.055em}
.sec-label{font-weight:800}
.desc{line-height:1.8}
.metrics{gap:20px}
.metrics .card{border-color:rgba(89,159,255,.24);background:linear-gradient(144deg,rgba(20,45,88,.91),rgba(10,25,56,.96) 50%,rgba(8,19,43,.98));box-shadow:inset 0 1px rgba(209,233,255,.09),0 14px 44px rgba(0,7,27,.26);overflow:hidden}
.metrics .card::after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:linear-gradient(115deg,rgba(107,190,255,.075),transparent 35%,rgba(32,105,243,.055));z-index:0}
.metrics .card::before{background:radial-gradient(340px circle at var(--mouse-x,50%) var(--mouse-y,30%),rgba(60,151,255,.21),transparent 65%)}
.metrics .card:hover{border-color:rgba(100,193,255,.58);box-shadow:inset 0 1px rgba(209,233,255,.11),0 26px 78px rgba(0,6,27,.53),0 0 36px rgba(42,111,242,.09)}
.metrics .primary{background:radial-gradient(circle at 86% 96%,rgba(39,121,255,.35),transparent 53%),linear-gradient(145deg,#112f65,#0b2048 57%,#09162f)}
.metrics .primary .number{filter:drop-shadow(0 8px 24px rgba(72,164,255,.15))}
.metrics .card .corner{font-size:25px;color:var(--cyan)}
.metrics .card .metric-label{font-weight:800;letter-spacing:1.7px}
.metrics .card .metric-info{color:#a2b9de}
.signal-strip{gap:18px}
.signal-card{position:relative;overflow:hidden;border-color:rgba(101,175,250,.26);background:linear-gradient(136deg,rgba(15,36,76,.92),rgba(8,21,47,.94))}
.signal-card::before{content:"";position:absolute;left:0;top:0;height:2px;width:45%;background:linear-gradient(90deg,var(--cyan),transparent);opacity:.48}
.workspace{gap:19px}
.workspace .chart-panel{background:radial-gradient(circle at 94% 0,rgba(34,103,224,.15),transparent 49%),linear-gradient(145deg,rgba(16,35,75,.95),rgba(9,21,48,.99))}
.chart-wrap{position:relative;border-radius:16px;background:linear-gradient(180deg,rgba(28,62,124,.11),rgba(9,24,52,.03)),repeating-linear-gradient(0deg,transparent 0,transparent calc(25% - 1px),rgba(108,172,255,.095) 25%)}
#chart{filter:drop-shadow(0 7px 11px rgba(38,117,248,.15))}
#curve{stroke-width:3!important;stroke-linecap:round}
.chart-nodata{z-index:3}
.kvn-empty-signal{display:flex;gap:8px;justify-content:center;align-items:flex-end;height:28px;margin:8px 0 12px}
.kvn-empty-signal i{display:block;width:5px;height:12px;background:var(--cyan);border-radius:4px;opacity:.38;animation:kvnSignal 1.5s infinite ease-in-out}
.kvn-empty-signal i:nth-child(2){height:23px;animation-delay:.14s}
.kvn-empty-signal i:nth-child(3){height:16px;animation-delay:.3s}
.metric-switch button,.switches button,.tabs button{transition:background .26s,color .26s,border-color .26s,transform .3s var(--studio-ease)}
.metric-switch button:hover,.switches button:hover,.tabs button:hover{transform:translateY(-2px)}
.game-card{overflow:hidden}
.game-cover{overflow:hidden}
.game-cover img{transition:transform .9s var(--studio-ease),filter .6s}
.game-cover:hover img{transform:scale(1.07);filter:saturate(1.12)}
.detail,.official-card{position:relative;overflow:hidden}
.detail::before,.official-card::before{content:"";position:absolute;top:0;left:18px;right:18px;height:1px;background:linear-gradient(90deg,transparent,rgba(87,176,255,.45),transparent);opacity:.5;pointer-events:none}
.detail:hover,.official-card:hover{border-color:rgba(112,180,255,.52)}
.official-card svg{filter:drop-shadow(0 4px 8px rgba(36,132,255,.16))}
footer{border-top-color:rgba(89,157,255,.25)}
@keyframes kvnPosterFloat{0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-13px) rotate(-1deg)}}
@keyframes kvnOrbitSpin{to{transform:rotate(360deg)}}
@keyframes kvnAuraBreath{0%,100%{opacity:.3;filter:blur(43px)}50%{opacity:.55;filter:blur(56px)}}
@keyframes kvnStarPulse{0%,100%{opacity:.12;transform:scale(.8)}50%{opacity:.75;transform:scale(1.4)}}
@keyframes kvnSignal{0%,100%{opacity:.25;transform:scaleY(.6)}50%{opacity:.85;transform:scaleY(1.1)}}
@media(max-width:1100px){.hero{min-height:530px;padding-top:45px;padding-bottom:55px}.hero .hero-copy h1{font-size:clamp(57px,7vw,95px)}.hero .visual{height:360px}.hero .hero-poster{width:min(265px,75%)}}
@media(max-width:890px){.nav{height:auto}.hero{min-height:0;padding-top:48px;padding-bottom:42px}.hero .visual{height:300px}.hero .hero-copy h1{font-size:clamp(56px,8vw,84px)}.kvn-hero-rail{display:none}}
@media(max-width:690px){.wrap{padding-left:18px;padding-right:18px}.nav{height:auto}.hero{padding-top:34px;padding-bottom:30px;overflow:hidden}.hero .eyebrow{font-size:9px;letter-spacing:1.5px;padding:9px 12px}.hero .hero-copy h1{font-size:clamp(54px,13vw,83px);letter-spacing:-.072em;margin:23px 0 18px}.hero .lead{font-size:13px;line-height:1.75}.hero .visual{height:270px}.hero .hero-poster{width:190px;border-radius:29px}.hero .floatbadge{top:12%;right:0}.kvn-stars{opacity:.55}.bar[data-studio-index]::after{font-size:76px;top:4px}.bar h2{font-size:clamp(31px,7.5vw,44px)}.metrics{gap:10px}.metrics .card .metric-label{letter-spacing:.75px}.metrics .card:not(.primary) .number{font-size:clamp(24px,7vw,37px)}.signal-strip{gap:10px}.kvn-back-top{right:15px;bottom:15px;width:42px;height:42px;border-radius:13px}.hero .hero-poster img:hover{transform:none}}
@media(max-width:380px){.hero .hero-copy h1{font-size:clamp(50px,13vw,65px)}.hero .eyebrow{letter-spacing:.8px}.hero .hero-actions{flex-wrap:wrap}.hero .visual{height:255px}}
@media(hover:none),(pointer:coarse){.kvn-cursor-glow{display:none}.metric-switch button:hover,.switches button:hover,.tabs button:hover{transform:none}.hero .hero-poster:hover img{transform:none}}
@media(prefers-reduced-motion:reduce){.kvn-stars,.kvn-cursor-glow{display:none}.hero .hero-poster,.hero .orbit,.hero .halo,.kvn-empty-signal i{animation:none!important}.hero .hero-poster{transform:none}.playbtn::after{display:none}.kvn-back-top{transition:none}}
/* Ambient blue telemetry on wide desktop gutters only. */
.kvn-sidefx{position:fixed;inset:0 auto 0 0;width:calc((100vw - 1500px)/2);z-index:0;pointer-events:none;overflow:hidden;opacity:.82}
.kvn-sidefx--right{left:auto;right:0;transform:scaleX(-1)}
.kvn-sidefx:before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse 100% 38% at 0 30%,rgba(43,116,255,.18),transparent 76%)}
.kvn-sidefx__track{position:absolute;left:33%;top:0;bottom:0;width:1px;background:linear-gradient(transparent,rgba(88,159,255,.28) 20%,rgba(76,163,255,.35) 55%,transparent);box-shadow:0 0 20px rgba(40,131,255,.2)}
.kvn-sidefx__track:before{content:"";position:absolute;top:0;left:-2px;width:5px;height:78px;border-radius:50px;background:linear-gradient(transparent,#77ceff,transparent);filter:blur(2px);animation:sideSweep 15s linear infinite}
.kvn-sidefx__track:after{content:"";position:absolute;left:-3px;top:var(--pointer-y,50%);width:7px;height:7px;border-radius:50%;background:#8bd9ff;box-shadow:0 0 14px #398bff,0 0 32px #3686ff;transition:top .25s ease-out}
.kvn-sidefx__ring{position:absolute;left:33%;top:29%;width:clamp(100px,11vw,190px);aspect-ratio:1;border:1px solid rgba(76,147,255,.2);border-radius:50%;transform:translate(-50%,-50%);box-shadow:inset 0 0 40px rgba(44,110,244,.06),0 0 50px rgba(44,110,244,.05);animation:sideBreath 10s ease-in-out infinite}
.kvn-sidefx__ring:after{content:"";position:absolute;inset:20%;border:1px dashed rgba(85,168,255,.3);border-radius:50%;animation:sideRotate 27s linear infinite}
.kvn-sidefx__ticks{position:absolute;left:33%;top:51%;display:grid;gap:14px;transform:translate(-50%,-50%);opacity:.55}
.kvn-sidefx__ticks i{display:block;height:1px;width:25px;background:linear-gradient(90deg,transparent,#56aaff,transparent)}
.kvn-sidefx__ticks i:nth-child(3n){width:39px;margin-left:-7px}
.kvn-sidefx__caption{position:absolute;left:calc(33% + 17px);top:73%;font:700 9px 'DM Sans',system-ui,sans-serif;letter-spacing:3px;white-space:nowrap;color:rgba(119,179,255,.42);writing-mode:vertical-rl}
.kvn-sidefx--right .kvn-sidefx__caption{transform:scaleX(-1)}
@keyframes sideSweep{0%{transform:translateY(-20vh);opacity:0}15%,85%{opacity:1}100%{transform:translateY(120vh);opacity:0}}
@keyframes sideBreath{50%{opacity:.55;filter:brightness(1.5)}}
@keyframes sideRotate{to{transform:rotate(360deg)}}
@media(max-width:1699px){.kvn-sidefx{display:none}}
@media(prefers-reduced-motion:reduce){.kvn-sidefx__track:before,.kvn-sidefx__ring,.kvn-sidefx__ring:after{animation:none}.kvn-sidefx__track:after{transition:none}}

`;
export const studioUpgradeJS = String.raw`
/* Visual-only enhancements. Does not change the analytics API, chart data or events. */
(() => {
  'use strict';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(pointer: fine) and (hover: hover)').matches;
  const hero = document.querySelector('.hero');
  const text = (selector, value) => { const el=document.querySelector(selector); if(el) el.textContent=value; };
  const all = (selector, values) => document.querySelectorAll(selector).forEach((node, i) => { if(values[i]) node.textContent=values[i]; });
  // Existing metric elements and ids stay intact; only presentation copy is translated.
  text('.hero .eyebrow','LIVE EXPERIENCE INTELLIGENCE');
  text('.hero .lead','Discover what drives TRENDING EMOTES! — live players, growth, engagement and verified Roblox analytics. All in one place.');
  text('.hero .hero-note','REAL ROBLOX DATA  /  ZERO MADE-UP NUMBERS');
  text('#dashboard .bar .desc','Verified public Roblox statistics, refreshed every minute.');
  text('#analytics .bar .desc','Explore real player activity and historical performance.');
  text('#details .bar .desc','A closer look at the signals behind your experience.');
  all('.metrics .metric-info',[
    'Players enjoying TRENDING EMOTES! right now.',
    'Total visits since launch.',
    'Players who favorited the experience.',
    'Share of all votes that are positive.',
    'Highest observed CCU in the selected range.'
  ]);
  text('.chart-key .key-source','Measured Roblox activity / no estimates');
  all('.signal-card span',[
    'MEASURED CCU CHANGE · 1H',
    'DATA POINTS · SELECTED RANGE',
    'CURRENT DATA SOURCE'
  ]);
  text('.game-card .desc','Artwork and metrics are loaded from Roblox. No invented numbers.');
  text('.tabbody[data-page="engagement"] .details .detail:nth-child(1) p','Players who gave this experience a positive vote.');
  text('.tabbody[data-page="engagement"] .details .detail:nth-child(2) p','Players who gave this experience a negative vote.');
  text('.tabbody[data-page="engagement"] .details .detail:nth-child(3) p','Positive votes as a percentage of all votes.');
  const source=document.getElementById('signalSource');
  if(source){const translate=()=>{if(source.textContent==='DEZE BROWSER')source.textContent='THIS BROWSER';};translate();new MutationObserver(translate).observe(source,{childList:true});}
  document.querySelectorAll('.bar').forEach(bar=>{
    const label=bar.querySelector('.sec-label');
    const found=label && label.textContent.match(/^\s*(\d\d)\s*\//);
    if(found)bar.dataset.studioIndex=found[1];
  });
  if(hero){
    const stars=document.createElement('div');stars.className='kvn-stars';stars.setAttribute('aria-hidden','true');
    if(!reduced) {
      const positions=[[12,18],[22,74],[31,30],[43,12],[50,80],[61,21],[72,67],[81,15],[92,42],[84,84],[7,54],[56,52]];
      for(let i=0;i<positions.length;i++){
        const dot=document.createElement('i');dot.className='kvn-star';
        dot.style.setProperty('--sx',positions[i][0]+'%');
        dot.style.setProperty('--sy',positions[i][1]+'%');
        dot.style.setProperty('--sd',(i%6*.37)+'s');
        stars.append(dot);
      }
      hero.prepend(stars);
    }
    const rail=document.createElement('div');rail.className='kvn-hero-rail';
    rail.setAttribute('aria-hidden','true');rail.textContent='KVN / EXPERIENCE 001';
    hero.append(rail);
  }
  const nodata=document.getElementById('noData');
  if(nodata && !nodata.querySelector('.kvn-empty-signal')){
    const graphic=document.createElement('div');graphic.className='kvn-empty-signal';graphic.setAttribute('aria-hidden','true');
    for(let i=0;i<3;i++) graphic.append(document.createElement('i'));
    nodata.prepend(graphic);
  }
  const progress=document.createElement('div');progress.className='kvn-scroll-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
  const topButton=document.createElement('button');topButton.type='button';topButton.className='kvn-back-top';
  topButton.setAttribute('aria-label','Back to top');topButton.title='Back to top';topButton.textContent='↑';
  topButton.addEventListener('click',()=>window.scrollTo({top:0,behavior:reduced?'instant':'smooth'}));document.body.append(topButton);
  let raf=0;
  const scroll=()=>{if(raf)return;raf=requestAnimationFrame(()=>{
    raf=0;const room=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
    progress.style.transform='scaleX('+Math.max(0,Math.min(1,window.scrollY/room))+')';
    topButton.classList.toggle('visible',window.scrollY>650);
  });};
  window.addEventListener('scroll',scroll,{passive:true});
  window.addEventListener('resize',scroll,{passive:true});
  scroll();
  if(fine && !reduced){
    const glow=document.createElement('div');glow.className='kvn-cursor-glow';glow.setAttribute('aria-hidden','true');document.body.append(glow);
    let x=-1000,y=-1000,frame=0;
    window.addEventListener('pointermove',e=>{
      if(e.pointerType && e.pointerType!=='mouse' && e.pointerType!=='pen')return;
      x=e.clientX;y=e.clientY;glow.style.opacity='1';
      if(frame)return;
      frame=requestAnimationFrame(()=>{
        frame=0;glow.style.transform='translate3d('+x+'px,'+y+'px,0) translate(-50%,-50%)';
      });
    },{passive:true});
    document.documentElement.addEventListener('pointerleave',()=>{glow.style.opacity='0';},{passive:true});
    window.addEventListener('blur',()=>{glow.style.opacity='0';});
  }
  // Decorative wide-screen rails. They never interfere with analytics or clicks.
  const sideRails=[];
  for(const side of ['left','right']){
    const rail=document.createElement('div');
    rail.className='kvn-sidefx kvn-sidefx--'+side;rail.setAttribute('aria-hidden','true');
    const track=document.createElement('div');track.className='kvn-sidefx__track';
    const ring=document.createElement('div');ring.className='kvn-sidefx__ring';
    const ticks=document.createElement('div');ticks.className='kvn-sidefx__ticks';
    for(let i=0;i<11;i++)ticks.append(document.createElement('i'));
    const label=document.createElement('span');label.className='kvn-sidefx__caption';
    label.textContent=side==='left'?'LIVE SIGNAL / KVN':'VERIFIED DATA / ROBLOX';
    rail.append(track,ring,ticks,label);document.body.append(rail);sideRails.push(rail);
  }
  if(fine&&!reduced){
    let animation=0,pointer=50;
    window.addEventListener('pointermove',e=>{
      pointer=Math.max(5,Math.min(95,e.clientY/window.innerHeight*100));
      if(animation)return;
      animation=requestAnimationFrame(()=>{
        animation=0;
        for(const rail of sideRails)rail.style.setProperty('--pointer-y',pointer+'%');
      });
    },{passive:true});
  }

})();
`;
