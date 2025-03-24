// Funzione per modificare i dettagli dell'utente
function editUser() {
  // Abilita la modifica dei dettagli dell'utente
  document.getElementById("userName").contentEditable = true;
  document.getElementById("userSurname").contentEditable = true;
  document.getElementById("userUsername").contentEditable = true;
  document.getElementById("userEmail").contentEditable = true;
  document.getElementById("userGames").contentEditable = true;
  document.getElementById("userLevels").contentEditable = true;
}

/// Funzione per attivare/disattivare la modifica dei campi
function toggleEdit() {
  const fields = document.querySelectorAll(
    "#userName, #userSurname, #userUsername, #userPassword, #userEmail, #userGames, #userLevels"
  );
  fields.forEach((field) => {
    // Se il campo è modificabile, metti un placeholder (se il campo è vuoto)
    if (field.contentEditable === "false") {
      field.contentEditable = "true";
      field.setAttribute(
        "data-placeholder",
        `Inserisci ${field.previousElementSibling.textContent.toLowerCase()}`
      );
    } else {
      field.contentEditable = "false";
      field.removeAttribute("data-placeholder");
    }
  });
}

// Funzione per salvare i cambiamenti
function saveUser() {
  const fields = document.querySelectorAll(
    "#userName, #userSurname, #userUsername, #userPassword, #userEmail, #userGames, #userLevels"
  );
  fields.forEach((field) => {
    field.contentEditable = "false";
  });

  alert("Dati salvati!");
}

// Funzione per salvare i cambiamenti
function saveUser() {
  // Salva i dati modificati
  document.getElementById("userName").contentEditable = false;
  document.getElementById("userSurname").contentEditable = false;
  document.getElementById("userUsername").contentEditable = false;
  document.getElementById("userEmail").contentEditable = false;
  document.getElementById("userGames").contentEditable = false;
  document.getElementById("userLevels").contentEditable = false;

  alert("Dati salvati!");
}

// Funzione per eliminare l'utente
function deleteUser() {
  let confirmation = confirm("Sei sicuro di voler eliminare questo utente?");
  if (confirmation) {
    alert("Utente eliminato!");
    // Qui dovresti fare l'operazione di eliminazione (ad esempio, inviare una richiesta a un server)
  }
}
