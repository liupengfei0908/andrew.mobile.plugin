﻿/*-----------------------------------------------Andrew_Spinner-------------------------------------------*/
(function($){
    $.fn.Andrew_Spinner=function(setting) {
        var option = $.extend({
                input_width:"100%", //输入框宽度（px,%,em）
                btn_wrap: "", //数量加减输入框的外框样式
                btn_left: "", //数量减少按钮Class
                btn_right: "", //数量增加按钮Class
                maxNumber: 999,
                clickBack:function(){
                }
            },
            setting);
        var spt =$(this);
        ak_sptFun();
        $(window).resize(function(){
            spt.parent().find("input").css({
                "height": spt.parent().children("button").outerHeight()
            });
            spt.parent().css({
                "height": spt.parent().children("button").height()
            });
            spt.parent().css({
                "margin-top": (spt.parent().parent().outerHeight() - spt.parent().outerHeight())/2
            });
        });
        function ak_sptFun() {
            spt.each(function(i) {
                spt.wrap('<div class="'+option.btn_wrap+'"></div>');
                spt.before('<button type="button" class="minus '+option.btn_left+'"></button>');
                spt.before('<button type="button" class="plus '+option.btn_right+'"></button>');
                spt.parent().css({
                    "overflow": "hidden",
                    "width": option.input_width,
                    "height": spt.parent().children("button").height(),
                    "margin-top": (spt.parent().outerHeight() - spt.parent().children("button").outerHeight()) / 2
                });
                var it =$(this).parent().find("input");
                it.css({
                    "width": "100%",
                    "height": $(this).parent().children("button").outerHeight(),
                    "line-height": "100%",
                    "float": "inherit"
                });
                if (parseInt(it.val())<=1){
                    $(this).parent().children(".minus").attr("disabled",'disabled');
                }
                $(this).parent().children(".plus").unbind("click");
                $(this).parent().children(".plus").on('click', function (e) {
                    e.preventDefault();
                    if (option.maxNumber) {
                        var maxNumber = parseInt(option.maxNumber-1);
                    } else {
                        var maxNumber = parseInt(999999);
                    }
                    var lengthNum= parseInt(it.val());
                    if (maxNumber > lengthNum) {
                        $(this).parent().children(".minus").removeAttr("disabled",'disabled');
                        it.val(lengthNum+1);
                    } else if (maxNumber == lengthNum) {
                        $(this).attr("disabled", 'disabled');
                        it.val(lengthNum + 1);
                    } else if (maxNumber < lengthNum) {
                        it.parent().children(".minus").attr("disabled",'disabled');
                        it.parent().children(".plus").removeAttr("disabled",'disabled');
                        it.val(parseInt(1));
                    } else {
                        $(this).attr("disabled", 'disabled');
                    }
                    option.clickBack(lengthNum+1);
                });
                $(this).parent().children(".minus").unbind("click");
                $(this).parent().children(".minus").on('click', function (e) {
                    e.preventDefault();
                    if (option.maxNumber) {
                        var maxNumber = parseInt(option.maxNumber);
                    } else {
                        var maxNumber = parseInt(999999);
                    }
                    var lengthNum= parseInt(it.val());
                    if (maxNumber >= lengthNum){
                        $(this).parent().children(".plus").removeAttr("disabled",'disabled');
                        it.val(lengthNum-1);
                    } else if (maxNumber < lengthNum) {
                        it.parent().children(".minus").attr("disabled",'disabled');
                        it.parent().children(".plus").removeAttr("disabled",'disabled');
                        it.val(parseInt(1));
                    } else {
                        $(this).attr("disabled", 'disabled');
                    }
                    if (parseInt(it.val())<=1){
                        it.val(parseInt(1));
                        $(this).attr("disabled",'disabled');
                    }
                    option.clickBack(lengthNum-1);
                })
            });
        }
    }
}(jQuery));