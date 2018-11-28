$(function(){

    $('.snb-main > li').each(function(){
        var listTargetHasChildren = $(this).children('ul');
        if (listTargetHasChildren = true) {
            $(this).addClass('snb-main-list');
        }
    });

    // SNB Active
    var currentPath = location.pathname;

    $('.snb li > a').each(function(){
        var $this = $(this);
        if($this.attr('href').indexOf(currentPath) !== -1) {
            if ( currentPath == '/') {
                $('.snb-main li').eq(0).addClass('active');
                return;
            }
            if ($this.hasClass('snb-sub')) {
                $(this).parent().addClass('active');
            } else {
                $(this).parent().parent().parent().addClass('active');
            }
            $this.addClass('active');
        }
    });

    $('body').on('click','.snb-main > li > a',function(e){
        if ($(this).parent().hasClass('snb-main-list')) {

            if ($(this).parent().hasClass('active')) {
                $(this).parent().removeClass('active');
            } else {
                $('.snb-main-list.active').removeClass('active');
                $(this).parent().addClass('active');
            }
        }
    });

    $('body').on('click','.snb-main-list p',function(e){
        e.preventDefault();
    });

});