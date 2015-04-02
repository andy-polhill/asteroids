var game = require('../game');

CollisionGroups = function () {
  return {
    'ship' : game.physics.p2.createCollisionGroup(),
    'bullet' : game.physics.p2.createCollisionGroup(),
    'asteroid' : game.physics.p2.createCollisionGroup()
  }
}

module.exports = (function(){
 var instance;

 function createInstance() {
   var object = new CollisionGroups();
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
