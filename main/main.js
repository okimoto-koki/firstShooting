var height = 320;
var width = 320;


enchant();

window.onload = function(){
	game = new Game(height , width);
	game.fps = 60;
	game.preload('chara0.png');
	game.preload('graphic.png');
	game.preload('avatarBg1.png');
	game.preload('bar.png')

	game.onload = function() {
		player = new Sprite(32, 32);
		player.image = game.assets["chara0.png"];
		player.frame = 34;
		player.x = 150;
		player.y = 280;
		enemies = new Array();
		game.score = 0;
		
//		// 地上のマップ（画像）を設定
//		var map = new Sprite(320, 320);
//		map.image = game.assets["avatarBg1.png"];
//		map.frame = 2;
//		map.y = -map.height + game.height;
//		game.rootScene.addChild(map);
		
		// ライフバー
        var lifeLabel = new LifeLabel(10, 30, 5);
        lifeLabel.life = 3;
        game.rootScene.addChild(lifeLabel);
		
		// 特殊バー
        var bar = new Bar(10, 45);
        bar.image = game.assets["bar.png"];
        bar.maxvalue = 150;
        bar.value = 0;
        
        game.rootScene.addChild(bar);


		game.rootScene.addChild(player);
		// game.rootScene.backgroundColor = 'black';

		//文字キーを使う場合はbindが必要(a-dまで)
		game.keybind(68, "a");  //d
		game.keybind(65, "b");  //a
		game.keybind(83, "c");  //s
		game.keybind(87, "d");  //w

		//敵クラス
		var Enemy =Class.create(Sprite, {
			initialize: function(x, y){
				Sprite.call(this, 32, 32);
				this.image = game.assets["chara0.png"];
				this.x = x;
				this.y = y;
				
				this.on("enterframe",function(){
					//敵の動き
					this.tl.moveBy(rand(50,-50),rand(50,0),rand(90,30));
					
					//敵弾
					if(this.age % 30 == 0){
						var enemyBullet = new EnemyBullet(this.x, this.y);	
					}
					
				});             
				//範囲外で消失
				if(this.x<0 || this.x>width || this.y<-50 || this.y>height){
					this.remove();
				};
				game.rootScene.addChild(this);                
			},            
			remove: function(){
				game.rootScene.removeChild(this);
				delete enemies[this.key];
			}
		});

		//弾クラス
		var Bullet = Class.create(Sprite,{
			initialize: function(x,y){
				Sprite.call(this, 16, 16);
				this.image = game.assets["graphic.png"];
				this.addEventListener('enterframe', function () {
					//範囲外で消失
					if(this.x<0 || this.x>width || this.y<-10 || this.y>height){
						this.remove();
					};
				});    
			game.rootScene.addChild(this);
			},
			remove: function(){
				game.rootScene.removeChild(this);
				delete this;
			}
		});
		
		//自機用弾
		var PlayerBullet = Class.create(Bullet,{
		   initialize: function(x,y){
				Bullet.call(this,16,16); 
				this.frame = 12;                
				//弾の動き
				this.moveTo(x+3, y+8); 
				this.tl.moveBy(0, -500, 60);
				this.addEventListener('enterframe', function () {
					//当たり判定
					for (var i in enemies) {
						//withinで当たり判定を調節
						if(enemies[i].within(this,10)) {
							this.remove();
							enemies[i].remove();
							game.score += 100;
							//敵を倒した時特殊バー回復
							if(game.input.b || bar.value > bar.maxvalue){}else{bar.value += 10;}
						}
					}
				});
			}
		});
		
		//敵用弾
		var EnemyBullet = Class.create(Bullet,{
			initialize: function(x,y){
				Bullet.call(this,16,16); 
				this.frame = 13;                
				//弾の動き
				this.moveTo(x+8, y+25); 
				this.tl.moveBy(0, 500, 180);
				this.on('enterframe', function(){
					if(player.within(this,5)) {
						this.remove();
						 lifeLabel.life -= 1;
					}	
				});
			}
		});

		game.rootScene.on('enterframe', function(){
			//shoot bullet
			if(game.input.a && game.frame % 6 ==0){
				var playerBullet1 = new PlayerBullet(player.x + 10, player.y)
				var playerBullet2 = new PlayerBullet(player.x, player.y)
			}
		
			//特殊キーでスロー効果 スロー中はゲージ消費　０で強制終了
			if(bar.value > 0 && game.input.b){
					game.fps = 15;
					bar.value -= 1;
			}else{
				game.fps = 60;
			}
			
			//敵の出現管理 
			if(game.frame % 30 == 0){
				var enemy = new Enemy(rand(310,0), -30);
				enemy.key = game.frame;
				enemies[game.frame] = enemy;
			}   
			
			//ゲームオーバー処理
			if(lifeLabel.life == 0){
                game.end(game.score, "SCORE: " + game.score)	
			}
			
			//スコア表示
			scoreLabel.score = game.score;
		});
		
		scoreLabel = new ScoreLabel(8, 8);
		game.rootScene.addChild(scoreLabel);

		
		player.on('enterframe', function(){
			//カーソルキー移動
			if(game.input.c){
				if (game.input.right) this.x += 0.8;
				if (game.input.left) this.x -= 0.8;
				if (game.input.down) this.y += 0.8;
				if (game.input.up) this.y -= 0.8;
			}else{
				if (game.input.right) this.x += 2;
				if (game.input.left) this.x -= 2;
				if (game.input.down) this.y += 2;
				if (game.input.up) this.y -= 2;
			}
				
			//アニメーション
			this.frame = this.age / 10  % 3 + 33;
			//当たり判定
			for (var i in enemies) {
				//withinで当たり判定を調節 敵に当たると−１機
				if(enemies[i].within(this,5)) {
					lifeLabel.life -= 1;
					enemies[i].remove();
				}
			}
		});
	}
	game.start();
};

function rand(max,min){
	return Math.floor(Math.random() * (max - min) + min);
} 