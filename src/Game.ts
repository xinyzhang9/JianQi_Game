// 程序入口
class Game{
    private hero: Role;
    constructor()
    {        
        Laya.init(1000,600);
        var bg:BackGround = new BackGround();
        Laya.stage.addChild(bg);

        Laya.loader.load('res/atlas/war.json',Laya.Handler.create(this,this.onLoaded),null,Laya.Loader.ATLAS);
    }
    onLoaded(){
        this.hero = new Role();
        // this.hero.pos(500,300);
        Laya.stage.addChild(this.hero);

        Laya.stage.on('mousemove',this,this.onMouseMove);
    }
    onMouseMove(e:Laya.Event):void{
        this.hero.pos(Laya.stage.mouseX,Laya.stage.mouseY);
    }
    
}
new Game();