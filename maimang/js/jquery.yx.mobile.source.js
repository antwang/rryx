(function($) {
  var _load = jQuery.fn.load,
  rscript = /<script(.|\s)*?\/script>/gi,__options;
  $.extend({
    yxparam : {
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
    },
    yx : {
      islogin : function(callback){
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
			share: function(sourceId, callback) {
				jQuery.proxyAjax({
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
			_tologin: function(callback) {
				document.domain = "renren.com";
				$.yxparam.loginback = callback;
				var loginUrl = "http://pagetab.yx.renren.com/html5/api/shine/user?callback=jQueryxxx&errCode=100001&rr=0";
				$.yx._getObj("shineLoginMessager").yxappwinShow({
					close: false,
					width: 320,
					height: 420,
					title: "人人网活动登录",
					msg: "<iframe width='320' height='"+document.documentElement.clientHeight+"' frameborder='0' src='" + loginUrl + "'></iframe>"
				});
			},
			/** select friends windows */
			_selectFriends: function(options) {
				document.domain = "renren.com";
				jQuery.yxparam.friendsback = options['callback'];
				var maxNum = options['maxNum'];
				var type = options['type'];
				var sid = options['sid'];
				var url = "http://shine.yx.renren.com/api/friends?type=" + type + "&maxNum=" + maxNum + "&sid=" + sid;
				$.yx._getObj("shineFriendsMessager").yxwinShow({
					close: false,
					width: 655,
					height: 470,
					title: "好友信息",
					msg: "<iframe width='620px' height='350px' frameborder='0' src='" + url + "'></iframe>"
				});
			},
			_getObj: function(id) {
				if ($("#" + id).length == 0) {
					$("body").append("<div id='" + id + "'></div>");
				}
				return $("#" + id);
			},
      tologin : function(callback) {
        this.islogin(function(flag){
          if(flag == 0){
            $.yx._tologin(callback);
          }else{
            callback(1);
          }
        });
      },
      setToken : function(token){
        if(typeof(__RRXN) != 'undefined'){
          window.__RRXN.get_check_x = token;
        }else{
          window.__RRXN = {"get_check_x":token,"requestToken":"942418482"};
        }
        $("input[name='_rtk']").each(function(){   
          $(this).val(token);
            });
      },
      getToken : function(){
        if(typeof(__RRXN) != 'undefined'){
          return window.__RRXN.get_check_x;
        }
        return "";
      },
      uploadback : function(data){
        if($.yxparam.uploadback){
          $.yxparam.uploadback(data);
        }
      },  
      iframe : function(){
        if(top == self){
          return false;
        }else{
          return true;
        }
      },
      ___getPageSize : function(){
        var xScroll, yScroll;
        if (window.innerHeight && window.scrollMaxY) {  
          xScroll = window.innerWidth + window.scrollMaxX;
          yScroll = window.innerHeight + window.scrollMaxY;
        } else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
          xScroll = document.body.scrollWidth;
          yScroll = document.body.scrollHeight;
        } else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
          xScroll = document.body.offsetWidth;
          yScroll = document.body.offsetHeight;
        };
        var windowWidth, windowHeight;
        if (self.innerHeight) { // all except Explorer
          if(document.documentElement.clientWidth){
            windowWidth = document.documentElement.clientWidth; 
          } else {
            windowWidth = self.innerWidth;
          };
          windowHeight = self.innerHeight;
        } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
          windowWidth = document.documentElement.clientWidth;
          windowHeight = document.documentElement.clientHeight;
        } else if (document.body) { // other Explorers
          windowWidth = document.body.clientWidth;
          windowHeight = document.body.clientHeight;
        };
        if(yScroll < windowHeight){
          pageHeight = windowHeight;
        } else { 
          pageHeight = yScroll;
        };
        if(xScroll < windowWidth){  
          pageWidth = xScroll;    
        } else {
          pageWidth = windowWidth;
        };
        arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight);
        return arrayPageSize;
      },
      ___getPageScroll : function(){
        var xScroll, yScroll;
        if (self.pageYOffset) {
          yScroll = self.pageYOffset;
          xScroll = self.pageXOffset;
        } else if (document.documentElement && document.documentElement.scrollTop) {   // Explorer 6 Strict
          yScroll = document.documentElement.scrollTop;
          xScroll = document.documentElement.scrollLeft;
        } else if (document.body) {// all other Explorers
          yScroll = document.body.scrollTop;
          xScroll = document.body.scrollLeft; 
        };
        arrayPageScroll = new Array(xScroll,yScroll);
        return arrayPageScroll;
      },
      addTrack : function(trackId){
        var base = "http://track.yx.renren.com/redirect/";
        var img = new Image(1, 1);
        img.src = base+trackId;
        img.onload = function() {
          __voidf();
        };
        return false;
      },
      ajax : function(options) {
        if ( options.data && typeof options.data !== "string" ) {
          options.data = jQuery.param(options.data, true );
        }
        var data = options.data || "";
        if(typeof(__RRXN) != 'undefined'){
          if (__RRXN.get_check && !/[\?|\&]requestToken=/.test(data)) {
            data += (data ? "&": "") + "requestToken=" + __RRXN.get_check;
            
          }
          if (__RRXN.get_check_x && !/[\?|\&]_rtk=/.test(data)) {
            data += (data ? "&": "") + "_rtk=" + __RRXN.get_check_x;
          }
        }
        options.data = data;
        jQuery.ajax(options);
      },
      alert: function(options){
        var str = options.text;
        jQuery('body').append('<p class="appalert">'+str+'</p>');
        setTimeout(function(){
          jQuery('p.appalert').animate({'opacity':0,'margin-top':30},function(){
            jQuery('p.appalert').remove();
            if(options.callback){
              options.callback();
            }
          });
        },1000);
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
        jQuery.proxyAjax({
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
          jQuery.proxyAjax({
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
      appselectFriends : function(options){
        var winheight = jQuery(window).height();
        var winwidth = jQuery(window).width();
        var fstr = '';
        jQuery('body').append('<div class="jqmOverlay"></div><div id="fricover"><img src="images/load.gif" /></div>');
        jQuery('body').append('<div class="wap_friends">\
          <div class="wap_pathnav">\
          <p class="search">\
          <span class="mybtn">搜索</span>\
          <input type="text" class="text" value="" />\
          </p>\
          <p class="te">好友列表<span></span></p>\
          </div>\
          <div class="fmess">\
          <p class="fselected">已选好友(<span>0</span>)</p>\
          <p class="fdone">完成选择</p>\
          </div>\
          <div class="frList" id="wapfrList">\
          <ul class="piclist"></ul>\
          <ul class="picedlist"></ul>\
          </div>\
          </div>');
        var fmaxNum = options.maxnum?options.maxnum:100;
        var callback = options.callback;
        var fuidarr = new Array();
        var fjQueryfrLists = "";
        var fnowpage = 1;
        var fmaxpage = 0;
        var goleft = (winwidth-parseInt(winwidth/125)*125)/2;
        var boxcover = jQuery('#fricover');
        jQuery('.wap_friends .frList,.wap_friends .frList ul.picedlist').css('height',winheight-82);
        jQuery('.wap_friends .frList ul.piclist').css({'width':parseInt(winwidth/73)*73});
        jQuery('.wap_friends .frList ul.picedlist').css({'left':-winwidth});
        var ajaxurl = "http://base.yx.renren.com/api/http/friend/list?format=2&callback=?&"+Math.random();
        jQuery.proxyAjax({
          url:ajaxurl,
          data:{},
          dataType:"json",
          type:"GET",
          success:function(data){
            var listarr = new Array();
            jQuery.each(data.friends,function(i,obj){
              listarr.push("<li uid='"+obj.userId+"' uname='"+obj.userName+"' bighead='"+obj.headUrl+"' tinhead='"+obj.tinyUrl+"'><p class='img'><img src='images/load.gif' data-original='"+obj.tinyUrl+"' alt='' /></p><p class='name'>"+obj.userName+"</p></li>");
            });
            jQuery('.jqmOverlay').fadeOut(200);
            jQuery('.wap_friends .frList ul.piclist').html(listarr.join(''));
            jQuery('.wap_friends p.te span').html("("+data.friends.length+"个)");
            jQuery('#wapfrList img[data-original]').each(function(i,n){
              var lazywinh = jQuery(window).height();
              var thistop = jQuery(this).offset().top;
              if(thistop<=lazywinh){
                jQuery(this).attr('src',jQuery(this).attr('data-original'));
              }
            });
            boxcover.fadeOut(300);
          }
        });
        jQuery('#wapfrList').scroll(function(){
          jQuery('#wapfrList img[data-original]').each(function(i,n){
            var lazywinh = jQuery(window).height();
            var lazyscro = jQuery('#ablpiclist').scrollTop();
            var thistop = jQuery(this).offset().top;
            if(thistop<=(lazywinh+50)){
              jQuery(this).attr('src',jQuery(this).attr('data-original'));
              jQuery(this).removeAttr('data-original');
            }
          })
        })
        jQuery('.wap_friends').on('click','.piclist li',function(){
          if(jQuery(this).hasClass('piced')){
            jQuery(this).removeClass('piced');
            jQuery('.wap_friends .fselected span').html( parseInt(jQuery('.wap_friends .fselected span').html())-1)
            var uid = jQuery(this).attr('uid');
            jQuery('.picedlist li.piced').each(function(index){
              if(jQuery(this).attr('uid')==uid){
                jQuery(this).remove();
              }
            })
          }else{
            if(jQuery('.picedlist li.piced').length>=fmaxNum){
              jQuery.yx.wapalert({'text':"最多选择"+fmaxNum+"位好友"});
            }else{
              jQuery('.wap_friends .fselected span').html( parseInt(jQuery('.wap_friends .fselected span').html())+1)
              jQuery(this).addClass('piced');
              var clone = jQuery(this).clone();
              jQuery('ul.picedlist').append(clone);
            }
          }
        }).on('click','.fselected',function(){
          if(jQuery(this).html()=="返回好友列表"){
            jQuery('.wap_friends .fselected').html(fstr);
            jQuery('.wap_friends .frList ul.picedlist').clearQueue().stop().animate({'left':-winwidth});
            jQuery('.wap_friends .fselected span').html(jQuery('.picedlist li.piced').length)
          }else{
            fstr = jQuery('.wap_friends .fselected').html();
            jQuery('.wap_friends .fselected').html('返回好友列表');
            jQuery('.wap_friends .frList ul.picedlist').clearQueue().stop().animate({'left':0},function(){
              setTimeout(function(){
                jQuery.yx.alert({"text":"点击可删除已选图片"})
              },500)
            });
          }
        }).on('click','.picedlist li',function(){
          var uid = jQuery(this).attr('uid');
          jQuery('.piclist li.piced').each(function(index){
            if(jQuery(this).attr('uid')==uid){
              jQuery(this).removeClass('piced');
            }
          })
          jQuery(this).remove();
        }).on('click','.fdone',function(){
          var picarr = new Array();
          jQuery('.wap_friends .picedlist li').each(function(index){
            var obj = new Object();
            obj.fid=jQuery(this).attr('uid');
            obj.fname=jQuery(this).attr('uname');
            obj.headurl=jQuery(this).attr('tinhead');
            obj.largeurl=jQuery(this).attr('bighead');
            picarr.push(obj);
            obj=null;
          })
          jQuery('.wap_friends').off();
          jQuery('#wapfrList').off();
          jQuery('.wap_friends').remove();
          jQuery('.jqmOverlay').remove();
          callback(picarr);
        }).on('blur','input.text',function(){
          var regstr = /\s/ig;
          var uname = jQuery('.wap_friends input.text').val().replace(regstr,'');
          ajaxurl = "http://base.yx.renren.com/api/http/friend/search?format=2&callback=?&"+Math.random();
          if(uname==""){
            ajaxurl = "http://base.yx.renren.com/api/http/friend/list?format=2&callback=?&"+Math.random();
          }
          jQuery.proxyAjax({
            url:ajaxurl,
            data:{"name":uname},
            dataType:"json",
            type:"GET",
            success:function(data){
              jQuery('.wap_friends .frList ul.piclist').html('');
              var listarr = new Array();
              jQuery.each(data.friends,function(i,obj){
                listarr.push("<li uid='"+obj.userId+"' uname='"+obj.userName+"' bighead='"+obj.headUrl+"' tinhead='"+obj.tinyUrl+"'><p class='img'><img src='images/load.gif' data-original='"+obj.tinyUrl+"' alt='' /></p><p class='name'>"+obj.userName+"</p><p class='po'></p></li>");
              });
              jQuery('.jqmOverlay').fadeOut(200);
              jQuery('.wap_friends .frList ul.piclist').html(listarr.join(''));
              jQuery('.wap_friends p.te span').html("("+data.friends.length+"个)");
              jQuery('#wapfrList img[data-original]').each(function(i,n){
                var lazywinh = jQuery(window).height();
                var thistop = jQuery(this).offset().top;
                if(thistop<=lazywinh){
                  jQuery(this).attr('src',jQuery(this).attr('data-original'));
                }
              })
              jQuery('.wap_friends .picedlist li').each(function(index){
                var uid = jQuery(this).attr('uid');
                var str = 'ul.piclist li[uid="'+uid+'"]';
                jQuery(str).addClass('piced');
              })
            }
          })
        })
      },
      wapphoto:function(options){
        jQuery('body').append('<div id="phonecover"><img src="images/load.gif" /></div><div class="wapphoto" id="wapphoto">\
          <div class="photo"><canvas id="wapphotocanv" width="640" height="640"></canvas></div>\
          <ul>\
            <li class="done">完成</li><li class="cancel">取消</li><li class="remote">旋转</li>\
          </ul>\
          <div class="wapphotoadd" style="position:absolute; top:0; left:-999999px;">\
            <div class="img" style="position:absolute; top:0; left:0;"></div>\
            <canvas id="wapphptocava" width="1800" height="1800"></canvas>\
          </div>\
        </div>');
        var winheight = jQuery(window).height();
        var winwidth = jQuery(window).width();
        var fileid = options.fileid;
        var jaodu=0;
        var phonecover = jQuery('#phonecover');
        jQuery('#wapphoto .photo').css('height',winheight-41);
        var file = $(fileid)[0].files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        var cw = 0;
        var ch = 0;
        var stx = 0;
        var sty = 0;
        var y = 1800;
        var x = 1800;
        var backimg;
        var contexta;
        var fimg = new Image();
        reader.onload = function(e){
          var picimg = new Image();
          imgurl = this.result;
          picimg.src = imgurl;
          picimg.onload = function(){
            phonecover.fadeOut(500);
            var w= this.width;
            var h= this.height;
            jQuery('.wapphotoadd .img img').remove();
            jQuery('.wapphotoadd .img').append(picimg);
            var iw = jQuery('.wapphotoadd .img').width();
            var ih = jQuery('.wapphotoadd .img').height();
            var canvas = jQuery('#wapphptocava')[0];
            var context = canvas.getContext('2d');
            context.fillStyle="#000000";
            context.fillRect(0,0,1800,1800);
            context.drawImage(picimg,0,0);
            var dataa = canvas.toDataURL("image/jpeg");
            oky:for(var i = 0; i<=1800;i++){
              var imgdatax = context.getImageData(0,(1800-i),1800,1);
              for(var ia = 0; ia<imgdatax.data.length;ia+=4){
                if(imgdatax.data[ia]==0 && imgdatax.data[ia+1]==0 && imgdatax.data[ia+2]==0){
                }else{
                  break oky;
                }
              }
              y--;
            }
            okx:for(var i = 0; i<=1800;i++){
              var imgdata = context.getImageData((1800-i),0,1,1800);
              for(var iaa = 0; iaa<imgdata.data.length;iaa+=4){
                if(imgdata.data[iaa]==0 && imgdata.data[iaa+1]==0 && imgdata.data[iaa+2]==0){
                }else{
                  break okx;
                }
              }
              x--;
            }
            x++;
            y++;
            jQuery('#wapphotocanv').attr({'width':300,'height':300*y/x});
            // alert(x+"*"+y);
            var canvasa = jQuery('#wapphotocanv')[0];
            contexta = canvasa.getContext('2d');
            contexta.fillRect(0,0,300,300*ih/iw);
            
            fimg.src = dataa;
            fimg.onload=function(){
              contexta.drawImage(fimg,0,0,1800*300/x,1800*300/x);
              backimg = canvasa.toDataURL("image/jpeg");
            }
          }
        }
        jQuery('#wapphoto').on('click','li.done',function(){
          options.callback(backimg);
          jQuery('#wapphoto').off();
          jQuery('#wapphoto').remove();
        }).on('click','li.cancel',function(){
          jQuery('#wapphoto').off();
          jQuery('#wapphoto').remove();
        }).on('click','li.remote',function(){
          jaodu+=90;
          if(jaodu%360==0){
            cw = 1800*300/x;
            ch = 1800*300/x;
            stx = 0;
            sty = 0;
            jQuery('#wapphotocanv').attr({'width':300,'height':300*y/x});
          }else if(jaodu%360==90){
            cw = 1800*300/y;
            ch = 1800*300/y;
            stx = 300;
            sty = 0;
            jQuery('#wapphotocanv').attr({'width':300,'height':300*x/y});
          }else if(jaodu%360==180){
            cw = 1800*300/x;
            ch = 1800*300/x;
            stx = 300;
            sty = 300*y/x;
            jQuery('#wapphotocanv').attr({'width':300,'height':300*y/x});
          }else if(jaodu%360==270){
            cw = 1800*300/y;
            ch = 1800*300/y;
            stx = 0;
            sty = 300*x/y;
            jQuery('#wapphotocanv').attr({'width':300,'height':300*x/y});
          }
          var canvasb = jQuery('#wapphotocanv')[0];
          contexta = canvasb.getContext('2d');
          var rote = jaodu*Math.PI/180;
          contexta.setTransform(Math.cos(rote),Math.sin(rote),-Math.sin(rote),Math.cos(rote),stx,sty);
          contexta.drawImage(fimg,0,0,cw,ch);
          backimg = canvasb.toDataURL("image/jpeg");
          // contexta.drawImage(fimg,0,0,1800*winwidth/x,1800*winwidth/x);
        })
      }
    }
  });
  

	$.yxwindow = function(t, p) {

		if (t.p && t.p.status == 1) {
			return false;
		};
		p = $.extend({
			title: "新建窗口",
			msg: "",
			top: 0,
			left: 0,
			width: 300,
			height: 200,
			status: 0,
			marginTop: 0,
			marginLeft: 0,
			close: true,
			overlayClass: 'jqmOverlay'
		},
		p);

		var w = {
			cTable: function(t) {
				$(p.table).remove();
				var table = $("<table></table>");
				p.table = table;
				$(table).addClass("pop_dialog_table").css({
					width: '100%'
				});
				var tbody = $("<tbody></tbody>");
				var trContent = $("<tr><td class=\"pop_border\"></td></tr>");
				var dialog = $("<td class='pop_content' style='text-align:left;'></td>");
				this._cDialog(dialog);
				$(trContent).append(dialog);
				$(trContent).append("<td class=\"pop_border\"></td>");
				$(tbody).append("<tr><td class='pop_topleft'></td><td class='pop_border'></td><td class='pop_topright'></td></tr>");
				$(tbody).append(trContent);
				$(tbody).append("<tr><td class='pop_bottomleft'></td><td class='pop_border'></td><td class='pop_bottomright'></td></tr>");
				$(table).append(tbody);
				$(t).append(table);
			},
			_cDialog: function(content) {
				var title = $("<h2><span>" + p.title + "</span></h2>");
				$(content).append(title);
				var body = $("<div class='dialog_content'><div class='dialog_body'>" + p.msg + "</div><div>");
				if (p.buttons) {
					var buttons = $("<div class='dialog_buttons' style=''></div>");
					for (var i = 0; i < p.buttons.length; i++) {
						var t = $("<input type='button' class='" + p.buttons[i]['className'] + "' value='" + p.buttons[i]['name'] + "' dialog='" + i + "'/>");
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
				$(content).append(body);
			},
			_remove: function() {
				//$(p.table).remove();
				$(p.table).css({
					"display": "none"
				});
				t.p.status = 0;
				$("#yxOverlayClass").remove();
			},
			appendOver: function(t) {
				var overlay = $("<div id='yxOverlayClass'></div>").addClass(p.overlayClass).css("height", $(document).height() + 'px').css("z-index", 2147483645);
				$(t).before(overlay);
			}
		};

		w.cTable(t);
		//repair ie6 bug
		if ($.yx.ie6() || $.yx.iframe()) {
			$(t).css({
				position: 'absolute',
				_position: 'absolute',
				width: p.width,
				display: 'block',
				_top: document.documentElement.scrollTop + ((document.documentElement.clientHeight - p.height) / 2),
				top: document.documentElement.scrollTop + ((document.documentElement.clientHeight - p.height) / 2),
				left: (($("body").width() - p.width) / 2),
				_left: (($("body").width() - p.width) / 2),
				"z-index": 2147483646
			});
			if ($.yx.iframe()) {
				if ($.yxparam.top == -1) {
					$(t).css("top", (($(window).height() - p.height) / (2 + $(window).scrollTop())) + "px");
				} else {
					$(t).css("top", $.yxparam.top + "px");
				};
			};
			var arrPageSizes = $.yx.___getPageSize();
			var arrPageScroll = $.yx.___getPageScroll();
			$(".window").css({
				top: arrPageScroll[1] + (arrPageSizes[3] / 10)
			});
		} else {
			p.top = '50%';
			p.left = '50%';
			p.marginTop = -($(p.table).height() / 2) + "px";
			p.marginLeft = -(p.width / 2) + "px";
			$(t).css({
				position: 'fixed',
				marginTop: p.marginTop,
				marginLeft: p.marginLeft,
				left: p.left,
				top: p.top,
				display: 'block',
				width: p.width,
				"z-index": 2147483646
			});
		};

		w.appendOver(t);
		p.status = 1;
		t.w = w;
		t.p = p;
	};
	//////////////////////////////////////////////
	$.yxappwindow = function(t, p) {
		if (t.p && t.p.status == 1) {
			return false;
		};
		p = $.extend({
			title: "新建窗口",
			msg: "",
			top: 0,
			left: 0,
			width: 320,
			height: 200,
			status: 0,
			marginTop: 0,
			marginLeft: 0,
			close: true,
			overlayClass: 'jqmOverlay'
		},
		p);

		var w = {
			cTable: function(t) {
				$(p.table).remove();
				var table = $("<table></table>");
				p.table = table;
				$(table).addClass("pop_dialog_table").css({
					width: '100%'
				});
				var tbody = $("<tbody></tbody>");
				var trContent = $("<tr><td class=\"pop_border\"></td></tr>");
				var dialog = $("<td class='pop_content' style='text-align:left;'></td>");
				this._cDialog(t);
				// $(trContent).append(dialog);
				// $(trContent).append("<td class=\"pop_border\"></td>");
				// $(tbody).append("<tr><td class='pop_topleft'></td><td class='pop_border'></td><td class='pop_topright'></td></tr>");
				// $(tbody).append(trContent);
				// $(tbody).append("<tr><td class='pop_bottomleft'></td><td class='pop_border'></td><td class='pop_bottomright'></td></tr>");
				// $(table).append(tbody);
				// $(t).append(table);
			},
			_cDialog: function(content) {
				// var title = $("<h2><span>" + p.title + "</span></h2>");
				// $(content).append(title);
				var body = $("<div class='dialog_content'><div class='dialog_body'>" + p.msg + "</div><div>");
				if (p.buttons) {
					var buttons = $("<div class='dialog_buttons' style=''></div>");
					for (var i = 0; i < p.buttons.length; i++) {
						var t = $("<input type='button' class='" + p.buttons[i]['className'] + "' value='" + p.buttons[i]['name'] + "' dialog='" + i + "'/>");
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
				$(content).append(body);
			},
			_remove: function() {
				//$(p.table).remove();
				$(p.table).css({
					"display": "none"
				});
				t.p.status = 0;
				$("#yxOverlayClass").remove();
			},
			appendOver: function(t) {
				var overlay = $("<div id='yxOverlayClass'></div>").addClass(p.overlayClass).css("height", $(document).height() + 'px').css("z-index", 2147483645);
				$(t).before(overlay);
			}
		};

		w.cTable(t);
		//repair ie6 bug
		if ($.yx.ie6() || $.yx.iframe()) {
			$(t).css({
				position: 'absolute',
				_position: 'absolute',
				width: p.width,
				display: 'block',
				// _top: document.documentElement.scrollTop + ((document.documentElement.clientHeight - p.height) / 2),
				// top: document.documentElement.scrollTop + ((document.documentElement.clientHeight - p.height) / 2),
				_top:0,
				top:0,
				left: (($("body").width() - p.width) / 2),
				_left: (($("body").width() - p.width) / 2),
				"z-index": 2147483646
			});
			if ($.yx.iframe()) {
				if ($.yxparam.top == -1) {
					$(t).css("top", (($(window).height() - p.height) / (2 + $(window).scrollTop())) + "px");
				} else {
					$(t).css("top", $.yxparam.top + "px");
				};
			};
			var arrPageSizes = $.yx.___getPageSize();
			var arrPageScroll = $.yx.___getPageScroll();
			$(".window").css({
				top: arrPageScroll[1] + (arrPageSizes[3] / 10)
			});
		} else {
			// p.top = '50%';
			p.top = 0;
			p.left = '50%';
			// p.marginTop = -($(p.table).height() / 2) + "px";
			p.marginTop = 0;
			p.marginLeft = -(p.width / 2) + "px";
			$(t).css({
				position: 'fixed',
				marginTop: p.marginTop,
				marginLeft: p.marginLeft,
				left: p.left,
				top: p.top,
				display: 'block',
				width: p.width,
				"z-index": 2147483646
			});
		};

		w.appendOver(t);
		p.status = 1;
		t.w = w;
		t.p = p;
	};
	//////////////////////////////////////////////
    

	$.fn.yxwinShow = function(options) {
		return this.each(function() {
			$.yxwindow(this, options);
		});
	};
	$.fn.yxappwinShow = function(options) {
		return this.each(function() {
			$.yxappwindow(this, options);
		});
	};
	$.fn.yxwinClose = function() {
		return this.each(function() {
			this.w._remove();
		});
	};

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
    if ( options.data && typeof options.data !== "string" ) {
      options.data = jQuery.param(options.data, true );
    }
    var data = options.data || "";
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
    var hosts = options.url.replace("http://","").replace("https://","").split("/").slice(0,1).join();
    if(findProto.test(options.url) && hosts != window.location.host){
      var protos = options.url.split("/").slice(0,1).join();  //取得协议 http https
      //设置当前的domain
      document.domain = $.yxparam.domains;
      var proxyFreamId = hosts.replace(/\./g,"_");  //proxy iframe id
            
            if($("#"+proxyFreamId).length == 0) {//第一次，创建dom
              $("#"+proxyFreamId).attr("load",false);
              $("body").prepend("<iframe id='"+proxyFreamId+"' src='"+protos+"//"+hosts+"/"+options.proxyUrl+"' style='display:none;'></iframe>");
              $("#"+proxyFreamId).load(function(){
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
    } else {
      $.ajax(options);
    };
  };
  
  function __voidf(){
    return false;
  }
  
  
  $.extend({
    post : function(url, data, callback, type) {
      if (jQuery.isFunction(data)) {
        type = type || callback;
        callback = data;
        data = undefined;
      }
      return jQuery.yx.ajax({
        url : url,
        type : "post",
        dataType : type,
        data : data,
        success : callback
      });
    },
    get : function(url, data, callback, type) {
      if (jQuery.isFunction(data)) {
        type = type || callback;
        callback = data;
        data = undefined;
      }
      return jQuery.yx.ajax({
        url : url,
        type : "get",
        dataType : type,
        data : data,
        success : callback
      });
    }
  });

  

  jQuery.fn.load = function( url, params, callback ) {
    if ( typeof url !== "string" ) {
      return _load.call( this, url );

    // Don't do a request if no elements are being requested
    } else if ( !this.length ) {
      return this;
    }

    var off = url.indexOf(" ");
    if ( off >= 0 ) {
      var selector = url.slice(off, url.length);
      url = url.slice(0, off);
    }

    // Default to a GET request
    var type = "GET";

    // If the second parameter was provided
    if ( params ) {
      // If it's a function
      if ( jQuery.isFunction( params ) ) {
        // We assume that it's the callback
        callback = params;
        params = null;

      // Otherwise, build a param string
      } else if ( typeof params === "object" ) {
        params = jQuery.param( params, jQuery.ajaxSettings.traditional );
        type = "POST";
      }
    }

    var self = this;
    var options = {
      url: url,
      type: type,
      dataType: "html",
      data: params,
      complete: function( res, status ) {
        // If successful, inject the HTML into all the matched elements
        if ( status === "success" || status === "notmodified" ) {
          // See if a selector was specified
          self.html( selector ?
            // Create a dummy div to hold the results
            jQuery("<div />")
              // inject the contents of the document in, removing the scripts
              // to avoid any 'Permission Denied' errors in IE
              .append(res.responseText.replace(rscript, ""))

              // Locate the specified elements
              .find(selector) :

            // If not, just inject the full result
            res.responseText );
        }

        if ( callback ) {
          self.each( callback, [res.responseText, status, res] );
        }
      }
    };
    // Convert data if not already a string
    if ( options.data && typeof options.data !== "string" ) {
      options.data = jQuery.param(options.data, true );
    }
    var data = options.data || "";
    if(typeof(__RRXN) != 'undefined'){
      if (__RRXN.get_check && !/[\?|\&]requestToken=/.test(data)) {
        data += (data ? "&": "") + "requestToken=" + __RRXN.get_check;
        
      };
      if (__RRXN.get_check_x && !/[\?|\&]_rtk=/.test(data)) {
        data += (data ? "&": "") + "_rtk=" + __RRXN.get_check_x;
      };
    };
    options.data = data;
    // Request the remote document
    jQuery.ajax(options);
  };
  /**
   * 只限于提交图片的应用
   */
  jQuery.fn.imgUpload = function(callback){
    document.domain = "renren.com";
    $.yxparam.uploadback = callback;
    var id = "__img_upload_frames";
    if($("#"+id).length == 0){
      $("body").prepend("<iframe name='"+id+"' id='"+id+"' src='about:blank' style='display:none;'></iframe>");
    }
    $(this).attr("target",id);
    $(this).attr("method","post");
    $(this).attr("action","http://shine.yx.renren.com/api/upload");
    $(this).attr("enctype","multipart/form-data");
    $(this).append("<input type='hidden' name='_rtk' value='"+jQuery.yx.getToken()+"'>");
    $(this).append("<input type='hidden' name='__fileName' value='"+$(this).find("input[type=file]").attr("name")+"'>");
    $(this).submit();
  };
  jQuery(function(){
    jQuery("form").each(function(){
      $(this).append("<input type='hidden' name='_rtk' value='"+jQuery.yx.getToken()+"'>");
    });
  });
})(jQuery);
