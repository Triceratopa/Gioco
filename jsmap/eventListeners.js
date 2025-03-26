window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "w":
      keys.w.pressed = true;
      break;
    case "a":
      keys.a.pressed = true;
      break;
    case "s":
      keys.s.pressed = true;
      break;
    case "d":
      keys.d.pressed = true;
      break;
    case "Escape":
      togglePauseMenu();
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "w":
      keys.w.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }
});

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    lastTime = performance.now();
  }
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
