window.onload = function(){
    countDown();
}
var max = 72,m;
var timerId = null;
function countDown(){
    m = max;
    if(max>0){
        m = m>9?m:('0'+m);
        max--;
        if(max<=20){
            document.querySelector('#time').style.color = '#f00';
        }
        document.querySelector('#time').innerHTML = '倒计时：'+m;
        timerId = setTimeout(arguments.callee,7000);
    }else{
        m = '00';
        clearTimeout(timerId);
        document.querySelector('#time').style.color = '#f00';
        document.querySelector('#time').innerHTML = '倒计时：'+m;
        showPop('#pop-timeout',true);
    }
}

    /************************场景1游戏1******************************/
    function showPop(ele,b){
        b = b||false;
        if(b){ showOverlay(); }
        $(ele)[0].style.webkitTransform='scale(1)';
        $(ele)[0].style.opacity='1';
    }
    function closePop(ele){
        if($('.overlay').length>0){removeOverlay();}
        $(ele)[0].style.webkitTransform='scale(0)';
        $(ele)[0].style.opacity='0';
    }

    //创建overlay
    function showOverlay(){
        overlay = document.createElement('div');
        overlay.className="overlay";
        overlay.id="overlay";
        document.body.appendChild(overlay);

    }
    //移除overlay
    function removeOverlay(){
        document.body.removeChild(overlay);
        overlay=null;
    }
