var Asteroid = (function() {

  function Asteroid(game, opts) { //create

    Phaser.Sprite.call(this, game, opts.x, opts.y, opts.variant);
    game.physics.enable(this, Phaser.Physics.P2JS);
    this.variant = opts.variant;
    this.body.clearShapes();
    this.body.loadPolygon('physics', opts.variant);
    this.body.mass = opts.mass;
    this.body.angle = opts.angle || 0;
    this.anchor.setTo(0.5, 0.5);
  }

  Asteroid.prototype = Object.create(Phaser.Sprite.prototype);
  Asteroid.prototype.constructor = Asteroid;

  Asteroid.prototype.damage = function() {
    Phaser.Sprite.prototype.damage.apply(this, arguments);
    this.frame = this.frameCount - Math.ceil((this.health / this.startHealth) * this.frameCount);
  }

  return Asteroid;

})();

Asteroid.MIN_START_THRUST = 400000;
Asteroid.MAX_START_THRUST = 800000;
Asteroid.MIN_START_ROTATE = 20;
Asteroid.MAX_START_ROTATE = 100;
