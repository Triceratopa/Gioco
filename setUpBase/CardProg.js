// Funzione per aggiungere una card
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

// Funzione per aggiungere la card al DOM
function addCardToDOM(card) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.id = `card-${card.id}`; // Aggiungi l'id per la card

  cardElement.innerHTML = `
    <input id="title-${card.id}" value="${card.title}" />
    <input id="description-${card.id}" value="${card.description}" />
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

// Funzione per aggiornare una card
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

      // Modifica il contenuto della card aggiornata nel DOM
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

// Funzione per eliminare una card
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

        // Assicurati che l'elemento esista prima di rimuoverlo
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
