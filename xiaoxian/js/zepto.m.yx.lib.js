/**
 *zepto.yx.mobileLib.js
 *v 1.0
 *wangchao
 * */      
;(function($){
    //常用变量
    $.yxparam = $.extend({
      token : "",
      loginback : null,
      friendsback : null,
      uploadback : null,
      top : -1,
      prefix : "shine_yx_",
      user : -1,
      albums : null,
      domains : "renren.com",
      errorMsg : "登录帐号或密码错误，请重试",
      loginTemplate : "<div class='mg-loginbox'><p class='clearfix' style='color:red;' id='shine_errorInfo'></p><p class='clearfix'><label for='email'> 帐号: </label><input type='text' style='width: 150px;' name='shine_names_email' tabindex='1' value='' id='shine_names_email' class='input-text'></p><p class='clearfix'><label for='password'>密码:</label><input type='password' style='width: 150px;' id='shine_names_password' name='shine_names_password' class='input-text' tabindex='2'></p><p class='right'><label for='autoLogin'><input type='checkbox' name='autoLogin' id='autoLogin' value='true' tabindex='4' class='input-checkbox'> 下次自动登录</label><span> <a tabindex='5' href='http://safe.renren.com/findPass.do'>取回密码</a> </span></p><p class='right'><input type='hidden' name='origURL' value=''>  <input type='hidden' name='domain' value='renren.com'>  <input type='hidden' name='formName' value=''>  <input type='hidden' name='method' value=''><input type='hidden' name='isplogin' value='true'></p><div class='separator'></div><p class='no-account'> 还没有开通你的人人网帐号？<a target='_blank' href='http://wwv.renren.com/xn.do?ss=10113&amp;rt=27' class='reg-now'>立即注册</a></p></div>"
    })
    Zepto.yx = Zepto.extend({
        //判断用户登录状态
        isLogged : function(callback){
            if($.yxparam.user == -1){
                var url = "http://shine.yx.renren.com/service.do?template=api.com.login&format=jsonp&callback=?";
                var rcallback = callback;
                $.getJSON(url,function(data){
                    if(data.result.islogin == '1'){
                        $.yxparam.user = data.result.user;
                        if(rcallback){
                            rcallback(1);
                        }
                    }else{
                        if(rcallback){
                            rcallback(0);
                        }
                    }
                });
            }else{
                if(callback){
                    callback(1);
                }
            }
        },
        login: function(callback){
            this.isLogged(function(flag){
                if(flag == 0){
                    $.yx._toLogin(callback);
                }else{
                    callback(1);
                }
            });
        },
		ajax: function(options) {
			// Convert data if not already a string
			if (options.data && typeof options.data !== "string") {
				options.data = Zepto.param(options.data, true);
			}
			var data = options.data || "";
			if (typeof(__RRXN) != 'undefined') {
				if (__RRXN.get_check && !/[\?|\&]requestToken=/.test(data)) {
					data += (data ? "&": "") + "requestToken=" + __RRXN.get_check;
				}
				if (__RRXN.get_check_x && !/[\?|\&]_rtk=/.test(data)) {
					data += (data ? "&": "") + "_rtk=" + __RRXN.get_check_x;
				}
			}
			options.data = data;
			$.ajax(options);
		},
        /**
         * 查询dom对象
        * */
		_getObj: function(id) {
			if ($("#" + id).length == 0) {
				$("body").append("<div id='" + id + "'></div>");
			}
			return $("#" + id);
		},

        /**
         * 执行登录
        * */
		_toLogin: function(callback){
			document.domain = "renren.com";
			$.yxparam.loginback = callback;
			var loginUrl = "http://shine.yx.renren.com/api/user/login?callback=jQueryxxx&errCode=100001&rr=0&ver=2";
			$.yx._getObj("shineLoginMessager").yxappwinShow({
				close: false,
				width: '100%',
				height: '100%',
				msg: "<iframe width='100%' height='100%' frameborder='0' src='"+ loginUrl + "'></iframe>"
			});
		},
        /**
         * 登录请求完成后执行
         * */
		loginback: function(flag) {
			$.yx._getObj("shineLoginMessager").yxwinClose();
			if (flag != "0" && flag != "1") {
				$.yx.setToken(flag);
				flag = "1";
			}
			if ($.yxparam.loginback) {
				$.yxparam.loginback(flag);
			}
		},
        /**
         * 设置token
         * */
		setToken: function(token) {
			if (typeof(__RRXN) != 'undefined') {
				window.__RRXN.get_check_x = token;
			} else {
				window.__RRXN = {
					"get_check_x": token,
					"requestToken": "942418482"
				};
			}
			$("input[name='_rtk']").each(function() {
				$(this).val(token);
			});
		},
        /**
         * 取得token
         * */
		getToken: function() {
			if (typeof(__RRXN) != 'undefined') {
				return window.__RRXN.get_check_x;
			}
			return "";
		},

        //分享活动
		share: function(sourceId, callback) {
			$.proxyAjax({
				url: "http://base.yx.renren.com/api/http/shine/share",
				data: {
					"sid": sourceId,
					"api_key": "5833d4926ff148adb4015cc977f77d8f"
				},
				type: "POST",
				dataType: "json",
				success: function(data) {
					if (callback) {
						callback(data);
					};
				}
			});
		},
      showalbums:function(options){
        var callback = options.callback;
        var maxnum = options.maxnum;
        var uid = options.uid;
        var winheight = jQuery(window).height();
        var winwidth = jQuery(window).width();
        jQuery('body').append('<div id="albumcover"><img src="images/load.gif" /></div>\
          <div class="albumsbox">\
          <ul class="boxtopnav">\
          <li class="picselected">已选照片</li><li class="backalb ed">相册列表</li><li class="piclist">照片列表</li>\
          </ul>\
          <div class="albumsboxlist">\
          <div class="albumslist" id="ablpiced"><div class="box"></div></div>\
          <div class="albumslist" id="abls"><div class="box"></div></div>\
          <div class="albumslist" id="ablpiclist"><div class="box"></div></div>\
          </div>\
          <ul class="boxbotnav">\
          <li class="donechose ed">完成选择</li><li class="cancelchose">取消选择</li>\
          </ul>\
        </div>');
        var childbox = jQuery('.albumsboxlist').children();
        childbox.eq(0).css({'left':-winwidth,"z-index":3});
        childbox.eq(2).css({'left':winwidth,"z-index":2});
        jQuery('.albumsboxlist').css('height',winheight-90);
        childbox.css('height',winheight-90);
        childbox.eq(1).children().css('width',parseInt(winwidth/144)*144);
        childbox.eq(0).children().css('width',parseInt(winwidth/103)*103);
        childbox.eq(2).children().css('width',parseInt(winwidth/103)*103);
        Zepto.yx.ajax({
          url:"http://base.yx.renren.com/api/http/album/list?format=2&callback=?&"+Math.random(),
          data:{'uid':uid},
          dataType:"json",
          type:"GET",
          success:function(data){
            var str ='';
            jQuery.each(data.albums,function(i,n){
              str+='<p class="alb" albumid="'+n.albumId+'" ownerid="'+n.ownerId+'"><span class="img"><img data-original="'+n.coverUrl+'" src="images/load.gif" /></span><span class="nums">'+n.albumName+'【'+n.photoCount+'】</span></p>';
            });
            jQuery('#abls .box').html('');
            jQuery('#abls .box').append(str);
            jQuery('#albumcover').fadeOut(300);
            jQuery('#abls img[data-original]').each(function(i,n){
              var lazywinh = jQuery(window).height();
              var thistop = jQuery(this).offset().top;
              jQuery(this).attr('thistop',thistop);
              if(thistop<=lazywinh){
                jQuery(this).attr('src',jQuery(this).attr('data-original'));
              }
            })
          }
        });
        jQuery('.albumsbox').on('click','p.alb',function(){
          jQuery('#albumcover').show();
          var albumid=jQuery(this).attr('albumid');
          var ownerid=jQuery(this).attr('ownerid');
          Zepto.yx.ajax({
            url:"http://base.yx.renren.com/api/http/photo/list?format=1&callback=?&curpage=0&pagesize=1000&"+Math.random(),
            data:{'albumid':albumid,'uid':ownerid},
            dataType:"json",
            type:"GET",
            success:function(data){
              var str ='';
              jQuery.each(data.photos,function(i,n){
                str+='<p class="pic" datasrc="'+n.headUrl+'" databig="'+n.largeUrl+'" picid="'+n.photoId+'"><span class="img"><img data-original="'+n.headUrl+'" src="images/load.gif" type="lazy" /></span></span></p>';
              });
              jQuery('#ablpiclist .box').html('');
              jQuery('#ablpiclist .box').append(str);
              jQuery('#albumcover').fadeOut('fast',function(){
                childbox.eq(2).clearQueue().stop().animate({'left':0});
                jQuery('.albumsbox li.backalb,.albumsbox li.picselected').removeClass('ed');
                jQuery('.albumsbox li.piclist').addClass('ed');
                jQuery('.albumsbox li.backalb').html('返回相册列表');
              });
              jQuery('#ablpiclist img[data-original]').each(function(i,n){
                var lazywinh = jQuery(window).height();
                var thistop = jQuery(this).offset().top;
                if(thistop<=lazywinh){
                  jQuery(this).attr('src',jQuery(this).attr('data-original'));
                }
              })
            }
          });
        }).on('click','p.pic',function(){
          if(jQuery(this).hasClass('piced')){
            jQuery(this).removeClass('piced');
            var pid = jQuery(this).attr('picid');
            jQuery('#ablpiced p.piced').each(function(index){
              if(jQuery(this).attr('picid')==pid){
                jQuery(this).remove();
              }
            })
          }else{
            if((jQuery('#ablpiced p.piced').length+jQuery('#ablpiced p.sed').length)>=maxnum){
              jQuery.yx.alert({'text':"最多选择"+maxnum+"张照片"});
            }else{
              jQuery(this).addClass('piced');
              var clone = jQuery(this).clone();
              jQuery('#ablpiced .box').append(clone);
            }
          }
        }).on('click','li.backalb',function(){
          jQuery('#albumcover').show();
          childbox.eq(0).clearQueue().stop().animate({'left':-winwidth});
          childbox.eq(2).clearQueue().stop().animate({'left':winwidth});
          jQuery('.albumsbox li.piclist,.albumsbox li.picselected').removeClass('ed');
          jQuery('.albumsbox li.backalb').addClass('ed');
          jQuery('.albumsbox li.backalb').html('相册列表');
          jQuery('#albumcover').hide();
        }).on('click','li.picselected',function(){
          jQuery('#albumcover').show();
          jQuery('#ablpiced .box').children().each(function(){
            jQuery(this).attr('class','sed');
          })
          childbox.eq(0).clearQueue().stop().animate({'left':0},function(){
            jQuery.yx.alert({"text":"点击可删除已选图片"})
          });
          jQuery('.albumsbox li.piclist,.albumsbox li.backalb').removeClass('ed');
          jQuery('.albumsbox li.picselected').addClass('ed');
          jQuery('#albumcover').hide();

        }).on('click','p.sed span',function(){
          jQuery(this).parent().remove();
        }).on('click','li.donechose',function(){
          var picarr = new Array();
          jQuery('#ablpiced p.sed,#ablpiced p.piced').each(function(index){
            var obj = new Object();
            obj.photoid=jQuery(this).attr('picid');
            obj.smallurl=jQuery(this).attr('datasrc');
            obj.largeurl=jQuery(this).attr('databig');
            picarr.push(obj);
            obj=null;
          })
          jQuery('.albumsbox').off();
          jQuery('#abls').off();
          jQuery('#ablpiclist').off();
          jQuery('.albumsbox').remove();
          jQuery('#albumcover').remove();
          callback(picarr);
        }).on('click','li.cancelchose',function(){
          jQuery('.albumsbox').off();
          jQuery('#abls').off();
          jQuery('#ablpiclist').off();
          jQuery('.albumsbox').remove();
          jQuery('#albumcover').remove();
        })
        jQuery('#abls').scroll(function(){
          jQuery('#abls img[data-original]').each(function(i,n){
            var lazywinh = jQuery(window).height();
            var lazyscro = jQuery('#abls').scrollTop();
            var thistop = jQuery(this).offset().top;
            if(thistop<=(lazywinh+50)){
              jQuery(this).attr('src',jQuery(this).attr('data-original'));
              jQuery(this).removeAttr('data-original');
            }
          })
        })
        jQuery('#ablpiclist').scroll(function(){
          jQuery('#ablpiclist img[data-original]').each(function(i,n){
            var lazywinh = jQuery(window).height();
            var lazyscro = jQuery('#ablpiclist').scrollTop();
            var thistop = jQuery(this).offset().top;
            if(thistop<=(lazywinh+50)){
              jQuery(this).attr('src',jQuery(this).attr('data-original'));
              jQuery(this).removeAttr('data-original');
            }
          })
        })
      },
        /**
         * 好友选择器
         * */
		selectFriends: function(options){
            var oFri = new $.yx.Friends();
            oFri.select(options);
		},
		alert: function(title, msg, callback) {
			$('body').append('<div class="jqmOverlay"></div>');
			var title = title;
			var msg = msg;
			var text = "";
			text = text + '<div class="wep-appalert"><div class="appalert">';
			text = text + '<div class="appalert-title">' + title + '</div>';
			text = text + '<div class="appalert-msg">' + msg + '</div>';
			text = text + '<div class="appalert-btn"><p>确定</p></div>';
			text = text + '</div></div>';
			$('body').append(text);
			$('.wep-appalert .appalert-btn p').click(function() {
				$('.jqmOverlay').remove();
				$('.wep-appalert').remove();
			})
		},
		tips: function(msg,callback){
            var str = msg;
            $('body').append('<div class="pop-tips"><p>'+str+'</p></div>');
            setTimeout(function(){
                $('.pop-tips').animate({opacity:0,top:'40%'},200,'ease-out',function(){
                    $('.pop-tips').remove();
                    if(callback){
                        callback();
                    }
                });
            },3000);
		}
    })

    /**
     *新建弹窗模块
     * */
	$.yxappwindow = function(t, p) {
		if (t.p && t.p.status == 1) {
			return false;
		};
        //弹窗默认变量
		p = $.extend({
			title: "新建窗口",
			msg: "",
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			status: 0,
			marginTop: 0,
			marginLeft: 0,
			close: true,
            buttons:null
		},p);

        //w对象用以创建dom弹窗元素
		var w = {
            //创建浮层的外框方便show和hide
			createDialog: function(t) {
				var body = $('<div class="dialog_content" style="height:100%;"><div class="dialog_body" style="height:100%;">' + p.msg + '</div></div>');
                //增加额外功能按钮（可选）
				if (p.buttons) {
					var buttons = $('<div class="dialog_buttons" style=""></div>');
					for (var i = 0; i < p.buttons.length; i++) {
						var t = $('<input type="button" class="' + p.buttons[i]['className'] + '" value="' + p.buttons[i]['name'] + '" dialog="' + i + '"/>');
						var callback = p.buttons[i]['callback'];
						if (callback) {
							$(t).bind("click",
							function() {
								var caller = p.buttons[$(this).attr("dialog")]['callback'];
								if (p.close) {
									w._remove();
								};
								if (caller) {
									caller.call();
								};
							});
						} else {
							$(t).bind("click",
							function() {
								if (p.close) {
									w._remove();
								}
							});
						};
						$(buttons).append(t);
					};
					$(body).append(buttons);
				};
				$(t).append(body);
			}
		};

		w.createDialog(t);
		p.top = 0;
		p.left = 0;
		p.marginTop = 0;
		p.marginLeft = 0;
		$(t).css({
			position: 'fixed',
            width:'100%',
			marginTop: p.marginTop,
			marginLeft: p.marginLeft,
			left: p.left,
			top: p.top,
			display: 'block',
			height: p.width,
            background:'#fff',
			"z-index": 2147483646
		});
		p.status = 1;
		t.w = w;
		t.p = p;
	};

    /**
     *展示浮层
     * */
	$.fn.yxappwinShow = function(options) {
		return this.each(function() {
			Zepto.yxappwindow(this, options);
		});
	};
	$.fn.yxwinClose = function() {
		return this.each(function() {
			Zepto(this).remove();
			this.p.status = 0;
		});
	};
	Zepto.get = function(url, data, callback, type) {
			if (Zepto.isFunction(data)) {
				type = type || callback;
				callback = data;
				data = null;
			}
			return Zepto.yx.ajax({
				url: url,
				type: "get",
				dataType: type,
				data: data,
				success: callback
			});
	}
	Zepto.post = function(url, data, callback, type) {
			if (Zepto.isFunction(data)) {
				type = type || callback;
				callback = data;
				data = null;
			}
			return Zepto.yx.ajax({
				url: url,
				type: "post",
				dataType: type,
				data: data,
				success: callback
			});
	}
	Zepto.getJSON = function(url, data, callback) {
			if (Zepto.isFunction(data)) {
				callback = data;
				data = null;
			}
			return Zepto.yx.ajax({
				url: url,
				type: "get",
				dataType: 'json',
				data: data,
				success: callback
			});
	}
    //代理跨域请求
    $.proxyAjax = function(options){
        if(options){
            __options = options;
        }else{
            options = __options;
        }
        //设置默认值
        var defaluts = {
            proxyUrl:"api/ajaxproxy.htm"
        };
        options = $.extend(defaluts,options);
        //序列话发送数据
        if ( options.data && typeof options.data !== "string" ) {
            options.data = $.param(options.data, true );
        }
        var data = options.data || "";
        //自动为每次提交添加token和_rtk;
        if(typeof(__RRXN) != 'undefined'){
            if (__RRXN.get_check && !/[\?|\&]requestToken=/.test(data)) {
                data += (data ? "&": "") + "requestToken=" + __RRXN.get_check;
            }
            if (__RRXN.get_check_x && !/[\?|\&]_rtk=/.test(data)) {
                data += (data ? "&": "") + "_rtk=" + __RRXN.get_check_x;
            }
        }
        options.data = data;
        var findProto = /^http[s]?:\/\//gi;
        //取请求地址的域
        var hosts = options.url.replace("http://","").replace("https://","").split("/").slice(0,1).join();
        //如果跨域通过代理页面进行
        if(findProto.test(options.url) && hosts != window.location.host){
            //取得协议:"http:" 或"https:";
            var protos = options.url.split("/").slice(0,1).join();
            //设置当前页面的域为renren.com
            document.domain = $.yxparam.domains;
            //将代理页面的域以_连接作为其id
            var proxyFreamId = hosts.replace(/\./g,"_"); 
            if($("#"+proxyFreamId).length == 0) {
                $("#"+proxyFreamId).attr("load",false);
                $("body").prepend("<iframe id='"+proxyFreamId+"' src='"+protos+"//"+hosts+"/"+options.proxyUrl+"' style='display:none;'></iframe>");
                $("#"+proxyFreamId).on('load',function(){
                    $(this).attr("load",true);
                    var proxyAjax = document.getElementById(proxyFreamId).contentWindow.jQuery;
                    proxyAjax.ajax(options);
                    options = false;
                });
            }else{
                if($("#"+proxyFreamId).attr("load")){
                    var proxyAjax = document.getElementById(proxyFreamId).contentWindow.jQuery;
                    proxyAjax.ajax(options);
                }else{
                    setTimeout(arguments.callee, 500);
                }
            }
        } else {//不跨域正常ajax
            $.ajax(options);
        };
    };
    //好友选择器处理
    var Friends = function(){
        this.requestUrl = 'http://base.yx.renren.com/api/http/friend/list?format=2&callback=?&' + Math.random();
        this.searchUrl = 'http://base.yx.renren.com/api/http/friend/search2?' + Math.random();
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
            //取消选择好友
			.on('click','.btn-cancel',function(){
				that.friPop.remove();
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
					if(that.numSelected > defaults.maxNum){
						$.yx.alert('最多选择' + defaults.maxNum + '位好友');
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
                that.friPop.find('#numselected').html(that.numSelected);
			})
            //确定最终选择的好友
			.on('click','.btn-fri-ok',function(){
                if(that.numSelected>0){
                    if(that.numSelected>=defaults.minNum){
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
					    $.yx.alert('至少选择'+defaults.minNum+'好友');
                    }
                }else{
					$.yx.alert('请选择好友');
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
        loadData:function()
        {
			var that = this;
            //加载
			if(that.loadingstatus==1){
				that.loadingstatus = 2;
				that.friPop.find('#btnFriLoadingTips')
				.html('努力加载中 <img style="width:1.6rem;height:1.6rem;vertical-align:middle;" src="images/loading2.gif">');
				$.proxyAjax({
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
							 	obj.userName + "' fhead='" + obj.tinyUrl + "'><p class='fri-img-box'><img  class='fri-img' src='" + 
							 	obj.tinyUrl + "' alt='" + obj.tinyUrl +
							  	"' /><em class='icon icon-checkmark-circle' title='选择'></em></p><p class='fri-name'>" + obj.userName + "</p></li>");
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
  			'<div class="top-bar tc">'+
			'<a href="javascript:;" class="btn-cancel"><span class="icon icon-arrow-left"></span><span class="icon-label">返回</span></a>'+
			'<span class="title">好友列表(<em id="recsize">'+this.recsize+'</em>)</span>'+
			'<a href="javascript:;" class="btn-topbar-r btn-fri-ok">确定(<em id="numselected">0</em>)</a>'+
			'</div>'+
  			'<div class="search-bar">'+
    		'<div class="search-box">'+
      		'<input id="searchText" type="search" class="search-text" placeholder="搜索好友"/>'+
     		'<a href="javascript:;" id="btnFriSearch" class="icon icon-search btn-search btn-fri-search" title="搜索"></a>'+
	 		'</div>'+
 	  		'</div>'+
  			'<div class="flist-box">'+
   			'<ul id="ulList" class="ul-flist clearfix">'+
			this.listarr.join('')+
  			'</ul></div>'+
  			'<div class="loading-bar"><a id="btnFriLoadingTips" href="javascript:;" class="btn-nextpage">点击加载下一页</a></div>'+
 			'</div>';
			this.friPop = $(strDom).appendTo('body');
        },
        initData:function()
        {
            this.createDom();
            this.loadData();
        },
        search:function()
        {
			var that = this;
			that.loadingstatus = 1;
			if(that.loadingstatus==1){
				that.loadingstatus = 2;
				that.friPop.find('#btnFriLoadingTips').html('努力加载中 <img style="width:1.6rem;height:1.6rem;vertical-align:middle;" src="images/loading2.gif">');
				$.proxyAjax({
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
        select:function(options)
        {
            var options = $.extend({type:1},options);
            this._select(options);
        }
    }
    Zepto.yx.Friends = Friends;
    Zepto(function(){
        Zepto("form").each(function(){
            Zepto(this).append("<input type='hidden' name='_rtk' value='"+Zepto.yx.getToken()+"'>");
        });
    });
})(Zepto);

