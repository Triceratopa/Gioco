// Funzione per aprire un overlay
function openOverlay(overlayId) {
  document.getElementById(overlayId).classList.add("show");
}

// Funzione per chiudere un overlay
function closeOverlay(overlayId) {
  document.getElementById(overlayId).classList.remove("show");
}

// Apro overlay  "Nuova Partita"
document.getElementById("new-game").addEventListener("click", function () {
  openOverlay("new-overlay-game");
});

// Apro l' overlay "Carica Partita"
document.getElementById("load-game").addEventListener("click", function () {
  openOverlay("load-overlay");
});

//Apro l'overlay "Carica livello"
document.getElementById("levels").addEventListener("click", function () {
  openOverlay("levels-overlay");
});

//Apro l'overlay "Impostazioni"
document.getElementById("settings").addEventListener("click", function () {
  openOverlay("settings-overlay");
});

// Chiud overlay cliccando fuori dal menu, non funziona benissimo
document.querySelectorAll(".hidden").forEach((overlay) => {
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
      overlay.classList.remove("show");
    }
  });
});

// Gestione menu "Nuova partita"
document
  .getElementById("new-account")
  .addEventListener("click", showAccountCreation);

function showAccountCreation() {
  document.querySelector("#new-overlay-game .drop-menu").innerHTML = `
        <h3>Crea il tuo account</h3>
        <input type="text" placeholder="Username">
        <input type="email" placeholder="Email">
        <input type="password" placeholder="Password">
        <button id="register">Registrati</button>
        <button class="back">Indietro</button>
      `;

  document.querySelector(".back").addEventListener("click", showMainMenu);
}

function showMainMenu() {
  document.querySelector("#new-overlay-game .drop-menu").innerHTML = `
        <button id="new-account">Crea un account</button>
        <button id="guest">Gioca come ospite</button>
        <button class="back">Indietro</button>
    `;

  document
    .getElementById("new-account")
    .addEventListener("click", showAccountCreation);
  document.querySelector(".back").addEventListener("click", function () {
    closeOverlay("new-overlay-game");
  });
}

//Gestione menu "Carica partita"
document.getElementById("load-game").addEventListener("click", showLoadGame);
function showLoadGame() {
  document.querySelector("#load-overlay .drop-menu").innerHTML = `
  <h3>Carica partita</h3>
  <ul>
  <li>salvataggio1</li></ul>
  <button class="load-back">Indietro</button>`;
  document.querySelector(".load-back").addEventListener("click", function () {
    closeOverlay("load-overlay");
  });
}

//Gestione "carica livello"
document.getElementById("levels").addEventListener("click", showLevels);
function showLevels() {
  document.querySelector("#levels-overlay .drop-menu").innerHTML = `
   <h3>Seleziona il livello</h3>
  <ul>
  <li>Livello 1</li></ul>
  <button class="level-back">Indietro</button>
  `;
  document.querySelector(".level-back").addEventListener("click", function () {
    closeOverlay("levels-overlay");
  });
}

//Gestione "Impostazioni"
document.getElementById("settings").addEventListener("click", showSettings);
function showSettings() {
  document.querySelector("#settings-overlay .drop-menu").innerHTML = `
   <h3>Impostazioni</h3>
   <div id="music-option">
  <p>Audio</p></div>
  <div id="lang-option"><p>Lingua</p> <form action="#">
      
      <select name="languages" id="lang">
       <option value="Italiano">Italiano</option>
        <option value="English">English</option></select>
     
</form></div>
  <button class="settings-back">Indietro</button>
  `;
  document
    .querySelector(".settings-back")
    .addEventListener("click", function () {
      closeOverlay("settings-overlay");
    });
}

// Chiudo gli overlay con il pulsante "Indietro"
document.querySelectorAll(".back").forEach((btn) => {
  btn.addEventListener("click", function () {
    closeOverlay("new-overlay-game");
    closeOverlay("load-overlay");
    closeOverlay("levels-overlay");
    closeOverlay("settings-overlay");
  });
});
