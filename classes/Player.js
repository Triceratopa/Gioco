//creare una classe per i personaggi è molto utile permette
// riutilizzabilità
//organizzazione
//scalabilità
class Player {
  //specifiche di base che avrà il personaggio principale
  constructor({
    //aggiungiamo l'effetto di collisione del personaggio con gli ostacoli
    collisionBlocks = [],
  }) {
    this.position = {
      x: 200,
      y: 200,
    };

    this.velocity = {
      x: 0,
      y: 0,
    };

    this.width = 25;
    this.height = 25;
    this.sides = {
      bottom: this.position.y + this.height,
    };
    this.gravity = 1;

    this.collisionBlocks = collisionBlocks;
  }
  draw() {
    //creo il personaggiod
    c.fillStyle = "purple";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    //definiamo la velocità iniziale dell'oggetto
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    //collisione orizzontale
    this.checkForHorizontalCollisions();

    //applico gravity
    this.applyGravity();

    //collisione verticale
    this.checkForVerticalCollisions();
  }

  //funzione per la collisione orrizzontale
  checkForHorizontalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      //se la collisione esiste
      if (
        this.position.x <= collisionBlock.position.x + collisionBlock.width &&
        this.position.x + this.width >= collisionBlock.position.x &&
        this.position.y + this.height >= collisionBlock.position.y &&
        this.position.y <= collisionBlock.position.y + collisionBlock.height
      ) {
        if (this.velocity.x < 0) {
          this.position.x =
            collisionBlock.position.x + collisionBlock.width + 0.01;
          break;
        }
        if (this.velocity.x > 0) {
          this.position.x = collisionBlock.position.x - this.width - 0.01;
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
        this.position.x <= collisionBlock.position.x + collisionBlock.width &&
        this.position.x + this.width >= collisionBlock.position.x &&
        this.position.y + this.height >= collisionBlock.position.y &&
        this.position.y <= collisionBlock.position.y + collisionBlock.height
      ) {
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          this.position.y =
            collisionBlock.position.y + collisionBlock.height + 0.01;
          break;
        }
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          this.position.y = collisionBlock.position.y - this.height - 0.01;
          break;
        }
      }
    }
  }
}
