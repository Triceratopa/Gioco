//  controlla se l'utente ha già dichiarato il nome
let playerHasSetName = false;

// Funzione per inizializzare JS-Interpreter
function initInterpreter(interpreter, globalThis) {
  // Funzione di verifica
  interpreter.setProperty(
    globalThis,
    "checkName",
    interpreter.createNativeFunction(function () {
      if (playerHasSetName) {
        return interpreter.createPrimitive(
          "Perfetto! Avanzi al prossimo livello!"
        );
      } else {
        return interpreter.createPrimitive(
          "Devi dichiarare una const nome = 'TuoNome';"
        );
      }
    })
  );
}

// Creo l'interprete con codice vuoto iniziale
let myInterpreter = new Interpreter("", initInterpreter);

// Funzione per eseguire il codice dell’utente
document.getElementById("run-code").addEventListener("click", function () {
  const userCode = document.getElementById("user-code").value;

  console.log("Codice utente ricevuto:", userCode);

  // Controllo
  if (/const\s+nome\s*=\s*['"][a-zA-Z]+['"]\s*;/.test(userCode)) {
    playerHasSetName = true;
  } else {
    playerHasSetName = false;
  }

  //  l'interprete con il codice dell'utente
  myInterpreter = new Interpreter(userCode, function (
    interpreter,
    globalObject
  ) {
    initInterpreter(interpreter, globalThis);

    // Blocco ogni ridefinizione di nome
    if (playerHasSetName) {
      interpreter.setProperty(
        globalObject,
        "nome",
        interpreter.createPrimitive(
          userCode.match(/const\s+nome\s*=\s*['"]([a-zA-Z]+)['"]\s*;/)[1]
        )
      );
    }
  });

  try {
    myInterpreter.run(); // Esegui il codice
    document.getElementById("output").textContent =
      myInterpreter.value || "Codice eseguito!";
  } catch (error) {
    document.getElementById("output").textContent = "Errore: " + error.message;
  }
});
