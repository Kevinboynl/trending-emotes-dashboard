/* Defensive public-edge layer for TRENDING EMOTES!
 * Secrets are never handled here or transmitted to the browser.
 * Cloudflare's ratelimit binding is configured in wrangler.toml; a bounded
 * per-isolate fallback also works in local tests and degraded environments.
 */
const WINDOW_MS = 60000;
const MAX_LOCAL_KEYS = 3000;
const bucket = new Map();
const PUBLIC_ENDPOINTS = new Set(['/api/stats','/api/history','/api/public-analytics']);

function securityHeaders(nonce = null) {
  const h = new Headers({
    'X-Content-Type-Options':'nosniff',
    'X-Frame-Options':'DENY',
    'Referrer-Policy':'no-referrer',
    'Cross-Origin-Resource-Policy':'same-origin',
    'Cross-Origin-Opener-Policy':'same-origin',
    'Permissions-Policy':'camera=(), microphone=(), geolocation=(), payment=(), usb=(), midi=()',
    'Strict-Transport-Security':'max-age=31536000'
  });
  if (nonce) {
    // A fresh, unpredictable nonce allows the one bundled inline script,
    // without permitting arbitrary injected scripts or inline event handlers.
    // style-src permits legacy inline style attributes used by the dashboard.
    h.set('Content-Security-Policy', [
      "default-src 'none'",
      "script-src 'nonce-"+nonce+"'",
      "script-src-attr 'none'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' https: data:",
      "connect-src 'self'",
      "object-src 'none'",
      "base-uri 'none'",
      "form-action 'none'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests"
    ].join('; '));
  }
  return h;
}

export function protectResponse(response, nonce = null) {
  const headers = new Headers(response.headers);
  const safe = securityHeaders(nonce);
  for (const [name, value] of safe) headers.set(name, value);
  return new Response(response.body, {
    status:response.status,
    statusText:response.statusText,
    headers
  });
}

export function newPageNonce() {
  // crypto.randomUUID() is secure, unique per HTML response, and available
  // in the Cloudflare Workers runtime. The hex form is CSP-safe.
  return crypto.randomUUID().replaceAll('-', '');
}

export function safeError(status, code, message, extra = {}) {
  return protectResponse(Response.json({error:code, message}, {
    status,
    headers:{
      'Cache-Control':'no-store',
      ...(status===429?{'Retry-After':'60'}:{}),
      ...(status===405?{'Allow':'GET, HEAD'}:{})
    }
  }));
}

function localAllow(key, now) {
  const old=bucket.get(key);
  if (old && now-old.start<WINDOW_MS) {
    if (old.count>=48) return false;
    old.count++;
    return true;
  }
  if (bucket.size>=MAX_LOCAL_KEYS) {
    // Keep the fallback memory bounded and discard expired entries first.
    for (const [id,value] of bucket) {
      if (now-value.start>=WINDOW_MS) bucket.delete(id);
    }
    if (bucket.size>=MAX_LOCAL_KEYS) bucket.delete(bucket.keys().next().value);
  }
  bucket.set(key,{start:now,count:1});
  return true;
}

export async function allowPublicApi(request, env, pathname) {
  if(!PUBLIC_ENDPOINTS.has(pathname)) return true;
  const ip=request.headers.get('CF-Connecting-IP');
  // Do not trust client-supplied X-Forwarded-For, custom query IDs or cookies.
  // Legitimate Cloudflare requests provide CF-Connecting-IP; when absent, rely
  // on the Cloudflare binding's shared anonymous class rather than IP guesses.
  const actor=ip && ip.length<85?ip:'anonymous';
  const key=pathname+':'+actor;
  if(!localAllow(key,Date.now())) return false;
  if(env?.PUBLIC_API_LIMITER && typeof env.PUBLIC_API_LIMITER.limit==='function'){
    try{
      const decision=await env.PUBLIC_API_LIMITER.limit({key});
      if(!decision.success) return false;
    }catch{
      // If the binding is unavailable, the bounded in-memory check above
      // still protects this isolate. Cloudflare edge WAF is recommended too.
    }
  }
  return true;
}
