(function(w){
    var ratio = document.documentElement.clientWidth/640;
    var stage = new createjs.Stage('maze');
    var Tablet = function(x,y,imgElement){
        this.x = x*ratio;
        this.y = y*ratio;
        this.w = 0;
        this.h = 0;
        this.imgElement = imgElement;
        this.init();
    }
    Tablet.prototype = {
        constructor:Tablet,
        init :function(){
            this.img = new createjs.Bitmap(this.imgElement);
            this.w = this.img.image.width*ratio;
            this.h = this.img.image.height*ratio;
            this.img.setTransform(this.x, this.y, 1, 1,0,0,0,this.w/2,this.h/2)
            stage.addChild(this.img);
            stage.update();
        }
    }
    w.createTablet = function(x,y,imgElement){
        return new Tablet(x,y,imgElement);
    }
})(window);
