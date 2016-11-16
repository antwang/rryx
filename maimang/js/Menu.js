function Menu(menuId){
    this.menuId = menuId;
    this.speed = 1;
    this.t = 0;
    this.d = 10;
    this.anchorId ='#menu';
    this.enabled = false;
    this.init();
    
}
Menu.prototype = {
    initEvent:function()
    {
        var that = this;
        /*jQuery(that.anchorId).live('click',function(){
            that.fadeIn();
            jQuery(this).hide();
            that.enabled = true;
        })*/
        jQuery(document).bind('click',function(e){
            var tg = e.target.id;
            switch(tg){
                case 'menu':
                    that.fadeIn();
                    jQuery(this).hide();
                    that.enabled = true;
                    break;
                case 'n1':
                    location.href="index.html";
                    that.fadeOut();
                    that.enabled = false;
                    break;
                case 'n2':
                    //Zepto.post('/user/isLogin',{_rtk: __RRXN.get_check_x},function(data){
                        //if(data==1){
                            jQuery("#p6").showPop({overlay:70});
                        //}else{
                            //window.location = "http://mt.renren.com/login?redirect="+document.URL;
                        //}
                    //},'json')
                    that.fadeOut();
                    jQuery(that.anchorId).show();
                    that.enabled = false;
                    break;
                case 'n3':
                    location.href="upload.html";
                    that.fadeOut();
                    jQuery(that.anchorId).show();
                    that.enabled = false;
                    break;
                case 'n4':
                    location.href="worklist.html";
                    that.fadeOut();
                    jQuery(that.anchorId).show();
                    that.enabled = false;
                    break;
                case 'n5':
                    jQuery("#p4").showPop({overlay:70});
                    that.fadeOut();
                    jQuery(that.anchorId).show();
                    that.enabled = false;
                    break;
                case 'n6':
                    //window.open('http://track.yx.renren.com/redirect/14504','_blank');
                    //location.href='http://track.yx.renren.com/redirect/14504';
                    location.href='http://m.vmall.com/product/1349.html';
                    that.fadeOut();
                    jQuery(that.anchorId).show();
                    that.enabled = false;
                    break;
                case 'n7':
                    location.href="video.html";
                    that.fadeOut();
                    jQuery(that.anchorId).show();
                    that.enabled = false;
                    break;
                default :
                    if(that.enabled){
                        that.fadeOut();
                        jQuery(that.anchorId).show();
                        that.enabled = false;
                    }
                    break;
            }
        })
    },
    init:function(o)
    {
        var that = this, _h = -jQuery(this.menuId).height()+'px';
        jQuery(that.menuId).css('top',_h).show();
        that.initEvent();
    },
    fadeIn:function()
    {
        var that = this,b = -jQuery(that.menuId).height(),c = jQuery(that.menuId).height();
        jQuery(that.menuId).show();
        console.log('fadeIn');
        that.run(b,c);
    },
    fadeOut:function()
    {
        var that = this,b = 0,c = -jQuery(that.menuId).height();
        that.run(b,c);
    },
    run:function(b,c)
    {
        var that = this,b = b,c = c;
        jQuery(that.menuId)[0].style.top = Math.ceil(Tween.Quad.easeIn(that.t,b,c,that.d)) + 'px'; 
        if(that.t<that.d){
            that.t += that.speed; 
            setTimeout(function(){that.run(b,c)},10);
        }else{
            that.t = 0;
        } 
    }
}

