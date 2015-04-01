ExplosionGroup = function (game) {
  Phaser.Group.call(this, game);
  var collisionGroup = game.physics.p2.createCollisionGroup();

};

ExplosionGroup.prototype = Object.create(Phaser.Group.prototype);
ExplosionGroup.prototype.constructor = ExplosionGroup;

ExplosionGroup.prototype.get = function(opts) {
  // Get the first dead explosion from the explosionGroup
  var explosion = this.getFirstDead();

  // If there aren't any available, create a new one
  if (explosion === null) {
    explosion = this.add(new Explosion(game, opts));
  }

  // Revive the explosion (set it's alive property to true)
  // You can also define a onRevived event handler in your explosion objects
  // to do stuff when they are revived.
  explosion.revive();

  // Move the explosion to the given coordinates
  explosion.x = opts.x;
  explosion.y = opts.y;

  // Set rotation of the explosion at random for a little variety
  explosion.angle = this.game.rnd.integerInRange(0, 360);

  // Play the animation
  explosion.animations.play('boom');

  // Return the explosion itself in case we want to do anything else with it
  return explosion;
}
