const translate = {
  en: {
    title: "JS Adventure",
    start: "Start",
    title: "JS Adventure",
    newGame: "New Game",
    createAccount: "Create Account",
    playAsGuest: "Play as Guest",
    back: "Back",
    loadGame: "Load Game",
    loadLevel: "Load Level",
    settings: "Settings",
  },

  it: {
    title: "Avventura JS",
    start: "Inizia",

    newGame: "Nuova partita",
    createAccount: "Crea un account",
    playAsGuest: "Gioca come ospite",
    back: "Indietro",
    loadGame: "Carica partita",
    loadLevel: "Carica livello",
    settings: "Impostazioni",
  },
};

let currentLanguage = "it";

function updateText() {
  document.querySelector("h1").textContent =
    translations[currentLanguage].title;
  document.querySelector("button a").textContent =
    translations[currentLanguage].start;
  document.getElementById("new-game").textContent =
    translations[currentLanguage].newGame;
  document.getElementById("new-account").textContent =
    translations[currentLanguage].createAccount;
  document.getElementById("guest").textContent =
    translations[currentLanguage].playAsGuest;
  document.querySelector(".back").textContent =
    translations[currentLanguage].back;
  document.getElementById("load-game").textContent =
    translations[currentLanguage].loadGame;
  document.getElementById("levels").textContent =
    translations[currentLanguage].loadLevel;
  document.getElementById("settings").textContent =
    translations[currentLanguage].settings;
}

updateText();
