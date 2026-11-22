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
    if(url.pathname==='/api/stats'){
      return json(res,{source:'Local browser test fixture',placeId:'134944031090971',
        name:'TRENDING EMOTES!',playing:48,visits:12870,favorites:630,
        likes:425,dislikes:16,rating:96.37,icon:null,thumbnail:null,
        timestamp:fixtureNow,stale:false});
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
