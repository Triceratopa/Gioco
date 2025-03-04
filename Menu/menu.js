// Gestione dell'overlay per la nuova partita
document.getElementById("new-game").addEventListener("click", function () {
  document.getElementById("new-overlay").classList.add("show");
});

// Chiudere l'overlay cliccando fuori dal contenuto ma non mi funziona
//document.getElementById("new-overlay").addEventListener("click", function (e) {
// if (e.target === this) this.classList.remove("show")
//})

// Funzione per mostrare la creazione dell'account
function showAccountCreation() {
  document.querySelector(".drop-menu").innerHTML = `
        <h3>Crea il tuo account</h3>
        <input type="text" placeholder="Username">
        <input type="email" placeholder="Email">
        <input type="password" placeholder="Password">
        <button id="register">Registrati</button>
        <button class="back-form">Indietro</button>
      `;
}

// Funzione per mostrare il menu principale
function showMainMenu() {
  document.querySelector(".drop-menu").innerHTML = `
        <button id="new-account">Crea un account</button>
        <button id="guest">Gioca come ospite</button>
        <button class="back-menu">Indietro</button>
    `;
}

//Uso else if per gestire i due bottoni indietro, se no non mi va
document.querySelector(".drop-menu").addEventListener("click", function (e) {
  if (e.target.id === "new-account") {
    showAccountCreation();
  } else if (e.target.classList.contains("back-form")) {
    showMainMenu();
  } else if (e.target.classList.contains("back-menu")) {
    document.getElementById("new-overlay").classList.remove("show");
  }
});
