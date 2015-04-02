// This function should return true when the player activates the "go left" control
// In this case, either holding the right arrow or tapping or clicking on the left
// side of the screen.

var tiltLeft = false;
var tiltRight = false;
var threshold = 10;
var latch = false;

if (window.DeviceOrientationEvent) {
  // Listen for the event and handle DeviceOrientationEvent object
  window.addEventListener('deviceorientation', function(eventData) {
    tiltRight = (eventData.beta > threshold) ? true : false;
    tiltLeft = (eventData.beta < -threshold) ? true : false;
  }, false);
}


module.exports = {
  // This function should return true when the player activates the "go right" control
  // In this case, either holding the right arrow or tilting left
  leftInputIsActive : function(game) {
    return game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || tiltLeft;
  },

  // This function should return true when the player activates the "go right" control
  // In this case, either holding the right arrow or tilting right
  rightInputIsActive : function(game) {
    return game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || tiltRight;
  },

  // This function should return true when the player activates the "jump" control
  // In this case, either holding the up arrow or touching the screen
  upInputIsActive : function(game) {
    return game.input.keyboard.isDown(Phaser.Keyboard.UP) || game.input.activePointer.isDown;
  },

  // This function should return true when the player activates the "jump" control
  // In this case, either holding the up arrow or touching the screen
  downInputIsActive : function(game) {
    return game.input.keyboard.isDown(Phaser.Keyboard.DOWN);
  }

}
