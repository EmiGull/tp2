import Button from "../js/button.js";

var score;

// Clase Winner, donde se crean los botones, el logo y el fondo del menú derrota
export class Winner extends Phaser.Scene {
  constructor() {
    super("Winner");
  }

  init(data) {
    // recupera el valor SCORE enviado como dato al inicio de la escena
    score = data.score;
  }

  create() {

    this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      "winner"
    );
    // Texto que muestra el puntaje maximo alcanzado
    this.add
      .text(
        400,100,
        `Puntaje alcanzado: ${score}`
      )
      .setOrigin(0.5);

    // Boton para comenzar a jugar
    var jugar = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY + this.cameras.main.centerY/3, 'reset').setScale(1.1)
    jugar.setInteractive()
    jugar.on('pointerdown', () => this.scene.start('MainMenu'));
  }
}