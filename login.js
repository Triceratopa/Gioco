document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const userData = {
      username: document.getElementById("Username").value,
      password: document.getElementById("Password").value,
    };
    console.log(userData);

    fetch("http://localhost:8080/api/player/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          console.log(document.getElementById("Username").value);
          throw new Error("Errore nel login: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Login riuscito!", data);
        if (data.token) {
          // Memorizza il token nel localStorage
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("id", data.id);
          alert("Login effettuato con successo!");

          //renderizzo
          if (data.id === 1) {
            window.location.href = "/setUpBase/adminAccount.html";
          } else {
            window.location.href = "/setUpBase/AccountPage.html"; // Pagina utente normale
          }
        } else {
          alert("Errore: nessun token ricevuto.");
        }
      })
      .catch((error) => {
        console.error("Errore nella richiesta:", error);
        alert("Login fallito. Riprova.");
      });
  });
});
