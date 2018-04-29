// 砖块的类型和位置
interface ElementData{
    "type": string , 
    "x": number, 
    "y": number
}
class Brick extends GameObject{
	private brickData:ElementData;

	// public constructor(objData:ElementData) {
	// 	super();
	// 	this.hasTrigger = false;
	// 	this.brickData = objData;
	// 	this.init();
	// }

	public constructor(width, height) {
		super();
		this.hasTrigger = false;
		this.init(width, height);
	}

	// private init(){
	// 	let brick:egret.Bitmap = GameUtil.createBitmapByName("brick_png");
	// 	brick.width = 150;
	// 	brick.height = 60;
	// 	this.addChild(brick);
	// }

	private init(width, height){
		let brick:egret.Bitmap = GameUtil.createBitmapByName("brick_png");
		brick.width = width;
		brick.height = height;
		this.addChild(brick);
	}

	update(timeStamp:number){
		// 每次刷新状态是判断是否被球撞击到
		this.x -= GameData.speed;
	}
}