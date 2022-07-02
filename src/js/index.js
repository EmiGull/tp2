import { Preloads } from "../scenes/preloads.js";
import { MainMenu } from "../scenes/mainmenu.js";
import { Nivel1 } from "../scenes/nivel1.js";
import { Nivel2 } from "../scenes/nivel2.js";
import { Nivel3 } from "../scenes/nivel3.js";
import { GameOver } from "../scenes/gameover.js";
import { Winner } from "../scenes/winner.js";

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 400,
      height: 300,
    },
    max: {
      width: 1600,
      height: 1200,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  // Listado de todas las escenas del juego, en orden
  // La primera escena es con la cual empieza el juego
  scene: [Preloads, MainMenu, Nivel1, Nivel2, Nivel3, GameOver, Winner],
};

var game = new Phaser.Game(config);
