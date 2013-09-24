enchant();

window.onload = function(){
	game = new Game(320 , 320);
	game.fps = 60;
	game.preload('chara0.png');
	game.preload('graphic.png');

	game.onload = function() {
		player = new Sprite(32, 32);

		player.image = game.assets["chara0.png"];
		player.frame = 34;
		player.x = 0;
		player.y = 0;


		game.rootScene.addChild(player);
		// game.rootScene.backgroundColor = 'black';

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

			this.frame = this.age / 10  % 3 + 33;
		});


	}

	game.start();
};

var shoot function(){
	shoot = new Sprite(16,16);
	shoot.image = game.assets["graphic.png"];
	shoot.frame = 1;
}