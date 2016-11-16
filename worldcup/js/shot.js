var stage,canvas,ratio = window.innerWidth/640;
var Shot = function(){
    this.manifest = [
        {src:'images/ball.png',id:'ball'},
        {src:'images/bg1.jpg',id:'bg1'}
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
Shot.prototype = {
    constructor:Shot,
    init:function(){
        this.canvas = document.getElementById('shot');
        this.canvas.width = ratio*640;
        this.canvas.height = ratio*786;
        this.stage = new createjs.Stage(this.canvas);
        this.loader.on("complete",this.drawGamePage,this);
        this.loader.loadManifest(this.manifest);
        this.loading();

        createjs.Ticker.setFPS(25);
	    createjs.Ticker.on("tick",this.stage);
    },
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
    drawGamePage:function(){
        this.component = new createjs.Container();
        var image_bg1 = this.loader.getResult('bg1'),
            image_ball = this.loader.getResult('ball');
        var data = {
            images: ['images/ren.png'],
            frames: {width:324, height:178,count:7,regX:0,regY:0},
            animations: {
                stand:{
                    frames: [3],
                    speed: .1
                },
                left:{
                    frames: [2,1,0],
                    next: "stand",
                    speed: .1
                },
                right:{
                    frames: [4,5,6],
                    next: "stand",
                    speed: .1
                }
            }
        };
        var spriteSheet = new createjs.SpriteSheet(data);
        this.ren = new createjs.Sprite(spriteSheet, "stand");

        this.bg1 = new createjs.Shape();
        this.ball = new createjs.Shape();

        this.bg1.graphics.bf(image_bg1,'no-repeat').drawRect(0,0,640,786);
        this.ball.graphics.bf(image_ball,'no-repeat').drawRect(1,0,122,122);

        this.bg1.setTransform(0,0);
        this.ball.setTransform(this.C_W/2,548+image_ball.height/2,1,1,0,0,0,image_ball.width/2,image_ball.height/2);
        this.ren.setTransform(this.C_W/2-60,24,1,1,0,0,0,102,0);

        this.component.addChild(this.bg1,this.ball,this.ren);
        this.drawCountDown();
        this.component.scaleX = this.component.scaleY = ratio;

        this.stage.addChild(this.component);

    },
    drawCountDown:function(){
        var image_bg1 = this.loader.getResult('bg1');
        this.circleClock = new createjs.Container();
        var c1 = new createjs.Shape();
        var c2 = new createjs.Shape();
        var c3 = new createjs.Shape();
        c3.name='rotateCircle';

        var txt = new createjs.Text("点击足球射向球门","36px 微软雅黑","#fff");
        txt.name='operationtips';
        txt.textAlign = "center";
        txt.textBaseline = "middle";

        var txt_time = new createjs.Text("5","150px Arial","#fff");
        txt_time.name='txtCount';
        txt_time.textAlign = "center";
        txt_time.textBaseline = "middle";

        c1.graphics.ss(5,'round').s('#fff').drawCircle(0,0,145,145);
        c2.graphics.ss(5,'round').s('#fff').drawCircle(0,0,130,130).ss(1).moveTo(-130,0).lineTo(130,0).moveTo(0,-130).lineTo(0,130);

        txt.setTransform(0,180);
        txt_time.setTransform(0,0);
        c3.setTransform(0,0);
        this.circleClock.addChild(c1,c2,c3,txt,txt_time);
        var point = this.component.globalToLocal(this.C_W/2,315);
        this.circleClock.setTransform(point.x,point.y);
        this.component.addChild(this.circleClock);

        this.gameTime = new createjs.Text('00:00:00',"64px Arial","#fff");
        this.gameTime.textAlign = "center";
        this.gameTime.textBaseline = "middle";
        this.gameTime.setTransform(this.C_W/2,this.C_H-60);
        this.gameTime.alpha = 0;
        this.component.addChild(this.gameTime);

        //游戏得分
        this.gameScore = new createjs.Text('SCORE:0',"28px Arial","#fcd104");
        this.gameScore.textAlign = "left";
        this.gameScore.textBaseline = "middle";
        this.gameScore.setTransform(15,30);
        this.gameScore.alpha = 0;
        this.component.addChild(this.gameScore);

        this.timeCount_1 = new Date();
        var that = this;
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
            this.ball.on('mousedown',this.shot,this);
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
        Zepto.post('/user/game',{actionType:3,assets:that.score,_rtk: __RRXN.get_check_x},function(res){
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
            this.ball.removeAllEventListeners('mousedown');
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
        this.circleClock.getChildByName('rotateCircle').graphics.f('rgba(255,255,255,0.5)').moveTo(0,0).lineTo(0,-130).arc(0,0,130,-Math.PI/2,angel).closePath();
    },
    drawCircleClock2:function(t){
        var h = '00';
        var m = Math.floor(t/(1000*60));
        var s = Math.floor((t%(1000*60))/1000);
        m>9?(m = m):(m = '0'+m);
        s>9?(s=s):(s = '0'+s);
        var timetext = h+':'+m+':'+s; 
        this.gameTime.text = timetext;
    },
    shot:function(){
        var that = this;
        var rnd_dir = Math.floor(Math.random()*2);//0:射向左边1:射向右边
        var rnd_res = Math.floor(Math.random()*2);//0:未射进1:射进
        if(rnd_dir==0){//射向左边
            if(rnd_res==1){//射进
                this.ren.gotoAndPlay('right');
                this.score+=1;
                this.gameScore.text = 'SCORE: '+ this.score;
            }else{
                this.ren.gotoAndPlay('left');
            }
            createjs.Tween.get(this.ball).to({scaleX:0,scaleY:0,x:204,y:34},400,createjs.Ease.linear).call(function(){
                that.ball.setTransform(that.C_W/2,610.5,1,1,0,0,0,62.5,62.5);
            });
        }else{
            if(rnd_res==1){//射进
                this.ren.gotoAndPlay('left');
                this.score+=1;
                this.gameScore.text = 'SCORE: '+ this.score;
            }else{
                this.ren.gotoAndPlay('right');
            }
            createjs.Tween.get(this.ball).to({scaleX:0,scaleY:0,x:452,y:34},400,createjs.Ease.linear).call(function(){
                that.ball.setTransform(that.C_W/2,610.5,1,1,0,0,0,62.5,62.5);
            });
        }
        this.stage.update();
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
new Shot();

