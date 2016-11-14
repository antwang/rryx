;(function(w){
    var Disc = function(stage,callback){
        this.ratio = document.documentElement.clientWidth/640;
        this.cm = 0;
        this.flag = 0;
        this.arrSprite = [];
        this.arrHole = [];
        this.holeW = 54*this.ratio;
        this.holeH = 44*this.ratio;
        this.init(stage);
        this.callback = callback;
    }
    Disc.prototype = {
        init:function(stage){
            this.stage = new createjs.Stage(stage);
            createjs.Touch.enable(this.stage);
            this.stage.mouseMoveOutside = true; 
            this.C_W = this.stage.canvas.width = document.documentElement.clientWidth;
            this.mainBg_h = this.C_H = this.stage.canvas.height = 350*this.ratio;
            this.mainBg_w = 572*this.ratio;
            this.drawLoading();
            this.constructDisc();
        },
        createHole:function(x,y,color){
            var container = new createjs.Container();　
            var hole = new createjs.Shape();　
            hole.graphics.beginFill('rgba(0,0,0,.5)').drawRect(0, 0, 54*this.ratio, 44*this.ratio);
            container.addChild(hole);
            container.color = color;
            container.w = 54*this.ratio;
            container.h = 44*this.ratio;
            container.setTransform(x, y);　
            this.stage.addChild(container);　
            this.arrHole.push(container);
            this.stage.update();
        },
        //插对地方后亮灯
        addLight:function(obj){
            var light = new createjs.Shape();　
            light.graphics.beginFill(obj.color).drawRect(0, 0,10*this.ratio,10*this.ratio);
            light.shadow = new createjs.Shadow(obj.color,0,0,5);
            //light.x = obj.x+this.holeW/2-10*this.ratio/2;
            //light.y = obj.y+this.holeH+2;
            light.x = this.holeW/2-10*this.ratio/2;
            light.y = this.holeH+2;
            console.log(light.x);
            obj.addChild(light);
            this.stage.update();
        },
        createChatou:function(x,y,img,name){
            var sps = new createjs.SpriteSheet({　　//实例化精灵表绘制器
                "images":[img],
                "frames":{"regX":0,"height":116,"count":2,"regY":0,"width":51},
                "animations":{
                    "out":{
                        frames:[0],　　　　//精灵表每一帧的位置
                        next:"out",　　　　　　　　　　　　　　　　　　　　//当精灵表循环完后的下一步动作
                        speed:1,　　　　　　　　　　　　　　　　　　　　　　//精灵表播放速度
                    }, 
                    "in":{
                        frames:[1],　　　　//精灵表每一帧的位置
                        next:"in",　　　　　　　　　　　　　　　　　　　　//当精灵表循环完后的下一步动作
                        speed:1,　　　　　　　　　　　　　　　　　　　　　　//精灵表播放速度
                    } 
                }
            });
            var sprite = new createjs.Sprite(sps,'out');　　
            sprite.name = name;
            sprite.w = 51*this.ratio;
            sprite.h = 116*this.ratio;
            sprite.setTransform(x, y,this.ratio,this.ratio);　　
            this.stage.addChild(sprite);　
            this.arrSprite.push(sprite);
            this.stage.update();
        },
        insert:function(obj){
            obj.gotoAndStop("in");
            this.stage.update();
        },
        drawLoading:function(){
            var ctx = this.stage.canvas.getContext("2d");
            this.stage.canvas.style.backgroundColor = 'transparent';
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#000";
            ctx.fillRect(0,0,this.C_W,this.C_H);
            ctx.fillStyle = "#FFF";
            ctx.font = "24px 微软雅黑";
            ctx.fillText("Loading...",this.C_W/2,this.C_H/2)
        },
        handleComplete:function(){        
            var bgImg = this.loader.getResult("bg"), ctImg1 = this.loader.getResult("ct1"),
            ctImg2 = this.loader.getResult("ct2"), ctImg3 = this.loader.getResult("ct3"), 
            ctImg4 = this.loader.getResult("ct4"), mainBg = new createjs.Bitmap(bgImg);
            //添加背景
            mainBg.scaleX = this.ratio;
            mainBg.scaleY = this.ratio;
            mainBg.x = this.C_W/2-this.mainBg_w/2;
            mainBg.y = this.C_H/2-this.mainBg_h/2;
            this.stage.addChild(mainBg);
            //插孔及指示灯
            var sx = 160*this.ratio+mainBg.x; 
            var sy = 200*this.ratio; 
            var sy1 = 20*this.ratio; 
            var space = 26*this.ratio;
            this.createHole(sx,sy,'#f00');
            this.createHole(sx+this.holeW+space,sy,'#009833');
            this.createHole(sx+this.holeW*2+space*2,sy,'#009afe');
            this.createHole(sx+this.holeW*3+space*3,sy,'#ff00ff');
            //插头
            this.createChatou(sx,sy1,ctImg1,'ct1');
            this.createChatou(sx+this.holeW+space,sy1,ctImg2,'ct2');
            this.createChatou(sx+this.holeW*2+space*2,sy1,ctImg3,'ct3');
            this.createChatou(sx+this.holeW*3+space*3,sy1,ctImg4,'ct4');
            for(var i = 0;i<4;i++){
                this.arrSprite[i].on('pressmove',this.hitTest,this);
            }
            this.stage.update();
        },
        constructDisc:function(){
            var manifest = [
                {src:"images/pics/chaban.png" , id:"bg"},
                {src:"images/pics/ct1.png" , id:"ct1"},
                {src:"images/pics/ct2.png" , id:"ct2"},
                {src:"images/pics/ct3.png" , id:"ct3"},
                {src:"images/pics/ct4.png" , id:"ct4"}
            ];
            this.loader = new createjs.LoadQueue(false);
            this.loader.on("complete", this.handleComplete,this);
            this.loader.loadManifest(manifest);
        },
        success:function(){
            this.callback(this.cm);
        },
        help:function(){
            this.cm = 1;
            var arrct = this.arrSprite;
            var arrhole =this.arrHole;
            for(var i = 0;i<4;i++){
                this.insert(arrct[i]);
                this.addLight(arrhole[i]);
                arrct[i].y = arrhole[i].y-arrct[i].h+arrhole[i].h;
                arrct[i].x = arrhole[i].x;
                arrct[i].removeAllEventListeners();
            }
            this.stage.update();
            this.flag=4;
            this.success();
        },
        hitTest:function(event){
	        var t = event.target;
	        t.x = event.stageX-t.w/2;
	        t.y = event.stageY-t.h/2;
            for(var i = 0;i<4;i++){
                if(Math.abs(t.x-this.arrHole[i].x)<=this.holeW&&t.y+this.arrSprite[i].h>=this.arrHole[i].y+this.holeH/2&&t.y+this.arrSprite[i].h<=this.arrHole[i].y+this.holeH){
                    if(t.name ==('ct'+(i+1))){
                        t.y = this.arrHole[i].y-this.arrSprite[i].h+this.holeH+10;
                        t.x = this.arrHole[i].x;
                        this.insert(this.arrSprite[i]);
                        this.addLight(this.arrHole[i]);
                        t.removeAllEventListeners();
                        this.flag++;
                        if(this.flag>=4){
                            this.success();
                        }
                    }
                }
            }
            this.stage.update();
        }
    }
    w.createDisc = function(stage,callback){return new Disc(stage,callback);};
})(window)

