$(document).ready(function(){

	// Slider
	$('.single-item').slick({
			speed: 1200,
			prevArrow: '<button type="button" class="slick-prev"><img src="img/previous_arrow.png"></button>',
			nextArrow: '<button type="button" class="slick-next"><img src="img/next_arrow.png"></button>',
			responsive: [
					{
							breakpoint: 767,
							settings: {
								arrows: false,
								dots: true
							}
					}
			]
	});

	// Tabs
	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
		$(this)
			.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
			.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	});

	// Catalog content
	function toggleSlide(item) {
		$(item).each(function(i) {
				$(this).on('click', function(e) {
						e.preventDefault();
						$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
						$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
				});
		});
	}

	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__back');


	// Popup
	$('[data-popup=consultation]').on('click', function() {
		$('.overlay, #call').fadeIn('slow');
		$('body').addClass('stop-scrolling');
	});
	$('.popup__close').on('click', function() {
		$('.overlay, #call, #order, #thanks').fadeOut('slow');
		$('body').removeClass('stop-scrolling');

	});
	$('.consult-btn_mini').each(function(i) {
		$(this).on('click', function() {
			$('#order .popup__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('slow');
			$('body').addClass('stop-scrolling');
		});
	});
});