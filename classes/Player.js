//creare una classe per i personaggi è molto utile permette
// riutilizzabilità
//organizzazione
//scalabilità
class Player extends Sprite {
  //specifiche di base che avrà il personaggio principale
  constructor({
    //aggiungiamo l'effetto di collisione del personaggio con gli ostacoli
    collisionBlocks = [],
    imageSrc,
    frameRate,
    animations,
    loop,
  }) {
    super({ imageSrc, frameRate, animations, loop });
    this.position = {
      x: 200,
      y: 200,
    };

    this.velocity = {
      x: 0,
      y: 0,
    };

    this.sides = {
      bottom: this.position.y + this.height,
    };
    this.gravity = 1;

    this.collisionBlocks = collisionBlocks;
  }

  update() {
    //serviva per creare il personaggio
    // c.fillStyle = "rgb(0,0, 255, 0.5)";
    // c.fillRect(this.position.x, this.position.y, this.width, this.height);

    //definiamo la velocità iniziale dell'oggetto
    // controlliamo che vada  this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    this.updateHitbox();

    //collisione orizzontale
    this.checkForHorizontalCollisions();

    //applico gravity
    this.applyGravity();

    this.updateHitbox();
    // c.fillRect(
    //   this.hitbox.position.x,
    //  this.hitbox.position.y,
    //   this.hitbox.width,
    //  this.hitbox.height
    //);
    //collisione verticale
    this.checkForVerticalCollisions();
  }

  handleInput(keys) {
    if (this.preventInput) return;
    this.velocity.x = 0;
    if (keys.d.pressed) {
      this.switchSprite("runRight");
      this.velocity.x = 5;
      this.lastDirections = "right";
    } else if (keys.a.pressed) {
      this.switchSprite("runLeft");
      this.velocity.x = -5;
      this.lastDirections = "left";
    } else {
      if (this.lastDirections === "left") this.switchSprite("idleLeft");
      else this.switchSprite("idleRight");
    }
  }

  switchSprite(name) {
    if (this.image === this.animations[name].image) return;
    this.currentFrame = 0;
    this.image = this.animations[name].image;
    this.frameRate = this.animations[name].frameRate;
    this.frameBuffer = this.animations[name].frameBuffer;
    this.loop = this.animations[name].loop; // porta il loop una sola volta per la porta
    this.currentAnimation = this.animations[name];
  }

  updateHitbox() {
    this.hitbox = {
      position: {
        x: this.position.x + 58,
        y: this.position.y + 34,
      },
      width: 50,
      height: 53,
    };
  }

  //funzione per la collisione orrizzontale
  checkForHorizontalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      //se la collisione esiste
      if (
        this.hitbox.position.x <=
          collisionBlock.position.x + collisionBlock.width &&
        this.hitbox.position.x + this.hitbox.width >=
          collisionBlock.position.x &&
        this.hitbox.position.y + this.hitbox.height >=
          collisionBlock.position.y &&
        this.hitbox.position.y <=
          collisionBlock.position.y + collisionBlock.height
      ) {
        //collisione su X che va a sinistra
        if (this.velocity.x < -0) {
          const offset = this.hitbox.position.x - this.position.x;
          this.position.x =
            collisionBlock.position.x + collisionBlock.width - offset + 0.01;
          break;
        }
        if (this.velocity.x > 0) {
          const offset =
            this.hitbox.position.x - this.position.x + this.hitbox.width;
          this.position.x = collisionBlock.position.x - offset - 0.01;
          break;
        }
      }
    }
  }
  applyGravity() {
    this.velocity.y += this.gravity;
    this.position.y += this.velocity.y;
  }
  //funzione per la collisione verticale
  checkForVerticalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      //se la collisione esiste
      if (
        this.hitbox.position.x <=
          collisionBlock.position.x + collisionBlock.width &&
        this.hitbox.position.x + this.hitbox.width >=
          collisionBlock.position.x &&
        this.hitbox.position.y + this.hitbox.height >=
          collisionBlock.position.y &&
        this.hitbox.position.y <=
          collisionBlock.position.y + collisionBlock.height
      ) {
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          const offset = this.hitbox.position.y - this.position.y;
          this.position.y =
            collisionBlock.position.y + collisionBlock.height - offset + 0.01;
          break;
        }
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          const offset =
            this.hitbox.position.y - this.position.y + this.hitbox.height;
          this.position.y = collisionBlock.position.y - offset - 0.01;
          break;
        }
      }
    }
  }
}
