
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class GameInfoUI extends View {
		public pauseBtn:Laya.Button;
		public levelLabel:Laya.Label;
		public hpLabel:Laya.Label;
		public scoreLabel:Laya.Label;
		public infoLabel:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Button","props":{"y":19,"x":495,"var":"pauseBtn","stateNum":"1","skin":"war/btn_pause.png"}},{"type":"Label","props":{"y":20,"x":150,"var":"levelLabel","text":"Level:50","fontSize":20,"color":"#ffffff"}},{"type":"Label","props":{"y":20,"x":70,"var":"hpLabel","text":"Hp:10","fontSize":20,"color":"#3dff00"}},{"type":"Label","props":{"y":20,"x":250,"var":"scoreLabel","text":"Score:100","fontSize":20,"color":"#f4f41d"}},{"type":"Label","props":{"y":260,"x":234,"var":"infoLabel","text":"Game Over!","fontSize":28,"color":"#ffffff"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GameInfoUI.uiView);
        }
    }
}
