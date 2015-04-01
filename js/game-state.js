
var GameState = (function(){
  var gameState = function(game) {
    this.game = game;
    //this.level = new Level1(this.game);
  };

  // Load images and sounds
  gameState.prototype = {
    preload : function() {
      this.game.load.image('ship', 'assets/ship.png', 160, 160);
      this.game.load.image('bullet', 'assets/bullet_short_single.png', 6, 46);
      this.game.load.image('space', 'assets/background.png');

      this.game.load.spritesheet('asteroid-01', 'assets/asteroid-01.png', 600, 500);
      this.game.load.spritesheet('asteroid-09', 'assets/asteroid-09.png', 250, 230);
      this.game.load.spritesheet('asteroid-10', 'assets/asteroid-10.png', 260, 240);
      this.game.load.spritesheet('asteroid-11', 'assets/asteroid-11.png', 240, 150);
      this.game.load.spritesheet('asteroid-12', 'assets/asteroid-12.png', 170, 180);
      this.game.load.spritesheet('asteroid-13', 'assets/asteroid-13.png', 190, 160);
      this.game.load.spritesheet('asteroid-14', 'assets/asteroid-14.png', 110, 110);
      this.game.load.spritesheet('asteroid-15', 'assets/asteroid-15.png', 70, 100);
      this.game.load.spritesheet('explosion', 'assets/explosion.png', 140, 140);

      this.game.load.physics('physics', 'assets/physics/sprites.json');
    },

    // Setup the example
    create : function() {

      this.game.world.setBounds(0, 0, 2048, 1536);

      this.game.physics.startSystem(Phaser.Physics.P2JS);
      this.game.physics.p2.setImpactEvents(true);
      this.game.physics.p2.restitution = 0.8;

      this.collisionGroups = {
        'ship' : game.physics.p2.createCollisionGroup(),
        'bullet' : game.physics.p2.createCollisionGroup(),
        'asteroid' : game.physics.p2.createCollisionGroup()
      };

      //world bounds
      this.game.physics.p2.updateBoundsCollisionGroup();

      //screen orientation and scaling
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.game.scale.pageAlignHorizontally = true;
      this.game.scale.pageAlignVertically = true;
      this.game.scale.setMaximum();
      this.game.scale.setScreenSize(true);

      this.game.add.sprite(0, 0, 'space');

      this.ship = this.game.add.existing(new Ship(this.game));
      this.bullets = this.game.add.existing(new BulletGroup(this.game));
      this.asteroids = this.game.add.existing(new AsteroidGroup(this.game, this.collisionGroups));
      this.explosions = this.game.add.existing(new ExplosionGroup(this.game));

      this.ship.body.setCollisionGroup(this.collisionGroups.ship);
      this.ship.body.collides(this.collisionGroups.asteroid, function(ship, asteroid) {
        this.ship.explode();
      }, this);

      //Create an explosion when ship is destroyed
      this.ship.events.onKilled.add(function(sprite) {
        this.explosions.get(sprite.x, sprite.y);
      }, this);

      // Prevent default cursor actions.
      this.game.input.keyboard.addKeyCapture([
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
      }, this.collisionGroups, this.explosions);

      //bullet.body.onBeginContact.add(function(sprite) {
        //sprite.kill();
      //}, this);
    },

    // The update() method is called every frame
    update : function() {
      if (this.ship.x > this.game.width) this.ship.x = 0;
      if (this.ship.x < 0) this.ship.x = this.game.width;

      if (this.ship.y > this.game.height) this.ship.y = 0;
      if (this.ship.y < 0) this.ship.y = this.game.height;

      //Rotation
      if (InputUtils.leftInputIsActive(this.game)) {
        this.ship.body.rotateLeft(Ship.ROTATION_SPEED);
      } else if (InputUtils.rightInputIsActive(this.game)) {
        this.ship.body.rotateRight(Ship.ROTATION_SPEED);
      } else {
        this.ship.body.setZeroRotation();
      }

      //Thrust
      if (InputUtils.upInputIsActive(this.game)) {
        this.ship.body.thrust(Ship.THRUST);
      } else if (InputUtils.downInputIsActive(this.game)) {
        this.ship.body.reverse(Ship.REVERSE_THRUST);
      }

      this.wrap(this.ship, 0);

      this.asteroids.forEach(function(asteroid){
        this.wrap(asteroid, 0);
      }, this);

    },

    wrap : function (sprite, padding) {

      if (sprite.body.x + padding < this.game.world.bounds.x) {
        sprite.body.x = this.game.world.bounds.right + padding;
      }
      else if (sprite.body.x - padding > this.game.world.bounds.right) {
        sprite.body.x = this.game.world.bounds.left - padding;
      }
      if (sprite.body.y + padding < this.game.world.bounds.top) {
        sprite.body.y = this.game.world.bounds.bottom + padding;
      }
      else if (sprite.body.y - padding > this.game.world.bounds.bottom) {
        sprite.body.y = this.game.world.bounds.top - padding;
      }
    }

  };

  return gameState;

})();
