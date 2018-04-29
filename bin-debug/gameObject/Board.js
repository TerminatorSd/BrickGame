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
var Board = (function (_super) {
    __extends(Board, _super);
    function Board() {
        var _this = _super.call(this) || this;
        _this.hasTrigger = false;
        _this.init();
        return _this;
    }
    Board.prototype.init = function () {
        var board = GameUtil.createBitmapByName("board_png");
        // GameSecen 144行
        board.width = 120;
        board.height = 30;
        this.addChild(board);
    };
    // 点击移动木板
    Board.prototype.move = function (x, y) {
        if (x < this.width / 2) {
            this.x = 0;
        }
        else if (x + this.width / 2 >= this.stage.stageWidth) {
            this.x = this.stage.stageWidth - this.width;
        }
        else {
            this.x = x - this.width / 2;
        }
    };
    Board.prototype.update = function (timeStamp) {
        // 每次刷新状态是判断是否被球撞击到
        this.x -= GameData.speed;
    };
    return Board;
}(GameObject));
__reflect(Board.prototype, "Board");
//# sourceMappingURL=Board.js.map