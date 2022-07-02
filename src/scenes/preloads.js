// Clase Preloads, para separar los preloads y tener mejor orden
export class Preloads extends Phaser.Scene {
  // Se extiende de Phaser.Scene porque es una escena
  constructor() {
    // Se asigna una key para despues poder llamar a la escena
    super("Preloads");
  }

  preload() {
    this.load.image ("menu", "public/assets/images/menu.jpg");
    this.load.image("bomb", "public/assets/images/bomb.png");
    this.load.image ("asteroide", "public/assets/images/asteroide.png");
    this.load.image("play", "public/assets/images/play.png");
    this.load.image("star", "public/assets/images/star.png");
    this.load.image("star2", "public/assets/images/star2.png");
    this.load.spritesheet("dude", "public/assets/images/dude.png", {frameWidth: 32, frameHeight: 48,});
    this.load.image("fondo1", "public/assets/images/fondo1.jpg");
    this.load.image("fondo2", "public/assets/images/fondo2.jpg");
    this.load.image("fondo3", "public/assets/images/fondo3.jpg");
    this.load.image("platform3", "public/assets/images/platform3.png");
    this.load.image("gameover", "public/assets/images/gameover.jpg");
    this.load.image("winner", "public/assets/images/winner.jpg");
    this.load.image("reset", "public/assets/images/reset.png");
    
    this.load.audio ("game", "public/assets/sounds/game.mp3", "public/assets/sounds/game.ogg", 
    "public/assets/sounds/game.m4a");
    this.load.audio ("stars", "public/assets/sounds/stars.mp3");
  }

  create() {
    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    // Pasa directamente a la escena del menú principal
    this.scene.start("MainMenu");
  }
}