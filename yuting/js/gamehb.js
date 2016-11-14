var stage , C_W , C_H ,HB_W,HB_H,loader,ratio = document.documentElement.clientWidth/640,flag = 0;
init();
function init(){
    stage = new createjs.Stage("hbGame");
    createjs.Touch.enable(stage);
    stage.mouseMoveOutside = true; 
    ratio = document.documentElement.clientWidth/640;
    //创建相框和说明书画面
    var manifest = [
        {src:"images/bgs/hbbg.png" , id:"hbbg"},
        {src:"images/pics/hb01.png" , id:"hb01"},
        {src:"images/pics/hb02.png" , id:"hb02"}
    ];
    loader = new createjs.LoadQueue(false);
    loader.on("complete", handleComplete);
    loader.loadManifest(manifest);
    drawLoading();
}
function handleComplete(){        //当图片素材load完后执行该方法
    var hbbg = loader.getResult("hbbg"),
        hb01 = loader.getResult("hb01"),
        hb02 = loader.getResult("hb02");
		C_W = stage.canvas.width = hbbg.width*ratio;
		C_H = stage.canvas.height = hbbg.height*ratio;
        stage.canvas.style.background = 'url('+hbbg.src+') no-repeat';
        stage.canvas.style.backgroundSize = C_W+'px '+C_H+'px';
        //添加模糊层
        containerHb01 = new createjs.Container();
		containerHb02 = new createjs.Container();
		
		shapeHb01 = new createjs.Shape();
		shapeHb02 = new createjs.Shape();
        shapeHb01.graphics.bf(hb01,'no-repeat').dr(0,0,hb01.width,hb01.height);
        shapeHb01.setTransform((C_W-hb01.width*ratio)/2,4,ratio,ratio);
		shapeHb02.graphics.bf(hb02,'no-repeat').dr(0,0,hb02.width,hb02.height);
        shapeHb02.setTransform((C_W-hb01.width*ratio)/2,10+hb01.height*ratio,ratio,ratio);
		//创建3处可点击区域；
		containerHb01.addChild(shapeHb01);
		containerHb02.addChild(shapeHb02);
		createHit();
        stage.addChild(containerHb01,containerHb02);
        stage.update();
}
function createHit(){
		//创建3处可点击区域；
		for(var i = 0;i<3;i++){
			var shapeBt1a = new createjs.Shape(),
				shapeBt1b = new createjs.Shape(),
				strokeBt1a = new createjs.Shape(),
				strokeBt1b = new createjs.Shape();
        		shapeBt1a.graphics.f('#f00').dc(0,0,50*ratio);
        		shapeBt1b.graphics.f('#f00').dc(0,0,50*ratio);
				strokeBt1a.graphics.ss(2,'round').s('transparent').dc(0,0,50*ratio);
				strokeBt1b.graphics.ss(2,'round').s('transparent').dc(0,0,50*ratio);
				shapeBt1a.name = 'shape'+i+'a';
				shapeBt1b.name = 'shape'+i+'b';
				strokeBt1a.name = 'stroke'+i+'a';
				strokeBt1b.name = 'stroke'+i+'b';
			if(i==0){
        		shapeBt1a.setTransform(224*ratio,80*ratio,ratio,ratio);
        		shapeBt1b.setTransform(224*ratio,430*ratio,ratio,ratio);
        		strokeBt1a.setTransform(224*ratio,80*ratio,ratio,ratio);
        		strokeBt1b.setTransform(224*ratio,430*ratio,ratio,ratio);
			}
			if(i==1){
        		shapeBt1a.setTransform(240*ratio,140*ratio,ratio,ratio);
        		shapeBt1b.setTransform(240*ratio,490*ratio,ratio,ratio);
        		strokeBt1a.setTransform(240*ratio,140*ratio,ratio,ratio);
        		strokeBt1b.setTransform(240*ratio,490*ratio,ratio,ratio);
			}
			if(i==2){
        		shapeBt1a.setTransform(196*ratio,270*ratio,ratio,ratio);
        		shapeBt1b.setTransform(196*ratio,620*ratio,ratio,ratio);
        		strokeBt1a.setTransform(196*ratio,270*ratio,ratio,ratio);
        		strokeBt1b.setTransform(196*ratio,620*ratio,ratio,ratio);
			}
			containerHb01.addChild(shapeBt1a,strokeBt1a);
			containerHb02.addChild(shapeBt1b,strokeBt1b);
			shapeBt1a.on('click',onclick);
			shapeBt1b.on('click',onclick);
		}		
}
function onclick(e){
	if(e.target.name=='shape0a'||e.target.name=='shape0b'){
		var mygraph = new createjs.Graphics().ss(2,'round').s('#00f').dc(0,0,50*ratio);
		containerHb01.getChildByName('stroke0a').set({graphics:mygraph});
		containerHb02.getChildByName('stroke0b').set({graphics:mygraph});
		containerHb01.getChildByName('shape0a').removeAllEventListeners();
		containerHb02.getChildByName('shape0b').removeAllEventListeners();
		flag++;
	}
	if(e.target.name=='shape1a'||e.target.name=='shape1b'){
		var mygraph = new createjs.Graphics().ss(2,'round').s('#00f').dc(0,0,50*ratio);
		containerHb01.getChildByName('stroke1a').set({graphics:mygraph});
		containerHb02.getChildByName('stroke1b').set({graphics:mygraph});
		containerHb01.getChildByName('shape1a').removeAllEventListeners();
		containerHb02.getChildByName('shape1b').removeAllEventListeners();
		flag++;
	}
	if(e.target.name=='shape2a'||e.target.name=='shape2b'){
		var mygraph = new createjs.Graphics().ss(2,'round').s('#00f').dc(0,0,50*ratio);
		containerHb01.getChildByName('stroke2a').set({graphics:mygraph});
		containerHb02.getChildByName('stroke2b').set({graphics:mygraph});
		containerHb01.getChildByName('shape2a').removeAllEventListeners();
		containerHb02.getChildByName('shape2b').removeAllEventListeners();
		flag++;
	}
	stage.update();
    if(flag == 3){
        alert('恭喜你！获得了海报!');
    }
}
function finish4(){
	var mygraph = new createjs.Graphics().ss(2,'round').s('#00f').dc(0,0,50*ratio);
    for(var i=0;i<3;i++){
	    containerHb01.getChildByName('stroke'+i+'a').set({graphics:mygraph});
	    containerHb02.getChildByName('stroke'+i+'b').set({graphics:mygraph});
    }
	stage.update();
	flag = 3;
    alert('恭喜你！获得了海报!')
}
function drawLoading(){
    var ctx = stage.canvas.getContext("2d");
    stage.canvas.style.backgroundColor = 'transparent';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#000";
    ctx.fillRect(0,0,C_W,C_H);
    ctx.fillStyle = "#FFF";
    ctx.font = "24px 微软雅黑";
    ctx.fillText("Loading...",C_W/2,C_H/2)
}
