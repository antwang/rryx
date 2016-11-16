var userName = '',userPic = '';
jQuery(function(){
	/*字符串转换*/
	var index = 0;
	var delayTime=400;
	var startX = 0;
	var startY = 0;
	var distX = 0;
	var distY = 0;
	var dist = 0; //手指滑动距离
	var isTouchPad = (/hp-tablet/gi).test(navigator.appVersion);
	var hasTouch = 'ontouchstart' in window && !isTouchPad;
	var touchStart = hasTouch ? 'touchstart' : 'mousedown';
	var touchMove = hasTouch ? 'touchmove' : 'mousemove';
	var touchEnd = hasTouch ? 'touchend' : 'mouseup';
    var conBox = jQuery('#wrapper')[0];
	var slideH = conBox.parentNode.clientHeight;
	var slideW = conBox.parentNode.clientWidth;// mainCell滑动距离

    //滑动效果
	function translate(dist,speed,ele){
		if( !!ele ){ele=ele.style;}else{ele = conBox.style;}
		ele.webkitTransitionDuration = ele.MozTransitionDuration = ele.msTransitionDuration = ele.OTransitionDuration = ele.transitionDuration =  speed + 'ms';
		ele.webkitTransform = 'translate(0,' + dist + 'px)' + 'translateZ(0)';
		ele.msTransform = ele.MozTransform = ele.OTransform = 'translateY(' + dist + 'px)';
	}
	//触摸开始函数
	function tStart(e){
		distY = 0;
		var point = hasTouch ? e.touches[0] : e;
		startY =  point.pageY;
		//添加“触摸移动”事件监听
		conBox.addEventListener(touchMove, tMove,false);
		//添加“触摸结束”事件监听
		conBox.addEventListener(touchEnd, tEnd ,false);
	}

	//触摸移动函数
	function tMove(e){
		e.preventDefault(); 
		if(hasTouch){if(e.touches.length > 1 || e.scale && e.scale !== 1) return }; //多点或缩放
		var point = hasTouch ? e.touches[0] : e;
		distY = point.pageY-startY;
        if(distY>0){return;}
        if(index==3){
		    translate(-index*slideH+distY,400);
        }
	}

	//触摸结束函数
	function tEnd(e){
		e.preventDefault(); 
		if(Math.abs(distY) > slideH/10&&distY<0){index++;}else{
            return;
        }
		doPlay();  
		conBox.removeEventListener(touchMove, tMove, false);
		conBox.removeEventListener(touchEnd, tEnd, false);
	}
	//效果函数
	function doPlay(){
        if(index<0){
            index=0
        }
        if(index<=2){
            jQuery('.sl').addClass('hide');
            jQuery('#sl_'+index).removeClass('hide');
        }
        if(index<4&&index>2){
            var n = index-2;
		    translate(-(n*slideH),delayTime); 
            jQuery('.page .w_content').addClass('hide');
            Zepto.post('/user/count',function(res){
                var cnt = res;
                jQuery('#menu').show();
                jQuery('#joinNum').text(cnt);
            })
            jQuery('.page_0 .w_content').removeClass('hide');
        }
        if(index>=4){
            index==4
            location.href="upload.html";
        }
	};// doPlay end
    function getUser(){
		Zepto.proxyAjax({
			url: 'http://base.yx.renren.com/api/http/user/login-user?format=2&callback=?',
			dataType: "json",
			type: "GET",
			success: function(data) {
                   if(data.status>0){
                       var user = data.user;
                       userName = user.userName;
                       userPic = user.tinyUrl;
                       jQuery('.cur_user_name').text(userName);
                       jQuery('.cur_user_pic').attr('src',userPic);
	                   //添加“触摸开始”事件监听
	                   conBox.addEventListener(touchStart, tStart ,false);
                    }
			}
		});
    }
    Zepto.post('/user/isLogin',function(flag){
        if(flag==1){
            jQuery('.page_1 .w_content').removeClass('hide');
            getUser();
        }else{
            window.location = "http://mt.renren.com/login?redirect="+document.URL;
        }
    });
})



