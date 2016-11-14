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
						that.mAlert('最多选择' + defaults.maxNum + '位好友');
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
					    that.mAlert('至少选择'+defaults.minNum+'好友');
                    }
                }else{
					that.mAlert('请选择好友');
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
        },
		mAlert: function(msg,callback){
            var str = msg;
            $('body').append('<div class="pop-tips"><p>'+str+'</p></div>');
            setTimeout(function(){
                $('.pop-tips').animate({opacity:0,top:'40%'},200,'ease-out',function(){
                    $('.pop-tips').remove();
                    if(callback){
                        callback();
                    }
                });
            },1000);
		}
    }
    w.selectFriends = function(){
        return new Friends();
    }
})(Zepto,window);
