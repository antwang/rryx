/*
 * 检查设备及app
 * */
function AppCheck(){}
AppCheck.prototype.ua = navigator.userAgent;
AppCheck.prototype.isRenRen(){
    return this.ua.indexOf('RenRen') == -1; 
}
function Record(){
	this.init();
}
Record.prototype = {
	init:function(){
		var _self = this;
		preloadPictures(["img/tip.png",
						"img/page5/p5_11.png",
						"img/tip_o.png"],
		 function(){
			$(".loading").fadeOut('slow',function(){
				
				$(".tip").show();
				$("#mySwiper").fadeIn('slow',function(){
					page1In();
					$("html,body").css("background-color","#e62420");
				});
			});
		   _self.start();
	    });	
	},
	start:function(){
		this.fullpage();
		showSwiper();
		
	},
	fullpage:function(){
		var _self = this;
		_self.w = $(window).width();
		_self.h = $(window).height();
		$("#mySwiper").width(_self.w);
		$("#mySwiper").height(_self.h);
	}
}

// 加载图片
var preloadPictures = function(pictureUrls, callback) {
    var i,
        j,
        loaded = 1;
    for (i = 0, j = pictureUrls.length; i < j; i++) {
        (function (img, src) {
            img.onload = function () { 
			var num = Math.ceil(loaded/j*100) ;
			    $(".percent").html("- "+num+"% -");                        
                if (loaded++ == pictureUrls.length && callback) {
					setTimeout(callback,500);
                }
            };
            img.onerror = function () {};
            img.onabort = function () {};

            img.src = src;
        } (new Image(), pictureUrls[i]));
    }
};
function showSwiper()
{
	mySwiper = new Swiper('.swiper-container',{
   eventTarget:'wrapper',
	//pagination: '.pagination',
	paginationClickable: false,
	mode: 'vertical',
	speed:650,
	loop:false,
	//watchActiveIndex: true,
	simulateTouch: false,
	onSlideChangeEnd: function(swiper){
		var myacitveIndex = mySwiper.activeIndex;
		var mypreIndex = mySwiper.previousIndex;
		console.log("activeIndex:"+mySwiper.activeIndex+"  previousIndex:"+mySwiper.previousIndex);
		eval("page"+Math.abs(myacitveIndex+1)+"In()");
		eval("page"+Math.abs(mypreIndex+1)+"Out()");
		if(myacitveIndex == 4){
			$(".tip").hide();
		}
		else{
			$(".tip").show();
		}
		if(myacitveIndex !=0)
		{
			$('.tip').find("img").attr("src","img/tip_o.png");
		}
		else
		{
			$('.tip').find("img").attr("src","img/tip.png");
		}
		/*if(myacitveIndex>mypreIndex)
		{
			console.log("up");
			eval("page"+Math.abs(myacitveIndex+1)+"In()");
			eval("page"+Math.abs(mypreIndex+1)+"Out()");
		}
		else
		{
			console.log("down");
			//eval("page"+Math.abs(myacitveIndex+1)+"In()");
			eval("page"+Math.abs(myacitveIndex+1)+"In()");
		}*/
	},
	onSlideChangeStart: function(){
		/*console.log("start");
		var myacitveIndex = mySwiper.activeIndex;
		var mypreIndex = mySwiper.previousIndex;
		if(myacitveIndex>mypreIndex)
		{
			eval("page"+Math.abs(mypreIndex+1)+"Out()");
		}
		else
		{
			eval("page"+Math.abs(mypreIndex+1)+"Out()");
		}*/
		
	}
  })
console.log("activeIndex:"+mySwiper.activeIndex+"  previousIndex:"+mySwiper.previousIndex);
}
function page1In(){
	  $('.p1_1').removeClass("pagehide").addClass('zoomIn animated').
	  one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
	  function(){
	  $('.p1_2').removeClass("pagehide").addClass('fadeInLeft animated').
	  one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
	  function(){
	  $('.p1_3').removeClass("pagehide").addClass('fadeInRight animated').
	  one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
	  function(){});
	  });
	 });
}
function page1Out(){
	$('.p1_1').removeClass("zoomIn animated").addClass("pagehide");
	$('.p1_2').removeClass("fadeInLeft animated").addClass('pagehide');
	$('.p1_3').removeClass("fadeInRight animated").addClass('pagehide');
}
function page2In(){
	page2LineIn();
	$('.p2_1').removeClass("pagehide").addClass('fadeInRight animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
	function(){});
	$('.p2_2').removeClass("pagehide").addClass('fadeInRight animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
	function(){});
	$('.p2_3').removeClass("pagehide").addClass('fadeInRight animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
	function(){});
	$('.p2_4').removeClass("pagehide").addClass('fadeInLeft animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
	function(){});
	$('.p2_5').removeClass("pagehide").addClass('fadeInLeft animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
	function(){});
	$('.p2_6').removeClass("pagehide").addClass('fadeInLeft animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
	function(){});
	$('.p2_7').removeClass("pagehide").addClass('fadeInLeft animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
	function(){});
	/*$('.p2_1').removeClass("pagehide").addClass('fadeInRight animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
	function(){
	$('.p2_2').removeClass("pagehide").addClass('fadeInRight animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
	function(){
	$('.p2_3').removeClass("pagehide").addClass('fadeInRight animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
	function(){
		$('.p2_4').removeClass("pagehide").addClass('bounceInLeft animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
	function(){
	$('.p2_5').removeClass("pagehide").addClass('fadeInLeft animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
	function(){
	$('.p2_6').removeClass("pagehide").addClass('fadeInLeft animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
	function(){
	$('.p2_7').removeClass("pagehide").addClass('fadeInLeft animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
	function(){});
	});
	});
	});
	});
	});
	});*/
	
}
function page2Out(){
	page2LineOut();
	$('.p2_1').removeClass("fadeInRight animated").addClass("pagehide");
	$('.p2_2').removeClass("fadeInRight animated").addClass("pagehide");
	$('.p2_3').removeClass("fadeInRight animated").addClass("pagehide");
	$('.p2_4').removeClass("fadeInLeft animated").addClass("pagehide");
	$('.p2_5').removeClass("fadeInLeft animated").addClass("pagehide");
	$('.p2_6').removeClass("fadeInLeft animated").addClass("pagehide");
	$('.p2_7').removeClass("fadeInLeft animated").addClass("pagehide");
}
function page3In(){
	page3LineIn();
	$('.p3_1').removeClass("pagehide").addClass('bounceInDown animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
	function(){
	$('.p3_2').removeClass("pagehide").addClass('fadeInDownBig animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
	function(){
	$('.p3_3').removeClass("pagehide").addClass('fadeInDownBig animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
	function(){
	$('.p3_4').removeClass("pagehide").addClass('fadeInDownBig animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
	function(){
		$('.p3_5').removeClass("pagehide").addClass('bounceInDown animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
	function(){
	$('.p3_6').removeClass("pagehide").addClass('fadeInUpBig animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
	function(){
	$('.p3_7').removeClass("pagehide").addClass('fadeInUpBig animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
	function(){
	$('.p3_8').removeClass("pagehide").addClass('fadeInUpBig animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
	function(){
	$('.p3_9').removeClass("pagehide").addClass('fadeInUpBig animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
	function(){});
	});
	});
	});
	});
	});
	});
	});
	});
	
}
function page3Out(){
	page3LineOut();
	$('.p3_1').removeClass("bounceInDown animated").addClass("pagehide");
	$('.p3_2').removeClass("fadeInDownBig animated").addClass("pagehide");
	$('.p3_3').removeClass("fadeInDownBig animated").addClass("pagehide");
	$('.p3_4').removeClass("fadeInDownBig animated").addClass("pagehide");
	$('.p3_5').removeClass("bounceInDown animated").addClass("pagehide");
	$('.p3_6').removeClass("fadeInUpBig animated").addClass("pagehide");
	$('.p3_7').removeClass("fadeInUpBig animated").addClass("pagehide");
	$('.p3_8').removeClass("fadeInUpBig animated").addClass("pagehide");
	$('.p3_9').removeClass("fadeInUpBig animated").addClass("pagehide");

}
function page4In(){
	$('.p4_1').removeClass("pagehide").addClass('flipInX animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
	function(){
	$('.p4_2').removeClass("pagehide").addClass('flipInX animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
	function(){
	$('.p4_3').removeClass("pagehide").addClass('flipInX animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
	function(){});
	});
	});
}
function page4Out(){
	$('.p4_1').removeClass("flipInX animated").addClass("pagehide");
	$('.p4_2').removeClass("flipInX animated").addClass("pagehide");
	$('.p4_3').removeClass("flipInX animated").addClass("pagehide");
	
}
function page5In(){
	$('.p5_1').removeClass("pagehide").addClass('fadeIn animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
	function(){});
	$('.p5_2').removeClass("pagehide").addClass('fadeInLeft animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
	function(){});
	$('.p5_3').removeClass("pagehide").addClass('fadeInRight animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
	function(){});
	$('.p5_4').removeClass("pagehide").addClass('fadeInLeft animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
	function(){});
	$('.p5_5').removeClass("pagehide").addClass('fadeInRight animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
	function(){});
	$('.p5_6').removeClass("pagehide").addClass('fadeInLeft animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
	function(){});
	$('.p5_7').removeClass("pagehide").addClass('fadeInRight animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
	function(){});
	$('.p5_8').removeClass("pagehide").addClass('fadeInLeft animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
	function(){});
	$('.p5_9').removeClass("pagehide").addClass('fadeInRight animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
	function(){});
	$('.p5_10').removeClass("pagehide").addClass('fadeInUp animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
	function(){});
	/*$('.p5_11').removeClass("pagehide").addClass('fadeIn animated').
	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
	function(){});*/
	
	

}
function page5Out(){
	$('.p5_1').removeClass("fadeIn animated").addClass("pagehide");
	$('.p5_2').removeClass("fadeInLeft animated").addClass("pagehide");
	$('.p5_3').removeClass("fadeInRight animated").addClass("pagehide");
	$('.p5_4').removeClass("fadeInLeft animated").addClass("pagehide");
	$('.p5_5').removeClass("fadeInRight animated").addClass("pagehide");
	$('.p5_6').removeClass("fadeInLeft animated").addClass("pagehide");
	$('.p5_7').removeClass("fadeInRight animated").addClass("pagehide");
	$('.p5_8').removeClass("fadeInLeft animated").addClass("pagehide");
	$('.p5_9').removeClass("fadeInRight animated").addClass("pagehide");
	$('.p5_10').removeClass("fadeInUp animated").addClass("pagehide");
	//$('.p5_11').removeClass("fadeIn animated").addClass("pagehide");
}
var _length = $(window).height();
var _len_p2 = 0;
var _len_p3 = 0;
var _timeOut;
var _timeOutP3;
function page2LineIn(){
	_len_p2+=2;
	if(_len_p2 > _length)
	{
		clearTimeout(_timeOut);
		return ;
	}
	console.log("_len="+_len_p2);
	$('.p2_line').css("clip","rect(0, auto, "+_len_p2+"px, 0)");
	_timeOut = setTimeout(page2LineIn,7)
	
}
function page2LineOut(){
	clearTimeout(_timeOut);
	$('.p2_line').css("clip","rect(0, auto, 0, 0)");
	_len_p2 = 0;
}
function page3LineIn(){
	_len_p3+=2;
	if(_len_p3 > _length)
	{
		clearTimeout(_timeOutP3);
		return ;
	}
	console.log("_len_p3="+_len_p3);
	$('.p3_line').css("clip","rect(0, auto, "+_len_p3+"px, 0)");
	_timeOutP3 = setTimeout(page3LineIn,7)
	
}
function page3LineOut(){
	clearTimeout(_timeOutP3);
	$('.p3_line').css("clip","rect(0, auto, 0, 0)");
	_len_p3 = 0;
}

