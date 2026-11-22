# Enable real 24/7 TRENDING EMOTES! history (Cloudflare D1)

**Current status:** The repository has a five-minute Cron Trigger and D1-compatible
sample storage. It **does not include a live D1 database ID**. Until the owner
creates a database and binds it as \`DB\`, the website only records history
inside each visitor's browser.

## 1. Create the database in the same Cloudflare account as your Worker

Cloudflare Dashboard → Storage & databases → D1 SQL Database → Create.

Suggested name: \`trending-emotes-metrics\`.

Alternative from the project folder using a Cloudflare-authenticated terminal:

\`\`\`bash
npx wrangler d1 create trending-emotes-metrics
\`\`\`

Save the **database ID** returned by Cloudflare. It identifies a database,
**not an authentication key**.

## 2. Bind it to this Worker

Add the following section to \`wrangler.toml\` using the exact ID Cloudflare gave you:

\`\`\`toml
[[d1_databases]]
binding = "DB"
database_name = "trending-emotes-metrics"
database_id = "PASTE-YOUR-OWN-D1-DATABASE-UUID"
\`\`\`

The binding **must** be named \`DB\`, since \`worker.js\` reads \`env.DB\`.
Do not commit example IDs or invent an ID. You may instead configure the
binding in the Cloudflare dashboard and ensure it survives future GitHub builds.

## 3. Deploy and verify the scheduled collector

Your existing \`wrangler.toml\` already contains:

\`\`\`toml
[triggers]
crons = ["*/5 * * * *"]
\`\`\`

The Worker already exports a \`scheduled()\` handler. After a **successful**
deployment, Cloudflare can trigger it approximately every five minutes.
Roblox outages or platform scheduling delays can still leave gaps in the data.
A missed measurement is **not** replaced with an estimate.

The Worker automatically creates a \`samples\` table on the first successful
database write. Its columns are:
\`t\` (millisecond timestamp, primary key), \`ccu\`, \`visits\`,
\`favorites\`, \`likes\`, \`dislikes\`.

Test with real data **after** deployment:

1. Visit \`/api/history?range=24h\` on your own dashboard.
2. Confirm \`"storage":"cloud"\` (not \`"storage":"browser"\`).
3. After one or more successful scheduled runs, \`points\` contains
   real measured data with numeric \`t\` values.
4. Check **Cloudflare → Worker → Logs** and **Cron Triggers** for errors.
5. Compare the chart with available Roblox public statistics.

Optional authenticated CLI verification:

\`\`\`bash
npx wrangler d1 execute trending-emotes-metrics --remote --command "SELECT COUNT(*) AS samples, MAX(t) AS latest_timestamp FROM samples"
\`\`\`

Only run the query after the table has been created.

## Important data definitions

- **CCU**: real concurrent players at each successful poll, not DAU.
- **History and recorded peaks**: sampled counts, **not** Roblox's historical all-time CCU peak.
- **Visits**: a cumulative Roblox visits counter. Two valid snapshots can yield an
  observed change, but this is **not** a unique-player count.
- **Hourly/daily comparisons**: only report them after both requested
  periods have sufficiently complete verified samples.
- **Existing historical periods**: 1H, 24H, 7D and 30D.
- **No retroactive history**: D1 starts recording when it is set up.
- **Roblox Creator Analytics**: still uses the separate
  \`ROBLOX_ANALYTICS_API_KEY\` **Cloudflare Secret**. No API key is required
  for these public statistics and it must never be committed to GitHub.

Official Cloudflare docs:
- https://developers.cloudflare.com/d1/get-started/
- https://developers.cloudflare.com/workers/configuration/cron-triggers/
