class GameScene extends egret.DisplayObjectContainer{
	public constructor() {
		super();
		// 舞台加载完后初始化游戏页面内容
		this.addEventListener( egret.Event.ADDED_TO_STAGE,this.initView,this);
		this.touchEnabled = true;
		this.addEventListener( egret.TouchEvent.TOUCH_TAP,this.onClickView,this);
	}

// 	//游戏场景中分为以下几层：UI层 roler层 障碍物层 背景层 开始游戏层
	// private UIContainer:egret.DisplayObjectContainer;//UI层
	private rolerContainer:egret.DisplayObjectContainer;//主角
	private brickContainer:egret.DisplayObjectContainer;// ball game 砖块
// 	private barrierContainer:egret.DisplayObjectContainer;//障碍物
// 	private mileageContainer:egret.DisplayObjectContainer;//背景地砖层
	private startGameContianer:egret.DisplayObjectContainer;//开始游戏层

// 	// 跨过的障碍物数
// 	private barrierText:egret.TextField;
// 	//获取的鸡蛋的个数
// 	private eggText:egret.TextField;
// 	private platfrom_bird:egret.Bitmap;//小鸟站的平台
	// ball game 存放初始砖块 
	private gameObjectList:GameObject[];
	// ball game 撞击后删除砖块
	private deleteObjectList:GameData[];
	// 是否拖动
	private _touchStatus:boolean = false;


	private initView(){

		// 背景
		let bg:egret.Bitmap = GameUtil.createBitmapByName('bg_game_png');
		let stageW = this.stage.stageWidth;
		let stageH = this.stage.stageHeight;
		bg.width = stageW;
		bg.height = stageH;
		this.addChild(bg);

// 		//初始化场景中每一层
		// this.UIContainer = new egret.DisplayObjectContainer();
		this.rolerContainer = new egret.DisplayObjectContainer();
		this.brickContainer = new egret.DisplayObjectContainer();
// 		this.barrierContainer = new egret.DisplayObjectContainer();
// 		this.mileageContainer = new egret.DisplayObjectContainer();
		this.startGameContianer = new egret.DisplayObjectContainer();

// 		this.addChild( this.barrierContainer );
// 		this.addChild( this.mileageContainer );
		this.addChild( this.rolerContainer );
		this.addChild( this.brickContainer );
// 		this.addChild( this.UIContainer );
		this.addChild( this.startGameContianer );

		this.gameObjectList = [];
		this.deleteObjectList = [];
// 		//初始化UI层
// 		this.initUIContainer();
		// 初始化砖块层
		this.initBrickContainer();
		//初始化开始游戏层
		this.initStartGameContainer();
		//初始化 小球
		this.createRole();
// 		//创建里程
// 		this.createMileage();
	}


// 	private initUIContainer(){
// 		// 分数: 0
// 		let tip1:egret.TextField = new egret.TextField();
// 		tip1.text = "分数:";
// 		tip1.textColor = 0xffffff;
// 		tip1.size = 60;
// 		tip1.x = 50;
// 		tip1.y = 20;
// 		this.UIContainer.addChild(tip1);

// 		this.barrierText = new egret.TextField();
// 		this.barrierText.size = 60;
// 		this.barrierText.x = tip1.width + 50;
// 		this.barrierText.y = 20;
// 		this.UIContainer.addChild(this.barrierText);
// 		this.changeBarriersCount(0);

// 		//鸡蛋：0
// 		let tip2:egret.TextField = new egret.TextField();
// 		tip2.text = "鸟蛋";
// 		tip2.textColor = 0xffffff;
// 		tip2.size = 60;
// 		tip2.x = this.barrierText.x + this.barrierText.width + 50;
// 		tip2.y = 20;
// 		this.UIContainer.addChild(tip2);
// 		this.eggText = new egret.TextField();
// 		this.eggText.textColor = 0xffffff;
// 		this.eggText.size = 60;
// 		this.eggText.x = tip2.x + tip2.width + 50;
// 		this.eggText.y = 20;
// 		this.UIContainer.addChild( this.eggText );
// 		this.changeEggsCount(0);

// 		//暂停按钮
// 		let pauseBtn:egret.Bitmap = GameUtil.GameUtil.createBitmapByName("pause_png");
// 		pauseBtn.touchEnabled = true;
// 		pauseBtn.x = this.stage.stageWidth - pauseBtn.width - 20;
// 		pauseBtn.y = 20;
// 		pauseBtn.addEventListener( egret.TouchEvent.TOUCH_TAP,this.onPause,this);
// 		this.UIContainer.addChild(pauseBtn);
// 	}
// 	/**
// 	 * 改变 障碍物文本的值
// 	 */
// 	private changeBarriersCount(cnt:number){
// 		this.barrierText.text = cnt.toString();
// 	}
// 	/**
// 	 * 改变 鸟蛋的文本值
// 	 */
// 	private changeEggsCount(cnt:number){
// 		this.eggText.text = cnt.toString();
// 	}

// 	/**
// 	 * 游戏暂停
// 	 */
// 	private onPause(e:egret.TouchEvent){
// 		e.stopPropagation();//阻止冒泡
// 		SceneController.pauseGame();
// 		console.log("游戏暂停");
// 	}

	/**
	 * 创建木板和球
	 */
	private createRole(){
		let stageW = this.stage.stageWidth;
		let stageH = this.stage.stageHeight;

		// 木板在下方，球裹在木板上，球的大小设置
		GameData.ball = new Ball();
		GameData.ball.width = 30;
		GameData.ball.height = 38;
		GameData.board = new Board();
		GameData.board.width = 120;
		GameData.board.height = 30;
		// 给球设置锚点
		GameData.ball.anchorOffsetX = GameData.ball.width/2;
        GameData.ball.anchorOffsetY = GameData.ball.height/2;
		GameData.ball.x = (stageW - GameData.ball.width) / 2 + GameData.ball.width/2;
		GameData.ball.y = stageH - 100 - GameData.ball.height/2;
		// 设置木板位置
		GameData.board.x = (stageW - GameData.board.width) / 2;
		GameData.board.y = stageH - 100;

		this.rolerContainer.addChild(GameData.board);
		this.rolerContainer.addChild(GameData.ball);

		this.gameObjectList.push(GameData.board);
	}

	// 初始化砖块层
	private initBrickContainer () {
		// 读取文件中的砖块数据
		// let elements = GameData.elements;
		// for (let index in elements) {
		// 	let brickItem:Brick = new Brick(elements[index]);
		// 	brickItem.width = 150;
		// 	brickItem.height = 60;
		// 	brickItem.x = elements[index].x;
		// 	brickItem.y = elements[index].y;
		// 	this.brickContainer.addChild(brickItem);
		// 	this.gameObjectList.push(brickItem);
		// }
		
		// 生成20 块板砖
		let brickCount = 20;
		for (let i = 0; i < brickCount; i++) {
			let brickItem = new Brick(this.stage.stageWidth / 5, 60);
			brickItem.width = this.stage.stageWidth / 5;
			brickItem.height = 60;
			brickItem.x = (i % 5) * brickItem.width;
			brickItem.y = Math.floor(i / 5) * brickItem.height;
			this.brickContainer.addChild(brickItem);
			this.gameObjectList.push(brickItem);
		}
	}

	/**
	 * 初始化 开始游戏层
	 */
	private initStartGameContainer(){
		//准备
		let readyText:egret.TextField = new egret.TextField();
		readyText.text = "准备";
		readyText.size = 100;
		readyText.textColor = 0xFFA500;
		readyText.stroke = 5;//描边
		readyText.strokeColor = 0x000000;//描边颜色
		readyText.x = (this.stage.stageWidth - readyText.width)/2;
		readyText.y = this.stage.stageHeight/5;
		this.startGameContianer.addChild( readyText );
		//小手
		let hand:egret.Bitmap = GameUtil.createBitmapByName("hand_png");
		hand.x = (this.stage.stageWidth - hand.width)/2;
		hand.y = this.stage.stageHeight / 5 * 2;
		this.startGameContianer.addChild(hand);
		//点击开始游戏
		let startText:egret.TextField = new egret.TextField();
		startText.text = "点击开始游戏";
		startText.size = 80;
		startText.textColor = 0x000000;
		startText.stroke = 3;
		startText.strokeColor = 0xffffff;
		startText.x = (this.stage.stageWidth - startText.width)/2;
		startText.y = this.stage.stageHeight/5 * 3;
		this.startGameContianer.addChild(startText);
	}

// 	/**
// 	 * 点击界面
// 	 * 第一次点击 开始游戏
// 	 * 后面再次点击 跳跃
// 	 */
	private onClickView( evt:egret.TouchEvent ){
		// 点击屏幕，游戏开始，ball跳起来
		if(!GameData.hasStart && !GameData.isAlive){
			SceneController.startGameScene();
			return;
		}
		if(!GameData.hasStart){
			SceneController.startGame();
			this.addDragListener();
			return;
		}
		// ball game 第二次点击开始移动位置
		GameData.board.move(evt.stageX, evt.stageY);
	}

	/**
	 * 游戏开始 动起来！
	 */
	public startGame(){
		console.log("点击了界面，准备开始游戏");
		this.startGameContianer.visible = false;

	    // 移走小鸟站的平台
		// egret.Tween.get( this.platfrom_bird ).to({x:-this.platfrom_bird.width},300).call(()=>{
		// 	this.rolerContainer.removeChild( this.platfrom_bird );
		// })
	}

	// 拖动木板相应方法
	public addDragListener () {
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (evt:egret.TouchEvent) => {
			console.log('touch begin from GameScene line 246')
        	this._touchStatus = true;
			this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
		}, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, (evt:egret.TouchEvent) => {
			console.log('touch end from GameScene line 251')
			this._touchStatus = false;
        	this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
		}, this);
	}
	
	private mouseMove(evt:egret.TouchEvent)
    {
        if( this._touchStatus )
        {
			console.log('touch move from GameScene line 261')
			GameData.board.move(evt.stageX, evt.stageY);
        }
    }

// 	private mileage1:egret.Bitmap;
// 	private mileage2:egret.Bitmap;

// 	private createMileage(){
//         let mileage1 = GameUtil.createBitmapByName("floor_png");
//         mileage1.y = this.stage.stageHeight - mileage1.height+20;
//         this.mileageContainer.addChild(mileage1);
// 		this.mileage1 = mileage1;
//         let mileage2 = GameUtil.createBitmapByName("floor_png");
//         mileage2.y = this.stage.stageHeight - mileage2.height+20;
//         mileage2.x = mileage1.width;
// 		console.log( mileage2.x);
//         this.mileageContainer.addChild(mileage2);
// 		this.mileage2 = mileage2;

// 		GameData.groundHeight = mileage1.y;

// 	}

	public startTicker(){
		egret.ticker.$startTick(this.update,this);
	}
	public stopTicker(){
		egret.ticker.$stopTick(this.update,this);
	}

	private update(timeStap:number):boolean{
		if(!GameData.hasStart){
			return true;
		}
		//里程碑滚动
		// if( this.mileage1.x + this.mileage1.width <=0 ){
		// 	this.mileage1.x = this.mileage2.x + this.mileage2.width;
		// }
		// if( this.mileage2.x + this.mileage2.width <= 0){
		// 	this.mileage2.x = this.mileage1.x + this.mileage1.width;
		// }
		// this.mileage1.x -= GameData.speed;
		// this.mileage2.x -= GameData.speed;

		// GameData.distance += GameData.speed/2;
		
		// 更新球的位置
		GameData.ball.update(timeStap);

		// for( let obj of this.gameObjectList){
		// 	obj.update(timeStap);
		// }
		//添加元素
		// this.addElement();
		this.collision();
		return true;
	}

// 	private addElement(){
// 		let element:ElementData = GameData.elements[0];
// 		//获取到element 并且 里程数大于elements的里程数的时候 就创建障碍物
// 		if( element && GameData.distance >= element.distance + GameData.rounds * GameData.maxMileage){
			
// 			if(element.type == "wall"){
// 				console.log("创建wall");
// 				let barrier = new Barrier(element);
// 				barrier.x = this.stage.stageWidth;
// 				this.barrierContainer.addChild(barrier);
// 				this.gameObjectList.push(barrier);	
// 			}
// 			if(element.type == "egg"){
// 				console.log("创建egg");
// 				let egg = new Egg(element);
// 				egg.x = this.stage.stageWidth;
// 				egg.y = element.y;
// 				this.barrierContainer.addChild(egg);
// 				this.gameObjectList.push(egg);
// 			}
// 			GameData.elements.splice(0,1);
// 			if( GameData.elements.length <= 0){
// 				//注意 此处必须使用 concat 将一个数组赋值给另一个数组 ！！！
// 				GameData.elements = GameData.elements.concat(RES.getRes("config_json").elements);
// 				console.log( RES.getRes("config_json") )
// 				GameData.rounds ++;
// 			}
// 		}
// 	}

	private collision(){
		let ball:Ball = GameData.ball;
        //碰撞检测
        let ball_rect:egret.Rectangle = new egret.Rectangle(ball.x,ball.y,ball.width,ball.height);
		for( let item of this.gameObjectList){
			// 游戏对象列表中包含砖块和木板，拿出来观察是否有撞击到砖块和木板
			// 如果撞击到的是砖块
			if( item instanceof Brick){
				let item_rect:egret.Rectangle = new egret.Rectangle(item.x,item.y,item.width,item.height);
				
				if( item_rect.intersects(ball_rect) && !item.hasTrigger){
					// 撞到板砖以后飞行方向发生变化
					console.log('撞到板砖啦~');
					// 播放音效
					GameUtil.playSound('brick_mp3');
					// 改变球的方向
					GameData.ball.setDirectionY(1);
					// 只能撞击一次，撞击后被删除
					item.hasTrigger = true;
					this.deleteObjectList.push(item);
				}
			}
			// 如果撞击到的是木板
			if( item instanceof Board){
				let board_rect:egret.Rectangle = new egret.Rectangle( item.x,item.y,item.width,item.height);
				if( ball_rect.intersects(board_rect) && !item.hasTrigger){
					item.hasTrigger = true;
					console.log('撞到木板啦~');
					// 播放音效
					GameUtil.playSound('board_1_mp3');
					// 改变球的方向
					GameData.ball.setDirectionY(-1);
					// 防止连续多次触发碰撞
					egret.setTimeout(()=>{
						item.hasTrigger = false;
					},this,500)
				}
			}
			
			// 删除本回合中被消去的砖块
			for( let obj of this.deleteObjectList){
				this.brickContainer.removeChild( <GameObject>obj);
				this.gameObjectList.splice( this.gameObjectList.indexOf(< GameObject>obj),1);
			}
			this.deleteObjectList.length = 0;
		}
	}

}


