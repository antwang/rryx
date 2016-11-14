var UL_H,sy,ey,dy,ulDialog,dialogBox,index=0,isAnimated=false;
Zepto(function(){
    dialogBox = Zepto('#endBox');
    ulDialog = Zepto('#ulEnd');
    LI_H = document.documentElement.clientHeight;
	ulDialog.find('li').css('height',LI_H+'px');
	ulDialog.find('li img').css('height',LI_H+'px');
	ulDialog.css('height',LI_H*2+'px');
	dialogBox.css('height',LI_H+'px');
    ulDialog[0].addEventListener('touchstart',handleTouchStart,false);
    Zepto('a.btn-tools-1').on('click',function(){draw();})
    Zepto('.btn-close-draw').on('click',function(){ 
        closePop('#pop-goout'); 
        location.href="scene.html";
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

function closeVideo(){
    closePop('#videobox1');
}
function login(){
    window.location = "http://mt.renren.com/login?redirect="+document.URL;
}
    /**
     *抽奖  
     * */
    function draw(){
	    Zepto.post("../user/isLogin",{_rtk: __RRXN.get_check_x},function(flag){
			if(flag == 1){
	    	    Zepto.post("../lottery/lottery", {_rtk: __RRXN.get_check_x,fsid:1236},function(data){
			        var rel = data;
                    if(rel.result==0){
                        var htmlStr = '<div class="font1 prize-con"><h1 class="prize-title">未中奖</h1><p class="prize-msg">分享成功！感谢您参与了活动，可惜获奖请求被拒绝。多试几次吧。</p></div>';
                        Zepto('#prizetips').html(htmlStr);
                    }
                    if(rel.result == 1){
                        var code = rel.code||'';
                        var htmlStr = '<h1 class="prize-title">中奖</h1> <p class="prize-msg">分享成功！<br>人品大爆发呀！<br>您获得了'+rel.awardName+code+'一个<br>再接再厉，iPad mini大奖离你不远啦！</p>';
                        Zepto('#prizetips').html(htmlStr);
                    }
                    if(rel.result == -1){
                        //showTips(rel.desc);
                    }
					showPop('#pop-prize');
		        },'json');
	        }else{
                login();
	        }
	    });
    }
function handleTouchStart(e){
    sy = e.touches[0].clientY;
    window.addEventListener('touchmove',handleTouchMove,false);
}
function handleTouchMove(event){
    e = event;
    e.preventDefault();
    dy = e.touches[0].clientY-sy;
    window.addEventListener('touchend',handleTouchEnd,false);
}
function handleTouchEnd(e){
    if(isAnimated){
        return;
    }else{
        if(dy<-50){
            index++;
            isAnimated = true;
            ey = e.changedTouches[0].clientY;
	        translate(-LI_H,500,ulDialog[0],function(){
                isAnimated = false
                setTimeout(function(){
                    showPop('#pop-goout');
                },1000)
            });
            window.removeEventListener('touchmove',handleTouchMove,false);
            window.removeEventListener('touchend',handleTouchEnd,false);
        }
    }
}
	//动态设置滑动宽度
	function orientationChange(){ 
        LI_H = Math.max(document.documentElement.clientHeight,document.body.clientHeight,window.innerHeight);
		ulDialog.find('li').css('height',LI_H+'px');
		ulDialog.find('li img').css('height',LI_H+'px');
        index = index>0?1:0;
        var ts = 'translateY('+ (-index*LI_H) + 'px)';
		ulDialog.css('height',LI_H*2+'px');
		ulDialog[0].style.webkitTransition='';
		ulDialog[0].style.webkitTransitionDuration='0';
		ulDialog[0].style.webkitTransform= ts;
		dialogBox.css('height',LI_H+'px');
	} 
	window.addEventListener("resize", orientationChange, false); 
//滑动效果
function translate(dist, speed, ele,fn){
		if( !!ele ){ ele=ele.style; }else{ ele=ulDialog[0].style; }
		ele.webkitTransitionDuration =  ele.MozTransitionDuration = ele.msTransitionDuration = ele.OTransitionDuration = ele.transitionDuration =  speed + 'ms';
		ele.webkitTransform = 'translate(0,'+ dist + 'px)' + 'translateZ(0)';
		ele.msTransform = ele.MozTransform = ele.OTransform = 'translateY(' + dist + 'px)';
        if(fn){
            fn();
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

