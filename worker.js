import { publicAnalyticsResponse, publicAnalyticsStyles, publicAnalyticsMarkup, publicAnalyticsClient } from './public-analytics.js';
import { premiumCSS } from './premium-theme.js';
import { premiumJS } from './premium-interactions.js';
/* TRENDING EMOTES — one-file Cloudflare Worker. Optional D1 binding: DB.
   Optional cron expression: every five minutes (collects without visitors).
   Place ID: 134944031090971. No API keys required for public metrics.
*/
const PLACE_ID = '134944031090971';
const GAME_URL = 'https://www.roblox.com/games/' + PLACE_ID + '/';
let cachedUniverse = null;
const API_HEADERS = { 'Accept': 'application/json' };
async function getJSON(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 9000);
  try {
    const r = await fetch(url, { headers: API_HEADERS, signal: ctrl.signal });
    if (!r.ok) throw new Error('Roblox API HTTP ' + r.status);
    return await r.json();
  } finally { clearTimeout(timer); }
}
async function fetchStats() {
  if (!cachedUniverse) {
    const id = await getJSON('https://apis.roblox.com/universes/v1/places/' + PLACE_ID + '/universe');
    if (!id.universeId) throw new Error('Universe ID niet gevonden');
    cachedUniverse = id.universeId;
  }
  const u = cachedUniverse;
  const endpoints = [
    'https://games.roblox.com/v1/games?universeIds=' + u,
    'https://games.roblox.com/v1/games/votes?universeIds=' + u,
    'https://thumbnails.roblox.com/v1/games/icons?universeIds=' + u + '&size=512x512&format=Png&isCircular=false',
    'https://thumbnails.roblox.com/v1/games/multiget/thumbnails?universeIds=' + u + '&countPerUniverse=1&defaults=true&size=768x432&format=Png&isCircular=false'
  ];
  const result = await Promise.allSettled(endpoints.map(getJSON));
  const data = n => result[n].status === 'fulfilled' ? result[n].value : {};
  const g = data(0).data?.[0];
  if (!g) throw new Error('Geen gamegegevens van Roblox');
  const v = data(1).data?.[0] || {};
  const likes = Number.isFinite(v.upVotes) ? v.upVotes : null;
  const dislikes = Number.isFinite(v.downVotes) ? v.downVotes : null;
  const total = (likes ?? 0) + (dislikes ?? 0);
  const imageSets = data(3).data || [];
  const image = imageSets[0]?.thumbnails?.find?.(x => x.imageUrl)?.imageUrl || null;
  return {
    source: 'Roblox public API', placeId: PLACE_ID, universeId: u,
    name: g.name || 'TRENDING EMOTES!', playing: g.playing ?? null,
    visits: g.visits ?? null, favorites: g.favoritedCount ?? null,
    likes, dislikes, rating: total ? (likes / total) * 100 : null,
    created: g.created || null, updated: g.updated || null,
    icon: data(2).data?.[0]?.imageUrl || null,
    thumbnail: image, timestamp: Date.now()
  };
}
async function ensureDB(db) {
  if (!db) return;
  await db.prepare('CREATE TABLE IF NOT EXISTS samples (t INTEGER PRIMARY KEY, ccu INTEGER, visits INTEGER, favorites INTEGER, likes INTEGER, dislikes INTEGER)').run();
}
async function record(db, s) {
  if (!db || !Number.isFinite(s.playing)) return;
  await ensureDB(db);
  const t = Math.floor(Date.now() / 300000) * 300000;
  await db.prepare('INSERT OR IGNORE INTO samples (t,ccu,visits,favorites,likes,dislikes) VALUES (?,?,?,?,?,?)')
    .bind(t, s.playing, s.visits, s.favorites, s.likes, s.dislikes).run();
}
async function history(db, range) {
  if (!db) return { storage: 'browser', points: [] };
  await ensureDB(db);
  const durations = { '1h': 3600000, '24h': 86400000, '7d': 7*86400000, '30d': 30*86400000 };
  const duration = durations[range] || durations['24h'];
  const since = Date.now() - duration;
  const bucket = Math.max(300000, Math.ceil(duration / 170 / 300000) * 300000);
  const sql = 'SELECT MIN(t) t, ROUND(AVG(ccu)) ccu, MAX(visits) visits, MAX(favorites) favorites, MAX(likes) likes, MAX(dislikes) dislikes FROM samples WHERE t>=? GROUP BY CAST(t / ? AS INTEGER) ORDER BY t ASC LIMIT 180';
  const res = await db.prepare(sql).bind(since, bucket).all();
  return { storage:'cloud', points: res.results || [] };
}
const HTML = String.raw`<!doctype html>
<html lang="nl"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#080a08"><meta name="description" content="Live Roblox analytics voor TRENDING EMOTES! door KVN STUDIOS.">
<title>TRENDING EMOTES! — KVN STUDIOS / Analytics</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{--bg:#080a08;--surface:#101410;--surface2:#131914;--line:#263127;--green:#b6ff69;--soft:#d9ecce;--muted:#8a9b8b;--white:#f4f9f0;--danger:#ffad83}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--bg);color:var(--white);font:14px 'DM Sans',system-ui,sans-serif;overflow-x:hidden}a{color:inherit;text-decoration:none}button{font:inherit;cursor:pointer}h1,h2,h3,p{margin:0}h1,h2,h3,.number,.wordmark{font-family:'Space Grotesk',sans-serif}
::selection{background:var(--green);color:#071007}.noise{pointer-events:none;position:fixed;inset:0;z-index:80;opacity:.035;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E")}
.wrap{max-width:1370px;padding:0 42px;margin:auto}.top{position:sticky;top:0;z-index:60;background:rgba(8,10,8,.82);backdrop-filter:blur(18px);border-bottom:1px solid #ffffff12}.nav{height:78px;display:flex;justify-content:space-between;align-items:center;gap:20px}.wordmark{font-weight:700;font-size:18px;letter-spacing:-.9px}.wordmark b{color:var(--green)}.slash{color:#5b685b;margin:0 18px;font-weight:300}.wordmark small{font-size:10px;color:#a8b4a8;letter-spacing:1.7px;font-family:'DM Sans';font-weight:800}
.navlinks{display:flex;gap:28px;color:#bac4b9;font-size:12px;font-weight:700}.navlinks a:hover{color:var(--green)}.nav-right{display:flex;gap:14px;align-items:center}.livepill{border:1px solid #3d563c;border-radius:50px;padding:10px 15px;color:var(--green);font-size:10px;font-weight:800;letter-spacing:1.3px;white-space:nowrap}.pulse{display:inline-block;width:7px;height:7px;background:var(--green);border-radius:50%;box-shadow:0 0 0 6px #b6ff6913;animation:pulse 2s ease-in-out infinite;margin-right:10px}.playbtn{display:inline-flex;align-items:center;gap:9px;background:var(--green);border:1px solid var(--green);color:#0c1908;border-radius:8px;padding:12px 18px;font-size:11px;font-weight:800;transition:transform .25s,box-shadow .25s}.playbtn:hover{transform:translateY(-3px);box-shadow:0 12px 32px #b6ff6930}
.hero{position:relative;min-height:510px;display:grid;grid-template-columns:1.15fr .85fr;align-items:center;gap:30px;overflow:hidden;padding-top:48px;padding-bottom:60px}.hero:before{content:'';position:absolute;inset:-140px -190px -200px 34%;background:radial-gradient(ellipse at 65% 40%,#7bd64227,transparent 57%);z-index:-1}.eyebrow{color:var(--green);font-size:11px;font-weight:800;letter-spacing:3px;text-transform:uppercase;display:flex;align-items:center;gap:13px}.eyebrow:before{content:'';width:29px;height:1px;background:var(--green)}h1{font-weight:700;font-size:clamp(66px,7vw,115px);line-height:.89;letter-spacing:-7px;margin:32px 0 28px}h1 span{color:var(--green)}.lead{max-width:540px;color:#abbbaa;font-size:15px;line-height:1.8}.hero-actions{display:flex;gap:13px;align-items:center;margin-top:30px;flex-wrap:wrap}.outlinebtn{display:inline-block;border:1px solid #526251;padding:13px 20px;border-radius:8px;font-size:11px;font-weight:800;transition:border .2s,background .2s}.outlinebtn:hover{background:#1a2619;border-color:var(--green)}.tiny{color:var(--muted);font-size:11px}
.visual{height:350px;position:relative;display:grid;place-items:center;perspective:800px}.orbit{position:absolute;border:1px solid #93fa7e33;border-radius:50%;width:305px;height:305px;transform:rotate(-24deg) scaleX(1.1);animation:orbit 20s linear infinite}.orbit:nth-child(2){width:390px;height:160px;transform:rotate(31deg);animation-direction:reverse;animation-duration:16s}.halo{position:absolute;width:260px;height:260px;background:#9cf56e4d;filter:blur(80px);border-radius:50%;animation:breathe 5s ease-in-out infinite}.hero-poster{position:relative;border:1px solid #b6ff6970;width:255px;height:255px;border-radius:42px;background:linear-gradient(145deg,#152518,#233c1e);box-shadow:0 40px 120px #a4ff6928,0 0 0 20px #b6ff690b;transform:rotate(-7deg);animation:float 5s ease-in-out infinite;overflow:hidden}.hero-poster img{width:100%;height:100%;object-fit:cover}.hero-poster .fallback{position:absolute;inset:0;display:grid;place-items:center;font:700 68px 'Space Grotesk';color:var(--green)}.floatbadge{position:absolute;right:1%;top:14%;background:#151f16eb;border:1px solid #476246;border-radius:14px;padding:14px 18px;font-size:10px;font-weight:800;letter-spacing:1px;box-shadow:0 20px 60px #0008;animation:float 6s -2s ease-in-out infinite}.floatbadge strong{display:block;font:700 32px 'Space Grotesk';color:var(--green);letter-spacing:-1px;margin-top:7px}.floatbadge .small{font-size:9px;color:var(--muted)}.spark{position:absolute;color:var(--green);font-size:28px;animation:twinkle 2.6s ease-in-out infinite}.sp1{top:10%;left:11%}.sp2{bottom:17%;right:8%;animation-delay:1s}
.ticker{border-block:1px solid var(--line);background:#0c100c;overflow:hidden}.ticker-inner{display:flex;gap:45px;white-space:nowrap;width:max-content;animation:marquee 30s linear infinite;padding:17px 0;color:#899788;font-size:11px;letter-spacing:2.4px;font-weight:800}.ticker-inner strong{color:var(--green)}
.bar{display:flex;align-items:end;justify-content:space-between;gap:16px;margin:58px 0 23px}.sec-label{color:var(--green);letter-spacing:2px;font-size:10px;font-weight:800}.bar h2{font-size:clamp(31px,3vw,47px);letter-spacing:-2px;margin-top:12px}.desc{color:var(--muted);font-size:12px;line-height:1.65}.updated{border:1px solid var(--line);background:#111811;border-radius:10px;padding:13px 16px;font-size:11px;color:#b8c7b7;display:flex;gap:10px;align-items:center}.updated svg{color:var(--green)}
.metrics{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}.card{position:relative;background:linear-gradient(150deg,#161d16,#101510 72%);border:1px solid #283629;border-radius:16px;min-width:0;overflow:hidden;transition:transform .3s,border-color .3s,box-shadow .3s}.card:hover{transform:translateY(-4px);border-color:#759f54;box-shadow:0 22px 45px #0008}.card:before{content:'';position:absolute;pointer-events:none;inset:0;opacity:0;background:radial-gradient(400px circle at var(--mouse-x,50%) var(--mouse-y,30%),#b6ff6912,transparent 45%);transition:opacity .2s}.card:hover:before{opacity:1}.card-content{position:relative;padding:24px}.primary{grid-column:span 2;grid-row:span 2;min-height:345px;background:radial-gradient(circle at 88% 88%,#38632850,transparent 57%),linear-gradient(150deg,#1c2a1d,#101610 70%)}.label-row{display:flex;justify-content:space-between;align-items:center;gap:12px}.metric-label{color:#b2c2b0;font-size:11px;font-weight:800;letter-spacing:1.4px}.corner{font-size:18px;color:var(--green)}.number{font-size:clamp(31px,3.3vw,52px);font-weight:700;letter-spacing:-2px;margin-top:31px;white-space:nowrap}.primary .number{font-size:clamp(88px,9vw,137px);letter-spacing:-8px;color:var(--green);margin:52px 0 12px;text-shadow:0 0 70px #b6ff6930}.primary .card-content{padding:31px}.metric-info{font-size:12px;color:var(--muted);line-height:1.6;margin-top:7px}.metric-bottom{position:absolute;left:30px;right:30px;bottom:25px;display:flex;justify-content:space-between;gap:10px;border-top:1px solid #436141;padding-top:18px;color:#a9c7a1;font-size:11px}.positive{color:var(--green)}.dim{color:#8ca18b}.dots{display:flex;gap:4px;align-items:center}.dots i{width:5px;height:5px;border-radius:3px;background:#81a46c}.dots i:nth-child(2){height:12px}.dots i:nth-child(3){height:8px}.dots i:nth-child(4){height:18px}.dots i:nth-child(5){height:10px}
.workspace{display:grid;grid-template-columns:1.8fr 1fr;gap:16px;margin-top:16px}.chart-panel{padding:27px}.panel-head{display:flex;justify-content:space-between;gap:15px;align-items:center;flex-wrap:wrap}.panel-head h3{font-size:24px;letter-spacing:-1px;margin-top:8px}.switches{display:flex;gap:4px;padding:5px;border:1px solid var(--line);border-radius:9px;background:#080c08;flex-wrap:wrap}.switches button{border:0;background:transparent;color:#91a18f;border-radius:6px;padding:8px 12px;font-size:10px;font-weight:800;transition:background .25s,color .25s}.switches button.active{background:#b6ff69;color:#11200c}.metric-switch{display:flex;gap:8px;flex-wrap:wrap;margin:24px 0 20px}.metric-switch button{background:#161f16;border:1px solid #2d3b2e;border-radius:50px;color:#b1c0b0;padding:9px 15px;font-size:11px;font-weight:700;transition:.25s}.metric-switch button.active{color:var(--green);border-color:#83af59;background:#1e2d1b}.chart-wrap{height:300px;position:relative;border-bottom:1px solid #2b362b;background:repeating-linear-gradient(to bottom,transparent 0,transparent 59px,#293329 60px,#293329 61px)}#chart{width:100%;height:100%;display:block;overflow:visible}#curve{fill:none;stroke:var(--green);stroke-width:3;stroke-linejoin:round;stroke-linecap:round;filter:drop-shadow(0 0 6px #a0ff6b65)}#shade{fill:url(#chartGradient)}#tooltip{position:absolute;z-index:10;pointer-events:none;background:#1d2a1d;border:1px solid #567d45;border-radius:9px;padding:10px 13px;font-size:11px;transform:translate(-50%,-110%);white-space:nowrap;display:none;box-shadow:0 20px 35px #0008}.chart-nodata{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:linear-gradient(#0e160e70,#0e160edc);color:#d0e1c8;gap:9px;font-size:13px}.chart-nodata strong{color:var(--green);font-size:15px}.chart-axis{display:flex;justify-content:space-between;font-size:10px;color:#7d907b;margin-top:13px}.chart-foot{display:flex;justify-content:space-between;gap:14px;margin-top:21px;padding-top:20px;border-top:1px solid var(--line)}.chart-foot .big{font-size:22px;font-family:'Space Grotesk';font-weight:700;margin-top:7px}.chart-foot small{color:#95a895;font-size:10px}
.game-card{padding:0}.game-cover{position:relative;aspect-ratio:16/9;background:radial-gradient(circle at center,#345d2e,#182219 65%);overflow:hidden}.game-cover img{width:100%;height:100%;object-fit:cover;transition:transform .6s}.game-card:hover img{transform:scale(1.06)}.game-cover:after{content:'';position:absolute;inset:40% 0 0;background:linear-gradient(transparent,#131813)}.game-body{padding:23px}.gamerow{display:flex;align-items:center;gap:13px}.game-icon{width:59px;height:59px;border:1px solid #425c42;background:#172519;border-radius:13px;object-fit:cover}.game-title{font:700 18px 'Space Grotesk';line-height:1.2}.game-sub{color:var(--muted);font-size:11px;margin-top:7px}.gamelinks{display:flex;gap:10px;margin-top:25px}.gamelinks a{flex:1;text-align:center}.gamelinks .outlinebtn{padding:12px 9px}
.tabs{display:flex;gap:7px;padding:7px;background:#101610;border:1px solid var(--line);border-radius:12px;width:max-content;max-width:100%;overflow-x:auto;margin:44px 0 20px}.tabs button{border:0;border-radius:9px;background:transparent;color:#a2b19e;padding:12px 18px;font-size:12px;font-weight:800;white-space:nowrap;transition:.2s}.tabs button.active{background:var(--green);color:#13200e}.tabbody{display:none;animation:rise .45s ease both}.tabbody.active{display:block}.details{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.detail{padding:26px}.detail h3{font-size:14px;margin:10px 0;color:#d4e3cd}.detail p{color:#a0af9d;font-size:12px;line-height:1.8}.detail .value{font:700 37px 'Space Grotesk';color:var(--white);margin:17px 0 8px;letter-spacing:-1px}.detail .tag{color:var(--green);font-size:10px;font-weight:800;letter-spacing:1px}.detail .tag.locked{color:#e2c39b}.rating-track{height:8px;background:#334033;border-radius:10px;margin-top:17px;overflow:hidden}.rating-track span{display:block;height:100%;width:0;background:var(--green);border-radius:10px;transition:width 1s}.privacy{border:1px dashed #405340;background:#101710;border-radius:14px;padding:28px;color:#c7d5bf;display:flex;gap:17px;align-items:start;margin-top:14px}.privacy strong{display:block;margin-bottom:9px}.privacy p{font-size:12px;line-height:1.75;color:var(--muted)}.privacy a{color:var(--green);text-decoration:underline;text-underline-offset:3px}
footer{display:flex;justify-content:space-between;align-items:center;gap:16px;border-top:1px solid var(--line);margin-top:70px;padding:30px 0 43px;color:#92a291;font-size:11px}.footer-brand{font:700 16px 'Space Grotesk';color:#d6e5d2}.footer-brand b{color:var(--green)}.reveal{opacity:0;transform:translateY(28px);transition:opacity .7s ease,transform .7s cubic-bezier(.2,.7,.1,1)}.reveal.show{opacity:1;transform:translateY(0)}
@keyframes float{0%,100%{transform:translateY(0) rotate(-7deg)}50%{transform:translateY(-17px) rotate(-3deg)}}@keyframes breathe{50%{transform:scale(1.17);opacity:.7}}@keyframes twinkle{50%{opacity:.2;transform:scale(.7) rotate(40deg)}}@keyframes orbit{to{transform:rotate(336deg) scaleX(1.1)}}@keyframes pulse{50%{box-shadow:0 0 0 12px #b6ff6900}}@keyframes marquee{to{transform:translateX(-50%)}}@keyframes rise{from{opacity:0;transform:translateY(15px)}to{opacity:1;transform:translateY(0)}}
@media(max-width:1020px){.wrap{padding:0 26px}.hero{min-height:440px}.navlinks{display:none}.metrics{grid-template-columns:repeat(2,1fr)}.primary{grid-column:span 2;grid-row:auto;min-height:250px}.primary .number{margin:10px 0}.workspace{grid-template-columns:1fr 1fr}.floatbadge{right:0}.details{grid-template-columns:repeat(2,1fr)}}
@media(max-width:680px){.wrap{padding:0 18px}.nav{height:66px}.wordmark{font-size:16px}.wordmark small{display:none}.slash{margin:0 7px}.livepill{display:none}.nav-right .playbtn{padding:10px 13px}.hero{grid-template-columns:1fr;padding-top:53px;padding-bottom:30px;gap:6px}.eyebrow{letter-spacing:1.5px}h1{letter-spacing:-4px;font-size:clamp(55px,14vw,82px);margin:26px 0 19px}.lead{font-size:13px}.visual{height:260px;overflow:hidden}.orbit{width:240px;height:240px}.orbit:nth-child(2){width:310px;height:125px}.hero-poster{width:176px;height:176px;border-radius:29px}.floatbadge{right:5px;top:9%;padding:10px}.floatbadge strong{font-size:23px}.bar{margin-top:38px;align-items:start}.bar h2{letter-spacing:-1.1px}.updated{font-size:10px;padding:10px}.metrics{gap:10px}.card{border-radius:13px}.card-content{padding:17px}.primary{min-height:245px}.primary .card-content{padding:22px}.primary .number{font-size:clamp(82px,17vw,108px)}.metric-label{font-size:10px;letter-spacing:.5px}.number{font-size:29px;margin-top:23px}.metric-info{font-size:10px}.metric-bottom{left:22px;right:22px;bottom:20px}.workspace{grid-template-columns:1fr}.chart-panel{padding:19px}.panel-head h3{font-size:20px}.switches button{padding:7px 9px}.chart-wrap{height:235px}.details{grid-template-columns:1fr}.tabs{width:100%}.tabs button{padding:11px 14px}.privacy{padding:19px}footer{display:block}footer>*{display:block;margin:8px 0}}
@media(prefers-reduced-motion:reduce){*,*:before,*:after{animation:none!important;transition:none!important;scroll-behavior:auto!important}.reveal{opacity:1;transform:none}}
</style></head><body>
<div class="noise"></div>
<header class="top"><div class="wrap nav"><a href="#top" class="wordmark">KVN <b>STUDIOS</b><span class="slash">/</span><small>INTELLIGENCE</small></a><div class="navlinks"><a href="#dashboard">OVERVIEW</a><a href="#analytics">ANALYTICS</a><a href="#details">DEEP DIVE</a></div><div class="nav-right"><span class="livepill"><span class="pulse" id="pulse"></span><span id="status">CONNECTING</span></span><a class="playbtn" href="https://www.roblox.com/games/134944031090971/" target="_blank" rel="noopener">PLAY GAME ↗</a></div></div></header>
<main id="top"><section class="hero wrap"><div><div class="eyebrow">THE KVN ANALYTICS LAB</div><h1>TRENDING<br><span>EMOTES!</span></h1><p class="lead">Real-time inzicht in jouw Roblox experience. Van live spelers tot groei, engagement en historische trends — alles op één plek.</p><div class="hero-actions"><a class="playbtn" href="#dashboard">EXPLORE DASHBOARD ↓</a><a class="outlinebtn" href="https://kvn-studios.k-backx.workers.dev/" target="_blank" rel="noopener">KVN STUDIOS ↗</a><span class="tiny">PLACE ID: 134944031090971</span></div></div><div class="visual"><div class="orbit"></div><div class="orbit"></div><div class="halo"></div><div class="hero-poster" id="poster"><span class="fallback">✳</span></div><div class="floatbadge">● LIVE CCU <strong id="heroCCU">—</strong><span class="small">PLAYERS RIGHT NOW</span></div><div class="spark sp1">✦</div><div class="spark sp2">✳</div></div></section>
<div class="ticker" aria-hidden="true"><div class="ticker-inner">ROBLOX ANALYTICS <strong>✳</strong> PLAYERS IN REAL TIME <strong>✳</strong> POWERED BY KVN STUDIOS <strong>✳</strong> TRENDING EMOTES! <strong>✳</strong> ROBLOX ANALYTICS <strong>✳</strong> PLAYERS IN REAL TIME <strong>✳</strong> POWERED BY KVN STUDIOS <strong>✳</strong> TRENDING EMOTES! <strong>✳</strong></div></div>
<section class="wrap" id="dashboard"><div class="bar reveal"><div><div class="sec-label">01 / EXPERIENCE OVERVIEW</div><h2>THE NUMBERS<span style="color:var(--green)">.</span></h2><p class="desc">Live publieke statistieken, automatisch elke minuut vernieuwd.</p></div><div class="updated"><span class="pulse"></span><span id="lastUpdate">Wachten op Roblox...</span></div></div>
<div class="metrics reveal"><div class="card primary"><div class="card-content"><div class="label-row"><span class="metric-label">CONCURRENT PLAYERS</span><span class="corner">↗</span></div><div class="number" id="playing">—</div><div class="metric-info">Spelers die op dit moment in TRENDING EMOTES! zitten.</div></div><div class="metric-bottom"><span><span class="pulse"></span>LIVE ROBLOX API</span><span>~ 60 SEC</span></div></div>
<div class="card"><div class="card-content"><div class="label-row"><span class="metric-label">TOTAL VISITS</span><span class="corner">↗</span></div><div class="number" id="visits">—</div><div class="metric-info">Alle bezoeken sinds release</div></div></div>
<div class="card"><div class="card-content"><div class="label-row"><span class="metric-label">FAVORITES</span><span class="corner">✧</span></div><div class="number" id="favorites">—</div><div class="metric-info">Spelers die favoriet gaven</div></div></div>
<div class="card"><div class="card-content"><div class="label-row"><span class="metric-label">LIKE RATING</span><span class="corner">♡</span></div><div class="number" id="rating">—</div><div class="metric-info">Percentage positieve stemmen</div></div></div>
<div class="card"><div class="card-content"><div class="label-row"><span class="metric-label">SELECTED PERIOD PEAK</span><span class="corner"><span class="dots"><i></i><i></i><i></i><i></i><i></i></span></span></div><div class="number" id="peak">—</div><div class="metric-info">Hoogste CCU binnen gekozen tijdsfilter</div></div></div></div>
<div class="bar reveal" id="analytics"><div><div class="sec-label">02 / ANALYTICS ENGINE</div><h2>GROWTH & ACTIVITY<span style="color:var(--green)">.</span></h2><p class="desc">Interactieve historie voor spelers, bezoeken en engagement.</p></div></div>
<div class="workspace reveal"><div class="card chart-panel"><div class="panel-head"><div><div class="sec-label">LIVE TRACKING / HISTORY</div><h3>Experience performance</h3></div><div class="switches" id="ranges"><button data-range="1h">1H</button><button data-range="24h" class="active">24H</button><button data-range="7d">7D</button><button data-range="30d">30D</button></div></div><div class="metric-switch" id="metrics"><button data-metric="ccu" class="active">● Players</button><button data-metric="visits">Visits</button><button data-metric="favorites">Favorites</button><button data-metric="likes">Likes</button></div><div class="chart-wrap"><svg id="chart" viewBox="0 0 860 300" preserveAspectRatio="none"><defs><linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#aaff62" stop-opacity=".26"/><stop offset="1" stop-color="#aaff62" stop-opacity="0"/></linearGradient></defs><path id="shade"/><path id="curve"/><circle id="point" cx="0" cy="0" r="5" fill="#b6ff69" stroke="#132013" stroke-width="3" visibility="hidden"/></svg><div id="tooltip"></div><div id="noData" class="chart-nodata"><strong>We verzamelen je eerste metingen.</strong><span>Grafiek verschijnt zodra er voldoende echte data is.</span><span class="tiny" id="storageInfo">De eerste metingen beginnen na het openen van deze pagina.</span></div></div><div class="chart-axis"><span id="axisStart">—</span><span id="axisEnd">—</span></div><div class="chart-foot"><div><small id="avgLabel">GEMIDDELDE CCU (PERIODE)</small><div class="big" id="avgValue">—</div></div><div><small id="maxLabel">HOOGSTE CCU (PERIODE)</small><div class="big" id="maxValue">—</div></div></div></div>
<div class="card game-card"><div class="game-cover" id="cover"><span style="position:absolute;inset:0;display:grid;place-items:center;color:#b6ff69;font:700 32px 'Space Grotesk'">TRENDING EMOTES!</span></div><div class="game-body"><div class="gamerow"><img id="gameIcon" class="game-icon" alt="Roblox game icoon" style="visibility:hidden"><div><div class="game-title" id="gameTitle">TRENDING EMOTES!</div><div class="game-sub">BY KVN CLOTHING · ROBLOX</div></div></div><div class="gamelinks"><a class="playbtn" target="_blank" rel="noopener" href="https://www.roblox.com/games/134944031090971/">PLAY NOW ↗</a><a class="outlinebtn" target="_blank" rel="noopener" href="https://create.roblox.com/dashboard/creations">CREATOR ↗</a></div><p class="desc" style="margin-top:24px">Echte gameafbeelding en stats worden direct vanaf Roblox opgehaald. Geen verzonnen cijfers.</p></div></div></div>
<div class="bar reveal" id="details"><div><div class="sec-label">03 / DEEP DIVE</div><h2>BEYOND THE BASICS<span style="color:var(--green)">.</span></h2><p class="desc">Zoals RoMonitor, maar op maat voor jouw experience.</p></div></div>
<div class="tabs reveal" id="tabs"><button data-tab="engagement" class="active">Engagement</button><button data-tab="acquisition">Acquisition</button><button data-tab="retention">Retention</button><button data-tab="monetization">Monetization</button><button data-tab="performance">Performance</button></div>
<div class="tabbody active" data-page="engagement"><div class="details"><div class="card detail"><div class="tag">PUBLIC ROBLOX METRIC</div><div class="value" id="likes">—</div><h3>Positive votes</h3><p>Hoeveel spelers jouw experience een duimpje omhoog gaven.</p></div><div class="card detail"><div class="tag">PUBLIC ROBLOX METRIC</div><div class="value" id="dislikes">—</div><h3>Negative votes</h3><p>Hoeveel negatieve stemmen jouw experience heeft ontvangen.</p></div><div class="card detail"><div class="tag">PLAYER SENTIMENT</div><div class="value" id="engagementRating">—</div><h3>Approval rating</h3><p>Positieve stemmen gedeeld door het totale aantal stemmen.</p><div class="rating-track"><span id="ratingFill"></span></div></div></div></div>
<div class="tabbody" data-page="acquisition"><div class="details"><div class="card detail"><div class="tag">TRACKED CHANGE / 24H</div><div class="value" id="visits24">—</div><h3>New visits · 24H</h3><p>Verschil tussen eerste en laatste vastgelegde bezoekenteller binnen 24 uur, geen geschatte unieke gebruikers.</p></div><div class="card detail"><div class="tag">TRACKED CHANGE / 7D</div><div class="value" id="visits7d">—</div><h3>New visits · 7D</h3><p>Wordt beschikbaar na genoeg metingen met Cloudflare D1.</p></div><div class="card detail"><div class="tag locked">PRIVATE CREATOR DATA</div><div class="value">↗</div><h3>Impressions & CTR</h3><p>Zoekimpressies, discovery CTR en traffic sources zijn niet publiek via de standaard Roblox endpoints.</p></div></div></div>
<div class="tabbody" data-page="retention"><div class="privacy"><span style="font-size:28px">◈</span><div><strong>Retention, DAU en session length vereisen creator-toegang.</strong><p>Deze cijfers staan in je persoonlijke Roblox Creator Analytics, niet in de openbare API die we voor CCU gebruiken. Ik laat hier bewust geen nepgetallen zien. Open de <a href="https://create.roblox.com/dashboard/creations" target="_blank" rel="noopener">Roblox Creator Dashboard ↗</a> om je officiële retentie te zien.</p></div></div></div>
<div class="tabbody" data-page="monetization"><div class="privacy"><span style="font-size:28px">◇</span><div><strong>Robux-inkomsten zijn privé.</strong><p>Revenue, ARPPU, betalende gebruikers en conversie zijn geen openbare experience-statistieken. Die kunnen alleen veilig worden getoond met een apart geautoriseerde Roblox Analytics-koppeling. Bekijk voorlopig je <a href="https://create.roblox.com/dashboard/creations" target="_blank" rel="noopener">Creator Dashboard ↗</a>.</p></div></div></div>
<div class="tabbody" data-page="performance"><div class="privacy"><span style="font-size:28px">⚡</span><div><strong>FPS, crash rate, ping en server health zijn privéontwikkelaarsmetingen.</strong><p>De Roblox Creator Dashboard toont meer technische statistieken. Deze website kan zonder geautoriseerde Roblox-koppeling geen echte performance-metrics van spelers uitlezen.</p></div></div></div>
</section></main><footer class="wrap"><div class="footer-brand">KVN <b>STUDIOS</b> <span style="color:#657565;font:400 11px 'DM Sans'">/ THE ANALYTICS LAB</span></div><div>INDEPENDENT ROBLOX DASHBOARD · DATA: ROBLOX PUBLIC API</div><div id="footerTime">—</div></footer>
<script>
'use strict';
const $=id=>document.getElementById(id);
const fmt=n=>Number.isFinite(n)?Math.round(n).toLocaleString('nl-NL'):'—';
const compact=n=>Number.isFinite(n)?Intl.NumberFormat('nl-NL',{notation:'compact',maximumFractionDigits:1}).format(n):'—';
const TIMEKEY='kvn-trending-emotes-history-v2';
let browserHistory=[];try{browserHistory=JSON.parse(localStorage.getItem(TIMEKEY)||'[]').filter(x=>Number.isFinite(x.t)&&Number.isFinite(x.ccu));}catch{}
let currentRange='24h',currentMetric='ccu',currentStats=null,cloudHistory=[],usingCloud=false,chartPoints=[];
const spans={'1h':3600000,'24h':86400000,'7d':7*86400000,'30d':30*86400000};
const valueFields={ccu:'Spelers',visits:'Bezoeken',favorites:'Favorieten',likes:'Likes'};
const dateTime=t=>new Date(t).toLocaleTimeString('nl-NL',{hour:'2-digit',minute:'2-digit'});
function animateNumber(id,num,extra){const el=$(id);if(!el||!Number.isFinite(num)){if(el)el.textContent='—';return;}const old=Number(el.dataset.value);el.dataset.value=num;const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;if(!Number.isFinite(old)||reduced){el.textContent=fmt(num)+(extra||'');return;}const start=performance.now();function step(now){const k=Math.min(1,(now-start)/680),e=1-Math.pow(1-k,3);el.textContent=fmt(old+(num-old)*e)+(extra||'');if(k<1)requestAnimationFrame(step);}requestAnimationFrame(step)}
function state(msg,err){$('status').textContent=msg;$('pulse').style.background=err?'var(--danger)':'var(--green)';$('lastUpdate').textContent=err?msg:'Updated '+dateTime(Date.now())}
function loadImage(url,target,parent){if(typeof url!=='string'||!url.startsWith('https://'))return;const el=parent?document.createElement('img'):$(target);el.src=url;el.alt='TRENDING EMOTES! Roblox artwork';if(parent){const box=$(target);box.replaceChildren(el);}else{el.style.visibility='visible'}}
async function stats(){try{const r=await fetch('/api/stats',{cache:'no-store'});const d=await r.json();if(!r.ok||d.error)throw Error(d.error||'Roblox niet beschikbaar');currentStats=d;animateNumber('playing',d.playing);animateNumber('heroCCU',d.playing);animateNumber('visits',d.visits);animateNumber('favorites',d.favorites);animateNumber('likes',d.likes);animateNumber('dislikes',d.dislikes);$('rating').textContent=Number.isFinite(d.rating)?d.rating.toFixed(1)+'%':'—';$('engagementRating').textContent=$('rating').textContent;$('ratingFill').style.width=(d.rating||0)+'%';if(d.name)$('gameTitle').textContent=d.name;loadImage(d.icon,'poster',true);loadImage(d.thumbnail,'cover',true);loadImage(d.icon,'gameIcon',false);state('LIVE • CONNECTED',false);if(Number.isFinite(d.playing)){browserHistory.push({t:Date.now(),ccu:d.playing,visits:d.visits,favorites:d.favorites,likes:d.likes});browserHistory=browserHistory.filter(x=>x.t>Date.now()-30*86400000).slice(-2500);try{localStorage.setItem(TIMEKEY,JSON.stringify(browserHistory));}catch{}}await loadHistory();}catch(err){state('DATA UNAVAILABLE',true);$('lastUpdate').textContent='Roblox API tijdelijk niet bereikbaar';console.warn(err)}}
function getPoints(){const since=Date.now()-spans[currentRange];const base=usingCloud?cloudHistory:browserHistory;return base.filter(x=>x.t>=since&&Number.isFinite(x[currentMetric]));}
async function loadHistory(){try{const r=await fetch('/api/history?range='+currentRange,{cache:'no-store'});const data=await r.json();if(data.storage==='cloud'){usingCloud=true;cloudHistory=Array.isArray(data.points)?data.points:[];$('storageInfo').textContent='Historische data wordt opgeslagen in Cloudflare D1.';}else{usingCloud=false;$('storageInfo').textContent='Lokale data: alleen beschikbaar in deze browser. Voor 24/7-meting Cloudflare D1 toevoegen.';}}catch{usingCloud=false;}draw();await acquisition();}
async function acquisition(){
  let source=browserHistory;
  if(usingCloud){
    try{
      const r=await fetch('/api/history?range=7d',{cache:'no-store'});
      const d=await r.json();
      if(d.storage==='cloud'&&Array.isArray(d.points))source=d.points;
    }catch{}
  }
  function delta(range){
    const arr=source.filter(x=>x.t>=Date.now()-spans[range]&&Number.isFinite(x.visits));
    if(arr.length<2 || arr[arr.length-1].t-arr[0].t < spans[range]*.90)return null;
    return Math.max(0,arr[arr.length-1].visits-arr[0].visits);
  }
  animateNumber('visits24',delta('24h'));
  animateNumber('visits7d',delta('7d'));
}
function getPointsForRange(range){const since=Date.now()-spans[range];return (usingCloud?cloudHistory:browserHistory).filter(x=>x.t>=since&&Number.isFinite(x.visits));}
function draw(){const values=getPoints();const curve=$('curve'),shade=$('shade'),nodata=$('noData'),point=$('point');point.setAttribute('visibility','hidden');if(!values.length){curve.setAttribute('d','');shade.setAttribute('d','');nodata.style.display='flex';$('avgValue').textContent='—';$('maxValue').textContent='—';$('axisStart').textContent='—';$('axisEnd').textContent='—';return;}const yVals=values.map(x=>x[currentMetric]);const lo=Math.min(...yVals),hi=Math.max(...yVals),gap=Math.max(1,hi-lo);const t0=values[0].t,t1=values[values.length-1].t;chartPoints=values.map((x,i)=>({x:18+(t1===t0?0:(x.t-t0)/(t1-t0))*824,y:270-((x[currentMetric]-lo)/gap)*235,raw:x}));let d=chartPoints.map((p,i)=>(i?'L':'M')+p.x.toFixed(2)+' '+p.y.toFixed(2)).join(' ');if(chartPoints.length===1)d+=' L842 '+chartPoints[0].y.toFixed(2);curve.setAttribute('d',d);shade.setAttribute('d',d+' L842 300 L18 300 Z');nodata.style.display=values.length<2?'flex':'none';nodata.querySelector('strong').textContent='Nog één extra meting nodig';$('avgLabel').textContent='GEMIDDELDE '+valueFields[currentMetric].toUpperCase();$('maxLabel').textContent='HOOGSTE '+valueFields[currentMetric].toUpperCase();$('avgValue').textContent=fmt(yVals.reduce((a,b)=>a+b,0)/yVals.length);$('maxValue').textContent=fmt(hi);$('axisStart').textContent=new Date(t0).toLocaleString('nl-NL',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'});$('axisEnd').textContent=dateTime(t1);const ccuWindow=(usingCloud?cloudHistory:browserHistory).filter(x=>x.t>=Date.now()-spans[currentRange]&&Number.isFinite(x.ccu));$('peak').textContent=ccuWindow.length?fmt(Math.max(...ccuWindow.map(x=>x.ccu))):'—';if(matchMedia('(prefers-reduced-motion: reduce)').matches){curve.style.transition='none';curve.style.strokeDasharray='none';curve.style.strokeDashoffset='0';}else{const len=curve.getTotalLength();curve.style.transition='none';curve.style.strokeDasharray=len;curve.style.strokeDashoffset=len;requestAnimationFrame(()=>{curve.style.transition='stroke-dashoffset .95s cubic-bezier(.3,.7,.2,1)';curve.style.strokeDashoffset='0'});}}
$('ranges').addEventListener('click',e=>{const b=e.target.closest('[data-range]');if(!b)return;currentRange=b.dataset.range;for(const x of $('ranges').querySelectorAll('button'))x.classList.toggle('active',x===b);loadHistory();});
$('metrics').addEventListener('click',e=>{const b=e.target.closest('[data-metric]');if(!b)return;currentMetric=b.dataset.metric;for(const x of $('metrics').querySelectorAll('button'))x.classList.toggle('active',x===b);draw();});
$('tabs').addEventListener('click',e=>{const b=e.target.closest('[data-tab]');if(!b)return;for(const x of $('tabs').querySelectorAll('button'))x.classList.toggle('active',x===b);for(const x of document.querySelectorAll('.tabbody'))x.classList.toggle('active',x.dataset.page===b.dataset.tab);});
$('chart').addEventListener('pointermove',e=>{if(chartPoints.length<2)return;const box=$('chart').getBoundingClientRect();const pointer=(e.clientX-box.left)/box.width*860;let best=chartPoints[0];for(const p of chartPoints)if(Math.abs(p.x-pointer)<Math.abs(best.x-pointer))best=p;const tip=$('tooltip');tip.style.display='block';tip.textContent=dateTime(best.raw.t)+' · '+fmt(best.raw[currentMetric])+' '+valueFields[currentMetric];tip.style.left=Math.min(box.width-90,Math.max(90,best.x/860*box.width))+'px';tip.style.top=best.y/300*box.height+'px';$('point').setAttribute('cx',best.x);$('point').setAttribute('cy',best.y);$('point').setAttribute('visibility','visible')});
$('chart').addEventListener('pointerleave',()=>{$('tooltip').style.display='none';$('point').setAttribute('visibility','hidden')});
for(const card of document.querySelectorAll('.card'))card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();card.style.setProperty('--mouse-x',(e.clientX-r.left)+'px');card.style.setProperty('--mouse-y',(e.clientY-r.top)+'px')});
const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('show');observer.unobserve(entry.target)}},{threshold:.07});document.querySelectorAll('.reveal').forEach(x=>observer.observe(x));
$('footerTime').textContent='© '+new Date().getFullYear()+' KVN STUDIOS';
stats();setInterval(()=>{if(!document.hidden)stats();},60000);
</script></body></html>`;

/* Render-time composition keeps the Roblox API, database schema and API routes unchanged.
   This visual layer is maintained separately in premium-theme.js and premium-interactions.js. */
const THEMED_HTML = HTML
  .replaceAll('KVN STUDIOS', 'KVN CLOTHING')
  .replaceAll('<b>STUDIOS</b>', '<b>CLOTHING</b>')
  .replaceAll('#b6ff69', '#5daeff')
  .replaceAll('#aaff62', '#5daeff')
  .replace('</style>', '\n' + premiumCSS + '\n' + publicAnalyticsStyles + '\n</style>')
  .replace('</section></main><footer', '</section>' + publicAnalyticsMarkup + '</main><footer')
  .replace('</script></body></html>', '\n' + premiumJS + '\n' + publicAnalyticsClient + '\n</script></body></html>');
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/public-analytics') {
      if (request.method && request.method !== 'GET') {
        return new Response('Method Not Allowed', { status:405, headers:{Allow:'GET'} });
      }
      return publicAnalyticsResponse(env);
    }
    if (url.pathname === '/api/stats') {
      try {
        const stats = await fetchStats();
        try { await record(env.DB, stats); } catch (e) { console.log('D1 write unavailable:', e.message); }
        return Response.json(stats, { headers: {'Cache-Control':'public, max-age=30'} });
      } catch (err) { return Response.json({error:String(err.message)}, {status:503,headers:{'Cache-Control':'no-store'}}); }
    }
    if (url.pathname === '/api/history') {
      try { return Response.json(await history(env.DB,url.searchParams.get('range')),{headers:{'Cache-Control':'public, max-age=60'}}); }
      catch(e){ return Response.json({error:String(e.message)},{status:503}); }
    }
    if (url.pathname !== '/') return new Response('Not found',{status:404});
    return new Response(THEMED_HTML, {headers:{'Content-Type':'text/html; charset=utf-8','X-Content-Type-Options':'nosniff'}});
  },
  async scheduled(event, env, ctx) {
    if (env.DB) ctx.waitUntil(fetchStats().then(s=>record(env.DB,s)));
  }
};