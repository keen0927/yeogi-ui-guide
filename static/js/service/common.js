// 코드 하이라이트
hljs.initHighlightingOnLoad();



$(function(){

    // SNB 열기
    setTimeout(function(){
        var buttonSnbOpen = $('.button-nav__open'),
        buttonSnbClose = $('.button-nav__close'),
        targetSnb = $('nav');

        buttonSnbOpen.click(function(){
            targetSnb.addClass('active');
            if ($('body').hasClass('mobile')) {
                // 모바일
                $('body').removeClass('desktop-snb-control');
            } else {
                // 데스크탑
                if ($('body').hasClass('desktop-snb-control')) {
                    $('body').removeClass('desktop-snb-control');
                } else {
                    $('body').addClass('desktop-snb-control');
                }
            }
        });

        buttonSnbClose.click(function(){
            targetSnb.removeClass('active');
        });
    },0)


    $('.button-copy').click(function(){
        $(this).next().select();
        document.execCommand('copy');
        toastPopup('복사 되었습니다.');
    });
});

// SNB 서브메뉴 오픈
function snbSubMenuOpen() {
    $('body').on('click','.snb-main-list',function(){
        if ($(this).find('ul')) {
            $('.snb-sub.active').parent().removeClass('active');
            $('.snb-main-list.active').removeClass('active');
            $(this).addClass('active');
        }
    });
}
// Iscroll
var sideNavigationScroll;

function sideNavigationScrollRun() {
    if ($('.snb').length == 0) {
        return;
    } else {
        sideNavigationScroll = new IScroll('nav', {
            shrinkScrollbars:'scale',
            scrollbars: true,
            fadeScrollbars: true,
            interactiveScrollbars: true,
            fadeScrollbars:true,
            click:true,
            mouseWheel: true,
        });
    }
}

function iscrollUpdate() {
    if ($('.snb-scroll').is(':visible')) {
        sideNavigationScroll.refresh();
    }
}

// 해상도 컨트롤
function deviceControl() {
    var windowWidth = $(window).width();
    var controlWdith = 769;
    if (windowWidth < controlWdith) {
        // 모바일
        $('body').removeClass('desktop');
        $('body').addClass('mobile');
        $('.wrap').removeClass('wrap__padding-left');
    } else {
        // 데스크탑
        $('body').removeClass('mobile');
        $('body').addClass('desktop');
        $('.wrap').addClass('wrap__padding-left');
    }
}

// 윈도우 리사이즈 이벤트
window.addEventListener('resize', resizeThrottler, false);
window.addEventListener('resize', resizeDefault, false);

// 윈도우 리사이즈 이벤트 - 기본
function resizeDefault () {
    deviceControl();
}

// 윈도우 리사이즈 이벤트 - Thottler
var resizeTimeout;

function resizeThrottler() {
    if ( !resizeTimeout ) {
        resizeTimeout = setTimeout(function(){
            resizeTimeout = null;
            iscrollUpdate();
        },1000);
    }
}

// 로딩 페이드 효과
function fadeLoad() {
    setTimeout(function(){
        $('.wrap').addClass('show');
        setTimeout(function(){
            $('.spinner').addClass('hide');
        },300);
    },300);
}

// ONLOAD Init
window.onload = function() {
    deviceControl(); // 해상도 컨트롤
    sideNavigationScrollRun(); // SNB 스크롤 효과
    snbSubMenuOpen(); // SNB 서브메뉴 오픈 효과
    codeCopy(); // 코드 카피
    fadeLoad();
};

// 토스트팝업
var toastPopupShowing = false;

function toastPopup(text) {
    if ( toastPopupShowing == true) {
        return;
    } else {
        toastPopupShowing = true;
        var html = '<div class="toast-popup"><div>' + text + '</div></div>';
        $('body').append(html);
        setTimeout(function(){
            $('.toast-popup').addClass('show');
        },50);
        setTimeout(function(){
            $('.toast-popup').removeClass('show');
        },1800);
        setTimeout(function(){
            $('.toast-popup').remove();
            toastPopupShowing = false;
        },2200);
    }
}

// 테마 변경 (UI용)
$(function(){
    $('button[data-theme-change]').click(function(){
        var themeName = $(this).attr('data-theme-change');
        var getThemeName = $('body').attr('data-theme');
        themeChange(themeName, getThemeName);
        themeControl.set();
    });
});

function themeChange(themeName, getThemeName) {
    $('body').removeClass('theme-'+ getThemeName).attr('data-theme',themeName).addClass('theme-' + themeName);
}

// 테마 세팅
var themeControl = {
    set: function(theme) {
        $('body').addClass('theme-'+theme);
    }
}

function codeCopy() {
    $('code.html').each(function(){
        // var buttonCopy = '<button type="button" class="button-copy">Copy</button><input type="text" class="copy-input" value="">';
        // $(this).append(buttonCopy);

        // $('.button-copy',this).click(function(){
        //     var thisCode = $(this).parent().text();
        //     var targetInput = $(this).next();
        //     targetInput.attr('value',thisCode);
        //     targetInput.select();
        //     document.execCommand('copy');
        //     toastPopup('복사 되었습니다.');
        // });
    });
}
