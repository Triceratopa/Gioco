function addCard() {
  let title = document.getElementById("title").value;
  let difficulty = document.getElementById("difficulty").value;
  let description = document.getElementById("description").value;

  if (title === "" || description === "") {
    alert("Compila tutti i campi!");
    return;
  }

  let cardContainer = document.getElementById("cardContainer");
  let card = document.createElement("div");
  card.className = "col-md-4";
  card.innerHTML = `
        <div class="card p-3">
            <h5 class="card-title">${title}</h5>
            <span class="difficulty badge bg-info">${difficulty}</span>
            <p class="card-text mt-2">${description}</p>
            <button class="btn btn-warning btn-sm" onclick="editCard(this)">Modifica</button>
            <button class="btn btn-danger btn-sm" onclick="removeCard(this)">Elimina</button>
        </div>
    `;
  cardContainer.appendChild(card);

  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
}

function removeCard(button) {
  button.parentElement.parentElement.remove();
}

function editCard(button) {
  let card = button.parentElement;
  let title = card.querySelector(".card-title").textContent;
  let description = card.querySelector(".card-text").textContent;

  let newTitle = prompt("Modifica Titolo", title);
  let newDescription = prompt("Modifica Descrizione", description);

  if (newTitle && newDescription) {
    card.querySelector(".card-title").textContent = newTitle;
    card.querySelector(".card-text").textContent = newDescription;
  }
}

function showCategory(category) {
  // Nascondi tutte le categorie
  const categories = document.querySelectorAll(".category-cards");
  categories.forEach((cat) => {
    cat.style.display = "none";
  });

  // Mostra la categoria selezionata
  const selectedCategory = document.getElementById(category);
  selectedCategory.style.display = "flex";
}
