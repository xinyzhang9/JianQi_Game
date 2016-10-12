class GameInfo extends ui.GameInfoUI{
    constructor(){
        super();
        this.pauseBtn.on('click',this,this.onPauseBtnClick);
        this.reset();
    }

    public reset():void{
        this.infoLabel.text = '';
        this.tutorialLabel.text = '';
        this.hp(5);
        this.mp(0);
        this.level(0);
        this.score(0);
    }
    onPauseBtnClick(e:Laya.Event):void{
        e.stopPropagation();
        this.infoLabel.text = 'Game Paused. Click to resume.';
        gameInstance.pause();
        Laya.stage.once('click',this,this.onStageClick);
    }
    onStageClick(e:Laya.Event):void{
        this.infoLabel.text = '';
        gameInstance.resume();
    }

    public hp(val: number):void{
        // this.hpLabel.text = 'HP: '+val;
        var str = '';
        for(var i = 0; i < val; i++){
            str += '\u2665';
            // str += '|';
        }
        this.hpLabel.text = str;
    }

    public mp(val: number):void{
        // this.hpLabel.text = 'HP: '+val;
        var str = '';
        for(var i = 0; i < val; i++){
            str += '|';
        }
        this.mpLabel.text = str;
    }

    public level(val: number):void{
        this.levelLabel.text = 'Level: '+val;
    }

    public score(val: number):void{
        this.scoreLabel.text = 'Score: '+val;
    }

    //best score
    public bestScore(value: number): void{
        this.bestScoreLabel.text = 'Best Score: ' + value;
    }

}