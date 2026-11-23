/* Final optional neon visual layer for the deployed Cloudflare Worker. */
export const neonCSS = String.raw`
/* TRENDING EMOTES — Neon Afterglow.
   Visual-only final override. Keep API, DOM structure, layout and data behavior unchanged.
   Dark violet surfaces + electric cyan primary + restrained magenta highlights. */
:root{
  color-scheme:dark;
  --bg:#070613;
  --surface:#111027;
  --surface2:#191538;
  --line:rgba(151,125,251,.26);
  --green:#5df5ff;
  --blue:#9664ff;
  --cyan:#5df5ff;
  --blueGlow:rgba(150,100,255,.24);
  --studio-pink:#ff5ac8;
  --soft:#e7e4ff;
  --white:#f8f6ff;
  --muted:#a7a5c8;
  --neon-violet:#a36bff;
  --neon-cyan:#5df5ff;
  --neon-pink:#ff5ac8;
  --neon-stroke:rgba(157,131,255,.3);
}
body{background:#070613;color:var(--white)}
body::before{
  background:
    radial-gradient(ellipse 55% 48% at 83% 7%,rgba(122,65,239,.24),transparent 72%),
    radial-gradient(ellipse 46% 38% at 5% 39%,rgba(19,187,217,.1),transparent 77%),
    radial-gradient(ellipse 52% 46% at 82% 87%,rgba(222,61,176,.11),transparent 78%),
    linear-gradient(180deg,#070613 0%,#0d0a20 50%,#070714 100%);
}
body::after{
  background-image:
    linear-gradient(rgba(139,102,255,.035) 1px,transparent 1px),
    linear-gradient(90deg,rgba(139,102,255,.035) 1px,transparent 1px);
  background-size:58px 58px;
}
::selection{background:#a36bff;color:#080611}
:focus-visible,a:focus-visible,button:focus-visible,[tabindex]:focus-visible{outline-color:#79f3ff}
.top,.top.nav-scrolled{
  background:rgba(10,8,28,.83);
  border-bottom-color:rgba(164,111,255,.23);
  box-shadow:0 14px 45px rgba(2,0,19,.25);
}
.top::before{background:linear-gradient(90deg,transparent,#a36bff9c,#5df5ff87,transparent)}
.wordmark b,.footer-brand b{color:#9fefff;text-shadow:0 0 18px rgba(93,245,255,.28)}
.navlinks{background:rgba(19,15,47,.83);border-color:rgba(161,126,255,.27)}
.navlinks a{color:#b4afd6}
.navlinks a:hover,.navlinks a:focus-visible{background:rgba(142,94,255,.16);color:#f8f6ff}
.navlinks a[aria-current="location"]{background:linear-gradient(135deg,rgba(134,75,255,.3),rgba(41,180,215,.13));color:#fff}
.navlinks a::after{background:linear-gradient(90deg,#a56bff,#5df5ff)}
.livepill{
  color:#8af6ff;border-color:rgba(93,245,255,.37);
  background:linear-gradient(125deg,rgba(24,83,108,.27),rgba(19,18,48,.83));
  box-shadow:inset 0 1px rgba(178,250,255,.09),0 0 22px rgba(93,245,255,.055);
}
.pulse,.ep-dot,.ep-small-dot,.kvn-feed-indicator{
  background:#5df5ff;
  box-shadow:0 0 0 4px rgba(93,245,255,.11),0 0 16px rgba(93,245,255,.55);
}
.playbtn{
  color:#fff;border-color:#b68aff;
  background:linear-gradient(115deg,#7447ea 0%,#9e57ff 57%,#cf5bdc 100%);
  box-shadow:inset 0 1px rgba(255,255,255,.27),0 10px 30px rgba(127,69,244,.27),0 0 26px rgba(164,107,255,.12);
}
.playbtn:hover{box-shadow:inset 0 1px rgba(255,255,255,.3),0 16px 38px rgba(127,69,244,.35),0 0 30px rgba(164,107,255,.2)}
.outlinebtn{color:#ede6ff;background:rgba(32,22,68,.55);border-color:rgba(175,145,255,.45)}
.outlinebtn:hover{background:rgba(103,65,186,.2);border-color:#b187ff}
.kvn-scroll-progress{background:linear-gradient(90deg,#995bff,#ff5ac8,#5df5ff);box-shadow:0 0 14px #a36bff9c}
.kvn-back-top{background:rgba(25,14,53,.91);border-color:rgba(170,121,255,.47)}
.kvn-back-top:hover{background:#7447ea}
.hero::before{
  background:radial-gradient(circle at 60% 50%,rgba(146,83,253,.28),rgba(97,36,185,.075) 42%,transparent 70%);
}
.hero .eyebrow{
  color:#9df1ff;
  border-color:rgba(124,91,243,.4);
  background:linear-gradient(120deg,rgba(83,45,160,.22),rgba(15,22,48,.48));
}
.hero .eyebrow::before{background:#66f1ff;box-shadow:0 0 0 4px rgba(93,245,255,.11),0 0 16px rgba(93,245,255,.38)}
.hero h1 span,.hero h1 .kvn-line-two{
  background:linear-gradient(108deg,#fff 0%,#bd97ff 27%,#fe86da 58%,#70f2ff 100%);
  -webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;
}
.hero h1 .kvn-line-one{color:#f8f6ff!important;-webkit-text-fill-color:#f8f6ff!important}
.hero .lead,.hero .hero-note{color:#c0bcd8}
.kvn-pointer-core{background:radial-gradient(circle,rgba(143,88,254,.19),rgba(250,80,191,.07) 34%,transparent 70%)}
.orbit{border-color:rgba(170,108,255,.34);box-shadow:0 0 30px rgba(151,82,255,.08)}
.orbit:nth-child(2){border-color:rgba(93,245,255,.3)}
.halo{background:rgba(164,81,255,.27)}
.hero-poster{
  border-color:rgba(190,138,255,.69);
  background:linear-gradient(145deg,#2d1b57,#101c39);
  box-shadow:0 38px 100px rgba(116,55,231,.3),0 0 0 16px rgba(141,67,255,.07),0 0 50px rgba(184,99,255,.11);
}
.floatbadge{
  background:rgba(18,14,43,.91);border-color:rgba(174,120,255,.51);
  box-shadow:0 20px 55px rgba(3,0,20,.5),0 0 24px rgba(161,89,251,.11);
}
.floatbadge strong,.spark{color:#82f2ff}
.kvn-star{background:#b88aff;box-shadow:0 0 14px rgba(188,127,255,.5)}
.ticker{background:rgba(14,10,31,.74);border-block-color:rgba(151,125,251,.22)}
.ticker-inner strong,.sec-label,.eyebrow,.ep-overline,.gb-kicker,.kvn-feed-kicker{color:#86edff}
.bar::before{background:linear-gradient(90deg,transparent,rgba(176,116,255,.35),transparent)}
.updated{background:rgba(25,17,54,.78);border-color:rgba(154,115,244,.28);color:#c6c2e4}
.metrics .card,.card,.chart-panel,.game-card,.detail,.official-card,.signal-card,.kvn-insight-card{
  border-color:rgba(151,125,251,.27);
  background:linear-gradient(144deg,rgba(31,24,66,.94),rgba(17,15,40,.97) 57%,rgba(11,13,33,.98));
  box-shadow:inset 0 1px rgba(218,198,255,.085),0 18px 45px rgba(2,0,19,.24);
}
.metrics .card:hover,.detail:hover,.official-card:hover,.signal-card:hover{
  border-color:rgba(183,137,255,.68);
  box-shadow:inset 0 1px rgba(226,212,255,.12),0 21px 50px rgba(2,0,19,.32),0 0 23px rgba(153,91,255,.14);
}
.metrics .card::after{background:linear-gradient(115deg,rgba(178,129,255,.11),transparent 39%,rgba(50,206,239,.055))}
.metrics .card::before{background:radial-gradient(350px circle at var(--mouse-x,50%) var(--mouse-y,30%),rgba(167,105,255,.2),transparent 57%)}
.metrics .primary,.metrics .card.primary{
  background:radial-gradient(circle at 95% 88%,rgba(113,50,219,.25),transparent 59%),linear-gradient(145deg,#261847,#15112f 65%,#0d1025);
  border-color:rgba(182,128,255,.5);
}
.primary .number,.kvn-ccu-card .number{
  color:#86f6ff;
  text-shadow:0 0 30px rgba(71,218,255,.2),0 0 65px rgba(143,77,255,.12);
}
.metric-label,.label-row,.metric-info,.desc{color:#b8b4d4}
.metric-bottom{border-top-color:rgba(167,125,255,.3);color:#c9c3ee}
.corner,.positive{color:#8ff5ff}
.chart-wrap,.chart-panel .chart-wrap{
  background:linear-gradient(180deg,rgba(32,22,69,.47),rgba(10,12,32,.38)),repeating-linear-gradient(to bottom,transparent 0,transparent 59px,rgba(149,98,255,.1) 60px,transparent 61px);
  border-color:rgba(158,122,255,.29);
}
.switches,.metric-switch,.tabs,.ep-range{background:rgba(14,12,36,.86);border-color:rgba(150,114,243,.35)}
.switches button,.metric-switch button,.tabs button,.ep-range button{color:#b9b2db}
.switches button.active,.metric-switch button.active,.tabs button.active,.ep-range button[aria-pressed="true"]{
  color:#fff;background:linear-gradient(120deg,#7240d6,#a257ff);
  box-shadow:0 7px 19px rgba(128,67,244,.34);
}
.switches button:hover:not(.active),.tabs button:hover:not(.active){background:rgba(118,81,203,.22);color:#fff}
.chart-foot .big,.detail .value,.official-card .k-value{color:#f8f6ff}
.game-cover{background:radial-gradient(circle at 50% 15%,#59348a,#12132c 68%)}
.game-cover::after{background:linear-gradient(transparent,#17112f)}
.rating-track{background:rgba(131,87,227,.2)}
.rating-track span{background:linear-gradient(90deg,#8f64ff,#5df5ff)}
.ep-board{
  background:rgba(160,116,255,.3);border-color:rgba(164,121,255,.45);
  box-shadow:0 28px 85px rgba(7,3,29,.45),0 0 32px rgba(157,93,255,.085);
}
.ep-live-pane{background:radial-gradient(circle at 4% 5%,rgba(167,80,253,.18),transparent 65%),linear-gradient(133deg,#21163f,#11122d 65%,#10132b)}
.ep-graph-pane{background:radial-gradient(circle at 100% 5%,rgba(64,217,243,.09),transparent 65%),linear-gradient(145deg,#181637,#0e132a)}
.ep-live-pane::before{background:radial-gradient(ellipse at 15% 16%,rgba(170,100,255,.1),transparent 65%),repeating-linear-gradient(90deg,transparent,transparent 58px,rgba(136,97,250,.04) 59px,transparent 60px)}
.ep-count-wrap strong{
  background:linear-gradient(105deg,#fff 0%,#d6beff 48%,#85f6ff 100%);
  -webkit-background-clip:text;background-clip:text;color:transparent;
}
.ep-signal-line{background:linear-gradient(90deg,#a56dff,rgba(93,245,255,.35),transparent)}
.ep-bars{border-bottom-color:rgba(181,149,255,.35);background:repeating-linear-gradient(to top,transparent 0,transparent 39px,rgba(144,93,246,.09) 40px,transparent 41px)}
.ep-bar{background:linear-gradient(0deg,#49359e,#9163f4 71%,#74f5ff);box-shadow:0 0 13px rgba(142,85,245,.14)}
.ep-bar:last-child{background:linear-gradient(0deg,#6b3ec1,#bf77fa 63%,#8df8ff);box-shadow:0 0 17px rgba(172,104,255,.21)}
.gb-tile,.gb-explain,.kvn-activity-feed,.kvn-signal{
  background:linear-gradient(145deg,rgba(31,23,67,.95),rgba(13,16,39,.97));
  border-color:rgba(162,124,255,.27);
  box-shadow:0 18px 46px rgba(3,0,22,.22);
}
.gb-lead{background:linear-gradient(135deg,rgba(56,31,107,.94),rgba(17,19,46,.98));border-color:rgba(187,137,255,.47)}
.gb-track span{background:linear-gradient(90deg,#a36bff,#5df5ff)}
.gb-explain-icon{background:rgba(151,83,255,.17);color:#c797ff}
.kvn-feed-insight,.kvn-feed-event{background:rgba(92,67,158,.13);border-color:rgba(168,125,255,.19)}
.kvn-feed-arrow{background:rgba(138,94,245,.17);color:#d4b7ff}
.kvn-signal-eyebrow{color:#ad8fff}
.kvn-growth-focus,.kvn-command{border-color:rgba(163,121,255,.27)}
.kvn-activity-feed h3 span,.ep-heading h2 span,.gb-intro h2 em{
  color:#a981ff;text-shadow:0 0 28px rgba(157,96,255,.21);
}
@media(hover:none){
  .metrics .card:hover,.detail:hover,.official-card:hover,.signal-card:hover{box-shadow:inset 0 1px rgba(218,198,255,.085),0 18px 45px rgba(2,0,19,.24)}
}
@media(prefers-reduced-motion:reduce){
  .pulse,.ep-dot,.ep-small-dot,.kvn-feed-indicator{animation:none!important}
}
`;
