/** Public, read-only deployment diagnostic: never writes metrics, secrets, or Cloudflare state. */
import { createHash } from 'node:crypto';
import worker from '../worker.js';
const site='https://trending-emotes-dashboard.k-backx.workers.dev';
const timeout=9000;
const normalize=html=>html.replace(/<script nonce="[a-z0-9]+">/g,'<script nonce="[nonce]">');
const sha=html=>createHash('sha256').update(normalize(html)).digest('hex').slice(0,20);
async function get(path){
  try{
    const response=await fetch(site+path,{headers:{Accept:path.startsWith('/api/')?'application/json':'text/html'},signal:AbortSignal.timeout(timeout),cache:'no-store'});
    const text=await response.text();
    return {status:response.status,cacheControl:response.headers.get('Cache-Control'),statsMode:response.headers.get('X-Stats-Mode'),text};
  }catch(error){return {error:String(error).slice(0,250)};}
}
const expected=await worker.fetch(new Request(site+'/'),{});
const expectedHtml=await expected.text();
const live=await get('/');
console.log('PUBLIC HTML:',JSON.stringify({status:live.status,error:live.error||null,bytes:live.text?.length||0}));
if(live.text){
  const same=normalize(live.text)===normalize(expectedHtml);
  console.log('DEPLOYED HTML MATCHES CURRENT GITHUB CODE:',same,'githubHash=',sha(expectedHtml),'liveHash=',sha(live.text));
  for(const feature of ['kvn-ccu-travel','kvn-trending-emotes-visible-ccu-v1','kvnDigitUp','SINCE LAST VISIT']){
    console.log('FEATURE '+feature+':',live.text.includes(feature));
  }
}
const snap=await get('/api/stats');
let body=null;try{body=JSON.parse(snap.text||'null')}catch{}
console.log('PUBLIC CCU API:',JSON.stringify({
 status:snap.status,error:snap.error||body?.error||null,
 stale:body?.stale??null,
 timestamp:body?.timestamp??null,
 sampleAgeSeconds:Number.isFinite(body?.timestamp)?Math.round((Date.now()-body.timestamp)/1000):null,
 playing:Number.isFinite(body?.playing)?body.playing:null,
 source:body?.source??null,
 statsMode:snap.statsMode,cacheControl:snap.cacheControl
}));
const history=await get('/api/history?range=1h');
let h=null;try{h=JSON.parse(history.text||'null')}catch{}
console.log('PUBLIC HISTORY API:',JSON.stringify({
 status:history.status,error:history.error||h?.error||null,
 storage:h?.storage??null,points:Array.isArray(h?.points)?h.points.length:null
}));
const official=await get('/api/public-analytics');
let officialData=null;try{officialData=JSON.parse(official.text||'null')}catch{}
console.log('PUBLIC ANALYTICS API:',JSON.stringify({
 status:official.status,error:official.error||officialData?.error||null,
 state:officialData?.state??officialData?.status??null,
 publishedMetricCount:Array.isArray(officialData?.metrics)?officialData.metrics.length:
  (officialData?.metrics&&typeof officialData.metrics==='object'?Object.keys(officialData.metrics).length:null)
}));
// No creator analytics values or API secrets are printed to CI logs.

if(live.error||snap.error||history.error||official.error)console.log('DIAGNOSIS: This runner could not reach all live endpoints. No false production claims.');
else if(!live.text||snap.status!==200)console.log('DIAGNOSIS: Live site / stats endpoint failed or is not returning normal verified metrics.');
else if(body?.stale)console.log('DIAGNOSIS: Dashboard is receiving cached fallback; movement effects are intentionally suppressed.');
else if(body?.playing==null)console.log('DIAGNOSIS: No valid public CCU available to animate.');
else if(normalize(live.text)!==normalize(expectedHtml))console.log('DIAGNOSIS: Live HTML differs from the repository under test. Check Cloudflare deploy status.');
else console.log('DIAGNOSIS: Public HTML matches and returns CCU; actual visual effects still require distinct verified CCU snapshots.');
