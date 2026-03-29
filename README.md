# Hva skjer under overflaten i teamet ditt?

En selvstendig quizapp med fullt norsk innhold for å diagnostisere skjulte teammønstre. Appen er bygget som en lett frontend uten byggeverktøy, slik at den kan åpnes raskt lokalt eller deployes til valgfri statisk hosting.

## Innhold

- Premium mørk quizopplevelse med ett spørsmål per skjerm
- 14 spørsmål med definert scoring for `VOICE`, `TRUTH`, `RESIST`, `BELONG` og `POWER`
- Et avsluttende Q15-spørsmål for hjelpebehov og segmentering, med lett vekting
- E-postgate med lokal validering og innsending til konfigurerbart endepunkt
- Resultatlogikk med primary result, secondary result og severity
- Lagring av fremdrift i `localStorage`
- Tilbakeknapp og restart for nytt team
- Analytics hooks via `document`-event og valgfri global callback

## Filstruktur

- `index.html` – appskall og enkel runtime-konfigurasjon
- `styles.css` – dark premium visuelt uttrykk og responsiv layout
- `app.js` – spørsmål, scoring, state, resultater, innsending og rendering

## Kjør lokalt

Fra prosjektmappen:

```bash
cd "/Users/katmather/Documents/Codex Projects/team-surface-quiz"
python3 -m http.server 4173
```

Åpne deretter [http://localhost:4173](http://localhost:4173).

## Konfigurasjon

I `index.html` finnes en enkel global konfigurasjon:

```html
<script>
  window.QUIZ_CONFIG = {
    submissionEndpoint: "",
    submissionHeaders: {},
    bookingUrl: "",
  };
</script>
```

### `submissionEndpoint`

Sett denne til et API-endepunkt eller en webhook som tar imot JSON med:

```json
{
  "first_name": "Kari",
  "email": "kari@example.com",
  "role": "Senior leder",
  "primary_result": "VOICE",
  "secondary_result": "TRUTH",
  "severity": "MEDIUM",
  "helpPriority": "understand",
  "helpPriorityLabel": "Å forstå hva som faktisk skjer",
  "tags": [
    "quiz_voice",
    "quiz_secondary_truth",
    "quiz_medium",
    "role_senior_leder",
    "goal_understand"
  ]
}
```

Hvis `submissionEndpoint` er tom, lagres siste payload lokalt i `localStorage` under nøkkelen `team-surface-quiz-state-v1:latest-submission`.

### `bookingUrl`

Sett denne til ønsket bookingside for CTA-en `Book en samtale`. Hvis den er tom, faller appen tilbake til en enkel `mailto:`-lenke.

### Kajabi-tagging

Appen mapper automatisk:

- primærresultat til `quiz_voice`, `quiz_truth`, `quiz_resist`, `quiz_belong` eller `quiz_power`
- sekundærresultat til `quiz_secondary_*`
- alvorlighetsgrad til `quiz_low`, `quiz_medium` eller `quiz_high`
- rolle til `role_senior_leder`, `role_mellomleder` eller `role_annet`
- hjelpebehov fra Q15 til `goal_understand`, `goal_progress`, `goal_dynamics` eller `goal_collaboration`

## Om Q15

Q15 er en segmenterings- og intensjonsvariant, ikke en kjerne-diagnostisk vurdering på linje med Q1–Q14.

- Q1–Q14 driver hoveddiagnosen og severity
- Q15 er lett vektet og kan hjelpe ved tette scoreforskjeller mellom mønstre
- Q15 påvirker ikke severity
- Q15 brukes også til CTA-personalisering og tagging i e-post/Kajabi

## Analytics hooks

Appen eksponerer to enkle hooks:

1. Et DOM-event:

```js
document.addEventListener("quiz:analytics", (event) => {
  console.log(event.detail);
});
```

2. En valgfri global callback:

```js
window.quizAnalyticsHook = (event) => {
  console.log(event.name, event.payload);
};
```

Følgende hendelser brukes nå:

- `quiz_started`
- `quiz_answered`
- `quiz_gate_submitted`
- `quiz_help_priority_selected`
- `quiz_result_viewed`
- `quiz_book_call_clicked`
- `quiz_restart`

## Neste integrasjonstrinn

- Pek `Book en samtale` til riktig bookingside eller kalender
- Koble `submissionEndpoint` til Kajabi, Zapier eller egen backend
- Eventuelt legg inn en egen takkestrøm eller resultatspeiling i CRM
