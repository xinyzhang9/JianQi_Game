// 程序入口
var Game = (function () {
    function Game() {
        Laya.init(1000, 600);
        var bg = new BackGround();
        Laya.stage.addChild(bg);
    }
    return Game;
}());
new Game();
//# sourceMappingURL=Game.js.map