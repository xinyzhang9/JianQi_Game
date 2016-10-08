// 程序入口
var Game = (function () {
    function Game() {
        //enemy hp table
        this.hps = [1, 2, 10];
        //enemy speed table
        this.speeds = [3, 2, 1];
        //enemy been hit radius
        this.radius = [15, 15, 15];
        Laya.init(1000, 600);
        var bg = new BackGround();
        Laya.stage.addChild(bg);
        Laya.loader.load('res/atlas/war.json', Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.ATLAS);
    }
    Game.prototype.onLoaded = function () {
        this.hero = new Role();
        //initialize hero
        this.hero.init('hero', 0, 1, 0, 30);
        //hero pos
        this.hero.pos(50, 300);
        Laya.stage.addChild(this.hero);
        //mouse listener
        Laya.stage.on('mousemove', this, this.onMouseMove);
        //main loop
        Laya.timer.frameLoop(1, this, this.onLoop);
    };
    Game.prototype.onLoop = function () {
        for (var i = Laya.stage.numChildren - 1; i > -1; i--) {
            var role = Laya.stage.getChildAt(i);
            if (role && role.speed) {
                role.x -= role.speed;
                //if enemy out of bound, remove it
                if (role.x < 0) {
                    role.removeSelf();
                    //recycle
                    Laya.Pool.recover('role', role);
                }
            }
        }
        //create new enemy every 30 frames
        if (Laya.timer.currFrame % 120 === 0) {
            this.createEnemy(2);
        }
    };
    Game.prototype.onMouseMove = function (e) {
        this.hero.pos(Laya.stage.mouseX, Laya.stage.mouseY);
        // console.log(Laya.stage.mouseX,Laya.stage.mouseY);
    };
    Game.prototype.createEnemy = function (num) {
        for (var i = 0; i < num; i++) {
            var r = Math.random();
            var type = r < 0.7 ? 0 : r < 0.95 ? 1 : 2;
            var enemy = Laya.Pool.getItemByClass('role', Role);
            //initialize enemy
            enemy.init('enemy' + (type + 1), 0, this.hps[type], this.speeds[type], this.radius[type]);
            //random pos
            enemy.pos(1000 - Math.random() * 40, 50 + Math.random() * 500);
            Laya.stage.addChild(enemy);
        }
    };
    return Game;
}());
new Game();
//# sourceMappingURL=Game.js.map