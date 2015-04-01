AsteroidGroup = function (game, collisionGroups) {
  this.game = game;
  this.collisionGroups = collisionGroups;
  Phaser.Group.call(this, this.game);

  this.add(this.create({
    'variant': 'asteroid-01',
    'x': 800,
    'y': 400
  }));
};

AsteroidGroup.prototype = Object.create(Phaser.Group.prototype);
AsteroidGroup.prototype.constructor = AsteroidGroup;

AsteroidGroup.prototype.onKilled = function(sprite) {

  var children = Asteroid.DATA[sprite.variant].children;
  if(children) {
    var length = children.length;

    for(var i = 0; i < length; i++) {
      var opts = children[i];
      var asteroid = this.create({
        'variant': opts.variant,
        'x': sprite.body.x + opts.offset.x,
        'y': sprite.body.y + opts.offset.y,
        'angle': opts.angle
      })
      this.add(asteroid);
      asteroid.body.thrust(this.game.rnd.integerInRange(Asteroid.MIN_START_THRUST,
          Asteroid.MAX_START_THRUST));
      asteroid.body.rotateLeft(this.game.rnd.integerInRange(Asteroid.MIN_START_ROTATE,
          Asteroid.MAX_START_ROTATE));
    }
  }
};

AsteroidGroup.prototype.create = function(opts) {
  var asteroid = new Asteroid(this.game, opts);
  asteroid.events.onKilled.add(this.onKilled, this);

  var size = asteroid.width * asteroid.height;
  asteroid.health = size / Asteroid.HEALTH_AREA_RATIO;
  asteroid.startHealth = asteroid.health;
  asteroid.body.mass = size / Asteroid.MASS_AREA_RATIO;
  asteroid.frameCount = Asteroid.DATA[opts.variant].frameCount;

  asteroid.body.setCollisionGroup(this.collisionGroups.asteroid);
  asteroid.body.collides([
    this.collisionGroups.bullet,
    this.collisionGroups.ship,
    this.collisionGroups.asteroid]);

  return asteroid;
}

Asteroid.HEALTH_AREA_RATIO=1500;
Asteroid.MASS_AREA_RATIO=500
Asteroid.DATA = {
  'asteroid-01': {
    'frameCount': 6,
    'children': [{
      'variant': 'asteroid-09',
      'angle': 30,
      'offset':{'x':100, 'y':55}
    }, {
      'variant': 'asteroid-11',
      'angle': 45,
      'offset':{'x':-90, 'y':55}
    }, {
      'variant': 'asteroid-10',
      'angle': 45,
      'offset':{'x':0, 'y':-100}
    }]
  },
  'asteroid-09': {
    'frameCount': 3,
    'children': [{
      'variant': 'asteroid-15',
      'angle': 0,
      'offset':{'x':-25, 'y':0}
    }, {
      'variant': 'asteroid-14',
      'angle': 0,
      'offset':{'x':25, 'y':0}
    }]
  },
  'asteroid-10': {
    'frameCount': 3,
    'children': [{
      'variant': 'asteroid-15',
      'angle': 0,
      'offset':{'x':50, 'y':0}
    }, {
      'variant': 'asteroid-14',
      'angle': 0,
      'offset':{'x':0, 'y':-50}
    }]
  },
  'asteroid-11': {
    'frameCount': 3,
    'frameCount': 3,
    'children': [{
      'variant': 'asteroid-15',
      'angle': 0,
      'offset':{'x':50, 'y':0}
    },{
      'variant': 'asteroid-14',
      'angle': 0,
      'offset':{'x':-50, 'y':0}
    }]
  },
  'asteroid-12': {
    'frameCount': 3,
    'children': [{
      'variant': 'asteroid-15',
      'angle': 0,
      'offset':{'x':50, 'y':50}
    },{
      'variant': 'asteroid-14',
      'angle': 0,
      'offset':{'x':-50, 'y':-50}
    }]
  },
  'asteroid-13': {
    'frameCount': 3
  },
  'asteroid-14': {
    'frameCount': 2
  },
  'asteroid-15': {
    'frameCount': 2
  },
}
