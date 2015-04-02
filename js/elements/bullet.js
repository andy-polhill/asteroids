var Bullet = (function() {

  function Bullet(game, opts) { //create

    Phaser.Sprite.call(this, game, opts.x, opts.y, opts.variant);
    game.physics.enable(this, Phaser.Physics.P2JS);
    this.body.angle = opts.angle;

    //  Enable if for physics. This creates a default rectangular body.
  	game.physics.p2.enable(this);

    this.strength = Bullet.STRENGTH;
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.anchor.setTo(0.5, 0.5);
    this.body.mass = 6;
  }

  Bullet.prototype = Object.create(Phaser.Sprite.prototype);
  Bullet.prototype.constructor = Bullet;

  return Bullet;

})();

Bullet.THRUST = 800000;
Bullet.STRENGTH = 15;

module.exports = Bullet;
