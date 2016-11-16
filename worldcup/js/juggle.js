var stage,canvas,
    ratio = window.innerWidth/640,
    x,y,z,last_x,last_y,last_z,lastUpdate = 0;
    x = y = z = last_x = last_y = last_z = 0;
var SHAKE_THRESHOLD = 800;     
var Juggle = function(){
    this.manifest = [
        {src:'images/ball1.png',id:'ball'},
        {src:'images/bg2.jpg',id:'bg2'}
    ]
    this.C_W = 640;
    this.C_H = 786;
    this.TIME1 = 6;//倒计时
    this.TIME2 = 30;//时
    this.score = 0;
    this.status = true;
    this.loader = new createjs.LoadQueue(false);
    this.init();
}
Juggle.prototype = {
    constructor:Juggle,
    init:function(){
        this.canvas = document.getElementById('juggle');
        this.canvas.width = ratio*640;
        this.canvas.height = ratio*786;
        this.stage = new createjs.Stage(this.canvas);
        this.loader.on("complete",this.drawGamePage,this);
        this.loader.loadManifest(this.manifest);
        this.loading();

        createjs.Ticker.setFPS(25);
	    createjs.Ticker.on("tick",this.stage);
    },
    //加载等待
    loading:function(){
        this.loadingText = new createjs.Text();
        this.loadingText.text = "Loading...";
        this.loadingText.textAlign = "center";
        this.loadingText.textBaseline = "middle";
        this.loadingText.color = "#fff";
        this.loadingText.font = "36px 微软雅黑";
        var bounds = this.loadingText.getBounds();
        this.loadingText.setBounds(0,0,this.C_W,this.C_H);
        this.loadingText.setTransform(this.C_W/2,this.C_H/2,1,1,0,0,0,this.C_W/2,this.C_H/2);
        this.loadingText.scaleX = this.loadingText.scaleY = ratio;
        this.stage.addChild(this.loadingText);
        this.stage.update();
    },
    //初始化游戏画面
    drawGamePage:function(){
        this.component = new createjs.Container();
        var image_bg = this.loader.getResult('bg2'),
            image_ball = this.loader.getResult('ball');
        this.bg = new createjs.Shape();
        this.ball = new createjs.Shape();
        this.bg.graphics.bf(image_bg,'no-repeat').drawRect(0,0,640,786);
        this.ball.graphics.bf(image_ball,'no-repeat').drawRect(1,0,193,193);
        this.ball.setTransform(217,407);
        this.component.addChild(this.bg,this.ball);

        this.drawCountDown();
        this.component.scaleX = this.component.scaleY = ratio;
        this.stage.addChild(this.component);

    },
    //初始化倒计时元素
    drawCountDown:function(){
        var that = this;
        this.circleClock = new createjs.Container();

        //颠球游戏操作提示
        var txt = new createjs.Text("摇动手机看谁颠的多","36px 微软雅黑","#000");
        txt.name='operationtips';
        txt.textAlign = "center";
        txt.textBaseline = "middle";
        txt.setTransform(0,-180);

        //5秒倒计时数字
        var txt_time = new createjs.Text("5","150px Arial","#000");
        txt_time.name='txtCount';
        txt_time.textAlign = "center";
        txt_time.textBaseline = "middle";
        txt_time.setTransform(0,0);

        var c1 = new createjs.Shape();
        c1.graphics.ss(5,'round').s('#000').drawCircle(0,0,145,145);
        
        var c2 = new createjs.Shape();
        c2.graphics.ss(5,'round').s('#000').drawCircle(0,0,130,130).ss(1).moveTo(-130,0).lineTo(130,0).moveTo(0,-130).lineTo(0,130);

        var c3 = new createjs.Shape();
        c3.name='rotateCircle';
        c3.setTransform(0,0);

        this.circleClock.addChild(c1,c2,c3,txt,txt_time);

        var point = this.component.globalToLocal(this.C_W/2,315);
        this.circleClock.setTransform(point.x,point.y);
        this.component.addChild(this.circleClock);

        //游戏时间倒计时
        this.gameTime = new createjs.Text('00:00:00',"64px Arial","#000");
        this.gameTime.textAlign = "center";
        this.gameTime.textBaseline = "middle";
        this.gameTime.setTransform(this.C_W/2,60);
        this.gameTime.alpha = 0;
        this.component.addChild(this.gameTime);

        //游戏得分
        this.gameScore = new createjs.Text('SCORE:0',"28px Arial","#000");
        this.gameScore.textAlign = "left";
        this.gameScore.textBaseline = "middle";
        //this.gameScore.outline = 2;
        this.gameScore.setTransform(15,30);
        this.gameScore.alpha = 0;
        this.component.addChild(this.gameScore);
        this.stage.update();

        this.timeCount_1 = new Date();
	    this.listener1 = createjs.Ticker.on("tick",that.onTick,that);
    },
    onTick:function(){
        var that = this;
        var timeCount_2 = new Date().getTime();
        var t = that.TIME1*1000+this.timeCount_1.getTime()-timeCount_2;
        //倒计时结束
        if(t<=1000){
            this.circleClock.visible = false;
            this.timeCount_1 = new Date();
            this.gameTime.alpha = 1;
            this.gameScore.alpha = 1;
                //this.ball.on('mousedown',this.down,this);
			//window.removeEventListener('devicemotion',function(eventData){ //that.deviceMotionHandler.call(that,event) },false);  
			window.addEventListener('devicemotion',function(eventData){

		var acceleration = eventData.accelerationIncludingGravity;   
		var curTime = new Date().getTime();
		if ((curTime - lastUpdate)> 100) {  
			var diffTime = curTime -lastUpdate;    
			lastUpdate = curTime;        
			x = acceleration.x; 
			y = acceleration.y;   
			z = acceleration.z;   
			var speed = Math.abs(x +y + z - last_x - last_y - last_z) / diffTime * 10000;
			if (speed >SHAKE_THRESHOLD&&that.status) {
                that.status = false;
                createjs.Tween.get(that.ball).to({y:200},400,createjs.Ease.linear).to({y:407},400,createjs.Ease.linear).call(function(){
                    that.status = true;
                    that.score++;
                    that.gameScore.text = 'SCORE:'+that.score;
                });
			}    
			last_x = x;    
			last_y = y;    
			last_z = z;    
		}
            },false);  
	        createjs.Ticker.off("tick",this.listener1);
	        createjs.Ticker.on("tick",that.onTick1,that);
        }
        that.drawCircleClock1(t);
        that.stage.update();
    },
    share:function(){
        Zepto.post('/user/isLogin',{_rtk: __RRXN.get_check_x},function(data){
            if(data==1){
                Zepto.post('/share/post',{_rtk: __RRXN.get_check_x,sid:1243},function(data){
                    closePop(Zepto('#pop1')[0]);
                    showPop(Zepto('#pop2')[0]);
                },'json')
            }else{
                window.location = "http://mt.renren.com/login?redirect="+document.URL;
            }
        },'json')
    },
    showRes:function(per){
        var that = this;
        Zepto('#goal').text(this.score);
        Zepto('#score').text(this.score);
        Zepto('#percent').text(per);
        showPop(Zepto('#pop1')[0]);
        Zepto('.btn-share').on('click',function(){
            that.share();
        })
    },
    save:function(){
        var that = this;
        Zepto.post('/user/game',{actionType:2,assets:that.score,_rtk: __RRXN.get_check_x},function(res){
            that.showRes(res);
        })
    },
    onTick1:function(){
        var that = this;
        var timeCount_2 = new Date().getTime();
        var t = that.TIME2*1000+this.timeCount_1.getTime()-timeCount_2;
        //倒计时结束
        if(t<=100){
            that.save();
            window.onDeviceMotion = null;
            that.ball.setTransform(217,407);
	        createjs.Ticker.removeAllEventListeners("tick");
        }
        that.drawCircleClock2(t);
        that.stage.update();
    },
    drawCircleClock1:function(t){
        var ms = t%1000;
        var s = Math.floor(t/1000);
        var angel = Math.PI*2-Math.PI*2*ms/1000-Math.PI/2;
        if(ms<=10&&s<=0){
            s = 0;
            ms = 0;
            angel = Math.PI*2;
        }
        this.circleClock.getChildByName('txtCount').text= s;
        this.circleClock.getChildByName('rotateCircle').graphics.clear();
        this.circleClock.getChildByName('rotateCircle').graphics.f('rgba(0,0,0,0.5)').moveTo(0,0).lineTo(0,-130).arc(0,0,130,-Math.PI/2,angel).closePath();
    },
    drawCircleClock2:function(t){
        var h = '00';
        var m = Math.floor(t/(1000*60));
        var s = Math.floor((t%(1000*60))/1000);
        m>9?(m = m):(m = '0'+m);
        s>9?(s=s):(s = '0'+s);
        var timetext = h+':'+m+':'+s; 
        this.gameTime.text = timetext;
    }
        
}
//创建overlay
function showOverlay(){
    overlay = document.createElement('div');
    overlay.className="overlay";
    overlay.id="overlay";
    document.body.appendChild(overlay);
}
//移除overlay
function removeOverlay(){
    document.body.removeChild(overlay);
    overlay=null;
}
function showPop(ele){
    ele.style.webkitTransform='scale(1)';
    ele.style.opacity='1';
}
function closePop(ele){
    ele.style.webkitTransform='scale(0)';
    ele.style.opacity='0';
}
new Juggle();


