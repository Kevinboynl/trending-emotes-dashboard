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
  'refinements.js','studio-upgrade.js','cinematic-v2.js','security.js'
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
for(const marker of ['kvn-pointer-core','kvn-sidefx','kvnCinemaReveal','kvn-refresh-data'])
  assert.ok(html.includes(marker),'Missing cinematic UI element '+marker);
assert.ok(embeddedStyle.includes('--cyan:#38bdf8'),'Blue color palette changed');
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
const history=await worker.fetch(request('/api/history?range=24h'),{});
assert.equal(history.status,200);
assert.equal((await history.json()).storage,'browser');
const disabled=await worker.fetch(request('/api/public-analytics'),{});
assert.equal(disabled.status,200);
assert.equal((await disabled.json()).state,'disabled');
console.log('PASS: Worker composition, dashboard JavaScript, selected filters, real-data wiring, CSS, CSP nonce, invalid routes and public API states.');
