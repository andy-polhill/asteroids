BulletGroup = function (game) {
  Phaser.Group.call(this, game);
  this.enableBody = true;
  this.game = game;
  this.physicsBodyType = Phaser.Physics.P2JS;
};

BulletGroup.prototype = Object.create(Phaser.Group.prototype);
BulletGroup.prototype.constructor = BulletGroup;

//FIXME; Dependency mess
BulletGroup.prototype.get = function(opts, collisionGroups, explosions) {

  console.log('bullet get');
  // Get the first dead bullet from the bulletGroup
  var bullet = this.getFirstDead();

  // If there aren't any available, create a new one
  if (bullet === null) {
    opts.variant = 'bullet';
    bullet = this.add(new Bullet(game, opts));

    bullet.body.setCollisionGroup(collisionGroups.bullet);

    //FIXME CALLED TWICE PER BULLET
    bullet.body.collides(collisionGroups.asteroid, function(bulletBody, asteroidBody) {
      if(!bulletBody.hasCollided) {
        bulletBody.sprite.kill();
        asteroidBody.sprite.damage(bulletBody.sprite.strength);
        explosions.get({
          'x':bulletBody.x,
          'y':bulletBody.y,
          'variant': 'explosion'
        });
        bulletBody.hasCollided = true;
      }
    }, this);

  }

  // Revive the bullet (set it's alive property to true)
  // You can also define a onRevived event handler in your bullet objects
  // to do stuff when they are revived.
  bullet.revive();
  bullet.body.hasCollided = false;

  // Move the bullet to the given coordinates
  bullet.body.x = opts.x;
  bullet.body.y = opts.y;

  // Set rotation of the explosion at random for a little variety
  bullet.body.setZeroVelocity();
  bullet.body.setZeroRotation();
  bullet.body.angle = opts.angle;
  bullet.body.thrust(Bullet.THRUST);

  // Return the explosion itself in case we want to do anything else with it
  return bullet;
}
