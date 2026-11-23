/* KVN CLOTHING visual system. Bundled with the Worker; no browser-side dependency. */
export const premiumCSS = String.raw`
/* KVN CLOTHING // SIGNAL BLUE 2026. Intentional design layer. */
:root{color-scheme:dark;--bg:#080e1c;--surface:#0d1629;--surface2:#11213b;--line:rgba(88,145,215,.23);--green:#31aaff;--soft:#f3f4f6;--muted:#9b9ea7;--white:#f3f4f6;--danger:#ff8f9b;--blue:#238dff;--cyan:#43c4ff;--blueGlow:rgba(49,170,255,.20);--studio-pink:#ff2997}
html{scroll-padding-top:115px}
body{background:var(--bg);color:var(--white);font-family:'Outfit',Arial,sans-serif;font-size:14px;isolation:isolate}
body:before{content:"";position:fixed;inset:0;z-index:-2;pointer-events:none;background:radial-gradient(ellipse 62% 36% at 77% 8%,rgba(32,91,215,.24),transparent 76%),radial-gradient(ellipse 45% 60% at 0% 48%,rgba(15,54,147,.13),transparent 80%),linear-gradient(180deg,#080e1c 0%,#0a1428 55%,#050a13 100%)}
body:after{content:"";position:fixed;inset:0;z-index:-1;pointer-events:none;background-image:linear-gradient(rgba(93,147,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(93,147,255,.025) 1px,transparent 1px);background-size:60px 60px;mask-image:linear-gradient(to bottom,black,transparent 77%)}
::selection{background:#2563ff;color:white}
:focus-visible{outline:2px solid #70d1ff!important;outline-offset:4px}
.noise{opacity:.022;mix-blend-mode:screen}
.wrap{max-width:1432px;padding-left:46px;padding-right:46px}
.top{background:rgba(5,11,30,.75);border-bottom:1px solid rgba(106,154,251,.14);box-shadow:0 10px 40px #03071225}
.top:before{content:"";position:absolute;inset:auto 0 0;height:1px;background:linear-gradient(90deg,transparent,rgba(69,137,255,.55),transparent);opacity:.6}
.nav{height:84px;gap:26px}
.wordmark{font-size:19px;letter-spacing:-.65px;white-space:nowrap;line-height:1.1}
.wordmark b,.footer-brand b{color:#72caff}
.wordmark small{color:#8ea7d2;letter-spacing:2px;font-weight:700}
.slash{color:#38517f}
.navlinks{gap:8px;padding:6px;background:#0b1730;border:1px solid #273d64;border-radius:14px}
.navlinks a{padding:11px 15px;border-radius:9px;color:#9db1d3;transition:background .24s,color .24s;letter-spacing:.5px}
.navlinks a:hover,.navlinks a:focus-visible{background:#152b57;color:#f7fcff}
.nav-right{gap:12px}
.livepill{border:1px solid rgba(59,178,248,.29);color:#9bddff;background:linear-gradient(120deg,rgba(24,60,107,.68),rgba(9,25,54,.75));border-radius:12px;box-shadow:inset 0 1px rgba(150,202,255,.08);letter-spacing:1px;padding:12px 15px}
.pulse{background:#5cceff;box-shadow:0 0 0 4px #4ebaff18,0 0 16px #4ebaff8c}
.playbtn{background:linear-gradient(125deg,#3a86ff,#2563ff 55%,#1750e8);border:1px solid #559cff;border-radius:11px;color:#fff;box-shadow:0 10px 27px #1f63fc30,inset 0 1px rgba(255,255,255,.24);letter-spacing:.25px;padding:13px 18px;transition:transform .25s,box-shadow .25s,filter .25s}
.playbtn:hover{transform:translateY(-3px);box-shadow:0 18px 36px #2266ff4d,inset 0 1px rgba(255,255,255,.25);filter:brightness(1.09)}
.playbtn:active{transform:translateY(0)}
.hero{min-height:638px;grid-template-columns:1.08fr .92fr;gap:30px;padding-top:70px;padding-bottom:79px;overflow:visible}
.hero:before{content:"";position:absolute;pointer-events:none;inset:15px 0 2px 37%;background:radial-gradient(circle at 58% 51%,rgba(28,88,237,.37) 0,rgba(25,53,131,.13) 37%,transparent 66%);opacity:1;z-index:-1;animation:aurora 12s ease-in-out infinite alternate}
.hero:after{content:"";position:absolute;z-index:-1;inset:5% -3% 0 35%;background-image:radial-gradient(#5b9cfa43 1px,transparent 1.5px);background-size:26px 26px;mask-image:radial-gradient(ellipse at center,#000,transparent 74%);pointer-events:none}
.eyebrow{font-size:11px;color:#79c6ff;letter-spacing:3.1px}
.eyebrow:before{width:37px;background:linear-gradient(90deg,#387dff,#72d1ff)}
h1{font-size:clamp(74px,8vw,133px);letter-spacing:-8.5px;line-height:.86;font-weight:700;margin:37px 0 33px;text-shadow:0 12px 50px #0005}
h1 span{background:linear-gradient(105deg,#f5fbff 0%,#91cfff 33%,#438bff 69%,#86e8ff 100%);-webkit-background-clip:text;background-clip:text;color:transparent;text-shadow:none}
.lead{font-size:16px;line-height:1.9;max-width:600px;color:#aabbd9}
.hero-actions{margin-top:33px;gap:12px}
.outlinebtn{border:1px solid rgba(103,149,221,.39);color:#d1e3ff;background:rgba(17,37,75,.52);border-radius:11px;padding:13px 19px;transition:background .25s,border .25s,transform .25s}
.outlinebtn:hover{background:rgba(38,82,162,.3);border-color:#6db9ff;transform:translateY(-3px)}
.tiny{color:#7d91b6}
.hero-note{display:flex;gap:10px;align-items:center;margin-top:25px;color:#95aed5;font-size:11px;letter-spacing:.45px}
.hero-note:before{content:"";height:1px;width:26px;background:#3a7bd7}
.visual{height:445px;isolation:isolate;perspective:1100px}
.visual:before{content:"";position:absolute;width:410px;height:410px;max-width:100%;border:1px solid rgba(66,142,255,.14);border-radius:50%;box-shadow:inset 0 0 70px rgba(37,99,255,.07),0 0 90px rgba(37,99,255,.08)}
.visual:after{content:"";position:absolute;inset:0;background:radial-gradient(circle at 50% 50%,transparent 0 37%,#050b1e00 53%,#050b1e10 80%);pointer-events:none}
.orbit{width:360px;height:360px;border-color:rgba(96,167,255,.29);box-shadow:0 0 32px rgba(30,103,255,.10),inset 0 0 25px rgba(36,86,197,.08)}
.orbit:nth-child(2){width:460px;height:205px;border-color:#2f6ced77}
.halo{width:350px;height:350px;background:radial-gradient(circle,#176ffba6,rgba(20,77,216,.35),transparent 70%);filter:blur(60px);opacity:.7;animation:aurora 6s ease-in-out infinite alternate}
.hero-poster{width:302px;height:302px;box-shadow:0 45px 100px rgba(0,16,65,.8),0 0 80px rgba(36,125,255,.3),0 0 0 12px rgba(42,113,255,.055);border:1px solid #74bdff8f;border-radius:39px;background:linear-gradient(145deg,#274e9d,#071d48)}
.hero-poster img{object-fit:cover}
.hero-poster .fallback{color:#79c2ff}
.floatbadge{right:-10px;top:12%;border:1px solid #5996f06b;background:linear-gradient(135deg,#122f60ed,#0b1837f5);backdrop-filter:blur(24px);box-shadow:0 22px 50px #010a2799,0 0 28px #328bff20;border-radius:19px;padding:18px 22px;color:#b4d8ff}
.floatbadge:before{content:"";position:absolute;inset:1px;border:1px solid rgba(183,219,255,.08);pointer-events:none;border-radius:18px}
.floatbadge strong{font-size:40px;color:#eaf9ff;letter-spacing:-1.8px;margin:9px 0 3px}
.floatbadge .small{color:#76aed9}
.spark{color:#77c6ff;text-shadow:0 0 28px #2f8dff}
.sp1{font-size:31px;left:8%}.sp2{bottom:8%;right:5%}
.ticker{background:linear-gradient(90deg,#0a1732,#0a1d43 55%,#0a1732);border-block:1px solid #1a3769}
.ticker-inner{color:#8aadd8;letter-spacing:2.5px;padding:18px 0;animation-duration:45s}
.ticker-inner strong{color:#52b9ff}
.bar{margin-top:78px;margin-bottom:27px}
.sec-label{color:#63bfff;letter-spacing:2.5px;font-size:10px}
.bar h2{font-size:clamp(34px,3.25vw,51px);font-weight:700;letter-spacing:-2.6px;margin-top:14px}
.bar h2 span{color:#60b9ff!important}
.desc{color:#96a9cd;font-size:13px}
.updated{border-color:rgba(85,145,240,.24);background:linear-gradient(145deg,rgba(22,42,81,.9),rgba(11,23,48,.9));color:#aac4ed;border-radius:12px;box-shadow:inset 0 1px #ffffff0a}
.updated svg{color:#58b4ff}
.metrics{gap:17px}
.card{border:1px solid rgba(100,143,221,.2);border-radius:21px;background:linear-gradient(154deg,rgba(19,43,85,.87),rgba(11,23,50,.95) 58%,rgba(9,19,43,.97));box-shadow:inset 0 1px rgba(206,231,255,.04),0 13px 34px #01091c23;transition:transform .37s cubic-bezier(.2,.7,.2,1),border-color .28s,box-shadow .35s;isolation:isolate}
.card:after{content:"";position:absolute;inset:0;pointer-events:none;border-radius:inherit;background:linear-gradient(125deg,#ffffff10,transparent 30%,transparent 70%,#2456b309);opacity:.9}
.card:hover{transform:translateY(-6px);border-color:#427fe6ad;box-shadow:inset 0 1px #a1c8ff12,0 26px 65px #020a23a6,0 0 0 1px #2a65ea1c}
.card:before{background:radial-gradient(400px circle at var(--mouse-x,50%) var(--mouse-y,30%),rgba(54,139,255,.14),transparent 55%);z-index:1}
.card-content{padding:29px;z-index:2}
.primary{min-height:374px;grid-column:span 2;grid-row:span 2;background:radial-gradient(circle at 88% 92%,rgba(49,109,252,.27),transparent 55%),linear-gradient(148deg,#10285b,#0b1b40 55%,#0a1430)}
.primary:after{content:"";position:absolute;top:-55px;right:-82px;width:350px;height:350px;border:1px solid #477aff1c;border-radius:50%;box-shadow:0 0 0 35px #3576fb09,0 0 0 80px #307afb04}
.primary .card-content{padding:37px}
.metric-label{font-size:10px;letter-spacing:1.4px;color:#aec2e5}
.corner{color:#74caff;font-size:21px}
.number{color:#f5faff;font-size:clamp(32px,3.5vw,54px);font-variant-numeric:tabular-nums;letter-spacing:-2.4px;margin-top:38px}
.primary .number{color:#e2f6ff;background:linear-gradient(100deg,#fff,#7dcaff 65%,#337eff);-webkit-background-clip:text;background-clip:text;color:transparent;font-size:clamp(92px,10vw,151px);line-height:.96;letter-spacing:-8px;margin:53px 0 16px;text-shadow:none}
.metric-info{font-size:12px;color:#8faad4}
.metric-bottom{border-top-color:#3e66ab70;color:#9fc0eb;z-index:2}
.positive{color:#60c7ff}.dim{color:#93a8c8}
.dots i{background:#58a6ff}
.card:not(.primary) .number{transition:color .2s}
.card:hover .number{color:#b9e5ff}
.workspace{gap:17px;margin-top:18px}
.chart-panel{padding:31px}
.panel-head h3{font-size:25px}
.switches{border-radius:12px;background:#08142d;border:1px solid #253e73;padding:5px;gap:3px}
.switches button{border-radius:8px;padding:10px 13px;color:#92aad0}
.switches button.active{color:#fff;background:linear-gradient(135deg,#2c7cff,#215fe7);box-shadow:0 5px 16px #2169f94d}
.switches button:hover:not(.active){color:#ecf5ff;background:#142b56}
.metric-switch{margin:25px 0 23px;gap:9px}
.metric-switch button{background:#0a1d3d;border:1px solid #274878;border-radius:10px;color:#a0b7d9;padding:11px 16px}
.metric-switch button:hover{color:#dff4ff;background:#163262}
.metric-switch button.active{color:#e2f8ff;background:#173a79;border-color:#4198ff;box-shadow:0 0 0 1px #2873fa2c,inset 0 1px #ffffff17}
.chart-wrap{height:310px;border:1px solid #27426c;border-radius:15px;background:linear-gradient(180deg,#0b1a3a88,#06132b11),repeating-linear-gradient(to bottom,transparent 0,transparent 59px,#2d436438 60px,#2d436438 61px);overflow:hidden}
#curve{stroke:#59b9ff;stroke-width:3.5;filter:drop-shadow(0 0 5px #3289ff9a)}
#chartGradient stop:first-child{stop-color:#348bff;stop-opacity:.28}
#chartGradient stop:last-child{stop-color:#2563ff;stop-opacity:0}
#point{fill:#a1e5ff;stroke:#14376a}
#tooltip{border:1px solid #5193e5;background:#0d2350f5;color:#e8f7ff;box-shadow:0 16px 50px #0009;backdrop-filter:blur(12px);font-size:12px;border-radius:11px}
.chart-nodata{background:linear-gradient(180deg,#081834bc,#07132bea);color:#98b7de;font-size:12px}
.chart-nodata strong{color:#c4e8ff}
.chart-axis{padding:0 6px;color:#8da5cb}
.chart-foot{border-top:1px solid #253d65;padding-top:24px;margin-top:24px}
.chart-foot .big{font-size:26px;color:#eef8ff}
.chart-foot small{letter-spacing:1.1px;color:#8eacd4}
.game-cover{background:radial-gradient(circle at 35% 45%,#1b5aa2,#101c43 68%)}
.game-cover:after{background:linear-gradient(transparent,#0a1831)}
.game-icon{background:#1b3766;border:1px solid #5086cf;border-radius:14px}
.game-title{color:#edf9ff}
.game-sub{color:#8ca9cf;letter-spacing:.7px}
.game-body{padding:25px}
.gamelinks{gap:11px}
.tabs{width:max-content;max-width:100%;margin:44px 0 23px;gap:5px;padding:6px;background:#0b1c39;border-color:#2c4774;border-radius:14px;box-shadow:inset 0 1px rgba(200,225,255,.05)}
.tabs button{position:relative;color:#99b4db;padding:14px 19px;border-radius:10px}
.tabs button:hover:not(.active){background:#1a3766;color:#dff4ff}
.tabs button.active{background:linear-gradient(120deg,#2563ff,#348cff);color:#fff;box-shadow:0 7px 20px #1d61ef65}
.tabbody{animation:rise .4s ease both}
.details{gap:16px}
.detail{padding:29px}
.detail h3{font-size:17px;color:#ecf5ff}
.detail p{color:#98acd0;font-size:12px}
.detail .value{font-size:46px;color:#f1faff}
.detail .tag{color:#65c4ff}
.detail .tag.locked{color:#f3c591}
.rating-track{background:#23436f}
.rating-track span{background:linear-gradient(90deg,#2261ff,#57c8ff)}
.privacy{background:linear-gradient(130deg,#102653,#0b1933);border:1px dashed #345b91;border-radius:19px;padding:35px;line-height:1.65;color:#caddfa}
.privacy p{color:#91acce}
.privacy a{color:#7acaff}
footer{margin-top:94px;border-top:1px solid #29406b;color:#8199c2}
.footer-brand{color:#e8f6ff}
.footer-brand b{color:#6ac2ff}
.signal-strip{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:17px;margin-top:17px}
.signal-card{min-width:0;position:relative;display:flex;justify-content:space-between;align-items:center;gap:15px;padding:22px 24px;border:1px solid #264675;background:linear-gradient(115deg,#0d2046,#0a1832);border-radius:17px;box-shadow:inset 0 1px #cce6ff07;overflow:hidden;transition:border .25s,transform .25s}
.signal-card:hover{border-color:#4086dc;transform:translateY(-3px)}
.signal-card span{display:block;color:#86a6d1;font-size:10px;font-weight:800;letter-spacing:1.5px;margin-bottom:10px}
.signal-card strong{font:700 25px 'Space Grotesk';color:#e4f5ff;letter-spacing:-.8px}
.signal-card em{font-style:normal;color:#64b6ff;font-size:20px;opacity:.7}
.section-overline{color:#70c1ff;font-size:11px;font-weight:700;letter-spacing:2px}
.loading-dot{background:#4fbaff;box-shadow:0 0 0 5px #4fbaff19}
.atmosphere{position:absolute;pointer-events:none;inset:0;overflow:hidden;z-index:-1}
.atmosphere i{display:block;position:absolute;width:3px;height:3px;background:#6ecaff;border-radius:50%;opacity:0;box-shadow:0 0 15px #5eaaff;animation:particle 12s linear infinite}
.atmosphere i:nth-child(1){left:12%;top:45%;animation-delay:-3s}
.atmosphere i:nth-child(2){left:45%;top:60%;animation-delay:-9s}
.atmosphere i:nth-child(3){left:75%;top:15%;animation-delay:-6s}
.atmosphere i:nth-child(4){left:82%;top:79%;animation-delay:-1s}
.atmosphere i:nth-child(5){left:29%;top:9%;animation-delay:-12s}
.atmosphere i:nth-child(6){left:67%;top:58%;animation-delay:-4s}
.hero-copy{animation:heroEnter .9s cubic-bezier(.2,.8,.2,1) both}
.hero .visual{animation:heroEnter 1.05s .15s cubic-bezier(.2,.8,.2,1) both}
a,button{-webkit-tap-highlight-color:transparent}
@keyframes aurora{0%{opacity:.75;transform:translate3d(-2%,0,0) scale(.94)}100%{opacity:1;transform:translate3d(3%,2%,0) scale(1.08)}}
@keyframes heroEnter{from{opacity:0;transform:translateY(27px)}to{opacity:1;transform:translateY(0)}}
@keyframes particle{0%{opacity:0;transform:translate3d(0,25px,0) scale(.7)}30%{opacity:.8}75%{opacity:.35}100%{opacity:0;transform:translate3d(15px,-70px,0) scale(1.7)}}
@keyframes bluePulse{50%{box-shadow:0 0 0 13px transparent,0 0 25px rgba(37,99,255,.25)}}
.pulse{animation:bluePulse 2.3s ease-in-out infinite}
.reveal{transition-duration:.78s;transition-timing-function:cubic-bezier(.2,.75,.15,1)}
@media(min-width:1100px){.hero .visual{transform-origin:center}.metrics .card:nth-child(3),.metrics .card:nth-child(5){background:linear-gradient(135deg,#122957,#0c1a36)}}
@media(max-width:1100px){.wrap{padding-left:26px;padding-right:26px}.hero{min-height:520px}.navlinks{gap:1px}.navlinks a{padding:10px 8px;font-size:10px}.hero-poster{width:245px;height:245px}.visual{height:380px}.floatbadge{right:0}.signal-strip{gap:12px}}
@media(max-width:890px){.nav{flex-wrap:wrap;height:auto;min-height:86px;padding-top:13px;padding-bottom:12px}.navlinks{order:3;width:100%;justify-content:space-around;margin-top:3px}.navlinks a{flex:1;text-align:center}.hero{grid-template-columns:1fr 1fr;min-height:480px;padding-top:55px}.hero h1{font-size:clamp(56px,9vw,92px);letter-spacing:-5px}.visual{height:300px}.orbit{width:255px;height:255px}.orbit:nth-child(2){width:300px;height:120px}.hero-poster{width:205px;height:205px;border-radius:30px}.floatbadge{padding:12px 14px}.floatbadge strong{font-size:29px}.primary .number{margin-top:25px}.signal-strip{grid-template-columns:repeat(3,minmax(0,1fr))}}
@media(max-width:690px){html{scroll-padding-top:145px}.wrap{padding-left:17px;padding-right:17px}.top{backdrop-filter:blur(18px)}.nav{min-height:66px;gap:9px;padding-top:13px;padding-bottom:11px}.wordmark{font-size:16px}.wordmark small{display:none}.slash{margin:0 7px}.navlinks{display:flex;order:3;width:100%;padding:4px;gap:2px}.navlinks a{font-size:10px;padding:9px 6px}.nav-right .playbtn{font-size:10px;padding:10px 12px}.livepill{display:none}.hero{grid-template-columns:1fr;gap:18px;padding-top:54px;padding-bottom:35px;min-height:0}.hero:before{inset:28% -14% 0 0}.hero:after{inset:34% 0 0}.hero h1{font-size:clamp(60px,13.9vw,90px);letter-spacing:-5.6px;margin:26px 0 25px;line-height:.89}.lead{font-size:13px;line-height:1.8}.hero-actions{gap:10px;margin-top:24px}.hero-actions .playbtn,.hero-actions .outlinebtn{padding:13px 15px;font-size:10px}.hero-note{margin-top:18px}.visual{height:293px;overflow:visible}.visual:before{width:260px;height:260px}.hero-poster{width:194px;height:194px;border-radius:29px}.orbit{width:250px;height:250px}.orbit:nth-child(2){width:315px;height:125px}.halo{width:250px;height:250px}.floatbadge{right:2%;top:8%;padding:12px 13px}.floatbadge strong{font-size:29px}.ticker-inner{padding:15px 0;font-size:10px;gap:25px}.bar{margin:52px 0 20px;gap:10px}.bar h2{font-size:clamp(29px,7vw,40px);letter-spacing:-1.5px}.desc{font-size:11px}.updated{padding:10px 11px;font-size:10px}.metrics{gap:10px}.card{border-radius:15px}.card-content{padding:19px}.primary{min-height:255px}.primary .card-content{padding:23px}.primary .number{font-size:clamp(79px,16vw,110px);letter-spacing:-5px;margin:24px 0 7px}.metric-label{font-size:10px;letter-spacing:.45px}.number{font-size:clamp(27px,6.3vw,35px);margin-top:25px;letter-spacing:-1.3px}.metric-bottom{left:23px;right:23px;bottom:20px}.metric-info{font-size:11px}.signal-strip{grid-template-columns:1fr;gap:9px;margin-top:11px}.signal-card{padding:17px 19px}.signal-card strong{font-size:22px}.workspace{grid-template-columns:1fr;gap:12px}.chart-panel{padding:18px}.panel-head h3{font-size:21px}.switches{width:100%;justify-content:space-between}.switches button{flex:1;padding:10px 8px}.metric-switch{margin:19px 0 16px;gap:6px}.metric-switch button{padding:10px 12px;font-size:10px}.chart-wrap{height:250px}.chart-foot{padding-top:17px;margin-top:16px}.game-body{padding:19px}.tabs{width:100%;max-width:100%;overflow:auto;gap:3px;padding:5px}.tabs button{padding:12px 13px;font-size:11px}.details{grid-template-columns:1fr}.detail{padding:23px}.detail .value{font-size:39px}.privacy{padding:21px}.privacy p{font-size:12px}footer{margin-top:64px;padding-top:24px}footer>*{display:block;margin:10px 0}}
@media(max-width:360px){.wordmark{font-size:14px}.nav-right .playbtn{font-size:9px}.floatbadge{right:0}.hero h1{font-size:54px}.primary .number{font-size:77px}.metric-label{font-size:9px}}
@media(hover:none){.card:hover,.signal-card:hover{transform:none}.playbtn:hover,.outlinebtn:hover{transform:none}}
@media(prefers-reduced-motion:reduce){.hero-copy,.hero .visual,.atmosphere i{animation:none!important}.hero-copy,.hero .visual{opacity:1!important;transform:none!important}html{scroll-behavior:auto}.reveal{opacity:1;transform:none}}
`;
