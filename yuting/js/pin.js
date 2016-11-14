;(function(w){
    var Pin = function(stage,callback){
        this.callback = callback;
        this.cm = 0;
        this.flag=0;
        this.arrHb = [];
        this.init(stage);
    }
    Pin.prototype = {
        init:function(stage){
            this.stage = new createjs.Stage(stage);
            createjs.Touch.enable(this.stage);
            this.stage.mouseMoveOutside = true; 
            this.ratio = document.documentElement.clientWidth/640;
            this.C_W = this.stage.canvas.width = this.ratio*500;
            this.C_H = this.stage.canvas.height = this.ratio*700;
            this.P_W = 480*this.ratio;
            this.P_H = 429*this.ratio;
            var stroke1 = new createjs.Shape();
            var stroke2 = new createjs.Shape();
            stroke1.graphics.f('#784f31').rr(0,0,this.P_W+20*this.ratio,this.P_H+20*this.ratio,10*this.ratio);
            stroke2.graphics.f('#d9d0cb').rr(6*this.ratio,6*this.ratio,this.P_W+8*this.ratio,this.P_H+8*this.ratio,10*this.ratio);
            this.stage.addChild(stroke1,stroke2);
            this.stage.update();

            //创建相框和说明书画面
            var manifest = [
                {src:"images/pics/yh.png" , id:"yh"},
                {src:"images/pics/yh01.png" , id:"yh00"},
                {src:"images/pics/yh02.png" , id:"yh01"},
                {src:"images/pics/yh03.png" , id:"yh02"},
                {src:"images/pics/yh04.png" , id:"yh03"},
                {src:"images/pics/yh05.png" , id:"yh10"},
                {src:"images/pics/yh06.png" , id:"yh11"},
                {src:"images/pics/yh07.png" , id:"yh12"},
                {src:"images/pics/yh08.png" , id:"yh13"},
                {src:"images/pics/yh09.png" , id:"yh20"},
                {src:"images/pics/yh10.png" , id:"yh21"},
                {src:"images/pics/yh11.png" , id:"yh22"},
                {src:"images/pics/yh12.png" , id:"yh23"}
            ];
            this.loader = new createjs.LoadQueue(false);
            this.loader.on("complete", this.handleComplete,this);
            this.loader.loadManifest(manifest);
            this.drawLoading();
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
        help:function(){
            var p1 = this.stage.getChildByName('pt01')
            var p2 = this.stage.getChildByName('pt03')
            var p3 = this.stage.getChildByName('pt10')
            var p4 = this.stage.getChildByName('pt20')
            var p5 = this.stage.getChildByName('pt22')
            var p6 = this.stage.getChildByName('pt23')
            var arr = [p1,p2,p3,p4,p5,p6];
            this.stage.getChildByName('pt01').setTransform(10*this.ratio+this.P_W/4,10*this.ratio,this.ratio,this.ratio);
            this.stage.getChildByName('pt03').setTransform(10*this.ratio+this.P_W*3/4,10*this.ratio,this.ratio,this.ratio);
            this.stage.getChildByName('pt10').setTransform(10*this.ratio,10*this.ratio+this.P_H/3,this.ratio,this.ratio);
            this.stage.getChildByName('pt20').setTransform(10*this.ratio,10*this.ratio+this.P_H*2/3,this.ratio,this.ratio);
            this.stage.getChildByName('pt22').setTransform(10*this.ratio+this.P_W/2,10*this.ratio+this.P_H*2/3,this.ratio,this.ratio);
            this.stage.getChildByName('pt23').setTransform(10*this.ratio+this.P_W*3/4,10*this.ratio+this.P_H*2/3,this.ratio,this.ratio);
            for(var i = 0;i<6;i++){
                arr[i].removeAllEventListeners();
                this.stage.setChildIndex(arr[i],this.stage.getNumChildren()-1);
            }
            this.stage.update();
	        this.flag = 6;
            this.cm = 1;
            this.success();
        },
        success:function(){
            this.callback(this.cm);
        },
        handleComplete:function(){        
            for(var i = 0;i<3;i++){
                for(var j = 0;j<4;j++){
                    var pt = new createjs.Shape();
                    pt.graphics.bf(this.loader.getResult("yh"+i+j),'no-repeat').dr(0,0,120,143);
                    pt.setTransform(10*this.ratio+this.P_W*j/4,10*this.ratio+this.P_H*i/3,this.ratio,this.ratio);
                    if(i == 0&&j == 1){
                        pt.setTransform(20*this.ratio+this.P_W/8,120*this.ratio+this.P_H,this.ratio,this.ratio);
                        var pt1 = new createjs.Shape();
                        pt1.graphics.f('#32272f').dr(0,0,120,143);
                        pt1.name = 'ht0';
                        pt1.setTransform(10*this.ratio+this.P_W*j/4,10*this.ratio+this.P_H*i/3,this.ratio,this.ratio);
                        pt.on('pressmove',this.eventMove,this);
                    }
                    if(i == 0&&j == 3){
                        pt.setTransform(0,60*this.ratio+this.P_H,this.ratio,this.ratio);
                        var pt1 = new createjs.Shape();
                        pt1.graphics.f('#32272f').dr(0,0,120,143);
                        pt1.name = 'ht1';
                        pt1.setTransform(10*this.ratio+this.P_W*j/4,10*this.ratio+this.P_H*i/3,this.ratio,this.ratio);
                        pt.on('pressmove',this.eventMove,this);
                    }
                    if(i == 1&&j == 0){
                        pt.setTransform(3*this.P_W/4-40*this.ratio,60*this.ratio+this.P_H,this.ratio,this.ratio);
                        var pt1 = new createjs.Shape();
                        pt1.graphics.f('#32272f').dr(0,0,120,143);
                        pt1.name = 'ht2';
                        pt1.setTransform(10*this.ratio+this.P_W*j/4,10*this.ratio+this.P_H*i/3,this.ratio,this.ratio);
                        pt.on('pressmove',this.eventMove,this);
                    }
                    if(i == 2&&j == 0){
                        pt.setTransform(40*this.ratio+this.P_W*1/4,60*this.ratio+this.P_H,this.ratio,this.ratio);
                        var pt1 = new createjs.Shape();
                        pt1.graphics.f('#32272f').dr(0,0,120,143);
                        pt1.name = 'ht3';
                        pt1.setTransform(10*this.ratio+this.P_W*j/4,10*this.ratio+this.P_H*i/3,this.ratio,this.ratio);
                        pt.on('pressmove',this.eventMove,this);
                    }
                    if(i == 2&&j == 2){
                        pt.setTransform(this.P_W*1/2,120*this.ratio+this.P_H,this.ratio,this.ratio);
                        var pt1 = new createjs.Shape();
                        pt1.graphics.f('#32272f').dr(0,0,120,143);
                        pt1.setTransform(10*this.ratio+this.P_W*j/4,10*this.ratio+this.P_H*i/3,this.ratio,this.ratio);
                        pt1.name = 'ht4';
                        pt.on('pressmove',this.eventMove,this);
                    }
                    if(i == 2&&j == 3){
                        pt.setTransform(20*this.ratio+this.P_W*3/4,100*this.ratio+this.P_H,this.ratio,this.ratio);
                        var pt1 = new createjs.Shape();
                        pt1.graphics.f('#32272f').dr(0,0,120,143);
                        pt1.setTransform(10*this.ratio+this.P_W*j/4,10*this.ratio+this.P_H*i/3,this.ratio,this.ratio);
                        pt1.name = 'ht5';
                        pt.on('pressmove',this.eventMove,this);
                    }
                    pt.name = 'pt'+i+j;
                    this.stage.addChild(pt,pt1);
                }
            }
            this.stage.update();
        },
        eventMove:function(e){
            e.target.x = e.stageX-this.P_W/8;
            e.target.y = e.stageY-this.P_H/6;
            this.stage.setChildIndex(e.target,this.stage.getNumChildren()-1);
            this.stage.update();
            for(var i = 0;i<6;i++){
                var ht = this.stage.getChildByName("ht"+i);
                if(i==0){
                    if(Math.abs(e.target.x-ht.x)<10&&Math.abs(e.target.y-ht.y)<10&&e.target.name=='pt01'){
                        e.target.setTransform(10*this.ratio+this.P_W/4,10*this.ratio,this.ratio,this.ratio);
                        e.target.removeAllEventListeners();
                        this.flag++;
                        break;
                    }
                }
                if(i==1){
                    if(Math.abs(e.target.x-ht.x)<10&&Math.abs(e.target.y-ht.y)<10&&e.target.name=='pt03'){
                        e.target.setTransform(10*this.ratio+this.P_W*3/4,10*this.ratio,this.ratio,this.ratio);
                        e.target.removeAllEventListeners();
                        this.flag++;
                        break;
                    }
                }
                if(i==2){
                    if(Math.abs(e.target.x-ht.x)<10&&Math.abs(e.target.y-ht.y)<10&&e.target.name=='pt10'){
                        e.target.setTransform(10*this.ratio,10*this.ratio+this.P_H/3,this.ratio,this.ratio);
                        e.target.removeAllEventListeners();
                        this.flag++;
                        break;
                    }
                }
                if(i==3){
                    if(Math.abs(e.target.x-ht.x)<10&&Math.abs(e.target.y-ht.y)<10&&e.target.name=='pt20'){
                        e.target.setTransform(10*this.ratio,10*this.ratio+this.P_H*2/3,this.ratio,this.ratio);
                        e.target.removeAllEventListeners();
                        this.flag++;
                        break;
                    }
                }
                if(i==4){
                    if(Math.abs(e.target.x-ht.x)<10&&Math.abs(e.target.y-ht.y)<10&&e.target.name=='pt22'){
                        e.target.setTransform(10*this.ratio+this.P_W/2,10*this.ratio+this.P_H*2/3,this.ratio,this.ratio);
                        e.target.removeAllEventListeners();
                        this.flag++;
                        break;
                    }
                }
                if(i==5){
                    if(Math.abs(e.target.x-ht.x)<10&&Math.abs(e.target.y-ht.y)<10&&e.target.name=='pt23'){
                        e.target.setTransform(10*this.ratio+this.P_W*3/4,10*this.ratio+this.P_H*2/3,this.ratio,this.ratio);
                        e.target.removeAllEventListeners();
                        this.flag++;
                        break;
                    }
                }
            }
	        this.stage.update();
            if(this.flag == 6){
                this.success();
            }
        }
    }
    w.createPin = function(stage,callback){return new Pin(stage,callback);}
})(window)
