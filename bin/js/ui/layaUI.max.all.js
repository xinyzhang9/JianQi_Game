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
        GameInfoUI.uiView = { "type": "View", "props": { "width": 600, "height": 400 }, "child": [{ "type": "Button", "props": { "y": 19, "x": 495, "var": "pauseBtn", "stateNum": "1", "skin": "war/btn_pause.png" } }, { "type": "Label", "props": { "y": 20, "x": 150, "var": "levelLabel", "text": "Level:50", "fontSize": 20, "color": "#ffffff" } }, { "type": "Label", "props": { "y": 20, "x": 70, "var": "hpLabel", "text": "Hp:10", "fontSize": 20, "color": "#3dff00" } }, { "type": "Label", "props": { "y": 20, "x": 250, "var": "scoreLabel", "text": "Score:100", "fontSize": 20, "color": "#f4f41d" } }, { "type": "Label", "props": { "y": 260, "x": 234, "var": "infoLabel", "text": "Game Over!", "fontSize": 28, "color": "#ffffff" } }] };
        return GameInfoUI;
    }(View));
    ui.GameInfoUI = GameInfoUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map