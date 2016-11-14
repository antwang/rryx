    var stage = new createjs.Stage('maze');
    var portion1 = document.documentElement.clientWidth/640;
    createjs.Touch.enable(stage);
	// this lets our drag continue to track the mouse even when it leaves the canvas:
	// play with commenting this out to see the difference.
	stage.mouseMoveOutside = true; 
    var w = document.documentElement.clientWidth;
    stage.canvas.width = w;
    stage.canvas.height = 320*portion1;
    var wall0 = createWall(40,70,130,5);
    var wall1 = createWall(170,70,5,150);
    var wall2 = createWall(170,220,60,5);
    var wall3 = createWall(230,15,5,210);
    var wall4 = createWall(230,10,180,5);
    var wall5 = createWall(410,10,5,200);
    var wall6 = createWall(410,210,60,5);
    var wall7 = createWall(470,75,5,140);
    var wall8 = createWall(470,70,100,5);
    var wall9 = createWall(40,145,55,5);
    var wall10 = createWall(95,145,5,150);
    var wall11 = createWall(95,295,210,5);
    var wall12 = createWall(305,90,5,210);
    var wall13 = createWall(305,85,30,5);
    var wall14 = createWall(335,85,5,200);
    var wall15 = createWall(335,285,210,5);
    var wall16 = createWall(545,150,5,140);
    var wall17 = createWall(545,145,25,5);

    var arrWall=[wall0,wall1,wall2,wall3,wall4,wall5,wall6,wall7,wall8,wall9,wall10,wall11,wall12,wall13,wall14,wall15,wall16,wall17];
    var queue = new createjs.LoadQueue(true),tablet;
    queue.loadFile('images/tablet1.png');
    queue.on("fileload", handleFileLoad);
    function handleFileLoad(event){
        tablet = createTablet(55,100,event.result);
	    tablet.img.on('pressmove',ontouchmove);
    }
    function ontouchmove(event){
		t = event.target;
		t.x=event.stageX;
		t.y=event.stageY;
        var x = event.stageX;
        var y = event.stageY;
        hitTest(x,y);
		stage.update();
    }
    function off(){
        console.log('off');
        //tablet.img.off('presssmove',ontouchmove);
        tablet.img.removeAllEventListeners();
		//stage.update();
    }
    function hitTest(x,y){
        var arr = arrWall;
        if(tablet.img.x-tablet.w/2 <= arr[0].x){
            tablet.img.x = arr[0].x+tablet.w/2;
        }
        //第1通道
        if(x>=arr[0].x&&x<=arr[10].x&&y>=arr[0].y+arr[0].h&&y<=arr[9].y){
            //禁止药片向左移动
            if(tablet.img.x-tablet.w/2 <= arr[0].x){
                tablet.img.x = arr[0].x+tablet.w/2;
            }
            //触碰到第1个墙
            if(tablet.img.y-tablet.h/2<arr[0].y+arr[0].h){
                tablet.img.y = arr[0].y+tablet.h/2+arr[0].h;
                arr[0].setColor();
                off();
            }
            //触碰到第10个墙
            if(tablet.img.y+tablet.h/2>arr[9].y){
                tablet.img.y = arr[9].y-tablet.h/2;
                arr[9].setColor();
                off();
            }
        }else if(x>=arr[10].x&&x<=arr[1].x&&y>=arr[0].y+arr[0].h&&y<=arr[9].y){
            //触碰到第1个墙
            if(tablet.img.y-tablet.h/2<arr[0].y+arr[0].h){
                tablet.img.y = arr[0].y+tablet.h/2+arr[0].h;
                arr[0].setColor();
                off();
            }
            //触碰到第2个墙
            if(tablet.img.x+tablet.w/2 >= arr[1].x){
                tablet.img.x = arr[1].x-tablet.w/2;
                arr[1].setColor();
                off();
            }
            //触碰到第10个墙
            if(tablet.img.x-tablet.w/2<arr[10].x&&tablet.img.y+tablet.h/2>arr[9].y){
                tablet.img.y = arr[9].y-tablet.h/2;
                tablet.img.x = arr[10].x+tablet.w/2;
                arr[9].setColor();
                off();
            }
        }else if(x>=arr[10].x&&x<=arr[1].x&&y>=arr[9].y+arr[0].h&&y<=arr[2].y){
            //触碰到第2个墙
            if(tablet.img.x+tablet.w/2 >= arr[1].x){
                tablet.img.x = arr[1].x-tablet.w/2;
                arr[1].setColor();
                off();
            }
            //触碰到第11个墙
            if(tablet.img.x-tablet.w/2 <= arr[11].x){
                tablet.img.x = arr[11].x+tablet.w/2;
                arr[10].setColor();
                off();
            }
        }else if(x>=arr[10].x&&x<=arr[1].x&&y>=arr[2].y+arr[2].h&&y<=arr[11].y){
            //触碰到第2个墙
            if(tablet.img.x+tablet.w/2 >= arr[1].x&&tablet.img.y-tablet.h/2 <= arr[2].y){
                tablet.img.x = arr[1].x-tablet.w/2;
                tablet.img.y = arr[2].y+tablet.h/2;
                arr[1].setColor();
                off();
            }
            //触碰到第11个墙
            if(tablet.img.x-tablet.w/2 <= arr[11].x){
                tablet.img.x = arr[11].x+tablet.w/2;
                arr[10].setColor();
                off();
            }
            //触碰到第12个墙
            if(tablet.img.y+tablet.h/2>arr[11].y){
                tablet.img.y = arr[11].y-tablet.h/2;
                arr[11].setColor();
                off();
            }
        }else if(x>=arr[1].x&&x<=arr[4].x&&y>=arr[2].y+arr[2].h&&y<=arr[11].y){
            //触碰到第3个墙
            if(tablet.img.y-tablet.h/2 <= arr[2].y+arr[2].h){
                tablet.img.y = arr[2].y+arr[2].h+tablet.h/2;
                arr[2].setColor();
                off();
            }
            //触碰到第12个墙
            if(tablet.img.y+tablet.h/2>arr[11].y){
                tablet.img.y = arr[11].y-tablet.h/2;
                arr[11].setColor();
                off();
            }
        }else if(x>=arr[4].x&&x<=arr[12].x&&y>=arr[2].y+arr[2].h&&y<=arr[11].y){
            //触碰到第3个墙
            if(tablet.img.y-tablet.h/2 <= arr[2].y+arr[2].h&&tablet.img.x-tablet.w/2 <= arr[3].x){
                tablet.img.y = arr[2].y+arr[2].h+tablet.h/2;
                tablet.img.x = arr[3].x+tablet.w/2;
                arr[2].setColor();
                off();
            }
            //触碰到第12个墙
            if(tablet.img.y+tablet.h/2>arr[11].y){
                tablet.img.y = arr[11].y-tablet.h/2;
                arr[11].setremoveAllEventListenersColor();
                off();
            }
            //触碰到第13个墙
            if(tablet.img.x+tablet.w/2>arr[12].x){
                tablet.img.x = arr[12].x-tablet.w/2;
                arr[12].setColor();
                off();
            }
        }else if(x>=arr[4].x&&x<=arr[12].x&&y>=arr[13].y+arr[13].h&&y<=arr[2].y){
            //触碰到第4个墙
            if(tablet.img.x-tablet.w/2 <= arr[4].x){
                tablet.img.x = arr[4].x+tablet.w/2;
                arr[3].setColor();
                off();
            }
            //触碰到第13个墙
            if(tablet.img.x+tablet.w/2>arr[12].x){
                tablet.img.x = arr[12].x-tablet.w/2;
                arr[12].setColor();
                off();
            }
        }else if(x>=arr[4].x&&x<=arr[12].x&&y>=arr[4].y+arr[4].h&&y<=arr[13].y){
            //触碰到第4个墙
            if(tablet.img.x-tablet.w/2 <= arr[4].x){
                tablet.img.x = arr[4].x+tablet.w/2;
                arr[3].setColor();
                off();
            }
            //触碰到第5个墙
            if(tablet.img.y-tablet.h/2 <= arr[4].y+arr[4].h){
                tablet.img.y = arr[4].y+arr[4].h+tablet.h/2;
                arr[4].setColor();
                off();
            }
            //触碰到第13个墙
            if(tablet.img.x+tablet.w/2>arr[12].x&&tablet.img.y+tablet.h/2>arr[12].y){
                tablet.img.x = arr[12].x-tablet.w/2;
                tablet.img.y = arr[12].y-tablet.h/2;
                arr[12].setColor();
                off();
            }
            //触碰到第14个墙
            if(tablet.img.y+tablet.h/2>arr[13].y&&tablet.img.x+tablet.w/2>arr[13].x){
                tablet.img.x = arr[13].x-tablet.w/2;
                tablet.img.y = arr[13].y-tablet.h/2;
                arr[13].setColor();
                off();
            }
        }else if(x>=arr[13].x&&x<=arr[14].x&&y>=arr[4].y+arr[4].h&&y<=arr[13].y){
            //触碰到第5个墙
            if(tablet.img.y-tablet.h/2 <= arr[4].y+arr[4].h){
                tablet.img.y = arr[4].y+arr[4].h+tablet.h/2;
                arr[4].setColor();
                off();
            }
            //触碰到第14个墙
            if(tablet.img.y+tablet.h/2>arr[13].y){
                tablet.img.y = arr[13].y-tablet.h/2;
                arr[13].setColor();
                off();
            }
        }else if(x>=arr[14].x&&x<=arr[5].x&&y>=arr[4].y+arr[4].h&&y<=arr[13].y){
            //触碰到第5个墙
            if(tablet.img.y-tablet.h/2 <= arr[4].y+arr[4].h){
                tablet.img.y = arr[4].y+arr[4].h+tablet.h/2;
                arr[4].setColor();
                off();
            }
            //触碰到第6个墙
            if(tablet.img.x+tablet.w/2 >= arr[5].x){
                tablet.img.x = arr[5].x-tablet.w/2;
                arr[5].setColor();
                off();
            }
            //触碰到第14个墙
            if(tablet.img.y+tablet.h/2>arr[13].y&&tablet.img.x-tablet.w/2<arr[14].x){
                tablet.img.x = arr[14].x+tablet.w/2;
                tablet.img.y = arr[13].y-tablet.h/2;
                arr[13].setColor();
                off();
            }
            //触碰到第15个墙
            if(tablet.img.x-tablet.w/2<=arr[14].x+arr[14].w&&tablet.img.y+tablet.h/2>arr[14].y){
                tablet.img.x = arr[14].x+tablet.w/2+arr[14].w;
                tablet.img.y = arr[14].y-tablet.h/2;
                arr[14].setColor();
                off();
            }
        }else if(x>=arr[14].x&&x<=arr[5].x&&y>=arr[13].y+arr[13].h&&y<=arr[6].y){
            //触碰到第6个墙
            if(tablet.img.x+tablet.w/2 >= arr[5].x){
                tablet.img.x = arr[5].x-tablet.w/2;
                arr[5].setColor();
                off();
            }
            //触碰到第15个墙
            if(tablet.img.x-tablet.w/2<=arr[14].x+arr[14].w){
                tablet.img.x = arr[14].x+tablet.w/2+arr[14].w;
                arr[14].setColor();
                off();
            }
        }else if(x>=arr[14].x&&x<=arr[5].x&&y>=arr[6].y+arr[6].h&&y<=arr[15].y){
            //触碰到第15个墙
            if(tablet.img.x-tablet.w/2<=arr[14].x+arr[14].w){
                tablet.img.x = arr[14].x+tablet.w/2+arr[14].w;
                arr[14].setColor();
                off();
            }
            //触碰到第16个墙
            if(tablet.img.y+tablet.h/2>arr[15].y){
                tablet.img.y = arr[15].y-tablet.h/2;
                arr[15].setColor();
                off();
            }
            //触碰到第6个墙
            if(tablet.img.y-tablet.h/2 <= arr[6].y+arr[6].h&&tablet.img.x+tablet.w/2 >= arr[5].x){
                tablet.img.x = arr[5].x-tablet.w/2;
                tablet.img.y = arr[6].y+tablet.h/2+arr[6].h;
                arr[5].setColor();
                off();
            }
            //触碰到第7个墙
            if(tablet.img.y-tablet.h/2 <= arr[6].y+arr[6].h&&tablet.img.x+tablet.w/2 >= arr[6].x){
                tablet.img.x = arr[5].x-tablet.w/2;
                tablet.img.y = arr[6].y+tablet.h/2+arr[6].h;
                arr[6].setColor();
                off();
            }
        }else if(x>=arr[6].x&&x<=arr[7].x&&y>=arr[6].y+arr[6].h&&y<=arr[15].y){
            //触碰到第7个墙
            if(tablet.img.y-tablet.h/2 <= arr[6].y+arr[6].h){
                tablet.img.y = arr[6].y+tablet.h/2+arr[6].h;
                arr[6].setColor();
                off();
            }
            //触碰到第16个墙
            if(tablet.img.y+tablet.h/2>arr[15].y){
                tablet.img.y = arr[15].y-tablet.h/2;
                arr[15].setColor();
                off();
            }
        }else if(x>=arr[7].x&&x<=arr[17].x&&y>=arr[6].y+arr[6].h&&y<=arr[15].y){
            //触碰到第7个墙
            if(tablet.img.x-tablet.w/2 <= arr[7].x&&tablet.img.y-tablet.h/2 <= arr[6].y+arr[6].h){
                tablet.img.y = arr[6].y+tablet.h/2+arr[6].h;
                tablet.img.x = arr[7].x+tablet.w/2;
                arr[6].setColor();
                off();
            }
            //触碰到第8个墙
            if(tablet.img.y-tablet.h/2 <= arr[6].y+arr[6].h&&tablet.img.x-tablet.w/2 <= arr[7].x){
                tablet.img.y = arr[6].y+tablet.h/2+arr[6].h;
                tablet.img.x = arr[7].x+tablet.w/2;
                arr[7].setColor();
                off();
            }
            //触碰到第16个墙
            if(tablet.img.y+tablet.h/2>arr[15].y){
                tablet.img.y = arr[15].y-tablet.h/2;
                arr[15].setColor();
                off();
            }
            //触碰到第17个墙
            if(tablet.img.x+tablet.w/2>arr[16].x){
                tablet.img.w = arr[16].x-tablet.w/2;
                arr[16].setColor();
                off();
            }
        }else if(x>=arr[7].x&&x<=arr[17].x&&y>=arr[16].y+arr[16].h&&y<=arr[6].y){
            //触碰到第17个墙
            if(tablet.img.x+tablet.w/2>arr[16].x){
                tablet.img.w = arr[16].x-tablet.w/2;
                arr[16].setColor();
                off();
            }
            //触碰到第8个墙
            if(tablet.img.x-tablet.w/2 <= arr[7].x){
                tablet.img.x = arr[7].x+tablet.w/2;
                arr[7].setColor();
                off();
            }
        }else if(x>=arr[7].x&&x<=arr[17].x&&y>=arr[8].y+arr[8].h&&y<=arr[16].y){
            //触碰到第8个墙
            if(tablet.img.x-tablet.w/2 <= arr[7].x){
                tablet.img.x = arr[7].x+tablet.w/2;
                arr[7].setColor();
                off();
            }
            //触碰到第9个墙
            if(tablet.img.y-tablet.h/2 <= arr[8].y+arr[8].h){
                tablet.img.y = arr[8].y+arr[8].h+tablet.h/2;
                arr[8].setColor();
                off();
            }
            //触碰到第17个墙
            if(tablet.img.x+tablet.w/2>arr[16].x&&tablet.img.y+tablet.h/2>arr[16].y){
                tablet.img.x = arr[16].x-tablet.w/2;
                tablet.img.y = arr[16].y-tablet.h/2;
                arr[16].setColor();
                off();
            }
            //触碰到第18个墙
            if(tablet.img.y+tablet.h/2>arr[17].y&&tablet.img.x+tablet.w/2>arr[17].x){
                tablet.img.x = arr[17].x-tablet.w/2;
                tablet.img.y = arr[17].y-tablet.h/2;
                arr[17].setColor();
                off();
            }
        }else if(x>=arr[17].x&&x<=arr[17].x+arr[17].w&&y>=arr[8].y+arr[8].h&&y<=arr[16].y){
            //触碰到第9个墙
            if(tablet.img.y-tablet.h/2 <= arr[8].y+arr[8].h){
                tablet.img.y = arr[8].y+arr[8].h+tablet.h/2;
                arr[8].setColor();
                off();
            }
            //触碰到第18个墙
            if(tablet.img.y+tablet.h/2>arr[17].y){
                tablet.img.y = arr[17].y-tablet.h/2;
                arr[17].setColor();
                off();
            }
        }else if(x>=arr[17].x+arr[17].w&&y>=arr[8].y+arr[8].h&&y<=arr[16].y){
            success();
            off();
        }
    }
    function success(){
        tablet.img.x = arrWall[8].x+arrWall[8].w-tablet.w/2;
        tablet.img.y = arrWall[8].y+arrWall[8].h+tablet.h;
    }
