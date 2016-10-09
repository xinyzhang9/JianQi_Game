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
        //initialize hero
        this.hero.init('hero',0,5,0,30);
        //hero pos
        this.hero.pos(50,300);
        Laya.stage.addChild(this.hero);
        this.hero.shootType = 1;
        //mouse listener
        Laya.stage.on('mousemove',this,this.onMouseMove);

        //main loop
        Laya.timer.frameLoop(1,this,this.onLoop);
    }
    onLoop(): void{
        for(var i: number = Laya.stage.numChildren - 1; i > -1; i--){
            var role:Role = Laya.stage.getChildAt(i) as Role;
            if(role && role.speed){
                role.x -= role.speed;

                //if enemy out of bound, remove it
                if(role.x < 0 || !role.visible || (role.isBullet && role.x > 1000)){
                    role.removeSelf();
                    //recycle
                    role.isBullet = false;
                    role.visible = true;
                    Laya.Pool.recover('role',role);
                }
            }
            if(role.shootType > 0){
                var time: number = Laya.Browser.now();
                if(time > role.shootTime){
                    role.shootTime = time + role.shootInterval;
                    var bullet = Laya.Pool.getItemByClass('role',Role);
                    bullet.init('bullet1',role.camp,1,-5,1);
                    bullet.isBullet = true;
                    bullet.pos(role.x-role.hitRadius+40,role.y+25);
                    Laya.stage.addChild(bullet);
                }
            }
        }

        //collision detect
        var n: number = Laya.stage.numChildren;
        for(var i: number = Laya.stage.numChildren-1; i > 0; i--){
            var role1:Role = Laya.stage.getChildAt(i) as Role;
            if(role.hp < 1) continue;
            for(var j: number = i-1; j > 0; j--){
                if(!role.visible) continue;
                var role2 = Laya.stage.getChildAt(j) as Role;
                if(role2.hp > 0 && role1.camp != role2.camp){
                    var hitRadius: number = role1.hitRadius + role2.hitRadius;
                    if(Math.abs(role1.x-role2.x) < hitRadius && Math.abs(role1.y-role2.y) < hitRadius){
                        this.lostHp(role1,1);
                        this.lostHp(role2,1);
                    }
                }
            }
        }

        if(this.hero.hp < 1){
            Laya.timer.clear(this,this.onLoop);
        }

        //create new enemy every 30 frames
        if(Laya.timer.currFrame % 120 === 0){
            this.createEnemy(2);
        }
    }

    lostHp(role: Role, lostHp: number): void{
        role.hp -= lostHp;
        if(role.hp > 0){
            role.playAction('hit');
        }else{
            if(role.isBullet){
                role.visible = false;
            }else{
                role.playAction('down');
            }
        }
    }
    onMouseMove(e:Laya.Event):void{
        this.hero.pos(Laya.stage.mouseX,Laya.stage.mouseY);
        // console.log(Laya.stage.mouseX,Laya.stage.mouseY);

    }

    //enemy hp table
    private hps: Array<number> = [1,2,10];
    //enemy speed table
    private speeds: Array<number> = [3,2,1];
    //enemy been hit radius
    private radius: Array<number> = [15,30,60];

    createEnemy(num: number):void{
        for(var i: number = 0; i < num; i++){
            var r: number = Math.random();
            var type: number = r < 0.7?0:r<0.95?1:2;
            var enemy: Role = Laya.Pool.getItemByClass('role',Role);
            //initialize enemy
            enemy.init('enemy'+(type+1),1,this.hps[type],this.speeds[type],this.radius[type]);

            //random pos
            enemy.pos(1000-Math.random()*40, 50+Math.random()*500);
            Laya.stage.addChild(enemy);
        }
    }
    
}
new Game();