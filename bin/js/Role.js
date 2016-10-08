var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Role = (function (_super) {
    __extends(Role, _super);
    function Role() {
        _super.call(this);
        this.init();
    }
    Role.prototype.init = function () {
        //cache animations
        Laya.Animation.createFrames(['war/hero_walk1.png', 'war/hero_walk2.png', 'war/hero_walk3.png',
            'war/hero_walk4.png', 'war/hero_walk5.png', 'war/hero_walk6.png', 'war/hero_walk7.png',
            'war/hero_walk8.png', 'war/hero_walk9.png', 'war/hero_walk10.png', 'war/hero_walk11.png',
            'war/hero_walk12.png', 'war/hero_walk13.png', 'war/hero_walk14.png', 'war/hero_walk15.png',
            'war/hero_walk16.png', 'war/hero_walk17.png', 'war/hero_walk18.png', 'war/hero_walk19.png',
            'war/hero_walk20.png', 'war/hero_walk21.png', 'war/hero_walk22.png', 'war/hero_walk23.png', 'war/hero_walk24.png'], 'hero_walk');
        Laya.Animation.createFrames(['war/hero_down1.png', 'war/hero_down2.png', 'war/hero_down3.png', 'war/hero_down4.png', 'war/hero_down5.png'], 'hero_down');
        this.body = new Laya.Animation();
        // this.body.loadImages(['war/hero_walk1.png','war/hero_walk2.png','war/hero_walk3.png',
        // 'war/hero_walk4.png','war/hero_walk5.png','war/hero_walk6.png','war/hero_walk7.png',
        // 'war/hero_walk8.png','war/hero_walk9.png','war/hero_walk10.png','war/hero_walk11.png',
        // 'war/hero_walk12.png','war/hero_walk13.png','war/hero_walk14.png','war/hero_walk15.png',
        // 'war/hero_walk16.png','war/hero_walk17.png','war/hero_walk18.png','war/hero_walk19.png',
        // 'war/hero_walk20.png','war/hero_walk21.png','war/hero_walk22.png','war/hero_walk23.png','war/hero_walk24.png']);
        this.addChild(this.body);
        // this.body.play();
        //test
        this.playAction('hero_down');
    };
    Role.prototype.playAction = function (action) {
        this.body.play(0, true, action);
        var bound = this.body.getBounds();
        this.body.pos(-bound.width / 2, -bound.height / 2);
        console.log(this.body);
    };
    return Role;
}(Laya.Sprite));
//# sourceMappingURL=Role.js.map