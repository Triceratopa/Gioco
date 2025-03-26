//iniziamo a dare movimento al personaggio
//window ci da la possibilità di rendere il tasto cliccato valido a prescindere da dove
//keydown comprende ogni tasto possibile della tastiera prima che venga digitato
window.addEventListener("keydown", (event) => {
  if (player.preventInput || dialogActive) return;
  //console.log(event);
  switch (event.key) {
    case "w":
      for (let i = 0; i < doors.length; i++) {
        //creo una finta collisione con la porta solo al click della w
        const door = doors[i];
        if (
          player.hitbox.position.x + player.hitbox.width <=
            door.position.x + door.width &&
          player.hitbox.position.x >= door.position.x &&
          player.hitbox.position.y + player.hitbox.height >= door.position.y &&
          player.hitbox.position.y <= door.position.y + door.height
        ) {
          player.velocity.x = 0;
          player.velocity.y = 0;

          player.preventInput = true;
          player.switchSprite("enterDoor");
          door.play();
          return;
        }
      }
      //console.log("pressed w");
      if (player.velocity.y === 0) player.velocity.y = -15; //altezza
      break;
    case "d":
      keys.d.pressed = true;
      break;
    case "a":
      keys.a.pressed = true;
      break;
    case " ":
      console.log("premuto");
      guide.nextDialog();
      guide.nextAnswer();

      break;
    case "Escape":
      togglePauseMenu();
      break;
  }
});

//keyup blocca il segnale dato dal tasto
window.addEventListener("keyup", (event) => {
  //console.log(event);
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case " ":
      keys.pressed = false;
      break;
  }
});
// Aggiungi l'event listener per il click
window.addEventListener("click", (event) => {
  if (!guide.showQuestion) return;
  guide.handleClick(event);
});

let isPaused = false;
function togglePauseMenu() {
  const pauseMenu = document.getElementById("pauseMenu");

  isPaused = !isPaused;
  console.log("isPaused:", isPaused);
  if (isPaused) {
    pauseMenu.style.display = "flex";
  } else {
    pauseMenu.style.display = "none";
  }
}
document.getElementById("resumeButton").addEventListener("click", () => {
  togglePauseMenu();
});

document.getElementById("saveButton").addEventListener("click", () => {
  console.log("Salvataggio in corso...");
  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("jwt");
  const levelObj = {
    level: 2,
  };

  if (!userId || !token) {
    alert("Accesso non autorizzato! Torna alla pagina di login.");
    window.location.href = "/setUpBase/LoginPage.html";
    return;
  }

  fetch(`http://localhost:8080/api/player/level/${userId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(levelObj),
  })
    .then((response) => {
      console.log("Risposta dal server:", response);
      if (!response.ok) {
        throw new Error("Errore nel salvataggio: " + response.statusText);
      }
    })

    .catch((error) => console.error("Errore nel salvataggio:", error));
});

document.getElementById("exitButton").addEventListener("click", () => {
  window.location.href = "/setUpBase/StartGame.html";
});
