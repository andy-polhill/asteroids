var Explosion = (function() {

  function Explosion(game, opts) { //create

    Phaser.Sprite.call(this, game, opts.x, opts.y, opts.variant);

    var boom = this.animations.add('boom', [0,1,2,3,4,5,6,7,8], 20, false);
    boom.killOnComplete = true;
  };

  Explosion.prototype = Object.create(Phaser.Sprite.prototype);
  Explosion.prototype.constructor = Explosion;

  return Explosion;

})();

module.exports = Explosion;
