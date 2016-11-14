;(function(w){
    var Hai = function(stage,callback){
        this.callback = callback;
        this.cm = 0;
        this.flag=0;
        this.init(stage);
    }
    Hai.prototype = {
        init:function(stage){
            this.stage = new createjs.Stage(stage);
            createjs.Touch.enable(this.stage);
            this.stage.mouseMoveOutside = true; 
            this.ratio = document.documentElement.clientWidth/640;
            //创建相框和说明书画面
            var manifest = [
                {src:"images/bgs/hbbg.png" , id:"hbbg"},
                {src:"images/pics/hb01.png" , id:"hb01"},
                {src:"images/pics/hb02.png" , id:"hb02"}
            ];
            this.loader = new createjs.LoadQueue(false);
            this.loader.on("complete", this.handleComplete,this);
            this.loader.loadManifest(manifest);
            this.drawLoading();
        },
        help:function(){
	        var mygraph = new createjs.Graphics().ss(2,'round').s('#f00').dc(0,0,50*this.ratio);
            for(var i=0;i<3;i++){
	            this.containerHb01.getChildByName('stroke'+i+'a').set({graphics:mygraph});
	            this.containerHb02.getChildByName('stroke'+i+'b').set({graphics:mygraph});
            }
	        this.stage.update();
	        this.flag = 3;
            this.cm = 1;
            this.success();
        },
        success:function(){
            this.callback(this.cm);
        },
        handleComplete:function(){        
            var hbbg = this.loader.getResult("hbbg"),
                hb01 = this.loader.getResult("hb01"),
                hb02 = this.loader.getResult("hb02");
		        this.C_W = this.stage.canvas.width = hbbg.width*this.ratio;
	            this.C_H = this.stage.canvas.height = hbbg.height*this.ratio;
                this.stage.canvas.style.background = 'url('+hbbg.src+') no-repeat';
                this.stage.canvas.style.backgroundSize = this.C_W+'px '+this.C_H+'px';
                //添加模糊层
                this.containerHb01 = new createjs.Container();
		        this.containerHb02 = new createjs.Container();
		
		        var shapeHb01 = new createjs.Shape();
		        var shapeHb02 = new createjs.Shape();
                shapeHb01.graphics.bf(hb01,'no-repeat').dr(0,0,hb01.width,hb01.height);
                shapeHb01.setTransform((this.C_W-hb01.width*this.ratio)/2,4,this.ratio,this.ratio);
		        shapeHb02.graphics.bf(hb02,'no-repeat').dr(0,0,hb02.width,hb02.height);
                shapeHb02.setTransform((this.C_W-hb01.width*this.ratio)/2,10+hb01.height*this.ratio,this.ratio,this.ratio);
		        this.containerHb01.addChild(shapeHb01);
		        this.containerHb02.addChild(shapeHb02);
		        this.createHit();
                this.stage.addChild(this.containerHb01,this.containerHb02);
                this.stage.update();
        },
        createHit:function(){
		    //创建3处可点击区域；
		    for(var i = 0;i<3;i++){
			    var shapeBt1a = new createjs.Shape(),
				    shapeBt1b = new createjs.Shape(),
				    strokeBt1a = new createjs.Shape(),
				    strokeBt1b = new createjs.Shape();

        		    shapeBt1a.graphics.f('rgba(0,0,0,0.01)').dc(0,0,50*this.ratio);
        		    shapeBt1b.graphics.f('rgba(0,0,0,0.01)').dc(0,0,50*this.ratio);
				    strokeBt1a.graphics.ss(2,'round').s('transparent').dc(0,0,50*this.ratio);
				    strokeBt1b.graphics.ss(2,'round').s('transparent').dc(0,0,50*this.ratio);

				    shapeBt1a.name = 'shape'+i+'a';
				    shapeBt1b.name = 'shape'+i+'b';
				    strokeBt1a.name = 'stroke'+i+'a';
				    strokeBt1b.name = 'stroke'+i+'b';
			    if(i==0){
        		    shapeBt1a.setTransform(230*this.ratio,80*this.ratio,this.ratio,this.ratio);
        		    shapeBt1b.setTransform(230*this.ratio,440*this.ratio,this.ratio,this.ratio);
        		    strokeBt1a.setTransform(230*this.ratio,80*this.ratio,this.ratio,this.ratio);
        		    strokeBt1b.setTransform(230*this.ratio,440*this.ratio,this.ratio,this.ratio);
			    }
			    if(i==1){
        		    shapeBt1a.setTransform(245*this.ratio,148*this.ratio,this.ratio,this.ratio);
        		    shapeBt1b.setTransform(245*this.ratio,498*this.ratio,this.ratio,this.ratio);
        		    strokeBt1a.setTransform(245*this.ratio,148*this.ratio,this.ratio,this.ratio);
        		    strokeBt1b.setTransform(245*this.ratio,498*this.ratio,this.ratio,this.ratio);
			    }
			    if(i==2){
        		    shapeBt1a.setTransform(210*this.ratio,280*this.ratio,this.ratio,this.ratio);
        		    shapeBt1b.setTransform(210*this.ratio,635*this.ratio,this.ratio,this.ratio);
        		    strokeBt1a.setTransform(210*this.ratio,280*this.ratio,this.ratio,this.ratio);
        		    strokeBt1b.setTransform(210*this.ratio,635*this.ratio,this.ratio,this.ratio);
			    }
			    this.containerHb01.addChild(shapeBt1a,strokeBt1a);
			    this.containerHb02.addChild(shapeBt1b,strokeBt1b);
			    shapeBt1a.on('mousedown',this.onclick,this);
			    shapeBt1b.on('mousedown',this.onclick,this);
		    }
        },
        onclick:function(e){
	        if(e.target.name=='shape0a'||e.target.name=='shape0b'){
		        var mygraph = new createjs.Graphics().ss(2,'round').s('#f00').dc(0,0,50*this.ratio);
		        this.containerHb01.getChildByName('stroke0a').set({graphics:mygraph});
		        this.containerHb02.getChildByName('stroke0b').set({graphics:mygraph});
		        this.containerHb01.getChildByName('shape0a').removeAllEventListeners();
		        this.containerHb02.getChildByName('shape0b').removeAllEventListeners();
		        this.flag++;
	        }
	        if(e.target.name=='shape1a'||e.target.name=='shape1b'){
		        var mygraph = new createjs.Graphics().ss(2,'round').s('#f00').dc(0,0,50*this.ratio);
		        this.containerHb01.getChildByName('stroke1a').set({graphics:mygraph});
		        this.containerHb02.getChildByName('stroke1b').set({graphics:mygraph});
		        this.containerHb01.getChildByName('shape1a').removeAllEventListeners();
		        this.containerHb02.getChildByName('shape1b').removeAllEventListeners();
		        this.flag++;
	        }
	        if(e.target.name=='shape2a'||e.target.name=='shape2b'){
		        var mygraph = new createjs.Graphics().ss(2,'round').s('#f00').dc(0,0,50*this.ratio);
		        this.containerHb01.getChildByName('stroke2a').set({graphics:mygraph});
		        this.containerHb02.getChildByName('stroke2b').set({graphics:mygraph});
		        this.containerHb01.getChildByName('shape2a').removeAllEventListeners();
		        this.containerHb02.getChildByName('shape2b').removeAllEventListeners();
		        this.flag++;
	        }
	        this.stage.update();
            if(this.flag == 3){
                this.success();
            }
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
        }
    }
    w.createHai = function(stage,callback){return new Hai(stage,callback);}
})(window)
