// 程序入口
var Game = (function () {
    function Game() {
        Laya.init(1000, 600);
        var bg = new BackGround();
        Laya.stage.addChild(bg);
        Laya.loader.load('res/atlas/war.json', Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.ATLAS);
    }
    Game.prototype.onLoaded = function () {
        this.hero = new Role();
        // this.hero.pos(500,300);
        Laya.stage.addChild(this.hero);
        Laya.stage.on('mousemove', this, this.onMouseMove);
    };
    Game.prototype.onMouseMove = function (e) {
        this.hero.pos(Laya.stage.mouseX, Laya.stage.mouseY);
    };
    return Game;
}());
new Game();
//# sourceMappingURL=Game.js.map