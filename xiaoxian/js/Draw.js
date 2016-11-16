function Draw(imgPath){
    this.imgPath = imgPath;
    this.canvas = document.getElementById('drawCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.mouseDown = false;
    this.init();
}
Draw.prototype = {
    constructor:Draw,
    init:function(){
        this.canvas.width = this.canvas.parentNode.offsetWidth;
        this.canvas.height = this.canvas.parentNode.offsetHeight;
        this._drawBg();
        this.initEvent();
    },
    _drawBg:function(){
        var that = this;
        var img = new Image();
        img.onload = function(){
            console.log('img.width:'+img.width);
            console.log('canvas.height:'+that.canvas.height);
            that.ctx.drawImage(img,0,0,img.width,img.height,0,0,that.canvas.width,that.canvas.height);
        };
        img.src = that.imgPath;
    },
    scratch:function(x, y, fresh){
        // 畫筆大小, 形狀...
        this.ctx.strokeStyle = "rgba(255,255,255,.2)";
        this.ctx.lineWidth = 20;
        this.ctx.lineCap = this.ctx.lineJoin = 'round';
        if (fresh) {
            this.ctx.beginPath();
            // 為了模擬滑動，所以在 x 加上 0.01，不然點一下不會產生反應
            this.ctx.moveTo(x+0.01, y);
        }
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
    },
    initEvent:function(){
        var that = this;
        var c = that.canvas;
        c.addEventListener('mousedown', function(e){that.mousedown_handler(e)}, false);
        c.addEventListener('touchstart',function(e){that.mousedown_handler(e)}, false);
        c.addEventListener('mousemove', function(e){that.mousemove_handler(e)}, false);
        c.addEventListener('touchmove', function(e){that.mousemove_handler(e)}, false);
        c.addEventListener('mouseup', function(e){that.mouseup_handler(e)}, false);
        c.addEventListener('touchend',function(e){that.mouseup_handler(e)}, false);
    },
    mousedown_handler:function(e){
        var that = this;
        var c = that.canvas;
            var local = that.getLocalCoords(c, e);
            that.mouseDown = true;
            that.scratch(local.x, local.y, true);
            if (e.cancelable) { e.preventDefault(); } 
    },
    mousemove_handler:function(e) {
        var that = this;
        var c = that.canvas;
        if (!that.mouseDown) { return false; }
        var local = that.getLocalCoords(c, e);
        that.scratch(local.x, local.y, false);
        e.preventDefault();
    },
    mouseup_handler:function(e) {
        var that = this;
        if (that.mouseDown){
            that.mouseDown = false;
            e.preventDefault(); 
        }
        return true;
    },
    getLocalCoords:function(elem, ev) {
        var ox = 0, oy = 0;
        var first;
        var pageX, pageY;
        while (elem != null) {
            ox += elem.offsetLeft;
            oy += elem.offsetTop;
            elem = elem.offsetParent;
        }
        if (ev.hasOwnProperty('changedTouches')) {
            first = ev.changedTouches[0];
            pageX = first.pageX;
            pageY = first.pageY;
        } else {
            pageX = ev.pageX;
            pageY = ev.pageY;
        }
        return { 'x': pageX - ox, 'y': pageY - oy };
    }
}
