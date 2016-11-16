var stage,canvas,ratio = window.innerWidth/640,distX = 0,distY = 0,oldX = 0,oldY = 0,distX1 = 0, distY1 = 0, oldX1 = 0, oldY1 = 0;
var Merge = function(opts){
    this.opts = opts;
    this.init(this.opt);
}
Merge.prototype = {
    constructor:Merge,
    init:function(opts){
        jQuery('#loadCanvas').html('<canvas id="merge">你的设备不支持canvas</canvas>');
        this.manifest = [
        {src:this.opts.picUrl,id:'bg'},
        {src:'images/btns/zoomout.png',id:'zoomout'},
        {src:'images/btns/zoomin.png',id:'zoomin'},
        {src:'images/btns/rotateRight.png',id:'rotateRight'},
        {src:'images/btns/rotateLeft.png',id:'rotateLeft'},
        {src:'images/pics/phone.png',id:'phone'},
        {src:'images/texts/sl0.png',id:'sl0'},
        {src:'images/modal/'+this.opts.dec+'_b.png',id:'db'},
        {src:'images/modal/'+this.opts.dec+'_g.png',id:'dg'},
        {src:'images/modal/'+this.opts.dec+'_w.png',id:'dw'}
        ]
        this.C_W = 616;
        this.C_H = 543;
        this.loader = new createjs.LoadQueue(false);
        this.canvas = document.getElementById('merge');
        this.canvas.width = ratio*616;
        this.canvas.height = ratio*543;
        this.stage = new createjs.Stage(this.canvas);
        createjs.Touch.enable(this.stage);
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
        this.loadingText.color = "#000";
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
        var image_bg = this.loader.getResult('bg'),
            image_zoomout = this.loader.getResult('zoomout'),
            image_zoomin = this.loader.getResult('zoomin'),
            image_rotateRight = this.loader.getResult('rotateRight'),
            image_rotateLeft = this.loader.getResult('rotateLeft'),
            image_sl0 = this.loader.getResult('sl0'),
            image_phone = this.loader.getResult('phone'),
            image_db = this.loader.getResult('db'),
            image_dg = this.loader.getResult('dg'),
            image_dw = this.loader.getResult('dw');
        var bgW = image_bg.width; 
        var bgH = image_bg.height; 
        var mask_bg = new createjs.Shape(); 
        mask_bg.graphics.f('#ccc').r(0,0,616,412);
        var shape_bg = new createjs.Shape(); 
        shape_bg.graphics.f('#ccc').r(0,0,616,412);
        this.bg = new createjs.Container();
        //this.bg.setBounds(0,0,616,412);
        this.bg.setTransform(0,0);
        
        //this.bg.setTransform(308,206,1,1,0,0,0,308,206);
        this.bgPic = new createjs.Bitmap(image_bg);
        this.bgPic.mask = mask_bg;
        console.log(image_bg);
        var IMG = new Image();
        var that = this;
        IMG.src=image_bg;
        IMG.onload = function(){
            bgW = IMG.width;
            bgH = IMG.height;
            console.log(bgW);
            that.bgPic.setTransform(308,206,1,1,0,0,0,bgW/2,bgH/2);
        }
        //this.bgPic.setTransform(0,0,1,1,0,0,0,bgW/2,bgH/2);
        this.bg.addChild(shape_bg,this.bgPic);

        this.tools = new createjs.Container();
        this.panel = new createjs.Shape();
        this.panel.graphics.f('rgba(255,255,255,0.5)').rr(0,0,344,106,10);
        this.panel.setTransform(0,0);

        this.bitmap_zoomout = new createjs.Bitmap(image_zoomout);
        this.bitmap_zoomout.setTransform(33,16);
        this.hit1 = new createjs.Shape();
        this.hit1.graphics.f('rgba(255,255,255,0.05)').r(0,0,image_zoomout.width,image_zoomout.height);
        this.bitmap_zoomout.hitArea = this.hit1;

        this.bitmap_zoomin = new createjs.Bitmap(image_zoomin);
        this.bitmap_zoomin.setTransform(112,16);
        this.hit2 = new createjs.Shape();
        this.hit2.graphics.f('rgba(255,255,255,0.05)').r(0,0,image_zoomin.width,image_zoomin.height);
        this.bitmap_zoomin.hitArea = this.hit2;

        this.bitmap_rotateRight = new createjs.Bitmap(image_rotateRight);
        this.bitmap_rotateRight.setTransform(175,16);
        this.hit3 = new createjs.Shape();
        this.hit3.graphics.f('rgba(255,255,255,0.05)').r(0,0,image_rotateRight.width,image_rotateRight.height);
        this.bitmap_rotateRight.hitArea = this.hit3;

        this.bitmap_rotateLeft = new createjs.Bitmap(image_rotateLeft);
        this.bitmap_rotateLeft.setTransform(259,16);
        this.hit4 = new createjs.Shape();
        this.hit4.graphics.f('rgba(255,255,255,0.05)').r(0,0,image_rotateLeft.width,image_rotateLeft.height);
        this.bitmap_rotateLeft.hitArea = this.hit4;

        this.tools.addChild(this.panel,this.bitmap_zoomout,this.hit1,this.bitmap_zoomin,this.hit2,this.bitmap_rotateRight,this.hit3,this.bitmap_rotateLeft,this.hit4);
        this.tools.setTransform(10,10);

        this.bitmap_phone = new createjs.Bitmap(image_phone);
        this.bitmap_phone.setTransform(56,290);

        this.bitmap_sl0 = new createjs.Bitmap(image_sl0);
        this.bitmap_sl0.setTransform(227,434);

        //宣言
        this.decContainer = new createjs.Container(); 
        this.db = new createjs.Bitmap(image_db);
        this.dg = new createjs.Bitmap(image_dg);
        this.dw = new createjs.Bitmap(image_dw);
        this.decContainer.addChild(this.db);
        this.decContainer.setTransform(35,20);
        this.decContainer.visible = false;

        this.component.addChild(this.bg,this.tools,this.bitmap_phone,this.bitmap_sl0,this.decContainer);
        this.component.scaleX = this.component.scaleY = ratio;
        this.stage.addChild(this.component);

        this.stage.removeChild(this.loadingText);
        this.bgPic.on('mousedown',this.handleClick,this);
        this.bitmap_zoomout.on('click',this.handleZoomout,this);
        this.bitmap_zoomin.on('click',this.handleZoomin,this);
        this.bitmap_rotateRight.on('click',this.handleRotateRight,this);
        this.bitmap_rotateLeft.on('click',this.handleRotateLeft,this);
        this.stage.update();
    },
    handleClick:function(evt){
        oldX = evt.stageX;
        oldY = evt.stageY;
        this.bgPic.on('pressmove',this.handleDrag,this);
    },
    handleDrag:function(evt){
        distX = evt.stageX - oldX;
        distY = evt.stageY - oldY;
        //var dist = Math.sqrt(distX*distX+distY*distY);

        oldX = evt.stageX;
        oldY = evt.stageY;
        this.bgPic.x += distX;
        this.bgPic.y += distY;
        this.stage.update();
    },
    handleZoomout:function(evt){
        this.bgPic.scaleX +=.1; 
        this.bgPic.scaleY +=.1; 
    },
    handleZoomin:function(evt){
        this.bgPic.scaleX -=.1; 
        this.bgPic.scaleY -=.1; 
        if(this.bgPic.scaleX <=0){
            this.bgPic.scaleX = 0;
            this.bgPic.scaleY = 0; 
        }
    },
    reset:function(){
        this.stage.clear();
        this.stage.update();
    },
    handleRotateRight:function(evt){
        this.bgPic.rotation +=10; 
    },
    handleRotateLeft:function(evt){
        this.bgPic.rotation -=10; 
    },
    //显示编辑工具栏
    showTools:function(){
        this.tools.visible = true; 
        this.decContainer.visible = false;
        this.decContainer.removeAllEventListeners();
        this.bgPic.on('mousedown',this.handleClick,this);
    },
    //隐藏编辑工具栏
    hideTools:function(){
        this.tools.visible = false; 
        this.decContainer.visible = true;
        this.bgPic.removeAllEventListeners();
        this.decContainer.on('mousedown',this.handleClick1,this);
    },
    //移动宣言
    handleClick1:function(evt){
        oldX1 = evt.stageX;
        oldY1 = evt.stageY;
        this.decContainer.on('pressmove',this.handleDrag1,this);
    },
    //移动宣言
    handleDrag1:function(evt){
        distX1 = evt.stageX - oldX1;
        distY1 = evt.stageY - oldY1;
        oldX1 = evt.stageX;
        oldY1 = evt.stageY;
        this.decContainer.x += distX1;
        this.decContainer.y += distY1;
        this.stage.update();
    },
    //切换宣言颜色
    changeColor:function(o){
        this.decContainer.removeAllChildren();
        this.decContainer.addChild(this[o]);
    },
    //完成海报
    complete:function(){
        this.decContainer.removeAllEventListeners();
        //this.decContainer.on('mousedown',this.handleClick1,this);
    },

    //保存作品
    save:function(ad,syn,fn){
        var that = this;
        var filePic = this.stage.toDataURL('#fff');
        filePic = filePic.replace('data:image/png;base64,','');
        Zepto.post('/work/add',{filePic:filePic,workType:1,addFriend:ad,syncAlbum:syn},function(res){
            fn(res);
        })
    }
}

