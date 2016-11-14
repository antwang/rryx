var stage , C_W , C_H , loader, bg_w,bg_h,hole1,hole2,hole3,hole4,ct1,ct2,ct3,ct4,flag=0;
var ratio = document.documentElement.clientWidth/640;
stage = new createjs.Stage("discGame");
C_W = stage.canvas.width = document.documentElement.clientWidth;
bg_h = C_H = stage.canvas.height = 350*ratio;
bg_w = 572*ratio;
createjs.Touch.enable(stage);
stage.mouseMoveOutside = true; 
init();
function init(){
        var manifest = [
            {src:"images/pics/chaban.png" , id:"bg"},
            {src:"images/pics/ct1.png" , id:"ct1"},
            {src:"images/pics/ct2.png" , id:"ct2"},
            {src:"images/pics/ct3.png" , id:"ct3"},
            {src:"images/pics/ct4.png" , id:"ct4"}
        ];
        loader = new createjs.LoadQueue(false);
        loader.on("complete", handleComplete);
        loader.loadManifest(manifest);
        drawLoading();
}

function drawLoading(){
            var ctx = stage.canvas.getContext("2d");
            stage.canvas.style.backgroundColor = 'transparent';
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#000";
            ctx.fillRect(0,0,C_W,C_H);
            ctx.fillStyle = "#FFF";
            ctx.font = "25px 微软雅黑";
            ctx.fillText("Loading...",C_W/2,C_H/2)
}

function handleComplete(){        //当图片素材load完后执行该方法
        var bgImg = loader.getResult("bg"),
            ctImg1 = loader.getResult("ct1"),
            ctImg2 = loader.getResult("ct2"),
            ctImg3 = loader.getResult("ct3"),
            ctImg4 = loader.getResult("ct4"),
            shapeBg = new createjs.Bitmap(bgImg);
        //添加背景
        shapeBg.scaleX = ratio;
        shapeBg.scaleY = ratio;
        shapeBg.x = C_W/2-bg_w/2;
        shapeBg.y = C_H/2-bg_h/2;
        stage.addChild(shapeBg);
        //插孔及指示灯
        var sx = 160*ratio+shapeBg.x; 
        var sy = 200*ratio; 
        var sy1 = 20*ratio; 
        var sp = 26*ratio;
        hole1 = createHole(sx,sy,'#f00'),
        hole2 = createHole(sx+hole1.w+sp,sy,'#009833'),
        hole3 = createHole(sx+hole1.w*2+sp*2,sy,'#009afe'),
        hole4 = createHole(sx+hole1.w*3+sp*3,sy,'#ff00ff');
        //插头
        ct1 = createChatou(sx,sy1,ctImg1,'ct1'),
        ct2 = createChatou(sx+hole1.w+sp,sy1,ctImg2,'ct2'),
        ct3 = createChatou(sx+hole1.w*2+sp*2,sy1,ctImg3,'ct3'),
        ct4 = createChatou(sx+hole1.w*3+sp*3,sy1,ctImg4,'ct4');
        ct1.sprite.on('pressmove',hitTest);
        ct2.sprite.on('pressmove',hitTest);
        ct3.sprite.on('pressmove',hitTest);
        ct4.sprite.on('pressmove',hitTest);
        stage.update();
}
function help(){
        ct1.insert();
        hole1.success();
        ct1.sprite.y = hole1.y-ct1.h+hole1.h;
        ct1.sprite.x = hole1.x;
        ct1.sprite.removeAllEventListeners();

        ct2.insert();
        hole2.success();
        ct2.sprite.y = hole2.y-ct2.h+hole2.h;
        ct2.sprite.x = hole2.x;
        ct2.sprite.removeAllEventListeners();

        ct3.insert();
        hole3.success();
        ct3.sprite.y = hole3.y-ct3.h+hole3.h;
        ct3.sprite.x = hole3.x;
        ct3.sprite.removeAllEventListeners();

        ct4.insert();
        hole4.success();
        ct4.sprite.y = hole4.y-ct4.h+hole4.h;
        ct4.sprite.x = hole4.x;
        ct4.sprite.removeAllEventListeners();
        stage.update();
        flag=4;
        alert('电源通啦！可以播放TVB了！')
}
function hitTest(event){
	var t = event.target;
	t.x = event.stageX-t.w/2;
	t.y = event.stageY-t.h/2;
    for(var i = 0;i<4;i++){
        if(t.x>=this.arrHole[i].x&&t.x<=this.arrHole[i].x+hole1.w&&t.y+ct1.h>=hole1.y+hole1.h/2&&t.y+ct1.h<=hole1.y+hole1.h){
            if(t.name =='ct1'){
                ct1.insert();
                t.y = hole1.y-ct1.h+hole1.h;
                t.x = hole1.x;
                hole1.success();
                t.removeAllEventListeners();
                flag++;
                if(flag>=4){
                    alert('电源通啦！可以播放TVB了！')
                }
            }
        }
    }



            if(t.x>=this.hole1.x&&t.x<=this.hole1.x+this.hole1.w&&t.y+this.ct1.h>=this.hole1.y+this.hole1.h/2&&t.y+this.ct1.h<=this.hole1.y+this.hole1.h){
                if(t.name =='ct1'){
                    this.ct1.insert();
                    t.y = this.hole1.y-this.ct1.h+this.hole1.h;
                    t.x = this.hole1.x;
                    this.hole1.success();
                    t.removeAllEventListeners();
                    flag++;
                    if(flag>=4){
                        this.success();
                    }
                }
            }
            if(t.x>=this.hole2.x&&t.x<=this.hole2.x+this.hole2.w&&t.y+this.ct1.h>=this.hole2.y+this.hole2.h/2&&t.y+this.ct1.h<=this.hole2.y+this.hole2.h){
                if(t.name =='ct2'){
                    this.ct2.insert();
                    t.y = this.hole1.y-this.ct1.h+this.hole1.h;
                    t.x = this.hole2.x;
                    this.hole2.success();
                    t.removeAllEventListeners();
                    flag++;
                    if(flag>=4){
                        alert('电源通啦！可以播放TVB了！')
                    }
                }
            }
            if(t.x>=this.hole3.x&&t.x<=this.hole3.x+this.hole3.w&&t.y+this.ct1.h>=this.hole3.y+this.hole3.h/2&&t.y+this.ct1.h<=this.hole3.y+this.hole3.h){
                if(t.name =='ct3'){
                    t.y = this.hole1.y-this.ct1.h+this.hole1.h;
                    t.x = this.hole3.x;
                    this.hole3.success();
                    this.ct3.insert();
                    t.removeAllEventListeners();
                    flag++;
                    if(flag>=4){
                        alert('电源通啦！可以播放TVB了！')
                    }
                }
            }
            if(t.x>=this.hole4.x&&t.x<=this.hole4.x+this.hole4.w&&t.y+this.ct1.h>=this.hole4.y+this.hole4.h/2&&t.y+this.ct1.h<=this.hole4.y+this.hole4.h){
                if(t.name =='ct4'){
                    t.y = this.hole1.y-this.ct1.h+this.hole1.h;
                    t.x = this.hole4.x;
                    this.hole4.success();
                    this.ct4.insert();
                    t.removeAllEventListeners();
                    flag++;
                    if(flag>=4){
                        alert('电源通啦！可以播放TVB了！')
                    }
                }
            }




    if(t.x>=hole1.x&&t.x<=hole1.x+hole1.w&&t.y+ct1.h>=hole1.y+hole1.h/2&&t.y+ct1.h<=hole1.y+hole1.h){
        if(t.name =='ct1'){
            ct1.insert();
            t.y = hole1.y-ct1.h+hole1.h;
            t.x = hole1.x;
            hole1.success();
            t.removeAllEventListeners();
            flag++;
            if(flag>=4){
                alert('电源通啦！可以播放TVB了！')
            }
        }
    }
    if(t.x>=hole2.x&&t.x<=hole2.x+hole2.w&&t.y+ct1.h>=hole2.y+hole2.h/2&&t.y+ct1.h<=hole2.y+hole2.h){
        if(t.name =='ct2'){
            ct2.insert();
            t.y = hole1.y-ct1.h+hole1.h;
            t.x = hole2.x;
            hole2.success();
            t.removeAllEventListeners();
            flag++;
            if(flag>=4){
                alert('电源通啦！可以播放TVB了！')
            }
        }
    }
    if(t.x>=hole3.x&&t.x<=hole3.x+hole3.w&&t.y+ct1.h>=hole3.y+hole3.h/2&&t.y+ct1.h<=hole3.y+hole3.h){
        if(t.name =='ct3'){
            t.y = hole1.y-ct1.h+hole1.h;
            t.x = hole3.x;
            hole3.success();
            ct3.insert();
            t.removeAllEventListeners();
            flag++;
            if(flag>=4){
                alert('电源通啦！可以播放TVB了！')
            }
        }
    }
    if(t.x>=hole4.x&&t.x<=hole4.x+hole4.w&&t.y+ct1.h>=hole4.y+hole4.h/2&&t.y+ct1.h<=hole4.y+hole4.h){
        if(t.name =='ct4'){
            t.y = hole1.y-ct1.h+hole1.h;
            t.x = hole4.x;
            hole4.success();
            ct4.insert();
            t.removeAllEventListeners();
            flag++;
            if(flag>=4){
                alert('电源通啦！可以播放TVB了！')
            }
        }
    }
    stage.update();
}
(function(w){
    var WIDTH = 51, HEIGHT = 116;
    var Chatou = function(x,y,img,name){
        this.x = x;
        this.y = y;
        this.w = WIDTH*ratio;
        this.h = HEIGHT*ratio;
        this.name = name;
        this.state = "out";
        this.init(img);
    }
    Chatou.prototype = {
        constructors:Chatou,
        init:function(img){
            var sps = new createjs.SpriteSheet({　　//实例化精灵表绘制器
                "images":[img],
                "frames":{"regX":0,"height":HEIGHT,"count":2,"regY":0,"width":WIDTH},
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
            this.sprite = new createjs.Sprite(sps,this.state);　　
            this.sprite.name = this.name;
            this.sprite.w = this.w;
            this.sprite.h = this.h;
            this.sprite.setTransform(this.x, this.y,ratio,ratio);　　
            stage.addChild(this.sprite);　
        },
        insert:function(){
            this.sprite.gotoAndStop("in")
            stage.update();
        }
    }
    w.createChatou = function(x,y,img,name){
        return new Chatou(x,y,img,name);
    };
})(window);

(function(w){
    var WIDTH = 54*ratio,
        HEIGHT = 44*ratio,
        LW = 10*ratio,
        LH = 10*ratio;
    var Hole = function(x,y,color){
        this.x = x;
        this.y = y;
        this.w = WIDTH; 
        this.h = HEIGHT; 
        this.lw = LW; 
        this.lh = LH; 
        this.color = color;
        this.w = WIDTH;
        this.h = HEIGHT;
        this.state = "off";
        this.init();
    }
    Hole.prototype = {
        constructors:Hole,
        init:function(){
            this.container = new createjs.Container();　
            this.hole = new createjs.Shape();　
            this.hole.graphics.beginFill('rgba(0,0,0,.8)').drawRect(0, 0, this.w, this.h);
            this.hole.setTransform(this.x, this.y);　
            this.container.addChild(this.hole);
            stage.addChild(this.container);　
            stage.update();
        },
        success:function(){
            var light = new createjs.Shape();　
            light.graphics.beginFill(this.color).drawRect(0, 0,this.lw,this.lh);
            light.shadow = new createjs.Shadow(this.color,0,0,5);
            light.x = this.x+this.w/2-this.lw/2;
            light.y = this.y+this.h+2;
            this.container.addChild(light);
            stage.update();
        }
    }
    w.createHole = function(x,y,color){
        return new Hole(x,y,color);
    };
})(window)

