function GetRequest() {
    var str = location.search; //获取url中'?'符后的字串  
    // var theRequest = new Object();  
    var arr = str.split('=');
    for (var i in arr) {
        //从=分隔
        return arr[1];
    }
}
var id = GetRequest();

$(function () {
    $.get('php/getGoodsInfo.php', { 'goodsId': id },
        function data(data) {
            var dataObj = JSON.parse(data);
            let htmlStr = '';
            htmlStr += '<div class="goodsBox fl"><div class="goods"><img src="'+dataObj.goodsImg+'" id="bigImg" style="display: block;"></div></div><div class="goodsDetail fr"><h2>'+dataObj.goodsName+'</h2><p class="goodsPrice">￥'+dataObj.goodsPrice+'</p><div class="buyNum clears"> <span class="buyNumTit fl">购买数量</span><span class="addNum fl"> <a href="javascript:void(0)" id="reductionNum">-</a> <input type="text" name="" value="1" id="goodsNum" disabled="disabled"> <a href="javascript:void(0)" id="addNum">+</a> </span> </div> <div class="action clears"> <a href="javascript:void(0)" class="addShopCart" style="color:red;border-color:red" id="nowBuy" data-id="136">立即购买</a> <a href="javascript:void(0)" class="addShopCart" style="color:#ff8f00;border-color:#ff8f00" id="addShopCart" data-id="136">加入购物车</a>  </div> <ul class="goodsMsg"> <li> <span>商编：03.02.02.01.02</span> <span>配料：青茶/乌龙茶</span> </li> <li> <span>净含量：80g</span> <span>等级：特级</span> </li> <li> <span>保质期：540天</span> <span>产地：安徽省黄山市</span> </li> <li> 生产日期：见包装盒喷码标识 </li> </ul> <p class="buyTel">订购热线：<em></em>400-004-5028</p>';
            $('.shopcartBox').append(htmlStr);
        })    
});

$('fl').on('click', function() {
    var pid= $(this).attr('id');
    location.href = '/goodsInfo.html?id='+pid;
});
var goodsNum = parseInt($('#goodsNum').val());
$('#addNum').on('click', function(){
    goodsNum++;
    $('#goodsNum').val(goodsNum);
});
$('#reductionNum').on('click', function(){
    goodsNum--;
    if(goodsNum<1){
        goodsNum = 1;
    }
    $('#goodsNum').val(goodsNum);
});
$('#addShopCart').on('click', function(){
    var dataId = $(this).attr('id');
    window.location.href = '/buy/cartAdd?p='+dataId+'&n='+goodsNum;
});  

