const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 64 * 16; //1024
canvas.height = 64 * 9; //576

const parsedCollisions = collisionsLv1.parse2D();
const collisionBlocks = parsedCollisions.createObjectsFrom2D();

const backgroundLevel1 = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./img/backgroundLevel1.png",
});

const player = new Player({
  collisionBlocks,
  imageSrc: "./img/idle.png",
  frameRate: 11,
});
//utilizzo requestAnimationFrame per creare animazioni fluide
//aggiungo una funzione che darà movimento al personaggio

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

function animate() {
  window.requestAnimationFrame(animate);
  //clearRect ripulisce il canvas per non far sovrapporre le cose
  //altrimenti diventerebbe un blocco che continua ad allungarsi
  // questo avviene perchè non leviamo il frame precedente = lascia una scia
  //clearRect (x,y,width, height)
  //c.clearRect(0,0, canvas.width, canvas.height)

  backgroundLevel1.draw();
  collisionBlocks.forEach((collisionBlock) => {
    collisionBlock.draw();
  });

  //fillStyle crea il colore dell'oggetto, ma non disegna
  // c.fillStyle = "black";
  //fillRect disegna l'oggetto
  //fillRect(x,y,width, height)
  // c.fillRect(0, 0, canvas.width, canvas.height);
  //richiamo
  player.velocity.x = 0;
  if (keys.d.pressed) {
    player.velocity.x = 5;
  } else if (keys.a.pressed) {
    player.velocity.x = -5;
  }
  player.draw();
  player.update();
}
animate();
