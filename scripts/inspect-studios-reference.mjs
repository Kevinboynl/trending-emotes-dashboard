/** Read-only comparison of the public KVN Studios typography/color system.
 * Never imports or prints the page's scripts, credentials, or user data.
 * Run: node scripts/inspect-studios-reference.mjs
 */
const url='https://kvn-studios.k-backx.workers.dev/';
try{
  const ctrl=AbortSignal.timeout(12000);
  const response=await fetch(url,{headers:{Accept:'text/html'},signal:ctrl});
  if(!response.ok)throw Error('KVN Studios returned HTTP '+response.status);
  const html=await response.text();
  const blocks=[...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(x=>x[1]);
  const links=[...html.matchAll(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi)].map(x=>x[0]);
  const externalCSS=[];
  for(const link of links){
    const uri=link.match(/href=["']([^"']+)/i)?.[1];
    if(!uri)continue;
    const absolute=new URL(uri,url).href;
    if(!absolute.startsWith('https://'))continue;
    try{
      const result=await fetch(absolute,{signal:AbortSignal.timeout(7000)});
      if(result.ok && Number(result.headers.get('content-length')||0)<2000000){
        externalCSS.push(await result.text());
      }
    }catch{}
  }
  const css=blocks.concat(externalCSS).join('\n');
  const root=(css.match(/:root\s*\{([^}]*)\}/i)||[])[1]||'';
  const declarations=[...root.matchAll(/(--[\w-]+)\s*:\s*([^;]+);?/g)]
    .map(x=>[x[1],x[2].trim()]).filter(x=>/font|color|blue|cyan|bg|text|accent|surface|line|muted|white|glow|primary|highlight/i.test(x[0]));
  const fonts=[...new Set([...html.matchAll(/family=([^&"']+)/g)].map(x=>decodeURIComponent(x[1].replaceAll('+',' '))).concat(
    [...css.matchAll(/font-family\s*:\s*([^;}]+)/gi)].map(x=>x[1].trim())
  ))].slice(0,25);
  const colors=[...css.matchAll(/#[0-9a-fA-F]{6}\b/g)].map(x=>x[0].toLowerCase());
  const hist=Object.entries(colors.reduce((m,c)=>(m[c]=(m[c]||0)+1,m),{}))
    .sort((a,b)=>b[1]-a[1]).slice(0,22);
  const h1=[...css.matchAll(/(?:\.hero\s+)?h1[^{}]*\{([^}]+)\}/g)]
    .slice(0,4).map(x=>x[0].slice(0,650));
  console.log('KVN STUDIOS REFERENCE:',JSON.stringify({status:response.status,htmlBytes:html.length,
    styleBytes:css.length,designVariables:declarations.slice(0,45),
    fontFamilies:fonts,topColors:hist,headingRules:h1
  }));
}catch(e){console.log('KVN STUDIOS REFERENCE UNAVAILABLE:',String(e));}
