/**
 * Dependency-free offline smoke checks for the Cloudflare Worker.
 * Run: node scripts/check-dashboard.mjs
 * Does not call Roblox, Cloudflare, or require a private API key.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Script, runInNewContext } from 'node:vm';
import { webcrypto } from 'node:crypto';

const root = resolve(fileURLToPath(new URL('../', import.meta.url)));
const file = name => readFileSync(resolve(root,name),'utf8');
const moduleNames = [
  'public-analytics.js','premium-theme.js','premium-interactions.js',
  'refinements.js','studio-upgrade.js','cinematic-v2.js','live-intelligence.js',
  'emote-pulse.js','player-goals.js','peak-hours.js','growth-brief.js',
  'live-signal.js','activity-feed.js','growth-command-center.js','security.js'
];
const nativeContext = {
  Response, Request, Headers, URL, fetch: async()=>{throw Error('Unexpected remote request in smoke test');},
  crypto:webcrypto, AbortController, AbortSignal,
  setTimeout, clearTimeout, console,
};

function evalNamedModule(source, filename) {
  const names = [...source.matchAll(/\bexport\s+(?:const|async function|function)\s+([A-Za-z_$][\w$]*)/g)]
    .map(x=>x[1]);
  assert.ok(names.length,filename+' exports no values');
  const clean=source.replace(/\bexport\s+(?=(?:const|async function|function)\b)/g,'');
  const js='(function(){'+clean+'\nreturn {'+names.join(',')+'};})()';
  new Script(js,{filename});
  return runInNewContext(js,nativeContext,{timeout:2000});
}

const modules={};
for(const name of moduleNames)Object.assign(modules,evalNamedModule(file(name),name));
const workerSource=file('worker.js')
  .replace(/^import\s.*?;\s*$/gm,'')
  .replace(/\bexport default\b/g,'const WORKER_APP =');
const args=Object.keys(modules);
const bundle='(function('+args.join(',')+'){'+workerSource+'\nreturn {html:THEMED_HTML,worker:WORKER_APP};})';
new Script(bundle,{filename:'composed-worker.js'});
const {html,worker}=runInNewContext(bundle,nativeContext,{timeout:4000})(...Object.values(modules));
const embeddedScript=html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
const embeddedStyle=html.match(/<style>([\s\S]*?)<\/style>/)?.[1];
assert.ok(embeddedScript&&embeddedStyle,'Missing inline browser assets');
new Script(embeddedScript,{filename:'dashboard-client.js'});
assert.match(html,/<html lang="en">/);
for(const range of ['1h','24h','7d','30d'])assert.ok(html.includes('data-range="'+range+'"'));
for(const page of ['engagement','acquisition','retention','monetization','performance'])
  assert.ok(html.includes('data-tab="'+page+'"'));
for(const marker of ['kvn-pointer-core','kvn-sidefx','kvnCinemaReveal','kvn-refresh-data','kvn-ccu-status-line','kvn:verified-stats'])
  assert.ok(html.includes(marker),'Missing cinematic UI element '+marker);
assert.ok(embeddedStyle.includes('--cyan:#43c4ff'),'KVN Studios cyan palette missing');
assert.ok(embeddedStyle.includes('--bg:#080e1c'),'KVN Studios background missing');
assert.ok(embeddedStyle.includes('--green:#31aaff'),'KVN Studios blue accent missing');
assert.ok(html.includes('family=Archivo:wght@600;700;800;900'),'KVN Studios Archivo font not loaded');
assert.ok(html.includes('family=Outfit:wght@400;500;600;700;800;900'),'KVN Studios Outfit font not loaded');
assert.ok(embeddedStyle.includes('.hero h1 .kvn-hero-line'),'Hero title glyph clipping guard missing');
assert.ok(embeddedStyle.includes('prefers-reduced-motion:reduce'),'Missing reduced-motion support');
assert.ok(!html.includes('ROBLOX_ANALYTICS_API_KEY'),'Secret identifier leaked in page');
assert.ok(!html.includes('x-api-key'),'Backend authorization exposed in page');
assert.ok(embeddedScript.includes("fetch('/api/stats'"),'Public stats connection missing');
assert.ok(embeddedScript.includes("fetch('/api/public-analytics'"),'Official insights missing');
const request=(path,method='GET')=>new Request('https://example.test'+path,{method});
const basic=await worker.fetch(request('/'),{});
assert.equal(basic.status,200);
const csp=basic.headers.get('Content-Security-Policy');
assert.match(csp,/script-src 'nonce-[a-z0-9]+'/);
const match=csp.match(/nonce-([a-z0-9]+)/);
assert.ok(match&&await basic.text().then(x=>x.includes('<script nonce="'+match[1]+'">')),
  'HTML script nonce and Content-Security-Policy mismatch');
assert.equal((await worker.fetch(request('/?test=1','POST'),{})).status,405);
assert.equal((await worker.fetch(request('/api/stats?metric=secret'),{})).status,400);
assert.equal((await worker.fetch(request('/api/history?range=not-a-range'),{})).status,400);
assert.equal((await worker.fetch(request('/api/history?range=24h&utm_source=chatgpt.com'),{})).status,200);
assert.equal((await worker.fetch(request('/api/history?utm_source=chatgpt.com&range=7d&utm_medium=share'),{})).status,200);
assert.equal((await worker.fetch(request('/api/history?range=24h&range=7d'),{})).status,400);
assert.equal((await worker.fetch(request('/api/history?range=24h&metric=private'),{})).status,400);
assert.equal((await worker.fetch(request('/api/history?range=invalid&utm_source=chatgpt.com'),{})).status,400);
const history=await worker.fetch(request('/api/history?range=24h'),{});
assert.equal(history.status,200);
const browserHistory=await history.json();
assert.equal(browserHistory.storage,'browser');
assert.equal(browserHistory.comparison.state,'d1_required');
const checkTime=Date.now(),duration=86400000;
const fakeDB={
  prepare(query){
    if(query.startsWith('CREATE TABLE'))return {run:async()=>({})};
    if(query.startsWith('SELECT MIN(t)'))return {bind:()=>({all:async()=>({results:[]})})};
    if(query.startsWith('SELECT CASE WHEN t>='))return {bind:()=>({all:async()=>({results:[
      {period:0,samples:255,average:25.4,first_t:checkTime-2*duration,last_t:checkTime-duration-300000},
      {period:1,samples:259,average:33.6,first_t:checkTime-duration,last_t:checkTime-300000}
    ]})})};
    throw Error('Unexpected D1 query');
  }
};
const measuredHistory=await worker.fetch(request('/api/history?range=24h'),{DB:fakeDB});
assert.equal(measuredHistory.status,200);
const measuredBody=await measuredHistory.json();
assert.equal(measuredBody.storage,'cloud');
assert.equal(measuredBody.comparison.state,'ready');
assert.equal(measuredBody.comparison.metric,'sampled_average_ccu');
assert.equal(measuredBody.comparison.current,33.6);
assert.equal(measuredBody.comparison.previous,25.4);
const disabled=await worker.fetch(request('/api/public-analytics'),{});
assert.equal(disabled.status,200);
assert.equal((await disabled.json()).state,'disabled');
// Verify that repeat browser polls fetch a fresh, real CCU reading, but do not
// needlessly re-fetch votes or thumbnails on every 20-second check.
assert.ok(embeddedScript.includes('LIVE_POLL_MS=20000'),'Live polling interval missing');
const liveClient=embeddedScript.slice(embeddedScript.indexOf('async function stats(){'),embeddedScript.indexOf('\nfunction getPoints()',embeddedScript.indexOf('async function stats(){')));
assert.ok(liveClient.includes("window.dispatchEvent(new CustomEvent('kvn:verified-stats'"),'Live CCU event is not dispatched');
assert.ok(!liveClient.includes('await loadHistory()'),'Live CCU polling is still blocked by historical queries');
assert.ok(liveClient.includes('controller.abort()'),'Live stats fetch lacks a request timeout');
assert.ok(liveClient.indexOf("window.dispatchEvent(new CustomEvent('kvn:verified-stats'") <
  liveClient.indexOf('void loadHistory().catch('),'Live effects should update before history refresh');
assert.ok(embeddedScript.includes('function getVerifiedHistory()'),'Live CCU history merge missing');
assert.ok(embeddedScript.includes("function revealChip(diff,context='live')"),'Verified CCU change badge is missing');
assert.ok(embeddedScript.includes("changeChipTimer=setTimeout(hideChip,2200)"),'CCU change badge should fade out after 2.2 seconds');
assert.ok(embeddedScript.includes("revealChip(diff,info.context==='return'?'return':'live');"),'CCU change event is not connected to badge');

assert.ok(embeddedScript.includes("const numberRow=document.createElement('div')"),'CCU badge must use responsive in-flow layout');
assert.ok(embeddedScript.includes("numberRow.append(player,changeChip)"),'CCU badge must stay next to the player count');
assert.ok(embeddedScript.includes("movementTimer=setTimeout(clearMovement,1600)"),'CCU glow must settle after 1.6 seconds');
assert.ok(embeddedScript.includes("record.textContent='✦ NEW 24H PEAK'"),'Measured peak status missing');
assert.ok(embeddedScript.includes("d.playing>priorValue"),'Peak must only trigger on a verified increase');
assert.ok(embeddedScript.includes("previous&&!previous.stale"),'Do not animate stale prior values');
assert.ok(embeddedScript.includes("if(id==='playing')"),'Selective CCU digit rolling missing');
assert.ok(embeddedScript.includes("verifiedCcuChange"),'CCU number rolling must be verified-only');
assert.ok(embeddedScript.includes("if(!verifiedCcuChange"),'CCU must not roll on cached or initial samples');
assert.ok(embeddedScript.includes("newest.t>prior"),'Sparkline reveal requires a newly timestamped real measurement');
assert.ok(embeddedStyle.includes("@keyframes kvnEdgeLap"),'Traveling border light missing');
assert.ok(embeddedStyle.includes("@keyframes kvnWaveUp"),'Reactive blue light wave missing');
assert.ok(embeddedStyle.includes("@keyframes kvnChipFloat"),'Floating 2.2s CCU badge missing');
assert.ok(embeddedStyle.includes("@keyframes kvnDigitUp"),'Odometer-style digit up motion missing');
assert.ok(embeddedStyle.includes("@keyframes kvnDigitDown"),'Odometer-style digit down motion missing');
assert.ok(embeddedStyle.includes("@keyframes kvnPeakRing"),'Twin-wave new measured peak effect missing');

assert.ok(embeddedStyle.includes(".kvn-ccu-card[data-motion=\"up\"]"),'CCU rising blue pulse missing');
assert.ok(embeddedStyle.includes(".kvn-ccu-card[data-motion=\"down\"]"),'CCU falling slate-blue pulse missing');
assert.ok(html.includes('CHECKS EVERY 20 SEC'),'CCU refresh interval label out of date');
assert.ok(embeddedScript.includes("typeof getVerifiedHistory==='function'"),'CCU sparklines do not use the latest live samples');
assert.ok(embeddedScript.includes("document.addEventListener('visibilitychange',()=>"),'Automatic polling does not resume on tab focus');
assert.ok(embeddedScript.includes('HISTORY_POLL_MS=60000'),'History throttle missing');

assert.ok(embeddedScript.includes("const LAST_VISIBLE_CCU_KEY="),'Last visible snapshot storage missing');
assert.ok(embeddedScript.includes("const VISIBLE_SNAPSHOT_TTL=48*60*60*1000"),'Return snapshot max age missing');
assert.ok(embeddedScript.includes('function readLastVisibleCCU()'),'Cannot restore visible snapshot');
assert.ok(embeddedScript.includes('function rememberVisibleCCU(sample)'),'Cannot persist genuinely displayed snapshot');
assert.ok(embeddedScript.includes('const requestStartedVisible=!document.hidden'),'Hidden fetch must not update visible CCU');
assert.ok(embeddedScript.includes('requestVisibilityEpoch!==visibilityEpoch'),'Background request race guard missing');
assert.ok(embeddedScript.includes("context,returning:context==='return'"),'Return-specific metadata missing');
assert.ok(embeddedScript.includes("info.context==='return'?'SINCE LAST VISIT'"),'Return UI labeling missing');
assert.ok(embeddedScript.includes('displaySavedVisibleCCU();\nstats();'),'Previous visible count must render before new request');
assert.ok(embeddedScript.includes("window.addEventListener('pageshow',event=>"),'Back-forward cache lifecycle missing');
assert.ok(embeddedScript.includes("window.addEventListener('focus',resumeLiveStats)"),'Focus resume missing');

assert.ok(embeddedScript.includes('OFFICIAL_REFRESH_MS=15*60*1000'),'Official analytics refresh missing');
let fakeNow=Date.now();
class TestClock extends Date { static now(){return fakeNow;} }
const requests={game:0,votes:0,icons:0,thumbnails:0};
const mockFetch=async(url)=>{
  const u=String(url);
  if(u.includes('/universes/v1/places/'))return Response.json({universeId:123456});
  if(u.startsWith('https://games.roblox.com/v1/games?')){
    requests.game++;
    return Response.json({data:[{
      name:'TRENDING EMOTES!',playing:requests.game===1?10:11,
      visits:150+requests.game,favoritedCount:42+requests.game
    }]});
  }
  if(u.includes('/games/votes?')){
    requests.votes++;
    return Response.json({data:[{upVotes:26,downVotes:2}]});
  }
  if(u.includes('/games/icons?')){
    requests.icons++;
    return Response.json({data:[{imageUrl:'https://example.test/icon.png'}]});
  }
  if(u.includes('/multiget/thumbnails?')){
    requests.thumbnails++;
    return Response.json({data:[{thumbnails:[{imageUrl:'https://example.test/thumb.png'}]}]});
  }
  throw Error('Unexpected outgoing fetch: '+u);
};
const mockRuntime={...nativeContext,Date:TestClock,fetch:mockFetch};
const measuredWorker=runInNewContext(bundle,mockRuntime,{timeout:4000})(...Object.values(modules)).worker;
const first=await (await measuredWorker.fetch(request('/api/stats'),{})).json();
assert.equal(first.playing,10);
assert.equal(first.likes,26);
assert.equal(first.favorites,43);
assert.equal(requests.game,1);
assert.equal(requests.votes,1);
assert.equal(requests.icons,1);
assert.equal(requests.thumbnails,1);
const second=await (await measuredWorker.fetch(request('/api/stats'),{})).json();
assert.equal(second.playing,10,'Short server cache should reuse the verified sample');
assert.equal(requests.game,1,'Short server cache unexpectedly fetched Roblox again');
fakeNow+=20000;
const third=await (await measuredWorker.fetch(request('/api/stats'),{})).json();
assert.equal(third.playing,11,'Next live poll did not refresh the measured CCU');
assert.equal(third.visits,152);
assert.equal(third.favorites,44);
assert.equal(third.likes,26);
assert.equal(requests.game,2);
assert.equal(requests.votes,1,'Votes should be cached while CCU changes');
assert.equal(requests.icons,1,'Artwork should be cached while CCU changes');
assert.equal(third.timestamp,fakeNow);
// Prevent a slow Roblox thumbnail endpoint from blanking the PUBLIC vote
// counters while the primary game data and vote API respond immediately.
const slowAssets=[];
const slowImageFetch=async(url)=>{
  const u=String(url);
  if(u.includes('/universes/v1/places/'))return Response.json({universeId:123456});
  if(u.startsWith('https://games.roblox.com/v1/games?'))
    return Response.json({data:[{name:'TRENDING EMOTES!',playing:21,visits:220,favoritedCount:33}]});
  if(u.includes('/games/votes?'))
    return Response.json({data:[{upVotes:44,downVotes:14}]});
  if(u.includes('thumbnails.roblox.com')){
    await new Promise(resolve=>setTimeout(resolve,950));
    return Response.json({data:[{imageUrl:'https://example.test/slow.png',
      thumbnails:[{imageUrl:'https://example.test/slow.png'}]}]});
  }
  throw Error('Unrecognized synthetic Roblox URL: '+u);
};
const slowRuntime={...nativeContext,fetch:slowImageFetch};
const slowWorker=runInNewContext(bundle,slowRuntime,{timeout:4000})(...Object.values(modules)).worker;
const started=Date.now();
const slowContext={waitUntil(p){slowAssets.push(p)}};
const fastVotes=await (await slowWorker.fetch(request('/api/stats'),{},slowContext)).json();
assert.equal(fastVotes.playing,21);
assert.equal(fastVotes.likes,44,'Votes must not await slow artwork');
assert.equal(fastVotes.dislikes,14,'Negative votes must not await slow artwork');
assert.ok(Date.now()-started<850,'Art enrichment slowed the CCU response');
await Promise.all(slowAssets);
console.log('PASS: Slow thumbnails cannot blank fresh verified Roblox votes or stall live CCU.');

// Shared D1 aggregate results must survive new Worker isolates and return
// previously VERIFIED Roblox metrics during a later query failure.
const analyticsMemory=new Map();
const analyticsDB={
  prepare(sql){
    if(sql.startsWith('CREATE TABLE'))return {run:async()=>({})};
    if(sql.startsWith('SELECT updated_at,payload FROM public_analytics_cache')){
      return {bind:key=>({first:async()=>analyticsMemory.get(key)||null})};
    }
    if(sql.startsWith('INSERT INTO public_analytics_cache')){
      return {bind:(key,updated_at,payload)=>({run:async()=>{
        analyticsMemory.set(key,{updated_at,payload});
        return {};
      }})};
    }
    throw Error('Unexpected public analytics cache SQL: '+sql);
  }
};
const analyticsNow=Date.now();
const analyticEnv={
  PUBLIC_ANALYTICS_METRICS:'DailyActiveUsers',
  ROBLOX_ANALYTICS_API_KEY:'SYNTHETIC_TEST_KEY_NEVER_PUBLISHED',
  ROBLOX_UNIVERSE_ID:'123456',
  DB:analyticsDB
};
const genuineFixture=async(url)=>{
  assert.ok(String(url).startsWith('https://apis.roblox.com/analytics-query-api/'));
  return Response.json({done:true,response:{values:[{
    dataPoints:[{time:new Date(analyticsNow-2*86400000).toISOString(),
      value:28,status:'Valid'}]
  }]}});
};
const analyticsA=evalNamedModule(file('public-analytics.js'),'analytics-instance-a.js');
const firstOfficial=await (await analyticsA.publicAnalyticsResponse(
  analyticEnv,genuineFixture,analyticsNow
)).json();
assert.equal(firstOfficial.state,'ready');
assert.equal(firstOfficial.metrics[0].latest.value,28);
assert.equal(analyticsMemory.size,1,'Verified metrics were not saved to D1');
const analyticsB=evalNamedModule(file('public-analytics.js'),'analytics-instance-b.js');
const failingAnalytics=async()=>{throw Error('synthetic-upstream-temporary-outage')};
const recovered=await (await analyticsB.publicAnalyticsResponse(
  analyticEnv,failingAnalytics,analyticsNow+20*60000
)).json();
assert.equal(recovered.metrics[0].latest.value,28,
  'D1 shared verified analytics must survive a later Roblox outage');
assert.equal(recovered.previouslyVerified,true,
  'Old saved analytics must be labeled previously verified');
assert.equal(recovered.cacheState,'previously_verified');
console.log('PASS: Shared Cloudflare D1 analytics preserve actual previous metrics across outages.');

console.log('PASS: Browser 20s refresh, official analytics timer, verified CCU update and Roblox upstream caching.');
console.log('PASS: Worker composition, dashboard JavaScript, selected filters, real-data wiring, CSS, CSP nonce, invalid routes and public API states.');
