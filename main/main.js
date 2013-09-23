enchant();

window.onload = function(){
	game = new Game(320 , 320);
	game.fps = 60;
	game.preload('graphic.png');

	game.onload = function() {
		player = new Sprite(16, 16);
		player.image = game.assets["graphic.png"];
		player.x = 0;
		player.y = 0;

		game.rootScene.addChild(player);

		player.on('enterframe', function(){
			if (game.input.right) this.x += 3;
			if (game.input.left) this.x -= 3;
			if (game.input.down) this.y += 3;
			if (game.input.up) this.y -= 3;
		});
	}

	game.start();
};