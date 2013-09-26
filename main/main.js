var height = 320;
var width = 320;


enchant();

window.onload = function(){
	game = new Game(height , width);
	game.fps = 60;
	game.preload('chara0.png');
	game.preload('graphic.png');

	game.onload = function() {
		player = new Sprite(32, 32);
		player.image = game.assets["chara0.png"];
		player.frame = 34;
		player.x = 240;
		player.y = 150;
        enemies = new Array();
        game.score = 0;


		game.rootScene.addChild(player);
		// game.rootScene.backgroundColor = 'black';

		//文字キーを使う場合はbindが必要(a-dまで)
		game.keybind(68, "a");	//d
		game.keybind(65, "b");	//a
		game.keybind(83, "c");	//s
		game.keybind(87, "d");	//w

        //敵クラス
		var Enemy =Class.create(Sprite, {
			initialize: function(x, y){
				Sprite.call(this, 32, 32);
				this.image = game.assets["chara0.png"];
				this.x = x;
				this.y = y;
                
                //敵の動き
				this.on("enterframe",function(){
                    this.tl.moveBy(rand(50),rand(50),rand(90));
				});				
                game.rootScene.addChild(this);                
                //範囲外で消失
                if(this.x<0 || this.x>width || this.y<0 || this.y>height){
                    this.remove();
                };
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
				this.frame = 13;                
                //弾の動き
				this.moveTo(x + 3, y + 8); 
                this.tl.moveBy(0, -500, 60);

                this.addEventListener('enterframe', function () {
                    //当たり判定
                    for (var i in enemies) {
                        //withinで当たり判定を調節
                        if(enemies[i].within(this,10)) {
                            this.remove();
                            enemies[i].remove();
                            game.score += 100;
                        }
                    }  
                    //範囲外で消失
                    if(this.x<0 || this.x>width || this.y<0 || this.y>height){
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
        
        var PlayerBullet = Class.create(Bullet,{
           initialize: function(x,y){
                Bullet.call(this,16,16); 
                this.image = game.assets["graphic.png"];
                this.frame = 13;                
                //弾の動き
                this.moveTo(x + 3, y + 8); 
                this.tl.moveBy(0, -500, 60);
           }
        });

		game.rootScene.on('enterframe', function(){
			//shoot bullet
			if(game.input.a && game.frame % 6 ==0){
				var playerBullet = new PlayerBullet(player.x, player.y)
			}
			//敵の出現管理 
			if(game.frame % 60 == 0){
                var enemy = new Enemy(rand(320), rand(150));
                enemy.key = game.frame;
                enemies[game.frame] = enemy;
            }	
            //スコア表示
            scoreLabel.score = game.score;
		});
        
        scoreLabel = new ScoreLabel(8, 8);
        game.rootScene.addChild(scoreLabel);

        
		player.on('enterframe', function(){
			//カーソルキー移動
			if (game.input.right) this.x += 3;
			if (game.input.left) this.x -= 3;
			if (game.input.down) this.y += 3;
			if (game.input.up) this.y -= 3;
			//アニメーション
			this.frame = this.age / 10  % 3 + 33;
            //当たり判定
            for (var i in enemies) {
                //withinで当たり判定を調節 敵に当たると−１００点
                if(enemies[i].within(this,10)) {
                    game.score -= 100;
                }
            }
		});
	}
	game.start();
};

function rand(n){
	return Math.floor(Math.random() * (n+1));
} 