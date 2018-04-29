class Board extends GameObject{

	public constructor() {
		super();
		this.hasTrigger = false;
		this.init();
	}

	private init(){
		let board:egret.Bitmap = GameUtil.createBitmapByName("board_png");
        // GameSecen 144行
        board.width = 120;
        board.height = 30;
		this.addChild(board);
	}

    // 点击移动木板
    public move(x, y) {
        if (x < this.width / 2) {
            this.x = 0;
        } else if (x + this.width / 2 >= this.stage.stageWidth) {
            this.x = this.stage.stageWidth - this.width;
        } else {
            this.x = x - this.width / 2;
        }
    }

	update(timeStamp:number){
		// 每次刷新状态是判断是否被球撞击到
		this.x -= GameData.speed;
	}
}