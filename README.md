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

## Iedereen de geselecteerde statistieken laten bekijken

Je website is openbaar. De route `/api/public-analytics` vereist **geen bezoekerslogin**. Alleen de twee metrics uit
`PUBLIC_ANALYTICS_METRICS = "DailyActiveUsers,AverageSessionLengthMinutes"` worden als geaggregeerde cijfers zichtbaar.
De API-key wordt uitsluitend in de Cloudflare Worker gebruikt en nooit gepubliceerd.

### Wat betekent `state: unavailable`?

De publicatie staat aan, maar de Worker kreeg nog geen bruikbare gegevens van Roblox. In de nieuwste versie hebben metrics nu
een veilige `reason` zodat jij kunt zien wat je moet oplossen, zonder de API-key te tonen:

- `authorization`: controleer of de API-key `universe.analytics:read` heeft voor **de juiste Universe ID** en of de key-eigenaar toegang heeft tot de analytics van de groepsgame. De lock van de groep kan hier mogelijk mee samenhangen.
- `request_invalid`: Roblox wijst deze metric of de query af.
- `no_data`: Roblox heeft in de laatste 31 volledig afgesloten UTC-dagen geen definitieve numerieke meetpunten teruggestuurd.
- `pending`: de query is nog in verwerking.
- `rate_limited` / `upstream`: tijdelijke Roblox-beperking of storing.
- `universe_lookup`: controleer of het numerieke universe ID is gevonden. Optioneel `ROBLOX_UNIVERSE_ID` als **niet-geheime Plaintext-variabele** instellen.
- `invalid_response`: onverwacht responseformaat.

Open na de volgende Cloudflare-deployment
`https://trending-emotes-dashboard.k-backx.workers.dev/api/public-analytics`.
De `reason` staat per metric. Stuur **nooit** de API-key zelf of een screenshot waarop hij zichtbaar is.

De website toont een waarde pas zodra Roblox die werkelijk retourneert. Er worden geen willekeurige of verzonnen waarden gegenereerd.

## UI-upgrade zonder kleurverandering (22 november 2026)

De premium redesign gebruikt **exact dezelfde kleurvariabelen als de bestaande blauwe KVN CLOTHING-website**.
Er is geen nieuw kleurenpalet toegevoegd. Nieuwe UI-code staat los van de beveiligde backend in
`refinements.js`, zodat API-endpoints en Cloudflare D1 intact blijven.

Verbeteringen: actieve sticky navigatie, geanimeerde tabs, verfijnde grafiektooltip, interactieve crosshair,
zachte kaart-hover en lichte 3D tilt op desktops met een precieze aanwijzer, loading skeletons,
getekende mini-grafieken **uitsluitend met echte historische meetpunten**, soepel getekende hoofdgrafiek,
staggered card reveals en verbeterde mobiele spacing. Bij `prefers-reduced-motion` zijn de effecten beperkt.

Deze wijzigingen zijn via GitHub doorgevoerd. Een geslaagde Cloudflare-deployment en echte Roblox-data
moeten worden gecontroleerd in het Cloudflare-dashboard; een lokale mocktest is geen bewijs van
een succesvolle productie-deployment.

### Nieuwe API-diagnose bij een Roblox-authenticatiefout

De openbare API blijft `/api/public-analytics`. Na de nieuwste code-update:

- `key_or_scope` = Roblox antwoordt met HTTP **401**. Controleer of de Cloudflare Secret exact de geldige User API Key bevat; selecteer in de Roblox Open Cloud API-key editor `universe-analytics` → `universe.analytics:read` en selecteer expliciet de juiste **Universe**.
- `creator_access` = Roblox antwoordt met HTTP **403**. De API-key kan geldig zijn, maar de eigenaar van die key mag de analytics van deze groepsgame mogelijk niet inzien. Controleer de rol/toegang van dat Roblox-account. Een groepslock kan daarbij meespelen, maar bewijst op zichzelf niets.
- Geen van deze fouten wordt opgelost door de publieke metrics-variabele uit te breiden. De dashboardbezoekers hebben geen Roblox-account of API-key nodig.

Het endpoint toont alleen de veilige foutcategorie. **Nooit** de API-key in berichten, GitHub of screenshots zetten.

## In-game Roblox statistiekenwidget (optioneel)

Wil je de *echt gemeten* geaggregeerde DAU en gemiddelde sessieduur **in TRENDING EMOTES! zelf** tonen? De scripts staan in de [roblox map](./roblox):

- [`KVNPublicAnalytics.server.lua`](./roblox/KVNPublicAnalytics.server.lua): ServerScriptService → nieuw **Script**. De server vraagt de bestaande publieke `/api/public-analytics` route elke 10 minuten op, valideert de velden en stuurt alleen twee publieke cijfers naar de spelers.
- [`KVNPublicAnalytics.client.lua`](./roblox/KVNPublicAnalytics.client.lua): StarterPlayer → StarterPlayerScripts → nieuw **LocalScript**. Toont een klein, optioneel blauw game-stats-venster dat op pc en mobiel kan worden geopend.

### Installeren zonder downloaden

1. Open de eerste GitHub-file, klik op **Raw** (of kopieer de code), en plak alles in een **Script** in `ServerScriptService`.
2. Open de tweede GitHub-file en plak alles in een **LocalScript** in `StarterPlayer > StarterPlayerScripts`.
3. Zet in Roblox Studio bij **Game Settings → Security → Allow HTTP Requests** de instelling op **On**.
4. Test met **Play**; je ziet rechts een kleine knop **GAME STATS**. Klik voor DAU en session time. De eerste meting wordt alleen getoond zodra de openbare dashboard-API deze cijfers werkelijk levert.
5. Publiceer je Roblox experience vanuit Studio wanneer je groeps- en accountrechten dit toestaan.

**Geen Roblox API-key of Cloudflare Secret in Roblox Studio plaatsen.** Het script roept uitsluitend de URL `https://trending-emotes-dashboard.k-backx.workers.dev/api/public-analytics` aan en krijgt *alleen* jouw reeds openbaar gemaakte geaggregeerde cijfers. De Roblox Studio gamefiles zijn niet gekoppeld aan deze GitHub-repository: de bestanden zijn **klaar om te installeren, maar nog niet toegevoegd of gepubliceerd in je echte Roblox-game**.

Dit in-game widget vervangt je bestaande emote-UI niet. Als je eigen interface op dezelfde plek staat, wijzig dan alleen de `Position` van `OpenStats` en `StatsPanel` in het LocalScript.
