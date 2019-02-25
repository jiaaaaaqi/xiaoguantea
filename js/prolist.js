$(function(){
	$(".productListBox").delegate('li','click',function(){
		var pid= $(this).attr('id');
		alert(pid);
		location.href = 'goodsInfo.html?id='+pid;
	})

	//通过ajax获取数据
    function getData() {

		$.ajax({
			url:'php/getGoodsList.php',// 跳转到 action
			type:'post',
			cache:false,
			success:function(data) {//返回数据后调用方法向页面数加载据
				//console.log(data)
				var obj = JSON.parse(data);
				pingData(obj);				
			},
			error : function(e) {
				console.log(e);
			}
		});
    }
    //刚进入页面的时候加载默认数据
    getData();
    //向页面数加载据
 function pingData(data) {
		console.log(typeof data);
    	//页码
    	//页面内容
    	var content = '';
    	var i = 0;
		$.each(data, function(i,a) {
			if (i%3 == 0) {
        		content += '<ul class="productList clears">';
			}
			content += '<li class="fl" id="'+a.goodsId+'">'+
						'<div class="imgBox">'+
						'<img src="'+a.goodsImg+'">'+
						'</div>'+
						'<span class="bl name">'+a.goodsName+'</span>'+
						'<span class="bl slogan">'+a.goodsSlogan+'</span>'+
						'<span class="bl price">¥'+a.goodsPrice+'</span>'+
						'</li>';
			if (i%3 == 2) {
        		content += '</ul>';
			}
			i++;
		});
		content += '</ul>';
    	$('.productListBox').html(content);
    }
	//获取url中的参数
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    }
})