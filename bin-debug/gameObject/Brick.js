var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Brick = (function (_super) {
    __extends(Brick, _super);
    // public constructor(objData:ElementData) {
    // 	super();
    // 	this.hasTrigger = false;
    // 	this.brickData = objData;
    // 	this.init();
    // }
    function Brick(width, height) {
        var _this = _super.call(this) || this;
        _this.hasTrigger = false;
        _this.init(width, height);
        return _this;
    }
    // private init(){
    // 	let brick:egret.Bitmap = GameUtil.createBitmapByName("brick_png");
    // 	brick.width = 150;
    // 	brick.height = 60;
    // 	this.addChild(brick);
    // }
    Brick.prototype.init = function (width, height) {
        var brick = GameUtil.createBitmapByName("brick_png");
        brick.width = width;
        brick.height = height;
        this.addChild(brick);
    };
    Brick.prototype.update = function (timeStamp) {
        // 每次刷新状态是判断是否被球撞击到
        this.x -= GameData.speed;
    };
    return Brick;
}(GameObject));
__reflect(Brick.prototype, "Brick");
//# sourceMappingURL=Brick.js.map