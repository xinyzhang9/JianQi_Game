var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Role = (function (_super) {
    __extends(Role, _super);
    function Role() {
        _super.call(this);
    }
    Role.prototype.init = function (type, camp, hp, speed, hitRadius) {
        //initialize attributes
        this.type = type;
        this.camp = camp;
        this.hp = hp;
        this.speed = speed;
        this.hitRadius = hitRadius;
        //cache animations
        if (!Role.cached) {
            //hero walk
            Laya.Animation.createFrames(['war/hero_walk1.png', 'war/hero_walk2.png', 'war/hero_walk3.png',
                'war/hero_walk4.png', 'war/hero_walk5.png', 'war/hero_walk6.png', 'war/hero_walk7.png',
                'war/hero_walk8.png', 'war/hero_walk9.png', 'war/hero_walk10.png', 'war/hero_walk11.png',
                'war/hero_walk12.png', 'war/hero_walk13.png', 'war/hero_walk14.png', 'war/hero_walk15.png',
                'war/hero_walk16.png', 'war/hero_walk17.png', 'war/hero_walk18.png', 'war/hero_walk19.png',
                'war/hero_walk20.png', 'war/hero_walk21.png', 'war/hero_walk22.png', 'war/hero_walk23.png', 'war/hero_walk24.png'], 'hero_walk');
            //hero down
            Laya.Animation.createFrames(['war/hero_down1.png', 'war/hero_down2.png', 'war/hero_down3.png', 'war/hero_down4.png',
                'war/hero_down5.png', 'war/hero_down6.png', 'war/hero_down7.png', 'war/hero_down8.png', 'war/hero_down9.png'], 'hero_down');
            //enemy1 down
            Laya.Animation.createFrames(['war/enemy1_down1.png', 'war/enemy1_down2.png', 'war/enemy1_down3.png', 'war/enemy1_down4.png'], 'enemy1_down');
            //enemy1 hit
            Laya.Animation.createFrames(['war/enemy1_hit1.png', 'war/enemy1_hit2.png'], 'enemy1_hit');
            //enemy1 walk
            Laya.Animation.createFrames(['war/enemy1_walk1.png', 'war/enemy1_walk2.png', 'war/enemy1_walk3.png', 'war/enemy1_walk4.png',
                'war/enemy1_walk5.png', 'war/enemy1_walk6.png'], 'enemy1_walk');
            //enemy2 down
            Laya.Animation.createFrames(['war/enemy2_down1.png', 'war/enemy2_down2.png', 'war/enemy2_down3.png', 'war/enemy2_down4.png', 'war/enemy2_down5.png'], 'enemy2_down');
            //enemy2 hit
            Laya.Animation.createFrames(['war/enemy2_hit1.png', 'war/enemy2_hit2.png'], 'enemy2_hit');
            //enemy2 walk
            Laya.Animation.createFrames(['war/enemy2_walk1.png', 'war/enemy2_walk2.png', 'war/enemy2_walk3.png', 'war/enemy2_walk4.png',
                'war/enemy2_walk5.png', 'war/enemy2_walk6.png'], 'enemy2_walk');
            //enemy3 down
            Laya.Animation.createFrames(['war/enemy3_down1.png', 'war/enemy3_down2.png', 'war/enemy3_down3.png', 'war/enemy3_down4.png', 'war/enemy3_down5.png'], 'enemy3_down');
            //enemy3 hit
            Laya.Animation.createFrames(['war/enemy3_hit1.png', 'war/enemy3_hit2.png'], 'enemy3_hit');
            //enemy3 walk
            Laya.Animation.createFrames(['war/enemy3_walk1.png', 'war/enemy3_walk2.png', 'war/enemy3_walk3.png', 'war/enemy3_walk4.png',
                'war/enemy3_walk5.png', 'war/enemy3_walk6.png', 'war/enemy3_walk7.png', 'war/enemy3_walk8.png',
                'war/enemy3_walk9.png', 'war/enemy3_walk10.png', 'war/enemy3_walk11.png', 'war/enemy3_walk12.png'], 'enemy3_walk');
        }
        if (!this.body) {
            this.body = new Laya.Animation();
            this.addChild(this.body);
        }
        //play walk animations
        this.playAction('walk');
    };
    Role.prototype.playAction = function (action) {
        this.body.play(0, true, this.type + '_' + action);
        var bound = this.body.getBounds();
        this.body.pos(-bound.width / 2, -bound.height / 2);
    };
    Role.cached = false;
    return Role;
}(Laya.Sprite));
//# sourceMappingURL=Role.js.map