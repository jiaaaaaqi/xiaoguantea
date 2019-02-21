window.onload = function () {
    /*About Cookie*/
    var username = getCookie('username');
    if (username != "") {
        $(".searchPersonal").css("display", "block");
        $(".quick").css("display", "none");
        $(".personal").html(username);
    } else {
        $(".searchPersonal").css("display", "none");
        $(".quick").css("display", "block");
    }
    $("#personalBox").click(function () {
        $(".logoutBox").css("display", "block");
    });
    $("#logout").click(function () {
        console.log("1:"+username);
        removeCookie('username');
        window.location.reload();
    });
    $(".personal").blur(function () {
        $(".logoutBox").css("display", "none");
    });

    /*About goodsList*/
}