var UL_H,LI_H,PIC_H,BOX_H,sy,ey,dy,ulDialog,dialogBox,index=0,isAnimated=false,filmPIC_H;
Zepto(function(){
    var ulFilm = $('#ulFilm');
    filmPIC_H = ulFilm.find('li').height(); 
    play();
    Zepto('.skip').on('click',function(){
        skip();
    })
})
function init(){
    dialogBox = Zepto('#dialogBox');
    ulDialog = Zepto('#ulDialog');
    LI_H = document.documentElement.clientHeight;
    UL_H = document.documentElement.clientHeight*3;
    BOX_H = document.documentElement.clientHeight;
	ulDialog.find('li').css('height',LI_H+'px');
	ulDialog.find('li img').css('height',LI_H+'px');
	ulDialog.css('height',LI_H*3+'px');
	dialogBox.css('height',LI_H+'px');
    dialogBox[0].style.opacity = '1';
    setTimeout(function(){
       Zepto('#filmscene').hide(); 
    },200)
    document.querySelector('#ulDialog').addEventListener('touchstart',handleTouchStart,false);
}
function skip(){
    Zepto('#filmscene').remove(); 
	dialogBox = Zepto('#dialogBox');
    ulDialog = Zepto('#ulDialog');
    LI_H = document.documentElement.clientHeight;
    UL_H = document.documentElement.clientHeight*3;
    BOX_H = document.documentElement.clientHeight;
	ulDialog.find('li').css('height',LI_H+'px');
	ulDialog.find('li img').css('height',LI_H+'px');
	ulDialog.css('height',LI_H*3+'px');
	dialogBox.css('height',LI_H+'px');
    dialogBox[0].style.opacity = '1';
     document.querySelector('#ulDialog').addEventListener('touchstart',handleTouchStart,false);
    Zepto('#dialogBox')[0].style.opacity = '1';
    index = 2;
	translate((-LI_H*index),500,document.querySelector('#ulDialog'),function(){isAnimated = false});
    Zepto('.skip').hide();
    document.querySelector('#dialogTips').innerHTML='“奇怪，门怎么被锁住了，窗户也打不开，身体变得好不舒服，感觉快要窒息了。。这样不行，我得快想办法出去。”';
}
//胶卷滚动
function play(){
    $("#ulFilm").animate({marginTop: -filmPIC_H*3+'px'}, 8000,'ease-in-out',function(){
        init();
    });
}
function handleTouchStart(e){
    sy = e.touches[0].clientY;
    document.querySelector('#ulDialog').addEventListener('touchmove',handleTouchMove,false);
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
        if(dy<-40){
            isAnimated = true;
            ey = e.changedTouches[0].clientY;
            index++;
            if(index==1){
	            translate((-LI_H*index),500,document.querySelector('#ulDialog'),function(){isAnimated = false});
            }
            if(index==2){
                Zepto('.skip').hide();
	            translate((-LI_H*index),500,document.querySelector('#ulDialog'),function(){isAnimated = false});
                document.querySelector('#dialogTips').innerHTML='“奇怪，门怎么被锁住了，窗户也打不开，身体变得好不舒服，感觉快要窒息了。。这样不行，我得快想办法出去。”';
            }
            if(index==3){
                document.querySelector('#dialogTips').innerHTML='“完全想不起来怎么会被困，毫无头绪。头晕目眩，空气好像越来越稀薄，必须要赶紧找到办法逃出去！” ';
                isAnimated = false;
            }
            if(index==4){
                document.querySelector('#dialogTips').innerHTML='对了，我可以用手机向闺蜜求助，她们一定会想出解决的方法，帮我逃出困境';
                isAnimated = false;
            }
            if(index==5){
                invite();
            }
        }
    }
    function invite(){
        var fri = selectFriends();
        fri.select({maxNum:1,callback:function(arr){
            var name = arr[0].fname;
            var fhead = arr[0].fhead;
                Zepto.post('../friends/invite',{_rtk: __RRXN.get_check_x,type:1,fids:arr[0].fid},function(data){
                    if(data>=0){
                        fri.friPop.remove();
                        Zepto('#fripic').attr('src',fhead);
                        Zepto('#fname').html(name);
                        Zepto('#friDialog').show();
                        Zepto('#friDialog')[0].style.opacity = 1;
                        Zepto('.btn-cfm-fri').on('click',function(){
                            Zepto('#friDialog').hide();
                            location.href="box.html";
                        })
                    }
                })
            }
        })
    }
}
	//动态设置滑动宽度
	function orientationChange(){ 
        LI_H = Math.max(document.documentElement.clientHeight,document.body.clientHeight,window.innerHeight);
		ulDialog.find('li').css('height',LI_H+'px');
		ulDialog.find('li img').css('height',LI_H+'px');
        index = index>2?2:index;
        var ts = 'translateY('+ (-index*LI_H) + 'px)';
		ulDialog.css('height',LI_H*3+'px');
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


;(function($,w){
    var Friends = function(){
        this.requestUrl = 'http://base.yx.renren.com/api/http/friend/list?format=2&callback=?&' + Math.random();
        this.searchUrl = 'http://base.yx.renren.com/api/http/friend/search2?format=2&callback=?&' + Math.random();
        this.searchName = '';//搜索名
		this.friPop = null;//好友选择弹窗对象
		this.loadingstatus = 1;//1:可以加载,2:正在加载中，3：已经是最后一页了
		this.curpage = 1;//要加载第几页
		this.recsize = 0;//好友总数
		this.listarr = [];//加载的数据
        this.arrSelected = [];//作为返回值的对象的数据组
        this.numSelected = 0;//选中的好友个数
        this.cache = null;
        this.initData();
    }
    Friends.prototype = {
        constructor:Friends,
        select:function(options)
        {
            var options = $.extend({type:1},options);
            this._select(options);
        },
        _select:function(options)
        {
			var that = this;
            var defaults = {
                type:1,
                maxNum:10000,
                minNum:0,
                callback:function(){}
            }
            defaults = $.extend(defaults,options);
            //加载下一页
			that.friPop.on('click','#btnFriLoadingTips',function(){
                that.loadData();
			})
            //选择好友
			.on('click','ul.ul-flist li',function(){
                //选中则去除选中态
				if($(this).hasClass('fri-selected')) {
					$(this).removeClass('fri-selected');
                    var fid = $(this).attr('fid');
                    $.each(that.arrSelected,function(i,item){
                        if(item.fid == fid){
                            that.arrSelected.splice(i,1);
                            that.numSelected--;
                            return;
                        }
                    })
                }else{
                //未选则选中
					if(that.numSelected >= defaults.maxNum){
						$.yx.mAlert('最多选择' + defaults.maxNum + '位好友');
                        return;
                    }else{
                        var oli = {};
					    $(this).addClass('fri-selected');
                        oli.fid = $(this).attr('fid');
                        oli.fname = $(this).attr('fname');
                        oli.fhead = $(this).attr('fhead');
                        that.arrSelected.push(oli);
                        that.numSelected++;
                    }
                }
			})
            //确定最终选择的好友
			.on('click','.btn-fri-ok',function(){
                if(that.numSelected>0){
                    if(that.numSelected>defaults.minNum){
                        that.friPop.remove();
                        if(defaults.type==1){
						    defaults.callback(that.arrSelected);
                        }else{
                            var arrFid = [];
                            $.each(that.arrSelected,function(i,item){
                                arrFid.push(item.fid); 
                            })
						    that._notice({sid:defaults.sid,friends:arrFid.join(','),callback:defaults.callback});
                        }
                    }else{
					    $.yx.mAlert('至少选择'+defaults.minNum+'好友');
                    }
                }else{
					$.yx.mAlert('请选择好友');
                }
			})
            .on('keyup','#searchText',function(){
                var regstr = /\s/ig;

                that.searchName = $(this).val().replace(regstr,'');
                if(that.searchName!=""){
                    that.cacheData();
                    that.search();
                }else{
                    that.recoveryData();
                }
            })
        },
        loadData:function()
        {
			var that = this;
            //加载
			if(that.loadingstatus==1){
				that.loadingstatus = 2;
				that.friPop.find('#btnFriLoadingTips').html('努力加载中 <img style="width:1.6rem;height:1.6rem;vertical-align:middle;" src="images/loading2.gif">');
				$.ajax({
					url: that.requestUrl,
					data: {
						"curpage": that.curpage,
						"pagesize": 20
					},
					dataType: "json",
					type: "GET",
					success: function(data) {
                        that.listarr = [];
						$.each(data.friends,
							function(i, obj){
								that.listarr.push("<li fid='" +
							 	obj.userId + "' fname='" + 
							 	obj.userName + "' fhead='" + obj.tinyUrl + "'><p class='fri-img-box'><img class='fri-img' src='" + 
							 	obj.tinyUrl + "' alt='" + obj.tinyUrl +
							  	"' /></p><p class='fri-name'>" + obj.userName + "</p></li>");
						});
                        that.recsize = data.page.recsize;
			            that.friPop.find('#ulList').append(that.listarr.join(''));
			            that.friPop.find('#recsize').html(that.recsize);
						that.curpage = data.page.curpage+1;
						that.pagecount = data.page.pagecount;
						if(that.curpage>that.pagecount){
							that.loadingstatus = 3;
							that.friPop.find('#btnFriLoadingTips').html('已无更多数据');
						}else{
							that.friPop.find('#btnFriLoadingTips').html('点击加载下一页');
							that.loadingstatus = 1;
						}
					}
				});
			}else{
				return;
			}
        },
        createDom:function()
        {
			var strDom = '<div id="FriendsSelector" class="friends-pop">'+
  			'<div class="search-bar">'+
    		'<div class="search-box">'+
     		'<a href="javascript:;" id="btnFriSearch" class="icon icon-search btn-search btn-fri-search" title="搜索"></a>'+
      		'<input id="searchText" type="search" class="search-text" placeholder="搜索好友"/>'+
	 		'</div>'+
 	  		'</div>'+
  			'<div class="flist-box">'+
   			'<ul id="ulList" class="ul-flist clearfix">'+
			this.listarr.join('')+
  			'</ul>'+
  			'<div class="loading-bar"><a id="btnFriLoadingTips" href="javascript:;" class="btn-nextpage">点击加载下一页</a></div>'+
            '</div>'+
  			'<div class="top-bar tc">'+
			'<a href="javascript:;" class="btn-topbar-r btn-fri-ok">确定</a>'+
			'</div>'+
 			'</div>';
			this.friPop = $(strDom).appendTo('body');
        },
        initData:function()
        {
            this.createDom();
            this.loadData();
        }, 
        cacheData:function()
        {
            if(!this.cache){
                this.cache = new Object;
                this.cache.dom = this.friPop.find('ul.ul-flist li');
			    this.cache.loadingstatus = this.loadingstatus;
			    this.cache.tips = this.friPop.find('#btnFriLoadingTips').html();
            }
        },
        recoveryData:function()
        {
			this.loadingstatus = this.cache.loadingstatus;
			this.friPop.find('#btnFriLoadingTips').html(this.cache.tips);
			this.friPop.find('#ulList').html(this.cache.dom);
            this.cache = null;
        },
        search:function()
        {
			var that = this;
			that.loadingstatus = 1;
			if(that.loadingstatus==1){
				that.loadingstatus = 2;
				that.friPop.find('#btnFriLoadingTips').html('努力加载中 <img style="width:1.6rem;height:1.6rem;vertical-align:middle;" src="images/loading2.gif">');
				$.ajax({
					url: that.searchUrl,
					data: {
                        "name":that.searchName
					},
					dataType: "json",
					type: "GET",
					success: function(res){
                        that.listarr = [];
						$.each(res.friends,
							function(i,obj){
								that.listarr.push("<li fid='" +
							 	obj.id + "' fname='" + 
							 	obj.name + "' fhead='" + obj.tinyurl + "'><p class='fri-img-box'><img  class='fri-img' src='" + 
							 	obj.tinyurl + "' alt='" + obj.tinyurl +
							  	"' /><em class='icon icon-checkmark-circle' title='选择'></em></p><p class='fri-name'>" + obj.name + "</p></li>");
						});
						that.loadingstatus = 3;
						that.friPop.find('#btnFriLoadingTips').html('已无更多数据');
			            that.friPop.find('#ulList').html(that.listarr.join(''));
					}
				});
			}else{
				return;
			}
        }
    }
    w.selectFriends = function(){
        return new Friends();
    }
})(Zepto,window);


