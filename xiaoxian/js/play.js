var workId = 0;
$(document).ready(function(){
	var video = $("#video")[0];
	/*$("#video").bind("error",
		function(e) {
			switch (e.target.error.code) {
				case e.target.error.MEDIA_ERR_ABORTED:
					showTips("媒体资源获取异常");
					break;
				case e.target.error.MEDIA_ERR_NETWORK:
					showTips("网络错误");
					break;
				case e.target.error.MEDIA_ERR_DECODE:
					showTips("媒体解码错误");
					break;
				case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
					showTips("视频格式被不支持");
					break;
				default:
					showTips("这个是神马错误啊");
					break;
			}
		}
	);
	$("#video").bind("progress error abort",
		function(e) {
			switch (e.target.readyState) {
				case 0:
					showTips("当前播放位置无有效媒介资源");
					break;
				case 1:
					showTips("加载中，媒介资源确认存在，但当前位置没有能够加载到有效媒介数据进行播放");
					break;
				case 2:
					showTips("已获取到当前播放数据，但没有足够的数据进行播放");
					break;
				case 3:
					showTips("已获取到后续播放数据，可以进行播放");
					break;
				default:
				case 4:
					showTips("可以进行播放，且浏览器确认媒体数据以某一种速度进行加载，可以保证有足够的后续数据进行播放，而不会使浏览器的播放进度赶上加载数据的末端");
					break;
			}
		}
	);
	$("#video").bind("stalled",
		function(e) {
			showTips("当前资源不可用")
		}
	);*/
	$('.rClose').live('click',function(){
	    video.pause();
        //video.muted = true;
		$(".rrPopup").closePop();
    })

	$("#playbox").click(function(event) {
		/* Act on the event */
		if (video.paused){
			video.play();
		}
		else{
			video.pause();
		}
	});
	
	$("#vList li").live("click", function(){
		/* Act on the event */
		var fileURL_Mp4 = $(this).attr("data-video-mp4");
		var TITLE = $(this).attr("data-video-title");
        preloading();
		if (fileURL_Mp4 != ""){
            video.src = fileURL_Mp4;
            video.load();  
            video.addEventListener("canplaythrough",loaded,false);
			video.addEventListener("error",
				function(e) {
					switch (e.target.error.code) {
						case e.target.error.MEDIA_ERR_ABORTED:
							showTips("媒体资源获取异常");
							break;
						case e.target.error.MEDIA_ERR_NETWORK:
							showTips("网络错误");
							break;
						case e.target.error.MEDIA_ERR_DECODE:
							showTips("媒体解码错误");
							break;
						case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
							showTips("视频格式被不支持");
							break;
						default:
							showTips("这个是神马错误啊");
							break;
					}
				}
			);
			$('#videotitle').text(TITLE);
			$('#p1').showPop();
            video.play();
        }
	});
});

function showTips(msg){
	jQuery.yx.alert({"text": msg, 'callback':function(){

		}
	});
}

function toLogin() {
	$.yx.tologin(function(flag){
		if (flag == 1)
			window.location = document.URL;
	})
}
function preloading(){
    var limg = document.createElement('img');
    limg.src="images/video/loading2.gif";
    limg.id = 'loadingTips';
    var loadingTips = document.getElementById('loadingTips');
    var vd = document.getElementById('video');
    vd.parentNode.appendChild(limg);
    limg.style.width="2rem";
    limg.style.height="2rem";
    limg.style.display="block";
    limg.style.margin="1rem auto";
}
function loaded(){
    $('#loadingTips').remove();
}
