# TRENDING EMOTES! — Motion ownership and quality audit

Date: 2026-11-23. All changes preserve the vanilla Cloudflare Worker, D1 history, Roblox public APIs and explicitly allowed Creator Analytics metrics.

## Component ownership (do not duplicate)

| Component | CSS and visual owner | JavaScript/data owner | Trigger / lifecycle |
|---|---|---|---|
| Hero/title initial entrance | `cinematic-v2.js` + existing base styles | CSS keyframes | Once per page load; reduced-motion respected |
| Hero decorative/visual card | `premium-theme.js`, `studio-upgrade.js` | Existing artwork loader in `worker.js` | Initial rendering; verified artwork source only |
| Global blue pointer atmosphere | `cinematic-v2.js` | **Single** elapsed-time pointer controller in `cinematic-v2.js` | Pointer move; stops at rest/blur/hidden; disabled for touch and reduced motion |
| Navigation scroll state | `refinements.js` | `refinements.js` scroll spy (throttled) | Scroll/resize/click |
| Metric card hover | `live-intelligence.js` final responsive style layer | No independent JS tilt controller | CSS hover only for fine pointer; no touch tilt |
| Scroll reveal | Base stylesheet / `refinements.js` | IntersectionObserver in `worker.js` | Once when entering viewport |
| Verified CCU number and last-visible baseline | `live-intelligence.js` digit styles | `worker.js` `animateNumber`, `stats`, `rememberVisibleCCU` | Verified 20s polls and deduplicated return fetches |
| CCU rise/fall/change/peak decorations | `live-intelligence.js` | **Single** `kvn:verified-stats` listener in `live-intelligence.js` | Newer, genuine non-stale Roblox sample only |
| History and SVG chart plot | Base SVG/CSS and `live-intelligence.js` | `worker.js` `draw` and history request version guard | New D1 samples, period and metric change |
| Chart pointer tooltip/crosshair | `refinements.js` styles, `cinematic-v2.js` accessible focus rules | **One pointer selection controller** in `worker.js` | Mouse and touch; nearest measured sample with binary search |
| Chart static axis, grid, legend and sparklines | `refinements.js` | `refinements.js` observers and render functions | Real dataset changes |
| Keyboard chart access | `cinematic-v2.js` | `cinematic-v2.js` Arrow/Home/End handler; same crosshair element | Keyboard focus and blur |
| Analytics tab selection | `refinements.js` | `worker.js` logical tab change; `premium-interactions.js` ARIA/keyboard; `refinements.js` indicator position | Click, Arrow/Home/End, resize, font load |
| Deep Dive / Official Insights | `public-analytics.js` + theme styles | `public-analytics.js` official data renderer | Authorized Roblox Open Cloud data and meaningful unavailable states |
| Loading/status/failures | `refinements.js` skeleton styles | `worker.js` and `public-analytics.js` | Fetch outcomes; never replace missing metrics with zero |

## Bugs found and resolved

1. Multiple pointer glows were once owned separately by `studio-upgrade.js`, `refinements.js` and `cinematic-v2.js`. Keep just the global composited pointer atmosphere. It now uses a frame-time-corrected exponential follow and does not maintain an idle RAF loop.
2. `refinements.js` previously listened for chart pointer movement alongside the main Worker, performing another full scan of all D1 points on every pointer event. The main Worker now selects the nearest real point through a logarithmic search and positions both crosshair and tooltip.
3. Keyboard-driven chart selection previously opened a tooltip without giving the surrounding chart its `hovering` class; that could leave keyboard selection visually transparent. The keyboard handler now reveals the existing crosshair and resets state on blur.
4. Returning CCU snapshots are persisted separately from fetched snapshots, and now carry the Roblox place identity. An incompatible game ID is rejected. Existing same-site legacy snapshots without an identity can be migrated on the next valid live sample.
5. A site using stale Cloudflare HTML can pass source compilation yet fail live visual expectations. Production visual checks are now gated on an actual HTML revision match and explicitly report `SKIPPED` rather than claiming verification.

## Known design/code debt

- The original project assembles multiple CSS strings into one HTML page; some older `.card`, `.primary`, `.hero` and chart selectors still overlap. Keep the component-specific final layer authoritative and avoid new `!important` rules.
- The long-running D1 Cron Trigger is configured separately from browser polling. They have different sampling cadences.
- Browser synthetic fixtures are **test-only**. They never write Roblox data or Cloudflare D1.
- GitHub Actions build checks do **not** deploy the Worker. A green GitHub build is not proof that Cloudflare serves that commit.
- A production screenshot is not sufficient to prove live CCU transition behavior: the API must provide two truly distinct verified readings.

## Safe verification

Run the existing GitHub Actions workflow: smoke API/security checks, Wrangler dry-run, local Playwright responsive/browser regression tests and read-only production diagnostics. Verify `/api/stats`, `/api/history?range=24h` and `/api/public-analytics` after Cloudflare deploy. Confirm deployed HTML matches the exact source commit before claiming the visual update is live.

The source of truth for metric definitions and permissions remains the existing Worker and `wrangler.toml`; this motion audit does not change any published metric or secret.
