const STORAGE_KEY = "team-surface-quiz-state-v1";
const PATTERNS = ["VOICE", "TRUTH", "RESIST", "BELONG", "POWER"];
const BOOKING_URL = "https://calendar.app.google/ur7kRpTwqy6FjUnD7";
const GOOGLE_SHEETS_WEBHOOK = "https://script.google.com/macros/s/AKfycbwy_FY1ou2kSo-D-u9gTtsBYbfJtiPX3F-q7z0PQHJOfZuI97JfusH9E0VTQNTDtup0/exec";
let currentLanguage = localStorage.getItem("quiz_lang") || "no";
const KAJABI_CONFIG = {
  fieldNames: {
    firstName: ["form_submission[name]", "first_name", "name", "contact[first_name]"],
    email: ["form_submission[email]", "email", "contact[email]"],
    primary: [
      "form_submission[custom_10]",
      "primary_result",
    ],
    secondary: [
      "form_submission[custom_11]",
      "secondary_result",
    ],
    severity: [
      "form_submission[custom_12]",
      "severity",
    ],
    helpPriority: [
      "form_submission[custom_13]",
      "help_priority",
    ],
    language: ["language", "form_submission[language]"],
  },
  pollIntervalMs: 300,
  maxWaitMs: 10000,
  submitResultDelayMs: 1500,
  successSelectors: [
    ".form-success",
    ".kajabi-form__success",
    ".success-message",
    "[data-form-success]",
    ".kjb-form-confirmation",
  ],
  copySelectors: [
    ".form-title",
    ".form-subtitle",
    ".kajabi-form__title",
    ".kajabi-form__subtitle",
    ".kjb-form-title",
    ".kjb-form-description",
    ".headline",
    ".subheadline",
  ],
};

const PATTERN_LABELS = {
  VOICE: "Skjev fordeling av plass og stemme",
  TRUTH: "Unnvikelse av ubehagelige sannheter",
  RESIST: "Skjult motstand",
  BELONG: "Tilhørighet og ekskludering",
  POWER: "Uformelle maktstrukturer",
};

const PATTERN_LABELS_EN = {
  VOICE: "Uneven voice and participation",
  TRUTH: "Avoidance of uncomfortable truths",
  RESIST: "Hidden resistance",
  BELONG: "Inclusion and exclusion dynamics",
  POWER: "Informal power structures",
};

const UI_NO = {
  startQuiz: "Start quizen",
  resumeQuiz: "Fortsett der du slapp",
  quizLabel: "Teamdiagnose",
  landingTitle: "Hva skjer under overflaten i teamet ditt?",
  landingSubtitle:
    "Mange team beskriver utfordringene sine som kommunikasjonsproblemer. Ofte er det noe mer. Denne quizen hjelper deg å se hvilke skjulte mønstre som påvirker beslutninger, samarbeid og fremdrift i teamet ditt.",
  supportDuration: "Tar 3–4 minutter.",
  supportEmail: "Du får en kort diagnose på skjermen, og resultatet sendt på e-post.",
  metricOneTitle: "Fem skjulte mønstre",
  metricOneBody: "VOICE, TRUTH, RESIST, BELONG og POWER oversatt til konkrete signaler i teamhverdagen.",
  metricTwoTitle: "Bygget for ledere",
  metricTwoBody: "Et rolig, presist og profesjonelt verktøy for seniorledere og mellomledere som vil se klarere.",
  metricThreeTitle: "Diagnostiserer teamet",
  metricThreeBody: "Resultatet beskriver miljøet og dynamikken i teamet, ikke personligheten til den som svarer.",
  questionLabel: "Teammønster",
  questionCount: "Spørsmål {current} av {total}",
  back: "Tilbake",
  resultLabel: "Resultat",
  dominantPattern: "Dominant pattern",
  secondaryPattern: "Secondary pattern",
  severity: "Severity",
  helpNeed: "Hjelpebehov",
  framingText:
    "Alle team har mønstre. Denne diagnosen viser hva som er mest aktivt hos dere akkurat nå – enten som tidlige signaler eller mer etablerte utfordringer.",
  balanceText:
    "Dette betyr ikke at teamet ditt “er slik”, men at dette er mønstre som ser ut til å være mer aktive akkurat nå.",
  lowPositive:
    "Dette er ofte et godt tidspunkt å bli bevisst på mønstrene – før de setter seg sterkere i måten teamet jobber på.",
  showsAs: "Dette viser seg ofte som",
  under: "Det som ofte ligger under",
  nextStep: "Et nyttig neste steg for en leder",
  shortDiagnosis: "Kort diagnose",
  helpPriorityTitle: "Det du sannsynligvis trenger mest akkurat nå",
  restart: "Ta quizen på nytt",
  restartOtherTeam: "Ta quizen på nytt for et annet team",
  callLength: "25 min – uforpliktende samtale",
  kajabiTitle: "Vil du se diagnosen din?",
  kajabiBody:
    "Legg inn navn og e-post, så vises resultatene dine med en gang her på skjermen.",
  kajabiSupport:
    "Du får også noen relevante oppfølginger knyttet til utfordringen resultatene dine peker på.",
  nameLabel: "Navn",
  emailLabel: "E-post",
  visibleSubmit: "Se resultatet mitt",
  errors: {
    required: "Fyll inn navn og e-post for å se resultatet ditt.",
    loading: "Skjemaet lastet ikke ferdig ennå. Vent et øyeblikk og prøv igjen.",
  },
};

const UI_EN = {
  eyebrow: "Team diagnostic",
  startQuiz: "Start quiz",
  resumeQuiz: "Continue where you left off",
  quizLabel: "Team diagnostic",
  landingTitle: "What is happening beneath the surface in your team?",
  landingSubtitle:
    "Many teams describe their challenges as communication problems. Often, it is something more. This quiz helps you see which hidden patterns may be affecting decisions, collaboration, and momentum in your team.",
  landingSupport1: "Takes 3–4 minutes.",
  landingSupport2: "You’ll see a short diagnosis on screen, and receive the result by email.",
  supportDuration: "Takes 3–4 minutes.",
  supportEmail: "You’ll see a short diagnosis on screen, and receive the result by email.",
  metricOneTitle: "Five hidden patterns",
  metricOneBody: "VOICE, TRUTH, RESIST, BELONG, and POWER translated into concrete signals in everyday team life.",
  metricTwoTitle: "Built for leaders",
  metricTwoBody: "A calm, precise, and professional tool for senior leaders and middle managers who want greater clarity.",
  metricThreeTitle: "Diagnoses the team",
  metricThreeBody: "The result describes the environment and dynamics in the team, not the personality of the person answering.",
  questionMeta: (current, total) => `Question ${current} of ${total}`,
  questionLabel: (id) => `${id} Team pattern`,
  questionCount: "Question {current} of {total}",
  back: "Back",
  gateTitle: "Would you like to see your diagnosis?",
  gateBody:
    "Enter your name and email and your results will appear right here on screen.",
  gateSupport:
    "You'll also receive a few relevant follow-ups related to the challenge your results point to.",
  kajabiTitle: "Would you like to see your diagnosis?",
  kajabiBody:
    "Enter your name and email and your results will appear right here on screen.",
  kajabiSupport:
    "You'll also receive a few relevant follow-ups related to the challenge your results point to.",
  resultLabel: "Result",
  resultTitlePrefix: "Team diagnosis",
  dominantPattern: "Dominant pattern",
  secondaryPattern: "Secondary pattern",
  severity: "Severity",
  helpNeed: "Need right now",
  framing:
    "All teams have patterns. This diagnosis highlights what seems to be most active in your team right now — whether as early signals or more established dynamics.",
  framingText:
    "All teams have patterns. This diagnosis highlights what seems to be most active in your team right now — whether as early signals or more established dynamics.",
  balance:
    "This does not mean your team 'is like this', but that these patterns appear to be more present right now.",
  balanceText:
    "This does not mean your team 'is like this', but that these patterns appear to be more present right now.",
  showsAs: "This often shows up as",
  whatLiesUnder: "What often sits underneath",
  under: "What often sits underneath",
  nextStep: "A useful next step for a leader",
  shortDiagnosis: "Short diagnosis",
  whatYouNeedMost: "What you are most likely to need right now",
  helpPriorityTitle: "What you are most likely to need right now",
  lowPositive:
    "This is often the best time to become more conscious of the pattern — before it becomes more deeply embedded in how the team works.",
  restart: "Take the quiz again",
  retake: "Retake quiz for another team",
  restartOtherTeam: "Retake quiz for another team",
  ctaBookingSub: "25 min – no obligation",
  callLength: "25 min – no obligation",
  nameLabel: "Name",
  emailLabel: "Email",
  visibleSubmit: "See my result",
  errors: {
    required: "Enter your name and email to see your result.",
    loading: "The form is still loading. Please wait a moment and try again.",
  },
};

const CTA_BY_SEVERITY = {
  LOW: {
    shortText: "Hvis du vil utforske dette tidlig og bevisst, kan vi ta en rolig samtale.",
    text: "Hvis du er nysgjerrig på hva dette kan utvikle seg til – og hvordan du kan jobbe mer bevisst med det – kan vi ta en rolig samtale.",
    button: "Utforsk dette videre",
  },
  MEDIUM: {
    shortText: "Hvis dette allerede merkes i samarbeidet, kan det være nyttig å se nærmere på det sammen.",
    text: "Hvis dette påvirker samarbeid og fremdrift hos dere, kan det være nyttig å se nærmere på hva som faktisk driver det – og hva du konkret kan gjøre.",
    button: "Se på dette sammen",
  },
  HIGH: {
    shortText: "Hvis dette har fått feste, kan det være nyttig å ta tak i det med et tydelig blikk utenfra.",
    text: "Når dette får virke over tid, påvirker det ofte både beslutninger, fremdrift og tillit. Det er mulig å gjøre noe med det – men det starter med å se det tydelig.",
    button: "Ta tak i dette",
  },
};

const CTA_BY_SEVERITY_EN = {
  LOW: {
    shortText: "If you want to explore this early and consciously, we can have a calm conversation.",
    text: "If you're curious about what this could develop into – and how you can work with it more consciously – we can have a calm conversation.",
    button: "Explore this further",
  },
  MEDIUM: {
    shortText: "If this is already showing up in collaboration, it may be useful to look at it together.",
    text: "If this is affecting collaboration and momentum in your team, it may be useful to look more closely at what is actually driving it – and what you can concretely do.",
    button: "Look at this together",
  },
  HIGH: {
    shortText: "If this has become established, it may help to address it with a clearer outside perspective.",
    text: "When this is allowed to continue over time, it often affects decisions, momentum, and trust. Something can be done about it – but it starts with seeing it clearly.",
    button: "Address this now",
  },
};

const HELP_PRIORITY_META = {
  understand: {
    label: "Å forstå hva som faktisk skjer",
    tag: "goal_understand",
    resultCopy:
      "Å få et tydeligere bilde av hva som faktisk skjer i teamet – før du prøver å løse det. Når underliggende mønstre blir tydeligere, blir det også lettere å vite hvor du skal sette inn innsatsen.",
  },
  progress: {
    label: "Å få bedre fremdrift",
    tag: "goal_progress",
    resultCopy:
      "Å få bedre fremdrift uten å presse hardere. Når teamet stopper opp, handler det ofte mindre om kapasitet og mer om det som ikke er avklart eller ikke blir sagt.",
  },
  dynamics: {
    label: "Å håndtere krevende dynamikk i teamet",
    tag: "goal_dynamics",
    resultCopy:
      "Å forstå og håndtere den krevende dynamikken i teamet på en måte som skaper mer trygghet og mindre friksjon. Det begynner ofte med å gjøre mønstrene synlige.",
  },
  collaboration: {
    label: "Å skape tydeligere samarbeid og ansvar",
    tag: "goal_collaboration",
    resultCopy:
      "Å skape tydeligere samarbeid, ansvar og felles retning. Når roller, forventninger og beslutningsgrenser blir tydeligere, blir det også lettere å jobbe sammen på en god måte.",
  },
};

const HELP_PRIORITY_META_EN = {
  understand: {
    label: "Understanding what is actually going on",
    tag: "goal_understand",
    resultCopy:
      "What you are most likely to need right now is a clearer picture of what is actually happening in the team — before trying to solve it. When the underlying patterns become clearer, it also becomes easier to know where to focus.",
  },
  progress: {
    label: "Creating better momentum",
    tag: "goal_progress",
    resultCopy:
      "What you are most likely to need right now is better momentum without simply pushing harder. When teams stall, it is often less about capacity and more about what remains unclear or unspoken.",
  },
  dynamics: {
    label: "Handling difficult team dynamics",
    tag: "goal_dynamics",
    resultCopy:
      "What you are most likely to need right now is a way to understand and work with the difficult dynamics in the team in a way that creates more safety and less friction. That often starts by making the patterns visible.",
  },
  collaboration: {
    label: "Creating clearer collaboration and accountability",
    tag: "goal_collaboration",
    resultCopy:
      "What you are most likely to need right now is clearer collaboration, accountability, and shared direction. When roles, expectations, and decision boundaries become clearer, it becomes easier to work together well.",
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

const RESULT_CONTENT_EN = {
  VOICE: {
    title: "Your team environment is shaped by uneven voice and participation",
    diagnostic:
      "In your team, it appears that some voices carry more weight than others. This affects more than who speaks — it shapes which perspectives are heard, which questions are asked, and what feels possible to say out loud.",
    showsAs: [
      "the same people speaking most of the time",
      "disagreement being held back",
      "important input arriving too late — or not at all",
    ],
    under:
      "This is rarely just about strong personalities. More often, it reflects how conversations are structured, how participation is framed, or how safe it feels to challenge what is already dominating.",
    nextStep:
      "Look closely at how conversations actually unfold. Who speaks first? Who sums up? Who is not actively invited in?",
  },
  TRUTH: {
    title: "Your team environment is shaped by avoidance of uncomfortable truths",
    diagnostic:
      "In your team, it appears that what is difficult is often made more technical, more vague, or pushed further down the road. That can create an impression of progress, while delaying the conversations that actually matter.",
    showsAs: [
      "analysis and detail taking over when decisions are close",
      "the conversation drifting away from the core issue",
      "people talking around the problem more than about it",
    ],
    under:
      "This often happens when the cost of honesty feels high. Vagueness, postponement, and detours become ways of managing uncertainty.",
    nextStep:
      "Try clarifying what the team is actually being asked to face. What is the question you may be avoiding together?",
  },
  RESIST: {
    title: "Your team environment is shaped by hidden resistance",
    diagnostic:
      "In your team, agreement does not always seem to translate into real commitment. Things may look aligned in the room, but lose momentum afterwards. That creates drag, repeated conversations, and unclear progress.",
    showsAs: [
      "people saying yes without following through",
      "decisions having to be revisited",
      "progress slowing without clear opposition",
    ],
    under:
      "This is rarely about laziness or lack of will. More often, it reflects unspoken concerns, competing priorities, or low safety to say no directly.",
    nextStep:
      "Look at how commitment is clarified. Is it clear what has actually been decided, who owns what, and what remains unspoken?",
  },
  BELONG: {
    title: "Your team environment is shaped by inclusion and exclusion dynamics",
    diagnostic:
      "In your team, social position and recognition may be influencing collaboration more than they should. Some contributions receive less response, some people are more easily left on the outside, and not everyone experiences their voice as carrying equal weight.",
    showsAs: [
      "ideas being overlooked or picked up by others",
      "certain people being met with silence",
      "it feeling safer for some people to contribute than for others",
    ],
    under:
      "This is often a sign of status differences, low safety, or unexamined patterns around who receives recognition and space.",
    nextStep:
      "Notice what actually happens in the room when people contribute. Who is met? Who is left hanging? And what does the team learn from that over time?",
  },
  POWER: {
    title: "Your team environment is shaped by informal power structures",
    diagnostic:
      "In your team, influence does not seem to follow formal roles alone. Certain relationships, alliances, or information lines appear to shape more than is visible in the official structure.",
    showsAs: [
      "decisions seeming made before the meeting starts",
      "some people consistently knowing more than others",
      "collaboration being shaped by proximity and alliances",
    ],
    under:
      "This often happens when roles, decision boundaries, or the flow of information are unclear. In that space, informal structures gain influence.",
    nextStep:
      "Look at where decisions are really being shaped. Is it happening in the formal room — or somewhere else?",
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

const SECONDARY_SNIPPETS_EN = {
  VOICE: {
    TRUTH:
      "Your answers also suggest that what is difficult is often softened or worked around — not just dominated. That means both who gets space in the room and what can actually be said are part of the picture.",
    RESIST:
      "Your answers also suggest that weak follow-through is not only about who gets space, but also about agreement not becoming real commitment.",
    BELONG:
      "There are also signs that this affects who feels included, heard, and safe enough to contribute.",
    POWER:
      "Your answers also suggest that some voices carry weight not only because of style, but because they sit close to informal influence.",
  },
  TRUTH: {
    VOICE:
      "Your answers also suggest that who gets space in the conversation affects which truths make it into the room.",
    RESIST:
      "There are also signs that what is not said clearly enough later shows up as drag or lack of follow-through.",
    BELONG:
      "It may also be that not everyone feels equally safe to raise what is difficult.",
    POWER:
      "Your answers also suggest that some topics are shaped as much by power and relationships as by facts.",
  },
  RESIST: {
    VOICE:
      "It may also be that certain voices shape the direction more than others, making real commitment harder to build across the whole team.",
    TRUTH:
      "Your answers also suggest that there are things not being said clearly enough, which later reappear as drag or slippage.",
    BELONG:
      "Hidden resistance may also be connected to some people not feeling equally safe or equal in the collaboration.",
    POWER:
      "There are also signs that informal influence affects what is actually followed up after decisions.",
  },
  BELONG: {
    VOICE:
      "Your answers also suggest that space in conversations is unevenly distributed, which reinforces who feels inside and outside.",
    TRUTH:
      "A lack of safety may also make it harder to say what is actually true or important.",
    RESIST:
      "There are also signs that what does not get room in the relationships later shows up as low commitment or weak follow-through.",
    POWER:
      "Your answers also suggest that social position and informal influence are closely linked in this team.",
  },
  POWER: {
    VOICE:
      "It may also be that informal influence shapes who gets most space in the room.",
    TRUTH:
      "Your answers also suggest that some truths are harder to raise because the power around them is unclear.",
    RESIST:
      "There are also signs that informal structures influence what is actually followed up after decisions.",
    BELONG:
      "These structures may also be affecting who feels they belong — and who is left slightly outside.",
  },
};

const SEVERITY_COPY = {
  LOW: "Dette ser foreløpig ut som et tidlig signal, mer enn et tydelig problem. Det betyr at det er noe her som er verdt å være bevisst på – før det får utvikle seg til noe som påvirker samarbeid og fremdrift sterkere.",
  MEDIUM:
    "Dette ser ut til å være tydelig nok til at det påvirker samarbeid og fremdrift i praksis. Det betyr ikke at teamet mangler vilje eller kompetanse, men at noen underliggende forhold gjør arbeidet tyngre enn det trenger å være.",
  HIGH:
    "Dette ser ut til å være et etablert mønster som påvirker både samarbeid, beslutninger og fremdrift. Når slike mønstre får virke over tid, koster det ofte mer enn man tror – både i energi og i kvaliteten på arbeidet.",
};

const SEVERITY_COPY_EN = {
  LOW:
    "This currently looks more like an early signal than a clear problem. That means there is something here worth becoming conscious of — before it develops into something that more clearly affects collaboration and momentum.",
  MEDIUM:
    "This appears to be strong enough to affect collaboration and momentum in practice. That does not mean the team lacks capability or goodwill, but that underlying conditions are making the work heavier than it needs to be.",
  HIGH:
    "This looks like an established pattern that is likely affecting trust, decisions, and follow-through. When patterns like this are left to run over time, they usually cost more than expected — not only in energy, but in the quality of the work and the team’s ability to move together.",
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
    prompt: "Hvordan vil du beskrive dette i teamet ditt akkurat nå?",
    options: [
      { key: "A", text: "Mer et tidlig signal enn et reelt hinder", scores: {}, severity: 0 },
      { key: "B", text: "Begynner å påvirke samarbeid merkbart", scores: {}, severity: 1 },
      { key: "C", text: "Påvirker beslutninger og fremdrift tydelig", scores: {}, severity: 2 },
      { key: "D", text: "Har tydelige konsekvenser for tillit, resultater eller kultur", scores: {}, severity: 3 },
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

const QUESTIONS_EN = [
  {
    id: "Q1",
    prompt: "When an important decision is being made in your team, what most often happens?",
    options: {
      A: "The right people are involved, and the decision becomes clear",
      B: "A few voices tend to take up most of the space",
      C: "The discussion is broad, but what has actually been decided remains unclear",
      D: "The decision seems to have been made before the meeting starts",
    },
  },
  {
    id: "Q2",
    prompt: "What most often happens after the team has agreed on something important?",
    options: {
      A: "Things mostly move forward as expected",
      B: "Progress slows without anyone clearly saying no",
      C: "The decision gets reopened later",
      D: "People seem aligned in the room, but act differently afterwards",
    },
  },
  {
    id: "Q3",
    prompt: "How would you describe your team meetings?",
    options: {
      A: "Generally clear and useful",
      B: "The same people tend to speak most of the time",
      C: "There is a lot of discussion, but it drifts away from what matters most",
      D: "It is difficult to say what you really think",
    },
  },
  {
    id: "Q4",
    prompt: "What usually happens when someone raises a difficult or uncomfortable issue?",
    options: {
      A: "It is usually addressed fairly directly",
      B: "The conversation quickly becomes more technical or vague",
      C: "The topic gets pushed to a later point",
      D: "The person who raised it seems to lose some space in the room",
    },
  },
  {
    id: "Q5",
    prompt: "Which of these best reflects everyday life in your team?",
    options: {
      A: "Ideas are mostly judged on their merits",
      B: "Some ideas are only taken seriously when the 'right' person says them",
      C: "Certain people are often overlooked or met with silence",
      D: "There are informal alliances that shape quite a lot",
    },
  },
  {
    id: "Q6",
    prompt: "When progress slows down, what do you most often see?",
    options: {
      A: "Priorities shift",
      B: "Approvals or responses get delayed",
      C: "New questions and analysis suddenly appear",
      D: "No one explicitly stops things, yet very little actually moves",
    },
  },
  {
    id: "Q7",
    prompt: "How would you describe the flow of information in and around the team?",
    options: {
      A: "Relatively open and clear",
      B: "Important information reaches some people late",
      C: "Different people present different versions of the same situation",
      D: "It feels as if some people always know more than others",
    },
  },
  {
    id: "Q8",
    prompt: "What most often happens with ownership and responsibility?",
    options: {
      A: "Ownership and responsibility are fairly clear",
      B: "Several people assume someone else owns the task",
      C: "Responsibility tends to drift upwards",
      D: "Responsibility becomes unclear when things get difficult or sensitive",
    },
  },
  {
    id: "Q9",
    prompt: "How do people in the team usually respond when they disagree?",
    options: {
      A: "They say so fairly openly",
      B: "They are cautious in the room and clearer afterwards",
      C: "They hold back because certain people dominate",
      D: "They avoid saying it directly",
    },
  },
  {
    id: "Q10",
    prompt: "What best characterises the culture in your team right now?",
    options: {
      A: "Collaboration and clarity",
      B: "Fatigue and short-term thinking",
      C: "Caution and underlying tension",
      D: "Multiple parallel agendas",
    },
  },
  {
    id: "Q11",
    prompt: "What feels like the biggest cost of this right now?",
    options: {
      A: "Slow progress",
      B: "Poorer decisions",
      C: "Lower trust",
      D: "More energy goes into navigating than creating value",
    },
  },
  {
    id: "Q12",
    prompt: "Where is this most noticeable?",
    options: {
      A: "In leadership meetings or decision forums",
      B: "In collaboration across teams or functions",
      C: "In what happens after decisions have been made",
      D: "In who is heard and who is left on the outside",
    },
  },
  {
    id: "Q13",
    prompt: "If you had to describe it in one phrase, which fits best?",
    options: {
      A: "We need more direction",
      B: "We say yes, but execution slips",
      C: "There are things that are not being said out loud",
      D: "Some people have more influence than is visible",
    },
  },
  {
    id: "Q14",
    prompt: "How would you describe the situation in your team right now?",
    options: {
      A: "More of an early signal than a real obstacle",
      B: "It is starting to affect collaboration noticeably",
      C: "It is clearly affecting decisions and progress",
      D: "It is having visible consequences for trust, results, or culture",
    },
  },
  {
    id: "Q15",
    prompt: "What do you most need help with right now?",
    options: {
      A: "Understanding what is actually going on",
      B: "Creating better momentum",
      C: "Handling difficult team dynamics",
      D: "Creating clearer collaboration and accountability",
    },
  },
];

function getQuestions() {
  return QUESTIONS;
}

function getQuestionsContent() {
  return currentLanguage === "en" ? QUESTIONS_EN : null;
}

function getTranslatedQuestion(question) {
  const translations = getQuestionsContent();
  if (!translations) {
    return question;
  }

  const translated = translations.find((item) => item.id === question.id);
  if (!translated) {
    return question;
  }

  return {
    ...question,
    prompt: translated.prompt || question.prompt,
    options: question.options.map((option) => ({
      ...option,
      text: translated.options?.[option.key] || option.text,
    })),
  };
}

function getUI() {
  return currentLanguage === "no" ? UI_NO : UI_EN;
}

function getResults() {
  return currentLanguage === "no" ? RESULT_CONTENT : RESULT_CONTENT_EN;
}

function getPatternLabels() {
  return currentLanguage === "no" ? PATTERN_LABELS : PATTERN_LABELS_EN;
}

function getSecondarySnippets() {
  return currentLanguage === "no" ? SECONDARY_SNIPPETS : SECONDARY_SNIPPETS_EN;
}

function getSeverityCopy() {
  return currentLanguage === "no" ? SEVERITY_COPY : SEVERITY_COPY_EN;
}

function getSeverityCTA() {
  return currentLanguage === "no" ? CTA_BY_SEVERITY : CTA_BY_SEVERITY_EN;
}

function getHelpPriorityMeta() {
  return currentLanguage === "no" ? HELP_PRIORITY_META : HELP_PRIORITY_META_EN;
}

const defaultState = {
  stage: "landing",
  currentQuestionIndex: 0,
  answers: {},
  helpPriority: "",
  results: null,
};

let state = loadState();
const app = document.querySelector("#app");
let finalResult = null;
let kajabiInitialized = false;
let kajabiPrepared = false;
let kajabiFieldObserver = null;
let kajabiSuccessObserver = null;
let kajabiPopulateInterval = null;
let kajabiMaxWaitTimeout = null;
let kajabiResultTimeout = null;
let kajabiSubmitBound = false;
let kajabiCleanupStarted = false;
let visibleLeadBound = false;
let pendingLeadSubmission = null;
let googleSheetsSent = false;

bindLanguageToggle();
render();

function bindLanguageToggle() {
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentLanguage = btn.dataset.lang;
      localStorage.setItem("quiz_lang", currentLanguage);
      syncLanguageToggle();
      applyStaticTranslations();
      render();
    });
  });
  syncLanguageToggle();
}

function syncLanguageToggle() {
  document.documentElement.lang = currentLanguage === "no" ? "no" : "en";
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    const isActive = btn.dataset.lang === currentLanguage;
    btn.setAttribute("aria-pressed", String(isActive));
    btn.classList.toggle("active", isActive);
    btn.disabled = isActive;
  });
}

function applyStaticTranslations() {
  const ui = getUI();

  const copyTargets = [
    ["#kajabi-step-title", ui.gateTitle || ui.kajabiTitle],
    ["#kajabi-step-body", ui.gateBody || ui.kajabiBody],
    ["#kajabi-step-support", ui.gateSupport || ui.kajabiSupport],
    ["#visible-name-label", ui.nameLabel],
    ["#visible-email-label", ui.emailLabel],
    ["#visible-form-submit", ui.visibleSubmit],
  ];

  copyTargets.forEach(([selector, text]) => {
    const node = document.querySelector(selector);
    if (node) {
      node.textContent = text;
    }
  });

  const nameInput = document.querySelector("#visible-name");
  const emailInput = document.querySelector("#visible-email");

  if (nameInput) {
    nameInput.setAttribute("placeholder", ui.nameLabel);
  }

  if (emailInput) {
    emailInput.setAttribute("placeholder", ui.emailLabel);
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return structuredClone(defaultState);
    }

    return {
      ...structuredClone(defaultState),
      ...JSON.parse(raw),
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

function resetQuiz() {
  clearKajabiWatchers();
  finalResult = null;
  visibleLeadBound = false;
  pendingLeadSubmission = null;
  googleSheetsSent = false;
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
  const computedResult = isLastQuestion ? calculateResults(nextAnswers) : state.results;

  state = {
    ...state,
    answers: nextAnswers,
    helpPriority: selectedOption?.helpPriority || state.helpPriority,
    currentQuestionIndex: isLastQuestion ? state.currentQuestionIndex : state.currentQuestionIndex + 1,
    stage: isLastQuestion ? "gate" : "question",
    results: computedResult,
  };
  saveState();

  if (isLastQuestion && computedResult) {
    finalResult = buildKajabiResultPayload(computedResult);
    console.log("Final quiz result:", finalResult);

    if (!googleSheetsSent) {
      sendToGoogleSheets(finalResult);
      googleSheetsSent = true;
    }
  }

  trackEvent("quiz_answered", {
    question_id: questionId,
    answer_key: optionKey,
    question_index: state.currentQuestionIndex + 1,
  });

  if (questionId === "Q15" && selectedOption?.helpPriority) {
    const helpPriorityMeta = getHelpPriorityMeta();
    trackEvent("quiz_help_priority_selected", {
      selected_value: selectedOption.helpPriority,
      selected_label: helpPriorityMeta[selectedOption.helpPriority]?.label || selectedOption.text,
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
  return getQuestions().find((question) => question.id === questionId);
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

  const severity = severityTotal <= 10 ? "LOW" : severityTotal <= 20 ? "MEDIUM" : "HIGH";
  const rankedPatterns = [...PATTERNS].sort((left, right) =>
    comparePatterns(left, right, totals, maxAnswerCounts, answers)
  );
  const primary = rankedPatterns[0];
  const secondary = rankedPatterns[1] || primary;
  const helpMeta = getHelpPriorityMeta()[helpPriority] || null;

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

function buildKajabiResultPayload(result) {
  return {
    primaryResult: result.primaryResult,
    secondaryResult: result.secondaryResult,
    severity: result.severity,
    helpPriority: result.helpPriority,
  };
}

function sendToGoogleSheets(result) {
  if (!result) return;

  const payload = {
    primary: result.primaryResult,
    secondary: result.secondaryResult,
    severity: result.severity,
    helpPriority: result.helpPriority,
    language: typeof currentLanguage !== "undefined" ? currentLanguage : "no",
    timestamp: new Date().toISOString(),
  };

  fetch(GOOGLE_SHEETS_WEBHOOK, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    mode: "no-cors",
  })
    .then(() => {
      console.log("Sent to Google Sheets:", payload);
    })
    .catch((err) => {
      console.warn("Google Sheets error:", err);
    });
}

function getKajabiFieldByNames(names) {
  const list = Array.isArray(names) ? names : [names];
  for (const name of list) {
    const field = document.querySelector(`[name="${name}"]`);
    if (field) {
      return field;
    }
  }
  return null;
}

function setFieldValue(field, value) {
  field.value = value;
  field.setAttribute("value", value);
  field.dispatchEvent(new Event("input", { bubbles: true }));
  field.dispatchEvent(new Event("change", { bubbles: true }));
}

function hideKajabiCustomFields() {
  const hiddenFieldNames = [
    KAJABI_CONFIG.fieldNames.primary,
    KAJABI_CONFIG.fieldNames.secondary,
    KAJABI_CONFIG.fieldNames.severity,
    KAJABI_CONFIG.fieldNames.helpPriority,
    KAJABI_CONFIG.fieldNames.language,
  ];

  let hiddenAny = false;

  hiddenFieldNames.forEach((fieldName) => {
    const input = getKajabiFieldByNames(fieldName);
    if (!input) return;

    const wrapper =
      input.closest(".form-group") ||
      input.closest(".kajabi-form__field") ||
      input.closest(".field") ||
      input.closest("div") ||
      input.parentElement;

    if (wrapper) {
      wrapper.style.display = "none";
    } else {
      input.style.display = "none";
    }

    hiddenAny = true;
  });

  if (hiddenAny) {
    console.log("Kajabi custom fields hidden");
  }
}

function cleanKajabiText() {
  const wrapper = document.querySelector("#kajabi-form-wrapper");
  if (!wrapper) return;

  KAJABI_CONFIG.copySelectors.forEach((selector) => {
    wrapper.querySelectorAll(selector).forEach((node) => {
      node.style.display = "none";
    });
  });

  wrapper.querySelectorAll("h1, h2, h3, p, span").forEach((node) => {
    const text = node.textContent?.trim().toLowerCase() || "";
    if (
      text.includes("join the newsletter") ||
      text.includes("subscribe to get our latest content")
    ) {
      node.style.display = "none";
    }
  });
}

function populateKajabiFields(result) {
  const primaryField = getKajabiFieldByNames(KAJABI_CONFIG.fieldNames.primary);
  const secondaryField = getKajabiFieldByNames(KAJABI_CONFIG.fieldNames.secondary);
  const severityField = getKajabiFieldByNames(KAJABI_CONFIG.fieldNames.severity);
  const helpPriorityField = getKajabiFieldByNames(KAJABI_CONFIG.fieldNames.helpPriority);
  const languageField = getKajabiFieldByNames(KAJABI_CONFIG.fieldNames.language);

  if (!primaryField || !secondaryField || !severityField || !helpPriorityField) {
    return false;
  }

  setFieldValue(primaryField, result.primaryResult);
  setFieldValue(secondaryField, result.secondaryResult);
  setFieldValue(severityField, result.severity);
  setFieldValue(helpPriorityField, result.helpPriority);
  if (languageField) {
    setFieldValue(languageField, currentLanguage);
  }
  console.log("Kajabi fields populated");
  console.log("Populating Kajabi with:", { ...result, language: currentLanguage });
  return true;
}

function prepareKajabiForm(result) {
  if (!result) return false;

  const firstNameField = getKajabiFieldByNames(KAJABI_CONFIG.fieldNames.firstName);
  const emailField = getKajabiFieldByNames(KAJABI_CONFIG.fieldNames.email);

  if (!firstNameField || !emailField) {
    return false;
  }

  console.log("Kajabi form detected");
  cleanKajabiText();
  hideKajabiCustomFields();
  const populated = populateKajabiFields(result);
  kajabiPrepared = populated;
  attemptPendingLeadSubmission();
  return populated;
}

function initKajabiCleanup() {
  if (kajabiCleanupStarted) {
    console.log("Kajabi already initialized, skipping");
    if (finalResult) {
      prepareKajabiForm(finalResult);
    }
    return;
  }

  kajabiCleanupStarted = true;
  let attempts = 0;

  const interval = window.setInterval(() => {
    attempts += 1;
    bindKajabiSubmissionFlow();

    const formExists = document.querySelector("#kajabi-form-wrapper input");

    if (formExists) {
      console.log("Kajabi form detected");
      if (finalResult) {
        prepareKajabiForm(finalResult);
      } else {
        cleanKajabiText();
        hideKajabiCustomFields();
      }
      clearInterval(interval);
    }

    if (attempts > 20) {
      clearInterval(interval);
      console.warn("Kajabi form not found");
    }
  }, 400);
}

function showVisibleFormError(message) {
  const node = document.querySelector("#visible-form-error");
  if (!node) {
    return;
  }

  node.textContent = message;
  node.classList.toggle("hidden", !message);
}

function attemptPendingLeadSubmission() {
  if (!pendingLeadSubmission) {
    return false;
  }

  const firstNameField = getKajabiFieldByNames(KAJABI_CONFIG.fieldNames.firstName);
  const emailField = getKajabiFieldByNames(KAJABI_CONFIG.fieldNames.email);
  const hiddenForm = document.querySelector("#kajabi-form-wrapper form");

  if (!firstNameField || !emailField || !hiddenForm || !finalResult) {
    return false;
  }

  setFieldValue(firstNameField, pendingLeadSubmission.name);
  setFieldValue(emailField, pendingLeadSubmission.email);
  populateKajabiFields(finalResult);
  showVisibleFormError("");

  console.log("Submitting Kajabi form in hidden iframe");
  pendingLeadSubmission = null;

  if (typeof hiddenForm.requestSubmit === "function") {
    hiddenForm.requestSubmit();
  } else {
    hiddenForm.submit();
  }

  return true;
}

function submitVisibleLeadForm(event) {
  event.preventDefault();

  const nameInput = document.querySelector("#visible-name");
  const emailInput = document.querySelector("#visible-email");
  const nameValue = nameInput?.value.trim() || "";
  const emailValue = emailInput?.value.trim() || "";

  if (!nameValue || !emailValue) {
    showVisibleFormError(getUI().errors.required);
    return;
  }

  pendingLeadSubmission = {
    name: nameValue,
    email: emailValue,
  };

  const firstNameField = getKajabiFieldByNames(KAJABI_CONFIG.fieldNames.firstName);
  const emailField = getKajabiFieldByNames(KAJABI_CONFIG.fieldNames.email);
  const hiddenForm = document.querySelector("#kajabi-form-wrapper form");

  if (!firstNameField || !emailField || !hiddenForm) {
    console.log("Kajabi form not ready yet, waiting in background");
    showVisibleFormError(getUI().errors.loading);
    return;
  }

  attemptPendingLeadSubmission();
}

function bindVisibleLeadForm() {
  const visibleForm = document.querySelector("#visible-lead-form");
  if (!visibleForm || visibleLeadBound) {
    return;
  }

  visibleLeadBound = true;
  visibleForm.addEventListener("submit", submitVisibleLeadForm);

  visibleForm.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", () => {
      showVisibleFormError("");
    });
  });
}

function clearKajabiWatchers() {
  stopKajabiPopulationWatchers();

  if (kajabiSuccessObserver) {
    kajabiSuccessObserver.disconnect();
    kajabiSuccessObserver = null;
  }

  if (kajabiResultTimeout) {
    clearTimeout(kajabiResultTimeout);
    kajabiResultTimeout = null;
  }

  kajabiSubmitBound = false;
  kajabiPrepared = false;
}

function stopKajabiPopulationWatchers() {
  if (kajabiFieldObserver) {
    kajabiFieldObserver.disconnect();
    kajabiFieldObserver = null;
  }

  if (kajabiPopulateInterval) {
    clearInterval(kajabiPopulateInterval);
    kajabiPopulateInterval = null;
  }

  if (kajabiMaxWaitTimeout) {
    clearTimeout(kajabiMaxWaitTimeout);
    kajabiMaxWaitTimeout = null;
  }
}

function revealResultScreen(source) {
  if (!state.results) {
    state = {
      ...state,
      results: calculateResults(state.answers),
    };
  }

  clearKajabiWatchers();
  console.log(`Showing result screen after Kajabi submission (${source})`);

  state = {
    ...state,
    stage: "result",
  };
  saveState();

  trackEvent("quiz_result_viewed", {
    primary_result: state.results.primary,
    secondary_result: state.results.secondary,
    severity: state.results.severity,
    helpPriority: state.results.helpPriority,
    source,
  });

  render();
}

function bindKajabiSubmissionFlow() {
  const wrapper = document.querySelector("#kajabi-form-wrapper");
  const form = wrapper?.querySelector("form");
  const iframe = document.querySelector("#kajabi-background-target");

  if (!wrapper || !form || kajabiSubmitBound) {
    return;
  }

  kajabiSubmitBound = true;
  form.setAttribute("target", "kajabi-background-target");

  form.addEventListener("submit", () => {
    console.log("Kajabi form submitted");
    trackEvent("quiz_gate_submitted", finalResult || {});

    kajabiResultTimeout = window.setTimeout(() => {
      revealResultScreen("submit_delay");
    }, KAJABI_CONFIG.submitResultDelayMs);
  });

  if (iframe && !iframe.dataset.bound) {
    iframe.dataset.bound = "true";
    iframe.addEventListener("load", () => {
      if (state.stage === "gate") {
        revealResultScreen("iframe_load");
      }
    });
  }

  kajabiSuccessObserver = new MutationObserver(() => {
    const successNode = KAJABI_CONFIG.successSelectors
      .map((selector) => wrapper.querySelector(selector))
      .find(Boolean);

    if (successNode) {
      revealResultScreen("success_observer");
    }
  });

  kajabiSuccessObserver.observe(wrapper, {
    childList: true,
    subtree: true,
    attributes: true,
  });
}

function initKajabiForm() {
  if (kajabiInitialized) {
    console.log("Kajabi already initialized, skipping");
    bindKajabiSubmissionFlow();
    initKajabiCleanup();
    bindVisibleLeadForm();
    return;
  }

  kajabiInitialized = true;
  clearKajabiWatchers();
  bindKajabiSubmissionFlow();
  initKajabiCleanup();
  bindVisibleLeadForm();

  const wrapper = document.querySelector("#kajabi-form-wrapper");
  if (!wrapper) {
    console.log("Kajabi form wrapper not found");
    return;
  }

  kajabiFieldObserver = new MutationObserver(() => {
    bindKajabiSubmissionFlow();
    if (prepareKajabiForm(finalResult)) {
      stopKajabiPopulationWatchers();
    }
  });

  kajabiFieldObserver.observe(wrapper, {
    childList: true,
    subtree: true,
    attributes: true,
  });

  kajabiPopulateInterval = window.setInterval(() => {
    bindKajabiSubmissionFlow();
    if (prepareKajabiForm(finalResult)) {
      stopKajabiPopulationWatchers();
    }
  }, KAJABI_CONFIG.pollIntervalMs);

  kajabiMaxWaitTimeout = window.setTimeout(() => {
    if (!prepareKajabiForm(finalResult)) {
      console.log("Kajabi fields could not be found within timeout");
    }
    stopKajabiPopulationWatchers();
  }, KAJABI_CONFIG.maxWaitMs);
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

function toggleKajabiStep(isVisible) {
  const kajabiStep = document.querySelector("#kajabi-step");
  if (!kajabiStep) return;
  kajabiStep.classList.toggle("hidden", !isVisible);
}

function render() {
  app.className = "app fade-enter";
  toggleKajabiStep(state.stage === "gate");
  applyStaticTranslations();

  switch (state.stage) {
    case "question":
      renderQuestion();
      break;
    case "gate":
      app.innerHTML = "";
      finalResult = buildKajabiResultPayload(state.results || calculateResults(state.answers));
      console.log("Final quiz result:", finalResult);
      initKajabiForm();
      if (!kajabiPrepared) {
        prepareKajabiForm(finalResult);
      }
      bindVisibleLeadForm();
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
  const ui = getUI();
  app.innerHTML = `
    <section class="hero">
      <div class="hero-card panel">
        <div>
          <span class="eyebrow">${ui.eyebrow || ui.quizLabel}</span>
          <h1 class="title">${ui.landingTitle}</h1>
          <p class="subtitle">${ui.landingSubtitle}</p>
          <div class="support-list">
            <div class="support-item">${ui.landingSupport1 || ui.supportDuration}</div>
            <div class="support-item">${ui.landingSupport2 || ui.supportEmail}</div>
          </div>
          <div class="button-row">
            <button class="button" data-action="start-quiz">${ui.startQuiz}</button>
            ${
              Object.keys(state.answers).length > 0
                ? `<button class="ghost-button" data-action="resume-quiz">${ui.resumeQuiz}</button>`
                : ""
            }
          </div>
        </div>
        <aside class="hero-aside">
          <div class="metric-card">
            <strong>${ui.metricOneTitle}</strong>
            <p>${ui.metricOneBody}</p>
          </div>
          <div class="metric-card">
            <strong>${ui.metricTwoTitle}</strong>
            <p>${ui.metricTwoBody}</p>
          </div>
          <div class="metric-card">
            <strong>${ui.metricThreeTitle}</strong>
            <p>${ui.metricThreeBody}</p>
          </div>
        </aside>
      </div>
    </section>
  `;
}

function renderQuestion() {
  const ui = getUI();
  const question = getTranslatedQuestion(QUESTIONS[state.currentQuestionIndex]);
  const progress = ((state.currentQuestionIndex + 1) / QUESTIONS.length) * 100;
  const questionCount =
    typeof ui.questionMeta === "function"
      ? ui.questionMeta(state.currentQuestionIndex + 1, QUESTIONS.length)
      : ui.questionCount
          .replace("{current}", state.currentQuestionIndex + 1)
          .replace("{total}", QUESTIONS.length);
  const questionLabel =
    typeof ui.questionLabel === "function" ? ui.questionLabel(question.id) : `${question.id} ${ui.questionLabel}`;

  app.innerHTML = `
    <section class="question-layout">
      <div class="question-card panel">
        <div class="topbar">
          <div class="progress-wrap">
            <div class="progress-meta">
              <span>${questionCount}</span>
              <span>${Math.round(progress)} %</span>
            </div>
            <div class="progress-bar" aria-hidden="true">
              <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
          </div>
          <button class="back-button" data-action="go-back">${ui.back}</button>
        </div>

        <div>
          <span class="section-label">${questionLabel}</span>
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

function renderResult() {
  const results = state.results || calculateResults(state.answers);
  const ui = getUI();
  const resultsContent = getResults();
  const patternLabels = getPatternLabels();
  const secondarySnippets = getSecondarySnippets();
  const severityCopy = getSeverityCopy();
  const severityCtas = getSeverityCTA();
  const helpPriorityMeta = getHelpPriorityMeta()[results.helpPriority];
  const content = resultsContent[results.primary];
  const secondaryLabel = patternLabels[results.secondary];
  const blended = secondarySnippets[results.primary][results.secondary] || "";
  const severityCTA = severityCtas[results.severity] || severityCtas.MEDIUM;
  const framingText = ui.framing || ui.framingText;
  const severityClass = `severity-${results.severity.toLowerCase()}`;

  app.innerHTML = `
    <section class="result-layout ${severityClass}">
      <div class="result-card panel">
        <div class="topbar">
          <span class="section-label"><strong>${ui.resultLabel}</strong> ${ui.quizLabel}</span>
          <button class="back-button" data-action="restart-quiz">${ui.restart}</button>
        </div>

        <div class="result-header">
          <div class="result-meta">
            <span class="result-chip"><strong>${ui.dominantPattern}</strong> ${patternLabels[results.primary]}</span>
            <span class="result-chip"><strong>${ui.secondaryPattern}</strong> ${secondaryLabel}</span>
            <span class="result-chip"><strong>${ui.severity}</strong> ${results.severity}</span>
            ${
              helpPriorityMeta
                ? `<span class="result-chip"><strong>${ui.helpNeed}</strong> ${helpPriorityMeta.label}</span>`
                : ""
            }
          </div>
          <p class="result-framing">${framingText}</p>
          <h2 class="result-title">${content.title}</h2>
          <p class="result-intro">${content.diagnostic}</p>
          <p class="result-balance">${ui.balance || ui.balanceText}</p>
        </div>

        <section class="result-cta-top">
          <p class="result-cta-top-copy">${severityCTA.shortText || severityCTA.text}</p>
          <div class="button-row result-cta-top-actions">
            <a
              class="button"
              data-action="book-call"
              data-placement="upper"
              href="${BOOKING_URL}"
              target="_blank"
              rel="noreferrer noopener"
            >
              ${severityCTA.button}
            </a>
          </div>
          <p class="result-cta-subtext">${ui.ctaBookingSub || ui.callLength}</p>
        </section>

        <div class="result-grid">
          <section class="result-section">
            <h3>${ui.showsAs}</h3>
            <ul>
              ${content.showsAs.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </section>
          <section class="result-section">
            <h3>${ui.whatLiesUnder || ui.under}</h3>
            <p>${content.under}</p>
          </section>
          <section class="result-section">
            <h3>${ui.nextStep}</h3>
            <p>${content.nextStep}</p>
          </section>
        </div>

        ${blended ? `<p class="result-blend">${blended}</p>` : ""}
        <p class="result-severity">${severityCopy[results.severity]}</p>
        ${
          results.severity === "LOW"
            ? `<p class="result-positive">
                ${ui.lowPositive}
              </p>`
            : ""
        }
        ${
          helpPriorityMeta
            ? `
              <section class="result-section">
                <h3>${ui.whatYouNeedMost || ui.helpPriorityTitle}</h3>
                <p>${helpPriorityMeta.resultCopy}</p>
              </section>
            `
            : ""
        }

        <p class="cta-support">${severityCTA.text}</p>
        <div class="button-row">
          <a class="button" data-action="book-call" data-placement="lower" href="${BOOKING_URL}" target="_blank" rel="noreferrer noopener">
            ${severityCTA.button}
          </a>
          <button class="ghost-button" data-action="restart-quiz">${ui.retake || ui.restartOtherTeam}</button>
        </div>
        <p class="cta-support">${ui.ctaBookingSub || ui.callLength}</p>
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
        placement: button.dataset.placement || "default",
      });
    });
  });
}
