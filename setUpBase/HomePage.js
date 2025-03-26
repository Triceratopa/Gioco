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

    .then((data) => {
      console.log("Dati utente:", data);

      document.getElementById("name").textContent = data.name;
      document.getElementById("surname").textContent = data.surname;
      document.getElementById("username").textContent = data.username;

      const accountLink = document.getElementById("account");

      if (data.role === "admin" || userId === "1") {
        accountLink.setAttribute("href", "./adminAccount.html");
      } else {
        accountLink.setAttribute("href", "./AccountPage.html");
      }
    })

    .catch((error) => {
      console.error("Errore:", error);
      alert("Impossibile recuperare i dati dell'utente.");
    });
});
