document.addEventListener("DOMContentLoaded", function () {
  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("jwt");
  if (!userId || !token) {
    alert("Accesso non autorizzato! Torna alla pagina di login.");
    window.location.href = "/setUpBase/LoginPage.html";
    return;
  }

  fetch(`http://localhost:8080/api/player/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "Errore nel recupero dei dati utente: " + response.status
        );
      }
      return response.json();
    })

    .catch((error) => {
      console.error("Errore:", error);
      alert("Impossibile recuperare i dati dell'utente.");
    });
});

function addCard() {
  const token = localStorage.getItem("jwt");
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;

  const cardData = {
    title: title,
    description: description,
    category: category,
  };

  fetch("http://localhost:8080/api/card", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(cardData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Dati ricevuti dal server:", data);
      addCardToDOM(data);
    })
    .catch((error) => console.error("Errore:", error));
}

function addCardToDOM(card) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.id = `card-${card.id}`;

  cardElement.innerHTML = `
    <input id="title-${card.id}" value="${card.title}" />
    <input id="description-${card.id}" value="${card.description}"  maxlength="1000" />
    <input id="category-${card.id}" value="${card.category}" />
    <button onclick="updateCard(${card.id})">Modifica</button>
    <button onclick="deleteCard(${card.id})">Elimina</button>
  `;

  const categoryContainer = document.getElementById(
    `category-${card.category}`
  );

  if (categoryContainer) {
    categoryContainer.appendChild(cardElement);
  } else {
    console.log(
      "Errore: Contenitore della categoria non trovato!",
      card.category
    );
  }
}

function updateCard(cardId) {
  const token = localStorage.getItem("jwt");
  const titleInput = document.getElementById(`title-${cardId}`);
  const descriptionInput = document.getElementById(`description-${cardId}`);
  const categoryInput = document.getElementById(`category-${cardId}`);

  const updatedCard = {
    title: titleInput.value,
    description: descriptionInput.value,
    category: categoryInput.value,
  };

  fetch(`http://localhost:8080/api/card/${cardId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedCard),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Errore HTTP! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Card aggiornata:", data);

      document.getElementById(`title-${cardId}`).value = data.title;
      document.getElementById(`description-${cardId}`).value = data.description;
      document.getElementById(`category-${cardId}`).value = data.category;

      alert("Modifica salvata con successo!");
    })
    .catch((error) => {
      console.error("Errore durante l'aggiornamento:", error);
      alert("Errore durante l'aggiornamento della card.");
    });
}

function deleteCard(cardId) {
  const token = localStorage.getItem("jwt");

  fetch(`http://localhost:8080/api/card/${cardId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log("Card eliminata con successo!");

        const cardElement = document.getElementById(`card-${cardId}`);
        if (cardElement) {
          cardElement.remove();
        } else {
          console.error("Elemento della card non trovato nel DOM!");
        }
      } else {
        console.error(
          "Impossibile eliminare la card, il server ha restituito:",
          response.status
        );
      }
    })
    .catch((error) => {
      console.error("Errore:", error);
    });
}
