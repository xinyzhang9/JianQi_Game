class Role extends Laya.Sprite{
    private static cached: boolean = false;
    private body: Laya.Animation;   
    public type: string;
    //0:hero, 1:enemy
    public camp: number;
    public hp: number;
    public mp: number = 0;
    public speed: number;
    public hitRadius: number = 0;

    public shootType: number = 0;
    public shootInterval: number = 500;
    public shootTime: number = Laya.Browser.now()+100;

    public action: string;
    //0: normal,1:bullet,2:bullet++,3:blood++,4:special move
    public heroType: number = 0;

    //shield status
    public shield: boolean = false;

    constructor(){
        super();
    }
    public init(type: string, camp: number, hp: number, speed: number, hitRadius: number, heroType: number = 0): void{
        //initialize attributes
        this.type = type;
        this.camp = camp;
        this.hp = hp;
        this.speed = speed;
        this.hitRadius = hitRadius;
        this.heroType = heroType;
        //cache animations
        if(!Role.cached){
            //hero walk
            Laya.Animation.createFrames(['war/hero_walk1.png','war/hero_walk2.png','war/hero_walk3.png',
            'war/hero_walk4.png','war/hero_walk5.png','war/hero_walk6.png','war/hero_walk7.png',
            'war/hero_walk8.png','war/hero_walk9.png','war/hero_walk10.png','war/hero_walk11.png',
            'war/hero_walk12.png','war/hero_walk13.png','war/hero_walk14.png','war/hero_walk15.png',
            'war/hero_walk16.png','war/hero_walk17.png','war/hero_walk18.png','war/hero_walk19.png',
            'war/hero_walk20.png','war/hero_walk21.png','war/hero_walk22.png','war/hero_walk23.png','war/hero_walk24.png'],'hero_walk');
            //hero down
            Laya.Animation.createFrames(['war/hero_down1.png','war/hero_down2.png','war/hero_down3.png','war/hero_down4.png',
            'war/hero_down5.png','war/hero_down6.png','war/hero_down7.png','war/hero_down8.png','war/hero_down9.png'],'hero_down');
            //hero hit
            Laya.Animation.createFrames(['war/hero_hit1.png','war/hero_hit2.png'],'hero_hit');

            //enemy1 down
            Laya.Animation.createFrames(['war/enemy1_down1.png','war/enemy1_down2.png','war/enemy1_down3.png','war/enemy1_down4.png'],'enemy1_down');
            //enemy1 hit
            Laya.Animation.createFrames(['war/enemy1_hit1.png','war/enemy1_hit2.png'],'enemy1_hit');
            //enemy1 walk
            Laya.Animation.createFrames(['war/enemy1_walk1.png','war/enemy1_walk2.png','war/enemy1_walk3.png','war/enemy1_walk4.png',
            'war/enemy1_walk5.png','war/enemy1_walk6.png'],'enemy1_walk');

            //enemy2 down
            Laya.Animation.createFrames(['war/enemy2_down1.png','war/enemy2_down2.png','war/enemy2_down3.png','war/enemy2_down4.png','war/enemy2_down5.png'],'enemy2_down');
            //enemy2 hit
            Laya.Animation.createFrames(['war/enemy2_hit1.png','war/enemy2_hit2.png'],'enemy2_hit');
            //enemy2 walk
            Laya.Animation.createFrames(['war/enemy2_walk1.png','war/enemy2_walk2.png','war/enemy2_walk3.png','war/enemy2_walk4.png',
            'war/enemy2_walk5.png','war/enemy2_walk6.png'],'enemy2_walk');

            //enemy3 down
            Laya.Animation.createFrames(['war/enemy3_down1.png','war/enemy3_down2.png','war/enemy3_down3.png','war/enemy3_down4.png','war/enemy3_down5.png'],'enemy3_down');
            //enemy3 hit
            Laya.Animation.createFrames(['war/enemy3_hit1.png','war/enemy3_hit2.png'],'enemy3_hit');
            //enemy3 walk
            Laya.Animation.createFrames(['war/enemy3_walk1.png','war/enemy3_walk2.png','war/enemy3_walk3.png','war/enemy3_walk4.png',
            'war/enemy3_walk5.png','war/enemy3_walk6.png','war/enemy3_walk7.png','war/enemy3_walk8.png',
            'war/enemy3_walk9.png','war/enemy3_walk10.png','war/enemy3_walk11.png','war/enemy3_walk12.png'],'enemy3_walk');

            //bullet1 walk
            Laya.Animation.createFrames(['war/bullet1_fly1.png','war/bullet1_fly2.png','war/bullet1_fly3.png'],'bullet1_walk');

            //bullet3 walk
            Laya.Animation.createFrames(['war/bullet3_fly2.png','war/bullet3_fly3.png',
            'war/bullet3_fly4.png','war/bullet3_fly5.png','war/bullet3_fly6.png','war/bullet3_fly7.png'],'bullet3_walk');

            //bullet4 walk
            Laya.Animation.createFrames(['war/bullet4_fly1.png','war/bullet4_fly2.png','war/bullet4_fly3.png',
            'war/bullet4_fly4.png','war/bullet4_fly5.png','war/bullet4_fly6.png','war/bullet4_fly7.png',
            'war/bullet4_fly8.png','war/bullet4_fly9.png','war/bullet4_fly10.png'],'bullet4_walk');

            //bullet4 release
            Laya.Animation.createFrames(['war/bullet4_release1.png','war/bullet4_release2.png','war/bullet4_release3.png',
            'war/bullet4_release4.png','war/bullet4_release5.png','war/bullet4_release6.png','war/bullet4_release7.png',
            'war/bullet4_release8.png','war/bullet4_release9.png','war/bullet4_release10.png','war/bullet4_release11.png',
            'war/bullet4_release12.png'],'bullet4_release');

            //ufo1
            Laya.Animation.createFrames(['war/ufo1.png'],'ufo1_walk');
            //ufo2
            Laya.Animation.createFrames(['war/ufo2.png'],'ufo2_walk');
        }
        
        if(!this.body){
            this.body = new Laya.Animation();
            //set animation interval
            this.body.interval = 75;
            this.addChild(this.body);

            this.body.on('complete',this,this.onPlayComplete);
        }
        if(this.heroType === 4){
            this.playAction('release');
        }else{
            this.playAction('walk');
        }
        
    }
    onPlayComplete():void{
        if(this.action === 'down'){
            this.body.stop();
            this.visible = false;
        }else if(this.action === 'hit'){
            this.playAction('walk');
        }else if(this.action === 'release'){
            this.playAction('walk');
        }
    }
    playAction(action: string):void{
        //record current action
        this.action = action;
        this.body.play(0,true,this.type + '_'+action);
        var bound: Laya.Rectangle = this.body.getBounds();
        this.body.pos(-bound.width/2,-bound.height/2);
    }
    playActionOnce(action: string):void{
        //record current action
        this.action = action;
        this.body.play(0,false,this.type + '_'+action);
        var bound: Laya.Rectangle = this.body.getBounds();
        this.body.pos(-bound.width/2,-bound.height/2);
    }
}