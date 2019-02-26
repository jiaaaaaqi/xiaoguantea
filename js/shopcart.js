$(function () {
    var username = getCookie('username');
    if (username != '') {
        function getData() {
            $.post("php/getShoppingCart.php", { 'userName': username },
                function (data) {
                    var dataObj = JSON.parse(data);
                    pingData(dataObj);
                }
            );
        }
        getData();
        function pingData(dataObj) {
            let htmlStr = '';
            $.each(dataObj, function (i, v) {
                htmlStr += '<div class="shopcartGoodsBox" data-id="' + v.goodsId + '">' +
                    '<div class="allGoods"><table><tbody><tr><td align="left" width="53%">' +
                    '<div class="goodsNews clears"><input type="checkbox" name="item_che">' +
                    '<a href="goodsInfo.html?id=' + v.goodsId + '" class="fl">' +
                    '<img src="' + v.goodsImg + '"></a><div class="goodsDet fl"><h3>' +
                    '<a href="goodsInfo.html?id=' + v.goodsId + '">' + v.goodsName + '</a></h3></div></div></td>' +
                    '<td width="13%">' +
                    '<span class="unitPrice">' + v.goodsPrice + '</span></td>' +
                    '<td width="12%"><div class="goodsNum clears">' +
                    '<a href="javascript:void(0)" class="reductionNum">-</a>' +
                    ' <input type="text" value="' + v.goodsNum + '" disabled="disabled">' +
                    '<a href="javascript:void(0)" class="addNum">+</a>' +
                    '</div></td><td width="12%"><span class="subtotal">' + parseInt(v.goodsNum) * parseInt(v.goodsPrice) + '</span></td>' +
                    '<td width="10%"><a href="javascript:void(0)" class="deleteGoodsBtn">删除</a>' +
                    '</td></tr></tbody></table></div></div>';
                i++;
            });
            $('.shopcartWrapperList').append(htmlStr);
            var totalMoney = 0;
            var goodsCount = 0;
            var allgoodsCount = 0;
            var length = $('.shopcartGoodsBox').length;
            $('.shopcartGoodsBox').each(function () {
                if ($(this).find($(':checkbox')).attr('checked')) {
                    allgoodsCount++;
                    totalMoney += parseFloat($(this).find($('.subtotal')).text());
                    goodsCount += parseInt($(this).find($('input[type="text"]')).val());
                }
            });
            if (allgoodsCount == length && length != 0) {
                allGoodsChecked(true);
            } else {
                allGoodsChecked(false);
            }
            totalMoney = totalMoney.toFixed(2);
            $('#totalMoney').text(totalMoney);
            $('#selectCheck').text(goodsCount);
            function allGoodsChecked($checked) {
                $('.selectAllGoods')[0].checked = $checked;
                $('.selectAllGoods')[1].checked = $checked;
            }
            /* 购物车全选 */
            $('.selectAllGoods').on('click', function () {
                var totalMoney = 0;
                var goodsCount = 0;
                if (this.checked == true) {
                    $('.shopcartGoodsBox').each(function () {
                        $(this).find($(':checkbox'))[0].checked = true;
                        totalMoney += parseFloat($(this).find($('.subtotal')).text());
                        goodsCount += parseInt($(this).find($('input[type="text"]')).val());
                    });
                    allGoodsChecked(true);
                } else {
                    $('.shopcartGoodsBox').each(function () {
                        $(this).find($(':checkbox'))[0].checked = false;
                    });
                    allGoodsChecked(false);
                }
                totalMoney = totalMoney.toFixed(2);
                $('#totalMoney').text(totalMoney);
                $('#selectCheck').text(goodsCount);
            });
            /* 勾选单个商品结算 */
            $('.shopcartGoodsBox').find($(':checkbox')).on('click', function () {
                var that = $(this);
                var totalMoney = parseFloat($('#totalMoney').text());
                var goodsCount = parseInt($('#selectCheck').text());
                var dataId = that.parents('.shopcartGoodsBox').attr('data-id');
                if (this.checked == true) {
                    this.checked = true;
                    totalMoney += parseFloat(that.parents('.shopcartGoodsBox').find($('.subtotal')).text());
                    goodsCount += parseInt(that.parents('.shopcartGoodsBox').find($('input[type="text"]')).val());
                } else {
                    this.checked = false;
                    totalMoney -= parseFloat(that.parents('.shopcartGoodsBox').find($('.subtotal')).text());
                    goodsCount -= parseInt(that.parents('.shopcartGoodsBox').find($('input[type="text"]')).val());
                }
                var defaultlength = 0;
                $('.shopcartGoodsBox').find($(':checkbox')).each(function () {
                    if (this.checked) {
                        defaultlength++;
                    }
                });
                if (defaultlength == length) {
                    allGoodsChecked(true)
                } else {
                    allGoodsChecked(false);
                }
                totalMoney = totalMoney.toFixed(2);
                $('#totalMoney').text(totalMoney);
                $('#selectCheck').text(goodsCount);
            });

            function pchange(id, num) {
                console.log("pchange-name:"+username)
                $.ajax({
                    type: "POST",
                    url: "php/updateGoodsCount.php",
                    dataType: "json",
                    data: { goodsId: id, num: num, userName:username},
                    success: function (data) {
                        console.log(data);
                    }
                });
            }
            /* 加商品数量 */
            $('.addNum').on('click', function () {
                var totalMoney = parseFloat($('#totalMoney').text());
                var goodsCount = parseInt($('#selectCheck').text());
                var dataId = $(this).parents('.shopcartGoodsBox').attr('data-id');
                var unitPrice = parseFloat($(this).parents('.allGoods').find($('.unitPrice')).text());
                var subtotal = 0;
                var defaultNumber = parseInt($(this).parents('.allGoods').find($('.goodsNum input')).val());
                var nums = pchange(dataId, 1);
                if (nums == 1) {
                    return false;
                } else {
                    defaultNumber++;
                    subtotal = (unitPrice * defaultNumber).toFixed(2);
                    $(this).parents('.allGoods').find($('.goodsNum input')).val(defaultNumber);
                    $(this).parents('.allGoods').find($('.subtotal')).text(subtotal);
                    if ($(this).parents('.shopcartGoodsBox').find($(':checkbox'))[0].checked == true) {
                        totalMoney += parseFloat($(this).parents('.shopcartGoodsBox').find($('.unitPrice')).text());
                        totalMoney = totalMoney.toFixed(2);
                        goodsCount++;
                        $('#totalMoney').text(totalMoney);
                        $('#selectCheck').text(goodsCount);
                    }
                }
            });
            // 商品减数量
            $('.reductionNum').on('click', function () {
                var totalMoney = parseFloat($('#totalMoney').text());
                var goodsCount = parseInt($('#selectCheck').text());
                var dataId = $(this).parents('.shopcartGoodsBox').attr('data-id');
                var unitPrice = parseFloat($(this).parents('.allGoods').find($('.unitPrice')).text());
                var subtotal = 0;
                var defaultNumber = parseInt($(this).parents('.allGoods').find($('.goodsNum input')).val());
                if (defaultNumber == 1) {
                    return false;
                }
                defaultNumber--;
                subtotal = (parseInt(unitPrice * defaultNumber * 100) / 100).toFixed(2);
                $(this).parents('.allGoods').find($('.goodsNum input')).val(defaultNumber);
                $(this).parents('.allGoods').find($('.subtotal')).text(subtotal);
                pchange(dataId,-1);
                if ($(this).parents('.shopcartGoodsBox').find($(':checkbox'))[0].checked == true && defaultNumber > 0) {
                    totalMoney -= parseFloat($(this).parents('.shopcartGoodsBox').find($('.unitPrice')).text());
                    goodsCount--;
                    totalMoney = totalMoney.toFixed(2);
                    $('#totalMoney').text(totalMoney);
                    $('#selectCheck').text(goodsCount);
                }
            });
            /* 单个删除商品 */
            var closeGoods = null;
            $('.deleteGoodsBtn').on('click', function () {
                var totalMoney = parseFloat($('#totalMoney').text());
                var goodsCount = parseInt($('#selectCheck').text());
                var that = $(this);
                var pid = '';
                t = new Dmet.alertBox($('#deleteGoods')[0], { left: 'center', top: 'middle', lock: true });
                closeGoods = $(this).parents('.shopcartGoodsBox');
                pid = $(this).parents('.shopcartGoodsBox').attr('data-id');
                $('.alertCloseBtn').on('click', function () {
                    t.closeMask($('#deleteGoods')[0]);
                });
                $('.deleteBtnBox a').on('click', function () {
                    t.closeMask($('#deleteGoods')[0]);
                    totalMoney -= parseFloat(that.parents('.shopcartGoodsBox').find('.subtotal').text());
                    totalMoney = totalMoney.toFixed(2);
                    goodsCount -= parseInt(that.parents('.shopcartGoodsBox').find('.goodsNum input').val());
                    pdel(pid);
                    location.reload();
                    $('#totalMoney').text(totalMoney);
                    $('#selectCheck').text(goodsCount);
                });
            });
            function pdel(pid) {
                $.ajax({
                    type: "POST",
                    url: "php/deleteGoods.php",
                    dataType: "json",
                    data: { 'goodsId': pid,'username': username},
                    success: function (data) {
                        if (data.code == 0) {
                            t.closeMask($('#deleteGoods')[0]);
                            if (pid.split(",").length < 2) {
                                closeGoods.slideUp();
                            } else {
                                $(':checkbox').each(function () {
                                    if ($(this)[0].checked == true) {
                                        $(this).parents('.shopcartGoodsBox').remove();  
                                    }
                                });
                            }
                        }
                    }
                });
            }
            // 删除多个商品
            $('#selectAllBtn').on('click', function () {
                var defaultlength = 0;
                var pid = '';
                var totalMoney = parseFloat($('#totalMoney').text());
                var goodsCount = parseInt($('#selectCheck').text());
                t = new Dmet.alertBox($('#deleteGoods')[0], { left: 'center', top: 'middle', lock: true });
                $(':checkbox').each(function () {
                    if ($(this)[0].checked == true) {                      
                        totalMoney -= parseFloat($(this).parents('.shopcartGoodsBox').find('.subtotal').text());
                        totalMoney = totalMoney.toFixed(2);
                        goodsCount -= parseInt($(this).parents('.shopcartGoodsBox').find('.goodsNum input').val());
                        defaultlength++;
                        if(pid != undefined){
                            alert($(this)[0].parent('.shopcartGoodsBox').attr('data-id'));
                            pid += $(this)[0].parent('.shopcartGoodsBox').attr('data-id')+',';
                        } 
                    }
                    alert("2:"+pid);      

                });
                alert(pid.length);
                alert(typeof pid);   
                alert(pid);      
                pid = pid.substring(0, pid.length-1);
                alert(pid);
                $('.alertCloseBtn').on('click', function () {
                    t.closeMask($('#deleteGoods')[0]);
                });
                $('.deleteBtnBox a').on('click', function () {
                    t.closeMask($('#deleteGoods')[0]);
                    pdel(pid);
                    $('#totalMoney').text(totalMoney);
                    $('#selectCheck').text(goodsCount);
                    location.reload();
                });
            });
        }
    }
});
