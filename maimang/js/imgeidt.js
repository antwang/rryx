var canvas = document.getElementById('canvas');
var image = document.getElementById('image');
var element = canvas.getContext("2d");
var angleInDegrees = 0;
var zoomDelta = 0.96;
var currentScale = 1;
var currentAngle = 0;
var canvasWidth = 300;
var novosDadosTRBL;
var novosDadosWH;
var novosDadosW;
var novosDadosH;
var startX, startY, isDown = false;
jQuery("#image").load(function(){
		//alert(jQuery(this).width());
		c_w=jQuery("#canvas").width();
		c_h=jQuery("#canvas").height();
		p_w=jQuery("#image").width();
		p_h=jQuery("#image").height();
		if(c_w/c_h>p_w/p_h){
			
			currentScale=c_w/p_w;
		}
		else{
			currentScale=c_h/p_h;
		}
		console.log(currentScale);
})
jQuery('#carregar').click(function () {

		element.translate(canvas.width / 2, canvas.height / 2);
		drawImage();
		jQuery('#canvas').attr('data-girar', 0);


    //this.disabled = true;
});

jQuery('#giraresq').click(function () {
    angleInDegrees = 5;
    currentAngle += angleInDegrees;
    drawImage();

});

jQuery('#girardir').click(function () {
    angleInDegrees = -5;
    currentAngle += angleInDegrees;
    drawImage();

});
jQuery('#zoomIn').click(function () {
    //currentScale += zoomDelta;
	currentScale = currentScale*1.05;
    drawImage();
});
jQuery('#zoomOut').click(function () {
    //currentScale -= zoomDelta;
	currentScale = currentScale*0.95;
    drawImage();
});
jQuery('#save').click(function () {
	savaPic(canvas);

});
canvas.addEventListener('touchstart', function(e) { 
	// 如果这个元素的位置内只有一个手指的话 
	if (e.targetTouches.length == 1) { 
	
	var pos = getMousePos(canvas, e.touches[0]);
	
    startX = pos.x;
    startY = pos.y;
	//$("#console").html("startX:"+startX+";startY:"+startY);
	e.preventDefault();
    isDown = true;
	} 
}, false);
canvas.addEventListener('touchmove', function(e) { 
	e.preventDefault();
	// 如果这个元素的位置内只有一个手指的话 
	if (e.targetTouches.length == 1) { 
		if (isDown === true) {
			var pos = getMousePos(canvas, e.touches[0]);
			var x = pos.x;
			var y = pos.y;
	
			element.translate(x - startX, y - startY);
			$("#console").html((x)+";"+(y));
			drawImage();
			
			startX = x;
			startY = y;
			
		}
	} 
}, false);

canvas.addEventListener('touchend', function(e) { 
	// 如果这个元素的位置内只有一个手指的话 
	if (e.targetTouches.length == 1) { 
		isDown = false;
	} 
}, false);
function drawImage() {
    clear();
    element.save();
    element.scale(currentScale, currentScale);
	console.log(currentScale);
    element.rotate(currentAngle * Math.PI / 180);
    element.drawImage(image, -image.width / 2, -image.height / 2);
    element.restore();
}

function clear() {
    element.clearRect(-image.width / 2 - 2, -image.width / 2 - 2, image.width + 4, image.height + 4);
}
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
function savaPic(canvas){
	dataImg=canvas.toDataURL();
	window.location.href=dataImg;
	//alert(dataImg);
	var b64 = dataImg.substring(22);//传给服务器这个值
}