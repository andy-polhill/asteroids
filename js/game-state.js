
var GameState = (function(){
  var gameState = function(game) {
    this.game = game;
  };

  // Load images and sounds
  gameState.prototype = {
    preload : function() {
      this.game.load.image('ship', 'assets/ship.png', 32, 32);
      this.game.load.image('ground', 'assets/asteroid-2.png', 240, 150);
      this.game.load.image('asteroid', 'assets/asteroid-14.png', 110, 110);
      this.game.load.spritesheet('pad', 'assets/landing-zone.png', 100, 100);
      this.game.load.image('space', 'assets/background.jpg');
      this.game.load.spritesheet('explosion', 'assets/explosion.png', 32, 32);
    },

    // Setup the example
    create : function() {

      this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;//SHOW_ALL;
      this.game.scale.pageAlignHorizontally = true;
      this.game.scale.pageAlignVertically = true;
      this.game.scale.setMaximum();
      this.game.scale.setScreenSize(true);

      // Set stage background color
      //this.game.stage.backgroundColor = 0x333333;
      this.game.add.sprite(0, 0, 'space');
      this.level = new Level1(this.game);
      this.game.physics.arcade.gravity.y = this.level.getGravity();

      this.explosionGroup = new ExplosionGroup(this.game);
      this.ship = new Ship(this.game);

      //create an explosion on ship destruction
      this.ship.getSprite().events.onKilled.add(function(sprite) {
        this.explosionGroup.get(sprite.x, sprite.y);
      }, this);

      // Capture certain keys to prevent their default actions in the browser.
      // This is only necessary because this is an HTML5 game. Games on other
      // platforms may not need code like this.
      this.game.input.keyboard.addKeyCapture([
          Phaser.Keyboard.LEFT,
          Phaser.Keyboard.RIGHT,
          Phaser.Keyboard.UP,
          Phaser.Keyboard.DOWN
      ]);
    },

    // The update() method is called every frame
    update : function() {
      // Collide the ship with the ground
      this.game.physics.arcade.collide(this.ship.getSprite(), this.level.getGround());
      this.ship.update()

    }
  };

  return gameState;

})();
