var snbMake = (function() {

    // SNB 메뉴 만들기
    var snbList = [
        {
            "route": "/index.html",
            "name": "가이드소개",
            "icon":  "icon-outline-visibility-24px",
        },
        {
            "route": "/pages/guide/learn.html",
            "name": "부트스트랩 시작",
            "icon": "icon-outline-account_circle-24px",
        },
        {
            "route": "#none",
            "name": "샘플페이지",
            "icon": "icon-outline-assignment-24px",
            "childrenMenu": [
                {
                    "route": "/pages/samplePage/page_01.html",
                    "name": "기본형",
                }
            ]
        },
        {
            "snbSubTitle": "인터페이스",
            "route": "#none",
            "name": "스타일",
            "icon": "icon-outline-flash_on-24px",
            "childrenMenu": [
                {
                    "route": "/pages/style/grid.html",
                    "name": "그리드",
                },
                {
                    "route": "/pages/style/color.html",
                    "name": "컬러",
                },
                {
                    "route": "/pages/style/table.html",
                    "name": "테이블",
                },
                {
                    "route": "/pages/style/forms.html",
                    "name": "폼",
                },
                {
                    "route": "/pages/style/jalnan.html",
                    "name": "잘난서체",
                },
                {
                    "route": "/pages/style/iconPack.html",
                    "name": "아이콘",
                },
                {
                    "route": "/pages/style/buttons.html",
                    "name": "버튼",
                },
                {
                    "route": "/pages/style/alert.html",
                    "name": "경고",
                },
                {
                    "route": "/pages/style/badge.html",
                    "name": "뱃지",
                },
            ]
        },
        {
            "route": "#none",
            "name": "플러그인",
            "icon": "icon-outline-radio_button_checked-24px",
            "childrenMenu": [
                {
                    "route": "/pages/plugin/datatable.html",
                    "name": "DataTable.js",
                },
                {
                    "route": "/pages/plugin/validation.html",
                    "name": "Validation",
                },
                {
                    "route": "/pages/plugin/Swiper.html",
                    "name": "Swiper.js",
                },
                {
                    "route": "/pages/plugin/Dropzone.html",
                    "name": "Dropzone.js",
                },
            ]
        },
        {
            "snbSubTitle": "페이지",
            "route": "#none",
            "name": "Authentication",
            "icon": "icon-outline-lock-24px",
            "childrenMenu": [
                {
                    "route": "/pages/authentication/login.html",
                    "name": "로그인",
                    "blank": true,
                },
                {
                    "route": "/pages/authentication/passwordSearch.html",
                    "name": "비밀번호찾기",
                    "blank": true,
                },
                {
                    "route": "/pages/authentication/join.html",
                    "name": "회원가입",
                    "blank": true,
                },
            ]
        },
        {
            "route": "#none",
            "name": "에러 페이지",
            "icon": "icon-outline-warning-24px",
            "childrenMenu": [
                {
                    "route": "/pages/error/400.html",
                    "name": "40X",
                    "blank": true,
                },
                {
                    "route": "/pages/error/500.html",
                    "name": "50X",
                    "blank": true,
                }
            ]
        },
    ];

    // 기본 레이아웃
    var html = '<nav><div class="snb-scroll">';
        html += '<h1><a href="/index.html" class="logo">여기어때<span>UI 가이드</span></h1>';
        html += '<button type="button" class="button-nav__close"><i class="icon-outline-clear-24px"></i><span>닫기</span></button>';
        html += '<div class="snb"><ul class="snb-main"></ul></div>';
        html += '</div></nav>';

    $('#snb').append(html);

    var listLength = snbList.length;

    var subMenuHTML = '';

    for ( i = 0 ; i < listLength ; i++ ) {
        // 리스트 세팅
        if (snbList[i].childrenMenu) {
            if (snbList[i].snbSubTitle) {
                // 서브 타이틀 있을때
                subMenuHTML += '<li class="snb-main-list"><p class="snb-sub-title">' + snbList[i].snbSubTitle + '</p>';
            } else {
                // 서브 타이틀 없을때
                subMenuHTML += '<li class="snb-main-list">';
            }

            if ( snbList[i].childrenMenu.length > 0) {
                // 자식 메뉴
                var subListLength = snbList[i].childrenMenu.length;

                subMenuHTML += '<a href="' + snbList[i].route + '" class="snb-sub">';
                subMenuHTML += '<i class="' + snbList[i].icon + '"></i> ' + snbList[i].name;
                subMenuHTML += '<span class="icon-outline-keyboard_arrow_left-24px"></span></a>';

                subMenuHTML += '<ul>'
                for ( e = 0 ; e < subListLength ; e ++) {

                    if ( snbList[i].childrenMenu[e].blank == true) {
                        console.log('11');
                        subMenuHTML += '<li><a href="' +  snbList[i].childrenMenu[e].route  +'" target="_blank">' + snbList[i].childrenMenu[e].name + '</a></li>';
                    } else {
                        console.log('22');
                        subMenuHTML += '<li><a href="' +  snbList[i].childrenMenu[e].route  +'">' + snbList[i].childrenMenu[e].name + '</a></li>';
                    }
                }
            }
            subMenuHTML +=  '</ul></li>'
        } else {
            subMenuHTML += '<li><a href="' + snbList[i].route + '" class="snb-sub">';
            subMenuHTML += '<i class="' + snbList[i].icon + '"></i> ' + snbList[i].name + '</a></li>';
        }
    }

    $('.snb-main').append(subMenuHTML);

})();

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