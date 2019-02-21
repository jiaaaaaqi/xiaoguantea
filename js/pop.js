/**
 * 弹框公共js
 * @authors  ZhaoYY
 * @date    2016-12-30
 * @version $Id$
 */
(function(W){
    W.Util = {};
    //add by zyy 
    var Pop = {
        popLayer:function(opt){
            var that = this;
            var defs = {
                title : '提示',
                content : '',
                firstBtnText:'',
                secondBtnText:'',
                firstCallback : function(){},
                secondCallback:function(){}
            };
            var opts = $.extend(defs, opt);
            that.showBox(opts);
            $('.popBox .whiteCross').on('click',function(){
                that.hideLayer();
                that.recoverScroll();
            });
            $(document).off('click','.popBox .firstBtn');
            $(document).on('click','.popBox .firstBtn',function(){
                opts.firstCallback();
                that.recoverScroll();
            });
            $(document).off('click','.popBox .secondBtn');
            $(document).on('click','.popBox .secondBtn',function(){
                opts.secondCallback();
                that.recoverScroll();
            });
        },
        // 浏览器兼容 取得浏览器可视区高度   
        getWindowInnerHeight:function() {   
            var winHeight = window.innerHeight   
                    || (document.documentElement && document.documentElement.clientHeight)   
                    || (document.body && document.body.clientHeight);   
            return winHeight;
        },
        // 浏览器兼容 取得浏览器可视区宽度   
        getWindowInnerWidth:function () {   
            var winWidth = window.innerWidth   
                    || (document.documentElement && document.documentElement.clientWidth)   
                    || (document.body && document.body.clientWidth);   
            return winWidth;   
        },
        //显示遮罩层  
        showLayer:function() {   
            // 遮罩层宽高分别为页面内容的宽高
            // debugger;
            $(".layer").remove();
            $("body").append("<div class='layer'></div>");
            // debugger;
            // $("body").height($(window).height()).css({
            //     "overflow": "hidden"
            // });
            $('.layer').css({
                'height':this.getWindowInnerHeight(),
                'width':this.getWindowInnerWidth(),
                'top':0,
                'bottom':0
            });
            $('.layer').show();  
        },
        //显示弹出框  
        showBox:function(opts) {   
            // 先显示遮罩层   
            this.showLayer(); 
            //提示窗口居中 
            var popBox = '<div class="popBox"><div class="hint">'+opts.title+'<i class="whiteCross"></i></div>'+opts.content+'</div>';
            $('.layer').append(popBox);
            if(opts.firstBtnText != '' && opts.secondBtnText != ''){
                var btnBox = '<div class="btnBox"><span class="firstBtn">'+opts.firstBtnText+'</span><span class="secondBtn">'+opts.secondBtnText+'</span></div>';
            }else if(opts.firstBtnText != '' && opts.secondBtnText == ''){
                var btnBox = '<div class="btnBox"><span class="firstBtn">'+opts.firstBtnText+'</span></div>';
            }else if(opts.firstBtnText == '' && opts.secondBtnText != ''){
                var btnBox = '<div class="btnBox"><span class="secondBtn">'+opts.secondBtnText+'</span></div>';
            }else if(opts.firstBtnText == '' && opts.secondBtnText == ''){
                var btnBox = '';
            }
            $('.popBox').append(btnBox);
            var popTop = (this.getWindowInnerHeight() - $(".popBox").height()) / 2;
            var popLeft = (this.getWindowInnerWidth() - $(".popBox").width()) / 2;
            $(".popBox").css('top',popTop + 'px');
            $(".popBox").css('left',popLeft + 'px');
            $(".popBox").show(); 
            $(document).scroll(function() {   
                return false;   
            });   
        },
        //隐藏Layer提示 
        hideLayer:function() {   
            $('.layer').hide();   
            $(".popBox").hide();   
            $(document).scroll(function() {   
                return true;   
            });   
        },
        //回调执行结束后body恢复滚动
        recoverScroll:function(){
            $("body").height($(window).height()).css({
                "overflow-y": "auto"
            });
        }
    }
    W.Util.Pop = Pop;
})(window);
