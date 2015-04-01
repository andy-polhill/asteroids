var Level1 = (function() {

  function level(game) { //create

    this.GRAVITY = 0;
    this.game = game;
    // Create some ground for the ship to land on
    // this.ground = this.game.add.group();

  }

  level.prototype = {
    create: function() {
      this.asteroid = this.game.add.sprite(300, this.game.height - 100, 'asteroid');
      this.game.physics.enable(this.asteroid, Phaser.Physics.P2JS);
      this.asteroid.body.clearShapes();
      this.asteroid.body.loadPolygon('physics', 'asteroid');
      this.asteroid.body.static = true;

    },
    getGround : function() {
      return this.asteroid;
    }
  }

  return level;

})();
