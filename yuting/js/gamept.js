var stage , C_W , C_H ,P_W,P_H,loader,ratio = document.documentElement.clientWidth/640,flag = 0;
init();
function init(){
    stage = new createjs.Stage("ptGame");
	C_W = stage.canvas.width = 480*ratio+20*ratio;
	C_H = stage.canvas.height = 429*ratio+20*ratio+250*ratio;
    P_W = 480*ratio;
    P_H = 429*ratio;
    createjs.Touch.enable(stage);
    stage.mouseMoveOutside = true; 
    ratio = document.documentElement.clientWidth/640;
    var stroke1 = new createjs.Shape();
    var stroke2 = new createjs.Shape();
    stroke1.graphics.f('#784f31').rr(0,0,P_W+20*ratio,P_H+20*ratio,10*ratio);
    stroke2.graphics.f('#d9d0cb').rr(6*ratio,6*ratio,P_W+8*ratio,P_H+8*ratio,10*ratio);
    stage.addChild(stroke1,stroke2);
    stage.update();
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
    loader = new createjs.LoadQueue(false);
    loader.on("complete", handleComplete);
    loader.loadManifest(manifest);
    drawLoading();
}
function handleComplete(){        
    for(var i = 0;i<3;i++){
        for(var j = 0;j<4;j++){
            var pt = new createjs.Shape();
            pt.graphics.bf(loader.getResult("yh"+i+j),'no-repeat').dr(0,0,120,143);
            pt.setTransform(10*ratio+P_W*j/4,10*ratio+P_H*i/3,ratio,ratio);
            if(i == 0&&j == 1){
                pt.setTransform(20*ratio+P_W/8,120*ratio+P_H,ratio,ratio);
                var pt1 = new createjs.Shape();
                pt1.graphics.f('#32272f').dr(0,0,120,143);
                pt1.name = 'ht0';
                pt1.setTransform(10*ratio+P_W*j/4,10*ratio+P_H*i/3,ratio,ratio);
                pt.on('pressmove',eventMove);
            }
            if(i == 0&&j == 3){
                pt.setTransform(0,60*ratio+P_H,ratio,ratio);
                var pt1 = new createjs.Shape();
                pt1.graphics.f('#32272f').dr(0,0,120,143);
                pt1.name = 'ht1';
                pt1.setTransform(10*ratio+P_W*j/4,10*ratio+P_H*i/3,ratio,ratio);
                pt.on('pressmove',eventMove);
            }
            if(i == 1&&j == 0){
                pt.setTransform(3*P_W/4-40*ratio,60*ratio+P_H,ratio,ratio);
                var pt1 = new createjs.Shape();
                pt1.graphics.f('#32272f').dr(0,0,120,143);
                pt1.name = 'ht2';
                pt1.setTransform(10*ratio+P_W*j/4,10*ratio+P_H*i/3,ratio,ratio);
                pt.on('pressmove',eventMove);
            }
            if(i == 2&&j == 0){
                pt.setTransform(40*ratio+P_W*1/4,60*ratio+P_H,ratio,ratio);
                var pt1 = new createjs.Shape();
                pt1.graphics.f('#32272f').dr(0,0,120,143);
                pt1.name = 'ht3';
                pt1.setTransform(10*ratio+P_W*j/4,10*ratio+P_H*i/3,ratio,ratio);
                pt.on('pressmove',eventMove);
            }
            if(i == 2&&j == 2){
                pt.setTransform(P_W*1/2,120*ratio+P_H,ratio,ratio);
                var pt1 = new createjs.Shape();
                pt1.graphics.f('#32272f').dr(0,0,120,143);
                pt1.setTransform(10*ratio+P_W*j/4,10*ratio+P_H*i/3,ratio,ratio);
                pt1.name = 'ht4';
                pt.on('pressmove',eventMove);
            }
            if(i == 2&&j == 3){
                pt.setTransform(20*ratio+P_W*3/4,100*ratio+P_H,ratio,ratio);
                var pt1 = new createjs.Shape();
                pt1.graphics.f('#32272f').dr(0,0,120,143);
                pt1.setTransform(10*ratio+P_W*j/4,10*ratio+P_H*i/3,ratio,ratio);
                pt1.name = 'ht5';
                pt.on('pressmove',eventMove);
            }
            pt.name = 'pt'+i+j;
            stage.addChild(pt,pt1);
        }
    }
    stage.update();
}
function eventMove(e){
    e.target.x = e.stageX-P_W/8;
    e.target.y = e.stageY-P_H/6;
    stage.setChildIndex(e.target,stage.getNumChildren()-1);
    stage.update();
    for(var i = 0;i<6;i++){
        var ht = stage.getChildByName("ht"+i);
        if(i==0){
            if(Math.abs(e.target.x-ht.x)<10&&Math.abs(e.target.y-ht.y)<10&&e.target.name=='pt01'){
                e.target.setTransform(10*ratio+P_W/4,10*ratio,ratio,ratio);
                e.target.removeAllEventListeners();
                flag++;
                break;
            }
        }
        if(i==1){
            if(Math.abs(e.target.x-ht.x)<10&&Math.abs(e.target.y-ht.y)<10&&e.target.name=='pt03'){
                e.target.setTransform(10*ratio+P_W*3/4,10*ratio,ratio,ratio);
                e.target.removeAllEventListeners();
                flag++;
                break;
            }
        }
        if(i==2){
            if(Math.abs(e.target.x-ht.x)<10&&Math.abs(e.target.y-ht.y)<10&&e.target.name=='pt10'){
                e.target.setTransform(10*ratio,10*ratio+P_H/3,ratio,ratio);
                e.target.removeAllEventListeners();
                flag++;
                break;
            }
        }
        if(i==3){
            if(Math.abs(e.target.x-ht.x)<10&&Math.abs(e.target.y-ht.y)<10&&e.target.name=='pt20'){
                e.target.setTransform(10*ratio,10*ratio+P_H*2/3,ratio,ratio);
                e.target.removeAllEventListeners();
                flag++;
                break;
            }
        }
        if(i==4){
            if(Math.abs(e.target.x-ht.x)<10&&Math.abs(e.target.y-ht.y)<10&&e.target.name=='pt22'){
                e.target.setTransform(10*ratio+P_W/2,10*ratio+P_H*2/3,ratio,ratio);
                e.target.removeAllEventListeners();
                flag++;
                break;
            }
        }
        if(i==5){
            if(Math.abs(e.target.x-ht.x)<10&&Math.abs(e.target.y-ht.y)<10&&e.target.name=='pt23'){
                e.target.setTransform(10*ratio+P_W*3/4,10*ratio+P_H*2/3,ratio,ratio);
                e.target.removeAllEventListeners();
                flag++;
                break;
            }
        }
    }
	stage.update();
    if(flag == 6){
        alert('恭喜你！获得了药盒!');
    }
}
function finish5(){
	var mygraph = new createjs.Graphics().ss(2,'round').s('#00f').dc(0,0,50*ratio);
    for(var i=0;i<3;i++){
	    containerHb01.getChildByName('stroke'+i+'a').set({graphics:mygraph});
	    containerHb02.getChildByName('stroke'+i+'b').set({graphics:mygraph});
    }
	stage.update();
	flag = 3;
    alert('恭喜你！获得了药盒!')
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
