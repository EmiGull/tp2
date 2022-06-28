//import Button from "../js/button.js";
let musica = false;

// Clase MainMenu, donde se crean los botones, el logo y el fondo del menú principal
export class MainMenu extends Phaser.Scene {
    constructor() {
        // Se asigna una key para despues poder llamar a la escena
        super("MainMenu")
    }

    create() {
      // Fondo del menú principal
      this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'fondomenu').setScale(1.1);
       
      //agregar música
      if (!musica) {
      musica = this.sound.add('gamesound', { loop: true });
      musica.play();
      }


      // Boton para comenzar a jugar
      var jugar = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY + this.cameras.main.centerY/3, 'play').setScale(1.1)
      jugar.setInteractive()
      jugar.on('pointerdown', () => this.scene.start('Play'));
    };
}
