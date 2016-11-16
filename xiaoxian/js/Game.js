var curPage = '',curZhishu = 0;
var Game = function(){
	this.init();
}
Game.prototype = {
    constructor:Game,
	init:function(){
		var _self = this;
		preloadPictures([
						 "images/btns/btn_album.png",
						 "images/btns/btn_bian.png",
						 "images/btns/btn_close.png",
						 "images/btns/btn_done.png",
						 "images/btns/btn_draw.png",
						 "images/btns/btn_draw1.png",
						 "images/btns/btn_fresh.png",
						 "images/btns/btn_fresh2.png",
						 "images/btns/btn_invite.png",
						 "images/btns/btn_method1.png",
						 "images/btns/btn_method2.png",
						 "images/btns/btn_method3.png",
						 "images/btns/btn_method4.png",
						 "images/btns/btn_share.png",
						 "images/btns/btn_share1.png",
						 "images/btns/btn_start.png",
						 "images/btns/btn_test.png",
						 "images/btns/btn_test1.png",
		                 "images/btns/menu.png",
		                 "images/btns/nav_item1.gif",
		                 "images/btns/nav_item2.gif",
		                 "images/btns/nav_item3.gif",
		                 "images/btns/nav_item4.gif",
		                 "images/btns/nav_item5.gif",
		                 "images/btns/share-icon-renren.png",
		                 "images/btns/share-icon-tsina.png",
		                 "images/btns/share-icon-tqq.png",
		                 "images/btns/share-icon-douban.png",
		                 "images/btns/close.png",
						 
						 "images/pics/finalIndexBg.png",
						 "images/pics/footer.gif",
						 "images/pics/freshIndex.png",
						 "images/pics/girl.png",
						 "images/pics/logo.gif",
						 "images/pics/orange.gif",
						 "images/pics/phone.png",
						 "images/pics/plane.png",
						 "images/pics/popbg.png",
						 "images/pics/shake.png",

						 "images/texts/method_tip1.gif",
						 "images/texts/method_tip2.gif",
						 "images/texts/method_tip3.gif",
						 "images/texts/method_tip4.gif",
						 "images/texts/method_title1.gif",
						 "images/texts/method_title2.gif",
						 "images/texts/method_title3.gif",
						 "images/texts/method_title4.gif",
						 "images/texts/msg1_1.gif",
						 "images/texts/msg1_2.gif",
						 "images/texts/msg1_3.gif",
						 "images/texts/msg2_1.gif",
						 "images/texts/msg2_2.gif",
						 "images/texts/msg2_3.gif",
						 "images/texts/msg3_1.gif",
						 "images/texts/msg3_2.gif",
						 "images/texts/msg3_3.gif",
						 "images/texts/msg4_1.png",
						 "images/texts/msg4_2.png",
						 "images/texts/msg4_3.png",
						 "images/texts/pop1.png",
						 "images/texts/share_tip.gif",
						 "images/texts/sl1.png",
		                 "images/texts/sl2.gif",
		                 "images/texts/sl3_1.gif",
		                 "images/texts/sl3_2.gif",
		                 "images/texts/sl3_3.gif",
						 "images/texts/tip1.gif",
						 "images/texts/tip2.gif",
						 "images/texts/tip3.gif",
						 "images/texts/tip4.gif",
						 "images/texts/tip5.gif",
						 "images/texts/tip6.gif",
						 "images/texts/tip7.gif"
						],
		 function(){
			$(".loading").fadeOut('slow',function(){
		        _self.start();
                _self.initEvent();
                _self.setWindow();
			});
	    });	
	},
    initEvent:function(){
        var _self = this;
        $('body').delegate('.btn_test','click',function(){
            page0Out();
            page1_1In();
        }).delegate('.btn_start','click',function(){
            page1_1Out();
            page1_2In();
        }).delegate('.btn_makeFresh','click',function(){
            //jqma append
            $('#p2').closePop();
            eval(curPage+'Out()');
            page1_4In();
        }).delegate('.btn_method1','click',function(){
            page1_4Out();
            page2_1In();
		}).delegate('.btn_share','click',function(){
			$("#p3").showPop({overlay:70});
		}).delegate('.btn_share1','click',function(){
			$.post("../share",{type:0},function(json){
			//jQuery.yx.alert({"text":json.desc,"callback":function(){}});
			//alert('分享成功');
			Zepto.yx.tips(json.desc);
			jQuery('#p2').closePop();
			jQuery('#p1').closePop();
		},"json");
        }).delegate('.btn-share-renren','click',function(){
			$.post("../share",{type:0},function(json){			
				jQuery('#p3').closePop();
				eval(curPage+'Out()');
				pageShareIn();
			},"json");
         }).delegate('.btn-share-tsina','click',function(){         
			shareTotsina(curPage);
		 }).delegate('.btn-share-tqq','click',function(){         
			shareTotqq(curPage); 
		 }).delegate('.btn-share-douban','click',function(){         
			shareTodouban(curPage); 		     
        }).delegate('.btn_share2','click',function(){
            eval(curPage+'Out()');
            pageShareIn();

            //jqma append
        	var sync = 0;	
        	if(jQuery("#checkbox1").attr("checked") == "checked"){
        		sync = 1;
        	}
    		var type = parseInt(jQuery(this).attr("info"));
    		jQuery.post("../share",{type:type,sync:sync,picUrl:filterPic},function(json){
    			if(json.status == 1){
    				//jQuery("#orangeCnt").text(json.xiangchengCnt);
    				jQuery("#orangeCnt").text(json.dedao);
    			}
    		},"json");
        }).delegate('.btn_method2','click',function(){
            page1_4Out();
            page3_1In();
        }).delegate('.btn_done','click',function(){
            page3_1Out();
            page3_2In();
        }).delegate('.btn_method3','click',function(){
            page1_4Out();
            page4_1In();
        }).delegate('.btn_invite','click',function(){
        	//jqma 
        	invite();
        	
        	//jqma
            //page4_1Out();
            //page4_2In();
        }).delegate('.btn_method4','click',function(){
            page1_4Out();
            page5_1In();
        }).delegate('.btn_bian','click',function(){
            page5_1Out();
            page5_2In();
        }).delegate('.btn_test1','click',function(){
            page6Out();
            page1_1In();
        }).delegate('.btn_drawGift','click',function(){
            $('#p2').showPop();
        }).delegate('.btn_close','click',function(){
            $('#p2').closePop();
        }).delegate('.nav_item1','click',function(){
            $('#p1').closePop();
            if(curPage == "page0") return;
            eval(curPage+'Out()');
            page0In();
        }).delegate('.nav_item2','click',function(){
            $('#p1').closePop();
            eval(curPage+'Out()');
            page6In();
        }).delegate('.nav_item3','click',function(){
            $('#p1').closePop();
            eval(curPage+'Out()');
            page1_1In();
        })
    },
	start:function(){
        showCommonSection();
        page0In();
	},
	setWindow:function(){
		var windowH = Math.max($(window).height(),480)-$('header').height();
        $('#main').css('height',windowH);
        $('.page').css('height',windowH);
	}
}
/*
 * 首页过场
 * */
function page0In(){
    curPage = 'page0';
	$('.page0').removeClass("hide");
	$('.sl1').removeClass("vhide").addClass('zoomIn animated');
	$('.pop1').removeClass("vhide").addClass('fadeInRight1 animated');
	$('.plane').removeClass("vhide").addClass('fadeInLeft1 animated');
	$('.girl').removeClass("vhide").addClass('fadeInRight animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
		$('.btn_test').removeClass("vhide").addClass('zoomIn animated').
		one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
			$('.btn_test').removeClass("zoomIn").addClass('pulse1 animated infinite');
		});
	    $('.btn_draw').removeClass("vhide").addClass('zoomIn animated').
		one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
			$('.btn_draw').removeClass("zoomIn").addClass('pulse1 animated infinite');
		});
	});
}

function page0Out(){
	$('.page0').addClass("hide");
	$('.sl1').removeClass('zoomIn animated').addClass("vhide");
	$('.pop1').removeClass('fadeInRight1 animated').addClass("vhide");
	$('.girl').removeClass('fadeInRight animated').addClass("vhide");
	$('.plane').removeClass('fadeInLeft1 animated').addClass("vhide");
	$('.btn_test').removeClass('pulse1 animated infinite').addClass("vhide");
	$('.btn_draw').removeClass('pulse1 animated infinite').addClass("vhide");
}
/*
 * 测试第一步展示
 * */
function showCommonSection(){
	$('.topbar').removeClass("vhide").addClass('fadeIn animated');
	$('.bottombar').removeClass("vhide").addClass('fadeIn animated');
	$('.menu').removeClass("vhide").addClass('fadeIn animated');
}
function page1_1In(){
    curPage = 'page1_1';
	$('.page1_1').removeClass("hide");
	$('.page1_1 .sl2').removeClass("vhide").addClass('fadeInLeft animated');
	$('.tip1').removeClass("vhide").addClass('fadeInLeft animated');
	$('.userBox1').removeClass("vhide").addClass('fadeInLeft animated');
	$('.btn_album').removeClass("vhide").addClass('fadeInLeft animated');
	$('.btn_start').removeClass("vhide").addClass('fadeInLeft animated');
}
function page1_1Out(){
    $('.page1_1').addClass('hide');
	$('.page1_1 .sl2').removeClass("fadeInLeft animated").addClass('vhide');
	$('.tip1').removeClass('fadeInLeft animated').addClass("vhide");
	$('.userBox1').removeClass('fadeInLeft animated').addClass("vhide");
	$('.btn_album').removeClass('fadeInLeft animated').addClass("vhide");
	$('.btn_start').removeClass('fadeInLeft animated').addClass("vhide");
}

function page1_2In(){
    curPage = 'page1_2';
	$('.page1_2').removeClass("hide");
	$('.page1_2 .sl2').removeClass("vhide").addClass('fadeInLeft animated');
	$('.tip2').removeClass("vhide").addClass('fadeInLeft animated');
	$('.userBox2').removeClass("vhide").addClass('fadeInLeft animated');
    setNum(0,curZhishu);
    setTimeout(function(){
        page1_2Out();
        page1_3In();
    },3000);
}

function page1_2Out(){
    $('.page1_2').addClass('hide');
	$('.page1_2 .sl2').removeClass("fadeInLeft animated").addClass('vhide');
	$('.tip2').removeClass('fadeInLeft animated').addClass("vhide");
	$('.userBox2').removeClass('fadeInLeft animated').addClass("vhide");
}

function page1_3In(){
    curPage = 'page1_3';
	$('.page1_3').removeClass("hide");
    var imgurl = 'images/texts/sl3_'+Math.floor(Math.random()*3+1)+'.gif' ;
    $('#testRes').attr('src',imgurl);
	$('.page1_3 .sl2').removeClass("vhide").addClass('fadeInLeft animated');
	$('.tip3').removeClass("vhide").addClass('fadeInLeft animated');
	$('.youngIndex').removeClass("vhide").addClass('fadeInLeft animated').
    one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
        console.log(curZhishu);
        console.log(typeof curZhishu);
        animateNum('runNum',0,curZhishu);
    });
	$('.userBox3').removeClass("vhide").addClass('fadeInLeft animated');
	$('.sl3').removeClass("vhide").addClass('fadeInLeft animated');
	$('.btn_fresh').removeClass("vhide").addClass('fadeInLeft animated');
}

function page1_3Out(){
    $('.page1_3').addClass('hide');
	$('.page1_3 .sl2').removeClass("fadeInLeft animated").addClass('vhide');
	$('.tip3').removeClass('fadeInLeft animated').addClass("vhide");
	$('.youngIndex').removeClass('fadeInLeft animated').addClass("vhide");
	$('.userBox3').removeClass('fadeInLeft animated').addClass("vhide");
	$('.sl3').removeClass('fadeInLeft animated').addClass("vhide");
	$('.btn_fresh').removeClass('fadeInLeft animated').addClass("vhide");
}

function page1_4In(){
    curPage = 'page1_4';
	$('.page1_4').removeClass("hide");
	$('.page1_4 .sl2').removeClass("vhide").addClass('fadeInLeft animated');
	$('.tip4').removeClass("vhide").addClass('fadeInLeft animated');
	$('.orange').removeClass("vhide").addClass('zoomIn animated');
	$('.btn_method').removeClass("vhide").addClass('fadeInLeft animated');
}

function page1_4Out(){
    $('.page1_4').addClass('hide');
	$('.page1_4 .sl2').removeClass("fadeInLeft animated").addClass('vhide');
	$('.tip4').removeClass('fadeInLeft animated').addClass("vhide");
	$('.orange').removeClass('fadeInLeft animated').addClass("vhide");
	$('.btn_method').removeClass('fadeInLeft animated').addClass("vhide");
}
/*
 * 大力出奇迹
 * */
function page2_1In(){
    curPage = 'page2_1';
	$('.page2_1').removeClass("hide");
	$('.page2_1 .method_title1').removeClass("vhide").addClass('fadeInUp animated');
	$('.page2_1 .method_tip1').removeClass("vhide").addClass('fadeInUp animated');
	$('.shakeTip').removeClass("vhide").addClass('zoomIn animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
	    $('.shakeTip img').removeClass("vhide").addClass('shake1 animated infinite');
        window.addEventListener('devicemotion',handleDeviceMotion,false);  
    });
}
function page2_1Out(){
    $('.page2_1').addClass('hide');
	$('.page2_1 .method_title1').removeClass('fadeInUp animated').addClass("vhide");
	$('.page2_1 .method_tip1').removeClass('fadeInUp animated').addClass("vhide");
	$('.shakeTip').removeClass('zoomIn animated').addClass("vhide");
}
function page2_2In(){
    setNum(1,curZhishu);
    curPage = 'page2_2';
	$('.page2_2').removeClass("hide");
	$('.page2_2 .method_title1').removeClass("vhide").addClass('fadeInUp animated');
    var arr = [{url:'images/texts/msg1_1.gif',x:0.53,y:0.59},{url:'images/texts/msg1_2.gif',x:0.53,y:0.5},{url:'images/texts/msg1_3.gif',x:0.58,y:0.5}];
    randomText('#msg1','#yIndex1',arr);
	$('.resBox1').removeClass("vhide").addClass('fadeInUp animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        console.log(curZhishu);
        console.log(typeof curZhishu);
        animateNum('runNum1',0,curZhishu);
    });
	$('.page2_2 .tip5').removeClass("vhide").addClass('fadeInUp animated');
	$('.page2_2 .btn_style1').removeClass("vhide").addClass('fadeInUp animated');
}

function page2_2Out(){
	$('.page2_2').addClass("hide");
	$('.page2_2 .method_title1').removeClass('fadeInUp animated').addClass("vhide");
	$('.resBox1,.page2_2 .tip5').removeClass("fadeInUp animated").addClass('vhide');
	$('.page2_2 .btn_style1').removeClass("fadeInUp animated").addClass('vhide');
}

/*
 *一白遮百丑
 * */
function page3_1In(){
    curPage = 'page3_1';
    $('.page3_1').removeClass('hide');
	$('.page3_1 .method_title2').removeClass("vhide").addClass('fadeInUp animated');
	$('.page3_1 .method_tip2').removeClass("vhide").addClass('fadeInUp animated');
	$('.userBox4').removeClass("vhide").addClass('fadeInUp animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		var t = new Draw(userPic);
	    $('.page3_1 .btn_style1').removeClass("vhide").addClass('fadeInUp animated');

    });
}
function page3_1Out(){
    $('.page3_1').addClass('hide');
	$('.page3_1 .method_title2').removeClass('fadeInUp animated').addClass("vhide");
	$('.page3_1 .method_tip2').removeClass('fadeInUp animated').addClass("vhide");
	$('.page3_1 .btn_style1').removeClass("fadeInUp animated").addClass('vhide');
	$('.userBox4').removeClass('fadeInUp animated').addClass("vhide");
}

function page3_2In(){
    curPage = 'page3_2';
    setNum(2,curZhishu);
    $('.page3_2').removeClass('hide');
	$('.page3_2 .method_title2').removeClass("vhide").addClass('fadeInUp animated');
    var arr = [{url:'images/texts/msg2_1.gif',x:0.73,y:0.32},{url:'images/texts/msg2_2.gif',x:0.33,y:0.49},{url:'images/texts/msg2_3.gif',x:0.51,y:0.49}];
    randomText('#msg2','#yIndex2',arr);
	$('.resBox2').removeClass("vhide").addClass('fadeInUp animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        console.log(curZhishu);
        console.log(typeof curZhishu);
        animateNum('runNum2',0,curZhishu);
    });
	$('.page3 .tip5').removeClass("vhide").addClass('fadeInUp animated');
	$('.page3_2 .btn_style1').removeClass("vhide").addClass('fadeInUp animated');
}
function page3_2Out(){
    $('.page3_2').addClass('hide');
	$('.page3_2 .method_title2').removeClass('fadeInUp animated').addClass("vhide");
	$('.resBox2').removeClass("fadeInUp animated").addClass('vhide');
	$('.page3_2 .tip5').removeClass("fadeInUp animated").addClass('vhide');
	$('.page3_2 .btn_style1').removeClass("fadeInUp animated").addClass('vhide');
}
/*
 *邀请好友猛夸我
 * */
function page4_1In(){
    curPage = 'page4_1';
    $('.page4_1').removeClass('hide');
	$('.page4_1 .method_title3').removeClass("vhide").addClass('fadeInUp animated');
	$('.page4_1 .method_tip3').removeClass("vhide").addClass('fadeInUp animated');
	$('.btn_invite').removeClass("vhide").addClass('fadeInUp animated');
	$('.tip6').removeClass("vhide").addClass('fadeInUp animated');
}
function page4_1Out(){
    $('.page4_1').addClass("hide");
	$('.page4_1 .method_title3').removeClass('fadeInUp animated').addClass("vhide");
	$('.page4_1 .method_tip3').removeClass('fadeInUp animated').addClass("vhide");
	$('.btn_invite').removeClass('fadeInUp animated').addClass("vhide");
	$('.tip6').removeClass('fadeInUp animated').addClass("vhide");
}

function page4_2In(){
    setNum(3,curZhishu);
    curPage = 'page4_2';
    $('.page4_2').removeClass('hide');
	$('.page4_2 .method_title3').removeClass("vhide").addClass('fadeInUp animated');
    var arr = [{url:'images/texts/msg3_1.gif',x:0.67,y:0.49},{url:'images/texts/msg3_2.gif',x:0.37,y:0.49},{url:'images/texts/msg3_3.gif',x:0.58,y:0.49}];
    randomText('#msg3','#yIndex3',arr);
	$('.resBox3').removeClass("vhide").addClass('fadeInUp animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        console.log(curZhishu);
        console.log(typeof curZhishu);
        animateNum('runNum3',0,curZhishu);
    });
	$('.page4_2 .tip5').removeClass("vhide").addClass('fadeInUp animated');
	$('.page4_2 .btn_style1').removeClass("vhide").addClass('fadeInUp animated');
}
function page4_2Out(){
    $('.page4_2').addClass('hide');
	$('.page4_2 .method_title3').removeClass('fadeInUp animated').addClass("vhide");
	$('.resBox3').removeClass("fadeInUp animated").addClass('vhide');
	$('.page4_2 .tip5').removeClass("fadeInUp animated").addClass('vhide');
	$('.page4_2 .btn_style1').removeClass("fadeInUp animated").addClass('vhide');
}
/*
 * 独家秘笈
 * */
function page5_1In(){
    curPage = 'page5_1';
    $('.page5_1').removeClass('hide');
	$('.page5_1 .method_title4').removeClass("vhide").addClass('fadeInUp animated');
	$('.page5_1 .method_tip4').removeClass("vhide").addClass('fadeInUp animated');
	$('.userBox5').removeClass("vhide").addClass('fadeInUp animated');
	$('.btn_bian').removeClass("vhide").addClass('fadeInUp animated');
}
function page5_1Out(){
    $('.page5_1').addClass('hide');
	$('.page5_1 .method_title4').removeClass('fadeInUp animated').addClass("vhide");
	$('.page5_1 .method_tip4').removeClass('fadeInUp animated').addClass("vhide");
	$('.userBox5').removeClass('fadeInUp animated').addClass("vhide");
	$('.btn_bian').removeClass('fadeInUp animated').addClass("vhide");
}

function page5_2In(){
    curPage = 'page5_2';
    $('.page5_2').removeClass('hide');
	$('.page5_2 .method_title4').removeClass("vhide").addClass('fadeInUp animated');
    var arr = [{url:'images/texts/msg4_1.png',x:0.67,y:0.49},{url:'images/texts/msg4_2.png',x:0.37,y:0.49},{url:'images/texts/msg4_3.png',x:0.58,y:0.49}];
    randomText('#msg4','#yIndex4',arr);
	$('.resBox4').removeClass("vhide").addClass('zoomIn animated');
	$('.finalRes').removeClass("vhide").addClass('zoomIn animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
	    $('.phone').removeClass("vhide").addClass('tada animated');
	    $('.synToAlbum').removeClass("vhide").addClass('fadeIn animated');
	    $('.youngIndex4').removeClass("vhide").addClass('zoomIn animated').
	    one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            console.log(curZhishu);
            console.log(typeof curZhishu);
            animateNum('runNum4',0,1000);
        });
    });
	$('.page5_2 .btn_style1').removeClass("vhide").addClass('fadeInUp animated');
}
function page5_2Out(){
    $('.page5_2').addClass('hide');
	$('.page5_2 .method_title4').removeClass('fadeInUp animated').addClass("vhide");
	$('.resBox4').removeClass("zoomIn animated").addClass('vhide');
	$('.finalRes').removeClass("zoomIn animated").addClass('vhide');
	$('.page5_2 .btn_style1').removeClass("fadeInUp animated").addClass('vhide');
}

/*
 * 分享
 * */
function pageShareIn(){
    curPage = 'pageShare';
	$('.pageShare').removeClass("hide");
	$('pageShare .sl2').removeClass("vhide").addClass('zoomIn animated');
	$('.shareBox').removeClass("vhide").addClass('zoomIn animated');
	$('.tip7').removeClass("vhide").addClass('fadeInUp animated');
	$('.pageShare .btn_style1').removeClass("vhide").addClass('fadeInUp animated');
}

function pageShareOut(){
	$('.pageShare').addClass("hide");
	$('pageShare .sl2').removeClass("zoomIn animated").addClass('vhide');
	$('.shareBox').removeClass("zoomIn animated").addClass('vhide');
	$('.pageShare .btn_style1').removeClass("fadeInUp animated").addClass('vhide');
}
/*
 * 活动介绍
 * */
function page6In(){
    curPage = 'page6';
	$('.page6').removeClass("hide");
	$('.page6 .sl2').removeClass("vhide").addClass('zoomIn animated');
	$('.rules').removeClass("vhide").addClass('fadeIn animated');
	$('.btn_test1').removeClass("vhide").addClass('zoomIn animated');
}

function page6Out(){
	$('.page6').addClass("hide");
	$('.page6 .sl2').removeClass('zoomIn animated').addClass("vhide");
	$('.rules').removeClass('fadeIn animated').addClass("vhide");
	$('.btn_test1').removeClass('zoomIn animated').addClass("vhide");
}
var x,y,z,last_x,last_y,last_z,lastUpdate = 0;
var SHAKE_THRESHOLD = 800;     
function handleDeviceMotion(eventData){
	var acceleration = eventData.accelerationIncludingGravity;   
	var curTime = new Date().getTime();
	if (curTime - lastUpdate> 100) {  
		var diffTime = curTime -lastUpdate;    
		lastUpdate = curTime;        
		x = acceleration.x; 
		y = acceleration.y;   
		z = acceleration.z;   
		var speed = Math.abs(x +y + z - last_x - last_y - last_z) / diffTime * 10000;
		if (speed >SHAKE_THRESHOLD) {
            window.removeEventListener('devicemotion',handleDeviceMotion,false);  
            player('shake.mp3');
            page2_1Out();
            page2_2In();
		}    
		last_x = x;    
		last_y = y;    
		last_z = z;    
	}
}
function player(url){
    var myVocal = new Audio(url);
    myVocal.load();
    myVocal.addEventListener('canplaythrough',playHandler,false);
    function playHandler(evt){
        if(evt.target.readyState == 4){
            myVocal.play();
        }
    }
}
function randomText(el1,el2,arr){
    var i = Math.floor(Math.random()*3);
    $(el1)[0].src=arr[i].url;
    if(el2 == '#yIndex4'){
        return
    }else{
        $(el2)[0].style.top = arr[i].y*$(el1).height()+'px';
        $(el2)[0].style.left = arr[i].x*$(el1).width()+'px';
    }
}
function setNum(type,currentZhishu){
	jQuery.post("../zhishu",{type:type,currentZhishu:currentZhishu},function(json){
		if(json.status == 1){
            console.log('success!');
            curZhishu = Number(json.zhishu); 
		}else{
        }
	},"json");

}
