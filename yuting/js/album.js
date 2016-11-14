;(function(w){
    var Album = function(stage,callback){
        this.callback = callback;
        this.cm = 0;
        this.status = true;
        this.init(stage);
    }
    Album.prototype = {
        init:function(stage){
            this.stage = new createjs.Stage(stage);
            createjs.Touch.enable(this.stage);
            this.stage.mouseMoveOutside = true; 
            this.ratio = document.documentElement.clientWidth/640;
            this.C_W = this.stage.canvas.width = this.ratio*491;
            this.C_H = this.stage.canvas.height = this.ratio*393;
            //创建相框和说明书画面
            var manifest = [
                {src:"images/pics/xk.jpg" , id:"xk"},
                {src:"images/pics/spec.png" , id:"spec"},
                {src:"images/pics/blur.png" , id:"blur"}
            ];
            this.loader = new createjs.LoadQueue(false);
            this.loader.on("complete", this.handleComplete,this);
            this.loader.loadManifest(manifest);
            this.drawLoading();
        },
        handleComplete:function(){        
            var xk = this.loader.getResult("xk"), spec = this.loader.getResult("spec"), blur = this.loader.getResult("blur");
            this.stage.canvas.style.background = 'url('+xk.src+') no-repeat';
            this.stage.canvas.style.backgroundSize = this.C_W+'px '+this.C_H+'px';
            //添加模糊层
            var shapeBlur = new createjs.Shape();
            shapeBlur.graphics.bf(blur,'no-repeat').dr(0,0,blur.width,blur.height);
            shapeBlur.setTransform(0,0,this.ratio,this.ratio);
            this.stage.addChild(shapeBlur);
	        this.stage.on('pressmove', this.eventMove,this);
            this.stage.update();
        },
        success:function(){
		    this.stage.canvas.getContext('2d').clearRect(0, 0, this.C_W, this.C_H);
            this.stage.off('pressmove',this.eventMove);
            this.callback(this.cm);
        },
        help:function(){
            this.cm = 1;
            this.success();
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
        eventMove:function(e){
	        e.preventDefault();
	        // 计算当前“鼠标”或“手指”在canvas中的坐标（注意，计算的坐标是canvas里的坐标）。
	        var x = e.stageX, y = e.stageY;
            var fg = new createjs.Shape();
            fg.compositeOperation = 'destination-out';
            fg.graphics.beginFill('#aaa').a(x,y,20,0,Math.PI*2);
            this.stage.addChild(fg);
            this.stage.update();
	        this.stage.on('pressup', this.eventUp,this);
        },
        createHitArea:function(){
            this.button = new createjs.Shape();
            this.button.graphics.f('rgba(255,255,255,.5)').dr(0,0,100,100);
            this.button.w = 100*this.ratio;
            this.button.h = 100*this.ratio;
            this.button.setTransform(360*this.ratio,260*this.ratio,this.ratio,this.ratio);
            this.stage.addChild(this.button);
            this.stage.removeAllEventListeners('pressmove');
	        this.button.on('mousedown', this.eventDown,this);
            this.stage.update();
        },
        eventDown:function(e){
            this.success();
        },
        eventUp:function(e){
            //if(this.status){
	            var data = this.stage.canvas.getContext('2d').getImageData(0, 0, this.C_W, this.C_H).data;
	            // 通过计算每一个像素，得知还有多少“遮挡区域”。
	            for (var i = 0, j = 0; i < data.length; i += 4) {
		            if (data[i] && data[i + 1] && data[i + 2] && data[i + 3]){
			            j++;
		            }
	            }
	            // 当还只剩下20%的遮挡区域时弹出中奖信息，同时撤掉遮挡区域。
	            if (j <= this.C_W * this.C_H * 0.3) {
                    this.stage.removeAllEventListeners('pressmove');
                    this.stage.removeAllEventListeners('pressup');
					//this.createHitArea();
		            this.stage.canvas.getContext('2d').clearRect(0, 0, this.C_W, this.C_H);
                    this.success();
                    //console.log('clear');
                    //this.status = false;
                    //this.stage.update();
                    //this.createHitArea();
	            }
            //}
        }
    }
    w.createAlbum = function(stage,callback){return new Album(stage,callback);}
})(window)

