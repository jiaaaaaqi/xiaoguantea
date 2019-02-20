window.onload = function(){
	$(".productListBox,.hotList").delegate('li','click',function(){
		var pid= $(this).attr('id');
		location.href = '/home/productInfo?id='+pid;
	})

	//定义查询变量对象
    var obj = {'ajax':'ajax'};

    var cid = getUrlParam('cid');
    if (cid) {
    	obj['cid'] = cid;
    }

	//通过ajax获取数据
    //参数isClearPage如果为真的话分页从第一页开始
    function getData(isClearPage) {
    	if (isClearPage) {
    		obj['pageid'] = 1;
    	}
    	console.log(obj);
		$.ajax({
			url:'/home/prolist',// 跳转到 action
		    data:obj,
			type:'post',
			cache:false,
			dataType:'json',
			success:function(data) {//返回数据后调用方法向页面拼接数据
				pingData(data);//品数据
			},
			error : function(e) {
				console.log(e);
			}
		});
    }
    //刚进入页面的时候加载默认数据
    getData();

    //向页面拼接数据
    function pingData(data) {
    	//页码
    	$('.pages').html(data.page);
    	//页面内容
    	var content = '';
    	var i = 0;
		$.each(data.list, function(index, el) {
			if (i%3 == 0) {
        		content += '<ul class="productList clears">';
			}
			content += '<li class="fl" id="'+el.id+'">'+
						'<div class="imgBox">'+
						'<img src="/'+el.infoimg1+'">'+
						'</div>'+
						'<span class="bl name">'+el.title+'</span>'+
						'<span class="bl slogan">'+el.subtitle+'</span>'+
						'<span class="bl price">¥'+el.price+'</span>'+
						'</li>';
			if (i%3 == 2) {
        		content += '</ul>';
			}
			i++;
		});
		content += '</ul>';
    	$('.productListBox').html(content);
    }
    //点击分页时加载数据
	$(".pages").delegate('a','click',function(){
		var pageid = $(this).attr('value');
		if (typeof(pageid) == "undefined") {
			return false;
		}
		console.log(pageid);
		obj['pageid'] = pageid;
		//请求数据
		getData();
	})

	//获取url中的参数
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    }
}