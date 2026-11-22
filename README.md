# TRENDING EMOTES! — KVN STUDIOS Analytics

Modern geanimeerd Roblox-dashboard voor **TRENDING EMOTES!** (Place ID `134944031090971`).

De website is een **Cloudflare Worker**: één Worker host de voorkant én de Roblox API-proxy. Je hebt **geen apart Cloudflare Pages-project** nodig.

## Live zetten vanuit GitHub (zonder downloaden)

1. Open [Cloudflare Workers & Pages](https://dash.cloudflare.com/?to=/:account/workers-and-pages).
2. Kies **Create application** → **GitHub** (of **Import a repository** als die knop bij jouw account zichtbaar is).
3. Selecteer `Kevinboynl/trending-emotes-dashboard`, branch `main`.
4. **Workernaam:** `trending-emotes-dashboard` — moet overeenkomen met de `name` in `wrangler.toml`.
5. **Root directory:** `/` (de repository-root).
6. **Build command:** leeg laten / geen build nodig.
7. **Deploy command:** `npx wrangler deploy`.
8. Kies **Save and Deploy**. Cloudflare toont je eigen **`*.workers.dev`** URL.

Als je al een Worker hebt: ga naar die Worker → **Settings > Builds** → **Connect** en kies deze repository. Zorg dan dat de Workernaam exact `trending-emotes-dashboard` is.

> Dit repository is vanuit ChatGPT bijgewerkt. De Worker is pas openbaar als Cloudflare de GitHub-repository daadwerkelijk heeft gedeployed.

## Statistieken

- Live **CCU**, totaal bezoeken, favorieten, likes, dislikes, like-percentage (publieke Roblox-cijfers).
- Bewegende Roblox-gameafbeeldingen, animaties en responsief dashboard.
- Interactieve grafiek voor CCU, bezoeken, favorieten, likes en tijdfilters van 1 uur, 24 uur, 7 dagen en 30 dagen.
- Historische grafieken beginnen met **nieuwe metingen** zodra de site in gebruik is. Er is geen historische Roblox-data vóór de eerste meting beschikbaar.
- Retentie, FPS, conversie en Robux-inkomsten blijven bewust zonder getallen: die informatie vereist geautoriseerde Creator Analytics.

De API-routes zijn `/api/stats` en `/api/history?range=24h`.

## Optioneel: 24/7 historische data met Cloudflare D1

Standaard houdt het dashboard een lokale browsergeschiedenis bij; die wordt niet gedeeld tussen apparaten en loopt niet door als niemand de pagina opent. Voor echte doorlopende metingen:

1. Maak in je Cloudflare-account een **D1-database**, bijvoorbeeld `trending-emotes-metrics`.
2. Voeg in `wrangler.toml` onderaan de volgende configuratie toe met de **echte** ID van de database:

```toml
[[d1_databases]]
binding = "DB"
database_name = "trending-emotes-metrics"
database_id = "ZET-HIER-JE-ECHTE-D1-DATABASE-ID"
```

3. Commit de wijziging in GitHub. Cloudflare zal opnieuw deployen.
4. De Worker maakt bij de eerste meting zelf de tabel `samples` aan.
5. De cron in `wrangler.toml` haalt daarna elke 5 minuten een nieuwe meting op, ook wanneer niemand de website bezoekt.

`/api/history` toont dan metingen vanuit D1 in plaats van uit de browser. Dit is **gemeten piek-CCU**, niet een officieel historisch record uit Roblox.

## Als de live cijfers niet laden

Open `https://JOUW-WORKER-URL/api/stats`. Als je een fout ziet, controleer Cloudflare Worker Logs. Roblox kan API-verzoeken weigeren of beperken; dan blijft de website leesbaar maar worden ontbrekende cijfers niet verzonnen.

## Techniek

- Vanilla HTML/CSS/JS ingebed in `worker.js`.
- Cloudflare Workers en optionele D1.
- Geen privé Roblox API-sleutels nodig voor de openbare cijfers.
- Koppeling met jouw Roblox-experience is al ingevuld.
