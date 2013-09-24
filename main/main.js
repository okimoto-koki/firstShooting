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
		player.x = 240;
		player.y = 150;


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

			this.frame = this.age / 10  % 3 + 33;

			//shoot bullet
			if(game.input.a && game.frame % 6 ==0){
				bullet = new Sprite(16,16);
				bullet.image = game.assets["graphic.png"];
				bullet.frame = 13;
				bullet.moveTo(this.x + 3, this.y + 8); 
          	 			bullet.tl.moveBy(0, -500, 60);
          	 			
				bullet.on('enterframe',function(){
					if(this.intersect(enemy)){
						game.rootScene.removeChild(enemy);
					}
				});
	
            				game.rootScene.addChild(bullet);

            				bullet2 = new Sprite(16,16);
				bullet2.image = game.assets["graphic.png"];
				bullet2.frame = 13;
				bullet2.moveTo(this.x + 14, this.y + 8); 
          	 			bullet2.tl.moveBy(0, -500, 60);
          	 			bullet2.on('enterframe',function(){
					if(this.intersect(enemy)){
						game.rootScene.removeChild(enemy);
					}
				});
            				game.rootScene.addChild(bullet2);
			}
		});
	
		

		var Enemy =Class.create(Sprite, {
			initialize: function(x, y){
				Sprite.call(this, 32, 32);
				this.image = game.assets["chara0.png"];
				// this.x = x;
				// this.y = y;
				// this.on("enterframe",function(){
				// 	this.x += 1;
				// });
				game.rootScene.addChild(this);
			}
		});

		var enemy = new Enemy(0,0);
	}
	game.start();
};

