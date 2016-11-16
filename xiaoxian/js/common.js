jQuery(function(){
    jQuery('.menu').click(function(){
        jQuery('#p1').showPop();
    })
    jQuery('.nav .nav_item5').click(function(){
        jQuery('#p1').closePop();
    })
jQuery('.rClose').click(function(){
        jQuery('#p3').closePop();
    })
})
// 加载图片
var preloadPictures = function(pictureUrls, callback){
    var i,
        j,
        loaded = 1;
    for (i = 0, j = pictureUrls.length; i < j; i++) {
        (function (img, src) {
            img.onload = function () { 
			var num = Math.ceil(loaded/j*100) ;
			    $(".percent").html("- "+num+"% -");                        
                if (loaded++ == pictureUrls.length && callback) {
					setTimeout(callback,500);
                }
            };
            img.onerror = function () {};
            img.onabort = function () {};
            img.src = src;
        } (new Image(), pictureUrls[i]));
    }
};
/*
 *跑数
 * */
function animateNum(el,start,end){
    var oEle = document.getElementById(el);
    var num = start;
    var speed = end>100?20:2;
    var tid = 0;
    function run(){
        if(end>start){
            num+=speed;
            if(num>end){
                oEle.innerHTML = end;
                return;
            }
            oEle.innerHTML = num;
        }else{
            console.log('提供的数值不合法！');
            return
        }
        tid = setTimeout(run,15);
    }
    run();
}
function shareTorenren(curpage){
	console.log(curpage);
	eval(curpage+'Out()');
	pageShareIn();
	shareActivity(1);
	
}
function shareTotqq(curpage){
	console.log(curpage);
	eval(curpage+'Out()');
	pageShareIn();
	shareActivity(4);
	
}
function shareTotsina(curpage){
	console.log(curpage);
	eval(curpage+'Out()');
	pageShareIn();
	shareActivity(2);
}
function shareTodouban(curpage){
	console.log(curpage);
	eval(curpage+'Out()');
	pageShareIn();
	shareActivity(3);
}
