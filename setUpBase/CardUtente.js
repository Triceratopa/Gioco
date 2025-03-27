function AllCards() {
  const token = localStorage.getItem("jwt");

  fetch("http://localhost:8080/api/card", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((cards) => {
      console.log("Dati ricevuti dal server:", cards);
      renderCards(cards);
    })
    .catch((error) => console.error("Errore nel recupero delle card:", error));
}
