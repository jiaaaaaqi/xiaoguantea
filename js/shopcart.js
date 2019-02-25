$(function(){
    var totalMoney = 0;
    var goodsCount = 0;
    var allgoodsCount = 0;
    var length = $('.shopcartGoodsBox').length;  
    var username = getCookie('username');
    if(username!=''){
        getData();
        function getData() {
            $.post("php/getShoppingCart.php", {'userName':username},
            function (data) {
                console.log(data);
                console.log(username);
                var dataObj = JSON.parse(data);
                let htmlStr = '';
                htmlStr += '<div class="shopcartGoodsBox" data-id="'+dataObj.goodsId+'"><div class="allGoods"><table><tbody><tr> <td align="left" width="53%"><div class="goodsNews clears"><input type="checkbox" name="item_che" checked=""><a href="goodsInfo.htm?id='+dataObj.goodsId+'" +class="fl"><img src="'+dataObj.goodsImg+'"></a><div class="goodsDet fl"><h3><a href="goodsInfo.htm?id='+dataObj.goodsId+'">'+dataObj.goodsName+'</a></h3></div></div></td><td width="13%"><span class="unitPrice">'+dataObj.goodsPrice+'</span></td><td width="12%"><div class="goodsNum clears"><a href="javascript:void(0)" class="reductionNum">-</a><input type="text" name="" value="'+dataObj.goodsNum+'" disabled="disabled"><a href="javascript:void(0)" class="addNum">+</a></div><a href="javascript:void(0)" class="deleteGoodsBtn">删除</a></td></tr></tbody></table></div></div>';
            $('.shopcartWrapperList').append(htmlStr);
            }      
            );
        }
    }


    $('.shopcartGoodsBox').each(function(){
        if($(this).find($(':checkbox')).attr('checked')){
            allgoodsCount++;
           totalMoney += parseFloat($(this).find($('.subtotal')).text());
           goodsCount += parseInt($(this).find($('input[type="text"]')).val());
        }
    });
   if(allgoodsCount == length&&length!=0){
       allGoodsChecked(true);
   }else{
       allGoodsChecked(false);
   }
   totalMoney = totalMoney.toFixed(2);
    $('#totalMoney').text(totalMoney);
   $('#selectCheck').text(goodsCount);
   function allGoodsChecked($checked){
       $('.selectAllGoods')[0].checked = $checked;
       $('.selectAllGoods')[1].checked = $checked;
   }
    /* 购物车全选 */
    $('.selectAllGoods').on('click',function(){
        var totalMoney = 0;
        var goodsCount = 0;
        if(this.checked == true){
            $('.shopcartGoodsBox').each(function(){
                $(this).find($(':checkbox'))[0].checked = true;
                totalMoney += parseFloat($(this).find($('.subtotal')).text());
                goodsCount += parseInt($(this).find($('input[type="text"]')).val());
            });
            allGoodsChecked(true);
            pchange(0,0,1);
        }else{
            $('.shopcartGoodsBox').each(function(){
                $(this).find($(':checkbox'))[0].checked=false;
            });
            allGoodsChecked(false);
            pchange(0,0,-1);
        }
        totalMoney = totalMoney.toFixed(2);
        $('#totalMoney').text(totalMoney);
        $('#selectCheck').text(goodsCount);
   });
   /* 勾选单个商品结算 */
   $('.shopcartGoodsBox').find($(':checkbox')).on('click', function() {
       var that = $(this);
       var totalMoney = parseFloat($('#totalMoney').text());
        var goodsCount = parseInt($('#selectCheck').text());
       var dataId = that.parents('.shopcartGoodsBox').attr('data-id');
       if(this.checked == true){
           this.checked = true;
           totalMoney += parseFloat(that.parents('.shopcartGoodsBox').find($('.subtotal')).text());
           goodsCount += parseInt(that.parents('.shopcartGoodsBox').find($('input[type="text"]')).val());
           pchange(dataId,0,1);
       }else{
           this.checked = false;
           totalMoney -= parseFloat(that.parents('.shopcartGoodsBox').find($('.subtotal')).text());
           goodsCount -= parseInt(that.parents('.shopcartGoodsBox').find($('input[type="text"]')).val());
           pchange(dataId,0,-1);
       }
       var defaultlength = 0;
       $('.shopcartGoodsBox').find($(':checkbox')).each(function() {
           if(this.checked){
               defaultlength++;
           }
       });
       if(defaultlength == length){
           allGoodsChecked(true)
       }else{
           allGoodsChecked(false);
       }
       totalMoney = totalMoney.toFixed(2);
       $('#totalMoney').text(totalMoney);
       $('#selectCheck').text(goodsCount);
   });

   function pchange(id,num,status) {
           var allnum = 0;
           $.ajax({
               type:"POST",
               url:"php/updateGoodsCount.php",
               dataType:"json",
               async: false,
               data:{id:id,status:status,num:num},
               success:function(data){
                   if(data.code != 0){
                       var params = {};
                       params.content = '<div class="saved"><div class="saveCenter"><i class="hookFail"></i><span>'+data.msg+'</span></div></div>';
                       Util.Pop.popLayer(params);
                       allnum = 1;
                   }
               }
           });
           return allnum;
       }
   /* 加商品数量 */
    $('.addNum').on('click',function(){
        var totalMoney = parseFloat($('#totalMoney').text());
        var goodsCount = parseInt($('#selectCheck').text());
        var dataId = $(this).parents('.shopcartGoodsBox').attr('data-id');
        var unitPrice = parseFloat($(this).parents('.allGoods').find($('.unitPrice')).text());
        var subtotal = 0;
       var defaultNumber = parseInt($(this).parents('.allGoods').find($('.goodsNum input')).val());
       var nums = pchange(dataId,1,0);
       if(nums == 1){
           return false;
       }else{
           defaultNumber++;
           subtotal = (unitPrice * defaultNumber).toFixed(2);
           $(this).parents('.allGoods').find($('.goodsNum input')).val(defaultNumber);
           $(this).parents('.allGoods').find($('.subtotal')).text(subtotal);
           if($(this).parents('.shopcartGoodsBox').find($(':checkbox'))[0].checked == true){
               totalMoney += parseFloat($(this).parents('.shopcartGoodsBox').find($('.unitPrice')).text());
               totalMoney = totalMoney.toFixed(2);
               goodsCount++;
               $('#totalMoney').text(totalMoney);
               $('#selectCheck').text(goodsCount);
           }
       }
    });
    // 商品减数量
    $('.reductionNum').on('click',function(){
        var totalMoney = parseFloat($('#totalMoney').text());
        var goodsCount = parseInt($('#selectCheck').text());
        var dataId = $(this).parents('.shopcartGoodsBox').attr('data-id');
        var unitPrice = parseFloat($(this).parents('.allGoods').find($('.unitPrice')).text());
        var subtotal = 0;
       var defaultNumber = parseInt($(this).parents('.allGoods').find($('.goodsNum input')).val());
       if(defaultNumber == 1){
           return false;
       }
       defaultNumber--;
       subtotal = (parseInt(unitPrice * defaultNumber*100)/100).toFixed(2);
       $(this).parents('.allGoods').find($('.goodsNum input')).val(defaultNumber);
       $(this).parents('.allGoods').find($('.subtotal')).text(subtotal);
       pchange(dataId,-1,0);
       if($(this).parents('.shopcartGoodsBox').find($(':checkbox'))[0].checked == true&&defaultNumber>0){
           totalMoney -= parseFloat($(this).parents('.shopcartGoodsBox').find($('.unitPrice')).text());
           goodsCount--;
           totalMoney = totalMoney.toFixed(2);
           $('#totalMoney').text(totalMoney);
           $('#selectCheck').text(goodsCount);
       }
    });
   /* 单个删除商品 */
   var closeGoods = null;
    $('.deleteGoodsBtn').on('click',function(){
        var totalMoney = parseFloat($('#totalMoney').text());
        var goodsCount = parseInt($('#selectCheck').text());
        var that = $(this);
       var pid = '';
        t = new Dmet.alertBox($('#deleteGoods')[0],{left:'center',top:'middle',lock:true});
        closeGoods = $(this).parents('.shopcartGoodsBox');
        pid = $(this).parents('.shopcartGoodsBox').attr('data-id');
        $('.alertCloseBtn').on('click',function(){
            t.closeMask($('#deleteGoods')[0]);
        });
        $('.deleteBtnBox a').on('click',function(){
            t.closeMask($('#deleteGoods')[0]);
            totalMoney -= parseFloat(that.parents('.shopcartGoodsBox').find('.subtotal').text());
            totalMoney = totalMoney.toFixed(2);
            goodsCount -= parseInt(that.parents('.shopcartGoodsBox').find('.goodsNum input').val());
            pdel(pid);
            $('#totalMoney').text(totalMoney);
           $('#selectCheck').text(goodsCount);
        });
    });
    function pdel(pid){
        $.ajax({
            type:"POST",
            url:"php/updataGoodsCount.php",
            dataType:"json",
            data:{id:pid},
            success:function(data){
                if(data.code == 0){
                   t.closeMask($('#deleteGoods')[0]);
                    if(pid.split(",").length<2){
                        closeGoods.slideUp();
                    }else{
                        $(':checkbox').each(function(){
                            if($(this)[0].checked==true){
                                $(this).parents('.shopcartGoodsBox').remove();
                            }
                        });
                    }
                }
            }
        });
    }
    // 删除多个商品
    $('#selectAllBtn').on('click',function(){
        var defaultlength = 0;
        var pid = '';
        var totalMoney = parseFloat($('#totalMoney').text());
        var goodsCount = parseInt($('#selectCheck').text());
        t = new Dmet.alertBox($('#deleteGoods')[0],{left:'center',top:'middle',lock:true});
        $(':checkbox').each(function(){
           if($(this)[0].checked==true){
               pid += $(this).parents('.shopcartGoodsBox').attr('data-id')+',';
               totalMoney -= parseFloat($(this).parents('.shopcartGoodsBox').find('.subtotal').text());
               totalMoney = totalMoney.toFixed(2);
                goodsCount -= parseInt($(this).parents('.shopcartGoodsBox').find('.goodsNum input').val());
                defaultlength++;
           }
       });
       pid = pid.substring(0,pid.length-1);
       $('.alertCloseBtn').on('click',function(){
            t.closeMask($('#deleteGoods')[0]);
        });
        $('.deleteBtnBox a').on('click',function(){
            t.closeMask($('#deleteGoods')[0]);
            pdel(pid);
            $('#totalMoney').text(totalMoney);
           $('#selectCheck').text(goodsCount);
           location.reload();
        });
    });
});

