// This function should return true when the player activates the "go left" control
// In this case, either holding the right arrow or tapping or clicking on the left
// side of the screen.

var tiltLeft = false;
var tiltRight = false;
var threshold = 10;

if (window.DeviceOrientationEvent) {
  // Listen for the event and handle DeviceOrientationEvent object
  window.addEventListener('deviceorientation', function(eventData) {

    tiltRight = (eventData.gamma > threshold) ? true : false;
    tiltLeft = (eventData.gamma < -threshold) ? true : false;
  }, false);
}


InputUtils = {
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
      return game.input.keyboard.isDown(Phaser.Keyboard.UP) || game.input.activePointer.isDown
  }
}



KayboardUtils = {
  leftInputIsActive : function(game) {

    return (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) ||
        (game.input.activePointer.isDown &&
        game.input.activePointer.x < game.width/4));
  },

  // This function should return true when the player activates the "go right" control
  // In this case, either holding the right arrow or tapping or clicking on the right
  // side of the screen.
  rightInputIsActive : function(game) {

      return (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)||
          (game.input.activePointer.isDown &&
          game.input.activePointer.x > game.width/2 + game.width/4));
  },

  // This function should return true when the player activates the "jump" control
  // In this case, either holding the up arrow or tapping or clicking on the center
  // part of the screen.
  upInputIsActive : function(game) {
      return (game.input.keyboard.isDown(Phaser.Keyboard.UP) || (game.input.activePointer.isDown &&
          game.input.activePointer.x > game.width/4 &&
          game.input.activePointer.x < game.width/2 + game.width/4));
  }
}
