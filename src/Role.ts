class Role extends Laya.Sprite{
    private body: Laya.Animation;
    constructor(){
        super();
        this.init();
    }
    init(): void{
        this.body = new Laya.Animation();
        this.body.loadImages(['war/hero_walk1.png','war/hero_walk2.png','war/hero_walk3.png',
        'war/hero_walk4.png','war/hero_walk5.png','war/hero_walk6.png','war/hero_walk7.png',
        'war/hero_walk8.png','war/hero_walk9.png','war/hero_walk10.png','war/hero_walk11.png',
        'war/hero_walk12.png','war/hero_walk13.png','war/hero_walk14.png','war/hero_walk15.png',
        'war/hero_walk16.png','war/hero_walk17.png','war/hero_walk18.png','war/hero_walk19.png',
        'war/hero_walk20.png','war/hero_walk21.png','war/hero_walk22.png','war/hero_walk23.png','war/hero_walk24.png']);

        this.body.play();
        this.addChild(this.body);
    }
}