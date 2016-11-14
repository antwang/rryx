var filmPIC_H, index = 0, timerId = null;
var arrText= ['“奇怪，门怎么被锁住了，窗户也打不开，身体变得好不舒服，感觉快要窒息了。。这样不行，我得快想办法出去。”', '“完全想不起来怎么会被困，毫无头绪。头晕目眩，空气好像越来越稀薄，必须要赶紧找到办法逃出去！” ', '对了，我可以用手机向闺蜜求助，她们一定会想出解决的方法，帮我逃出困境'];
Zepto(function(){
    var ulFilm = $('#ulFilm');
    filmPIC_H = ulFilm.find('li').height(); 
    play();
})
//胶卷滚动
function play(){
    $("#ulFilm").animate({marginTop: -filmPIC_H*4+'px'}, 8000,'ease-in-out',function(){
        Zepto('#filmscene')[0].style.opacity = '0'; 
        setTimeout(animate2,50);
    });
}
//动画二
function animate2(){
    Zepto('#roombox1')[0].style.opacity = '1';
    Zepto('#roombox2')[0].style.opacity = '1';
    Zepto('#roombox2')[0].addEventListener('webkitTransitionEnd',animate3,false);
}
//动画三
function animate3(){
    Zepto('#dialogBox1')[0].style.opacity = '1';
    Zepto('#dialogBox1')[0].addEventListener('webkitTransitionEnd',animate4,false);
}
function animate4(){
    //window.addEventListener('touchstart',handleTouchStart,false);
    autoSay();
}
function autoSay(){
    clearTimeout(timerId);
    if(index>=3){
        invite();
        //window.removeEventListener('touchstart',handleTouchStart,false);
    }else{
        document.querySelector('#dialogTips1').innerHTML = arrText[index];
        index++;
        timerId = setTimeout(autoSay,2000);
    }
}
function handleTouchStart(){
    clearTimeout(timerId);
    if(index>=3){
        window.removeEventListener('touchstart',handleTouchStart,false);
        invite();
    }else{
        document.querySelector('#dialogTips1').innerHTML = arrText[index];
        timerId = setTimeout(autoSay,2000);
        index++;
    }
}
function invite(){
    var fri = selectFriends();
    fri.select({maxNum:1,callback:function(arr){
        var name = arr[0].fname;
        var fhead = arr[0].fhead;
        Zepto('body').append('<div id="loading" class="loading"><img src="images/loading2.gif"></div>');
        Zepto.post('../friends/invite',{_rtk: __RRXN.get_check_x,type:1,fids:arr[0].fid},function(data){
            Zepto('#loading').remove();
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
    }})
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
