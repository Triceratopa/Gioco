document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const userData = {
      name: form.firstName.value,
      surname: form.lastName.value,
      email: form.email.value,
      password: form.password.value,
      username: form.username.value,
    };

    fetch("http://localhost:8080/api/player/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("id", data.id);
          alert("Registrazione avvenuta con successo! Ora puoi fare il login.");
          window.location.href = "/setUpBase/AccountPage.html";
        } else {
          alert("Errore nella registrazione: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Errore:", error);
        alert("Si è verificato un errore. Riprova più tardi.");
      });
  });
});
