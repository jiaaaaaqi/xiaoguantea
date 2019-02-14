
// 返回顶部
$(function(){
    showScroll();
    function showScroll(){
        $(window).scroll( function() { 
            var scrollValue=$(window).scrollTop();
            scrollValue > 100 ? $('.gotop').fadeIn():$('.gotop').fadeOut();
        } );	
        $('#scroll').click(function(){
            $("html,body").animate({scrollTop:0},500);	
        });	
    }
})