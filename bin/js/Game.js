// 程序入口
var Game = (function () {
    function Game() {
        this.bulletPos = [[0], [-10, 10], [-20, 0, 20], [-30, -10, 10, 30]];
        this.level = 0;
        this.score = 0;
        this.levelUpScore = 10;
        this.bulletLevel = 0;
        this.radius = [15, 30, 70];
        Laya.init(1000, 600, Laya.WebGL);
        Laya.loader.load('res/atlas/war.json', Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.ATLAS);
    }
    Game.prototype.onLoaded = function () {
        var bg = new BackGround();
        Laya.stage.addChild(bg);
        this.roleBox = new Laya.Sprite();
        Laya.stage.addChild(this.roleBox);
        this.gameInfo = new GameInfo();
        Laya.stage.addChild(this.gameInfo);
        this.hero = new Role();
        this.roleBox.addChild(this.hero);
        this.restart();
    };
    Game.prototype.onLoop = function () {
        for (var i = this.roleBox.numChildren - 1; i > -1; i--) {
            var role = this.roleBox.getChildAt(i);
            if (role && role.speed) {
                role.x -= role.speed;
                //if enemy out of bound, remove it
                if (role.x < 0 || !role.visible || (role.heroType === 1 && role.x > 1000)) {
                    role.removeSelf();
                    //recycle
                    role.visible = true;
                    Laya.Pool.recover('role', role);
                }
            }
            if (role.shootType > 0) {
                var time = Laya.Browser.now();
                if (time > role.shootTime) {
                    role.shootTime = time + role.shootInterval;
                    var pos = this.bulletPos[role.shootType - 1];
                    for (var index = 0; index < pos.length; index++) {
                        var bullet = Laya.Pool.getItemByClass('role', Role);
                        bullet.init('bullet1', role.camp, 1, -5 - role.shootType - Math.floor(this.level / 15), 1, 1);
                        bullet.pos(role.x - role.hitRadius + 40, role.y + 25 + pos[index]);
                        this.roleBox.addChild(bullet);
                    }
                }
            }
        }
        //collision detect
        var n = this.roleBox.numChildren;
        for (var i = this.roleBox.numChildren - 1; i > 0; i--) {
            var role1 = this.roleBox.getChildAt(i);
            if (role.hp < 1)
                continue;
            for (var j = i - 1; j > -1; j--) {
                if (!role.visible)
                    continue;
                var role2 = this.roleBox.getChildAt(j);
                if (role2.hp > 0 && role1.camp != role2.camp) {
                    var hitRadius = role1.hitRadius + role2.hitRadius;
                    if (Math.abs(role1.x - role2.x) < hitRadius && Math.abs(role1.y - role2.y) < hitRadius) {
                        this.lostHp(role1, 1);
                        this.lostHp(role2, 1);
                        console.log(this.hero.hp);
                        this.score++;
                        //display
                        this.gameInfo.score(this.score);
                        if (this.score > this.levelUpScore) {
                            this.level++;
                            //display
                            this.gameInfo.level(this.level);
                            this.levelUpScore += this.level * 5;
                        }
                    }
                }
            }
        }
        if (this.hero.hp < 1) {
            this.gameInfo.hp(this.hero.hp);
            Laya.timer.clear(this, this.onLoop);
            this.gameInfo.infoLabel.text = 'GameOver, Your score is ' + this.score + '\n Click here to restart.';
            this.gameInfo.infoLabel.once('click', this, this.restart);
        }
        var cutTime = this.level < 30 ? this.level * 2 : 60;
        var speedUp = Math.floor(this.level / 6);
        var hpUp = Math.floor(this.level / 8);
        var numUp = Math.floor(this.level / 10);
        //small enemy
        if (Laya.timer.currFrame % (80 - cutTime) === 0) {
            this.createEnemy(0, 2 + numUp, 3 + speedUp, 1);
        }
        //mid enemy
        if (Laya.timer.currFrame % (150 - cutTime * 2) === 0) {
            this.createEnemy(1, 1 + numUp, 2 + speedUp, 2 + hpUp * 2);
        }
        //boss
        if (Laya.timer.currFrame % (900 - cutTime * 4) === 0) {
            this.createEnemy(2, 1, 1 + speedUp, 10 + hpUp * 6);
        }
    };
    Game.prototype.restart = function () {
        this.score = 0;
        this.level = 0;
        this.levelUpScore = 10;
        this.bulletLevel = 0;
        this.gameInfo.reset();
        this.hero.init('hero', 0, 5, 0, 30);
        this.hero.pos(20, 300);
        this.hero.shootType = 1;
        this.hero.shootInterval = 500;
        this.hero.visible = true;
        for (var i = this.roleBox.numChildren - 1; i > -1; i--) {
            var role = this.roleBox.getChildAt(i);
            if (role != this.hero) {
                role.removeSelf();
                role.visible = true;
                Laya.Pool.recover('role', role);
            }
        }
        this.resume();
    };
    Game.prototype.pause = function () {
        Laya.timer.clear(this, this.onLoop);
        Laya.stage.off('mousemove', this, this.onMouseMove);
    };
    Game.prototype.resume = function () {
        Laya.timer.frameLoop(1, this, this.onLoop);
        Laya.stage.on('mousemove', this, this.onMouseMove);
    };
    Game.prototype.lostHp = function (role, lostHp) {
        //set hero shield time
        if (role == this.hero) {
            console.log('shield:', this.hero.shield);
            this.gameInfo.hp(role.hp);
            if (!this.hero.shield) {
                this.hero.shield = true;
                this.shieldStartTime = Laya.Browser.now();
            }
            if (Laya.Browser.now() - this.shieldStartTime > 500) {
                this.hero.shield = false;
            }
        }
        if ((role == this.hero && !this.hero.shield) || role != this.hero) {
            role.hp -= lostHp;
        }
        if (role.heroType === 2) {
            this.bulletLevel++;
            // this.hero.shootType = Math.min(Math.floor(this.bulletLevel/2)+1,4);
            this.hero.shootType = Math.min(this.bulletLevel, 4);
            this.hero.shootInterval = 500 - 20 * (this.bulletLevel > 20 ? 20 : this.bulletLevel);
            role.visible = false;
        }
        else if (role.heroType === 3) {
            this.hero.hp++;
            if (this.hero.hp > 10)
                this.hero.hp = 10;
            this.gameInfo.hp(this.hero.hp);
            role.visible = false;
        }
        else if (role.hp > 0) {
            role.playAction('hit');
        }
        else {
            if (role.heroType > 0) {
                role.visible = false;
            }
            else {
                role.playAction('down');
                //beat boss to get items
                if (role.type === 'enemy3') {
                    var type = Math.random() < 0.6 ? 2 : 3;
                    var item = Laya.Pool.getItemByClass('role', Role);
                    item.init('ufo' + (type - 1), role.camp, 1, 1, 15, type);
                    item.pos(role.x, role.y);
                    this.roleBox.addChild(item);
                }
            }
        }
    };
    Game.prototype.onMouseMove = function (e) {
        this.hero.pos(Laya.stage.mouseX, Laya.stage.mouseY);
        // console.log(Laya.stage.mouseX,Laya.stage.mouseY);
    };
    Game.prototype.createEnemy = function (type, num, speed, hp) {
        for (var i = 0; i < num; i++) {
            var enemy = Laya.Pool.getItemByClass('role', Role);
            //initialize enemy
            enemy.init('enemy' + (type + 1), 1, hp, speed, this.radius[type]);
            //random pos
            enemy.pos(1000 - Math.random() * 40, 50 + Math.random() * 500);
            this.roleBox.addChild(enemy);
        }
    };
    return Game;
}());
var gameInstance = new Game();
//# sourceMappingURL=Game.js.map