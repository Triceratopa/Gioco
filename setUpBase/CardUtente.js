document.addEventListener("DOMContentLoaded", function () {
  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("jwt");
  if (!userId || !token) {
    alert("Accesso non autorizzato! Torna alla pagina di login.");
    window.location.href = "/setUpBase/LoginPage.html";
    return;
  }
  AllCards();
});

function AllCards() {
  const token = localStorage.getItem("jwt");

  if (!token) {
    console.error("Token JWT mancante.");
    return;
  }

  fetch("http://localhost:8080/api/card", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Errore nella risposta del server: ${response.status}`);
      }
      return response.json();
    })
    .then((cards) => {
      console.log("Dati ricevuti dal server:", cards);
      renderCards(cards);
    })
    .catch((error) => {
      console.error("Errore nel recupero delle card:", error);
      alert("Si è verificato un errore nel recuperare le card.");
    });
}

function renderCards(cards) {
  const container = document.getElementById("cards-container");
  cards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.innerHTML = `
      <h3>${card.title}</h3>
      <p>${card.description}</p>
       <p>${card.category}</p>
    `;
    container.appendChild(cardElement);
  });
}
