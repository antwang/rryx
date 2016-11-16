var basicUrl = 'http://xiaoxian.renren.com/';
var title = '争“鲜”恐后 鲜享一切';
var url = basicUrl;
var pic = basicUrl + 'share.jpg';
var content = '#测试你的鲜嫩指数，让小鲜手机成就非一般的“鲜嫩自我”，参与即有机会获得小鲜手机！';
function shareActivity(id){
	switch (id) {						
		case 1:
			//人人
			window.open('http://widget.renren.com/dialog/share?resourceUrl='
					+ encodeURIComponent(url)  + '&srcUrl='
                    + encodeURIComponent(url)+ '&title='
					+ encodeURIComponent(title) + '&images='
					+ encodeURIComponent(pic) + '&description='
					+ encodeURIComponent(content), '_blank');
			break;
		case 2:
			//新浪微博
			window.open('http://v.t.sina.com.cn/share/share.php?title='
					+ encodeURIComponent(content) + '&pic='
					+ encodeURIComponent(pic) + '&url='
					+ encodeURIComponent(url), '_blank');
			break;			
		case 3:
			//豆瓣
			window.open('http://shuo.douban.com/!service/share?text='
					+ encodeURIComponent(content + url) + '&image='
					+ encodeURIComponent(pic) + '&href='
					+ encodeURIComponent(url) + '&name='
					+ encodeURIComponent(title), '_blank');
			break;			
		case 4:
			//腾讯微博
			window.open('http://v.t.qq.com/share/share.php?title='
					+encodeURIComponent(content)+'&pic='
					+encodeURIComponent(pic)+'&url='
					+encodeURIComponent(url),'_blank');
			break;
		case 5:
			//开心
			window.open('http://www.kaixin001.com/rest/records.php?style=11&content='
					+ encodeURIComponent(content) + '&pic='
					+ encodeURIComponent(pic) + '&url='
					+ encodeURIComponent(url), '_blank');
			break;	
		case 6:
			//QQ空间&朋友网
			window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?'
					+'title=' + encodeURIComponent(title)
					+'&url=' + encodeURIComponent(url)
					+'&summary=' + encodeURIComponent(content),'_blank');
			break;			
	}		
}	
