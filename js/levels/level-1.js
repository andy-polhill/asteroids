var Level1 = (function() {

  function level(game) { //create

    this.game = game;
    // Create some ground for the ship to land on
    this.ground = this.game.add.group();

    var groundBlock = this.game.add.sprite(this.game.width / 2, this.game.height - 100, 'ground');
    this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
    groundBlock.body.immovable = true;
    groundBlock.body.allowGravity = false;
    this.ground.add(groundBlock);

    var asteroid = this.game.add.sprite(100, this.game.height - 100, 'asteroid');
    this.game.physics.enable(asteroid, Phaser.Physics.ARCADE);
    //groundBlock.body.immovable = true
    //asteroid.body.velocity.setTo(21, 5);
    asteroid.body.immovable = true;
    asteroid.body.allowGravity = false;
    this.ground.add(asteroid);

    // Create some ground for the ship to land on
    /*this.pad = this.game.add.group();

    var landingPad = this.game.add.sprite(this.game.width / 2 + 50, this.game.height - 120, 'pad');
    this.game.physics.enable(landingPad, Phaser.Physics.ARCADE);
    landingPad.body.immovable = true;
    landingPad.body.allowGravity = false;
    this.pad.add(landingPad);*/

  }

  level.prototype = {
    getGround : function() {
      return this.ground;
    },
    getGravity: function() {
      return 0;//30; // pixels/second/second
    }/*
    getPad : function() {
      return this.pad;
    }*/
  }

  return level;

})();
