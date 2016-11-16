var stage,canvas,loader,ratio = window.innerWidth/640,distX = 0,distY = 0,oldX = 0,oldY = 0,distX1 = 0, distY1 = 0, oldX1 = 0, oldY1 = 0;
    this.init();
    function init(){
        var manifest = [{src:'images/texts/sl0.png',id:'sl0'}];
        var C_W = 616;
        var C_H = 543;
        loader = new createjs.LoadQueue(false);
        canvas = document.getElementById('demo');
        canvas.width = ratio*616;
        canvas.height = ratio*543;
        stage = new createjs.Stage(canvas);
        createjs.Touch.enable(stage);
        loader.on("complete",drawGamePage);
        loader.loadManifest(manifest);
        createjs.Ticker.setFPS(25);
	    createjs.Ticker.on("tick",stage);
    }
    function drawGamePage(){
        var image_sl0 = loader.getResult('sl0');
        var bitmap_sl0 = new createjs.Bitmap(image_sl0); 
        bitmap_sl0.scaleX = bitmap_sl0.scaleY = ratio;
        //bitmap_sl0.skewX = 90;
        bitmap_sl0.skewY = 80;
        stage.addChild(bitmap_sl0);
        stage.update();
    }

