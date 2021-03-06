import Button from "../js/button.js";

var score;

// Clase GameOver, donde se crean los botones, el logo y el fondo del menú derrota
export class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  init(data) {
    // recupera el valor SCORE enviado como dato al inicio de la escena
    score = data.score;
  }

  create() {
    // Fondo del menú derrota
    this.add
      .image(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        "gameover"
      )
      .setScale(1.1);
 
    
    // Texto que muestra el puntaje maximo alcanzado
    this.add
      .text(
        500,100,
        `Puntaje alcanzado: ${score}`
      )
      .setOrigin(1.1);

    // Boton para comenzar a jugar
    var jugar = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY + this.cameras.main.centerY/3, 'reset').setScale(1.1)
    jugar.setInteractive()
    jugar.on('pointerdown', () => this.scene.start('Nivel1'));
  }
}