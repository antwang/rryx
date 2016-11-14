(function(w){
    var ratio = document.documentElement.clientWidth/640,
        stage = new createjs.Stage('discGame'),
        PICWIDTH = 51,
        PICHEIGHT = 116,
        WIDTH = PICWIDTH*ratio,
        HEIGHT = PICHEIGHT*ratio;
    var Chatou = function(x,y,img){
        this.x = x;
        this.y = y;
        this.state = "out";
        this.init(img);
    }
    Chatou.prototype = {
        constructors:Chatou,
        init:function(img){
            var sps = new createjs.SpriteSheet({　　//实例化精灵表绘制器
                "images":[img],
                "frames":{"regX":0,"height":WIDTH,"count":2,"regY":0,"width":HEIGHT},
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
            this.sprite = new createjs.Sprite(sps, this.state);　　//实例化精灵
            this.sprite.setTransform(this.x, this.y);　　//设置精灵的位置
            stage.addChild(this.sprite);　　　　//添加到舞台
        },
        insert:function(){
            this.sprite.gotoAndPlay("run")
        },
        size:function(){
            return {
                w:WIDTH,
                h:HEIGHT
            }
        },
        picsize:function(){
            return {
                w:PICWIDTH,
                h:PICHEIGHT
            }
        }
    }
    w.createChatou = function(x,y,img){
        return new Chatou(x,y,img);
    };
})(window)

