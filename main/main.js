enchant();

window.onload = function(){
	game = new Game(320 , 320);
	game.fps = 30;
	game.preload('graphic.png');

	game.onload = function() {
		player = new Sprite(16, 16);
		player.image = game.assets["graphic.png"];
		player.x = 0;
		player.y = 0;

		game.rootScene.addChild(player);
	}

	game.start();
};