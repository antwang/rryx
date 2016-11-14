;(function(w){
    var Maze = function(stage,callback){
        this.ratio = document.documentElement.clientWidth/640;
        this.cm = 0;
        this.arrWall = [];
        this.init(stage);
        this.callback = callback;
    }
    Maze.prototype = {
        init:function(stage){
            var w = document.documentElement.clientWidth;
            this.stage = new createjs.Stage(stage);
            createjs.Touch.enable(this.stage);
	        this.stage.mouseMoveOutside = true; 
            this.stage.canvas.width = w;
            this.stage.canvas.height = 320*this.ratio;
            this.constructMaze();
        },
        createWall:function(x,y,w,h){
            this.originshadow = new createjs.Shadow('#13c819',0,0,5);
            var shape = new createjs.Shape();
            this.originGraphics = new createjs.Graphics().beginFill('rgba(19,200,25,1)').drawRect(0, 0, w*this.ratio, h*this.ratio);
            shape.set({graphics:this.originGraphics,shadow:this.originshadow});
            shape.x = x*this.ratio;
            shape.y = y*this.ratio;
            shape.w = w*this.ratio;
            shape.h = h*this.ratio;
            this.stage.addChild(shape);
            this.arrWall.push(shape);
            this.stage.update();
        },
        setColor:function(obj){
            var that = this;
            that.off();
            //var shape1 = new createjs.Shape();
            //shape1.graphics.begeinFill("#f00").drawRect(0, 0,obj.w,obj.h);
            myGraphics = new createjs.Graphics().beginFill("#f00").drawRect(0, 0,obj.w,obj.h); 
            that.originGraphics = new createjs.Graphics().beginFill('rgba(19,200,25,1)').drawRect(0, 0,obj.w,obj.h);
            obj.shadow = new createjs.Shadow('#f00',0,0,5);
            obj.set({graphics:myGraphics,shadow:obj.shadow});
            that.stage.update();
            setTimeout(restart,500);
            function restart(){
                obj.set({graphics:that.originGraphics,shadow:that.originshadow});
                that.tablet.x = 55*that.ratio;
                that.tablet.y = 100*that.ratio;
	            that.tablet.on('pressmove',that.ontouchmove,that);
                that.stage.update();
            }
        },
        createTablet:function(x,y,img){
            this.tablet = new createjs.Bitmap(img);
            var w = this.tablet.image.width*this.ratio*0.7;
            var h = this.tablet.image.height*this.ratio*0.7;
            this.tablet.setTransform(x*this.ratio,y*this.ratio, .7, .7,0,0,0,w/2,h/2)
            this.tW = w;
            this.tH = h;
	        this.tablet.on('pressmove',this.ontouchmove,this);
            this.stage.addChild(this.tablet);
            this.stage.update();
        },
        ontouchmove:function(event){
            var that = this;
		    var t = event.target;
		    t.x=event.stageX;
		    t.y=event.stageY;
            that.hitTest(event.stageX,event.stageY);
		    that.stage.update();
            that.tablet.on('pressup',that.onpressup,that);
        },
        onpressup:function(event){
            var that = this;
		    var t = event.target;
		    t.x=event.stageX;
		    t.y=event.stageY;
            that.hitTest(event.stageX,event.stageY);
		    that.stage.update();
        },
        off:function(){
            this.tablet.removeAllEventListeners();
        },
        help:function(){
            this.cm = 1;
            this.success();
        },
        success:function(){
            this.off();
            this.tablet.x = this.arrWall[8].x+this.arrWall[8].w-this.tW/2;
            this.tablet.y = this.arrWall[8].y+this.arrWall[8].h+this.tH;
            this.stage.update();
            this.callback(this.cm);
        },
        constructMaze:function(){
            this.createWall(40,70,130,5);
            this.createWall(170,70,5,150);
            this.createWall(170,220,60,5);
            this.createWall(230,15,5,210);
            this.createWall(230,10,180,5);
            this.createWall(410,10,5,200);
            this.createWall(410,210,60,5);
            this.createWall(470,75,5,140);
            this.createWall(470,70,100,5);
            this.createWall(40,145,55,5);
            this.createWall(95,145,5,150);
            this.createWall(95,295,210,5);
            this.createWall(305,90,5,210);
            this.createWall(305,85,30,5);
            this.createWall(335,85,5,200);
            this.createWall(335,285,210,5);
            this.createWall(545,150,5,140);
            this.createWall(545,145,25,5);
            var queue = new createjs.LoadQueue(true);
            var that = this;
            queue.loadFile('images/pics/tablet1.png');
            queue.on("fileload", handleFileLoad);
            function handleFileLoad(event){
                that.createTablet(55,100,event.result);
            }
        },
        hitTest:function(x,y){
            var arr = this.arrWall;
            if(this.tablet.x-this.tW/2 <= arr[0].x){
                this.tablet.x = arr[0].x+this.tW/2;
            }
            //第1通道
            if(x>=arr[0].x&&x<=arr[10].x&&y>=arr[0].y+arr[0].h&&y<=arr[9].y){
                //禁止药片向左移动
                if(this.tablet.x-this.tW/2 <= arr[0].x){
                    this.tablet.x = arr[0].x+this.tW/2;
                }
                //触碰到第1个墙
                if(this.tablet.y-this.tH/2<arr[0].y+arr[0].h){
                    this.tablet.y = arr[0].y+this.tH/2+arr[0].h;
                    this.setColor(arr[0]);
                }
                //触碰到第10个墙
                if(this.tablet.y+this.tH/2>arr[9].y){
                    this.tablet.y = arr[9].y-this.tH/2;
                    this.setColor(arr[9]);
                }
            }else if(x>=arr[10].x&&x<=arr[1].x&&y>=arr[0].y+arr[0].h&&y<=arr[9].y){
                //触碰到第1个墙
                if(this.tablet.y-this.tH/2<arr[0].y+arr[0].h){
                    this.tablet.y = arr[0].y+this.tH/2+arr[0].h;
                    this.setColor(arr[0]);
                }
                //触碰到第2个墙
                if(this.tablet.x+this.tW/2 >= arr[1].x){
                    this.tablet.x = arr[1].x-this.tW/2;
                    this.setColor(arr[1]);
                }
                //触碰到第10个墙
                if(this.tablet.x-this.tW/2<arr[10].x&&this.tablet.y+this.tH/2>arr[9].y){
                    this.tablet.y = arr[9].y-this.tH/2;
                    this.tablet.x = arr[10].x+this.tW/2;
                    this.setColor(arr[9]);
                }
            }else if(x>=arr[10].x&&x<=arr[1].x&&y>=arr[9].y+arr[0].h&&y<=arr[2].y){
                //触碰到第2个墙
                if(this.tablet.x+this.tW/2 >= arr[1].x){
                    this.tablet.x = arr[1].x-this.tW/2;
                    this.setColor(arr[1]);
                }
                //触碰到第11个墙
                if(this.tablet.x-this.tW/2 <= arr[11].x){
                    this.tablet.x = arr[11].x+this.tW/2;
                    this.setColor(arr[10]);
                }
            }else if(x>=arr[10].x&&x<=arr[1].x&&y>=arr[2].y+arr[2].h&&y<=arr[11].y){
                //触碰到第2个墙
                if(this.tablet.x+this.tW/2 >= arr[1].x&&this.tablet.y-this.tH/2 <= arr[2].y){
                    this.tablet.x = arr[1].x-this.tW/2;
                    this.tablet.y = arr[2].y+this.tH/2;
                    this.setColor(arr[1]);
                }
                //触碰到第11个墙
                if(this.tablet.x-this.tW/2 <= arr[11].x){
                    this.tablet.x = arr[11].x+this.tW/2;
                    this.setColor(arr[10]);
                }
                //触碰到第12个墙
                if(this.tablet.y+this.tH/2>arr[11].y){
                    this.tablet.y = arr[11].y-this.tH/2;
                    this.setColor(arr[11]);
                }
            }else if(x>=arr[1].x&&x<=arr[4].x&&y>=arr[2].y+arr[2].h&&y<=arr[11].y){
                //触碰到第3个墙
                if(this.tablet.y-this.tH/2 <= arr[2].y+arr[2].h){
                    this.tablet.y = arr[2].y+arr[2].h+this.tH/2;
                    this.setColor(arr[2]);
                }
                //触碰到第12个墙
                if(this.tablet.y+this.tH/2>arr[11].y){
                    this.tablet.y = arr[11].y-this.tH/2;
                    this.setColor(arr[11]);
                }
            }else if(x>=arr[4].x&&x<=arr[12].x&&y>=arr[2].y+arr[2].h&&y<=arr[11].y){
                //触碰到第3个墙
                if(this.tablet.y-this.tH/2 <= arr[2].y+arr[2].h&&this.tablet.x-this.tW/2 <= arr[3].x){
                    this.tablet.y = arr[2].y+arr[2].h+this.tH/2;
                    this.tablet.x = arr[3].x+this.tW/2;
                    this.setColor(arr[2]);
                }
                //触碰到第12个墙
                if(this.tablet.y+this.tH/2>arr[11].y){
                    this.tablet.y = arr[11].y-this.tH/2;
                    this.setColor(arr[11]);
                }
                //触碰到第13个墙
                if(this.tablet.x+this.tW/2>arr[12].x){
                    this.tablet.x = arr[12].x-this.tW/2;
                    this.setColor(arr[12]);
                }
            }else if(x>=arr[4].x&&x<=arr[12].x&&y>=arr[13].y+arr[13].h&&y<=arr[2].y){
                //触碰到第4个墙
                if(this.tablet.x-this.tW/2 <= arr[4].x){
                    this.tablet.x = arr[4].x+this.tW/2;
                    this.setColor(arr[3]);
                }
                //触碰到第13个墙
                if(this.tablet.x+this.tW/2>arr[12].x){
                    this.tablet.x = arr[12].x-this.tW/2;
                    this.setColor(arr[12]);
                }
            }else if(x>=arr[4].x&&x<=arr[12].x&&y>=arr[4].y+arr[4].h&&y<=arr[13].y){
                //触碰到第4个墙
                if(this.tablet.x-this.tW/2 <= arr[4].x){
                    this.tablet.x = arr[4].x+this.tW/2;
                    this.setColor(arr[3]);
                }
                //触碰到第5个墙
                if(this.tablet.y-this.tH/2 <= arr[4].y+arr[4].h){
                    this.tablet.y = arr[4].y+arr[4].h+this.tH/2;
                    this.setColor(arr[4]);
                }
                //触碰到第13个墙
                if(this.tablet.x+this.tW/2>arr[12].x&&this.tablet.y+this.tH/2>arr[12].y){
                    this.tablet.x = arr[12].x-this.tW/2;
                    this.tablet.y = arr[12].y-this.tH/2;
                    this.setColor(arr[12]);
                }
                //触碰到第14个墙
                if(this.tablet.y+this.tH/2>arr[13].y&&this.tablet.x+this.tW/2>arr[13].x){
                    this.tablet.x = arr[13].x-this.tW/2;
                    this.tablet.y = arr[13].y-this.tH/2;
                    this.setColor(arr[13]);
                }
            }else if(x>=arr[13].x&&x<=arr[14].x&&y>=arr[4].y+arr[4].h&&y<=arr[13].y){
                //触碰到第5个墙
                if(this.tablet.y-this.tH/2 <= arr[4].y+arr[4].h){
                    this.tablet.y = arr[4].y+arr[4].h+this.tH/2;
                    this.setColor(arr[4]);
                }
                //触碰到第14个墙
            if(this.tablet.y+this.tH/2>arr[13].y){
                this.tablet.y = arr[13].y-this.tH/2;
                this.setColor(arr[13]);
            }
        }else if(x>=arr[14].x&&x<=arr[5].x&&y>=arr[4].y+arr[4].h&&y<=arr[13].y){
            //触碰到第5个墙
            if(this.tablet.y-this.tH/2 <= arr[4].y+arr[4].h){
                this.tablet.y = arr[4].y+arr[4].h+this.tH/2;
                this.setColor(arr[4]);
            }
            //触碰到第6个墙
            if(this.tablet.x+this.tW/2 >= arr[5].x){
                this.tablet.x = arr[5].x-this.tW/2;
                this.setColor(arr[5]);
            }
            //触碰到第14个墙
            if(this.tablet.y+this.tH/2>arr[13].y&&this.tablet.x-this.tW/2<arr[14].x){
                this.tablet.x = arr[14].x+this.tW/2;
                this.tablet.y = arr[13].y-this.tH/2;
                this.setColor(arr[13]);
            }
            //触碰到第15个墙
            if(this.tablet.x-this.tW/2<=arr[14].x+arr[14].w&&this.tablet.y+this.tH/2>arr[14].y){
                this.tablet.x = arr[14].x+this.tW/2+arr[14].w;
                this.tablet.y = arr[14].y-this.tH/2;
                this.setColor(arr[14]);
            }
        }else if(x>=arr[14].x&&x<=arr[5].x&&y>=arr[13].y+arr[13].h&&y<=arr[6].y){
            //触碰到第6个墙
            if(this.tablet.x+this.tW/2 >= arr[5].x){
                this.tablet.x = arr[5].x-this.tW/2;
                this.setColor(arr[5]);
            }
            //触碰到第15个墙
            if(this.tablet.x-this.tW/2<=arr[14].x+arr[14].w){
                this.tablet.x = arr[14].x+this.tW/2+arr[14].w;
                this.setColor(arr[14]);
            }
        }else if(x>=arr[14].x&&x<=arr[5].x&&y>=arr[6].y+arr[6].h&&y<=arr[15].y){
            //触碰到第15个墙
            if(this.tablet.x-this.tW/2<=arr[14].x+arr[14].w){
                this.tablet.x = arr[14].x+this.tW/2+arr[14].w;
                this.setColor(arr[14]);
            }
            //触碰到第16个墙
            if(this.tablet.y+this.tH/2>arr[15].y){
                this.tablet.y = arr[15].y-this.tH/2;
                this.setColor(arr[15]);
            }
            //触碰到第6个墙
            if(this.tablet.y-this.tH/2 <= arr[6].y+arr[6].h&&this.tablet.x+this.tW/2 >= arr[5].x){
                this.tablet.x = arr[5].x-this.tW/2;
                this.tablet.y = arr[6].y+this.tH/2+arr[6].h;
                this.setColor(arr[5]);
            }
            //触碰到第7个墙
            if(this.tablet.y-this.tH/2 <= arr[6].y+arr[6].h&&this.tablet.x+this.tW/2 >= arr[6].x){
                this.tablet.x = arr[5].x-this.tW/2;
                this.tablet.y = arr[6].y+this.tH/2+arr[6].h;
                this.setColor(arr[6]);
            }
        }else if(x>=arr[6].x&&x<=arr[7].x&&y>=arr[6].y+arr[6].h&&y<=arr[15].y){
            //触碰到第7个墙
            if(this.tablet.y-this.tH/2 <= arr[6].y+arr[6].h){
                this.tablet.y = arr[6].y+this.tH/2+arr[6].h;
                this.setColor(arr[6]);
            }
            //触碰到第16个墙
            if(this.tablet.y+this.tH/2>arr[15].y){
                this.tablet.y = arr[15].y-this.tH/2;
                this.setColor(arr[15]);
            }
        }else if(x>=arr[7].x&&x<=arr[17].x&&y>=arr[6].y+arr[6].h&&y<=arr[15].y){
            //触碰到第7个墙
            if(this.tablet.x-this.tW/2 <= arr[7].x&&this.tablet.y-this.tH/2 <= arr[6].y+arr[6].h){
                this.tablet.y = arr[6].y+this.tH/2+arr[6].h;
                this.tablet.x = arr[7].x+this.tW/2;
                this.setColor(arr[6]);
            }
            //触碰到第8个墙
            if(this.tablet.y-this.tH/2 <= arr[6].y+arr[6].h&&this.tablet.x-this.tW/2 <= arr[7].x){
                this.tablet.y = arr[6].y+this.tH/2+arr[6].h;
                this.tablet.x = arr[7].x+this.tW/2;
                this.setColor(arr[7]);
            }
            //触碰到第16个墙
            if(this.tablet.y+this.tH/2>arr[15].y){
                this.tablet.y = arr[15].y-this.tH/2;
                this.setColor(arr[15]);
            }
            //触碰到第17个墙
            if(this.tablet.x+this.tW/2>arr[16].x){
                this.tW = arr[16].x-this.tW/2;
                this.setColor(arr[16]);
            }
        }else if(x>=arr[7].x&&x<=arr[17].x&&y>=arr[16].y+arr[16].h&&y<=arr[6].y){
            //触碰到第17个墙
            if(this.tablet.x+this.tW/2>arr[16].x){
                this.tW = arr[16].x-this.tW/2;
                this.setColor(arr[16]);
            }
            //触碰到第8个墙
            if(this.tablet.x-this.tW/2 <= arr[7].x){
                this.tablet.x = arr[7].x+this.tW/2;
                this.setColor(arr[7]);
            }
        }else if(x>=arr[7].x&&x<=arr[17].x&&y>=arr[8].y+arr[8].h&&y<=arr[16].y){
            //触碰到第8个墙
            if(this.tablet.x-this.tW/2 <= arr[7].x){
                this.tablet.x = arr[7].x+this.tW/2;
                this.setColor(arr[7]);
            }
            //触碰到第9个墙
            if(this.tablet.y-this.tH/2 <= arr[8].y+arr[8].h){
                this.tablet.y = arr[8].y+arr[8].h+this.tH/2;
                this.setColor(arr[8]);
            }
            //触碰到第17个墙
            if(this.tablet.x+this.tW/2>arr[16].x&&this.tablet.y+this.tH/2>arr[16].y){
                this.tablet.x = arr[16].x-this.tW/2;
                this.tablet.y = arr[16].y-this.tH/2;
                this.setColor(arr[16]);
            }
            //触碰到第18个墙
            if(this.tablet.y+this.tH/2>arr[17].y&&this.tablet.x+this.tW/2>arr[17].x){
                this.tablet.x = arr[17].x-this.tW/2;
                this.tablet.y = arr[17].y-this.tH/2;
                this.setColor(arr[17]);
            }
        }else if(x>=arr[17].x&&x<=arr[17].x+arr[17].w&&y>=arr[8].y+arr[8].h&&y<=arr[16].y){
            //触碰到第9个墙
            if(this.tablet.y-this.tH/2 <= arr[8].y+arr[8].h){
                this.tablet.y = arr[8].y+arr[8].h+this.tH/2;
                this.setColor(arr[8]);
            }
            //触碰到第18个墙
            if(this.tablet.y+this.tH/2>arr[17].y){
                this.tablet.y = arr[17].y-this.tH/2;
                this.setColor(arr[17]);
            }
            }else if(x>=arr[17].x+arr[17].w&&y>=arr[8].y+arr[8].h&&y<=arr[16].y){
                this.success();
            }
        }
    }
    w.createMaze = function(stage,callback){
        return new Maze(stage,callback);
    }
})(window);
