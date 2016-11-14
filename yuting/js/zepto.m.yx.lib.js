/**
 *zepto.yx.mobileLib.js
 *v 1.0
 *wangchao
 * */      
;(function($){
    //常用变量
    /**
     * @module yxparam 
     * */
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

    $.yx = $.extend({
        /**
        * @method isLogin 
        * @for yx 
        * @param {Function} callback 回调  
        * @return 无
        * */
        isLogin : function(callback){
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
        /**
        * @method toLogin 
        * */
        toLogin : function(callback) {
            this.isLogin(function(flag){
                if(flag == 0){
                    $.yx._toLogin(callback);
                }else{
                    callback(1);
                }
            });
        },
        ll:function(){
			$.proxyAjax({
				url: "http://passport.renren.com/RL.do?p3p=1",
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
		_toLogin: function(callback) {
			document.domain = "renren.com";
			$.yxparam.loginback = callback;
			var loginUrl = "http://pagetab.yx.renren.com/html5/api/shine/user?callback=jQueryxxx&errCode=100001&rr=0&ver=2";
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
        /**
         * 好友选择器
         * */
		mNotice: function(options){
            var oFri = new Friends();
            oFri.notice(options);
		},
		mSelectFriends: function(options){
            var oFri = new Friends();
            oFri.select(options);
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
			$.yxappwindow(this, options);
		});
	};
	$.fn.yxwinClose = function() {
		return this.each(function() {
			Zepto(this).remove();
			this.p.status = 0;
		});
	};

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
})(Zepto);

