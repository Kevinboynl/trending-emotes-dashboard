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

## Open Cloud privéstatistieken veilig publiceren (opt-in)

De website heeft nu een **publiek, alleen-lezen** endpoint: `GET /api/public-analytics`.
Deze route geeft **uitsluitend expliciet geselecteerde, geaggregeerde cijferreeksen** door.
Standaard staat publicatie **UIT**; bezoekers zien een nette melding totdat je beide instellingen activeert.
`/api/stats`, `/api/history`, D1-opslag en bestaande live-CCU-functies blijven ongewijzigd.

### 1. Roblox Open Cloud key

In het [Roblox Creator Dashboard](https://create.roblox.com/dashboard/credentials) maak je een API-sleutel voor **de Universe van TRENDING EMOTES!**.
Geef uitsluitend de scope `universe.analytics:read` bij `universe-analytics`.
Dit is geen Roblox-wachtwoord en je deelt hem **niet in chat, GitHub, screenshots, commits of publieke variabelen**.

### 2. Cloudflare secret instellen

Ga naar **Cloudflare Dashboard → Workers & Pages → trending-emotes-dashboard → Settings → Variables and Secrets** (de precieze menunamen kunnen afwijken).

Voeg een **Secret** toe (niet Plaintext):

| Name | Value | Type |
|---|---|---|
| `ROBLOX_ANALYTICS_API_KEY` | Je echte Roblox Open Cloud API-sleutel | **Secret** |

Er is geen API-sleutel in de repository opgeslagen. Je hoeft hem niet naar ChatGPT te sturen.

### 3. Kies expliciet welke geaggregeerde statistieken OPENBAAR zijn

Voeg een **Plaintext**-variabele toe met de naam `PUBLIC_ANALYTICS_METRICS`.
Schrijf hierin alleen de metricnamen die iedereen mag zien, gescheiden door komma's.

Bijvoorbeeld:

```text
DailyActiveUsers,AverageSessionLengthMinutes,ForwardD1Retention
```

Dit zijn de toegestane opties:

| Metricnaam | Openbare kaart | Opmerking |
|---|---|---|
| `DailyActiveUsers` | DAU | Dagelijkse actieve gebruikers |
| `Visits` | Sessions | Dagelijks aantal sessies; niet hetzelfde als unieke spelers |
| `AverageSessionLengthMinutes` | Session time | Gemiddelde sessieduur in minuten |
| `AveragePlayTimeMinutesPerDAU` | Playtime / DAU | Gemiddelde speeltijd per actieve gebruiker |
| `ForwardD1Retention` | D1 retention | **Ruwe API-waarde** zonder onzekere omzetting naar procenten |
| `ForwardD7Retention` | D7 retention | **Ruwe API-waarde** zonder onzekere omzetting naar procenten |

**Er zijn geen inkomsten, uitsplitsingen naar leeftijd/land of individuele spelersgegevens toegelaten.**
Niet-herkende namen worden genegeerd, en de browser kan geen andere metrics aanvragen.

Laat `PUBLIC_ANALYTICS_METRICS` leeg of verwijder de variabele om de openbare publicatie direct uit te schakelen.

**Optioneel:** voeg `ROBLOX_UNIVERSE_ID` als **Plaintext**-variabele toe wanneer de Universe ID-lookup niet lukt; gebruik het echte numerieke Universe ID uit Roblox Creator Dashboard, niet het Place ID `134944031090971`.

### 4. Controleer de site

Na het opslaan / opnieuw deployen:

- Open `https://trending-emotes-dashboard.k-backx.workers.dev/api/public-analytics`
- Bij geen selectie: `"state": "disabled"`
- Bij selectie maar geen secret: `"state": "not_configured"`
- Bij een werkende koppeling: `"state": "ready"` of `"partial"` met uitsluitend geselecteerde metrics
- Bij een niet-beschikbare metric: `"state": "unavailable"` in de betreffende kaart
- Bij langzaam laden: `"state": "pending"`

De blauwe **OFFICIAL INSIGHTS**-sectie wordt automatisch met de geselecteerde geaggregeerde gegevens gevuld.
Alle data bestaat uit afgeronde UTC-dagen (de API-query eindigt bij middernacht UTC). De weergave toont maximaal 31 dagen en cachet het resultaat in-memory maximaal 10 minuten.

### Beveiliging en privacy

- Roblox-aanvragen gaan **alleen vanuit de Worker** met de geheime `x-api-key` header.
- Geen client-side API-key, geen aanname van een wachtwoord, geen publiek query-endpoint voor willekeurige metricnamen.
- GET-only endpoint; niet alle privéstatistieken worden zomaar openbaar gemaakt.
- Pending Open Cloud-opdrachten worden maximaal tweemaal opgevraagd per request.
- Projected / NotStatisticallySignificant datapoints worden niet gepubliceerd.
- API-fouten tonen neutrale foutmeldingen en geen gevoelige foutdetails.
- Deze koppeling gebruikt de [officiële Roblox Analytics Query API](https://create.roblox.com/docs/cloud/guides/analytics).

**Let op:** het aanmaken van de Cloudflare Secret is een eenmalige actie die de eigenaar zelf in Cloudflare moet uitvoeren. GitHub mag de sleutel nooit bevatten.
