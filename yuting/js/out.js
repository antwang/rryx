//var LI_H = window.innerHeight, LI_W = window.innerWidth;
Zepto(function(){
    setTimeout(move,100);
    Zepto('#js2')[0].addEventListener('webkitTransitionEnd',handleTransitionEnd,false);
    Zepto('a.btn-tools-1').on('click',function(){draw();})

    Zepto('.btn-close-draw').on('click',function(){ 
        closePop('#pop-goout'); 
        location.href="index.html";
    })

    Zepto('.btn-close').on('click',function(){var p = Zepto(this).parent();closePop(p); })

    Zepto('a.btn-tools-3').on('click',function(){
        showPop('#videobox1');
        var video = document.querySelector('#bvideo');
        video.src = "bvideo.mp4";
        video.load();
        video.addEventListener('ended',closeVideo,false);
    })
})
function move(){
    Zepto('#js1')[0].style.opacity= '0';
    Zepto('#js1')[0].style.webkitTransform= 'scale(2)';
    Zepto('#js2')[0].style.opacity= '1';
    Zepto('#js2')[0].style.webkitTransform= 'scale(1)';
}
function closeVideo(){
    closePop('#videobox1');
}
function login(){
    window.location = "http://mt.renren.com/login?redirect="+document.URL;
}
/***抽奖* */
function draw(){
	Zepto.post("../user/isLogin",{_rtk: __RRXN.get_check_x},function(flag){
		if(flag == 1){
	    	Zepto.post("../lottery/lottery", {_rtk: __RRXN.get_check_x,fsid:1236},function(data){
			    var rel = data;
                if(rel.result==0){
                    var htmlStr = '<div class="font1 prize-con"><h1 class="prize-title">未中奖</h1><p class="prize-msg">分享成功！感谢您参与活动，可惜这次没中奖。多试几次吧~</p></div>';
                    Zepto('#prizetips').html(htmlStr);
                }
                if(rel.result == 1){
                    var code = rel.code||'';
                    var htmlStr = '<h1 class="prize-title">中奖</h1> <p class="prize-msg">分享成功！<br>人品大爆发呀！<br>您获得了'+rel.awardName+code+'<br>再接再厉，iPad mini大奖离你不远啦！</p>';
                    Zepto('#prizetips').html(htmlStr);
                }
                if(rel.result == -1){
                    var htmlStr = '<div class="font1 prize-con"><h1 class="prize-title">已中奖</h1><p class="prize-msg">分享成功！感谢您参与活动，您已中过奖啦。</p></div>';
                    Zepto('#prizetips').html(htmlStr);
                }
				showPop('#pop-prize');
		    },'json');
	    }else{
            login();
	    }
	});
}
function handleTransitionEnd(e){
    Zepto('#js1').remove();
    showPop('#pop-goout');
}
	//动态设置滑动宽度
function orientationChange(){ 
    //LI_H = Math.max(document.documentElement.clientHeight,document.body.clientHeight,window.innerHeight);
	//Zepto('jsimg').css('height',LI_H+'px');
	//Zepto('jsimg').css('height',LI_H+'px');
} 
window.addEventListener("resize", orientationChange, false); 
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
    /************************场景1游戏1******************************/
    function showPop(ele,b){
        b = b||false;
        if(b){ showOverlay(); }
        $(ele)[0].style.webkitTransform='scale(1)';
        $(ele)[0].style.opacity='1';
    }
    function closePop(ele){
        if($('.overlay').length>0){removeOverlay();}
        $(ele)[0].style.webkitTransform='scale(0)';
        $(ele)[0].style.opacity='0';
    }

