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

		var Enemy =Class.create(Sprite, {
			initialize: function(x, y){
				Sprite.call(this, 32, 32);
				this.image = game.assets["chara0.png"];
				this.x = x;
				this.y = y;
				this.on("enterframe",function(){
					this.x += 1;
				});
				game.rootScene.addChild(this);
			}
		});

		var Bullet = Class.create(Sprite,{
			initialize: function(x,y){
				Sprite.call(this, 16, 16);
				this.image = game.assets["graphic.png"];
				this.frame = 13;
				this.moveTo(x + 3, y + 8); 
          	 			this.tl.moveBy(0, -500, 60);

        				this.on('enterframe',function(){
					if(this.within(enemy,10)){
						game.rootScene.removeChild(enemy);
						game.rootScene.removeChild(this);
					}
				});
            			game.rootScene.addChild(this);
			}
		});

		var enemy = new Enemy(0,0);


		player.on('enterframe', function(){
			//カーソルキー
			if (game.input.right) this.x += 3;
			if (game.input.left) this.x -= 3;
			if (game.input.down) this.y += 3;
			if (game.input.up) this.y -= 3;

			this.frame = this.age / 10  % 3 + 33;


			//shoot bullet
			if(game.input.a && game.frame % 6 ==0){
				var bullet = new Bullet(this.x, this.y)
			}
		});
	
		


	}
	game.start();
};

