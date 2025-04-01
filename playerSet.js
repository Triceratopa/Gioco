const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 64 * 16; //1024
canvas.height = 64 * 9; //576

let parsedCollisions;
let collisionBlocks;
let dialogActive = false;

let background;
//creiamo la base per l'apertura della porta
let doors;

const guide = new Guide({
  position: {
    x: 400,
    y: 350,
  },
  imageSrc: "./img/guide.png",
  frameBuffer: 2,
  frameRate: 11,
  loop: true,
  dialog: [],
  missions: [],
  answer: [],
});

const player = new Player({
  imageSrc: "./img/idle.png",
  frameRate: 11,
  animations: {
    idleRight: {
      frameRate: 11,
      frameBuffer: 2,
      loop: true,
      imageSrc: "./img/idle.png",
    },
    idleLeft: {
      frameRate: 11,
      frameBuffer: 2,
      loop: true,
      imageSrc: "./img/idleLeft.png",
    },
    runRight: {
      frameRate: 8,
      frameBuffer: 4,
      loop: true,
      imageSrc: "./img/runRight.png",
    },
    runLeft: {
      frameRate: 8,
      frameBuffer: 4,
      loop: true,
      imageSrc: "./img/runLeft.png",
    },
    enterDoor: {
      frameRate: 8,
      frameBuffer: 4,
      loop: false,
      imageSrc: "./img/enterDoor.png",
      onComplete: () => {
        gsap.to(overlay, {
          opacity: 1,
          onComplete: () => {
            level++;
            if (level === 4) {
              window.location.href = "middle.html";
            }

            levels[level].init();
            player.switchSprite("idleRight");
            player.preventInput = false;
            gsap.to(overlay, {
              opacity: 0,
            });
          },
        });
      },
    },
  },
});

let level = 1;
let levels = {
  1: {
    // creo tutto il necessario per il setup del primo livello
    init: () => {
      parsedCollisions = collisionsLv1.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2D();

      player.collisionBlocks = collisionBlocks;

      if (player.currentAnimation) player.currentAnimation.isActive = false;
      guide.startDialog();
      guide.dialog = dialogueLv1;
      guide.missions = questionLv1;
      guide.finishQuiz();
      guide.answer = dialogueLv1Answer;

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: "./img/backgroundLevel1.png",
      });

      doors = [
        new Sprite({
          position: {
            x: 767, // grazie a tiled posso posizionare gli oggetti e avere le coordinate
            y: 270,
          },
          imageSrc: "./img/doorOpen.png",
          frameRate: 5, // il framerate = conti i frame così raggruppa in uno
          frameBuffer: 5,
          loop: false, // riduce la velocità del frame = più è alto , più è lento
          autoplay: false,
        }),
      ];
    },
  },
  2: {
    init: () => {
      parsedCollisions = collisionsLv2.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      player.position.x = 96; // posizione dello spawn nel nuovo livello
      player.position.y = 140;

      if (player.currentAnimation) player.currentAnimation.isActive = false;
      guide.position.x = 710;
      guide.position.y = 415;
      guide.startDialog();
      guide.dialog = dialogueLv2;
      guide.missions = questionLv2;
      guide.finishQuiz();
      guide.answer = dialogueLv2Answer;

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: "./img/backgroundLevel2.png",
      });

      doors = [
        new Sprite({
          position: {
            x: 772.0, // grazie a tiled posso posizionare gli oggetti e avere le coordinate
            y: 336,
          },
          imageSrc: "./img/doorOpen.png",
          frameRate: 5, // il framerate = conti i frame così raggruppa in uno
          frameBuffer: 5,
          loop: false, // riduce la velocità del frame = più è alto , più è lento
          autoplay: false,
        }),
      ];
    },
  },
  3: {
    // creo tutto il necessario per il setup del primo livello
    init: () => {
      parsedCollisions = collisionsLv3.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      player.position.x = 780; // posizione dello spawn nel nuovo livello
      player.position.y = 367;

      if (player.currentAnimation) player.currentAnimation.isActive = false;

      guide.startDialog();
      guide.dialog = dialogueLv3;
      guide.missions = questionLv3;

      guide.finishQuiz();
      guide.answer = dialogueLv3Answer;

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: "./img/backgroundLevel3.png",
      });

      doors = [
        new Sprite({
          position: {
            x: 175.68, // grazie a tiled posso posizionare gli oggetti e avere le coordinate
            y: 335,
          },
          imageSrc: "./img/doorOpen.png",
          frameRate: 5, // il framerate = conti i frame così raggruppa in uno
          frameBuffer: 5,
          loop: false, // riduce la velocità del frame = più è alto , più è lento
          autoplay: false,
        }),
      ];
    },
  },
};

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
  space: {
    pressed: false,
  },
};

const overlay = {
  opacity: 0,
};

function animate() {
  window.requestAnimationFrame(animate);
  //clearRect ripulisce il canvas per non far sovrapporre le cose
  //altrimenti diventerebbe un blocco che continua ad allungarsi
  // questo avviene perchè non leviamo il frame precedente = lascia una scia
  //clearRect (x,y,width, height)
  //c.clearRect(0,0, canvas.width, canvas.height)

  background.draw();

  //drawMissionDialog.draw();
  //collisionBlocks.forEach((collisionBlock) => {
  // collisionBlock.draw();
  //});
  //porta
  doors.forEach((door) => {
    door.draw();
  });

  //fillStyle crea il colore dell'oggetto, ma non disegna
  // c.fillStyle = "black";
  //fillRect disegna l'oggetto
  //fillRect(x,y,width, height)
  // c.fillRect(0, 0, canvas.width, canvas.height);
  //richiamo

  player.handleInput(keys);
  player.draw();
  player.update();

  guide.draw();
  guide.drawTextBox();

  //logica per passare al prossimo livello
  c.save();
  c.globalAlpha = overlay.opacity;
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.restore();
}

levels[level].init();
animate();
