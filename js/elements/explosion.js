var Explosion = (function() {

  function Explosion(game, x, y) { //create

    Phaser.Sprite.call(this, game, x, y, 'explosion');

    var boom = this.animations.add('boom', [0,1,2,3,4,5,6,7,8], 20, false);
    boom.killOnComplete = true;
  };

  Explosion.prototype = Object.create(Phaser.Sprite.prototype);
  Explosion.prototype.constructor = Explosion;

  return Explosion;

})();
