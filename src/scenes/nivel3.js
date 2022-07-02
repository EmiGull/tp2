// Declaracion de variables para esta escena
var player;
var asteroides;
var bombs;
var cursors;
var score;
var gameOver;
var scoreText;
var scoreTime;
var scoreTimeText;
var timedEvent;


// Clase Play, donde se crean todos los sprites, el escenario del juego y se inicializa y actualiza toda la logica del juego.
export class Nivel3 extends Phaser.Scene {
  
  constructor() {
    super("Nivel3");
  }

  preload() {
    this.load.tilemapTiledJSON("level3", "public/assets/tilemaps/nivel3.json");
    this.load.image("tilesBelow", "public/assets/images/fondonivel3.png");
    this.load.image("tilesPlatform", "public/assets/images/plataforma.png");
  }

  onSecond() {
    if (! gameOver)
    {       
        scoreTime = scoreTime - 1; // One second
        scoreTimeText.setText('Tiempo: ' + scoreTime);
        if (scoreTime == 0) {
            timedEvent.paused = true;
            this.scene.start(
              "GameOver",
              { score: score } // se pasa el puntaje como dato a la escena RETRY
            );
     }            
    }
  }

  create() {

    timedEvent = this.time.addEvent({ 
      delay: 1000, 
      callback: this.onSecond, 
      callbackScope: this, 
      loop: true 
    });

    const map = this.make.tilemap({ key: "level3" });

    const tilesetBelow = map.addTilesetImage("fondonivel3", "tilesBelow");
    const tilesetPlatform = map.addTilesetImage("plataforma","tilesPlatform");

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const belowLayer = map.createLayer("fondo", tilesetBelow, 0, 0);
    const worldLayer = map.createLayer("plataformas", tilesetPlatform, 0, 0);
    const objectsLayer = map.getObjectLayer("objetos");

    worldLayer.setCollisionByProperty({ collider: true });

    // Find in the Object Layer, the name "dude" and get position
    const spawnPoint = map.findObject("objetos", (obj) => obj.name === "player");

    player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "dude");
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    //  Input Events
    if ((cursors = !undefined)) {
      cursors = this.input.keyboard.createCursorKeys();
    }

    // grupos
    asteroides = this.physics.add.group();
    bombs = this.physics.add.group();


    objectsLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name, type } = objData;
      switch (name) {
        case "asteroide": {
          var asteroide = asteroide.create(x, y, "asteroide");
          asteroide.setCollideWorldBounds(true);
          asteroide.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
          break;
        }
        
        case "bomb": {
          var bomb = bombs.create(x, y, "bomb");
          bomb.setBounce(1);
          bomb.setCollideWorldBounds(true);
          bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
          bomb.allowGravity = false;
          break;
        }
      }
    })

    scoreTime = 40;
    scoreTimeText = this.add.text(500, 6, "Tiempo:" +scoreTime, { 
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
      
    });

    scoreText = this.add.text(30, 6, "Puntos: 0", {
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
    });

    this.physics.add.collider(player, worldLayer);
    this.physics.add.collider(asteroides, worldLayer);
    this.physics.add.collider(bombs, worldLayer);
   

    this.physics.add.overlap(player, asteroides, this.collectStar, null, this);
    this.physics.add.collider(player, bombs, this.hitBomb, null, this);

    gameOver = false;
    score = 0;
  }

  update() {
    if (gameOver) {
      return;
    }

    if (stars.countActive(true) === 0) { 
      this.scene.start("Winner", { score: score }); 
    }

    if (cursors.left.isDown) {
      player.setVelocityX(-160);

      player.anims.play("left", true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);

      player.anims.play("right", true);
    } else {
      player.setVelocityX(0);

      player.anims.play("turn");
    }

    if (cursors.up.isDown && player.body.blocked.down) {
      player.setVelocityY(-330);
    }
  }

  collectStar(_player, asteroide) {
    asteroide.disableBody(true, true);
    score += 10;
    scoreText.setText("Puntos: " + score);
  }


  hitBomb (player, bombs) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play("turn");
    gameOver = true;

    setTimeout(() => {
      this.scene.start(
        "GameOver",{ score: score });
    }, 1000);
  }
}