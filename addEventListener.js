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
  guide.handleClick(event); // Se non siamo nella schermata delle domande, ignoriamo il click
});
