//gestione Sprite per dare background
class Sprite {
  constructor({ position, imageSrc }) {
    this.position = position;
    this.image = new Image(); // creazione oggetto immagina
    this.image.onload = () => {
      this.loaded = true;
    };
    this.image.src = imageSrc;
    this.loaded = false;
  }
  draw() {
    if (!this.loaded) return;
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}
