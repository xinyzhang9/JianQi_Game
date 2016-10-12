var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var GameInfoUI = (function (_super) {
        __extends(GameInfoUI, _super);
        function GameInfoUI() {
            _super.call(this);
        }
        GameInfoUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.GameInfoUI.uiView);
        };
        GameInfoUI.uiView = { "type": "View", "props": { "x": 30, "width": 600, "height": 400 }, "child": [{ "type": "Button", "props": { "y": 550, "x": 910, "var": "pauseBtn", "stateNum": "1", "skin": "war/btn_pause.png" } }, { "type": "Label", "props": { "y": 500, "x": "30", "var": "levelLabel", "text": "Level:50", "fontSize": 20, "color": "#ffffff", "bold": true } }, { "type": "Label", "props": { "y": 20, "x": 30, "var": "hpLabel", "text": "Hp:10", "fontSize": 20, "color": "#ff0000", "bold": true } }, { "type": "Label", "props": { "y": 50, "x": 30, "var": "scoreLabel", "text": "Score:100", "fontSize": 20, "color": "#f4f41d", "bold": true } }, { "type": "Label", "props": { "y": 256, "x": 300, "var": "infoLabel", "text": "Game Over!", "fontSize": 28, "color": "#ffffff" } }, { "type": "Label", "props": { "y": 530, "x": 30, "var": "bestScoreLabel", "text": "Best Score", "fontSize": 20, "color": "#27a300", "bold": true } }, { "type": "Image", "props": { "y": 8, "x": -21, "skin": "war/logo.png" } }] };
        return GameInfoUI;
    }(View));
    ui.GameInfoUI = GameInfoUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map