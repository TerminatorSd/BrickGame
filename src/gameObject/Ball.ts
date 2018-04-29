/**
 * 分析：球 
 */
class Ball extends GameObject{
	public constructor() {
		super();
		this.init();
		// this.addEventListener( egret.Event.ADDED_TO_STAGE,this.init,this);
	}

    // 球、跳、哎呀
	private _role:egret.Bitmap;
	// private jump_img:egret.Bitmap;
	// private death_img:egret.Bitmap;

	// flappy bird 加速度
	private acceleration:number = 0;

    // ball game 运动的方向
    private directionX: number = 0;
    private directionY: number = 0;

	//计算玩家的宽高时 只计算鸟本身 
	get width(){
		return this._role.width;
	}
	get height(){
		return this._role.height;
	}

    // 设置球的高度和宽度
    set width(width:number){
		this._role.width = width;
	}
	set height(height:number){
		this._role.height = height;
	}

    // 设置运动方向
    public setDirectionX(directionX:number) {
        this.directionX = directionX
    }

    public setDirectionY(directionY:number) {
        this.directionY = directionY
    }

	private init(){
		this._role = GameUtil.createBitmapByName("ball_png");
		this.addChild( this._role );

        this.directionX = 1;
        this.directionY = -1;

		// 跳跃效果图
		// this.jump_img = GameUtil.createBitmapByName("jump_png");
        // this.jump_img.visible = false;
        // this.addChild(this.jump_img);
		// 碰撞效果图
        // this.death_img = GameUtil.createBitmapByName("death_png");
        // this.death_img.visible = false;
        // this.addChild(this.death_img);
	}

    // bird 在空中jump的方法
	public jump(){
		if(!GameData.isAlive){
			return;
		}
		// flappy bird, 给bird 一个向上的速度
		// this.acceleration = -GameData.jumpSpeed;

        // 打砖块游戏 一次点击开始游戏之后不会再发生其他事情

		//跳的效果图出现
		// this.jump_img.x = (this.width - this.jump_img.width)/2;
		// this.jump_img.y = this.height ;
		// this.jump_img.visible = true;
		// egret.setTimeout(()=>{
		// 	this.jump_img.visible = false;
		// },this,100)
	}

    // 小球在空中飞舞的方法 add code
    public flyBall() {
        // 一开始朝60 度方向飞出去
        let angleTan = Math.tan(60);
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        this.x += this.directionX * GameData.flatSpeed;
        this.y += this.directionY * GameData.flatSpeed * angleTan;
        // 撞到墙壁改变方向
        if (this.x >= stageW - this.width / 2) {
            // var sound:egret.Sound = RES.getRes( "music_mp3" ); 
            //         var channel:egret.SoundChannel = sound.play(0,1);
            this.directionX = -1;
        }
        if (this.x <= this.width / 2) {
            this.directionX = 1;
        }
        if (this.y <= this.width / 2) {
            this.directionY = 1;
        }
        // 一边飞，一边旋转
        this.rotation += GameData.rotation;
        // 撞到墙之后按进入角度反弹，同时触发音效
    }

	death(isLanding:boolean = false){
		GameData.isAlive = false;
		if( !isLanding){
            console.log('game over~');
			// this.death_img.x = (this.width - this.jump_img.width)/2;
			// this.death_img.y = - this.death_img.height;
			// this.death_img.visible = true;
			// egret.setTimeout(()=>{
			// 	this.death_img.visible = false;
			// },this,500);
		}
	}
	update(timeStamp:number){
        // 不停的更新小球的位置
        this.flyBall()

        // flappy bird 预先设定，点击时向上的速度
		// this.y += this.acceleration;
		// 受重力加速度的影响，向下的速度
		// this.acceleration += GameData.gravity;

        // 掉到界面以下结束游戏
		// if((this.y + this._role.height)>GameData.groundHeight){
		if(this.y > this.stage.stageHeight + this.height / 2) {
			// this.death(true);
            GameData.isAlive = false;
            GameData.hasStart = false;
			SceneController.GameEnd();
			console.log("游戏结束");
		}
	}
}