// 程序入口
var Game = (function () {
    function Game() {
        Laya.init(1000, 600);
        var bg = new BackGround();
        Laya.stage.addChild(bg);
        Laya.loader.load('res/atlas/war.json', Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.ATLAS);
    }
    Game.prototype.onLoaded = function () {
        var hero = new Role();
        Laya.stage.addChild(hero);
    };
    return Game;
}());
new Game();
//# sourceMappingURL=Game.js.map