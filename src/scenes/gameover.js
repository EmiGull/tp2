import Button from "../js/button.js";

var score;

// Clase Retry, donde se crean los botones, el logo y el fondo del menú derrota
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
    this.add.image(this.cameras.main.centerX,this.cameras.main.centerY,"mainmenu_bg").setScale(1.1);
    
    // Game Over
    this.add.image(400,200, "gameover").setScale (0.26);
    
    // Texto que muestra el puntaje maximo alcanzado
    this.add.text(
        400,300,
        `Puntaje total: ${score}`,{
        fontSize: '30px', 
        fill: '#fff', 
        backgroundColor: '#ff74',
        fontStyle: 'bold italic', 
        padding: {
            top: 10,
            bottom: 10,
            left: 10,
            right: 10,
        }
        }
        ).setOrigin(0.5);


    // Boton para comenzar a jugar
    var jugar = this.add.image(400,500, 'reset').setScale(1.1)
    jugar.setInteractive()
    jugar.on('pointerdown', () => this.scene.start('Play'));
    
    };
}