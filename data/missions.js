const Username = "gatta";

const questionLv1 = [
  {
    question:
      "Come possiamo impostarlo? Ricordati che non potrà esser cambiato nel tempo",
    options: [
      `let nome = ${Username}`,
      `var nome = ${Username}`,
      `const nome = ${Username}`,
    ],
    answer: `const nome = ${Username}`,
    onCorrectAnswer:
      "Perfetto! Ora possiamo attraversare la porta e passare al prossimo piano!",
  },
];

const questionLv2 = [
  {
    question:
      "Hai dichiarato il tuo nome con const, ma sai di che tipo di dato si tratta?",
    options: ["String", "Number", "Boolean"],
    answer: "String",
  },
];

const questionLv3 = [
  {
    question: "Vuoi salutarmi? Quale delle seguenti opzioni è corretta?",
    options: [
      'console.log("Ciao" + Guida)',
      'console.log("Ciao " + Guida)',
      'console.log("Ciao", Guida)',
    ],
    answer: 'console.log("Ciao " + Guida)',
  },
];

const questionLv3A = [
  {
    question:
      "Hai visto che puoi concatenare le stringhe con +, ma esiste un altro modo più moderno per farlo. Quale di queste opzioni è corretta?",
    options: [
      "console.log(`Ciao ${nome}`)",
      'console.log("Ciao ${nome}");',
      "console.log('Ciao ${nome}')",
    ],
    answer: "console.log(`Ciao ${nome}`)",
  },
];
