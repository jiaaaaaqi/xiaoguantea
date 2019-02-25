$(function() {
    $.get("php/checkGoods.php",
        {
            "goodsId": $("#goodsId").val()
        },
        function (data) {
            if (data == "1") {              
            } else {
                alert("该商品编号已被使用，请输入不重复的商品编号");
            }
        }
    );
});
$("#addGoods").click(function () { 
    $.post("php/saveGoods.php",
        {
            "goodsId": $("#goodsId").val(),
            "goodsName": $("#goodsName").val(),
            "goodsType": $("#goodsType").val(),
            "goodsPrice": $("#goodsPrice").val(),
            "goodsCount": $("#goodsCount").val(),
            "goodsSlogan": $("#goodsSlogan").val(),
            "goodsImg": $("#goodsImg").val()
        },
        function (data) {
            if (data == "保存成功") {
                alert("保存成功");
            } else {
                alert(data);
            }
        }
    );
});
