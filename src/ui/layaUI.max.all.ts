
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class GameInfoUI extends View {
		public levelLabel:Laya.Label;
		public hpLabel:Laya.Label;
		public scoreLabel:Laya.Label;
		public infoLabel:Laya.Label;
		public bestScoreLabel:Laya.Label;
		public tutorialLabel:Laya.Label;
		public mpLabel:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"x":30,"width":600,"height":400},"child":[{"type":"Label","props":{"y":500,"x":-12,"var":"levelLabel","text":"Level:50","fontSize":20,"color":"#ffffff","bold":true}},{"type":"Label","props":{"y":20,"x":30,"var":"hpLabel","text":"Hp:10","fontSize":20,"color":"#ff0000","bold":true}},{"type":"Label","props":{"y":530,"x":-12,"var":"scoreLabel","text":"Score:100","fontSize":20,"color":"#f4f41d","bold":true}},{"type":"Label","props":{"y":256,"x":300,"var":"infoLabel","text":"Game Over!","fontSize":28,"color":"#970200"}},{"type":"Label","props":{"y":560,"x":-12,"var":"bestScoreLabel","text":"Best Score","fontSize":20,"color":"#27a300","bold":true}},{"type":"Label","props":{"y":366,"x":300,"width":25.353515625,"var":"tutorialLabel","text":"Tutorial","height":12,"fontSize":25,"color":"#ffffff"}},{"type":"Label","props":{"y":50,"x":30,"var":"mpLabel","text":"MP: 100","fontSize":20,"color":"#0038ec","bold":true}},{"type":"Image","props":{"y":17,"x":-12,"width":30,"skin":"war/hp.png","height":22}},{"type":"Image","props":{"y":44,"x":-12,"width":26,"skin":"war/mp.png","height":35}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GameInfoUI.uiView);
        }
    }
}
