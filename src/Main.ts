//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {

    // 必须要有的，不用改，直接抄
    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        this.runGame().catch(e => {
            console.log(e);
        })
    }

    // 开启游戏，必须写，直接抄
    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);
    }

    // 必须要写的，加载资源，直接抄
    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    // 加载主题，可有可无，可以抄
    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);
        })
    }

    // webSocket
    private onSocketOpen():void {    
        var cmd = "Hello Egret WebSocket";    
        console.log("The connection is successful, send data: " + cmd);    
        this.webSocket.writeUTF(cmd); 
    }
    private onReceiveMessage(e:egret.Event):void {    
        var msg = this.webSocket.readUTF();    
        console.log("Receive data:" + msg); 
    }

    // 点击次数计数
    private times:number;
    // webSocket
    private webSocket:egret.WebSocket;
    private textfield: egret.TextField;

    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {

        // 创建一个容器，放入游戏开始界面
        let container:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        this.addChild(container);
        SceneController.instance.setStage( container );
        SceneController.initGame();
        
        // 绘制 background
        // let bg:egret.Bitmap = GameUtil.createBitmapByName("bg_jpg");
        // this.addChild(bg);
        // bg.width = this.stage.stageWidth;
        // bg.height = this.stage.stageHeight;

        // // egret 对象图片及监听事件
        // var startBtn:egret.Bitmap = GameUtil.createBitmapByName('start_png');
        // var aboutBtn:egret.Bitmap = GameUtil.createBitmapByName('about_png');
        // aboutBtn.x = 50;
        // aboutBtn.y = 20;
        // startBtn.x = 250;
        // startBtn.y = 20;
        // this.addChild(startBtn);
        // this.addChild(aboutBtn);

        // // 点击监听
        // startBtn.touchEnabled = true;
        // startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this);

        // let textfield = new egret.TextField();
        // this.textfield = textfield;
    }
   
    // 点击开始游戏按钮
    private startGame(e: egret.TouchEvent) {
        console.log('start game');
        // let stage:egret.DisplayObjectContainer = this.instance._stage;

        //移除原来的开始场景
        // if(this.instance.startScene.parent){
        // stage.removeChild( this.instance.startScene );
        // this.instance.startScene = new StartScene();
        // }
        // if(this.instance.gameScene.parent){
        // stage.removeChild( this.instance.gameScene );
        // this.instance.gameScene = new GameScene();
        // }
        // if(this.instance.overScene.parent){
        // stage.removeChild( this.instance.overScene );
        // this.instance.overScene = new OverScene();
        // }
    }
}
