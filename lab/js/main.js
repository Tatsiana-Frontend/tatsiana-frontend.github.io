$(function(){

	// Scrolling
    $("a.go").click(function (e) {
        e.preventDefault();
        elementClick = $(this).attr("href");
        destination = $(elementClick).offset().top;
        $("body,html").animate({scrollTop: destination }, 800);
    });

    // Слайдер с отзывами

    $('.feedback__slider').slick({
        dots: true,
        prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-angle-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fas fa-angle-right"></i></button>'
    });

	// Прелоадер

    var $preloader = $('#page-preloader'),
        $spinner   = $preloader.find('.spinner');
    $spinner.fadeOut();
    $preloader.delay(350).fadeOut('slow');


    // Выпадающее меню

    $('.ham').click(function() {
        $('.menu-collapse').toggleClass('d-none').css('order','1');
        $('.menu__list').toggleClass('menu-opened');
    });

    $('.menu-opened li a').click(function() {
        $('.menu-collapse').toggleClass('d-none').css('order','1');
        $('.menu__list').toggleClass('menu-opened');
    });

    
    // Заказ звонка

    $('.btn-home').click(function (e) {
        e.preventDefault();
        $('#callModal').arcticmodal();
    });

});



