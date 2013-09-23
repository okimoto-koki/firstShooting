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
		game.rootScene.backgroundColor = 'black';

		//文字キーを使う場合はbindが必要(a-dまで)
		game.keybind(68, "a");	//d
		game.keybind(65, "b");	//a
		game.keybind(83, "c");	//s
		game.keybind(87, "d");	//w

		player.on('enterframe', function(){
			//カーソルキー
			if (game.input.right) this.x += 3;
			if (game.input.left) this.x -= 3;
			if (game.input.down) this.y += 3;
			if (game.input.up) this.y -= 3;
			
			//wasd
			if (game.input.a) this.x += 3;
			if (game.input.b) this.x -= 3;
			if (game.input.c) this.y += 3;
			if (game.input.d) this.y -= 3;
		});
	}

	game.start();
};