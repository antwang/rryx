        var appId = '';
       // var highestScore = {{ user.highestScore }};
        var imgUrl = 'http://huaweimaimang.renren.com/share.jpg';
        var link = 'http://huaweimaimang.renren.com';
        var title = '华为麦芒C199手机-青春 锋芒绽放';
       // var reportUrl = '{{ url("weixin/share.json") }}';
        function getDesc() {
            return '#华为麦芒C199手机#青春是一种刺，穿过冷眼，挣脱迷茫！磨砺锋芒，生命绽放！';
        }
        (function(){
            var report = function(link, type) {
               /* $.ajax({
                    url: reportUrl,
                    type: 'POST',
                    dataType: 'json',
                    data: {link: link, type: type}
                });*/
                return true;
            };

            var onBridgeReady = function() {
                WeixinJSBridge.call('hideToolbar');
                WeixinJSBridge.call('showOptionMenu');

                // 分享到朋友圈;
                WeixinJSBridge.on('menu:share:timeline', function(argv){
                    WeixinJSBridge.invoke('shareTimeline',{
                        "img_url"    : imgUrl,
                        "img_width"  : "400",
                        "img_height" : "400",
                        "link"       : link,
                        "desc"       : getDesc(),
                        "title"      : title
                    }, function(res){
                        report(link, 'timeline');
                    });
                });

                //分享给好友
                WeixinJSBridge.on('menu:share:appmessage', function(argv){
                    WeixinJSBridge.invoke('sendAppMessage',{
                        "appid"      : appId,
                        "img_url"    : imgUrl,
                        "img_width"  : "400",
                        "img_height" : "400",
                        "link"       : link,
                        "desc"       : getDesc(),
                        "title"      : title
                    }, function(res){
                        report(link, 'appmessage');
                    });
                });

                // 分享到微博
                WeixinJSBridge.on('menu:share:weibo', function(argv){
                    WeixinJSBridge.invoke('shareWeibo',{
                        "content" : getDesc() + link,
                        "url"     : link
                    }, function(res){
                        report(link, 'weibo');
                    });
                });

                // 分享到Facebook
                WeixinJSBridge.on('menu:share:facebook', function(argv){
                    report(link);
                    WeixinJSBridge.invoke('shareFB',{
                          "img_url"    : imgUrl,
                          "img_width"  : "640",
                          "img_height" : "640",
                          "link"       : link,
                          "desc"       : getDesc(),
                          "title"      : title
                    }, function(res) {
                        report(link, 'facebook')
                    } );
                });

                // 新的接口
                WeixinJSBridge.on('menu:general:share', function(argv){
                    var scene = 0;
                    switch(argv.shareTo){
                        case 'friend'  : scene = 1; break;
                        case 'timeline': scene = 2; break;
                        case 'weibo'   : scene = 3; break;
                    }
                    argv.generalShare({
                        "appid"      : appId,
                        "img_url"    : imgUrl,
                        "img_width"  : "640",
                        "img_height" : "640",
                        "link"       : link,
                        "desc"       : getDesc(),
                        "title"      : title
                    }, function(res){
                        report(link, argv.shareTo);
                    });
                });
            };

            document.addEventListener('WeixinJSBridgeReady', onBridgeReady);
        })();
    
