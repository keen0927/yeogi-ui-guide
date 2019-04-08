$(function(){

    // SNB Active
    $('.depth-01 li a').each(function(){

        if ($(this).next().is('ul')) {
            var htmlArrow = '<span class="icon-outline-keyboard_arrow_left-24px"></span>';
            $(this).append(htmlArrow);
        }
        
        // 클릭 이벤트
        $(this).click(function(){
            if ($(this).hasClass('active')) {
                $(this).next().removeClass('active');
                $(this).removeClass('active');
                $(this).next().children().find('.active').removeClass('active');
            } else {
                if ($(this).next().is('ul')) {
                    $(this).addClass('active');
                    $(this).next().addClass('active');
                }
            }
        });

        if ($(this).hasClass('active')) {
            
            var targetDepth = $(this).parent().parent();

            if (targetDepth.is('ul')) {
                var depthCheck = targetDepth.attr('class'),
                    targetDepth1 = $(this).closest('.depth-01'),
                    targetDepth2 = $(this).closest('.depth-02'),
                    targetDepth3 = $(this).closest('.depth-03');                    
                
                if (depthCheck.indexOf('depth-02') !== -1) {
                    targetDepth3.addClass('active');
                    targetDepth3.prev().addClass('active');
                }                
                if (depthCheck.indexOf('depth-03') !== -1) {
                    targetDepth3.addClass('active');
                    targetDepth3.prev().addClass('active');
                    targetDepth2.prev().addClass('active');
                    targetDepth2.addClass('active');
                }
                if (depthCheck.indexOf('depth-04') !== -1) {
                    targetDepth3.addClass('active');
                    targetDepth3.prev().addClass('active');
                    targetDepth2.prev().addClass('active');
                    targetDepth2.addClass('active');
                    targetDepth1.prev().addClass('active');
                    targetDepth1.addClass('active');                    
                }
                targetDepth.addClass('active');
            }
        }
    });

    // 1뎁스 이벤트
    $('.depth-01 > li > a').each(function(){
        $(this).click(function(){
            var anotherThisParent = $('.depth-01 > li > a.active').not($(this)).parent();
            $('.active',anotherThisParent).removeClass('active');
        });
    });

    // 2뎁스 이벤트
    $('.depth-02 > li > a').each(function(){
        $(this).click(function(){
            var anotherThisParent = $('.depth-02 > li > a.active').not($(this)).parent();
            $('.active',anotherThisParent).removeClass('active');
        });
    });    

    // 3뎁스 이벤트
    $('.depth-03 > li > a').each(function(){
        $(this).click(function(){
            var anotherThisParent = $('.depth-03 > li > a.active').not($(this)).parent();
            $('.active',anotherThisParent).removeClass('active');
        });
    });
});

