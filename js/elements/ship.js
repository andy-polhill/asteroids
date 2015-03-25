var ROTATION_SPEED = 180; // degrees/second
var ACCELERATION = 200; // pixels/second/second
var MAX_SPEED = 250; // pixels/second
var DRAG = 0; // pixels/second


var Ship = (function() {

  function ship(game) { //create

    this.game = game;

    // Add the ship to the stage
    this.sprite = this.game.add.sprite(0, 0, 'ship');
    this.sprite.angle = -90;
    this.sprite.anchor.setTo(0.5, 0.5);
    // Enable physics on the ship
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

    // Set maximum velocity
    this.sprite.body.maxVelocity.setTo(MAX_SPEED, MAX_SPEED); // x, y

    // Add drag to the ship that slows it down when it is not accelerating
    this.sprite.body.drag.setTo(DRAG, DRAG); // x, y

    this.sprite.body.bounce.setTo(0.25, 0.25);

    this.reset();
  }

  ship.prototype = {
    reset: function() {
      // Move the ship back to the top of the stage
      this.sprite.x = 32;
      this.sprite.y = 32;
      this.sprite.body.acceleration.setTo(0, 0);

      this.sprite.angle = 0;//this.game.rnd.integerInRange(-180, 180);
      this.sprite.body.velocity.setTo(0,0);//this.game.rnd.integerInRange(100, 200), 0);
    },

    update: function() {
      // Keep the ship on the screen
      if (this.sprite.x > this.game.width) this.sprite.x = 0;
      if (this.sprite.x < 0) this.sprite.x = this.game.width;

      if (this.sprite.y > this.game.height) this.sprite.y = 0;
      if (this.sprite.y < 0) this.sprite.y = this.game.height;

      if (InputUtils.leftInputIsActive(this.game)) {
          // If the LEFT key is down, rotate left
          this.sprite.body.angularVelocity = - ROTATION_SPEED;
      } else if (InputUtils.rightInputIsActive(this.game)) {
          // If the RIGHT key is down, rotate right
          this.sprite.body.angularVelocity = ROTATION_SPEED;
      } else {
          // Stop rotating
          this.sprite.body.angularVelocity = 0;
      }

      if (this.sprite.body.touching.down) { //FIXME: not working
        if (Math.abs(this.sprite.body.velocity.y) > 20 || Math.abs(this.sprite.body.velocity.x) > 30) {
          // The ship hit the ground too hard.
          // Blow it up and start the game over.
          this.kill();
        } else {
          // We've landed!
          // Stop rotating and moving and aim the ship up.
          this.sprite.body.angularVelocity = 0;
          this.sprite.body.velocity.setTo(0, 0);
          this.sprite.angle = -90;
        }
      }

      if (InputUtils.upInputIsActive(this.game)) {
        // If the UP key is down, thrust
        // Calculate acceleration vector based on this.angle and this.ACCELERATION
        this.sprite.body.acceleration.x = Math.cos(this.sprite.rotation) * ACCELERATION;
        this.sprite.body.acceleration.y = Math.sin(this.sprite.rotation) * ACCELERATION;
      } else {
        // Otherwise, stop thrusting
        this.sprite.body.acceleration.setTo(0, 0);
      }
    },

    kill: function() {
      this.sprite.kill();
      this.reset();
    },

    getSprite: function() {
      return this.sprite;
    }
  }

  return ship;

})();
