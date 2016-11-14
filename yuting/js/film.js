var UL_H,PIC_H,BOX_H;
Zepto(function(){
    var filmBox = $('#filmBox');
    var ulFilm = $('#ulFilm');
    UL_H = ulFilm.height();
    PIC_H = ulFilm.find('li').height(); 
    console.log(PIC_H);
    BOX_H = $('#filmBox').height();
    play();
})
//var b=50,c=100,d=100,t=0;
//function Run(){
    //div.style.left = Math.ceil(Tween.Quad.easeOut(t,b,c,d)) + "px";
    //if(t<d){ t++; setTimeout(Run, 10); }
//}
    function play(){
        $("#ulFilm").animate({marginTop: -PIC_H*3+'px'}, 10000,'ease-in-out',function(){location.href="transition2.html"; });
    }
