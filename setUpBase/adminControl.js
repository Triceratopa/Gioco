let isEditing = false;

function toggleEdit() {
  isEditing = !isEditing;

  // Abilita o disabilita i campi modificabili
  const editableFields = document.querySelectorAll(".editable");
  editableFields.forEach((field) => {
    field.contentEditable = isEditing;
  });
}
document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("jwt"); // Prendi il token JWT salvato
  if (!token) {
    alert("Accesso non autorizzato. Effettua il login.");
    window.location.href = "/setUpBase/login.html";
    return;
  }

  fetch("http://localhost:8080/api/player", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // Passiamo il token per autenticazione
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nel recupero utenti: " + response.status);
      }
      return response.json();
    })
    .then((users) => {
      console.log("Utenti recuperati:", users);
      displayUsers(users);
    })
    .catch((error) => {
      console.error("Errore:", error);
      alert("Errore nel caricamento utenti.");
    });
});

function deleteUser(userId) {
  const token = localStorage.getItem("jwt");

  if (!confirm("Sei sicuro di voler eliminare questo utente?")) {
    return;
  }

  fetch(`http://localhost:8080/api/player/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nell'eliminazione: " + response.status);
      }
      return response.text();
    })
    .then(() => {
      alert("Utente eliminato con successo!");
      location.reload();
    })
    .catch((error) => {
      console.error("Errore:", error);
      alert("Errore durante l'eliminazione dell'utente.");
    });
}

function displayUsers(users) {
  const userContainer = document.querySelector(".card-body");
  userContainer.innerHTML = "";

  users.forEach((user) => {
    const userCard = document.createElement("div");
    userCard.innerHTML = `
      <p><strong>Nome:</strong> <span>${user.name}</span></p>
      <p><strong>Cognome:</strong> <span>${user.surname}</span></p>
      <p><strong>Username:</strong> <span>${user.username}</span></p>
      <p><strong>Email:</strong> <span>${user.email}</span></p>
      <p><strong>Giochi Completati:</strong> <span>1</span></p>
      <p><strong>Livelli Completati:</strong> <span>${user.level}</span></p>
      <button class="btn " onclick="changeUser(${user.id})">Modifica</button>
      <button class="btn " onclick="deleteUser(${user.id})">Elimina</button>
      <hr>
    `;
    userContainer.appendChild(userCard);
  });
}
