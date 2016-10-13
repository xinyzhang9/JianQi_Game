// 程序入口
class Game{
    private hero: Role;
    private bulletPos: Array<Array<number>> = [[0],[-10,10],[-20,0,20]];
    private level: number = 0;
    private score: number = 0;
    private levelUpScore: number = 10;
    private bulletLevel: number = 0;
    private radius: Array<number> = [15,30,70];
    //role box
    private roleBox: Laya.Sprite;
    private gameInfo: GameInfo;

    private shieldStartTime: number = 0;

    private itemStartTime: number = 0;

    private soundStartTime: number = 0;

    private mpStartTime: number = 0;

    private paused: boolean = false;

    private bestScore: number = 0;

    

    constructor()
    {        
        Laya.init(1000,600,Laya.WebGL);
    
        Laya.loader.load('res/atlas/war.json',Laya.Handler.create(this,this.onLoaded),null,Laya.Loader.ATLAS);
        Laya.loader.load([{url:'res/sound/achievement.mp3',type:'sound'},{url:'res/sound/bullet.mp3',type:'sound'},{url:'res/sound/enemy1_down.mp3',type:'sound'},
        {url:'res/sound/enemy2_down.mp3',type:'sound'},{url:'res/sound/enemy3_down.mp3',type:'sound'},{url:'res/sound/enemy3_out.mp3',type:'sound'},
        {url:'res/sound/gameover.mp3',type:'sound'},]) 
        Laya.stage.scaleMode = 'fixwidth';
        Laya.stage.alignH = 'center';
        Laya.stage.screenMode = 'horizontal';
    }
    onLoaded(){
        var bg:BackGround = new BackGround();
        Laya.stage.addChild(bg);

        this.roleBox = new Laya.Sprite();
        Laya.stage.addChild(this.roleBox);
        this.gameInfo = new GameInfo();
        Laya.stage.addChild(this.gameInfo);

        this.hero = new Role();
        this.roleBox.addChild(this.hero);
        
        this.restart();
    }
    onLoop(): void{
        //update mp
        if(Laya.Browser.now() - this.mpStartTime > 1000-this.level * 15){
            this.mpStartTime = Laya.Browser.now();
            this.hero.mp += 1;
            if(this.hero.mp >= 10){
                this.hero.mp = 10;
                this.gameInfo.tutorialLabel.text = 'Your MP is full!';
            } 
            this.gameInfo.mp(this.hero.mp);
        }

        for(var i: number = this.roleBox.numChildren - 1; i > -1; i--){
            var role:Role = this.roleBox.getChildAt(i) as Role;
            if(role && role.speed){
                role.x -= role.speed;

                //if enemy out of bound, remove it
                if(role.x < 20 || !role.visible || (role.heroType === 1 && role.x > 1000)){
                    role.removeSelf();
                    //recycle
                    role.visible = true;
                    Laya.Pool.recover('role',role);
                }
            }
        }

        //collision detect
        var n: number = this.roleBox.numChildren;
        for(var i: number = this.roleBox.numChildren-1; i > -1; i--){
            var role1:Role = this.roleBox.getChildAt(i) as Role;
            if(role.hp < 1) continue;
            for(var j: number = i-1; j > -1; j--){
                if(!role.visible) continue;
                var role2 = this.roleBox.getChildAt(j) as Role;
                if(role2.hp > 0 && role1.camp != role2.camp){
                    var hitRadius: number = role1.hitRadius + role2.hitRadius;
                    if(Math.abs(role1.x-role2.x) < hitRadius && Math.abs(role1.y-role2.y) < hitRadius){
                        
                        if(role1.heroType === 0 && role2.heroType === 0 && !this.hero.shield){
                            this.shieldStartTime = Laya.Browser.now();
                            console.log(this.shieldStartTime);
                            this.hero.shield = true;
                        }else if(role1.heroType === 0 && role2.heroType === 0 && this.hero.shield){
                            if(Laya.Browser.now() - this.shieldStartTime > 500){
                                this.hero.shield = false;
                            }else{
                                return;
                            } 
                        }
                        this.lostHp(role1,1);
                        this.lostHp(role2,1);
                        this.score++;
                        //display
                        this.gameInfo.score(this.score);
                        if(this.score > this.levelUpScore){
                            this.level++;
                            if(this.level > 60){
                                this.level = 60;
                            }
                            //display
                            this.gameInfo.level(this.level);
                            this.levelUpScore += this.level * 5;
                        }
                    }
                }
            }
        }

        if(this.hero.hp < 1){
            Laya.SoundManager.playSound('res/sound/gameover.mp3');
             //update bestScore
            if(this.score > this.bestScore){
                localStorage.setItem('bestScore',this.score.toString());
            }

            this.gameInfo.hp(this.hero.hp);
            Laya.timer.clear(this,this.onLoop);
            this.gameInfo.infoLabel.text = 'Gameover, Your score is '+this.score + '\nClick here to restart.';
            this.gameInfo.infoLabel.once('click',this,this.restart);
        }

        var cutTime: number = this.level<30? this.level * 2: 60;
        var speedUp: number = Math.floor(this.level/6);
        var hpUp: number = Math.floor(this.level/8);
        var numUp: number = Math.floor(this.level/10);
        //small enemy
        if(Laya.timer.currFrame % (80 - cutTime) === 0){
            this.createEnemy(0,2 + numUp,3 + speedUp,1);
        }
        //mid enemy
        if(Laya.timer.currFrame % (150 - cutTime*2) === 0){
            this.createEnemy(1,1 + numUp,2 + speedUp,2 + hpUp*2);
        }
        //boss
        if(Laya.timer.currFrame % (900 - cutTime*4) === 0){
            this.createEnemy(2,1,1 + speedUp,10 + hpUp * 6);
            Laya.SoundManager.playSound('res/sound/enemy3_out.mp3');
        }
    }

    restart():void{
        this.score = 0;
        this.level = 0;
        this.levelUpScore = 10;
        this.bulletLevel = 0;
        this.bestScore = 0;
        if(localStorage.getItem('bestScore')){
            this.bestScore = parseInt(localStorage.getItem('bestScore'));
            this.gameInfo.bestScore(this.bestScore);
        }else{
            this.gameInfo.bestScore(0);
        }
        this.gameInfo.reset();
        this.gameInfo.tutorialLabel.text = 'S: Sword Wave, requires 0 mp\nA: Sword Trap, requires 5 mp\nD: Sword Soul, requires 10 mp\nESC: Pause Game';
        this.hero.init('hero',0,5,0,30);
        this.hero.pos(20,300);
        this.hero.shootType = 1;
        this.hero.shootInterval = 500;
        this.hero.visible = true;

        for(var i: number = this.roleBox.numChildren - 1; i > -1; i--){
            var role: Role = this.roleBox.getChildAt(i) as Role;
            if(role!=this.hero){
                role.removeSelf();
                role.visible = true;
                Laya.Pool.recover('role',role);
            }
        }
        this.resume();
    }

    public pause():void{
        Laya.timer.clear(this,this.onLoop);
        Laya.stage.off('mousemove',this,this.onMouseMove);
    }

    public resume():void{
        Laya.timer.frameLoop(1,this,this.onLoop);
        Laya.stage.on('mousemove',this,this.onMouseMove);
        Laya.stage.on(laya.events.Event.KEY_DOWN,this,this.onKeyDown);
    }

    lostHp(role: Role, lostHp: number): void{  
        role.hp -= lostHp;
        //display hero 
        if(role === this.hero){
            this.gameInfo.hp(this.hero.hp);
            console.log(this.hero.hp);
        }
        if(role.heroType === 2){
            this.bulletLevel++;
            // this.hero.shootType = Math.min(Math.floor(this.bulletLevel/2)+1,4);
            this.hero.shootType = Math.min(this.bulletLevel+1,3);
            this.hero.shootInterval = 500 - 20 * (this.bulletLevel > 20? 20: this.bulletLevel);
            role.visible = false;
            Laya.SoundManager.playSound('res/sound/achievement.mp3');
        }else if(role.heroType === 3){
            this.hero.hp++;
            if(this.hero.hp > 10) this.hero.hp = 10;
            this.gameInfo.hp(this.hero.hp);
            role.visible = false;
            Laya.SoundManager.playSound('res/sound/achievement.mp3');
        }else if(role.hp > 0){
            role.playAction('hit');
        }else{
            if(role.heroType > 0){
                role.visible = false;
            }else{
                if(Laya.Browser.now()-this.soundStartTime > 500){
                    Laya.SoundManager.playSound('res/sound/'+role.type+'_die.mp3');
                    this.soundStartTime = Laya.Browser.now();
                }
                
                role.playAction('down');
                //beat boss to get items
                if(role.type === 'enemy3'){
                    var type: number = Math.random()<0.6 ? 2 : 3;
                    var item: Role = Laya.Pool.getItemByClass('role',Role);
                    if(Laya.Browser.now() - this.itemStartTime > 1000){
                        this.itemStartTime = Laya.Browser.now();
                        item.init('ufo'+(type-1),role.camp,1,1,15,type);
                        item.pos(role.x,role.y);
                        this.roleBox.addChild(item);
                    }
                    
                }
            }
        }
        
    }
    onMouseMove(e:Laya.Event):void{
        this.hero.pos(Laya.stage.mouseX,Laya.stage.mouseY);
        // console.log(Laya.stage.mouseX,Laya.stage.mouseY);

    }
    onKeyDown(e): void{
        if(e.keyCode === 27){
            if(this.paused == false){
                this.paused = true;
                gameInstance.pause();
                this.gameInfo.infoLabel.text = 'Game paused\nPress ESC to resume';
                this.gameInfo.tutorialLabel.text = 'S: Sword Wave, requires 0 mp\nA: Sword Trap, requires 5 mp\nD: Sword Soul, requires 10 mp\nESC: Pause Game';

            }    
            else{
                this.paused = false;
                this.gameInfo.infoLabel.text = '';
                this.gameInfo.tutorialLabel.text = '';
                gameInstance.resume();
            }

        }
        if(e.keyCode === 83){
            this.gameInfo.tutorialLabel.text = '';
            //generate bullet1
            if(this.hero.shootType > 0){
                var time: number = Laya.Browser.now();
                if(time > this.hero.shootTime){
                    this.hero.shootTime = time + this.hero.shootInterval;

                    var pos: Array<number> = this.bulletPos[this.hero.shootType-1];
                    for(var index: number = 0; index < pos.length; index++){
                        var bullet = Laya.Pool.getItemByClass('role',Role);
                        bullet.init('bullet1',this.hero.camp,1,-5-this.hero.shootType-Math.floor(this.level/15),1,1);
                        bullet.pos(this.hero.x-this.hero.hitRadius+40,this.hero.y+25 + pos[index]);
                        this.roleBox.addChild(bullet);
                    }
                    Laya.SoundManager.playSound('res/sound/bullet.mp3');
                }
            }
        }
        if(e.keyCode === 68){
            this.gameInfo.tutorialLabel.text = '';
            //generate bullet3
            if(this.hero.shootType > 0 && this.hero.mp === 10){
                this.hero.mp = 0;
                this.gameInfo.mp(this.hero.mp);
                var time: number = Laya.Browser.now();
                if(time > this.hero.shootTime){
                    this.hero.shootTime = time + this.hero.shootInterval;

                    var pos: Array<number> = this.bulletPos[this.hero.shootType-1];
                    for(var index: number = 0; index < pos.length; index++){
                        var bullet = Laya.Pool.getItemByClass('role',Role);
                        bullet.init('bullet3',this.hero.camp,100,-5,50,1);
                        bullet.pos(this.hero.x+100,this.hero.y+20);
                        this.roleBox.addChild(bullet);
                    }
                    Laya.SoundManager.playSound('res/sound/bullet.mp3');
                }
            }
        }
        if(e.keyCode === 65){
            this.gameInfo.tutorialLabel.text = '';
            //generate bullet4
            if(this.hero.shootType > 0 && this.hero.mp >=5){
                this.hero.mp -= 5;
                this.gameInfo.mp(this.hero.mp);
                var time: number = Laya.Browser.now();
                if(time > this.hero.shootTime){
                    this.hero.shootTime = time + this.hero.shootInterval;

                    var pos: Array<number> = this.bulletPos[this.hero.shootType-1];
                    for(var index: number = 0; index < pos.length; index++){
                        var bullet = Laya.Pool.getItemByClass('role',Role);
                        bullet.init('bullet4',this.hero.camp,100,0,70,4);
                        bullet.pos(this.hero.x+250,this.hero.y+40);
                        this.roleBox.addChild(bullet);
                    }
                    Laya.SoundManager.playSound('res/sound/bullet.mp3');
                }
            }
        }
    }

    createEnemy(type: number, num: number, speed: number, hp: number):void{
        for(var i: number = 0; i < num; i++){
            var enemy: Role = Laya.Pool.getItemByClass('role',Role);
            //initialize enemy
            enemy.init('enemy'+(type+1),1,hp,speed,this.radius[type]);

            //random pos
            enemy.pos(1000-Math.random()*40, 50+Math.random()*500);
            this.roleBox.addChild(enemy);
        }
    }
    
}
var gameInstance = new Game();