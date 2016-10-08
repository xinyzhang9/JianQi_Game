class BackGround extends Laya.Sprite{
    private bg1: Laya.Sprite;
    private bg2: Laya.Sprite;
    constructor(){
        super();
        this.init();
    }
    init():void{
        this.bg1 = new Laya.Sprite();
        this.bg1.loadImage('res/background.png');
        this.addChild(this.bg1);

        this.bg2 = new Laya.Sprite();
        this.bg2.loadImage('res/background.png');
        this.bg2.pos(-1000,0);
        this.addChild(this.bg2);

        Laya.timer.frameLoop(1,this,this.onLoop);
    }
    onLoop():void{
        this.x += 1;
        if(this.x + this.bg1.x >= 1000){
            this.bg1.x -= 2 * 1000;
        }
        if(this.x + this.bg2.x >= 1000){
            this.bg2.x -= 2 * 1000;
        }
    }
}