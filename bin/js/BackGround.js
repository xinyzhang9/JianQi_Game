var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BackGround = (function (_super) {
    __extends(BackGround, _super);
    function BackGround() {
        _super.call(this);
        this.init();
    }
    BackGround.prototype.init = function () {
        this.bg1 = new Laya.Sprite();
        this.bg1.loadImage('res/background.png');
        this.addChild(this.bg1);
        this.bg2 = new Laya.Sprite();
        this.bg2.loadImage('res/background.png');
        this.bg2.pos(-1000, 0);
        this.addChild(this.bg2);
        Laya.timer.frameLoop(1, this, this.onLoop);
    };
    BackGround.prototype.onLoop = function () {
        this.x += 1;
        if (this.x + this.bg1.x >= 1000) {
            this.bg1.x -= 2 * 1000;
        }
        if (this.x + this.bg2.x >= 1000) {
            this.bg2.x -= 2 * 1000;
        }
    };
    return BackGround;
}(Laya.Sprite));
//# sourceMappingURL=BackGround.js.map