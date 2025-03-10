//iniziamo a dare movimento al personaggio
//window ci da la possibilità di rendere il tasto cliccato valido a prescindere da dove
//keydown comprende ogni tasto possibile della tastiera prima che venga digitato
window.addEventListener("keydown", (event) => {
  //console.log(event);
  switch (event.key) {
    case "w":
      //console.log("pressed w");
      if (player.velocity.y === 0) player.velocity.y = -10;
      break;
    case "d":
      keys.d.pressed = true;
      break;
    case "a":
      keys.a.pressed = true;
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
  }
});
