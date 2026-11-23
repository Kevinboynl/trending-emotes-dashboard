import { refinementCSS, refinementJS } from './refinements.js';
import { publicAnalyticsResponse, publicAnalyticsStyles, publicAnalyticsMarkup, publicAnalyticsClient } from './public-analytics.js';
import { premiumCSS } from './premium-theme.js';
import { premiumJS } from './premium-interactions.js';
import { studioUpgradeCSS, studioUpgradeJS } from './studio-upgrade.js';
import { cinematicCSS, cinematicJS } from './cinematic-v2.js';
import { liveIntelligenceCSS, liveIntelligenceJS } from './live-intelligence.js';
import { allowPublicApi, protectResponse, safeError, newPageNonce } from './security.js';
/* TRENDING EMOTES — one-file Cloudflare Worker. Optional D1 binding: DB.
   Optional cron expression: every five minutes (collects without visitors).
   Place ID: 134944031090971. No API keys required for public metrics.
*/
const PLACE_ID = '134944031090971';
const GAME_URL = 'https://www.roblox.com/games/' + PLACE_ID + '/';
let cachedUniverse = null;
let lastLiveStats = null;
let pendingStats = null;
let liveCacheUntil = 0;
// The public Roblox APIs are rate limited; reuse measured responses briefly per isolate.
const LIVE_CACHE_MS = 12000; // The browser checks every 20 seconds; allow a new verified sample.
const SUPPORT_CACHE_MS = 120000; // Votes and artwork are slower-moving data.
let secondaryCache = null;
let secondaryCacheUntil = 0;
let secondaryCacheUniverse = null;
let secondaryPending = null;
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
async function fetchStats(env = {}) {
  // The Universe ID, not Place ID, is required for public game statistics.
  const override=typeof env.ROBLOX_UNIVERSE_ID==='string'?env.ROBLOX_UNIVERSE_ID.trim():'';
  if(/^[0-9]{4,20}$/.test(override))cachedUniverse=override;
  if(!cachedUniverse){
    const id=await getJSON('https://apis.roblox.com/universes/v1/places/'+PLACE_ID+'/universe');
    if(!/^\d+$/.test(String(id.universeId||'')))throw new Error('Universe ID lookup returned no valid ID');
    cachedUniverse=String(id.universeId);
  }
  const u=cachedUniverse;
  const gameUrl='https://games.roblox.com/v1/games?universeIds='+u;
  // Start the fast-changing game request immediately, in parallel with the
  // less frequent enrichment calls. Catch immediately to avoid an unhandled
  // rejection while the optional requests are still resolving.
  const gamePending=getJSON(gameUrl).then(value=>({value}),error=>({error}));
  const secondaryUrls=[
    'https://games.roblox.com/v1/games/votes?universeIds='+u,
    'https://thumbnails.roblox.com/v1/games/icons?universeIds='+u+'&size=512x512&format=Png&isCircular=false',
    'https://thumbnails.roblox.com/v1/games/multiget/thumbnails?universeIds='+u+'&countPerUniverse=1&defaults=true&size=768x432&format=Png&isCircular=false'
  ];
  // Refresh CCU, visits and favorites independently from slower-moving votes,
  // icons, and thumbnails. Avoid four Roblox API calls every 20 seconds.
  let support=secondaryCacheUniverse===u ? secondaryCache : null;
  if(!support||Date.now()>=secondaryCacheUntil){
    if(!secondaryPending||secondaryCacheUniverse!==u){
      const previous=support||{};
      secondaryCacheUniverse=u;
      secondaryPending=Promise.allSettled(secondaryUrls.map(getJSON)).then(results=>{
        const vote=results[0].status==='fulfilled'?results[0].value?.data?.[0]:null;
        const icon=results[1].status==='fulfilled'?results[1].value?.data?.[0]?.imageUrl:null;
        const thumbs=results[2].status==='fulfilled'?results[2].value?.data?.[0]?.thumbnails:null;
        const thumbnail=Array.isArray(thumbs)?thumbs.find(x=>x?.imageUrl)?.imageUrl:null;
        const values={
          likes:Number.isFinite(vote?.upVotes)?vote.upVotes:(previous.likes??null),
          dislikes:Number.isFinite(vote?.downVotes)?vote.downVotes:(previous.dislikes??null),
          icon:typeof icon==='string'&&icon.startsWith('https://')?icon:(previous.icon??null),
          thumbnail:typeof thumbnail==='string'&&thumbnail.startsWith('https://')?thumbnail:(previous.thumbnail??null),
          voteTimestamp:vote&&Number.isFinite(vote.upVotes)&&Number.isFinite(vote.downVotes)?Date.now():(previous.voteTimestamp??null)
        };
        secondaryCache=values;
        const anyNew=results.some(x=>x.status==='fulfilled');
        secondaryCacheUntil=Date.now()+(anyNew?SUPPORT_CACHE_MS:45000);
        return values;
      }).finally(()=>{secondaryPending=null;});
    }
    support=await secondaryPending;
  }
  // Retry a transient game-details error once; do not invent game stats.
  let gameData;
  const initial=await gamePending;
  if(initial.error){
    const error=initial.error;
    if(/Roblox API HTTP 4(?!29)\d\d/.test(String(error?.message||'')))throw error;
    gameData=await getJSON(gameUrl);
  }else gameData=initial.value;
  const g=gameData?.data?.[0];
  if(!g)throw new Error('Game details: Roblox returned no matching universe');
  const likes=support?.likes??null;
  const dislikes=support?.dislikes??null;
  const total=(likes??0)+(dislikes??0);
  return {
    source:'Roblox public API',placeId:PLACE_ID,universeId:u,
    name:g.name||'TRENDING EMOTES!',
    playing:Number.isFinite(g.playing)?g.playing:null,
    visits:Number.isFinite(g.visits)?g.visits:null,
    favorites:Number.isFinite(g.favoritedCount)?g.favoritedCount:null,
    likes,dislikes,rating:total?likes/total*100:null,
    created:g.created||null,updated:g.updated||null,
    icon:support?.icon??null,thumbnail:support?.thumbnail??null,
    voteTimestamp:support?.voteTimestamp??null,
    timestamp:Date.now(),stale:false
  };
}
function minimalStatus(err) {
  const msg = String(err?.message || '');
  const match = msg.match(/Roblox API HTTP (\d{3})/);
  if (match) return {reason:'roblox_http',httpStatus:Number(match[1])};
  if (/abort|timeout/i.test(msg)) return {reason:'timeout'};
  if (/Universe ID/i.test(msg)) return {reason:'universe_lookup'};
  if (/Game details/i.test(msg)) return {reason:'game_details'};
  return {reason:'upstream'};
}
// Only real measurements can be used as stale fallback. No inferred values.
async function readLastSample(db) {
  if (!db) return null;
  try {
    await ensureDB(db);
    const rows = await db.prepare(
      'SELECT t,ccu,visits,favorites,likes,dislikes FROM samples ORDER BY t DESC LIMIT 1'
    ).all();
    const p = rows.results?.[0];
    if (!p || !Number.isFinite(p.t) || !Number.isFinite(p.ccu)) return null;
    const votes = (p.likes ?? 0)+(p.dislikes ?? 0);
    return {
      source:'Last recorded Roblox sample (Cloudflare D1)', placeId:PLACE_ID,
      name:'TRENDING EMOTES!', playing:p.ccu, visits:p.visits,
      favorites:p.favorites, likes:p.likes, dislikes:p.dislikes,
      rating:votes?100*(p.likes??0)/votes:null,
      created:null, updated:null, icon:null, thumbnail:null,
      timestamp:p.t, stale:true
    };
  } catch { return null; }
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
  if (!db) return {storage:'browser',points:[],comparison:{state:'d1_required'}};
  await ensureDB(db);
  const durations={'1h':3600000,'24h':86400000,'7d':7*86400000,'30d':30*86400000};
  const selectedRange=Object.prototype.hasOwnProperty.call(durations,range)?range:'24h';
  const duration=durations[selectedRange],now=Date.now(),since=now-duration;
  const bucket=Math.max(300000,Math.ceil(duration/170/300000)*300000);
  const sql='SELECT MIN(t) t, ROUND(AVG(ccu)) ccu, MAX(visits) visits, MAX(favorites) favorites, MAX(likes) likes, MAX(dislikes) dislikes FROM samples WHERE t>=? GROUP BY CAST(t / ? AS INTEGER) ORDER BY t ASC LIMIT 180';
  const res=await db.prepare(sql).bind(since,bucket).all();
  // Only compare accurately labelled average OBSERVED CCU. Both periods
  // must contain actual 5-minute samples covering most of their duration.
  const comparisonQuery='SELECT CASE WHEN t>=? THEN 1 ELSE 0 END AS period, COUNT(*) AS samples, AVG(ccu) AS average, MIN(t) AS first_t, MAX(t) AS last_t FROM samples WHERE t>=? AND t<? AND ccu IS NOT NULL GROUP BY period';
  const prior=await db.prepare(comparisonQuery).bind(since,now-2*duration,now).all();
  const segments=Array.isArray(prior.results)?prior.results:[];
  const current=segments.find(x=>x.period===1),previous=segments.find(x=>x.period===0);
  const enough=x=>x&&Number.isFinite(x.samples)&&x.samples>=Math.ceil(duration/300000*.7)
    &&Number.isFinite(x.first_t)&&Number.isFinite(x.last_t)
    &&x.last_t-x.first_t>=duration*.7
    &&Number.isFinite(x.average)&&x.average>=0;
  const comparison=enough(current)&&enough(previous)?{
    state:'ready',metric:'sampled_average_ccu',range:selectedRange,
    current:Math.round(current.average*10)/10,
    previous:Math.round(previous.average*10)/10,
    sampleCounts:{current:current.samples,previous:previous.samples},
    label:'Average sampled concurrent players (not DAU)'
  }:{state:'insufficient',range:selectedRange};
  return {storage:'cloud',points:res.results||[],comparison};
}
const HTML = String.raw`<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#080a08"><meta name="description" content="Live Roblox analytics for TRENDING EMOTES! by KVN STUDIOS.">
<title>TRENDING EMOTES! — KVN STUDIOS / Analytics</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Inter:wght@400;450;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
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
<main id="top"><section class="hero wrap"><div><div class="eyebrow">THE KVN ANALYTICS LAB</div><h1>TRENDING<br><span>EMOTES!</span></h1><p class="lead">Real-time insights into your Roblox experience. Live players, growth, engagement, and historical trends — all in one place.</p><div class="kvn-hero-inline-live"><span class="kvn-hero-live-dot" aria-hidden="true"></span><span>LIVE PLAYERS</span><strong id="heroInlineCCU" aria-live="off">—</strong><small>Verified Roblox CCU</small></div><div class="hero-actions"><a class="playbtn" href="#dashboard">EXPLORE DASHBOARD ↓</a><a class="outlinebtn" href="https://www.roblox.com/communities/15819510" target="_blank" rel="noopener noreferrer">KVN STUDIOS ↗</a><span class="tiny">PLACE ID: 134944031090971</span></div></div><div class="visual"><div class="orbit"></div><div class="orbit"></div><div class="halo"></div><div class="hero-poster" id="poster"><span class="fallback">✳</span></div><div class="floatbadge">● LIVE CCU <strong id="heroCCU">—</strong><span class="small">PLAYERS RIGHT NOW</span></div><div class="spark sp1">✦</div><div class="spark sp2">✳</div></div></section>
<div class="ticker" aria-hidden="true"><div class="ticker-inner">ROBLOX ANALYTICS <strong>✳</strong> PLAYERS IN REAL TIME <strong>✳</strong> POWERED BY KVN STUDIOS <strong>✳</strong> TRENDING EMOTES! <strong>✳</strong> ROBLOX ANALYTICS <strong>✳</strong> PLAYERS IN REAL TIME <strong>✳</strong> POWERED BY KVN STUDIOS <strong>✳</strong> TRENDING EMOTES! <strong>✳</strong></div></div>
<section class="wrap" id="dashboard"><div class="bar reveal"><div><div class="sec-label">01 / EXPERIENCE OVERVIEW</div><h2>THE NUMBERS<span style="color:var(--green)">.</span></h2><p class="desc">Verified Roblox statistics, checked automatically every 20 seconds.</p></div><div class="updated"><span class="pulse"></span><span id="lastUpdate">Waiting for Roblox...</span></div></div>
<div class="metrics reveal"><div class="card primary"><div class="card-content"><div class="label-row"><span class="metric-label">CONCURRENT PLAYERS</span><span class="corner">↗</span></div><div class="number" id="playing">—</div><div class="metric-info">Players enjoying TRENDING EMOTES! right now.</div></div><div class="metric-bottom"><span><span class="pulse"></span>LIVE ROBLOX API</span><span>CHECKS EVERY 20 SEC</span></div></div>
<div class="card"><div class="card-content"><div class="label-row"><span class="metric-label">TOTAL VISITS</span><span class="corner">↗</span></div><div class="number" id="visits">—</div><div class="metric-info">Total visits since launch</div></div></div>
<div class="card"><div class="card-content"><div class="label-row"><span class="metric-label">FAVORITES</span><span class="corner">✧</span></div><div class="number" id="favorites">—</div><div class="metric-info">Players who favorited the experience</div></div></div>
<div class="card"><div class="card-content"><div class="label-row"><span class="metric-label">LIKE RATING</span><span class="corner">♡</span></div><div class="number" id="rating">—</div><div class="metric-info">Percentage of positive votes</div></div></div>
<div class="card"><div class="card-content"><div class="label-row"><span class="metric-label">SELECTED PERIOD PEAK</span><span class="corner"><span class="dots"><i></i><i></i><i></i><i></i><i></i></span></span></div><div class="number" id="peak">—</div><div class="metric-info">Highest measured CCU in the selected time range</div></div></div></div>
<div class="bar reveal" id="analytics"><div><div class="sec-label">02 / ANALYTICS ENGINE</div><h2>GROWTH & ACTIVITY<span style="color:var(--green)">.</span></h2><p class="desc">Interactive trends for players, visits, and engagement.</p></div></div>
<div class="workspace reveal"><div class="card chart-panel"><div class="panel-head"><div><div class="sec-label">LIVE TRACKING / HISTORY</div><h3>Experience performance</h3></div><div class="switches" id="ranges"><button data-range="1h">1H</button><button data-range="24h" class="active">24H</button><button data-range="7d">7D</button><button data-range="30d">30D</button></div></div><div class="metric-switch" id="metrics"><button data-metric="ccu" class="active">● Players</button><button data-metric="visits">Visits</button><button data-metric="favorites">Favorites</button><button data-metric="likes">Likes</button></div><div class="chart-wrap"><svg id="chart" viewBox="0 0 860 300" preserveAspectRatio="none"><defs><linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#aaff62" stop-opacity=".26"/><stop offset="1" stop-color="#aaff62" stop-opacity="0"/></linearGradient></defs><path id="shade"/><path id="curve"/><circle id="point" cx="0" cy="0" r="5" fill="#b6ff69" stroke="#132013" stroke-width="3" visibility="hidden"/></svg><div id="tooltip"></div><div id="noData" class="chart-nodata"><strong>Collecting your first measurements.</strong><span>The chart will appear once enough real data is available.</span><span class="tiny" id="storageInfo">Measurements begin when this dashboard is opened.</span></div></div><div class="chart-axis"><span id="axisStart">—</span><span id="axisEnd">—</span></div><div class="chart-foot"><div><small id="avgLabel">AVERAGE CCU (PERIOD)</small><div class="big" id="avgValue">—</div></div><div><small id="maxLabel">HIGHEST CCU (PERIOD)</small><div class="big" id="maxValue">—</div></div></div></div>
<div class="card game-card"><div class="game-cover" id="cover"><span style="position:absolute;inset:0;display:grid;place-items:center;color:#b6ff69;font:700 32px 'Space Grotesk'">TRENDING EMOTES!</span></div><div class="game-body"><div class="gamerow"><img id="gameIcon" class="game-icon" alt="Roblox game icon" style="visibility:hidden"><div><div class="game-title" id="gameTitle">TRENDING EMOTES!</div><div class="game-sub">BY KVN CLOTHING · ROBLOX</div></div></div><div class="gamelinks"><a class="playbtn" target="_blank" rel="noopener" href="https://www.roblox.com/games/134944031090971/">PLAY NOW ↗</a><a class="outlinebtn" target="_blank" rel="noopener" href="https://create.roblox.com/dashboard/creations">CREATOR ↗</a></div><p class="desc" style="margin-top:24px">Artwork and statistics come directly from Roblox. No fabricated figures.</p></div></div></div>
<div class="bar reveal" id="details"><div><div class="sec-label">03 / DEEP DIVE</div><h2>BEYOND THE BASICS<span style="color:var(--green)">.</span></h2><p class="desc">Analytics built for your Roblox experience.</p></div></div>
<div class="tabs reveal" id="tabs"><button data-tab="engagement" class="active">Engagement</button><button data-tab="acquisition">Acquisition</button><button data-tab="retention">Retention</button><button data-tab="monetization">Monetization</button><button data-tab="performance">Performance</button></div>
<div class="tabbody active" data-page="engagement"><div class="details"><div class="card detail"><div class="tag">PUBLIC ROBLOX METRIC</div><div class="value" id="likes">—</div><h3>Positive votes</h3><p>Number of players who liked your experience.</p></div><div class="card detail"><div class="tag">PUBLIC ROBLOX METRIC</div><div class="value" id="dislikes">—</div><h3>Negative votes</h3><p>Number of dislikes your experience has received.</p></div><div class="card detail"><div class="tag">PLAYER SENTIMENT</div><div class="value" id="engagementRating">—</div><h3>Approval rating</h3><p>Positive votes divided by all votes received.</p><div class="rating-track"><span id="ratingFill"></span></div></div></div></div>
<div class="tabbody" data-page="acquisition"><div class="details"><div class="card detail"><div class="tag" id="acq24Tag">MEASURED VISITS / 24H</div><div class="value" id="visits24" aria-live="polite">—</div><h3 id="acq24Title">New visits · 24H</h3><p id="acq24Note">Loading verified measurements…</p></div><div class="card detail"><div class="tag" id="acq7Tag">MEASURED VISITS / 7D</div><div class="value" id="visits7d" aria-live="polite">—</div><h3 id="acq7Title">New visits · 7D</h3><p id="acq7Note">Loading verified measurements…</p></div><div class="card detail"><div class="tag locked">CREATOR ANALYTICS</div><div class="value" aria-hidden="true">↗</div><h3>Impressions & CTR</h3><p>These metrics have not been enabled for your public dashboard. View impressions and CTR in the <a href="https://create.roblox.com/dashboard/creations" target="_blank" rel="noopener">Roblox Creator Dashboard ↗</a>. No statistics are fabricated here.</p></div></div></div>
<div class="tabbody" data-page="retention"><div class="privacy"><span style="font-size:28px">◈</span><div><strong>Creator Analytics via Roblox Open Cloud.</strong><p>The website supports selected aggregate metrics, such as DAU and average session duration. Check access and available values under <a href="#officialMetrics">Official Insights ↓</a>. If permissions are missing, Roblox has rejected the request. This dashboard does not invent numbers.</p></div></div></div>
<div class="tabbody" data-page="monetization"><div class="privacy"><span style="font-size:28px">◇</span><div><strong>Owner-authorized monetization analytics.</strong><p>Selected aggregated creator metrics, including payer counts and revenue, can be published here after a verified Roblox Open Cloud response. All values reflect finalized UTC days, not today’s live revenue. View enabled metrics in <a href="#officialMetrics">Official Insights ↓</a> or open the <a href="https://create.roblox.com/dashboard/creations" target="_blank" rel="noopener">Creator Dashboard ↗</a>.</p></div></div></div>
<div class="tabbody" data-page="performance"><div class="privacy"><span style="font-size:28px">⚡</span><div><strong>Performance metrics require explicit approval and selection.</strong><p>Roblox Open Cloud supports performance metrics such as frame rate and crash rate. These are only published if explicitly enabled. Check analytics access under <a href="#officialMetrics">Official Insights ↓</a>; unverified performance estimates are never shown.</p></div></div></div>
</section></main><footer class="wrap"><div class="footer-brand">KVN <b>STUDIOS</b> <span style="color:#657565;font:400 11px 'DM Sans'">/ THE ANALYTICS LAB</span></div><div>INDEPENDENT ROBLOX DASHBOARD · DATA: ROBLOX PUBLIC API</div><div id="footerTime">—</div></footer>
<script>
'use strict';
const $=id=>document.getElementById(id);
const fmt=n=>Number.isFinite(n)?Math.round(n).toLocaleString('en-US'):'—';
const compact=n=>Number.isFinite(n)?Intl.NumberFormat('en-US',{notation:'compact',maximumFractionDigits:1}).format(n):'—';
const TIMEKEY='kvn-trending-emotes-history-v2';
const LAST_GOOD_STATS_KEY='kvn-trending-emotes-last-real-stats-v1';
function storeVerifiedStats(value) {
  if (!value || value.stale || !Number.isFinite(value.playing)) return;
  try {
    localStorage.setItem(LAST_GOOD_STATS_KEY,JSON.stringify({
      playing:value.playing,visits:value.visits,favorites:value.favorites,
      likes:value.likes,dislikes:value.dislikes,rating:value.rating,
      name:value.name,icon:value.icon,thumbnail:value.thumbnail,
      timestamp:value.timestamp
    }));
  } catch {}
}
function restoreVerifiedStats() {
  try {
    const d=JSON.parse(localStorage.getItem(LAST_GOOD_STATS_KEY)||'null');
    // Only a real previously-verified sample, not a fabricated estimate.
    if(!d || !Number.isFinite(d.playing) || !Number.isFinite(d.timestamp) || d.timestamp>Date.now())return false;
    for(const [id,key] of [['playing','playing'],['heroCCU','playing'],['heroInlineCCU','playing'],['visits','visits'],['favorites','favorites'],['likes','likes'],['dislikes','dislikes']]){
      if(Number.isFinite(d[key]))animateNumber(id,d[key]);
    }
    if(Number.isFinite(d.rating)){
      $('rating').textContent=d.rating.toFixed(1)+'%';
      $('engagementRating').textContent=$('rating').textContent;
      $('ratingFill').style.width=d.rating+'%';
    }
    if(d.name)$('gameTitle').textContent=d.name;
    loadImage(d.icon,'poster',true);loadImage(d.thumbnail,'cover',true);loadImage(d.icon,'gameIcon',false);
    $('lastUpdate').textContent='Last verified Roblox sample: '+new Date(d.timestamp).toLocaleString('en-US')+' (cached)';
    return true;
  }catch{return false;}
}
// A *visible* snapshot differs from the latest successful network response.
// Inactive tabs may finish a request after the visitor has left. Never use
// that unseen result as a return-visit comparison baseline.
const LAST_VISIBLE_CCU_KEY='kvn-trending-emotes-visible-ccu-v1';
const VISIBLE_SNAPSHOT_TTL=48*60*60*1000;
const validVisibleSnapshot=(x,now=Date.now())=>Boolean(x&&
  Number.isSafeInteger(x.playing)&&x.playing>=0&&x.playing<=1e9&&
  Number.isFinite(x.timestamp)&&Number.isFinite(x.shownAt)&&
  x.timestamp>0&&x.timestamp<=now+30000&&
  x.shownAt>=x.timestamp-30000&&x.shownAt<=now+30000&&
  now-x.shownAt<=VISIBLE_SNAPSHOT_TTL);
function readLastVisibleCCU(){
  try{
    const stored=JSON.parse(localStorage.getItem(LAST_VISIBLE_CCU_KEY)||'null');
    return validVisibleSnapshot(stored)?stored:null;
  }catch{return null;}
}
let lastVisibleCCU=readLastVisibleCCU();
let lastFetchedCCU=null;
let latestVerifiedCCU=null;
let returnComparisonPending=Boolean(lastVisibleCCU);
let visibilityEpoch=0;
let requestVisibilityEpoch=null;
let resumeQueued=false;
let lastResumeAttempt=0;
let lastResumeEpoch=-1;
let visitorAway=false;
function displaySavedVisibleCCU(){
  if(!validVisibleSnapshot(lastVisibleCCU))return;
  // The old, actually seen count remains on-screen until a newer verified
  // measurement has been accepted and the roll can begin.
  animateNumber('playing',lastVisibleCCU.playing);
  animateNumber('heroCCU',lastVisibleCCU.playing);
  animateNumber('heroInlineCCU',lastVisibleCCU.playing);
  $('lastUpdate').textContent='Previous verified CCU: '+
    new Date(lastVisibleCCU.timestamp).toLocaleString('en-GB')+' · checking for updates';
}
function rememberVisibleCCU(sample){
  if(!sample||sample.stale||!validVisibleSnapshot({
    playing:sample.playing,timestamp:sample.timestamp,shownAt:Date.now()
  }))return;
  const visible={playing:sample.playing,timestamp:sample.timestamp,
    shownAt:Date.now(),fresh:true};
  lastVisibleCCU=visible;
  try{localStorage.setItem(LAST_VISIBLE_CCU_KEY,JSON.stringify(visible));}catch{}
}

let browserHistory=[];try{browserHistory=JSON.parse(localStorage.getItem(TIMEKEY)||'[]').filter(x=>Number.isFinite(x.t)&&Number.isFinite(x.ccu));}catch{}
let currentRange='24h',currentMetric='ccu',currentStats=null,cloudHistory=[],usingCloud=false,chartPoints=[];
const spans={'1h':3600000,'24h':86400000,'7d':7*86400000,'30d':30*86400000};
const valueFields={ccu:'Players',visits:'Visits',favorites:'Favorites',likes:'Likes'};
const dateTime=t=>new Date(t).toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'});
const numberAnimations=new WeakMap();
let ccuReservedWidth=3.35;
function animateNumber(id,num,extra,verifiedCcuChange=false){
  const el=$(id);
  if(!el||!Number.isFinite(num)){
    if(el)el.textContent='—';
    return;
  }
  const old=Number(el.dataset.value);
  const target=fmt(num)+(extra||'');
  if(id==='playing'){
    // Reserve the widest verified digit group seen this session. That keeps
    // the adjacent CCU badge from jumping on 99→100 or 100→98 transitions.
    const previousText=Number.isFinite(Number(el.dataset.value))?
      fmt(Number(el.dataset.value)):'';
    ccuReservedWidth=Math.min(12,Math.max(ccuReservedWidth,target.length,previousText.length));
    el.style.setProperty('--kvn-ccu-reserved-width',ccuReservedWidth+'ch');
  }
  el.dataset.value=String(num);
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const active=numberAnimations.get(el);
  if(active){
    if(active.frame)cancelAnimationFrame(active.frame);
    if(active.timer)clearTimeout(active.timer);
    numberAnimations.delete(el);
  }
  // Only animate truly new, verified concurrent-player observations.
  if(id==='playing'){
    el.setAttribute('aria-label','Concurrent players: '+fmt(num));
    if(!verifiedCcuChange||!Number.isFinite(old)||old===num||reduce){
      el.textContent=target;
      return;
    }
    const before=fmt(old),after=fmt(num);
    if(before.length!==after.length || before.length>12){
      // Carries that add/remove a character cannot roll digit-for-digit.
      // Show the exact new number immediately with a short, gentle fade.
      // The reserved-width counter avoids badge overlap or a number jump.
      el.getAnimations?.().forEach(anim=>anim.cancel());
      el.textContent=target;
      el.animate?.([{opacity:.48,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],
        {duration:520,easing:'cubic-bezier(.2,.85,.2,1)'});
      return;
    }
    const increasing=num>old;
    const fragment=document.createDocumentFragment();
    let changed=0;
    for(let i=0;i<after.length;i++){
      const previous=before[i],next=after[i];
      if(previous===next||!/[0-9]/.test(previous)||!/[0-9]/.test(next)){
        fragment.append(document.createTextNode(next));
        continue;
      }
      changed++;
      const slot=document.createElement('span');
      slot.className='kvn-roll-slot';
      slot.setAttribute('aria-hidden','true');
      slot.dataset.direction=increasing?'up':'down';
      slot.style.setProperty('--kvn-roll-delay',String(Math.min(4,after.length-i-1)*45)+'ms');
      const track=document.createElement('span');
      track.className='kvn-roll-track';
      const first=document.createElement('span'),second=document.createElement('span');
      first.textContent=increasing?previous:next;
      second.textContent=increasing?next:previous;
      track.append(first,second);
      slot.append(track);
      fragment.append(slot);
    }
    if(!changed){el.textContent=target;return;}
    el.replaceChildren(fragment);
    const timer=setTimeout(()=>{
      el.textContent=target;
      numberAnimations.delete(el);
    },710);
    numberAnimations.set(el,{timer});
    return;
  }
  if(!Number.isFinite(old)||reduce||old===num){
    el.textContent=target;
    return;
  }
  const start=performance.now();
  const state={frame:0};
  const step=now=>{
    const progress=Math.min(1,(now-start)/600);
    const eased=1-Math.pow(1-progress,3);
    el.textContent=fmt(old+(num-old)*eased)+(extra||'');
    if(progress<1)state.frame=requestAnimationFrame(step);
    else {el.textContent=target;numberAnimations.delete(el);}
  };
  numberAnimations.set(el,state);
  state.frame=requestAnimationFrame(step);
}
function state(msg,err){$('status').textContent=msg;$('pulse').style.background=err?'var(--danger)':'var(--green)';$('lastUpdate').textContent=err?msg:'Updated '+dateTime(Date.now())}
function loadImage(url,target,parent){if(typeof url!=='string'||!url.startsWith('https://'))return;const box=$(target);if(!box)return;if(parent){const existing=box.querySelector('img');if(existing&&existing.src===url)return;const el=document.createElement('img');el.src=url;el.alt='TRENDING EMOTES! Roblox artwork';el.decoding='async';box.replaceChildren(el);}else{if(box.src!==url)box.src=url;box.alt='TRENDING EMOTES! Roblox artwork';box.style.visibility='visible'}}
// Fast public polls; slower D1 history requests avoid needless database work.
const LIVE_POLL_MS=20000;
const HISTORY_POLL_MS=60000;
let liveStatsInFlight=null;
let lastHistoryRefresh=0;
let lastLiveCheckAt=0;
async function stats(){
  if(liveStatsInFlight)return liveStatsInFlight;
  lastLiveCheckAt=Date.now();
  // A request started before the tab became hidden must not be treated as a
  // visible update, even if it finishes after the visitor comes back.
  requestVisibilityEpoch=visibilityEpoch;
  const requestStartedVisible=!document.hidden&&!visitorAway;
  liveStatsInFlight=(async()=>{
    try{
      const controller=new AbortController();
      const timeout=setTimeout(()=>controller.abort(),12000);
      let response;
      try{
        response=await fetch('/api/stats',{cache:'no-store',signal:controller.signal});
      }finally{clearTimeout(timeout);}
      const d=await response.json();
      if(!response.ok||d.error)throw Error(d.error||'Roblox unavailable');
      lastFetchedCCU=d;
      const isAuthoritative=!d.stale&&Number.isSafeInteger(d.playing)&&d.playing>=0
        &&d.playing<=1e9&&Number.isFinite(d.timestamp)&&d.timestamp>0
        &&d.timestamp<=Date.now()+30000&&Date.now()-d.timestamp<=VISIBLE_SNAPSHOT_TTL;
      if(isAuthoritative&&(!latestVerifiedCCU||d.timestamp>latestVerifiedCCU.timestamp)){
        latestVerifiedCCU={playing:d.playing,timestamp:d.timestamp};
        storeVerifiedStats(d);
      }
      if(!requestStartedVisible||document.hidden||visitorAway||requestVisibilityEpoch!==visibilityEpoch){
        // The visitor did not see this result. Never change lastVisibleCCU.
        return;
      }
      if(isAuthoritative && lastVisibleCCU && (d.timestamp<lastVisibleCCU.timestamp ||
        (d.timestamp===lastVisibleCCU.timestamp&&d.playing!==lastVisibleCCU.playing))){
        state('WAITING FOR A NEWER VERIFIED ROBLOX MEASUREMENT',true);
        return;
      }
      const visibleBefore=lastVisibleCCU&&validVisibleSnapshot(lastVisibleCCU)
        ?{...lastVisibleCCU}:null;
      const isNewSample=isAuthoritative&&visibleBefore
        &&d.timestamp>visibleBefore.timestamp;
      const changed=isNewSample&&d.playing!==visibleBefore.playing;
      const context=returnComparisonPending&&isNewSample?'return':'live';
      const comparisonPrevious=visibleBefore?{
        playing:visibleBefore.playing,timestamp:visibleBefore.timestamp,stale:false
      }:null;

      // The previous actually SEEN count remains visible throughout the fetch.
      // The CCU rolling system runs only after a newer authoritative reading.
      currentStats=d;
      for(const [id,key] of [
        ['playing','playing'],['heroCCU','playing'],['heroInlineCCU','playing'],['visits','visits'],
        ['favorites','favorites'],['likes','likes'],['dislikes','dislikes']
      ]){
        if((id==='playing'||id==='heroCCU'||id==='heroInlineCCU')&&!isAuthoritative&&visibleBefore)continue;
        if((id==='playing'||id==='heroCCU'||id==='heroInlineCCU')&&!isAuthoritative&&
          (!Number.isSafeInteger(d.playing)||d.playing<0))continue;
        animateNumber(id,d[key],undefined,id==='playing'&&Boolean(changed));
      }
      const rating=Number.isFinite(d.rating)?d.rating.toFixed(1)+'%':'—';
      $('rating').textContent=rating;
      $('engagementRating').textContent=rating;
      $('ratingFill').style.width=Number.isFinite(d.rating)?d.rating+'%':'0%';
      if(d.name)$('gameTitle').textContent=d.name;
      loadImage(d.icon,'poster',true);
      loadImage(d.thumbnail,'cover',true);
      loadImage(d.icon,'gameIcon',false);
      state(!isAuthoritative?'CACHED • WAITING FOR ROBLOX':'LIVE • CONNECTED',!isAuthoritative);
      if(Number.isFinite(d.timestamp)){
        $('lastUpdate').textContent=(!isAuthoritative?'Last verified (cached): ':'Last verified sample: ')+
          new Date(d.timestamp).toLocaleString('en-GB');
      }
      if(isAuthoritative){
        const last=browserHistory[browserHistory.length-1];
        if(!last||last.t<d.timestamp){
          browserHistory.push({
            t:d.timestamp,ccu:d.playing,
            visits:d.visits,favorites:d.favorites,likes:d.likes
          });
          browserHistory=browserHistory.filter(x=>x.t>Date.now()-30*86400000).slice(-2500);
          try{localStorage.setItem(TIMEKEY,JSON.stringify(browserHistory));}catch{}
        }
      }
      draw();
      window.dispatchEvent(new CustomEvent('kvn:verified-stats',{detail:{
        stats:d,previous:comparisonPrevious,range:currentRange,
        context,returning:context==='return',lastSeenAt:visibleBefore?.shownAt??null,
        history:getVerifiedHistory().filter(x=>x&&Number.isFinite(x.t)
          &&Number.isFinite(x.ccu)&&x.t>=Date.now()-86400000),
        cloud:usingCloud
      }}));
      // After the verified count has been presented, it becomes the new
      // visible baseline. Updating the network cache alone never does this.
      if(isAuthoritative&&(!visibleBefore||d.timestamp>=visibleBefore.timestamp)){
        rememberVisibleCCU(d);
        if(isNewSample||!visibleBefore)returnComparisonPending=false;
      }
      if(!lastHistoryRefresh||Date.now()-lastHistoryRefresh>=HISTORY_POLL_MS){
        lastHistoryRefresh=Date.now();
        void loadHistory().catch(err=>console.warn('History refresh delayed',err));
      }
    }catch(err){
      if(document.hidden||visitorAway||requestVisibilityEpoch!==visibilityEpoch)return;
      state('ROBLOX TEMPORARILY UNAVAILABLE',true);
      if(lastVisibleCCU&&validVisibleSnapshot(lastVisibleCCU)){
        $('lastUpdate').textContent='Refresh delayed · last visible verified sample: '+
          new Date(lastVisibleCCU.timestamp).toLocaleString('en-GB');
      }else if(currentStats&&Number.isFinite(currentStats.playing)){
        $('lastUpdate').textContent='Refresh delayed · last verified sample: '+
          new Date(currentStats.timestamp).toLocaleString('en-GB');
      }else if(!restoreVerifiedStats()){
        $('lastUpdate').textContent='Waiting for verified Roblox statistics. Automatically retrying.';
      }
      document.querySelector('.metrics')?.classList.remove('is-loading');
      if(!lastHistoryRefresh||Date.now()-lastHistoryRefresh>=HISTORY_POLL_MS){
        lastHistoryRefresh=Date.now();
        void loadHistory().catch(()=>{});
      }
      window.dispatchEvent(new CustomEvent('kvn:stats-unavailable',{detail:{
        hasPrevious:Boolean(lastVisibleCCU||currentStats)
      }}));
      console.warn('Roblox live refresh failed',err);
    }
  })();
  try{return await liveStatsInFlight;}
  finally{liveStatsInFlight=null;}
}
// Combine persisted D1 observations with new live API samples for a
// responsive chart. All values are REAL measurements, never interpolated
// fake datapoints. D1 remains the authoritative long-term history source.
function getVerifiedHistory(){
  if(!usingCloud)return browserHistory;
  const lastCloud=cloudHistory.length?Math.max(...cloudHistory.map(x=>Number.isFinite(x.t)?x.t:0)):0;
  const recentSince=Date.now()-10*60000;
  const liveTail=browserHistory.filter(x=>
    x&&Number.isFinite(x.t)&&x.t>lastCloud&&x.t>=recentSince
  );
  return cloudHistory.concat(liveTail).sort((a,b)=>a.t-b.t);
}
function getPoints(){const since=Date.now()-spans[currentRange];return getVerifiedHistory().filter(x=>x.t>=since&&Number.isFinite(x[currentMetric]));}
let historyRequestVersion=0;
async function loadHistory(){
  const requestedRange=currentRange,version=++historyRequestVersion;
  let unavailable=false;
  let comparison={state:'unavailable'};
  try{
    const r=await fetch('/api/history?range='+requestedRange,{cache:'no-store'});
    if(!r.ok)throw Error('history unavailable');
    const data=await r.json();
    // A slow 7D response must never replace a newer 24H selection.
    if(version!==historyRequestVersion||requestedRange!==currentRange)return;
    comparison=data.comparison&&typeof data.comparison==='object'
      ?data.comparison:{state:'unavailable'};
    if(data.storage==='cloud'){
      usingCloud=true;
      cloudHistory=Array.isArray(data.points)?
        data.points.filter(p=>p&&Number.isFinite(p.t)):[];
      $('storageInfo').textContent='Cloudflare D1 history · collected automatically when scheduled tasks are running.';
    }else{
      usingCloud=false;
      $('storageInfo').textContent='Browser-only history · 24/7 tracking needs a Cloudflare D1 database binding.';
    }
  }catch{
    if(version!==historyRequestVersion||requestedRange!==currentRange)return;
    unavailable=true;
    usingCloud=false;
    $('storageInfo').textContent='History service unavailable · showing any locally saved measurements.';
  }
  if(version!==historyRequestVersion||requestedRange!==currentRange)return;
  draw();
  const empty=$('noData');
  if(empty){
    empty.dataset.state=unavailable?'unavailable':'no-data';
    if(empty.style.display!=='none'){
      const strong=empty.querySelector('strong');
      if(strong)strong.textContent=unavailable?'Unable to refresh history':'Not enough verified history yet';
    }
  }
  await acquisition();
  if(version===historyRequestVersion&&requestedRange===currentRange){
    window.dispatchEvent(new CustomEvent('kvn:history-loaded',{
      detail:{range:requestedRange,comparison,cloud:usingCloud,error:unavailable}
    }));
  }
}
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
    const windowMs=spans[range];
    const arr=source.filter(x=>x.t>=Date.now()-windowMs&&Number.isFinite(x.visits));
    if(arr.length<2 || arr[arr.length-1].t-arr[0].t<windowMs*.90)return null;
    return Math.max(0,arr[arr.length-1].visits-arr[0].visits);
  }
  const measured24=delta('24h'),measured7=delta('7d');
  const metric=window.__kvnPublishedAnalytics?.metrics?.find(m=>
    m && m.id==='DailyActiveUsers' && m.state==='ready' && Array.isArray(m.points));
  const official=metric ? metric.points.filter(p=>
    p && typeof p.date==='string' && /^\d{4}-\d{2}-\d{2}$/.test(p.date)
    && Number.isFinite(p.value) && p.value>=0).sort((a,b)=>a.date.localeCompare(b.date)) : [];
  const latest=official.length?official[official.length-1]:null;
  // Compute an average of 7 distinct FULL calendar days. This is NOT a seven-day
  // unique-player count and is never mislabeled as sessions/visits.
  const week=official.slice(-7);
  const consecutive=week.length===7&&week.every((p,i)=>
    i===0||Date.parse(p.date+'T00:00:00Z')-Date.parse(week[i-1].date+'T00:00:00Z')===86400000);
  const dailyAverage=consecutive?week.reduce((sum,p)=>sum+p.value,0)/7:null;
  const setCard=(kind,value,tag,title,note)=>{
    const id=kind==='24'?'visits24':'visits7d';
    const suffix=kind==='24'?'24':'7';
    $('acq'+suffix+'Tag').textContent=tag;
    $('acq'+suffix+'Title').textContent=title;
    $('acq'+suffix+'Note').textContent=note;
    animateNumber(id,value);
  };
  if(measured24!==null){
    setCard('24',measured24,'TRACKED CHANGE / 24H','New visits · 24H',
      'Change in the tracked Roblox visits counter over at least 90% of the last 24 hours. This is not unique users.');
  }else if(latest){
    setCard('24',latest.value,'OFFICIAL DAU · '+latest.date,'Daily active users · '+latest.date,
      'Verified unique daily active users for this complete UTC day via Roblox Open Cloud, not visits.');
  }else{
    setCard('24',null,'VERIFIED DATA ONLY','New visits · 24H',
      'Not enough visit history yet. DAU will appear here when Roblox Official Insights becomes available.');
  }
  if(measured7!==null){
    setCard('7',measured7,'TRACKED CHANGE / 7D','New visits · 7D',
      'Change in the tracked Roblox visits counter across at least 90% of the past seven days.');
  }else if(dailyAverage!==null){
    setCard('7',dailyAverage,'OFFICIAL DAU · 7 DAYS','Average daily active users · 7D',
      'Average unique daily active users ('+week[0].date+' through '+week[6].date+'). Not weekly unique users or visits.');
  }else{
    setCard('7',null,'VERIFIED DATA ONLY','New visits · 7D',
      'Seven consecutive days of official DAU or sufficient visit history are not available yet.');
  }
}
function getPointsForRange(range){const since=Date.now()-spans[range];return (usingCloud?cloudHistory:browserHistory).filter(x=>x.t>=since&&Number.isFinite(x.visits));}
let chartDrawToken=0;
function draw(){const values=getPoints();const curve=$('curve'),shade=$('shade'),nodata=$('noData'),point=$('point');point.setAttribute('visibility','hidden');if(!values.length){chartPoints=[];curve.setAttribute('d','');shade.setAttribute('d','');nodata.style.display='flex';$('avgValue').textContent='—';$('maxValue').textContent='—';$('peak').textContent='—';$('axisStart').textContent='—';$('axisEnd').textContent='—';return;}const yVals=values.map(x=>x[currentMetric]);const lo=Math.min(...yVals),hi=Math.max(...yVals),gap=Math.max(1,hi-lo);const t0=values[0].t,t1=values[values.length-1].t;chartPoints=values.map((x,i)=>({x:18+(t1===t0?0:(x.t-t0)/(t1-t0))*824,y:270-((x[currentMetric]-lo)/gap)*165,raw:x}));let d=chartPoints.length?'M'+chartPoints[0].x.toFixed(2)+' '+chartPoints[0].y.toFixed(2):'';for(let i=1;i<chartPoints.length;i++){const p=chartPoints[i-1],q=chartPoints[i],dx=(q.x-p.x)*.36;d+=' C'+(p.x+dx).toFixed(2)+' '+p.y.toFixed(2)+' '+(q.x-dx).toFixed(2)+' '+q.y.toFixed(2)+' '+q.x.toFixed(2)+' '+q.y.toFixed(2);}if(chartPoints.length===1)d+=' L842 '+chartPoints[0].y.toFixed(2);const pathChanged=curve.getAttribute('d')!==d;if(pathChanged){curve.setAttribute('d',d);shade.setAttribute('d',d+' L842 300 L18 300 Z');}nodata.style.display=values.length<2?'flex':'none';nodata.querySelector('strong').textContent='One more verified measurement needed';$('avgLabel').textContent='AVERAGE '+valueFields[currentMetric].toUpperCase();$('maxLabel').textContent='HIGHEST '+valueFields[currentMetric].toUpperCase();$('avgValue').textContent=fmt(yVals.reduce((a,b)=>a+b,0)/yVals.length);$('maxValue').textContent=fmt(hi);$('axisStart').textContent=new Date(t0).toLocaleString('en-US',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'});$('axisEnd').textContent=dateTime(t1);const ccuWindow=getVerifiedHistory().filter(x=>x.t>=Date.now()-spans[currentRange]&&Number.isFinite(x.ccu));$('peak').textContent=ccuWindow.length?fmt(Math.max(...ccuWindow.map(x=>x.ccu))):'—';if(matchMedia('(prefers-reduced-motion: reduce)').matches){curve.style.transition='none';curve.style.strokeDasharray='none';curve.style.strokeDashoffset='0';}else if(pathChanged){const token=++chartDrawToken;const len=curve.getTotalLength();curve.style.transition='none';curve.style.strokeDasharray=len;curve.style.strokeDashoffset=len;requestAnimationFrame(()=>{if(token!==chartDrawToken)return;curve.style.transition='stroke-dashoffset .7s cubic-bezier(.22,1,.36,1)';curve.style.strokeDashoffset='0'});}}
$('ranges').addEventListener('click',e=>{
  const b=e.target.closest('[data-range]');
  if(!b||b.dataset.range===currentRange)return;
  currentRange=b.dataset.range;
  for(const x of $('ranges').querySelectorAll('button'))x.classList.toggle('active',x===b);
  $('curve').setAttribute('d','');$('shade').setAttribute('d','');
  $('point').setAttribute('visibility','hidden');
  chartPoints=[];
  const empty=$('noData');
  empty.style.display='flex';
  empty.querySelector('strong').textContent='Loading verified '+currentRange.toUpperCase()+' history…';
  void loadHistory();
});
$('metrics').addEventListener('click',e=>{const b=e.target.closest('[data-metric]');if(!b)return;currentMetric=b.dataset.metric;for(const x of $('metrics').querySelectorAll('button'))x.classList.toggle('active',x===b);draw();});
$('tabs').addEventListener('click',e=>{const b=e.target.closest('[data-tab]');if(!b)return;for(const x of $('tabs').querySelectorAll('button'))x.classList.toggle('active',x===b);for(const x of document.querySelectorAll('.tabbody'))x.classList.toggle('active',x.dataset.page===b.dataset.tab);});
$('chart').addEventListener('pointermove',e=>{if(chartPoints.length<2)return;const box=$('chart').getBoundingClientRect();const pointer=(e.clientX-box.left)/box.width*860;let best=chartPoints[0];for(const p of chartPoints)if(Math.abs(p.x-pointer)<Math.abs(best.x-pointer))best=p;const tip=$('tooltip');tip.style.display='block';tip.textContent=dateTime(best.raw.t)+' · '+fmt(best.raw[currentMetric])+' '+valueFields[currentMetric];const tipHalf=Math.min(box.width/2-10,Math.max(50,tip.getBoundingClientRect().width/2+10));tip.style.left=Math.max(tipHalf,Math.min(box.width-tipHalf,best.x/860*box.width))+'px';tip.style.top='12px';$('point').setAttribute('cx',best.x);$('point').setAttribute('cy',best.y);$('point').setAttribute('visibility','visible')});
$('chart').addEventListener('pointerleave',()=>{$('tooltip').style.display='none';$('point').setAttribute('visibility','hidden')});
for(const card of document.querySelectorAll('.card'))card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();card.style.setProperty('--mouse-x',(e.clientX-r.left)+'px');card.style.setProperty('--mouse-y',(e.clientY-r.top)+'px')});
const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('show');observer.unobserve(entry.target)}},{threshold:.07});document.querySelectorAll('.reveal').forEach(x=>observer.observe(x));
$('footerTime').textContent='© '+new Date().getFullYear()+' KVN STUDIOS';
window.addEventListener('kvn:official-analytics',()=>{acquisition();});
// Restore other previously verified public fields, then put the last
// actually visible player count back before the FIRST network request.
restoreVerifiedStats();
displaySavedVisibleCCU();
stats();
setInterval(()=>{if(!document.hidden&&!visitorAway)stats();},LIVE_POLL_MS);
function markVisitorAway(){
  if(visitorAway)return;
  visitorAway=true;
  visibilityEpoch++;
  returnComparisonPending=Boolean(lastVisibleCCU&&validVisibleSnapshot(lastVisibleCCU));
}
function resumeLiveStats(){
  if(document.hidden)return;
  const wasAway=visitorAway;
  visitorAway=false;
  const now=Date.now();
  if(lastResumeEpoch===visibilityEpoch && now-lastResumeAttempt<1200)return;
  if(!wasAway&&!returnComparisonPending&&now-lastLiveCheckAt<9000)return;
  lastResumeEpoch=visibilityEpoch;
  lastResumeAttempt=now;
  if(liveStatsInFlight){
    // Reuse requests from this visible epoch; replace one that started
    // before the visitor left, after it has finished.
    if(requestVisibilityEpoch===visibilityEpoch)return;
    if(!resumeQueued){
      resumeQueued=true;
      void liveStatsInFlight.finally(()=>{
        resumeQueued=false;
        if(!document.hidden)void stats();
      });
    }
    return;
  }
  void stats();
}
document.addEventListener('visibilitychange',()=>{
  if(document.hidden)markVisitorAway();
  else resumeLiveStats();
});
window.addEventListener('blur',()=>{
  if(!document.hidden)markVisitorAway();
});
window.addEventListener('focus',resumeLiveStats);
window.addEventListener('pageshow',event=>{
  if(event.persisted)markVisitorAway();
  resumeLiveStats();
});
window.addEventListener('online',resumeLiveStats);
</script></body></html>`;

/* Render-time composition keeps the Roblox API, database schema and API routes unchanged.
   This visual layer is maintained separately in premium-theme.js and premium-interactions.js. */
const THEMED_HTML = HTML
  .replaceAll('KVN STUDIOS', 'KVN CLOTHING')
  .replaceAll('<b>STUDIOS</b>', '<b>CLOTHING</b>')
  .replaceAll('#b6ff69', '#5daeff')
  .replaceAll('#aaff62', '#5daeff')
  .replace('</style>', () => '\n' + premiumCSS + '\n' + publicAnalyticsStyles + '\n' + refinementCSS + '\n' + studioUpgradeCSS + '\n' + cinematicCSS + '\n' + liveIntelligenceCSS + '\n</style>')
  .replace('</section></main><footer', () => '</section>' + publicAnalyticsMarkup + '</main><footer')
  .replace('</script></body></html>', () => '\n' + premiumJS + '\n' + publicAnalyticsClient + '\n' + refinementJS + '\n' + studioUpgradeJS + '\n' + cinematicJS + '\n' + liveIntelligenceJS + '\n</script></body></html>');
export default {
  async fetch(request, env) {
    // Only safe, read-only methods are accepted, including on the HTML route.
    if(request.method!=='GET' && request.method!=='HEAD')
      return safeError(405,'method_not_allowed','Only GET and HEAD are supported.');
    if(request.url.length>2048)
      return safeError(414,'uri_too_long','The URL is too long.');

    const url=new URL(request.url);
    const pathname=url.pathname;
    const api=pathname==='/api/stats'||pathname==='/api/history'||pathname==='/api/public-analytics';
    if(!api && pathname!=='/')
      return safeError(404,'not_found','This route does not exist.');

    // HEAD must not trigger billable upstream requests. A lightweight 204 is
    // sufficient for an uptime probe; all actual data is fetched with GET.
    if(request.method==='HEAD')
      return protectResponse(new Response(null,{status:204,headers:{'Cache-Control':'no-store'}}));

    if(api){
      // Disallow arbitrary query parameters and surprise URL variants.
      // The only supported API parameter is the predefined history range.
      if(pathname==='/api/history'){
        const allowedRanges=new Set(['1h','24h','7d','30d']);
        // Links shared through chat/search may append harmless attribution
        // parameters. Accept known tracking keys but never use their values in
        // SQL, analytics selection, or cache lookup. Reject any functional
        // unknown key, duplicate range, or malformed range.
        const tracking=new Set([
          'utm_source','utm_medium','utm_campaign','utm_content','utm_term',
          'utm_id','gclid','fbclid'
        ]);
        const query=[...url.searchParams];
        const ranges=url.searchParams.getAll('range');
        const validQuery=query.length<=9 && query.every(([key,value])=>
          (key==='range' && allowedRanges.has(value)) ||
          (tracking.has(key) && value.length<=256)
        );
        if(!validQuery || ranges.length>1 || (ranges.length===1 && !allowedRanges.has(ranges[0])))
          return safeError(400,'invalid_query','Supported history ranges are 1h, 24h, 7d, and 30d.');
      }else if([...url.searchParams].length){
        return safeError(400,'invalid_query','This endpoint does not accept query parameters.');
      }
      if(!(await allowPublicApi(request,env,pathname)))
        return safeError(429,'rate_limited','Too many requests. Please retry after one minute.');
    }

    if(pathname==='/api/public-analytics'){
      return protectResponse(await publicAnalyticsResponse(env));
    }
    if(pathname==='/api/stats'){
      try{
        // Deduplicate concurrent loads within the same Worker isolate.
        const now=Date.now();
        if(!lastLiveStats || now>=liveCacheUntil){
          if(!pendingStats){
            pendingStats=fetchStats(env).then(data=>{
              lastLiveStats=data;
              liveCacheUntil=Date.now()+LIVE_CACHE_MS;
              return data;
            }).finally(()=>{pendingStats=null;});
          }
          await pendingStats;
        }
        const stats=lastLiveStats;
        try{await record(env.DB,stats);}catch{console.log('D1 sample write unavailable');}
        return protectResponse(Response.json(stats,{
          headers:{'Cache-Control':'public, max-age=12'}
        }));
      }catch(err){
        const diagnostic=minimalStatus(err);
        const fallback=lastLiveStats||await readLastSample(env.DB);
        if(fallback){
          return protectResponse(Response.json({...fallback,stale:true,warning:diagnostic},{
            headers:{'Cache-Control':'no-store','X-Stats-Mode':'stale'}
          }));
        }
        return protectResponse(Response.json({
          error:'Roblox public statistics are unavailable',...diagnostic
        },{status:503,headers:{'Cache-Control':'no-store'}}));
      }
    }
    if(pathname==='/api/history'){
      try{
        return protectResponse(Response.json(await history(env.DB,url.searchParams.get('range')),{
          headers:{'Cache-Control':'public, max-age=60'}
        }));
      }catch{
        // Do not return raw SQL errors or database configuration details.
        return safeError(503,'history_unavailable','Historical measurements are temporarily unavailable.');
      }
    }

    const nonce=newPageNonce();
    const html=THEMED_HTML.replace('<script>','<script nonce="'+nonce+'">');
    return protectResponse(new Response(html,{
      headers:{
        'Content-Type':'text/html; charset=utf-8',
        'Cache-Control':'private, no-store, max-age=0'
      }
    }),nonce);
  },
  async scheduled(event, env, ctx) {
    if (env.DB) ctx.waitUntil(fetchStats(env).then(s=>record(env.DB,s)));
  }
};