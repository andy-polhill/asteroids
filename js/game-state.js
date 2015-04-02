var game = require('./game');
var explosions = require('./groups/explosion-group');
var asteroids = require('./groups/asteroid-group');
var bullets = require('./groups/bullet-group');
var ship = require('./elements/ship');
var collisionGroups = require('./groups/collision-groups');
var InputUtils = require('./utils/input-utils');


var gameState = {
  preload : function() {
    game.load.image('ship', 'assets/ship.png', 160, 160);
    game.load.image('bullet', 'assets/bullet_short_single.png', 6, 46);
    game.load.image('space', 'assets/background.png');

    game.load.spritesheet('asteroid-01', 'assets/asteroid-01.png', 600, 500);
    game.load.spritesheet('asteroid-09', 'assets/asteroid-09.png', 250, 230);
    game.load.spritesheet('asteroid-10', 'assets/asteroid-10.png', 260, 240);
    game.load.spritesheet('asteroid-11', 'assets/asteroid-11.png', 240, 150);
    game.load.spritesheet('asteroid-12', 'assets/asteroid-12.png', 170, 180);
    game.load.spritesheet('asteroid-13', 'assets/asteroid-13.png', 190, 160);
    game.load.spritesheet('asteroid-14', 'assets/asteroid-14.png', 110, 110);
    game.load.spritesheet('asteroid-15', 'assets/asteroid-15.png', 70, 100);

    game.load.spritesheet('explosion', 'assets/explosion.png', 140, 140);
    game.load.spritesheet('explosion-big', 'assets/explosion-big.png', 1210, 210);

    game.load.physics('physics', 'assets/physics/sprites.json');
  },

  // Setup the example

  create : function() {

    game.world.setBounds(0, 0, 2048, 1536);

    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setImpactEvents(true);
    game.physics.p2.restitution = 0.8;

    this.collisionGroups = collisionGroups.getInstance();

    //world bounds
    game.physics.p2.updateBoundsCollisionGroup();

    //screen orientation and scaling
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.setMaximum();
    game.scale.setScreenSize(true);

    game.add.sprite(0, 0, 'space');

    this.ship = ship.getInstance();
    this.asteroids = asteroids.getInstance();
    this.bullets = bullets.getInstance();


    game.add.existing(this.ship);
    game.add.existing(bullets.getInstance());
    game.add.existing(this.asteroids);
    game.add.existing(explosions.getInstance());

    this.asteroids.get({
      'variant': 'asteroid-01',
      'x': 800,
      'y': 400
    });

    this.ship.body.setCollisionGroup(this.collisionGroups.ship);
    this.ship.body.collides(this.collisionGroups.asteroid, function(ship, asteroid) {
      ship.explode();
    }, this);

    //Create an explosion when ship is destroyed
    this.ship.events.onKilled.add(function(sprite) {
      this.explosions.get({
        'x':sprite.x,
        'y':sprite.y,
        'variant': 'explosion'
      });
    }, this);

    // Prevent default cursor actions.
    game.input.keyboard.addKeyCapture([
        Phaser.Keyboard.LEFT,
        Phaser.Keyboard.RIGHT,
        Phaser.Keyboard.UP,
        Phaser.Keyboard.DOWN,
        Phaser.Keyboard.SPACEBAR
    ]);

    var fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    fireButton.onDown.add(this.shoot, this);

    game.physics.p2.setBoundsToWorld(true, true, true, true, false);
  },

  shoot : function(sprite) {
    var bullet = this.bullets.get({
      'x':this.ship.body.x,
      'y': this.ship.body.y,
      'angle': this.ship.body.angle
    });

    //bullet.body.onBeginContact.add(function(sprite) {
      //sprite.kill();
    //}, this);
  },

  // The update() method is called every frame
  update : function() {
    if (this.ship.x > game.width) this.ship.x = 0;
    if (this.ship.x < 0) this.ship.x = game.width;

    if (this.ship.y > game.height) this.ship.y = 0;
    if (this.ship.y < 0) this.ship.y = game.height;

    //Rotation
    if (InputUtils.leftInputIsActive(game)) {
      this.ship.body.rotateLeft(this.ship.ROTATION_SPEED);
    } else if (InputUtils.rightInputIsActive(game)) {
      this.ship.body.rotateRight(this.ship.ROTATION_SPEED);
    } else {
      this.ship.body.setZeroRotation();
    }

    //Thrust
    if (InputUtils.upInputIsActive(game)) {
      this.ship.body.thrust(this.ship.THRUST);
    } else if (InputUtils.downInputIsActive(game)) {
      this.ship.body.reverse(this.ship.REVERSE_THRUST);
    }

    this.wrap(this.ship, 0);

    this.asteroids.forEach(function(asteroid){
      this.wrap(asteroid, 0);
    }, this);
  },

  wrap : function (sprite, padding) {

    if (sprite.body.x + padding < game.world.bounds.x) {
      sprite.body.x = game.world.bounds.right + padding;
    }
    else if (sprite.body.x - padding > game.world.bounds.right) {
      sprite.body.x = game.world.bounds.left - padding;
    }
    if (sprite.body.y + padding < game.world.bounds.top) {
      sprite.body.y = game.world.bounds.bottom + padding;
    }
    else if (sprite.body.y - padding > game.world.bounds.bottom) {
      sprite.body.y = game.world.bounds.top - padding;
    }
  }
};

game.state.add('game', gameState, true);
