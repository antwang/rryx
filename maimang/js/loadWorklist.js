    var type = 0;//0:全部作品；1::好友的作品2：我的作品
	var pn = 0;//当前的指示器
    var ele = null;
    var curPage = 1;//目前加载到第几页数据
    var totalPageCount = 0;
	var delayTime=400;//动画用时
	var startX = 0;//开始触碰的位置
	var startY = 0;
	var distX = 0;//移动的距离
	var distX = 0;//移动的距离
	var startX1 = 0;//开始触碰的位置
	var distX1 = 0;//开始触碰的位置
	var distY = 0;
	var isTouchPad = (/hp-tablet/gi).test(navigator.appVersion);
	var hasTouch = 'ontouchstart' in window && !isTouchPad;
	var touchStart = hasTouch ? 'touchstart' : 'mousedown';
	var touchMove = hasTouch ? 'touchmove' : 'mousemove';
	var touchEnd = hasTouch ? 'touchend' : 'mouseup';
    var conBox = null;
	var slideH = 0;
	var slideW = 0;
jQuery(function(){
    conBox = jQuery('#ulWork')[0];
	slideH = jQuery('#ulWork li').height();
	slideW = jQuery('#ulWork li').width();
	//slideW = conBox.parentNode.clientWidth;
    //滑动效果
	function translate(dist,speed,ele){
		if( !!ele ){ele=ele.style;}else{ele = conBox.style;}
		ele.webkitTransitionDuration = ele.MozTransitionDuration = ele.msTransitionDuration = ele.OTransitionDuration = ele.transitionDuration =  speed + 'ms';
		ele.webkitTransform = 'translate(' + dist + 'px,0)' + 'translateZ(0)';
		ele.msTransform = ele.MozTransform = ele.OTransform = 'translateX(' + dist + 'px)';
	}
	//触摸开始函数
	function tStart1(e){
		var point = hasTouch ? e.touches[0] : e;
		distY = 0;
		startX1 = 0;
		startY =  point.pageY;
		jQuery('body')[0].addEventListener(touchMove, tMove1,false);
		jQuery('body')[0].addEventListener(touchEnd, tEnd1,false);
	}
	//触摸开始函数
	function tMove1(e){
		var point = hasTouch ? e.touches[0] : e;
		distY = point.pageY-startY;
		distX1 = point.pageX-startX1;
	}
	//触摸开始函数
	function tEnd1(e){
        if(distY < -slideH/10&&Math.abs(distX1)<Math.abs(distY)){
		    startY = 0;
            distY = 0;
            distX1 = 0;
		    startX1 = 0;
            location.href="index.html";
	    }
        jQuery('body')[0].removeEventListener(touchMove,tMove1,false);
		jQuery('body')[0].removeEventListener(touchEnd, tEnd1,false);
	}

	//触摸开始函数
	function tStart(e){
		distX = 0;
		var point = hasTouch ? e.touches[0] : e;
		startX =  point.pageX;
		conBox.addEventListener(touchMove, tMove,false);
		conBox.addEventListener(touchEnd, tEnd ,false);
	}
	//触摸移动函数
	function tMove(e){
		if(hasTouch){if(e.touches.length > 1 || e.scale && e.scale !== 1) return }; //多点或缩放
		e.preventDefault(); 
		var point = hasTouch ? e.touches[0] : e;
		distX = point.pageX-startX;
	    translate(-pn*slideW+distX,delayTime);
	}
	//触摸结束函数
	function tEnd(e){
		if(distX==0) return;
		if(Math.abs(distX) > slideW/10&&distX>0){
            //加载上一页
            console.log('pn:'+pn);
            console.log('curPage:'+curPage);
            console.log('totalPageCount:'+totalPageCount);
            if(pn>=1){
                pn--;
                console.log('---------pn自减一之后----------');
            console.log('pn:'+pn);
            console.log('curPage:'+curPage);
            console.log('totalPageCount:'+totalPageCount);
            }else{
                Zepto.yx.tips('已经是第一页了！');
            }
        }
		if(Math.abs(distX) > slideW/10&&distX<0){
            //加载下一页
            if(pn>=curPage-1){
                if(curPage<totalPageCount){
                    pn++;
                    curPage++;
                    console.log(curPage);
                    loadData(type,curPage);
                }else{
                    Zepto.yx.tips('已经是最后一页了！');
                }
            }else{
                pn++;
            }
        }
        doPlay();
		conBox.removeEventListener(touchMove,tMove,false);
		conBox.removeEventListener(touchEnd,tEnd,false);
	}
	//效果函数
	function doPlay(type,curpage){
		translate(-pn*slideW,delayTime); 
	};// doPlay end

    //加载数据
	function loadData(type,curPage){
        ele = jQuery('<li class="clearfix"><img class="loadingpic" src="images/load.gif"></li>');
        jQuery('#ulWork').append(ele);
        switch(type){
            case 0:
                Zepto.post('/work/list',{pn:curPage,ps:4,format:1},function(data){
                    var works = data.items,len = works.length,htmlStr = '';
                    totalPageCount = data.totalPageCount;
                    if(len>0){
                        for(var i = 0;i<len;i++){
                            htmlStr +='<section>'+
                                '<a class="btn_workDetail" href="detail-'+works[i].id+'"><img src="'+works[i].picUrl+'"></a>'+
                                '<div class="work_user">'+
                                '<p class="work_user_name">'+works[i].userName+'</p>'+
                                '<p class="work_user_vote">得票数: <em>'+works[i].voteCount+'</em></p>'+
                                '</div>'+
                                '</section>'
                        }
                    }else{
                        htmlStr = '暂无作品！'
                    }
                    ele.html(htmlStr);
                },'json')
                break;
            case 1:
                Zepto.post('/work/list-friends',{pn:curPage,ps:4,format:1},function(data){
                    var works = data.items,len = works.length,htmlStr = '';
                    totalPageCount = data.totalPageCount;
                    if(len>0){
                        for(var i = 0;i<len;i++){
                            htmlStr +='<section>'+
                                '<a class="btn_workDetail" href="detail-'+works[i].id+'"><img src="'+works[i].picUrl+'"></a>'+
                                '<div class="work_user">'+
                                '<p class="work_user_name">'+works[i].userName+'</p>'+
                                '<p class="work_user_vote">得票数: <em>'+works[i].voteCount+'</em></p>'+
                                '</div>'+
                                '</section>'
                        }
                    }else{
                        htmlStr = '暂无作品！'
                    }
                    ele.html(htmlStr);
                },'json')
                break;
            case 2:
                Zepto.post('/work/list-my',{pn:curPage,ps:4,format:1},function(data){
                    var works = data.items,len = works.length,htmlStr = '';
                    totalPageCount = data.totalPageCount;
                    if(len>0){
                        for(var i = 0;i<len;i++){
                            htmlStr +='<section>'+
                                '<a class="btn_workDetail" href="detail-'+works[i].id+'"><img src="'+works[i].picUrl+'"></a>'+
                                '<div class="work_user">'+
                                '<p class="work_user_name">'+works[i].userName+'</p>'+
                                '<p class="work_user_vote">得票数: <em>'+works[i].voteCount+'</em></p>'+
                                '</div>'+
                                '</section>'
                        }
                    }else{
                        htmlStr = '暂无作品！'
                    }
                    ele.html(htmlStr);
                },'json')
                break;
        }
	    slideW = jQuery('#ulWork li').width();
	};// doPlay end

	//添加“触摸开始”事件监听
	conBox.addEventListener(touchStart, tStart ,false);
    jQuery('body')[0].addEventListener(touchStart,tStart1,false);
    jQuery('.typeSelector nav a').live('click',function(){
        if(jQuery(this).hasClass('active')){
            return;
        }else{
            var n = jQuery(this).index();
            type = n;
            jQuery(this).siblings().removeClass('active');
            jQuery(this).addClass('active');
	        pn = 0;
            curPage = 1;
		    translate(0,delayTime); 
            jQuery('#ulWork').html('');
            loadData(type,1);
        }
    })
    loadData(0,1);
})




