document.getElementById("saveButton").addEventListener("click", function () {
  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("jwt");

  if (!userId || !token) {
    alert("Devi essere loggato per salvare il gioco!");
    return;
  }

  // Dati del gioco da salvare (esempio: punteggio e livello)
  const gameData = {
    userId: userId,
    score: currentScore, // Variabile del punteggio attuale
    level: currentLevel, // Variabile del livello attuale
  };

  fetch("http://localhost:8080/api/player/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(gameData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nel salvataggio: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Salvataggio riuscito!", data);
      alert("Partita salvata con successo!");
    })
    .catch((error) => {
      console.error("Errore nel salvataggio:", error);
      alert("Impossibile salvare il gioco.");
    });
});
