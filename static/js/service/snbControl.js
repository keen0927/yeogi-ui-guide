var snbMake = (function() {
	// SNB 메뉴 만들기
	var snbList = [
		{
			route: '/index.html',
			name: '가이드소개',
			icon: 'icon-outline-visibility-24px',
		},
		{
			route: '/pages/guide/learn.html',
			name: '부트스트랩 시작',
			icon: 'icon-outline-account_circle-24px',
		},
		{
			route: '#none',
			name: '샘플페이지',
			icon: 'icon-outline-assignment-24px',
			childrenMenu: [
				{
					route: '/pages/samplePage/page_00.html',
					name: '자주 사용하는 폼',
				},
				{
					route: '/pages/samplePage/page_01.html',
					name: '기본형 1',
				},
				{
					route: '/pages/samplePage/page_02.html',
					name: '기본형 2',
				}
			],
		},
		{
			snbSubTitle: '인터페이스',
			route: '#none',
			name: '스타일',
			icon: 'icon-outline-flash_on-24px',
			childrenMenu: [
				{
					route: '/pages/style/breadcrumb.html',
					name: '사이트 이동 경로',
				},
				{
					route: '/pages/style/grid.html',
					name: '그리드',
				},
				{
					route: '/pages/style/color.html',
					name: '컬러',
				},
				{
					route: '/pages/style/table.html',
					name: '테이블',
				},
				{
					route: '/pages/style/forms.html',
					name: '폼',
				},
				{
					route: '/pages/style/jalnan.html',
					name: '잘난서체',
				},
				{
					route: '/pages/style/iconPack.html',
					name: '아이콘',
				},
				{
					route: '/pages/style/buttons.html',
					name: '버튼',
				},
				{
					route: '/pages/style/alert.html',
					name: '경고',
				},
				{
					route: '/pages/style/badge.html',
					name: '뱃지',
				},
				{
					route: '/pages/style/pagination.html',
					name: '페이지네이션',
				},
				{
					route: '/pages/style/tooltip.html',
					name: '툴팁',
				},
				{
					route: '/pages/style/modal.html',
					name: '모달 팝업',
				},
				{
					route: '/pages/style/spinner.html',
					name: '스피너',
				},
			],
		},
		{
			route: '#none',
			name: '레이아웃',
			icon: 'icon-outline-insert_photo-24px',
			childrenMenu: [
				{
					route: '/pages/layout/snbIntroduce.html',
					name: '사이드 네비게이션',
				},
				{
					route: '/pages/layout/tabMenu.html',
					name: '탭메뉴',
				},
			],
		},
		{
			route: '#none',
			name: '플러그인',
			icon: 'icon-outline-gps_fixed-24px',
			childrenMenu: [
				{
					route: '/pages/plugin/datatable.html',
					name: 'DataTable.js',
				},
				{
					route: '/pages/plugin/dateRangePicker.html',
					name: 'Date Range Picker',
				},
				{
					route: '/pages/plugin/jsTree.html',
					name: 'jsTree',
				},
				{
				    route: "/pages/plugin/chart.html",
				    name: "Chart.js",
				},
				{
				    route: "/pages/plugin/summernote.html",
				    name: "에디터툴 - summernote",
				},
				{
				    route: "/pages/plugin/fingerPrint.html",
				    name: "핑거프린트",
				},
				{
					route: "/pages/plugin/validation.html",
					name: "jQuery Validation"
				},
				{
					route: "/pages/plugin/draggable.html",
					name: "드래그 & 드랍 - Draggable"
				},
				{
				    "route": "/pages/plugin/fineUploader.html",
				    "name": "fineUploader.js(파일업로드)",
				},
				{
				    "route": "/pages/plugin/fineUploaderS3.html",
				    "name": "fineUploader.js(S3)",
				},				
			],
		},
		{
			route: '#none',
			name: 'js 모듈',
			icon: 'icon-outline-radio_button_checked-24px',
			childrenMenu: [
				{
					route: '/pages/modules/selectbox.html',
					name: 'selectbox.js',
				},
				{
					route: '/pages/modules/checkbox.html',
					name: 'checkbox.js',
				},
			],
		},
		{
			snbSubTitle: '페이지',
			route: '#none',
			name: '회원가입',
			icon: 'icon-outline-lock-24px',
			childrenMenu: [
				{
					route: '/pages/authentication/login.html',
					name: '로그인',
					blank: true,
				},
				{
					route: '/pages/authentication/passwordSearch.html',
					name: '비밀번호찾기',
					blank: true,
				},
				{
					route: '/pages/authentication/join.html',
					name: '회원가입',
					blank: true,
				},
			],
		},
		{
			route: '#none',
			name: '에러 페이지',
			icon: 'icon-outline-warning-24px',
			childrenMenu: [
				{
					route: '/pages/error/400.html',
					name: '40X',
					blank: true,
				},
				{
					route: '/pages/error/500.html',
					name: '50X',
					blank: true,
				},
			],
		},
	];

	// 기본 레이아웃
	var html = '<nav><div class="snb-scroll">';
	html += '<h1><a href="/index.html" class="logo">여기어때<span>UI 가이드</span><em>ver Beta.</em></a></h1>';
	html +=
		'<button type="button" class="button-nav__close"><i class="icon-outline-clear-24px"></i><span>닫기</span></button>';
	html += '<div class="snb"><ul class="snb-main"></ul></div>';
	html += '</div></nav>';

	$('#snb').append(html);

	var listLength = snbList.length;

	var subMenuHTML = '';

	for (i = 0; i < listLength; i++) {
		// 리스트 세팅
		if (snbList[i].childrenMenu) {
			if (snbList[i].snbSubTitle) {
				// 서브 타이틀 있을때
				subMenuHTML += '<li class="snb-main-list"><p class="snb-sub-title">' + snbList[i].snbSubTitle + '</p>';
			} else {
				// 서브 타이틀 없을때
				subMenuHTML += '<li class="snb-main-list">';
			}

			if (snbList[i].childrenMenu.length > 0) {
				// 자식 메뉴
				var subListLength = snbList[i].childrenMenu.length;

				subMenuHTML += '<a href="' + snbList[i].route + '" class="snb-sub">';
				subMenuHTML += '<i class="' + snbList[i].icon + '"></i> ' + snbList[i].name;
				subMenuHTML += '<span class="icon-outline-keyboard_arrow_left-24px"></span></a>';

				subMenuHTML += '<ul>';
				for (e = 0; e < subListLength; e++) {
					if (snbList[i].childrenMenu[e].blank == true) {
						subMenuHTML +=
							'<li><a href="' +
							snbList[i].childrenMenu[e].route +
							'" target="_blank">' +
							snbList[i].childrenMenu[e].name +
							'</a></li>';
					} else {
						subMenuHTML +=
							'<li><a href="' +
							snbList[i].childrenMenu[e].route +
							'">' +
							snbList[i].childrenMenu[e].name +
							'</a></li>';
					}
				}
			}
			subMenuHTML += '</ul></li>';
		} else {
			subMenuHTML += '<li><a href="' + snbList[i].route + '" class="snb-sub">';
			subMenuHTML += '<i class="' + snbList[i].icon + '"></i> ' + snbList[i].name + '</a></li>';
		}
	}

	$('.snb-main').append(subMenuHTML);
})();

$(function() {
	// SNB Active
	var currentPath = location.pathname;

	$('.snb li > a').each(function() {
		var $this = $(this);
		if ($this.attr('href').indexOf(currentPath) !== -1) {
			if (currentPath == '/') {
				$('.snb-main li')
					.eq(0)
					.addClass('active');
				return;
			}
			if ($this.hasClass('snb-sub')) {
				$(this)
					.parent()
					.addClass('active');
			} else {
				$(this)
					.parent()
					.parent()
					.parent()
					.addClass('active');
			}
			$this.addClass('active');
		}
	});

	$('body').on('click', '.snb-main > li > a', function(e) {
		if (
			$(this)
				.parent()
				.hasClass('snb-main-list')
		) {
			if (
				$(this)
					.parent()
					.hasClass('active')
			) {
				$(this)
					.parent()
					.removeClass('active');
			} else {
				$('.snb-main-list.active').removeClass('active');
				$(this)
					.parent()
					.addClass('active');
			}
		}
	});

	$('body').on('click', '.snb-main-list p', function(e) {
		e.preventDefault();
	});
});
