/* TRENDING EMOTES! 2026: real-data CCU control-room enhancements. */
export const liveIntelligenceCSS = String.raw`
/* Consolidated CCU base; the single motion block below owns all timings. */
.metrics .primary{isolation:isolate;min-height:360px;overflow:hidden;transition:transform .22s ease,border-color .3s ease,box-shadow .3s ease}
.metrics .primary .card-content{position:relative;z-index:3;min-height:240px;padding-bottom:44px}
.kvn-ccu-card .number{font-variant-numeric:tabular-nums lining-nums;position:relative;z-index:3;line-height:1.04}
.kvn-ccu-status-line{display:flex;flex-wrap:wrap;align-items:center;gap:9px 15px;margin-top:21px;font:800 10px 'Inter','DM Sans',system-ui,sans-serif;letter-spacing:1.1px;color:#a6c5e9}
.kvn-ccu-state{display:inline-flex;align-items:center;gap:8px;white-space:nowrap}
.kvn-ccu-dot{height:6px;width:6px;display:inline-block;border-radius:50%;background:#55caff;box-shadow:0 0 0 4px rgba(66,174,255,.11)}
.kvn-ccu-state[data-state="cached"] .kvn-ccu-dot{background:#9daec6;box-shadow:0 0 0 4px rgba(141,164,195,.1)}
.kvn-ccu-state[data-state="unavailable"] .kvn-ccu-dot{background:#efb49e;box-shadow:0 0 0 4px rgba(239,180,158,.1)}
.kvn-ccu-delta{font-variant-numeric:tabular-nums;color:#b3c9e5}
.kvn-ccu-delta[data-direction="up"]{color:#86dfff}
.kvn-ccu-delta[data-direction="down"]{color:#b4c5e0}
.kvn-ccu-delta[data-direction="flat"],.kvn-ccu-delta[data-direction="none"]{color:#99aecf}
.kvn-ccu-freshness{display:flex;flex-wrap:wrap;gap:7px;margin-top:12px;font:600 10px/1.5 'Inter','DM Sans',system-ui,sans-serif;color:#8fa7c9}
.kvn-ccu-change{position:relative;z-index:6;display:inline-flex;align-items:center;gap:6px;max-width:100%;font:800 15px/1 'Space Grotesk','Inter',sans-serif;font-variant-numeric:tabular-nums;background:rgba(19,69,132,.85);color:#d3f3ff;border:1px solid rgba(110,212,255,.68);box-shadow:0 8px 26px rgba(4,36,97,.29);pointer-events:none;opacity:0}
.kvn-ccu-change[hidden]{display:none!important}
.kvn-ccu-change[data-direction="down"]{background:rgba(36,58,97,.92);color:#c5d6ed;border-color:rgba(161,188,226,.5);box-shadow:0 8px 20px rgba(0,19,48,.2)}
.kvn-ccu-change small{font:800 9px 'Inter','DM Sans',sans-serif;letter-spacing:.65px;opacity:.82}
.kvn-ccu-record{position:relative;display:inline-flex;align-items:center;gap:7px;border:1px solid rgba(103,201,255,.36);background:rgba(43,130,242,.14);border-radius:999px;padding:7px 11px;max-width:max-content;margin-top:13px;font:800 10px 'Inter','DM Sans',sans-serif;color:#b9e9ff;letter-spacing:.8px;box-shadow:inset 0 1px rgba(175,233,255,.06)}
.kvn-ccu-record[hidden]{display:none!important}
.kvn-ccu-flash{position:absolute;z-index:1;inset:0;border-radius:inherit;pointer-events:none;opacity:0;background:radial-gradient(circle at 35% 45%,rgba(61,180,255,.16),transparent 76%)}
.kvn-ccu-flash::after{content:"";position:absolute;inset:0;border:1px solid rgba(117,222,255,.55);border-radius:inherit;opacity:0;pointer-events:none}
@keyframes kvnCcuVisibleRise{0%{opacity:0}20%{opacity:.78}100%{opacity:0}}
@keyframes kvnCcuVisibleFall{0%{opacity:0}24%{opacity:.48}100%{opacity:0}}
@keyframes kvnCcuRing{0%{opacity:0}18%{opacity:.8}100%{opacity:0}}
@keyframes kvnCcuRingDown{0%{opacity:0}18%{opacity:.5}100%{opacity:0}}
@media(max-width:690px){.kvn-ccu-status-line{margin-top:14px;gap:7px 11px;font-size:9px;letter-spacing:.65px}.kvn-ccu-freshness{font-size:9px}.kvn-ccu-change{font-size:13px}.metrics .primary{min-height:305px}}
@media(prefers-reduced-motion:reduce){.kvn-ccu-card[data-motion] .kvn-ccu-flash,.kvn-ccu-card[data-motion] .kvn-ccu-flash::after{animation:none!important;opacity:0!important}}

/* Chart geometry safety: metric selectors must never collide with the plot edge.
   Keep this after older theme layers so all responsive breakpoints agree. */
.workspace,.workspace>*{min-width:0}
.chart-panel{min-width:0;overflow:visible;contain:layout style}
.chart-panel .panel-head{position:relative;z-index:3;min-width:0}
.chart-panel .metric-switch{
 position:relative;z-index:3;display:flex;align-items:center;align-content:center;
 flex-wrap:wrap;gap:8px;max-width:100%;min-width:0;
 margin:18px 0 18px;padding:2px 2px 3px;overflow:visible;
}
.chart-panel .metric-switch button{
 position:relative;flex:0 0 auto;white-space:nowrap;min-height:40px;
 line-height:1.35;margin:0;vertical-align:middle;
}
.chart-panel .chart-wrap{position:relative;z-index:1;min-width:0;width:100%;margin-top:0;overflow:hidden}
.chart-panel #chart{display:block;width:100%;height:100%;max-width:100%;overflow:hidden}
.chart-panel #curve,.chart-panel #shade{pointer-events:none}
.chart-panel .chart-axis,.chart-panel .chart-foot{min-width:0}
.chart-panel .chart-foot .big{overflow-wrap:anywhere}
@media(max-width:690px){
 .chart-panel .metric-switch{
  flex-wrap:nowrap;overflow-x:auto;overflow-y:hidden;overscroll-behavior-inline:contain;
  -webkit-overflow-scrolling:touch;scrollbar-width:thin;gap:7px;
  margin:15px 0 14px;padding:3px 2px 7px;
 }
 .chart-panel .metric-switch button{min-height:42px;padding:10px 12px}
 .chart-panel .panel-head{gap:12px}
 .chart-panel .switches{max-width:100%;min-width:0}
 .chart-panel .switches button{min-width:0}
}
@media(prefers-reduced-motion:reduce){
 .chart-panel .metric-switch button:hover{transform:none}
}

/* Chart label-safe region: no graph segment may touch the floating metric
   text or filter controls. The SVG reserves its first 105/300 units for labels;
   the tooltip occupies only that reserved lane, on every viewport. */
.chart-panel .metric-switch{margin-bottom:24px}
.chart-panel .chart-wrap{isolation:isolate;min-width:0}
.chart-panel .chart-wrap #tooltip{
 position:absolute;top:12px!important;z-index:8;
 transform:translate(-50%,0)!important;
 width:max-content;max-width:calc(100% - 20px);white-space:normal;
 overflow-wrap:break-word;overflow:visible;
 text-align:center;font-variant-numeric:tabular-nums;
 line-height:1.35;pointer-events:none
}
.chart-panel .chart-wrap.hovering #tooltip{
 transform:translate(-50%,0)!important
}
.chart-panel .chart-crosshair{top:34%!important;bottom:0}
@media(max-width:690px){
 .chart-panel .metric-switch{margin-bottom:22px}
 .chart-panel .chart-wrap #tooltip{
  top:9px!important;padding:8px 10px;font-size:10px;
  max-width:calc(100% - 18px)
 }
}

/* Real D1 comparisons; never show placeholders as measured changes. */
.kvn-compare{border-top:1px solid rgba(102,165,255,.19);margin-top:20px;padding:19px 4px 0;display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px 18px}
.kvn-compare-left{display:flex;flex-direction:column;gap:7px;min-width:0;flex:1}
.kvn-compare-title{color:#91c6ff;font:800 10px 'Inter','DM Sans',sans-serif;letter-spacing:1.3px}
.kvn-compare-description{color:#9db2d2;font:500 11px/1.65 'Inter','DM Sans',sans-serif;max-width:46ch}
.kvn-compare-value{display:flex;flex-direction:column;align-items:flex-end;gap:5px;min-width:160px;font-variant-numeric:tabular-nums}
.kvn-compare-value strong{color:#ecf8ff;font:800 clamp(17px,1.6vw,24px) 'Space Grotesk','Inter',sans-serif;letter-spacing:-.7px}
.kvn-compare-value small{color:#9db8d8;font:600 10px 'Inter','DM Sans',sans-serif}
.kvn-compare[data-trend="up"] .kvn-compare-value strong{color:#80d5ff}
.kvn-compare[data-trend="down"] .kvn-compare-value strong{color:#b3c5df}
@media(max-width:690px){
 .kvn-compare{padding:15px 0 0;margin-top:18px}
 .kvn-compare-value{align-items:flex-start}
}

/* Polished 2.2s CCU motion system; existing KVN blue palette unchanged. */
.kvn-ccu-card{isolation:isolate}
.kvn-ccu-number-row{display:flex;align-items:center;gap:10px 18px;flex-wrap:wrap;min-width:0}
.metrics .primary .kvn-ccu-number-row #playing{margin:22px 0 8px!important;min-width:var(--kvn-ccu-reserved-width,3.35ch);max-width:100%;white-space:nowrap}
.kvn-ccu-number-row .kvn-ccu-change{
 position:relative;inset:auto;top:auto;right:auto;left:auto;bottom:auto;
 display:inline-flex;align-items:center;gap:6px;
 max-width:100%;margin:8px 0;padding:10px 14px;
 transform:translate3d(0,8px,0) scale(.97);
 white-space:nowrap;overflow:visible;flex:0 0 auto
}
.kvn-ccu-number-row .kvn-ccu-change[hidden]{display:none!important}
.kvn-ccu-change[data-visible="true"]{
 animation:kvnChipFloat 2.2s cubic-bezier(.2,.75,.2,1) both!important;
 transition:none!important
}
@keyframes kvnChipFloat{
 0%{opacity:0;transform:translate3d(0,8px,0) scale(.97)}
 13%{opacity:1;transform:translate3d(0,0,0) scale(1)}
 61%{opacity:1;transform:translate3d(0,-1px,0) scale(1)}
 100%{opacity:0;transform:translate3d(0,-5px,0) scale(.99)}
}
.kvn-roll-slot{position:relative;display:inline-block;overflow:hidden;width:1ch;height:1em;line-height:1;vertical-align:-.03em;white-space:nowrap}
.kvn-roll-track{position:absolute;inset:0 auto auto 0;width:100%;height:2em;display:flex;flex-direction:column;align-items:center;line-height:1}
.kvn-roll-track>span{display:block;width:100%;min-width:0;height:1em;line-height:1em;text-align:center}
.kvn-roll-slot[data-direction="up"] .kvn-roll-track{animation:kvnDigitUp .51s cubic-bezier(.2,.85,.2,1) var(--kvn-roll-delay,0ms) both}
.kvn-roll-slot[data-direction="down"] .kvn-roll-track{animation:kvnDigitDown .51s cubic-bezier(.2,.85,.2,1) var(--kvn-roll-delay,0ms) both}
@keyframes kvnDigitUp{from{transform:translate3d(0,0,0)}to{transform:translate3d(0,-50%,0)}}
@keyframes kvnDigitDown{from{transform:translate3d(0,-50%,0)}to{transform:translate3d(0,0,0)}}
.kvn-ccu-travel{position:absolute;inset:0;border-radius:inherit;padding:2px;z-index:5;pointer-events:none;opacity:0;overflow:hidden;
 -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
 -webkit-mask-composite:xor;mask-composite:exclude
}
.kvn-ccu-travel::before{content:"";position:absolute;inset:-110%;background:conic-gradient(from 0deg,transparent 0deg,transparent 288deg,rgba(92,203,255,.08) 308deg,#91e8ff 325deg,rgba(73,174,255,.2) 338deg,transparent 353deg);transform:rotate(-100deg)}
.kvn-ccu-card[data-motion="down"] .kvn-ccu-travel::before{background:conic-gradient(from 0deg,transparent 0deg,transparent 288deg,rgba(115,153,208,.05) 310deg,#9cb6d9 325deg,rgba(89,133,189,.12) 338deg,transparent 353deg)}
.kvn-ccu-card[data-motion] .kvn-ccu-travel{animation:kvnEdgeOpacity 1.22s ease-out .30s both}
.kvn-ccu-card[data-motion] .kvn-ccu-travel::before{animation:kvnEdgeLap 1s cubic-bezier(.45,.1,.5,1) .33s both}
@keyframes kvnEdgeOpacity{0%{opacity:0}8%{opacity:1}75%{opacity:1}100%{opacity:0}}
@keyframes kvnEdgeLap{from{transform:rotate(-100deg)}to{transform:rotate(260deg)}}
.kvn-ccu-wave{position:absolute;left:30%;top:55%;z-index:1;pointer-events:none;width:360px;height:360px;max-width:85vw;border-radius:50%;transform:translate(-50%,-50%) scale(.18);opacity:0;background:radial-gradient(circle,rgba(69,185,255,.21),rgba(71,148,255,.08) 45%,transparent 70%)}
.kvn-ccu-card[data-motion="down"] .kvn-ccu-wave{background:radial-gradient(circle,rgba(130,161,214,.15),rgba(100,139,205,.06) 45%,transparent 70%)}
.kvn-ccu-card[data-motion="up"] .kvn-ccu-wave{animation:kvnWaveUp .96s ease-out .40s both}
.kvn-ccu-card[data-motion="down"] .kvn-ccu-wave{animation:kvnWaveDown .96s ease-out .44s both}
@keyframes kvnWaveUp{0%{opacity:0;transform:translate(-50%,-50%) scale(.18)}23%{opacity:1}100%{opacity:0;transform:translate(-50%,-50%) scale(1.28)}}
@keyframes kvnWaveDown{0%{opacity:0;transform:translate(-50%,-50%) scale(.18)}23%{opacity:.72}100%{opacity:0;transform:translate(-50%,-50%) scale(1.18)}}
.kvn-ccu-card[data-motion="up"] .kvn-ccu-flash{animation:kvnCcuVisibleRise 1.6s ease-out both!important}
.kvn-ccu-card[data-motion="down"] .kvn-ccu-flash{animation:kvnCcuVisibleFall 1.6s ease-out both!important}
.kvn-ccu-card[data-motion="up"] .kvn-ccu-flash::after{animation:kvnCcuRing 1.6s ease-out both!important}
.kvn-ccu-card[data-motion="down"] .kvn-ccu-flash::after{animation:kvnCcuRingDown 1.6s ease-out both!important}
.kvn-ccu-card[data-motion="up"]{border-color:rgba(89,203,255,.63)!important;box-shadow:0 0 0 1px rgba(74,171,255,.36),0 0 29px rgba(48,131,255,.15)!important}
.kvn-ccu-card[data-motion="down"]{border-color:rgba(133,165,206,.4)!important;box-shadow:0 0 0 1px rgba(130,162,205,.23),0 0 21px rgba(80,112,166,.08)!important}
.kvn-ccu-record{overflow:visible}
.kvn-ccu-record.is-new-peak{animation:kvnPeakAppear 2.6s cubic-bezier(.2,.7,.2,1) both}
.kvn-ccu-record.is-new-peak::before,.kvn-ccu-record.is-new-peak::after{
 content:"";position:absolute;inset:-3px;border-radius:inherit;border:1px solid rgba(117,223,255,.68);pointer-events:none
}
.kvn-ccu-record.is-new-peak::before{animation:kvnPeakRing 1.55s ease-out 0s both}
.kvn-ccu-record.is-new-peak::after{animation:kvnPeakRing 1.55s ease-out .23s both}
@keyframes kvnPeakAppear{0%{opacity:0;transform:translateY(5px)}15%,75%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(-3px)}}
@keyframes kvnPeakRing{0%{opacity:0;transform:scale(1)}18%{opacity:.8}100%{opacity:0;transform:scale(1.12)}}
.primary .sparkline .kvn-spark-head{fill:#c5edff;stroke:#398dff;stroke-width:1.6;vector-effect:non-scaling-stroke;filter:drop-shadow(0 0 3px rgba(105,212,255,.7))}
.sparkline.kvn-spark-new-point .kvn-spark-head{animation:kvnSparkHead 1s ease-out both;transform-box:fill-box;transform-origin:center}
@keyframes kvnSparkHead{0%{opacity:.45;transform:scale(.65)}30%{opacity:1;transform:scale(1.48)}100%{opacity:1;transform:scale(1)}}
@media(max-width:690px){
 .metrics .primary .kvn-ccu-number-row #playing{margin:14px 0 6px!important}
 .kvn-ccu-number-row{gap:6px 11px;align-items:center}
 .kvn-ccu-number-row .kvn-ccu-change{font-size:13px;padding:7px 9px;margin:4px 0}
 .kvn-ccu-travel{padding:1.5px}
 .kvn-ccu-wave{width:260px;height:260px}
}
@media(prefers-reduced-motion:reduce){
 .kvn-roll-slot .kvn-roll-track,.kvn-ccu-card[data-motion] .kvn-ccu-travel,
 .kvn-ccu-card[data-motion] .kvn-ccu-travel::before,
 .kvn-ccu-card[data-motion] .kvn-ccu-wave,
 .kvn-ccu-record.is-new-peak,.kvn-ccu-record.is-new-peak::before,.kvn-ccu-record.is-new-peak::after,
 .sparkline.kvn-spark-new-point .kvn-spark-head{animation:none!important}
 .kvn-ccu-change[data-visible="true"]{animation:none!important;opacity:1!important;transform:none!important}
}

/* Unified low-cost hover, independent of the event-driven CCU motion state. */
@media(hover:hover) and (pointer:fine){
 .metrics .card:not(.primary):hover,.metrics .primary:hover{
  transform:translateY(-2px)!important;transition:transform .22s cubic-bezier(.2,.85,.2,1),border-color .22s ease
 }
}
@media(prefers-reduced-motion:reduce){.metrics .card:hover{transform:none!important}}

/* Dashboard hierarchy & responsive glass polish — existing KVN blue tokens. */
.metrics{min-width:0;align-items:stretch}
.metrics>.card{
 background:linear-gradient(151deg,rgba(24,52,101,.91) 0%,rgba(12,30,65,.94) 47%,rgba(8,19,44,.98) 100%);
 border:1px solid rgba(117,169,238,.26);
 border-radius:21px;
 box-shadow:inset 0 1px 0 rgba(220,240,255,.065),0 15px 43px rgba(0,11,40,.23);
 transition:transform .32s cubic-bezier(.22,1,.36,1),border-color .32s ease,box-shadow .32s ease
}
.metrics>.card:not(.primary):hover{
 transform:translate3d(0,-2px,0)!important;
 border-color:rgba(124,199,255,.47);
 box-shadow:inset 0 1px 0 rgba(215,238,255,.09),0 20px 42px rgba(0,12,40,.32)
}
.metrics>.card>.card-content{min-width:0}
.metrics>.card:not(.primary) .number{margin-top:21px;font-size:clamp(26px,2.7vw,44px);letter-spacing:-.055em;font-weight:750}
.metrics>.card .metric-label{line-height:1.45;letter-spacing:.095em}
.metrics>.card .metric-info{max-width:42ch;line-height:1.6}
.metrics>.primary{
 background:radial-gradient(ellipse at 76% 73%,rgba(38,115,239,.25),transparent 67%),linear-gradient(145deg,#143467,#0c2453 48%,#081a3b);
 border-color:rgba(92,176,255,.41);
 box-shadow:inset 0 1px 0 rgba(192,225,255,.14),0 24px 65px rgba(4,23,64,.26)
}
.metrics>.primary .card-content{padding:clamp(25px,3vw,44px);padding-bottom:55px}
.metrics>.primary .number{font-size:clamp(92px,8.4vw,150px);letter-spacing:-.065em}
.metrics>.primary .metric-info{font-size:13px;letter-spacing:.005em}
.metrics>.primary .kvn-ccu-status-line{margin-top:24px}
.metrics>.primary .metric-bottom{border-top-color:rgba(119,184,255,.21);color:#adc8ec}
.kvn-hero-inline-live{display:none;align-items:center;flex-wrap:wrap;gap:9px;border:1px solid rgba(99,181,255,.29);background:rgba(13,40,86,.66);border-radius:12px;padding:11px 14px;width:max-content;max-width:100%;margin-top:18px;font:750 10px 'Inter',sans-serif;color:#9ac8f7;letter-spacing:.075em}
.kvn-hero-inline-live strong{font:800 22px 'Space Grotesk','Inter',sans-serif;color:#eaf8ff;font-variant-numeric:tabular-nums;letter-spacing:-.04em}
.kvn-hero-inline-live small{font:600 10px 'Inter',sans-serif;color:#8da9d1;letter-spacing:0}
.kvn-hero-live-dot{display:inline-block;flex:0 0 auto;width:7px;height:7px;border-radius:50%;background:#52bfff;box-shadow:0 0 0 4px rgba(65,167,255,.12)}
.hero .visual .hero-poster{
 border:1px solid rgba(155,212,255,.38);
 box-shadow:0 35px 75px rgba(0,11,45,.7),0 0 54px rgba(34,103,225,.18),inset 0 1px 0 rgba(255,255,255,.16)
}
.hero .hero-poster img{transition:transform .45s cubic-bezier(.22,1,.36,1),filter .45s ease;filter:saturate(1.06)}
@media(hover:hover) and (pointer:fine){
 .hero .hero-poster:hover img{transform:scale(1.04);filter:saturate(1.16)}
}
.chart-panel{background:linear-gradient(150deg,rgba(15,38,79,.96),rgba(7,20,45,.98));border-color:rgba(105,172,245,.24);box-shadow:inset 0 1px rgba(205,232,255,.06),0 20px 55px rgba(1,10,35,.23)}
.chart-panel .chart-wrap{border-color:rgba(92,158,239,.35);box-shadow:inset 0 1px rgba(201,229,255,.05)}
.chart-panel #shade{opacity:.82}
.chart-panel #curve{stroke-width:3;filter:drop-shadow(0 0 5px rgba(68,172,255,.36))}
.chart-panel #point{filter:drop-shadow(0 0 5px rgba(90,206,255,.5))}
.chart-panel #tooltip{box-shadow:0 12px 37px rgba(2,15,49,.54),0 0 0 1px rgba(110,185,255,.1)}
@media(min-width:1200px){
 .metrics{grid-template-columns:repeat(5,minmax(0,1fr));gap:17px;grid-auto-rows:minmax(170px,auto)}
 .metrics>.primary{grid-column:span 3;grid-row:span 2;min-height:390px}
 .metrics>.card:not(.primary){grid-column:span 1;min-height:168px}
 .metrics>.primary .sparkline{width:57%;max-width:425px;height:58px}
}
@media(min-width:691px) and (max-width:1199px){
 .metrics{grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
 .metrics>.primary{grid-column:span 2;grid-row:auto;min-height:340px}
 .metrics>.card:not(.primary){grid-column:span 1;min-height:145px}
 .metrics>.primary .number{font-size:clamp(90px,11vw,140px)}
 .metrics>.primary .sparkline{width:70%;max-width:420px;height:48px}
}
@media(max-width:690px){
 .metrics{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
 .metrics>.primary{grid-column:span 2;grid-row:auto;min-height:315px}
 .metrics>.card:not(.primary){grid-column:span 1;min-height:150px}
 .metrics>.card:not(.primary) .card-content{padding:17px}
 .metrics>.card:not(.primary) .number{font-size:clamp(25px,7vw,39px);margin-top:20px;white-space:normal;overflow-wrap:anywhere}
 .metrics>.card:not(.primary) .metric-label{font-size:9px;letter-spacing:.06em}
 .metrics>.card:not(.primary) .metric-info{font-size:11px}
 .metrics>.primary .card-content{padding:25px;padding-bottom:52px}
 .metrics>.primary .number{font-size:clamp(70px,17vw,104px)}
 .kvn-hero-inline-live{display:inline-flex}
 .hero .visual .hero-poster{box-shadow:0 18px 40px rgba(0,11,45,.65),0 0 24px rgba(34,103,225,.15)}
 .chart-panel #curve{stroke-width:2.6}
}
@media(max-width:390px){
 .metrics>.card:not(.primary) .card-content{padding:14px}
 .metrics>.card:not(.primary) .number{font-size:clamp(23px,6.6vw,32px)}
 .metrics>.primary .card-content{padding:22px;padding-bottom:53px}
 .kvn-hero-inline-live{gap:7px;padding:9px 11px}
 .kvn-hero-inline-live small{font-size:9px}
}
@media(prefers-reduced-motion:reduce){
 .metrics>.card,.hero .hero-poster img{transition:none!important}
 .hero .hero-poster:hover img{transform:none}
}

/* Resilient, non-blocking data recovery affordance, native KVN blue. */
.updated{display:flex;align-items:center;flex-wrap:wrap;gap:8px 12px}
.kvn-stats-retry{appearance:none;display:inline-flex;align-items:center;justify-content:center;
 border:1px solid rgba(108,187,255,.44);border-radius:9px;padding:8px 11px;
 color:#c7e9ff;background:rgba(33,107,205,.17);
 font:750 10px 'Inter',system-ui,sans-serif;letter-spacing:.015em;
 cursor:pointer;white-space:nowrap;
 transition:border-color .22s ease,background .22s ease,transform .22s ease
}
.kvn-stats-retry[hidden]{display:none!important}
.kvn-stats-retry:not(:disabled):hover{background:rgba(46,132,239,.26);border-color:rgba(110,205,255,.78);transform:translateY(-1px)}
.kvn-stats-retry:focus-visible{outline:2px solid #7ac7ff;outline-offset:3px}
.kvn-stats-retry:disabled{opacity:.65;cursor:wait}
@media(prefers-reduced-motion:reduce){.kvn-stats-retry{transition:none}.kvn-stats-retry:hover{transform:none}}

/* KVN Studios brand match (verified public reference, 2026-11-23).
   Archivo + Outfit, charcoal navy #080e1c, #31aaff brand blue, #ff2997
   as a *restrained* secondary accent. No gameplay/API changes. */
:root{--kvn-reference-bg:#080e1c;--kvn-reference-panel:#101d31;
 --kvn-reference-blue:#31aaff;--kvn-reference-cyan:#43c4ff;
 --kvn-reference-pink:#ff2997;--kvn-reference-text:#f3f4f6;
 --kvn-reference-muted:#9b9ea7}
body{background:var(--kvn-reference-bg);color:var(--kvn-reference-text);
 font-family:'Outfit',Arial,sans-serif}
button,input,select,textarea{font-family:'Outfit',Arial,sans-serif}
h1,h2,h3,.number,.wordmark,.bar h2,.detail .value,
.official-card strong,.kvn-insight-card .k-value{
 font-family:'Archivo','Outfit',Arial,sans-serif!important;font-synthesis:none
}
.hero .hero-copy h1{
 font-family:'Archivo','Outfit',Arial,sans-serif!important;
 font-size:clamp(48px,7.15vw,116px)!important;font-weight:900!important;
 line-height:1.08!important;letter-spacing:-.046em!important;
 max-width:100%;overflow:visible!important;
 padding:.05em .11em .12em 0;margin-block:25px 24px
}
.hero h1 .kvn-hero-line{
 box-sizing:border-box;display:block;width:max-content;max-width:100%;
 line-height:1.1!important;white-space:nowrap;
 overflow:visible!important;
 padding:.04em .20em .11em .02em
}
.hero h1 .kvn-line-two{
 background:none!important;color:#31aaff!important;
 -webkit-text-fill-color:#31aaff!important
}
.hero .eyebrow{color:#82d1ff}
.hero .eyebrow::after{content:"";width:5px;height:5px;flex:0 0 5px;
 background:#ff2997;border-radius:50%;box-shadow:0 0 12px rgba(255,41,151,.42)}
.hero .lead,.desc,.official-sub{color:#b9bbc2}
.navlinks,.tabs{border-color:rgba(176,204,234,.16);
 background:rgba(8,14,28,.76)}
.navlinks a,.tabs button,.metric-switch button,.switches button{font-family:'Outfit',Arial,sans-serif}
.navlinks a:hover,.navlinks a:focus-visible{background:rgba(49,170,255,.12)}
.playbtn{background:linear-gradient(115deg,#238dff 0%,#31aaff 100%);
 border-color:rgba(97,202,255,.50);color:#f3f4f6}
.playbtn:hover{box-shadow:0 0 24px rgba(49,170,255,.22),0 12px 25px rgba(3,9,25,.35)}
.metrics>.card:not(.primary){
 background:linear-gradient(145deg,#11213b 0%,#0c172a 56%,#091220 100%);
 border-color:rgba(117,171,226,.22)
}
.metrics>.primary{
 background:radial-gradient(ellipse at 78% 67%,rgba(49,170,255,.14),transparent 68%),
 linear-gradient(141deg,#142943 0%,#0c1c35 51%,#091422 100%);
 border-color:rgba(83,177,255,.36)
}
.chart-panel,.official-card,.kvn-insight-card,.kvn-insight-banner,
.official-message{background-color:#101d31;border-color:rgba(107,163,221,.22)}
.chart-panel #curve{stroke:#31aaff}
.chart-panel #point{stroke:#218cff;fill:#b2e9ff}
.chart-panel #tooltip{border-color:rgba(67,196,255,.48);background:rgba(9,23,43,.96)}
.bar h2 span,.wordmark b,.footer-brand b{color:#31aaff!important}
.kvn-stats-retry,.kvn-retry-btn{color:#caeaff;border-color:rgba(49,170,255,.55)}
@media(max-width:1100px){
 .hero .hero-copy h1{font-size:clamp(46px,6.6vw,90px)!important}
}
@media(max-width:690px){
 .hero .hero-copy h1{font-size:clamp(45px,11.4vw,75px)!important;
  letter-spacing:-.048em!important;padding-right:.03em}
 .hero h1 .kvn-hero-line{padding-right:.16em}
 .hero .eyebrow::after{width:4px;height:4px;flex-basis:4px}
}
@media(max-width:390px){
 .hero .hero-copy h1{font-size:clamp(43px,11.6vw,57px)!important}
}
@media(prefers-reduced-motion:reduce){
 .hero .eyebrow::after{box-shadow:none}
}

`;
export const liveIntelligenceJS = String.raw`
/* Event-driven CCU presentation: never alters or estimates Roblox data. */
(()=>{
'use strict';
const card=document.querySelector('.metrics .primary');
const player=document.getElementById('playing');
if(!card||!player)return;
card.classList.add('kvn-ccu-card');
const label=card.querySelector('.label-row');
const line=document.createElement('div');line.className='kvn-ccu-status-line';
const status=document.createElement('span');status.className='kvn-ccu-state';status.dataset.state='loading';
const dot=document.createElement('i');dot.className='kvn-ccu-dot';dot.setAttribute('aria-hidden','true');
const wording=document.createElement('span');wording.textContent='CONNECTING TO ROBLOX';
status.append(dot,wording);
const delta=document.createElement('span');delta.className='kvn-ccu-delta';delta.dataset.direction='none';delta.textContent='AWAITING VERIFIED DATA';
line.append(status,delta);
if(label)label.after(line);
else card.querySelector('.card-content')?.prepend(line);
const record=document.createElement('div');record.className='kvn-ccu-record';record.hidden=true;
record.textContent='✦ NEW 24H PEAK';
const description=card.querySelector('.metric-info');
if(description)description.after(record);
else card.querySelector('.card-content')?.append(record);
const freshness=document.createElement('div');freshness.className='kvn-ccu-freshness';
freshness.setAttribute('aria-live','off');freshness.textContent='Waiting for a verified Roblox measurement';
record.after(freshness);
const flash=document.createElement('div');flash.className='kvn-ccu-flash';
flash.setAttribute('aria-hidden','true');card.prepend(flash);
const travel=document.createElement('div');travel.className='kvn-ccu-travel';
travel.setAttribute('aria-hidden','true');card.prepend(travel);
const wave=document.createElement('div');wave.className='kvn-ccu-wave';
wave.setAttribute('aria-hidden','true');card.prepend(wave);
const changeChip=document.createElement('span');
changeChip.className='kvn-ccu-change';changeChip.hidden=true;
changeChip.setAttribute('role','status');changeChip.setAttribute('aria-live','polite');
changeChip.setAttribute('aria-label','Verified concurrent player count change');
// This row wraps on small screens, so the floating badge cannot cover digits.
const numberRow=document.createElement('div');numberRow.className='kvn-ccu-number-row';
player.before(numberRow);
numberRow.append(player,changeChip);
let changeChipTimer=null;
function hideChip(){
  if(changeChipTimer){clearTimeout(changeChipTimer);changeChipTimer=null;}
  changeChip.removeAttribute('data-visible');
  changeChip.hidden=true;
}
function revealChip(diff,context='live'){
  if(!Number.isFinite(diff)||diff===0)return;
  if(changeChipTimer){clearTimeout(changeChipTimer);changeChipTimer=null;}
  const trend=diff>0?'up':'down';
  changeChip.dataset.direction=trend;
  changeChip.textContent=(diff>0?'+':'−')+Math.abs(diff).toLocaleString('en-US')+' ';
  const small=document.createElement('small');small.textContent='CCU';
  changeChip.append(small);
  changeChip.title=context==='return'?
    'Net CCU change since your last visible verified measurement':
    'Net CCU change since the previous verified sample';
  changeChip.hidden=false;
  // Re-arm the actual CSS entrance on every new verified change.
  changeChip.removeAttribute('data-visible');
  void changeChip.offsetWidth;
  changeChip.dataset.visible='true';
  changeChipTimer=setTimeout(hideChip,2200);
}
let movementTimer=null;
let peakTimer=null;
function hidePeak(){
  if(peakTimer){clearTimeout(peakTimer);peakTimer=null;}
  record.classList.remove('is-new-peak');
  record.hidden=true;
}
function revealPeak(){
  hidePeak();
  record.hidden=false;
  void record.offsetWidth; // Runs only after a newly VERIFIED high.
  record.classList.add('is-new-peak');
  peakTimer=setTimeout(hidePeak,2600);
}
function setState(name,text){status.dataset.state=name;wording.textContent=text;}
function updateTime(stamp,cached){
  if(!Number.isFinite(stamp))return;
  const when=new Date(stamp).toLocaleString('en-GB',{dateStyle:'medium',timeStyle:'short'});
  freshness.textContent=(cached?'Last verified (cached): ':'Last verified: ')+when;
  freshness.title='Timestamp returned with the latest actual Roblox measurement';
}
function clearMovement(){
  if(movementTimer){clearTimeout(movementTimer);movementTimer=null;}
  card.removeAttribute('data-motion');
}
function showMotion(direction){
  clearMovement();
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  void card.offsetWidth; // Only once per verified CCU change.
  card.dataset.motion=direction;
  movementTimer=setTimeout(clearMovement,1600);
}
window.addEventListener('kvn:verified-stats',event=>{
  const info=event.detail||{},d=info.stats;
  if(!d||!Number.isFinite(d.playing)){
    setState('unavailable','METRIC UNAVAILABLE');
    delta.textContent='NO VERIFIED PLAYER COUNT';
    delta.dataset.direction='none';hidePeak();
    clearMovement();hideChip();return;
  }
  const fresh=!d.stale&&Number.isFinite(d.timestamp);
  updateTime(d.timestamp,!fresh);
  setState(fresh?'live':'cached',fresh?'AUTO UPDATING · VERIFIED':'CACHED · NOT LIVE');
  // Never claim a trend between identical timestamps or stale responses.
  const previous=info.previous;
  // A comparison requires two distinct FRESH Roblox measurements.
  // Never derive a motion direction from cached or stale fallback values.
  const priorValue=previous&&!previous.stale&&Number.isFinite(previous.playing)
    && Number.isFinite(previous.timestamp)&&previous.timestamp<d.timestamp
    ?previous.playing:null;
  if(fresh&&Number.isFinite(priorValue)){
    const diff=d.playing-priorValue;
    delta.dataset.direction=diff>0?'up':diff<0?'down':'flat';
    delta.textContent=diff===0?'PLAYER COUNT UNCHANGED':
      info.context==='return'?'SINCE LAST VISIT':
      'SINCE PREVIOUS SAMPLE';
    if(diff!==0){
      showMotion(diff>0?'up':'down');
      revealChip(diff,info.context==='return'?'return':'live');
    }else{
      clearMovement();
      hideChip();
    }
  }else{
    delta.dataset.direction='none';
    delta.textContent=fresh?'AWAITING NEXT VERIFIED SAMPLE':'NO LIVE TREND';
    clearMovement();
    hideChip();
  }
  // "NEW 24H PEAK" must mean something: require ~22 hours of VERIFIED
  // observations, at least 40 actual samples and no >90min measurement gaps.
  // This suppresses false records when D1 has only just been connected.
  const history=(Array.isArray(info.history)?info.history:[]).filter(p=>
    p&&Number.isFinite(p.t)&&Number.isFinite(p.ccu)&&p.ccu>=0
    &&p.t<d.timestamp-45000&&p.t>=d.timestamp-86400000
  ).sort((a,b)=>a.t-b.t);
  const duration=history.length>1?history[history.length-1].t-history[0].t:0;
  let maxGap=0;
  for(let i=1;i<history.length;i++)maxGap=Math.max(maxGap,history[i].t-history[i-1].t);
  const coverage=history.length>=40&&duration>=22*3600000
    &&maxGap<=90*60000 && history[history.length-1].t>=d.timestamp-60*60000;
  const isPeak=fresh&&Number.isFinite(priorValue)&&d.playing>priorValue
    &&coverage&&d.playing>Math.max(...history.map(p=>p.ccu));
  if(isPeak){
    record.title='Highest measured concurrent-player count within the last 24 hours, with verified history coverage';
    revealPeak();
  }else if(!peakTimer){
    record.hidden=true;
  } 
});
window.addEventListener('kvn:stats-unavailable',event=>{
  setState('unavailable','REFRESH DELAYED');
  delta.dataset.direction='none';
  delta.textContent=event.detail?.hasPrevious?'LAST VERIFIED SAMPLE':'RETRYING ROBLOX API';
  hidePeak();clearMovement();hideChip();
});
// Background tabs may be throttled; end stale visual sequences, never data.
document.addEventListener('visibilitychange',()=>{
  if(document.hidden){clearMovement();hideChip();hidePeak();}
});
const chartPanel=document.querySelector('.chart-panel');
if(chartPanel){
  const compare=document.createElement('section');compare.className='kvn-compare';
  compare.setAttribute('aria-label','Historical CCU comparison');
  const left=document.createElement('div');left.className='kvn-compare-left';
  const heading=document.createElement('span');heading.className='kvn-compare-title';
  heading.textContent='VERIFIED CCU · PERIOD COMPARISON';
  const explainer=document.createElement('span');explainer.className='kvn-compare-description';
  explainer.textContent='Connect Cloudflare D1 to compare complete measured periods.';
  left.append(heading,explainer);
  const right=document.createElement('div');right.className='kvn-compare-value';
  const change=document.createElement('strong');change.textContent='—';
  const previous=document.createElement('small');previous.textContent='REAL MEASUREMENTS ONLY';
  right.append(change,previous);compare.append(left,right);
  const foot=chartPanel.querySelector('.chart-foot');
  if(foot)foot.after(compare);else chartPanel.append(compare);
  window.addEventListener('kvn:history-loaded',event=>{
    const data=event.detail||{},comparison=data.comparison||{},range=(data.range||'24h').toUpperCase();
    compare.dataset.trend='none';
    heading.textContent='AVERAGE SAMPLED CCU · '+range+' VS PREVIOUS '+range;
    if(comparison.state==='ready'&&Number.isFinite(comparison.current)&&Number.isFinite(comparison.previous)){
      const current=comparison.current,prior=comparison.previous,diff=current-prior;
      const symbol=diff>0?'+':diff<0?'−':'';
      const abs=Math.abs(diff).toLocaleString('en-US',{maximumFractionDigits:1});
      change.textContent=symbol+abs+' PLAYERS';
      compare.dataset.trend=diff>0?'up':diff<0?'down':'flat';
      previous.textContent='PREVIOUS '+range+': '+prior.toLocaleString('en-US',{maximumFractionDigits:1})+' AVG CCU';
      explainer.textContent='Current average: '+current.toLocaleString('en-US',{maximumFractionDigits:1})+
        ' concurrent players · verified 5-minute samples, not DAU.';
    }else{
      change.textContent='—';
      previous.textContent='NO ESTIMATES';
      explainer.textContent=data.error?'History is temporarily unavailable.':
        (!data.cloud?'Connect Cloudflare D1 to compare full periods.':
        'Waiting for sufficient real measurements across both full periods.');
    }
  });
}

})();
`;
