/**
 * Browser regression checks for the real composed dashboard UI.
 * Uses deterministic, explicitly synthetic responses in a LOCAL test server only.
 * No public Roblox metrics are changed or fabricated by the production Worker.
 *
 * Run with: npm install --no-save playwright
 *           npx playwright install chromium
 *           node scripts/check-layout.mjs
 */
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {mkdirSync} from 'node:fs';
import {chromium} from 'playwright';
import worker from '../worker.js';

const artifactDir='test-artifacts';
mkdirSync(artifactDir,{recursive:true});
const timeRanges={ '1h':3600000,'24h':86400000,'7d':604800000,'30d':2592000000 };
const fixtureNow=Date.now();
let fixtureCCU=48;
let fixtureStale=false;
let fixtureStamp=Date.now();
let fixtureDelayMs=0;
let fixtureFailure=false;
let fixtureRequestCount=0;

function json(res,body){
  res.writeHead(200,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});
  res.end(JSON.stringify(body));
}
function fixtureHistory(range){
  const duration=timeRanges[range]||timeRanges['24h'];
  const count=range==='1h'?10:range==='24h'?30:range==='7d'?50:90;
  const points=Array.from({length:count},(_,i)=>{
    const t=fixtureNow-duration+Math.round((duration-300000)*i/(count-1));
    return {t,ccu:42+Math.round(10*Math.sin(i*.17))+i%5,visits:12000+30*i,
      favorites:600+i,likes:400+i,dislikes:16};
  });
  return {storage:'cloud',points,comparison:{state:'insufficient',range}};
}
const app=createServer(async(req,res)=>{
  try {
    const url=new URL(req.url,'http://localhost');
    if(url.pathname==='/__test__/ccu'){
      const value=Number(url.searchParams.get('value'));
      assert(Number.isInteger(value)&&value>=0&&value<=100000,
        'Invalid synthetic CCU test fixture');
      fixtureCCU=value;
      fixtureStale=url.searchParams.get('stale')==='true';
      if(url.searchParams.get('sameStamp')!=='true'){
        fixtureStamp=Math.max(Date.now(),fixtureStamp+1);
      }
      return json(res,{ok:true});
    }
    if(url.pathname==='/__test__/settings'){
      if(url.searchParams.has('delay')){
        fixtureDelayMs=Math.max(0,Math.min(1500,Number(url.searchParams.get('delay'))||0));
      }
      if(url.searchParams.has('failure')){
        fixtureFailure=url.searchParams.get('failure')==='true';
      }
      return json(res,{ok:true,delay:fixtureDelayMs,failure:fixtureFailure});
    }
    if(url.pathname==='/__test__/requests')return json(res,{count:fixtureRequestCount});
    if(url.pathname==='/api/stats'){
      fixtureRequestCount++;
      const snapshot={source:'Local browser test fixture',placeId:'134944031090971',
        name:'TRENDING EMOTES!',playing:fixtureCCU,visits:12870,favorites:630,
        likes:425,dislikes:16,rating:96.37,icon:null,thumbnail:null,
        timestamp:fixtureStamp,stale:fixtureStale};
      if(fixtureDelayMs)await new Promise(resolve=>setTimeout(resolve,fixtureDelayMs));
      if(fixtureFailure){
        res.writeHead(503,{'Content-Type':'application/json; charset=utf-8'});
        res.end(JSON.stringify({error:'Local synthetic API failure'}));
        return;
      }
      return json(res,snapshot);
    }
    if(url.pathname==='/api/history')return json(res,fixtureHistory(url.searchParams.get('range')));
    if(url.pathname==='/api/public-analytics')return json(res,{state:'disabled',metrics:[]});
    const answer=await worker.fetch(new Request('http://localhost'+req.url,{method:req.method}),{});
    res.writeHead(answer.status,Object.fromEntries(answer.headers.entries()));
    res.end(Buffer.from(await answer.arrayBuffer()));
  } catch(error){res.writeHead(500);res.end('Local test server error');console.error(error);}
});
await new Promise(resolve=>app.listen(0,'127.0.0.1',resolve));
const localURL='http://127.0.0.1:'+app.address().port+'/';
const sizes=[360,390,430,768,1024,1440,1920];
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
try{
  for(const width of sizes){
    fixtureCCU=48;fixtureStale=false;fixtureStamp=Date.now();
    fixtureDelayMs=0;fixtureFailure=false;
    const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    const response=await page.goto(localURL,{waitUntil:'domcontentloaded',timeout:30000});
    assert.equal(response.status(),200,'HTML request failed at '+width);
    const chart=page.locator('.chart-panel');
    await chart.scrollIntoViewIfNeeded();
    await page.waitForFunction(()=>Boolean(document.getElementById('curve')?.getAttribute('d')?.startsWith('M')),null,{timeout:12000});
    const visits=page.locator('#metrics [data-metric="visits"]');
    await visits.click();
    await page.waitForFunction(()=>document.getElementById('avgLabel')?.textContent.includes('VISITS'),null,{timeout:3000});
    const range=page.locator('#ranges [data-range="7d"]');
    await range.click();
    await page.waitForFunction(()=>document.querySelector('#ranges [data-range="7d"]')?.classList.contains('active'),null,{timeout:3000});
    const rect=await page.evaluate(()=>{
      const box=s=>document.querySelector(s).getBoundingClientRect();
      const panel=box('.chart-panel'),group=box('.chart-panel .metric-switch');
      const plot=box('.chart-panel .chart-wrap'),button=box('#metrics [data-metric="visits"]');
      return {
        viewport:innerWidth,documentWidth:document.documentElement.scrollWidth,
        chartGap:plot.top-group.bottom,plotRight:plot.right,panelRight:panel.right,
        plotLeft:plot.left,panelLeft:panel.left,
        plotWidth:plot.width,buttonTop:button.top,buttonBottom:button.bottom,
        groupTop:group.top,groupBottom:group.bottom
      };
    });
    assert(rect.documentWidth<=width+2,'Page horizontally overflows at '+width+': '+JSON.stringify(rect));
    assert(rect.chartGap>=7,'Chart controls overlap plot at '+width+': '+JSON.stringify(rect));
    assert(rect.plotLeft>=rect.panelLeft-2 && rect.plotRight<=rect.panelRight+2,
      'Chart extends beyond panel at '+width+': '+JSON.stringify(rect));
    assert(rect.buttonTop>=rect.groupTop-2 && rect.buttonBottom<=rect.groupBottom+2,
      'Visits button is clipped vertically at '+width+': '+JSON.stringify(rect));
    await page.locator('#tabs [data-tab="retention"]').click();
    assert.equal(await page.locator('.tabbody[data-page="retention"]').evaluate(el=>el.classList.contains('active')),true,
      'Retention tab did not activate at '+width);
    assert.deepEqual(errors,[],'Browser JS errors at '+width);
    if(width===390){
      const setTestCCU=async(value,stale=false)=>{
        const resp=await page.request.get(localURL+'__test__/ccu?value='+value+'&stale='+stale);
        assert.equal(resp.status(),200);
        await page.evaluate(()=>stats()); // Real dashboard function; fixture is local-only.
      };
      assert.equal(await page.locator('#playing').getAttribute('data-value'),'48');
      await setTestCCU(51);
      const card=page.locator('.metrics .primary'),chip=page.locator('.kvn-ccu-change');
      assert.equal(await card.getAttribute('data-motion'),'up','Missing CCU rise pulse');
      assert.match(await chip.innerText(),/\+3\s*CCU/,'Incorrect rise badge');
      assert.equal(await chip.getAttribute('data-visible'),'true','Rise badge did not enter');
      const upDigits=page.locator('#playing .kvn-roll-slot');
      assert.ok(await upDigits.count()>0,'New CCU digits did not roll');
      assert.match(await upDigits.first().locator('.kvn-roll-track').evaluate(el=>getComputedStyle(el).animationName),
        /kvnDigitUp/,'Upward digit animation missing');
      assert.equal(await page.locator('.kvn-ccu-travel').count(),1,'Border traveling light is absent');
      await page.waitForTimeout(300);
      await page.screenshot({path:artifactDir+'/ccu-rise-390.png'});
      await setTestCCU(49);
      assert.equal(await card.getAttribute('data-motion'),'down','Missing CCU drop pulse');
      assert.match(await chip.innerText(),/−2\s*CCU/,'Incorrect drop badge');
      assert.match(await page.locator('#playing .kvn-roll-slot').first().locator('.kvn-roll-track').evaluate(el=>getComputedStyle(el).animationName),
        /kvnDigitDown/,'Downward digit animation missing');
      await page.waitForTimeout(300);
      await page.screenshot({path:artifactDir+'/ccu-fall-390.png'});
      await setTestCCU(49);
      assert.equal(await card.getAttribute('data-motion'),null,'Unchanged CCU must not pulse');
      assert.equal(await chip.isVisible(),false,'Unchanged CCU must hide the badge');
      assert.equal(await page.locator('#playing .kvn-roll-slot').count(),0,'Unchanged CCU must not roll');
      await setTestCCU(53,true);
      assert.equal(await card.getAttribute('data-motion'),null,'Cached CCU must not pulse');
      assert.equal(await chip.isVisible(),false,'Cached CCU must not show a new badge');
      assert.equal(await page.locator('#playing .kvn-roll-slot').count(),0,'Cached CCU must not roll');
      assert.deepEqual(errors,[],'Browser JS error during CCU change animation');
      console.log('PASS: Verified CCU rise/drop, digit rolling, responsive badges, unchanged and stale-value guards.');
    }
    if(width===390||width===1440||width===1920){
      await chart.screenshot({path:artifactDir+'/chart-'+width+'.png',animations:'disabled'});
      await page.screenshot({path:artifactDir+'/dashboard-'+width+'.png',fullPage:true,animations:'disabled'});
    }
    console.log('PASS viewport '+width+'px; plot gap '+rect.chartGap.toFixed(1)+'px; no horizontal overflow, tabs and chart work.');
    await page.close();
  }
  console.log('PASS: Responsive layout, chart controls, metric switching, filters, tabs and script execution.');
} finally {
  await browser.close();
  await new Promise(resolve=>app.close(resolve));
}
