var ExplosionGroup = (function() {

  function explosions(game) { //create

    this.game = game;

    // Create a group for explosions
    this.group = this.game.add.group();
  }

  explosions.prototype = {
    // Try to get a used explosion from the explosionGroup.
    // If an explosion isn't available, create a new one and add it to the group.
    // Setup new explosions so that they animate and kill themselves when the
    // animation is complete.
    get : function(x, y) {
      // Get the first dead explosion from the explosionGroup
      var explosion = this.group.getFirstDead();

      // If there aren't any available, create a new one
      if (explosion === null) {
          explosion = this.game.add.sprite(0, 0, 'explosion');
          explosion.anchor.setTo(0.5, 0.5);

          // Add an animation for the explosion that kills the sprite when the
          // animation is complete
          var animation = explosion.animations.add('boom', [0,1,2,3,4,5,6,7,8], 20, false);
          animation.killOnComplete = true;

          // Add the explosion sprite to the group
          this.group.add(explosion);
      }

      // Revive the explosion (set it's alive property to true)
      // You can also define a onRevived event handler in your explosion objects
      // to do stuff when they are revived.
      explosion.revive();

      // Move the explosion to the given coordinates
      explosion.x = x;
      explosion.y = y;

      // Set rotation of the explosion at random for a little variety
      explosion.angle = this.game.rnd.integerInRange(0, 360);

      // Play the animation
      explosion.animations.play('boom');

      // Return the explosion itself in case we want to do anything else with it
      return explosion;
    }
  }

  return explosions;

})();
