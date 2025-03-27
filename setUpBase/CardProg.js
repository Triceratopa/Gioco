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
  cardElement.innerHTML = `
      <h3>${card.title}</h3>
      <p>${card.description}</p>
      <button onclick="updateCard(${card.id})">Modifica</button>
      <button onclick="deleteCard(${card.id})">Elimina</button>
  `;

  console.log("Categoria della card:", card.category);

  const categoryContainer = document.getElementById(
    `category-${card.category}`
  );

  if (categoryContainer) {
    categoryContainer.appendChild(cardElement);
  } else {
    console.error(
      "Errore: Contenitore della categoria non trovato!",
      card.category
    );
  }
}

function updateCard(cardId) {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;

  const updatedCard = {
    title: title,
    description: description,
    category: category,
  };

  fetch(`http://localhost:8080/api/card${cardId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedCard),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        updateCardInUI(cardId, data.card);
      }
    });
}

function deleteCard(cardId) {
  fetch(`http://localhost:8080/api/card${cardId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        removeCardFromUI(cardId);
      }
    });
}
