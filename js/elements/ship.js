var game = require('../game');

var Ship = (function() {

  function Ship() { //create

    Phaser.Sprite.call(this, game, 100, 100, 'ship');
    this.anchor.setTo(0.5, 0.5);

    game.physics.enable(this, Phaser.Physics.P2JS);
    this.reset();
    this.body.clearShapes();
    this.body.loadPolygon('physics', 'ship');

  }

  Ship.prototype = Object.create(Phaser.Sprite.prototype);
  Ship.prototype.constructor = Ship;

  Ship.prototype.reset = function() {
    this.x = 10;
    this.y = 10;
    this.body.angle = 180;
  };

  Ship.prototype.explode = function() {
    this.kill();
  };

  return Ship;

})();


module.exports = (function(){
 var instance;

 function createInstance() {
   var object = new Ship();
   object.THRUST = 500;
   object.REVERSE_THRUST = 200;
   object.ROTATION_SPEED = 50;

   return object;
 }
 return {
   getInstance: function() {
     if(!instance){
       instance = createInstance();
     }
     return instance;
   }
 }
})();
