// 程序入口
class Game{
    constructor()
    {        
        Laya.init(1000,600);
        var bg:BackGround = new BackGround();
        Laya.stage.addChild(bg);
    }
    
}
new Game();