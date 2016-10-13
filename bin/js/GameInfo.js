var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameInfo = (function (_super) {
    __extends(GameInfo, _super);
    function GameInfo() {
        _super.call(this);
        this.reset();
    }
    GameInfo.prototype.reset = function () {
        this.infoLabel.text = '';
        this.tutorialLabel.text = '';
        this.hp(5);
        this.mp(0);
        this.level(0);
        this.score(0);
    };
    GameInfo.prototype.onStageClick = function (e) {
        this.infoLabel.text = '';
        gameInstance.resume();
    };
    GameInfo.prototype.hp = function (val) {
        // this.hpLabel.text = 'HP: '+val;
        var str = '';
        for (var i = 0; i < val; i++) {
            str += '\u2665';
        }
        this.hpLabel.text = str;
    };
    GameInfo.prototype.mp = function (val) {
        // this.hpLabel.text = 'HP: '+val;
        var str = '';
        for (var i = 0; i < val; i++) {
            str += '|';
        }
        this.mpLabel.text = str;
    };
    GameInfo.prototype.level = function (val) {
        this.levelLabel.text = 'Level: ' + val;
    };
    GameInfo.prototype.score = function (val) {
        this.scoreLabel.text = 'Score: ' + val;
    };
    //best score
    GameInfo.prototype.bestScore = function (value) {
        this.bestScoreLabel.text = 'Best Score: ' + value;
    };
    return GameInfo;
}(ui.GameInfoUI));
//# sourceMappingURL=GameInfo.js.map