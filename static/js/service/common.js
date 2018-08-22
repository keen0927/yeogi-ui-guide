$(function(){
    $('.snb-menu__has-ul').each(function(){
        $(this).click(function(e){
            if ($(this).hasClass('menu-open')) {
                $(this).removeClass('menu-open');
            } else {
                $(this).addClass('menu-open');
            }
        });
    });
});

// 진입시 메뉴 액티브 설정
var snbSelect = function() {
    var $targetMenuList = $('.snb-menu li');
    $targetMenuList.eq(depth).find('> a').addClass('active');
    if ( subDepthOpen == true ) {
        var $targetMenuSubList = $targetMenuList.eq(depth);
        $('ul',$targetMenuSubList).show();
        $('li',$targetMenuSubList).eq(subDepth).find('a').addClass('active');
    }
};

w3.includeHTML(snbSelect); // HTML 인클루드 실행

hljs.initHighlightingOnLoad(); // 하이라이트 코드 JS 실행

window.onload = function() {
    $('body').addClass('show');
};