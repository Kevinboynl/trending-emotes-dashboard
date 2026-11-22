/** Public live endpoint diagnostic. Never prints private analytics values. */
const base='https://trending-emotes-dashboard.k-backx.workers.dev';
const endpoints=[
  ['/','html'],
  ['/api/stats','stats'],
  ['/api/history?range=24h','history'],
  ['/api/public-analytics','analytics']
];
const results=[];
for(const [path,kind] of endpoints){
  let status='network_error',detail='',http=null;
  try{
    const response=await fetch(base+path,{
      redirect:'error',headers:{'Accept':'application/json,text/html'},
      signal:AbortSignal.timeout(15000),cache:'no-store'
    });
    http=response.status;
    const type=response.headers.get('content-type')||'';
    if(kind==='html'){
      const body=await response.text();
      status=response.ok&&type.includes('text/html')&&body.includes('TRENDING EMOTES!')?'ok':'invalid';
      detail='html_page';
    }else{
      const body=await response.json();
      if(kind==='stats'){
        status=response.ok&&(Number.isSafeInteger(body.playing)||body.stale===true)?'ok':'invalid';
        detail=body.stale?'stale':body.error?'api_error':status==='ok'?'verified_schema':'unexpected_schema';
      }else if(kind==='history'){
        status=response.ok&&['cloud','browser'].includes(body.storage)&&Array.isArray(body.points)?'ok':'invalid';
        detail=body.storage==='cloud'?'d1':body.storage==='browser'?'browser_only':body.error?'api_error':'unexpected_schema';
      }else{
        status=response.ok&&typeof body.state==='string'&&Array.isArray(body.metrics)?'ok':'invalid';
        detail=typeof body.state==='string'?body.state:body.error?'api_error':'unexpected_schema';
      }
    }
  }catch(err){
    detail=err?.name==='TimeoutError'?'timeout':err instanceof SyntaxError?'non_json':'network_error';
  }
  results.push({path,status,http,detail});
  console.log(path+' | '+status+' | HTTP '+(http??'none')+' | '+detail);
}
const bad=results.filter(x=>x.status!=='ok');
console.log('Summary: '+(results.length-bad.length)+'/'+results.length+' successful checks');
if(bad.length)process.exitCode=1;
