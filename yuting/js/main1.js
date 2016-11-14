;(function($){
    var num = 0;
    //获得用户信息：头像和姓名
    $(function(){
        $.ajax({
			url:'http://base.yx.renren.com/api/http/user/login-user?format=2&callback=?&'+Math.random(),
			data: {
                _rtk:__RRXN.get_check_x
			},
			dataType: "json",
			type: "GET",
			success: function(res){
                var user = res.user;
                var name = user.userName;
                var headUrl = user.headUrl;
                $('#userpic').attr('src',headUrl);
                $('#username').html(name);
			}
        })
        showPop('#djmb');
        //点击确定跳转至游戏房间选择页面
        $('#btnCfm1').on('click',function(){
            Zepto.post('../user/isLogin',{_rtk: __RRXN.get_check_x},function(data){
                if(data==1){
                    showDaoju();
                }else{
                    window.location = "http://mt.renren.com/login?redirect="+document.URL;
                }
            },'json')
        })
        //时间到点关闭重新闯关
        $('.btn-close-time').on('click',function(){
            location.href="index.html";
        })
        //分享给好友
        $('.btn-share').on('click',function(){
            Zepto.post('../user/isLogin',{_rtk: __RRXN.get_check_x},function(data){
                if(data==1){
                    share();
                }else{
                    window.location = "http://mt.renren.com/login?redirect="+document.URL;
                }
            },'json')
        })
        //点击场景1按钮进入房间1
        $('.a1').on('click',function(){room1();})
        $('.a2').on('click',function(){room2();})
        $('.a3').on('click',function(){room3();})
        $('.a4').on('click',function(){room4();})
        $('.a5').on('click',function(){room5();})

        //点击房间1的药瓶跳转至迷宫游戏页面
        $('#btn1').on('click',function(){game1();})
        $('#btn2').on('click',function(){game2();})
        $('#btn3').on('click',function(){game3();})
        $('#btn4').on('click',function(){game4();})
        $('#btn5').on('click',function(){game5();})
        $('#sec1')[0].addEventListener('webkitTransitionEnd',updateTransition,false);
        //切换选中状态
        $('.checklist li').on('click',function(){
            $(this).addClass('checked');
            $(this).siblings().removeClass('checked');
        })
        //提交选中状态
        $('.btn-cfm-box').on('click',function(){
            if($('.checklist li.checked').index()==0){
                //摆脱困境
                closePop('#pop-openbox');
                location.href='out.html';
            }else{
                //继续游戏
                $('.checklist li').removeClass('checked');
                $('.checklist li').eq(0).addClass('checked');
                closePop('#pop-openbox');
                toAccess();
            }
            $(this).addClass('checked');
            $(this).siblings().removeClass('checked');
        })
    })
    function updateTransition(e){
        if($('#sec1')[0].style.opacity=='0'){
            $('#sec1').hide();
        }
    }
    //回到房间选择入口页面
    function toAccess(){
        $('#sec1').show();
        $('#sec1')[0].style.opacity = '1';
        $('#sec1')[0].style.webkitTransform='scale(1)';
    }
    //隐藏房间选择入口页面
    function hideAccess(){
        $('#sec1')[0].style.opacity = '0';
        $('#sec1')[0].style.webkitTransform='scale(0)';
    }
    //展示道具列表
    function showDaoju(){
        closePop('#djmb');
        $('#djlist li').each(function(index,item){
            item.style.webkitTransform='scale(1)';
            item.style.opacity='1';
        })
        setTimeout(function(){
            //$('#sec1').show();
            toAccess();
        },1000)
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
    function room1(){
        $('#sec0 img').attr('src','images/bgs/bg1.jpg');
        showPop('#sec2');
        hideAccess();
    }
    function game1(){
        //显示游戏并移除对应的房间
        showPop('#game1');
        $('#sec2').remove();
        var oMaze = createMaze('maze',function(cm){
            //完成游戏
            showPop('#pop1');
            if(cm==0){
                $.post('/game/add',{_rtk: __RRXN.get_check_x,gameType:1,type:1},function(data){
                    if(data>0){console.log('药片保存成功')}
                })
            }
        }); 
        //关闭道具获得浮层
        $('.btn-dj-1').on('click',function(){
            closePop('#pop1');
            closePop('#game1');
            $('#dj1').attr('src','images/pics/d1.png');
            $('.a1').off('click');
            $('.a1 .mask').show();
            num++;
            console.log(num);
            if(num>=3){
                    if(num==5){
                    location.href="out.html";
                }else{
                    showPop('#pop-openbox');
                }
            }else{
                setTimeout(function(){
                    toAccess();
                },1000)
            }
        })
        $('#help1').on('click',function(){
            var fri = selectFriends();
            fri.select({maxNum:1,callback:function(arr){
                oMaze.help();
                var fid = arr[0].fid;
                $.post('/gamehelp/add',{_rtk: __RRXN.get_check_x,gameType:1,type:1,invitedId:fid},function(data){
                    if(data>0){console.log('药片保存成功')}
                })
            }})
        })
    }
    //光盘游戏
    function room2(){
        $('#sec0 img').attr('src','images/bgs/bg2.jpg');
        showPop('#sec3');
        hideAccess();
    }
    function game2(){
        //显示游戏并移除对应的房间
        showPop('#game2');
        $('#sec3').remove();
        var oDisc = createDisc('discGame',function(cm){
            showPop('#pop-video');
            if(cm==0){
                $.post('/game/add',{_rtk: __RRXN.get_check_x,gameType:2,type:1},function(data){
                    if(data>0){console.log('电源保存成功')}
                })
            }
            var video = document.querySelector('#video');
            video.src = "video.mp4";
            video.load();
            video.addEventListener('ended',showDisc,false);
            function showDisc(){
                showPop('#pop2');
                //closePop('#pop-video');
				$('#pop-video').remove();
            }
        }); 
        //关闭光盘弹窗并跳转至房间选择界面
        $('.btn-dj-2').on('click',function(){
            $('.a2').off('click');
            $('.a2 .mask').show();
            closePop('#pop2');
            closePop('#game2');
            $('#dj2').attr('src','images/pics/d2.png');
            num++;
            console.log(num);
            if(num>=3){
                if(num==5){
                    location.href="out.html";
                }else{
                    showPop('#pop-openbox');
                }
            }else{
                toAccess();
            }
        })
        $('#help2').on('click',function(){
            var fri = selectFriends();
            fri.select({maxNum:1,callback:function(arr){
                oDisc.help();
                var fid = arr[0].fid;
                $.post('/gamehelp/add',{_rtk: __RRXN.get_check_x,gameType:2,type:1,invitedId:fid},function(data){
                    if(data>0){console.log('电源保存成功')}
                })
            }})
        })
    }
    //擦去灰尘房间
    function room3(){
        $('#sec0 img').attr('src','images/bgs/bg3.jpg');
        showPop('#sec4');
        hideAccess();
    }
    //擦去灰尘游戏
    function game3(){
        //显示游戏并移除对应的房间
        showPop('#game3');
        $('#sec4').remove();
        var oAlbum = createAlbum('drawGame',function(cm){
            showPop('#pop-spec');
            if(cm==0){
                $.post('/game/add',{_rtk: __RRXN.get_check_x,gameType:3,type:1},function(data){
                    if(data>0){console.log('相框保存成功')}
                })
            }
            setTimeout(function(){
                showPop('#pop3');
            },1000)
        }); 
        //关闭光盘弹窗并跳转至房间选择界面
        $('.btn-dj-3').on('click',function(){
            $('.a3').off('click');
            $('.a3 .mask').show();
            closePop('#pop-spec');
            closePop('#pop3');
            closePop('#game3');
            $('#dj3').attr('src','images/pics/d3.png');
            num++;
            console.log(num);
            if(num>=3){
				if(num==5){
                    location.href="out.html";
                }else{
                    showPop('#pop-openbox');
                }
            }else{
                toAccess();
            }
        })
        $('#help3').on('click',function(){
            var fri = selectFriends();
            fri.select({maxNum:1,callback:function(arr){
                oAlbum.help();
                var fid = arr[0].fid;
                $.post('/gamehelp/add',{_rtk: __RRXN.get_check_x,gameType:3,type:1,invitedId:fid},function(data){
                    if(data>0){console.log('相框保存成功')}
                })
            }})
        })
    }
    //拼图房间
    function room4(){
        $('#sec0 img').attr('src','images/bgs/bg4.jpg');
        showPop('#sec5');
        hideAccess();
    }
    //拼图游戏
    function game4(){
        //显示游戏并移除对应的房间
        showPop('#game4');
        $('#sec5').remove();
        var oPin = createPin('ptGame',function(cm){
            showPop('#pop4');
            if(cm==0){
                $.post('/game/add',{_rtk: __RRXN.get_check_x,gameType:4,type:1},function(data){
                    if(data>0){console.log('拼图保存成功')}
                })
            }
        }); 
        //关闭光盘弹窗并跳转至房间选择界面
        $('.btn-dj-4').on('click',function(){
            $('.a4').off('click');
            $('.a4 .mask').show();
            closePop('#pop4');
            closePop('#game4');
            $('#dj4').attr('src','images/pics/d4.png');
            num++;
            console.log(num);
            if(num>=3){
                if(num==5){
                    location.href="out.html";
                }else{
                    showPop('#pop-openbox');
                }
            }else{
                toAccess();
            }
        })
        $('#help4').on('click',function(){
            var fri = selectFriends();
            fri.select({maxNum:1,callback:function(arr){
                oPin.help();
                var fid = arr[0].fid;
                $.post('/gamehelp/add',{_rtk: __RRXN.get_check_x,gameType:4,type:1,invitedId:fid},function(data){
                    if(data>0){console.log('拼图保存成功')}
                })
            }})
        })
    }
    function showTips(msg,callback){
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
    //分享
    function share(){
        Zepto.post('../share/post',{_rtk: __RRXN.get_check_x,sid:1236},function(data){
            if(data>=0){
                showTips('分享成功',function(){
                    //location.href="index.html";
                })
            }
        },'json')
    }
    //拼图房间
    function room5(){
        $('#sec0 img').attr('src','images/bgs/bg5.jpg');
        showPop('#sec6');
        hideAccess();
    }
    //拼图游戏
    function game5(){
        //显示游戏并移除对应的房间
        showPop('#game5');
        $('#sec6').remove();
        var oHai = createHai('hbGame',function(cm){
            showPop('#pop5');
            if(cm==0){
                $.post('/game/add',{_rtk: __RRXN.get_check_x,gameType:5,type:1},function(data){
                    if(data>0){console.log('拼图保存成功')}
                })
            }
        }); 
        //关闭光盘弹窗并跳转至房间选择界面
        $('.btn-dj-5').on('click',function(){
            $('.a5').off('click');
            $('.a5 .mask').show();
            closePop('#pop5');
            closePop('#game5');
            $('#dj5').attr('src','images/pics/d5.png');
            num++;
            console.log(num);
            if(num>=3){
                if(num==5){
                    location.href="out.html";
                }else{
                    showPop('#pop-openbox');
                }
            }else{
                toAccess();
            }
        })
        $('#help5').on('click',function(){
            var fri = selectFriends();
            fri.select({maxNum:1,callback:function(arr){
                oHai.help();
                var fid = arr[0].fid;
                $.post('/gamehelp/add',{_rtk: __RRXN.get_check_x,gameType:5,type:1,invitedId:fid},function(data){
                    if(data>0){console.log('找茬保存成功')}
                })
            }})
        })
    }
})(Zepto)
