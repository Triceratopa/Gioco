const X_VELOCITY = 200;
const Y_VELOCITY = 200;

class Player {
  constructor({ x, y, size, velocity = { x: 0, y: 0 } }) {
    this.x = 495;
    this.y = 60;
    this.width = size;
    this.height = size;
    this.velocity = velocity;
    this.center = {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
    };
    this.loaded = false;
    this.image = new Image();
    this.image.onload = () => {
      this.loaded = true;
    };
    this.image.src = "./img/MainIdle.png";
    this.currentFrame = 0;
    this.elapsedTime = 0;
    this.sprites = {
      walkDown: {
        src: "./img/MainRun.png",
        x: 0,
        y: 0,
        width: 32,
        height: 32,
      },
      walkLeft: {
        src: "./img/MainRun.png",
        x: 0,
        y: 0,
        width: 32,
        height: 32,
      },
      walkRight: {
        src: "./img/MainRun.png",
        x: 0,
        y: 0,
        width: 32,
        height: 32,
      },
      walkUp: {
        src: "./img/MainRun.png",
        x: 0,
        y: 0,
        width: 32,
        height: 32,
      },
    };
    this.currentSprite = this.sprites.walkDown;
  }

  draw(c) {
    if (!this.loaded) return;

    c.save(); // Salva lo stato attuale del canvas

    if (this.currentSprite === this.sprites.walkLeft) {
      c.scale(-1, 1); // Specchia l'immagine orizzontalmente
      c.drawImage(
        this.image,
        this.currentSprite.width * this.currentFrame,
        this.currentSprite.y,
        this.currentSprite.width,
        this.currentSprite.height,
        -this.x - this.width, // Corregge la posizione
        this.y,
        this.width,
        this.height
      );
    } else {
      c.drawImage(
        this.image,
        this.currentSprite.width * this.currentFrame,
        this.currentSprite.y,
        this.currentSprite.width,
        this.currentSprite.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }

    c.restore(); // Ripristina lo stato originale
  }

  update(deltaTime, collisionBlocks) {
    if (!deltaTime) return;

    const intervalNextFrame = 0.05;
    this.elapsedTime += deltaTime;
    if (this.elapsedTime > intervalNextFrame) {
      this.currentFrame = (this.currentFrame + 1) % 11; // diviso i frame del png
      this.elapsedTime -= intervalNextFrame;
    }

    this.updateHorizontalPosition(deltaTime);
    this.checkForHorizontalCollisions(collisionBlocks);

    this.updateVerticalPosition(deltaTime);
    this.checkForVerticalCollisions(collisionBlocks);

    this.center = {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
    };
  }

  updateHorizontalPosition(deltaTime) {
    this.x += this.velocity.x * deltaTime;
  }

  updateVerticalPosition(deltaTime) {
    this.y += this.velocity.y * deltaTime;
  }
  setSprite(sprite) {
    if (this.currentSprite !== sprite) {
      this.currentSprite = sprite;
      this.image.src = sprite.src; // Cambia immagine
      this.currentFrame = 0; // Reset dell'animazione
    }
  }

  handleInput(keys) {
    this.velocity.x = 0;
    this.velocity.y = 0;

    if (keys.d.pressed) {
      this.velocity.x = X_VELOCITY;
      this.setSprite(this.sprites.walkRight);
    } else if (keys.a.pressed) {
      this.velocity.x = -X_VELOCITY;
      this.setSprite(this.sprites.walkLeft);
    } else if (keys.w.pressed) {
      this.velocity.y = -Y_VELOCITY;
      this.setSprite(this.sprites.walkUp);
    } else if (keys.s.pressed) {
      this.velocity.y = Y_VELOCITY;
      this.setSprite(this.sprites.walkDown);
    } else {
      this.image.src = "./img/MainIdle.png";
    }
  }

  checkForHorizontalCollisions(collisionBlocks) {
    const buffer = 0.0001;
    for (let i = 0; i < collisionBlocks.length; i++) {
      const collisionBlock = collisionBlocks[i];

      // Check if a collision exists on all axes
      if (
        this.x <= collisionBlock.x + collisionBlock.width &&
        this.x + this.width >= collisionBlock.x &&
        this.y + this.height >= collisionBlock.y &&
        this.y <= collisionBlock.y + collisionBlock.height
      ) {
        // Check collision while player is going left
        if (this.velocity.x < -0) {
          this.x = collisionBlock.x + collisionBlock.width + buffer;
          break;
        }

        // Check collision while player is going right
        if (this.velocity.x > 0) {
          this.x = collisionBlock.x - this.width - buffer;

          break;
        }
      }
    }
  }

  checkForVerticalCollisions(collisionBlocks) {
    const buffer = 0.0001;
    for (let i = 0; i < collisionBlocks.length; i++) {
      const collisionBlock = collisionBlocks[i];

      // If a collision exists
      if (
        this.x <= collisionBlock.x + collisionBlock.width &&
        this.x + this.width >= collisionBlock.x &&
        this.y + this.height >= collisionBlock.y &&
        this.y <= collisionBlock.y + collisionBlock.height
      ) {
        // Check collision while player is going up
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          this.y = collisionBlock.y + collisionBlock.height + buffer;
          break;
        }

        // Check collision while player is going down
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          this.y = collisionBlock.y - this.height - buffer;
          break;
        }
      }
    }
  }
}
