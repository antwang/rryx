var stage , C_W , C_H , loader,ratio = document.documentElement.clientWidth/640;
init();
function init(){
    stage = new createjs.Stage("drawGame");
    createjs.Touch.enable(stage);
    stage.mouseMoveOutside = true; 
    ratio = document.documentElement.clientWidth/640;
    C_W = stage.canvas.width = ratio*491;
    C_H = stage.canvas.height = ratio*393;
    //创建相框和说明书画面
    var manifest = [
        {src:"images/pics/xk.jpg" , id:"xk"},
        {src:"images/pics/spec.png" , id:"spec"},
        {src:"images/pics/blur.png" , id:"blur"}
    ];
    loader = new createjs.LoadQueue(false);
    loader.on("complete", handleComplete);
    loader.loadManifest(manifest);
    drawLoading();
}
function handleComplete(){        //当图片素材load完后执行该方法
    var xk = loader.getResult("xk"),
        spec = loader.getResult("spec"),
        blur = loader.getResult("blur");
        stage.canvas.style.background = 'url('+xk.src+') no-repeat';
        stage.canvas.style.backgroundSize = C_W+'px '+C_H+'px';
        //添加模糊层
        shapeBlur = new createjs.Shape();
        shapeBlur.graphics.bf(blur,'no-repeat').dr(0,0,blur.width,blur.height);
        shapeBlur.setTransform(0,0,ratio,ratio);
        stage.addChild(shapeBlur);
	    stage.on('pressmove', eventMove);
        stage.update();
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
// 处理“鼠标”或“手指”按下后移动时的动作。
function eventMove(e){
	e.preventDefault();
	// 计算当前“鼠标”或“手指”在canvas中的坐标（注意，计算的坐标是canvas里的坐标）。
	var x = e.stageX, y = e.stageY;
    var fg = new createjs.Shape();
    fg.compositeOperation = 'destination-out';
    fg.graphics.beginFill('#aaa').a(x,y,20,0,Math.PI*2);
    stage.addChild(fg);
    stage.update();
	stage.on('pressup', eventUp);
}
// “手指”按下后抬起时的动作。
function eventUp(e){
	e.preventDefault();
	var data = stage.canvas.getContext('2d').getImageData(0, 0, C_W, C_H).data;
	// 通过计算每一个像素，得知还有多少“遮挡区域”。
	for (var i = 0, j = 0; i < data.length; i += 4) {
		if (data[i] && data[i + 1] && data[i + 2] && data[i + 3]){
			j++;
		}
	}
	// 当还只剩下20%的遮挡区域时弹出中奖信息，同时撤掉遮挡区域。
	if (j <= C_W * C_H * 0.35) {
		alert('恭喜您中了2元现金');
		stage.canvas.getContext('2d').clearRect(0, 0, C_W, C_H);
        stage.off('pressmove', eventMove);
	}
}

