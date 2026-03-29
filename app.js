const STORAGE_KEY = "team-surface-quiz-state-v1";
const PATTERNS = ["VOICE", "TRUTH", "RESIST", "BELONG", "POWER"];

const PATTERN_LABELS = {
  VOICE: "Skjev fordeling av plass og stemme",
  TRUTH: "Unnvikelse av ubehagelige sannheter",
  RESIST: "Skjult motstand",
  BELONG: "Tilhørighet og ekskludering",
  POWER: "Uformelle maktstrukturer",
};

const ROLE_TAGS = {
  "Senior leder": "role_senior_leder",
  Mellomleder: "role_mellomleder",
  Annet: "role_annet",
  "": "role_annet",
};

const HELP_PRIORITY_META = {
  understand: {
    label: "Å forstå hva som faktisk skjer",
    tag: "goal_understand",
    resultCopy:
      "Å få et tydeligere bilde av hva som faktisk skjer i teamet – før du prøver å løse det. Når underliggende mønstre blir tydeligere, blir det også lettere å vite hvor du skal sette inn innsatsen.",
    ctaSupport:
      "Hvis du ønsker å forstå hva som faktisk skjer i teamet ditt, kan en samtale være et nyttig sted å starte.",
  },
  progress: {
    label: "Å få bedre fremdrift",
    tag: "goal_progress",
    resultCopy:
      "Å få bedre fremdrift uten å presse hardere. Når teamet stopper opp, handler det ofte mindre om kapasitet og mer om det som ikke er avklart eller ikke blir sagt.",
    ctaSupport:
      "Hvis du ønsker mer fremdrift uten mer friksjon, kan en samtale være et nyttig neste steg.",
  },
  dynamics: {
    label: "Å håndtere krevende dynamikk i teamet",
    tag: "goal_dynamics",
    resultCopy:
      "Å forstå og håndtere den krevende dynamikken i teamet på en måte som skaper mer trygghet og mindre friksjon. Det begynner ofte med å gjøre mønstrene synlige.",
    ctaSupport:
      "Hvis du står i krevende dynamikk i teamet ditt, kan det være nyttig å se nærmere på hva som faktisk driver det.",
  },
  collaboration: {
    label: "Å skape tydeligere samarbeid og ansvar",
    tag: "goal_collaboration",
    resultCopy:
      "Å skape tydeligere samarbeid, ansvar og felles retning. Når roller, forventninger og beslutningsgrenser blir tydeligere, blir det også lettere å jobbe sammen på en god måte.",
    ctaSupport:
      "Hvis du ønsker tydeligere samarbeid og ansvar i teamet, kan en samtale være et godt sted å begynne.",
  },
};

const RESULT_CONTENT = {
  VOICE: {
    title: "Arbeidsmiljøet ditt preges av skjev fordeling av plass og stemme",
    diagnostic:
      "I teamet ditt ser det ut til at noen stemmer får mer plass enn andre. Det påvirker ikke bare møtene, men også hvilke perspektiver som blir hørt, hvilke spørsmål som blir stilt, og hva som faktisk blir mulig å si høyt.",
    showsAs: [
      "de samme personene snakker mest",
      "uenighet blir holdt tilbake",
      "viktige innspill kommer for sent eller ikke i det hele tatt",
    ],
    under:
      "Dette handler ikke alltid om sterke personligheter alene. Ofte handler det om svak møtestruktur, uklare rammer for deltakelse, eller lav trygghet for å utfordre det som allerede dominerer.",
    nextStep:
      "Se nærmere på hvordan samtaler faktisk er strukturert. Hvem får ordet først? Hvem oppsummerer? Hvem blir ikke invitert inn?",
  },
  TRUTH: {
    title: "Arbeidsmiljøet ditt preges av unnvikelse av ubehagelige sannheter",
    diagnostic:
      "I teamet ditt ser det ut til at det som er vanskelig ofte blir gjort mer teknisk, mer uklart eller skjøvet videre. Det gir ofte inntrykk av fremdrift, men forsinker de samtalene som faktisk må tas.",
    showsAs: [
      "analyser og detaljer tar over når beslutninger nærmer seg",
      "tema glir unna det viktigste",
      "folk snakker rundt problemet mer enn om det",
    ],
    under:
      "Dette oppstår ofte når konsekvensene av ærlighet føles høye. Da blir vaghet, utsettelser og omveier en måte å håndtere usikkerhet på.",
    nextStep:
      "Prøv å tydeliggjøre hva det faktisk er teamet skal ta stilling til. Hvilket spørsmål prøver dere egentlig å unngå?",
  },
  RESIST: {
    title: "Arbeidsmiljøet ditt preges av skjult motstand",
    diagnostic:
      "I teamet ditt kan det se ut som om enighet ikke alltid betyr reell forpliktelse. Ting virker avklart i rommet, men mister fart i etterkant. Det skaper treghet, gjentatte diskusjoner og uklar fremdrift.",
    showsAs: [
      "folk sier ja, men følger ikke opp",
      "beslutninger må tas opp igjen",
      "fremdrift stopper uten tydelig motstand",
    ],
    under:
      "Skjult motstand handler sjelden om latskap. Oftere handler det om uuttalte bekymringer, konkurrerende prioriteringer eller lav trygghet for å si nei direkte.",
    nextStep:
      "Se på hvordan forpliktelse blir avklart. Er det tydelig hvem som eier hva, hva som faktisk er besluttet, og hva som fortsatt er usagt?",
  },
  BELONG: {
    title: "Arbeidsmiljøet ditt preges av tilhørighet og ekskludering",
    diagnostic:
      "I teamet ditt ser det ut til at sosial plass og anerkjennelse påvirker samarbeidet mer enn det burde. Noen bidrag får mindre respons, noen personer blir lettere stående utenfor, og ikke alle opplever at stemmen deres teller likt.",
    showsAs: [
      "ideer blir oversett eller plukket opp av andre",
      "enkelte personer møtes med stillhet",
      "det er tryggere for noen å bidra enn for andre",
    ],
    under:
      "Dette er ofte et tegn på statusforskjeller, lav trygghet eller ubevisste mønstre for hvem som får anerkjennelse og plass.",
    nextStep:
      "Legg merke til hva som faktisk skjer i rommet når folk bidrar. Hvem blir møtt? Hvem blir stående alene? Og hva lærer teamet av det over tid?",
  },
  POWER: {
    title: "Arbeidsmiljøet ditt preges av uformelle maktstrukturer",
    diagnostic:
      "I teamet ditt ser det ut til at innflytelse ikke bare følger formelle roller. Noen relasjoner, allianser eller informasjonslinjer ser ut til å påvirke mer enn det som er synlig i strukturene.",
    showsAs: [
      "beslutninger virker tatt før møtet starter",
      "noen vet mer enn andre",
      "samarbeid påvirkes av hvem som står nær hvem",
    ],
    under:
      "Dette skjer ofte når roller, beslutningsgrenser eller informasjonsflyt er uklare. Da vokser de uformelle strukturene i betydning.",
    nextStep:
      "Se på hvor beslutninger faktisk blir formet. Skjer det i de formelle rommene – eller et annet sted?",
  },
};

const SECONDARY_SNIPPETS = {
  VOICE: {
    TRUTH:
      "I tillegg tyder svarene dine på at det som er vanskelig ofte blir dempet eller omveid, ikke bare dominert. Det betyr at både plass i rommet og hva som faktisk sies høyt er viktige deler av bildet.",
    RESIST:
      "I tillegg tyder svarene på at svak fremdrift ikke bare handler om hvem som får plass, men også om at enighet ikke blir til faktisk handling.",
    BELONG:
      "I tillegg ser det ut til at dette også påvirker hvem som kjenner seg inkludert, hørt og trygge nok til å bidra.",
    POWER:
      "I tillegg tyder svarene på at noen stemmer får plass ikke bare på grunn av stil, men også fordi de står nær uformell innflytelse.",
  },
  TRUTH: {
    VOICE:
      "I tillegg tyder svarene dine på at hvem som får plass i samtalene også påvirker hvilke sannheter som slipper frem.",
    RESIST:
      "I tillegg ser det ut til at det som ikke blir sagt tydelig, senere viser seg som treghet eller manglende oppfølging.",
    BELONG:
      "I tillegg kan det se ut til at ikke alle opplever samme trygghet til å løfte det som er vanskelig.",
    POWER:
      "I tillegg tyder svarene på at noen temaer blir formet av makt og relasjoner like mye som av fakta.",
  },
  RESIST: {
    VOICE:
      "I tillegg kan det se ut til at enkelte stemmer preger retningen mer enn andre, noe som gjør det vanskeligere å få reell forpliktelse i hele teamet.",
    TRUTH:
      "I tillegg tyder svarene dine på at det finnes ting som ikke blir sagt tydelig nok, og som senere kommer ut som treghet eller glipp.",
    BELONG:
      "I tillegg kan skjult motstand være koblet til at ikke alle kjenner seg trygge eller likeverdige i samarbeidet.",
    POWER:
      "I tillegg ser det ut til at uformell innflytelse spiller inn på hva som faktisk blir fulgt opp.",
  },
  BELONG: {
    VOICE:
      "I tillegg tyder svarene på at plass i samtalene er ujevnt fordelt, noe som forsterker hvem som kjenner seg innenfor og utenfor.",
    TRUTH:
      "I tillegg kan manglende trygghet gjøre det vanskeligere å si det som faktisk er sant eller viktig.",
    RESIST:
      "I tillegg ser det ut til at det som ikke får rom i relasjonene, senere kan vise seg som lav forpliktelse eller treg oppfølging.",
    POWER:
      "I tillegg tyder svarene dine på at sosial plass og uformell innflytelse henger tett sammen i teamet.",
  },
  POWER: {
    VOICE:
      "I tillegg kan det se ut til at uformell innflytelse også former hvem som får mest plass i rommet.",
    TRUTH:
      "I tillegg tyder svarene på at noen sannheter er vanskeligere å løfte fordi maktforholdene rundt dem er uklare.",
    RESIST:
      "I tillegg ser det ut til at uformelle strukturer påvirker hva som faktisk blir fulgt opp etter beslutninger.",
    BELONG:
      "I tillegg kan disse strukturene også påvirke hvem som føler tilhørighet, og hvem som blir stående litt utenfor.",
  },
};

const SEVERITY_COPY = {
  LOW: "Akkurat nå ser dette mest ut som et mønster det er nyttig å bli bevisst på tidlig. Det betyr ikke nødvendigvis at teamet er fastlåst, men at det finnes signaler som er verdt å ta på alvor før de setter seg sterkere i kultur og samarbeid.",
  MEDIUM:
    "Dette ser ut til å være tydelig nok til at det påvirker samarbeid og fremdrift i praksis. Det betyr ikke at teamet mangler vilje eller kompetanse, men at noen underliggende forhold gjør arbeidet tyngre enn det trenger å være.",
  HIGH: "Dette ser ut til å ha blitt så tydelig at det sannsynligvis påvirker både tillit, beslutningskvalitet og gjennomføring. Når slike mønstre får virke over tid, koster det ofte mer enn man tror – ikke bare i energi, men også i kvaliteten på arbeidet og evnen til å stå samlet.",
};

const QUESTIONS = [
  {
    id: "Q1",
    prompt: "Når noe viktig skal besluttes i teamet ditt, hva skjer oftest?",
    options: [
      { key: "A", text: "De rette personene blir involvert, og beslutningen blir tydelig", scores: {}, severity: 0 },
      { key: "B", text: "Noen få stemmer tar mest plass i rommet", scores: { VOICE: 3 }, severity: 2 },
      { key: "C", text: "Diskusjonen går bredt, men det blir uklart hva som faktisk er besluttet", scores: { TRUTH: 1, RESIST: 2 }, severity: 2 },
      { key: "D", text: "Beslutningen virker egentlig tatt før møtet starter", scores: { POWER: 3 }, severity: 2 },
    ],
  },
  {
    id: "Q2",
    prompt: "Hva skjer oftest etter at teamet har blitt enig om noe viktig?",
    options: [
      { key: "A", text: "Ting går stort sett som avtalt", scores: {}, severity: 0 },
      { key: "B", text: "Fremdriften stopper opp uten at noen sier tydelig nei", scores: { RESIST: 3 }, severity: 2 },
      { key: "C", text: "Beslutningen blir tatt opp igjen senere", scores: { RESIST: 2, TRUTH: 1 }, severity: 2 },
      { key: "D", text: "Folk virker enige i rommet, men gjør noe annet etterpå", scores: { RESIST: 3, TRUTH: 1 }, severity: 3 },
    ],
  },
  {
    id: "Q3",
    prompt: "Hvordan oppleves møtene i teamet ditt?",
    options: [
      { key: "A", text: "Ganske tydelige og nyttige", scores: {}, severity: 0 },
      { key: "B", text: "De samme personene snakker mest", scores: { VOICE: 3 }, severity: 2 },
      { key: "C", text: "Mange snakker, men temaet glir unna det viktigste", scores: { TRUTH: 3 }, severity: 2 },
      { key: "D", text: "Det er vanskelig å si det man egentlig tenker", scores: { BELONG: 1, VOICE: 1, TRUTH: 1 }, severity: 3 },
    ],
  },
  {
    id: "Q4",
    prompt: "Hva skjer når noen løfter et vanskelig eller ubehagelig tema?",
    options: [
      { key: "A", text: "Det blir vanligvis tatt tak i ganske direkte", scores: {}, severity: 0 },
      { key: "B", text: "Samtalen blir fort mer teknisk eller vag", scores: { TRUTH: 3 }, severity: 2 },
      { key: "C", text: "Temaet blir skjøvet videre til senere", scores: { TRUTH: 2, RESIST: 1 }, severity: 2 },
      { key: "D", text: "Personen som løftet det mister litt plass i rommet", scores: { BELONG: 2, VOICE: 1 }, severity: 3 },
    ],
  },
  {
    id: "Q5",
    prompt: "Hvilket av dette ligner mest på hverdagen i teamet ditt?",
    options: [
      { key: "A", text: "Ideer vurderes stort sett ut fra innhold", scores: {}, severity: 0 },
      { key: "B", text: "Noen ideer blir først tatt på alvor når “riktig” person sier dem", scores: { BELONG: 2, POWER: 1 }, severity: 2 },
      { key: "C", text: "Enkelte personer blir ofte oversett eller møtt med stillhet", scores: { BELONG: 3 }, severity: 2 },
      { key: "D", text: "Det finnes noen uformelle allianser som preger mye", scores: { POWER: 3 }, severity: 2 },
    ],
  },
  {
    id: "Q6",
    prompt: "Når fremdrift stopper opp, hva ser du oftest?",
    options: [
      { key: "A", text: "Prioriteringer endrer seg", scores: {}, severity: 1 },
      { key: "B", text: "Godkjenninger eller svar blir hengende", scores: { RESIST: 2, POWER: 1 }, severity: 2 },
      { key: "C", text: "Nye spørsmål og analyser dukker opp", scores: { TRUTH: 3 }, severity: 2 },
      { key: "D", text: "Ingen sier stopp, men likevel skjer det lite", scores: { RESIST: 3 }, severity: 3 },
    ],
  },
  {
    id: "Q7",
    prompt: "Hvordan vil du beskrive informasjonsflyten i eller rundt teamet?",
    options: [
      { key: "A", text: "Relativt åpen og tydelig", scores: {}, severity: 0 },
      { key: "B", text: "Viktig informasjon kommer sent til noen", scores: { POWER: 1, BELONG: 1 }, severity: 1 },
      { key: "C", text: "Ulike personer presenterer ulike bilder av samme sak", scores: { TRUTH: 3 }, severity: 2 },
      { key: "D", text: "Det føles som om noen alltid vet mer enn andre", scores: { POWER: 3 }, severity: 2 },
    ],
  },
  {
    id: "Q8",
    prompt: "Hva skjer oftest med ansvar hos dere?",
    options: [
      { key: "A", text: "Ansvar og eierskap er ganske tydelig", scores: {}, severity: 0 },
      { key: "B", text: "Flere tror andre eier oppgaven", scores: { RESIST: 2, TRUTH: 1 }, severity: 2 },
      { key: "C", text: "Ansvar flyter oppover i systemet", scores: { POWER: 2, RESIST: 1 }, severity: 2 },
      { key: "D", text: "Ansvar blir uklart når ting blir vanskelig eller sensitivt", scores: { TRUTH: 1, POWER: 1, RESIST: 1 }, severity: 3 },
    ],
  },
  {
    id: "Q9",
    prompt: "Hvordan reagerer folk i teamet når de er uenige?",
    options: [
      { key: "A", text: "De sier det ganske tydelig", scores: {}, severity: 0 },
      { key: "B", text: "De er forsiktige i rommet og tydeligere etterpå", scores: { RESIST: 2, BELONG: 1 }, severity: 2 },
      { key: "C", text: "De holder tilbake fordi noen personer dominerer", scores: { VOICE: 3 }, severity: 2 },
      { key: "D", text: "De unngår å si det direkte", scores: { TRUTH: 2, BELONG: 1 }, severity: 2 },
    ],
  },
  {
    id: "Q10",
    prompt: "Hva kjennetegner kulturen i teamet ditt mest akkurat nå?",
    options: [
      { key: "A", text: "Samarbeid og tydelighet", scores: {}, severity: 0 },
      { key: "B", text: "Slitenhet og kortsiktighet", scores: { RESIST: 1, TRUTH: 1 }, severity: 2 },
      { key: "C", text: "Forsiktighet og understrømmer", scores: { BELONG: 2, TRUTH: 1 }, severity: 2 },
      { key: "D", text: "Mange parallelle agendaer", scores: { POWER: 2, RESIST: 1 }, severity: 2 },
    ],
  },
  {
    id: "Q11",
    prompt: "Hva opplever du som den største kostnaden ved dette akkurat nå?",
    options: [
      { key: "A", text: "Treg fremdrift", scores: { RESIST: 2 }, severity: 2 },
      { key: "B", text: "Dårligere beslutninger", scores: { TRUTH: 1, POWER: 1, RESIST: 1 }, severity: 2 },
      { key: "C", text: "Lavere tillit", scores: { BELONG: 2 }, severity: 2 },
      { key: "D", text: "Mer energi går til å navigere enn til å skape verdi", scores: { POWER: 1, RESIST: 1, TRUTH: 1, BELONG: 1 }, severity: 3 },
    ],
  },
  {
    id: "Q12",
    prompt: "Hvor merkes dette sterkest?",
    options: [
      { key: "A", text: "I ledermøter eller beslutningsfora", scores: { POWER: 1, VOICE: 1 }, severity: 1 },
      { key: "B", text: "I samarbeid på tvers", scores: { POWER: 2, TRUTH: 1 }, severity: 2 },
      { key: "C", text: "I oppfølgingen etter beslutninger", scores: { RESIST: 3 }, severity: 2 },
      { key: "D", text: "I hvem som blir hørt og hvem som blir stående utenfor", scores: { BELONG: 3 }, severity: 2 },
    ],
  },
  {
    id: "Q13",
    prompt: "Hvis du skulle beskrive det med ett uttrykk, hva passer best?",
    options: [
      { key: "A", text: "Vi trenger mer retning", scores: { TRUTH: 1, RESIST: 1 }, severity: 1 },
      { key: "B", text: "Vi sier ja, men det glipper i gjennomføringen", scores: { RESIST: 3 }, severity: 2 },
      { key: "C", text: "Det er ting som ikke blir sagt høyt", scores: { TRUTH: 2, BELONG: 1 }, severity: 2 },
      { key: "D", text: "Noen har mer innflytelse enn det som er synlig", scores: { POWER: 3 }, severity: 2 },
    ],
  },
  {
    id: "Q14",
    prompt: "Hvor alvorlig opplever du at dette er akkurat nå?",
    options: [
      { key: "A", text: "Mer et irritasjonsmoment enn et reelt hinder", scores: {}, severity: 0 },
      { key: "B", text: "Det hemmer samarbeid merkbart", scores: {}, severity: 1 },
      { key: "C", text: "Det påvirker beslutninger og fremdrift tydelig", scores: {}, severity: 2 },
      { key: "D", text: "Det begynner å få tydelige konsekvenser for tillit, resultater eller kultur", scores: {}, severity: 3 },
    ],
  },
  {
    id: "Q15",
    prompt: "Hva ønsker du mest hjelp til akkurat nå?",
    affectsSeverity: false,
    softWeight: true,
    options: [
      {
        key: "A",
        text: "Å forstå hva som faktisk skjer",
        value: "understand",
        helpPriority: "understand",
        scores: { TRUTH: 1, POWER: 1 },
        severity: 0,
      },
      {
        key: "B",
        text: "Å få bedre fremdrift",
        value: "progress",
        helpPriority: "progress",
        scores: { RESIST: 2 },
        severity: 0,
      },
      {
        key: "C",
        text: "Å håndtere krevende dynamikk i teamet",
        value: "dynamics",
        helpPriority: "dynamics",
        scores: { BELONG: 1, VOICE: 1, POWER: 1 },
        severity: 0,
      },
      {
        key: "D",
        text: "Å skape tydeligere samarbeid og ansvar",
        value: "collaboration",
        helpPriority: "collaboration",
        scores: { RESIST: 1, TRUTH: 1, VOICE: 1 },
        severity: 0,
      },
    ],
  },
];

const defaultState = {
  stage: "landing",
  currentQuestionIndex: 0,
  answers: {},
  lead: {
    firstName: "",
    email: "",
    role: "",
    consent: false,
  },
  helpPriority: "",
  submissionStatus: "idle",
  submissionMessage: "",
  results: null,
};

let state = loadState();
const app = document.querySelector("#app");

render();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return structuredClone(defaultState);
    }

    const parsed = JSON.parse(raw);
    return {
      ...structuredClone(defaultState),
      ...parsed,
      lead: {
        ...structuredClone(defaultState).lead,
        ...parsed.lead,
      },
    };
  } catch {
    return structuredClone(defaultState);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function setState(patch) {
  state = { ...state, ...patch };
  saveState();
  render();
}

function updateLead(patch) {
  state = {
    ...state,
    lead: {
      ...state.lead,
      ...patch,
    },
  };
  saveState();
}

function resetQuiz() {
  state = structuredClone(defaultState);
  saveState();
  trackEvent("quiz_restart", { source: "user_action" });
  render();
}

function answerQuestion(questionId, optionKey) {
  const question = getQuestionById(questionId);
  const selectedOption = question?.options?.find((item) => item.key === optionKey);
  const nextAnswers = {
    ...state.answers,
    [questionId]: optionKey,
  };

  const isLastQuestion = state.currentQuestionIndex === QUESTIONS.length - 1;
  const nextState = {
    ...state,
    answers: nextAnswers,
    helpPriority: selectedOption?.helpPriority || state.helpPriority,
    currentQuestionIndex: isLastQuestion ? state.currentQuestionIndex : state.currentQuestionIndex + 1,
    stage: isLastQuestion ? "gate" : "question",
  };

  state = nextState;
  saveState();
  trackEvent("quiz_answered", {
    question_id: questionId,
    answer_key: optionKey,
    question_index: state.currentQuestionIndex + 1,
  });
  if (questionId === "Q15" && selectedOption?.helpPriority) {
    trackEvent("quiz_help_priority_selected", {
      selected_value: selectedOption.helpPriority,
      selected_label: HELP_PRIORITY_META[selectedOption.helpPriority]?.label || selectedOption.text,
    });
  }
  render();
}

function goBack() {
  if (state.stage === "question") {
    if (state.currentQuestionIndex === 0) {
      setState({ stage: "landing" });
      return;
    }

    setState({ currentQuestionIndex: state.currentQuestionIndex - 1 });
    return;
  }

  if (state.stage === "gate") {
    setState({ stage: "question", currentQuestionIndex: QUESTIONS.length - 1 });
    return;
  }

  if (state.stage === "result") {
    setState({ stage: "gate" });
  }
}

function startQuiz() {
  const answeredCount = Object.keys(state.answers).length;
  trackEvent("quiz_started", { resumed: answeredCount > 0 });

  setState({
    stage: "question",
    currentQuestionIndex: answeredCount > 0 && answeredCount < QUESTIONS.length ? answeredCount : 0,
  });
}

function getQuestionById(questionId) {
  return QUESTIONS.find((question) => question.id === questionId);
}

function calculateResults(answers) {
  const coreTotals = Object.fromEntries(PATTERNS.map((pattern) => [pattern, 0]));
  const softTotals = Object.fromEntries(PATTERNS.map((pattern) => [pattern, 0]));
  const totals = Object.fromEntries(PATTERNS.map((pattern) => [pattern, 0]));
  const maxAnswerCounts = Object.fromEntries(PATTERNS.map((pattern) => [pattern, 0]));
  let severityTotal = 0;
  let helpPriority = "";

  QUESTIONS.forEach((question) => {
    const answerKey = answers[question.id];
    if (!answerKey) return;

    const option = question.options.find((item) => item.key === answerKey);
    if (!option) return;

    if (question.affectsSeverity !== false) {
      severityTotal += option.severity;
    }

    if (option.helpPriority) {
      helpPriority = option.helpPriority;
    }

    Object.entries(option.scores).forEach(([pattern, value]) => {
      if (question.softWeight) {
        softTotals[pattern] += value;
      } else {
        coreTotals[pattern] += value;
      }
      totals[pattern] += value;
      if (value === 3) {
        maxAnswerCounts[pattern] += 1;
      }
    });
  });

  const severity =
    severityTotal <= 10 ? "LOW" : severityTotal <= 20 ? "MEDIUM" : "HIGH";

  const rankedPatterns = [...PATTERNS].sort((left, right) =>
    comparePatterns(left, right, totals, maxAnswerCounts, answers)
  );

  const primary = rankedPatterns[0];
  const secondary = rankedPatterns[1] || primary;
  const helpMeta = HELP_PRIORITY_META[helpPriority] || null;

  return {
    primary,
    primaryResult: primary,
    secondary,
    secondaryResult: secondary,
    severity,
    severityTotal,
    helpPriority,
    helpPriorityLabel: helpMeta?.label || "",
    helpPriorityTag: helpMeta?.tag || "",
    totals,
    coreTotals,
    softTotals,
    maxAnswerCounts,
    tags: buildTags(primary, secondary, severity, state.lead.role, helpPriority),
  };
}

function comparePatterns(left, right, totals, maxAnswerCounts, answers) {
  if (totals[right] !== totals[left]) {
    return totals[right] - totals[left];
  }

  if (maxAnswerCounts[right] !== maxAnswerCounts[left]) {
    return maxAnswerCounts[right] - maxAnswerCounts[left];
  }

  return getLatestIdentityWeight(right, answers) - getLatestIdentityWeight(left, answers);
}

function getLatestIdentityWeight(pattern, answers) {
  const identityQuestions = QUESTIONS.filter((question) =>
    ["Q10", "Q11", "Q12", "Q13"].includes(question.id)
  );
  for (let index = identityQuestions.length - 1; index >= 0; index -= 1) {
    const question = identityQuestions[index];
    const answerKey = answers[question.id];
    const option = question.options.find((item) => item.key === answerKey);
    const value = option?.scores?.[pattern] ?? 0;
    if (value > 0) {
      return (index + 1) * 10 + value;
    }
  }
  return 0;
}

function buildTags(primary, secondary, severity, role, helpPriority) {
  const primaryTag = `quiz_${primary.toLowerCase()}`;
  const secondaryTag = `quiz_secondary_${secondary.toLowerCase()}`;
  const severityTag = `quiz_${severity.toLowerCase()}`;
  const roleTag = ROLE_TAGS[role] || ROLE_TAGS[""];
  const helpPriorityTag = HELP_PRIORITY_META[helpPriority]?.tag;

  return [primaryTag, secondaryTag, severityTag, roleTag, helpPriorityTag].filter(Boolean);
}

async function submitLeadForm(event) {
  event.preventDefault();

  const firstName = state.lead.firstName.trim();
  const email = state.lead.email.trim();
  const role = state.lead.role;
  const consent = Boolean(state.lead.consent);

  if (!firstName || !email || !consent) {
    setState({
      submissionStatus: "error",
      submissionMessage: "Fyll inn fornavn, e-post og huk av for samtykke for å se diagnosen.",
    });
    return;
  }

  const results = calculateResults(state.answers);
  const payload = {
    first_name: firstName,
    email,
    role,
    primary_result: results.primary,
    secondary_result: results.secondary,
    severity: results.severity,
    helpPriority: results.helpPriority,
    helpPriorityLabel: results.helpPriorityLabel,
    helpPriorityTag: results.helpPriorityTag,
    tags: results.tags,
  };

  state = {
    ...state,
    submissionStatus: "submitting",
    submissionMessage: "",
    results,
  };
  saveState();
  render();

  trackEvent("quiz_gate_submitted", payload);

  try {
    await sendSubmission(payload);
    state = {
      ...state,
      submissionStatus: "success",
      submissionMessage: "Diagnosen er sendt og klar på skjermen.",
      stage: "result",
    };
    saveState();
    trackEvent("quiz_result_viewed", {
      primary_result: results.primary,
      secondary_result: results.secondary,
      severity: results.severity,
      helpPriority: results.helpPriority,
    });
    render();
  } catch (error) {
    console.error(error);
    state = {
      ...state,
      submissionStatus: "error",
      submissionMessage:
        "Vi klarte ikke å sende inn opplysningene akkurat nå. Du kan prøve igjen, eller sette opp et innsending-endepunkt i konfigurasjonen.",
    };
    saveState();
    render();
  }
}

async function sendSubmission(payload) {
  const { submissionEndpoint, submissionHeaders } = window.QUIZ_CONFIG || {};
  localStorage.setItem(`${STORAGE_KEY}:latest-submission`, JSON.stringify(payload));

  if (!submissionEndpoint) {
    return Promise.resolve({ ok: true, mocked: true });
  }

  const response = await fetch(submissionEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(submissionHeaders || {}),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Submission failed with status ${response.status}`);
  }

  return response;
}

function trackEvent(name, payload = {}) {
  const detail = {
    name,
    payload,
    timestamp: new Date().toISOString(),
  };

  document.dispatchEvent(new CustomEvent("quiz:analytics", { detail }));

  if (typeof window.quizAnalyticsHook === "function") {
    window.quizAnalyticsHook(detail);
  }
}

function render() {
  app.className = "app fade-enter";

  switch (state.stage) {
    case "question":
      renderQuestion();
      break;
    case "gate":
      renderGate();
      break;
    case "result":
      renderResult();
      break;
    case "landing":
    default:
      renderLanding();
      break;
  }

  wireEvents();
}

function renderLanding() {
  app.innerHTML = `
    <section class="hero">
      <div class="hero-card panel">
        <div>
          <span class="eyebrow">Teamdiagnose</span>
          <h1 class="title">Hva skjer under overflaten i teamet ditt?</h1>
          <p class="subtitle">
            Mange team beskriver utfordringene sine som kommunikasjonsproblemer. Ofte er det noe mer. Denne quizen hjelper deg å se hvilke skjulte mønstre som påvirker beslutninger, samarbeid og fremdrift i teamet ditt.
          </p>
          <div class="support-list">
            <div class="support-item">Tar 3–4 minutter.</div>
            <div class="support-item">Du får en kort diagnose på skjermen, og resultatet sendt på e-post.</div>
          </div>
          <div class="button-row">
            <button class="button" data-action="start-quiz">Start quizen</button>
            ${
              Object.keys(state.answers).length > 0
                ? '<button class="ghost-button" data-action="resume-quiz">Fortsett der du slapp</button>'
                : ""
            }
          </div>
        </div>
        <aside class="hero-aside">
          <div class="metric-card">
            <strong>Fem skjulte mønstre</strong>
            <p>VOICE, TRUTH, RESIST, BELONG og POWER oversatt til konkrete signaler i teamhverdagen.</p>
          </div>
          <div class="metric-card">
            <strong>Bygget for ledere</strong>
            <p>Et rolig, presist og profesjonelt verktøy for seniorledere og mellomledere som vil se klarere.</p>
          </div>
          <div class="metric-card">
            <strong>Diagnostiserer teamet</strong>
            <p>Resultatet beskriver miljøet og dynamikken i teamet, ikke personligheten til den som svarer.</p>
          </div>
        </aside>
      </div>
    </section>
  `;
}

function renderQuestion() {
  const question = QUESTIONS[state.currentQuestionIndex];
  const progress = ((state.currentQuestionIndex + 1) / QUESTIONS.length) * 100;

  app.innerHTML = `
    <section class="question-layout">
      <div class="question-card panel">
        <div class="topbar">
          <div class="progress-wrap">
            <div class="progress-meta">
              <span>Spørsmål ${state.currentQuestionIndex + 1} av ${QUESTIONS.length}</span>
              <span>${Math.round(progress)} %</span>
            </div>
            <div class="progress-bar" aria-hidden="true">
              <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
          </div>
          <button class="back-button" data-action="go-back">Tilbake</button>
        </div>

        <div>
          <span class="section-label"><strong>${question.id}</strong> Teammønster</span>
        </div>

        <h2 class="question-title">${question.prompt}</h2>

        <div class="question-grid">
          ${question.options
            .map(
              (option) => `
                <button class="answer-card" data-action="answer" data-question-id="${question.id}" data-option-key="${option.key}">
                  <span class="answer-label">${option.key}</span>
                  <span class="answer-text">${option.text}</span>
                </button>
              `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function renderGate() {
  app.innerHTML = `
    <section class="gate-layout">
      <div class="gate-card panel">
        <div class="topbar">
          <span class="section-label"><strong>Diagnose</strong> Klar til beregning</span>
          <button class="back-button" data-action="go-back">Tilbake</button>
        </div>

        <div class="gate-grid">
          <div class="gate-copy">
            <h2 class="question-title">Vil du se diagnosen din?</h2>
            <p class="gate-intro">
              Legg inn navn og e-post, så sender jeg deg resultatet ditt med en kort forklaring på hva som sannsynligvis preger teamet ditt akkurat nå.
            </p>
          </div>

          <form class="form-grid" data-form="lead-gate">
            <div class="field">
              <label for="firstName">Fornavn</label>
              <input id="firstName" name="firstName" type="text" autocomplete="given-name" value="${escapeHtml(
                state.lead.firstName
              )}" />
            </div>

            <div class="field">
              <label for="email">E-post</label>
              <input id="email" name="email" type="email" autocomplete="email" value="${escapeHtml(state.lead.email)}" />
            </div>

            <div class="field">
              <label for="role">Rolle (valgfritt)</label>
              <select id="role" name="role">
                <option value="" ${state.lead.role === "" ? "selected" : ""}>Velg rolle</option>
                <option value="Senior leder" ${state.lead.role === "Senior leder" ? "selected" : ""}>Senior leder</option>
                <option value="Mellomleder" ${state.lead.role === "Mellomleder" ? "selected" : ""}>Mellomleder</option>
                <option value="Annet" ${state.lead.role === "Annet" ? "selected" : ""}>Annet</option>
              </select>
            </div>

            <label class="consent" for="consent">
              <input id="consent" name="consent" type="checkbox" ${state.lead.consent ? "checked" : ""} />
              <p>Jeg godtar å motta resultatet mitt og relevante e-poster om ledelse, samarbeid og skjulte dynamikker i team.</p>
            </label>

            ${
              state.submissionStatus === "error"
                ? `<p class="error-text">${state.submissionMessage}</p>`
                : ""
            }
            ${
              state.submissionStatus === "success"
                ? `<p class="success-text">${state.submissionMessage}</p>`
                : ""
            }

            <div class="button-row">
              <button class="button" type="submit" ${state.submissionStatus === "submitting" ? "disabled" : ""}>
                ${state.submissionStatus === "submitting" ? "Beregner..." : "Se resultatet mitt"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  `;
}

function renderResult() {
  const results = state.results || calculateResults(state.answers);
  const content = RESULT_CONTENT[results.primary];
  const secondaryLabel = PATTERN_LABELS[results.secondary];
  const blended = SECONDARY_SNIPPETS[results.primary][results.secondary] || "";
  const helpPriorityMeta = HELP_PRIORITY_META[results.helpPriority];

  app.innerHTML = `
    <section class="result-layout">
      <div class="result-card panel">
        <div class="topbar">
          <span class="section-label"><strong>Resultat</strong> Teamdiagnose</span>
          <button class="back-button" data-action="restart-quiz">Ta quizen på nytt</button>
        </div>

        <div class="result-header">
          <div class="result-meta">
            <span class="result-chip"><strong>Dominant pattern</strong> ${PATTERN_LABELS[results.primary]}</span>
            <span class="result-chip"><strong>Secondary pattern</strong> ${secondaryLabel}</span>
            <span class="result-chip"><strong>Severity</strong> ${results.severity}</span>
            ${
              helpPriorityMeta
                ? `<span class="result-chip"><strong>Hjelpebehov</strong> ${helpPriorityMeta.label}</span>`
                : ""
            }
          </div>
          <h2 class="result-title">${content.title}</h2>
          <p class="result-intro">${content.diagnostic}</p>
        </div>

        <div class="result-grid">
          <section class="result-section">
            <h3>Dette viser seg ofte som</h3>
            <ul>
              ${content.showsAs.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </section>
          <section class="result-section">
            <h3>Det som ofte ligger under</h3>
            <p>${content.under}</p>
          </section>
          <section class="result-section">
            <h3>Et nyttig neste steg for en leder</h3>
            <p>${content.nextStep}</p>
          </section>
          <section class="result-section">
            <h3>Kort diagnose</h3>
            <p>${content.diagnostic}</p>
          </section>
        </div>

        ${blended ? `<p class="result-blend">${blended}</p>` : ""}
        <p class="result-severity">${SEVERITY_COPY[results.severity]}</p>
        ${
          helpPriorityMeta
            ? `
              <section class="result-section">
                <h3>Det du sannsynligvis trenger mest akkurat nå</h3>
                <p>${helpPriorityMeta.resultCopy}</p>
              </section>
            `
            : ""
        }

        <div class="button-row">
          <button class="button" data-action="book-call">Book en samtale</button>
          <button class="ghost-button" data-action="restart-quiz">Ta quizen for et annet team</button>
        </div>
        <p class="cta-support">${
          helpPriorityMeta?.ctaSupport ||
          "Hvis du kjenner igjen dette bildet, kan det være nyttig å se nærmere på hva som faktisk skjer under overflaten i teamet ditt."
        }</p>
      </div>
    </section>
  `;
}

function wireEvents() {
  document.querySelectorAll("[data-action='start-quiz'], [data-action='resume-quiz']").forEach((button) => {
    button.addEventListener("click", startQuiz);
  });

  document.querySelectorAll("[data-action='go-back']").forEach((button) => {
    button.addEventListener("click", goBack);
  });

  document.querySelectorAll("[data-action='answer']").forEach((button) => {
    button.addEventListener("click", () => {
      answerQuestion(button.dataset.questionId, button.dataset.optionKey);
    });
  });

  document.querySelectorAll("[data-action='restart-quiz']").forEach((button) => {
    button.addEventListener("click", resetQuiz);
  });

  document.querySelectorAll("[data-action='book-call']").forEach((button) => {
    button.addEventListener("click", () => {
      trackEvent("quiz_book_call_clicked", {
        primary_result: state.results?.primary,
        secondary_result: state.results?.secondary,
      });
      const bookingUrl = window.QUIZ_CONFIG?.bookingUrl;
      window.location.href = bookingUrl || "mailto:hello@example.com?subject=Book%20en%20samtale";
    });
  });

  const leadForm = document.querySelector("[data-form='lead-gate']");
  if (leadForm) {
    leadForm.addEventListener("submit", submitLeadForm);

    leadForm.querySelector("#firstName")?.addEventListener("input", (event) => {
      updateLead({ firstName: event.target.value });
    });

    leadForm.querySelector("#email")?.addEventListener("input", (event) => {
      updateLead({ email: event.target.value });
    });

    leadForm.querySelector("#role")?.addEventListener("change", (event) => {
      updateLead({ role: event.target.value });
    });

    leadForm.querySelector("#consent")?.addEventListener("change", (event) => {
      updateLead({ consent: event.target.checked });
    });
  }
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
