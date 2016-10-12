
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class GameInfoUI extends View {
		public pauseBtn:Laya.Button;
		public levelLabel:Laya.Label;
		public hpLabel:Laya.Label;
		public scoreLabel:Laya.Label;
		public infoLabel:Laya.Label;
		public bestScoreLabel:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"x":30,"width":600,"height":400},"child":[{"type":"Button","props":{"y":550,"x":910,"var":"pauseBtn","stateNum":"1","skin":"war/btn_pause.png"}},{"type":"Label","props":{"y":500,"x":"30","var":"levelLabel","text":"Level:50","fontSize":20,"color":"#ffffff","bold":true}},{"type":"Label","props":{"y":20,"x":30,"var":"hpLabel","text":"Hp:10","fontSize":20,"color":"#ff0000","bold":true}},{"type":"Label","props":{"y":50,"x":30,"var":"scoreLabel","text":"Score:100","fontSize":20,"color":"#f4f41d","bold":true}},{"type":"Label","props":{"y":256,"x":300,"var":"infoLabel","text":"Game Over!","fontSize":28,"color":"#ffffff"}},{"type":"Label","props":{"y":530,"x":30,"var":"bestScoreLabel","text":"Best Score","fontSize":20,"color":"#27a300","bold":true}},{"type":"Image","props":{"y":8,"x":-21,"skin":"war/logo.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GameInfoUI.uiView);
        }
    }
}
