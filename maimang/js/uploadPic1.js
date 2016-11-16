    var dec = '',//选中的模板宣言；
        addFans = 1,
        syn = 1,
        selectImg = '',
        fids = [],
        workId = 0,
        merge = null;
    jQuery(function(){
        jQuery('#btn_next1').live('click',function(){
            dec = jQuery('#dec').val(); 
            jQuery('.step1').hide();
            jQuery('.step2').show();
        })
        //返回上一步重新上传图片
        jQuery('#btn_prev2').live('click',function(){
            jQuery('.step2').show();
            jQuery('.step3').hide();
            jQuery('#merge').remove();
            //merge.reset();
        })
        //编辑宣言文字
        jQuery('#btn_next2').live('click',function(){
            var htmlstr = '<p>拖动宣言可调整位置，</p><p class="changecolor">更换颜色：<a col="db" id="btn_black" href="javascript:">黑色</a><a col="dg" id="btn_gold" href="javascript:">金色</a><a col="dw" id="btn_white" href="javascript:">白色</a></p>'
            jQuery('#canvas_tit').html(htmlstr);
            jQuery('#btnStep2').hide();
            jQuery('#btnStep3').show();
            merge.hideTools();
        })
        jQuery('.changecolor a').live('click',function(){
            var col = jQuery(this).attr('col');
            merge.changeColor(col);
        })
        //返回上一步编辑背景图片
        jQuery('#btn_prev3').live('click',function(){
            var htmlstr = '<p><br>拖动照片可以调整照片位置！</p>'
            jQuery('#canvas_tit').html(htmlstr);
            jQuery('#btnStep3').hide();
            jQuery('#btnStep2').show();
            merge.showTools();
        })
        //下一步完成海报
        jQuery('#btn_next3').live('click',function(){
            var htmlstr = '<p>您的海报已经完成！</p><p class="changecolor">秀出你的锋芒，赢华为麦芒手机大奖！</p>'
            jQuery('#canvas_tit').html(htmlstr);
            jQuery('#btnStep3').hide();
            jQuery('#btnStep4').show();
            merge.complete();
        })
        jQuery('#addFans').live('click',function(){
            if(jQuery(this).attr('checked')=='checked'){
                addFans = 1;
            }else{
                addFans = 0;
            }
        })
        jQuery('#syn').live('click',function(){
            if(jQuery(this).attr('checked')=='checked'){
                syn = 1;
            }else{
                syn = 0;
            }
        })
        //提交作品
        jQuery('#btn_next4').live('click',function(){
            console.log('addFans:'+addFans);
            console.log('syn:'+syn);
            merge.save(addFans,syn,function(res){
                if(res>0){
                    var htmlstr = '<br><p>提交成功！</p>'
                    jQuery('#canvas_tit').html(htmlstr);
                    jQuery('#btnStep4').hide();
                    jQuery('#btnStep5').show();
                    workId = res;
                    var pn = 1+Math.floor(Math.random()*10);
                    changeFriends(pn);
                }
            });
        })
        //点击更换好友
        jQuery('#btn_change').live('click',function(){
            var pn = 1+Math.floor(Math.random()*10);
            changeFriends(pn);
        })
        //点击邀请好友
        jQuery('#btn_invite').live('click',function(){
            invite();
        })
        jQuery('.btn_mywork').live('click',function(){
            location.href="detail-"+workId;
        })

        //分享活动
        Zepto('.btn_shareAct').live('click',function(){
            jQuery('.rrPopup').closePop();
            jQuery('#p4').showPop();
        })
        //相册上传
	    Zepto("#ablumpic").click(function(){
		    Zepto.yx.isLogged(function(flag){
			    if(flag == 1){
                    Zepto.yx.showalbums({
                        callback: function(arr){
                            var obj = arr[0];
						    previewPic(obj.largeurl, 2);
				        }
                    });
			    } else {
				    Zepto.yx.login();
			    }
		    });
	    })
        //图片上传判断
	    Zepto("#picData").change(function(){
		    Zepto.yx.isLogged(function(flag){
			    if (flag == 1) {
				    var reg = /\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/;
				    var url = Zepto("#picData").val();
				    if(reg.test(url)){
					    uploadFile(url);
				    }else{
					    Zepto.yx.tips("提示信息","请上传正确的图片格式！");
				    }
			    } else {
				    Zepto.yx.login();
			    }
		    });
	    });
    })
    /** * 邀请好友来投票 * **/
    function invite(){
		Zepto.post("/friends/invite",{fids:fids.join(',')},function(data){
            jQuery('#p1').showPop();
		});
    }
    /** *更换一批好友 * **/
    function changeFriends(pn){
            jQuery('#loadFriends').html('<p class="tc"><img style="width:1.75rem;height:1.75rem;vertical-align:middle;" src="images/load.gif">好友加载中…</p>');
			Zepto.proxyAjax({
				url: 'http://base.yx.renren.com/api/http/friend/list?format=2&callback=?',
				data: {
				"curpage": pn,
				"pagesize":5 
				},
				dataType: "json",
				type: "GET",
				success: function(data) {
                    if(data.status>0){
                        var friends = data.friends,len = friends.length;
                        var friItem = '';
                        fids = [];
                        for(var i = 0;i<len;i++){
                            fids.push(friends[i].userId);
                            friItem += '<li><img class="haoyou_pic" src="'+friends[i].tinyUrl+'"><br><span class="haoyou_name">'+friends[i].userName+'</span></li>';
                        }
                        jQuery('#loadFriends').html(friItem);
                    }
				}
			});
    }
    //本地上传
    function uploadFile(){
	    jQuery("#picForm").submit(); 
    }
    //图片预览
    function previewPic(picUrl) {
	    jQuery("#picUrl").val(picUrl);
        jQuery('.step2').hide();
        jQuery('.step3').show();
        var picUrl = 'http://huaweimaimang.renren.com/cross?pic='+picUrl;
        //var picUrl = 'http://huaweimaimang.renren.com/forimg2?pic='+picUrl;
        console.log(picUrl);
        //merge = null;
        merge = new Merge({picUrl:picUrl,dec:dec});
    }


