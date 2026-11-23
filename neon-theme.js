/* Final electric-blue KVN Studios-inspired visual layer for the Cloudflare Worker. */
export const neonCSS = String.raw`

/* TRENDING EMOTES — KVN-style electric blue, presentation only.
   Reference direction: near-black navy / vivid #39b9ff -> #248fff blue.
   Retains information architecture, layout, API and data state. */
:root{
  color-scheme:dark;
  --bg:#040b15;
  --surface:#0a1c32;
  --surface2:#102845;
  --line:rgba(71,167,255,.28);
  --green:#38b6ff;
  --blue:#258fff;
  --cyan:#39b9ff;
  --blueGlow:rgba(43,155,255,.26);
  --studio-pink:#37adff;
  --soft:#e0f2ff;
  --white:#f5fbff;
  --muted:#99b6d0;
  --neon-blue:#258fff;
  --neon-ice:#39b9ff;
  --neon-sky:#6ed5ff;
  --neon-stroke:rgba(80,171,255,.29);
}
body{background:#040b15;color:var(--white)}
body::before{
  background:
    radial-gradient(ellipse 63% 48% at 80% 8%,rgba(31,126,244,.26),transparent 72%),
    radial-gradient(ellipse 48% 43% at 0% 42%,rgba(18,155,235,.1),transparent 79%),
    radial-gradient(ellipse 53% 38% at 85% 84%,rgba(18,97,204,.12),transparent 76%),
    linear-gradient(180deg,#040911 0%,#071629 46%,#040b16 100%);
}
body::after{
  background-image:linear-gradient(rgba(71,157,255,.032) 1px,transparent 1px),
                   linear-gradient(90deg,rgba(71,157,255,.032) 1px,transparent 1px);
  background-size:58px 58px;
}
::selection{background:#289dff;color:#001126}
:focus-visible,a:focus-visible,button:focus-visible,[tabindex]:focus-visible{outline-color:#68cfff}
.top,.top.nav-scrolled{
  background:rgba(3,12,25,.86);
  border-bottom-color:rgba(74,161,255,.25);
  box-shadow:0 15px 42px rgba(0,5,21,.28);
}
.top::before{background:linear-gradient(90deg,transparent,#2c95ffb0,#47bfffac,transparent)}
.wordmark b,.footer-brand b{color:#39b9ff;text-shadow:0 0 20px rgba(43,161,255,.3)}
.navlinks{background:rgba(9,27,52,.88);border-color:rgba(72,153,249,.29)}
.navlinks a{color:#aac5e5}
.navlinks a:hover,.navlinks a:focus-visible{background:rgba(38,132,245,.19);color:#f5fbff}
.navlinks a[aria-current="location"]{background:linear-gradient(135deg,rgba(38,131,255,.31),rgba(40,180,255,.13));color:#fff}
.navlinks a::after{background:linear-gradient(90deg,#2088ff,#39b9ff)}
.livepill{
  color:#7cdaff;border-color:rgba(53,172,255,.39);
  background:linear-gradient(125deg,rgba(24,82,139,.32),rgba(8,27,54,.82));
  box-shadow:inset 0 1px rgba(197,238,255,.09),0 0 23px rgba(36,159,255,.07);
}
.pulse,.ep-dot,.ep-small-dot,.kvn-feed-indicator,.gc-dot,.gc-status-dot{
  background:#39b9ff;
  box-shadow:0 0 0 4px rgba(50,168,255,.12),0 0 19px rgba(57,185,255,.5);
}
.playbtn{
  color:#fff;border:1px solid #5abaff;
  background:linear-gradient(112deg,#39b9ff 0%,#258fff 58%,#176fe9 100%);
  box-shadow:inset 0 1px rgba(255,255,255,.29),0 12px 32px rgba(22,115,247,.31),0 0 25px rgba(46,165,255,.13);
}
.playbtn:hover{
  filter:brightness(1.08);
  box-shadow:inset 0 1px rgba(255,255,255,.35),0 18px 40px rgba(20,116,245,.38),0 0 30px rgba(44,161,255,.24);
}
.outlinebtn{color:#d9efff;background:rgba(12,40,77,.58);border-color:rgba(80,159,255,.48)}
.outlinebtn:hover{background:rgba(34,115,217,.23);border-color:#66c7ff}
.kvn-scroll-progress{background:linear-gradient(90deg,#2386ff,#39b9ff,#86dcff);box-shadow:0 0 15px rgba(57,185,255,.65)}
.kvn-back-top{background:rgba(8,30,63,.94);border-color:rgba(75,171,255,.52)}
.kvn-back-top:hover{background:#197ce9}
.hero::before{
  background:radial-gradient(circle at 58% 48%,rgba(33,127,255,.29),rgba(17,76,171,.085) 43%,transparent 72%);
}
.hero .eyebrow{
  color:#6fd1ff;
  border-color:rgba(73,160,255,.39);
  background:linear-gradient(125deg,rgba(24,91,171,.24),rgba(10,30,60,.5));
}
.hero .eyebrow::before{background:#39b9ff;box-shadow:0 0 0 4px rgba(53,171,255,.11),0 0 17px rgba(57,185,255,.47)}
.hero h1 span,.hero h1 .kvn-line-two{
  background:linear-gradient(103deg,#39b9ff 0%,#33b0ff 31%,#278fff 72%,#207bfa 100%);
  -webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;
}
.hero h1 .kvn-line-one{color:#f6fbff!important;-webkit-text-fill-color:#f6fbff!important}
.hero .lead,.hero .hero-note{color:#afc8e1}
.kvn-pointer-core{background:radial-gradient(circle,rgba(42,156,255,.23),rgba(19,95,236,.07) 34%,transparent 70%)}
.orbit{border-color:rgba(71,174,255,.32);box-shadow:0 0 30px rgba(32,146,255,.09)}
.orbit:nth-child(2){border-color:rgba(97,206,255,.31)}
.halo{background:rgba(40,141,255,.29)}
.hero-poster{
  border-color:rgba(82,180,255,.75);
  background:linear-gradient(145deg,#143b68,#0b203d);
  box-shadow:0 38px 105px rgba(13,93,220,.32),0 0 0 16px rgba(32,135,255,.075),0 0 50px rgba(53,181,255,.15);
}
.floatbadge{
  background:rgba(6,23,47,.93);border-color:rgba(80,175,255,.53);
  box-shadow:0 22px 58px rgba(0,10,28,.52),0 0 24px rgba(48,157,255,.12);
}
.floatbadge strong,.spark{color:#57c3ff}
.kvn-star{background:#59c7ff;box-shadow:0 0 15px rgba(54,172,255,.53)}
.ticker{background:rgba(6,20,39,.82);border-block-color:rgba(74,157,250,.25)}
.ticker-inner strong,.sec-label,.eyebrow,.ep-overline,.gb-kicker,.kvn-feed-kicker{color:#62c8ff}
.bar::before{background:linear-gradient(90deg,transparent,rgba(59,166,255,.38),transparent)}
.updated{background:rgba(8,30,57,.82);border-color:rgba(67,147,243,.34);color:#b8d2ec}
.metrics .card,.card,.chart-panel,.game-card,.detail,.official-card,.signal-card,.kvn-insight-card{
  border-color:rgba(78,157,250,.3);
  background:linear-gradient(144deg,rgba(17,48,88,.95),rgba(9,30,58,.97) 56%,rgba(6,21,42,.985));
  box-shadow:inset 0 1px rgba(184,225,255,.095),0 19px 46px rgba(0,8,26,.26);
}
.metrics .card:hover,.detail:hover,.official-card:hover,.signal-card:hover{
  border-color:rgba(88,190,255,.73);
  box-shadow:inset 0 1px rgba(206,237,255,.15),0 21px 50px rgba(0,8,26,.32),0 0 24px rgba(41,156,255,.19);
}
.metrics .card::after{background:linear-gradient(115deg,rgba(82,180,255,.1),transparent 38%,rgba(32,117,243,.055))}
.metrics .card::before{background:radial-gradient(350px circle at var(--mouse-x,50%) var(--mouse-y,30%),rgba(60,164,255,.21),transparent 57%)}
.metrics .primary,.metrics .card.primary{
  background:radial-gradient(circle at 96% 87%,rgba(28,103,239,.27),transparent 58%),linear-gradient(145deg,#143964,#0b274b 63%,#07172e);
  border-color:rgba(90,181,255,.54);
}
.primary .number,.kvn-ccu-card .number{
  color:#45beff;
  text-shadow:0 0 30px rgba(52,185,255,.27),0 0 70px rgba(29,125,249,.14);
}
.metric-label,.label-row,.metric-info,.desc{color:#b0c8df}
.metric-bottom{border-top-color:rgba(95,175,255,.29);color:#b6d5f4}
.corner,.positive{color:#65d0ff}
.chart-wrap,.chart-panel .chart-wrap{
  background:linear-gradient(180deg,rgba(19,60,108,.46),rgba(8,25,50,.32)),
    repeating-linear-gradient(to bottom,transparent 0,transparent 59px,rgba(82,156,250,.1) 60px,transparent 61px);
  border-color:rgba(79,153,251,.32);
}
.switches,.metric-switch,.tabs,.ep-range{background:rgba(6,23,47,.89);border-color:rgba(77,151,245,.37)}
.switches button,.metric-switch button,.tabs button,.ep-range button{color:#b3cbea}
.switches button.active,.metric-switch button.active,.tabs button.active,.ep-range button[aria-pressed="true"]{
  color:#fff;background:linear-gradient(120deg,#39b9ff,#2188ef);
  box-shadow:0 7px 19px rgba(28,123,243,.35);
}
.switches button:hover:not(.active),.tabs button:hover:not(.active){background:rgba(39,123,222,.24);color:#fff}
.chart-foot .big,.detail .value,.official-card .k-value{color:#f5fbff}
.game-cover{background:radial-gradient(circle at 50% 15%,#245b92,#091a36 68%)}
.game-cover::after{background:linear-gradient(transparent,#0c2440)}
.rating-track{background:rgba(36,112,224,.2)}
.rating-track span{background:linear-gradient(90deg,#248aff,#58c7ff)}
.ep-board{
  background:rgba(75,160,253,.32);border-color:rgba(77,161,255,.46);
  box-shadow:0 29px 90px rgba(0,12,39,.46),0 0 33px rgba(40,144,255,.1);
}
.ep-live-pane{background:radial-gradient(circle at 4% 5%,rgba(34,142,249,.19),transparent 65%),linear-gradient(133deg,#12365f,#0b2447 65%,#091b35)}
.ep-graph-pane{background:radial-gradient(circle at 100% 5%,rgba(48,175,255,.1),transparent 65%),linear-gradient(145deg,#0d2c52,#091e3b)}
.ep-live-pane::before{background:radial-gradient(ellipse at 15% 16%,rgba(52,157,255,.12),transparent 65%),repeating-linear-gradient(90deg,transparent,transparent 58px,rgba(66,153,247,.044) 59px,transparent 60px)}
.ep-count-wrap strong{
  background:linear-gradient(104deg,#f5fbff 0%,#9bdeff 45%,#39b9ff 100%);
  -webkit-background-clip:text;background-clip:text;color:transparent;
}
.ep-signal-line{background:linear-gradient(90deg,#39b9ff,rgba(54,172,255,.34),transparent)}
.ep-bars{border-bottom-color:rgba(81,167,255,.36);background:repeating-linear-gradient(to top,transparent 0,transparent 39px,rgba(58,135,239,.11) 40px,transparent 41px)}
.ep-bar{background:linear-gradient(0deg,#1655a5,#238bfc 70%,#68d0ff);box-shadow:0 0 14px rgba(40,145,247,.16)}
.ep-bar:last-child{background:linear-gradient(0deg,#1a65bc,#39afff 64%,#a3e7ff);box-shadow:0 0 19px rgba(53,173,255,.26)}
.gb-tile,.gb-explain,.kvn-activity-feed,.kvn-signal{
  background:linear-gradient(145deg,rgba(13,43,82,.96),rgba(7,25,50,.98));
  border-color:rgba(83,159,248,.31);
  box-shadow:0 18px 47px rgba(0,11,33,.23);
}
.gb-lead{background:linear-gradient(135deg,rgba(20,65,119,.96),rgba(8,30,60,.99));border-color:rgba(95,183,255,.49)}
.gb-track span{background:linear-gradient(90deg,#1888ff,#52c5ff)}
.gb-explain-icon{background:rgba(47,139,255,.19);color:#78d4ff}
.kvn-feed-insight,.kvn-feed-event{background:rgba(37,106,185,.15);border-color:rgba(99,174,255,.23)}
.kvn-feed-arrow{background:rgba(42,123,242,.18);color:#97d9ff}
.kvn-signal-eyebrow{color:#77c9ff}
.kvn-growth-focus,.kvn-command{border-color:rgba(65,154,255,.3)}
.kvn-growth-focus__surface,.gc-live,.gc-action{
  border-color:rgba(88,169,255,.36);
  background:radial-gradient(circle at 95% 0%,rgba(29,135,247,.18),transparent 46%),linear-gradient(140deg,#102d51,#081b37 74%);
  box-shadow:inset 0 1px rgba(201,235,255,.085),0 19px 50px rgba(0,12,36,.26);
}
.gc-heading h2 span,.kvn-growth-focus h2 span,.kvn-activity-feed h3 span,.ep-heading h2 span,.gb-intro h2 em{
  color:#39b9ff;text-shadow:0 0 24px rgba(40,153,255,.23);
}
.gc-kicker,.kvn-growth-focus__eyebrow,.gb-kicker{color:#72cbff}
.gc-status,.kvn-growth-focus__signal{border-color:rgba(67,169,255,.35);background:rgba(12,56,105,.24);color:#8ad6ff}
.gc-big,.kvn-growth-focus__value{color:#f5fbff;text-shadow:0 0 45px rgba(41,139,255,.09)}
.gc-movement{border-color:rgba(67,168,255,.35);background:rgba(5,24,52,.64)}
@media(hover:none){
  .metrics .card:hover,.detail:hover,.official-card:hover,.signal-card:hover{
    box-shadow:inset 0 1px rgba(184,225,255,.095),0 19px 46px rgba(0,8,26,.26);
  }
}
@media(prefers-reduced-motion:reduce){
  .pulse,.ep-dot,.ep-small-dot,.kvn-feed-indicator{animation:none!important}
}


/* Prevent trailing digits being cropped on every counter. */
#dashboard .metrics .card .number,
.ep-count-wrap > strong,
.gb-live-count,
.gc-live-number,
.gc-kpi > strong,
.gc-funnel strong,
.kvn-growth-focus__value,
.kvn-growth-focus__tile-value,
.detail .value,
.official-card strong,
.chart-foot .big{
  letter-spacing:-.025em;
  padding-inline-end:.13em;
  padding-block-end:.06em;
  overflow:visible;
  text-overflow:clip;
  font-variant-numeric:tabular-nums lining-nums;
}
.ep-count-wrap{flex-wrap:wrap;column-gap:14px;row-gap:8px}
.ep-count-wrap > strong{flex:0 0 auto;min-width:max-content;max-width:none;line-height:1.04}
.ep-ccu-tag{flex:0 0 auto}
#dashboard .metrics .primary .number{letter-spacing:-.03em}
@media(max-width:410px){.ep-count-wrap > strong{font-size:clamp(64px,17vw,96px)}}

`;
