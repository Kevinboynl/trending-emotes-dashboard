/**
 * Runs Chromium against the DEPLOYED public website to test CCU visuals.
 * Synthetic events only exist inside this temporary browser session.
 * They never write to Cloudflare, Roblox, or any remote API.
 */
import assert from 'node:assert/strict';
import {mkdirSync} from 'node:fs';
import {chromium} from 'playwright';

mkdirSync('test-artifacts',{recursive:true});
const url='https://trending-emotes-dashboard.k-backx.workers.dev/#dashboard';
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
try{
  for(const width of [390,1440]){
    const context=await browser.newContext({viewport:{width,height:920},reducedMotion:'no-preference'});
    const page=await context.newPage();
    const errors=[];
    page.on('pageerror',err=>errors.push(err.message));
    const response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:20000});
    assert.equal(response.status(),200,'Live HTML unavailable');
    await page.waitForFunction(()=>{
      const el=document.getElementById('playing');
      return el && Number.isFinite(Number(el.dataset.value)) &&
        el.dataset.value!=='' && document.querySelector('.kvn-ccu-change');
    },null,{timeout:18000});
    await page.locator('.metrics .primary').scrollIntoViewIfNeeded();

    // Prevent the real API poll from interfering mid-animation; only the
    // locally-simulated DOM event triggers the effect in this test.
    await page.route('**/api/stats',route=>route.abort('blockedbyclient'));

    const baseline=Number(await page.locator('#playing').getAttribute('data-value'));
    const up=baseline+3;
    await page.evaluate(({from,to})=>{
      animateNumber('playing',to,undefined,true);
      window.dispatchEvent(new CustomEvent('kvn:verified-stats',{detail:{
        stats:{playing:to,timestamp:Date.now(),stale:false},
        previous:{playing:from,timestamp:Date.now()-35000,stale:false},
        context:'live',history:[],cloud:true
      }}));
    },{from:baseline,to:up});
    await page.waitForTimeout(330);
    const rising=await page.evaluate(()=>{
      const card=document.querySelector('.metrics .primary');
      const chip=document.querySelector('.kvn-ccu-change');
      const wave=document.querySelector('.kvn-ccu-wave');
      const travel=document.querySelector('.kvn-ccu-travel');
      const track=document.querySelector('#playing .kvn-roll-track');
      return {motion:card?.dataset.motion,chipText:chip?.textContent,
        chipOpacity:chip?Number(getComputedStyle(chip).opacity):0,
        chipAnimation:chip?getComputedStyle(chip).animationName:null,
        waveOpacity:wave?Number(getComputedStyle(wave).opacity):0,
        waveAnimation:wave?getComputedStyle(wave).animationName:null,
        edgeAnimation:travel?getComputedStyle(travel).animationName:null,
        digitAnimation:track?getComputedStyle(track).animationName:null};
    });
    assert.equal(rising.motion,'up','Live page did not enter increase state '+JSON.stringify(rising));
    assert.match(rising.chipText,/\+3\s*CCU/);
    assert(rising.chipOpacity>.25,'Rise badge is invisible midway '+JSON.stringify(rising));
    assert(rising.waveOpacity>.02,'Rise wave is invisible midway '+JSON.stringify(rising));
    assert.match(rising.waveAnimation,/kvnWaveUp/);
    assert.match(rising.edgeAnimation,/kvnEdgeOpacity/);
    assert.match(rising.digitAnimation,/kvnDigitUp/);
    await page.locator('.metrics .primary').screenshot({path:'test-artifacts/live-rise-'+width+'.png'});

    // Settle the previous CSS animations, then validate actual fade/slide.
    await page.waitForTimeout(2100);
    assert.equal(await page.locator('.kvn-ccu-change').isVisible(),false,'Rise badge never disappeared');
    const down=up-2;
    await page.evaluate(({from,to})=>{
      animateNumber('playing',to,undefined,true);
      window.dispatchEvent(new CustomEvent('kvn:verified-stats',{detail:{
        stats:{playing:to,timestamp:Date.now(),stale:false},
        previous:{playing:from,timestamp:Date.now()-35000,stale:false},
        context:'return',history:[],cloud:true
      }}));
    },{from:up,to:down});
    await page.waitForTimeout(330);
    const falling=await page.evaluate(()=>{
      const card=document.querySelector('.metrics .primary');
      const chip=document.querySelector('.kvn-ccu-change');
      const wave=document.querySelector('.kvn-ccu-wave');
      const track=document.querySelector('#playing .kvn-roll-track');
      const delta=document.querySelector('.kvn-ccu-delta');
      return {motion:card?.dataset.motion,chipText:chip?.textContent,
        chipOpacity:chip?Number(getComputedStyle(chip).opacity):0,
        waveOpacity:wave?Number(getComputedStyle(wave).opacity):0,
        digitAnimation:track?getComputedStyle(track).animationName:null,
        deltaText:delta?.textContent};
    });
    assert.equal(falling.motion,'down','Live page did not enter decrease state '+JSON.stringify(falling));
    assert.match(falling.chipText,/−2\s*CCU/);
    assert(falling.chipOpacity>.25,'Drop badge is invisible midway '+JSON.stringify(falling));
    assert(falling.waveOpacity>.02,'Drop wave is invisible midway '+JSON.stringify(falling));
    assert.match(falling.digitAnimation,/kvnDigitDown/);
    assert.match(falling.deltaText,/SINCE LAST VISIT/);
    await page.locator('.metrics .primary').screenshot({path:'test-artifacts/live-fall-'+width+'.png'});
    console.log('PASS deployed UI visual effects at '+width+'px, baseline '+baseline+':',JSON.stringify({rising,falling}));
    assert.deepEqual(errors,[],'Live page JavaScript errors at '+width);
    await page.close();await context.close();
  }
}finally{await browser.close();}
