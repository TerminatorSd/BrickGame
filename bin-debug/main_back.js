// //////////////////////////////////////////////////////////////////////////////////////
// //
// //  Copyright (c) 2014-present, Egret Technology.
// //  All rights reserved.
// //  Redistribution and use in source and binary forms, with or without
// //  modification, are permitted provided that the following conditions are met:
// //
// //     * Redistributions of source code must retain the above copyright
// //       notice, this list of conditions and the following disclaimer.
// //     * Redistributions in binary form must reproduce the above copyright
// //       notice, this list of conditions and the following disclaimer in the
// //       documentation and/or other materials provided with the distribution.
// //     * Neither the name of the Egret nor the
// //       names of its contributors may be used to endorse or promote products
// //       derived from this software without specific prior written permission.
// //
// //  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
// //  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
// //  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
// //  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
// //  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// //  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
// //  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
// //  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
// //  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
// //  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
// //
// //////////////////////////////////////////////////////////////////////////////////////
// class Main extends eui.UILayer {
//     protected createChildren(): void {
//         super.createChildren();
//         egret.lifecycle.addLifecycleListener((context) => {
//             // custom lifecycle plugin
//         })
//         egret.lifecycle.onPause = () => {
//             egret.ticker.pause();
//         }
//         egret.lifecycle.onResume = () => {
//             egret.ticker.resume();
//         }
//         //inject the custom material parser
//         //注入自定义的素材解析器
//         let assetAdapter = new AssetAdapter();
//         egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
//         egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
//         this.runGame().catch(e => {
//             console.log(e);
//         })
//     }
//     private async runGame() {
//         await this.loadResource()
//         this.createGameScene();
//         const result = await RES.getResAsync("description_json")
//         this.startAnimation(result);
//         await platform.login();
//         const userInfo = await platform.getUserInfo();
//         console.log(userInfo);
//     }
//     private async loadResource() {
//         try {
//             const loadingView = new LoadingUI();
//             this.stage.addChild(loadingView);
//             await RES.loadConfig("resource/default.res.json", "resource/");
//             await this.loadTheme();
//             await RES.loadGroup("preload", 0, loadingView);
//             this.stage.removeChild(loadingView);
//         }
//         catch (e) {
//             console.error(e);
//         }
//     }
//     private loadTheme() {
//         return new Promise((resolve, reject) => {
//             // load skin theme configuration file, you can manually modify the file. And replace the default skin.
//             //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
//             let theme = new eui.Theme("resource/default.thm.json", this.stage);
//             theme.addEventListener(eui.UIEvent.COMPLETE, () => {
//                 resolve();
//             }, this);
//         })
//     }
//     // shaodong add code
//     private touchHandler(evt:egret.TouchEvent): void {
//         var tx:egret.TextField = evt.currentTarget;
//         tx.textColor = 0x00ff00;
//     }
//     // webSocket
//     private onSocketOpen():void {    
//         var cmd = "Hello Egret WebSocket";    
//         console.log("The connection is successful, send data: " + cmd);    
//         this.webSocket.writeUTF(cmd); 
//     }
//     private onReceiveMessage(e:egret.Event):void {    
//         var msg = this.webSocket.readUTF();    
//         console.log("Receive data:" + msg); 
//     }
//     // 点击次数计数
//     private times:number;
//     // webSocket
//     private webSocket:egret.WebSocket;
//     private textfield: egret.TextField;
//     /**
//      * 创建场景界面
//      * Create scene interface
//      */
//     protected createGameScene(): void {
//         // 创建一个容器，放入游戏开始界面
//         // let container:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
//         // this.addChild(container);
//         // SceneController.instance.setStage( container );
//         // SceneController.initGame();
//         // // 绘制 background
//         let bg:egret.Bitmap = GameUtil.createBitmapByName("bg_jpg");
// 		this.addChild(bg);
// 		bg.width = this.stage.stageWidth;
// 		bg.height = this.stage.stageHeight;
//         // var bg:egret.Shape = new egret.Shape();
//         // bg.graphics.beginFill(0x336699);
//         // bg.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
//         // bg.graphics.endFill();
//         // super.addChild(bg);
//         // 添加舞台点击相应事件
//         // this.times = -1;
//         // var self = this;
//         // this.stage.addEventListener( egret.TouchEvent.TOUCH_TAP, function(){ 
//         //     // console.log('click stage');
//         //     // switch ( ++ self.times % 3 ) { 
//         //     //     case 0: 
//         //     //         // 属性设置、动画时间、补间方程
//         //     //         egret.Tween.get( batman ).to( { x:superman.x }, 300, egret.Ease.circIn );
//         //     //         egret.Tween.get( superman ).to( { x:batman.x }, 300, egret.Ease.circIn );
//         //     //         break; 
//         //     //     case 1: 
//         //     //         // music
//         //     //         var sound:egret.Sound = RES.getRes( "music_mp3" ); 
//         //     //         var channel:egret.SoundChannel = sound.play(0,1);
//         //     //         egret.Tween.get( captain ).to( { alpha:.3 }, 300, egret.Ease.circIn ).to( { alpha:1 }, 300, egret.Ease.circIn );
//         //     //         break; 
//         //     //     case 2: 
//         //     //         egret.Tween.get( hulk ).to( { scaleX:.4, scaleY:.4 }, 500, egret.Ease.circIn ).to( { scaleX:1, scaleY:1 }, 500, egret.Ease.circIn );
//         //     //         break; 
//         //     // } 
//         // }, this ); 
//         // egret 对象图片及监听事件
//         // var startBtn:egret.Bitmap = this.createBitmapByName('start_png');
//         // var aboutBtn:egret.Bitmap = this.createBitmapByName('about_png');
//         // aboutBtn.x = 50;
//         // aboutBtn.y = 20;
//         // startBtn.x = 250;
//         // startBtn.y = 20;
//         // this.addChild(startBtn);
//         // this.addChild(aboutBtn);
//         // // 点击监听
//         // startBtn.touchEnabled = true;
//         // startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, startGame, this);
//         // url request
//         // var urlreq:egret.URLRequest = new egret.URLRequest( "http://httpbin.org/user-agent" );
//         // var urlloader:egret.URLLoader = new egret.URLLoader(); 
//         // urlloader.addEventListener( egret.Event.COMPLETE, function( evt:egret.Event ):void{
//         //     console.log(evt.target.data);
//         // }, this );
//         // urlloader.load( urlreq );
//         // webSocket
//         // this.webSocket = new egret.WebSocket();
//         // this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
//         // this.webSocket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
//         // this.webSocket.connect("echo.websocket.org", 80);
//         let sky = GameUtil.createBitmapByName("bg_jpg");
//         this.addChild(sky);
//         let stageW = this.stage.stageWidth;
//         let stageH = this.stage.stageHeight;
//         sky.width = stageW;
//         sky.height = stageH;
//         let topMask = new egret.Shape();
//         topMask.graphics.beginFill(0x000000, 0.5);
//         topMask.graphics.drawRect(0, 0, stageW, 172);
//         topMask.graphics.endFill();
//         topMask.y = 33;
//         this.addChild(topMask);
//         let icon: egret.Bitmap = GameUtil.createBitmapByName("egret_icon_png");
//         this.addChild(icon);
//         icon.x = 26;
//         icon.y = 33;
//         let line = new egret.Shape();
//         line.graphics.lineStyle(2, 0xffffff);
//         line.graphics.moveTo(0, 0);
//         line.graphics.lineTo(0, 117);
//         line.graphics.endFill();
//         line.x = 172;
//         line.y = 61;
//         this.addChild(line);
//         let colorLabel = new egret.TextField();
//         colorLabel.textColor = 0xffffff;
//         colorLabel.width = stageW - 172;
//         colorLabel.textAlign = "center";
//         colorLabel.text = "Hello Egret";
//         colorLabel.size = 24;
//         colorLabel.x = 172;
//         colorLabel.y = 80;
//         this.addChild(colorLabel);
//         let textfield = new egret.TextField();
//         this.addChild(textfield);
//         textfield.alpha = 0;
//         textfield.width = stageW - 172;
//         textfield.textAlign = egret.HorizontalAlign.CENTER;
//         textfield.size = 24;
//         textfield.textColor = 0xffffff;
//         textfield.x = 172;
//         textfield.y = 135;
//         this.textfield = textfield;
//         let button = new eui.Button();
//         button.label = "Click!";
//         button.horizontalCenter = 0;
//         button.verticalCenter = 0;
//         this.addChild(button);
//         button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
//     }
//     /**
//      * 描述文件加载成功，开始播放动画
//      * Description file loading is successful, start to play the animation
//      */
//     private startAnimation(result: Array<any>): void {
//         let parser = new egret.HtmlTextParser();
//         let textflowArr = result.map(text => parser.parse(text));
//         let textfield = this.textfield;
//         let count = -1;
//         let change = () => {
//             count++;
//             if (count >= textflowArr.length) {
//                 count = 0;
//             }
//             let textFlow = textflowArr[count];
//             // 切换描述内容
//             // Switch to described content
//             textfield.textFlow = textFlow;
//             let tw = egret.Tween.get(textfield);
//             tw.to({ "alpha": 1 }, 200);
//             tw.wait(2000);
//             tw.to({ "alpha": 0 }, 200);
//             tw.call(change, this);
//         };
//         change();
//     }
//     /**
//      * 点击按钮
//      * Click the button
//      */
//     private onButtonClick(e: egret.TouchEvent) {
//         console.log('on button click');
//         let panel = new eui.Panel();
//         panel.title = "Title";
//         panel.horizontalCenter = 0;
//         panel.verticalCenter = 0;
//         this.addChild(panel);
//     }
//     // private startGame(e: egret.TouchEvent) {
//     //     let stage:egret.DisplayObjectContainer = this.instance._stage;
// 	// 	//移除原来的开始场景
// 	// 	if(this.instance.startScene.parent){
// 	// 		stage.removeChild( this.instance.startScene );
// 	// 		this.instance.startScene = new StartScene();
// 	// 	}
// 	// 	if(this.instance.gameScene.parent){
// 	// 		stage.removeChild( this.instance.gameScene );
// 	// 		this.instance.gameScene = new GameScene();
// 	// 	}
// 	// 	if(this.instance.overScene.parent){
// 	// 		stage.removeChild( this.instance.overScene );
// 	// 		this.instance.overScene = new OverScene();
// 	// 	}
//     // }
// }
//# sourceMappingURL=main_back.js.map