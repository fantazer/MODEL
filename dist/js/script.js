$(document).ready(function () {

		//datepicker
	function isElementInViewport(el) {
			var rect = el.getBoundingClientRect();
			var fitsLeft = (rect.left >= 0 && rect.left <= $(window).width());
			var fitsTop = (rect.top >= 0 && rect.top <= $(window).height());
			var fitsRight = (rect.right >= 0 && rect.right <= $(window).width());
			var fitsBottom = (rect.bottom >= 0 && rect.bottom <= $(window).height());
			return {
					top: fitsTop,
					left: fitsLeft,
					right: fitsRight,
					bottom: fitsBottom,
					all: (fitsLeft && fitsTop && fitsRight && fitsBottom)
			};
	}

	var dp = $('.getdate').datepicker({
		minDate: new Date(),
		autoClose: true,
		onHide: function(inst){
				inst.update('position', 'right center'); // Update the position to the default again
		},
		onShow: function(inst, animationComplete){
				// Just before showing the datepicker
				if(!animationComplete){
						var iFits = false;
						// Loop through a few possible position and see which one fits
						$.each(['right center', 'right bottom', 'right top', 'top center', 'bottom center'], function (i, pos) {
								if (!iFits) {
										inst.update('position', pos);
										var fits = isElementInViewport(inst.$datepicker[0]);
										if (fits.all) {
												iFits = true;
										}
								}
						});
				}
		}
	}).data('datepicker');

	//При использовании в модальном окне чтобы при скроле оставалось в той же позиции
	$('.modal-wrap').on('scroll', function () {
		dp.update();
	});
	//datepicker===end

	// toggle lk-history
	$('.history__el-head').click(function(){
		$(this).toggleClass("history__el-head--active");
		$(this).closest(".history__el").find(".history__el-cont").slideToggle();
	});
	// toggle lk-history === end

	//custom scroll
/*	$(".nice-scroll").niceScroll({
		autohidemode:"false",
		touchbehavior:"true"
	});*/
	//custom scroll === end


	// nice select
		$('.select-beauty').niceSelect();
	// nice select === end

// ====== basket ======
	//cart vertical slider
	var initSlider = function(){
		$('.basket-container').not('.slick-initialized').slick({
		  slidesToShow: 2,
		  autoplay: false,
		  speed: 500,
		  vertical:true,
		  arrows: true,
		  prevArrow: $('.header__sub-arrow-up'),
		  nextArrow: $('.header__sub-arrow-down'),
		  verticalSwiping:true,
		  infinite:false,
		  responsive: [
					{
							breakpoint: 768,
							settings: "unslick"
					}
			]
		});

	};
	initSlider();
	//cart vertical slider end

	//modal ingr toggle
	$('.add-ingr__el').click(function(){
		if(!$(this).hasClass('add-ingr__el--active')){
			$(this).addClass('add-ingr__el--active');
		}
		console.log('move');
	});

	$('.add-ingr-clear').click(function(){
		$('.add-ingr__el').removeClass('add-ingr__el--active');
	});
	//modal ingr toggle ===end

	//increment field
	$('.incr__minus').click(function (e) {
		var $input = $(this).parent().find('.incr__val span');
		var count = parseInt($input.html()) - 1;
		if(!$(this).hasClass("incr--one")){ // add class incr--one for 1 always
			if(count < 1){
				count = 0;
			}
		}else{
			if(count < 1){
				$(this).closest('.add-ingr__el').removeClass('add-ingr__el--active');
				//ingr toggle === end
				$(this).closest('.product-footer').find('.product-add').show();
				$(this).closest('.product-footer').toggleClass('product-footer-numb');
				$(this).closest('.product-footer').find('.incr__val span').html(1);
				count = 1;
			}
		}
		$input.html(count);
		e.stopPropagation();
	});

/*	$('.incr--one .incr__minus').click(function () {
		var $input = $(this).parent().find('.incr__val span');
		var count = parseInt($input.html()) - 1;
		count = count < 1 ? 1 : count;
		$input.html(count);
	});*/

	$('.incr__plus').click(function () {
		var $input = $(this).parent().find('.incr__val span');
		var count = parseInt($input.html()) + 1;
		count = count > 100 ? 100 : count;
		$input.html(count);
	});

	//increment field end

	//toggle menu
	$('.header-menu').click(function (event) {
		$('.basket-wrap').removeClass('bounce-show');
		$('.header-cart').removeClass('header-cart--open');
		$('.header-menu-sub-wrap').toggleClass('bounce-show');
		$('.header-menu').toggleClass('header-menu--open');
		//initSlider();
		event.stopPropagation();
	});
	$('.header-menu-sub-wrap').on("click", function (event) {
		event.stopPropagation();
	});
	$(document).on("click", function () {
		$('.header-menu').removeClass('header-menu--open');
		$('.header-menu-sub-wrap').removeClass('bounce-show');

	});
	//toggle menu end

	//toggle basket
	$('.cart-wrap').click(function (event) {
		$('.header-menu-sub-wrap').removeClass('bounce-show');
		$('.header-menu').removeClass('header-menu--open');
		if ($(window).width() < 769) {
			//$('body').toggleClass('modal-open');
		}
		$('.basket-wrap').toggleClass('bounce-show');
		$('.cart-wrap').toggleClass('header-cart--open');
		//initSlider();
		event.stopPropagation();
	});
	$('.basket-wrap').on("click", function (event) {
		event.stopPropagation();
	});
	$(document).on("click", function () {
		$('.cart-wrap').removeClass('header-cart--open');
		$('.basket-wrap').removeClass('bounce-show');
		$('body').removeClass('modal-open');
	});
	//toggle basket end


	//remove item in basket

	// function for valide number item in cart
	var cartSliderItem = function () {
		//$('.main-slider').slick('reinit');
		//initSlider();
		if (!$('.basket-container .basket__el').length) {
			//$('.cart-wrap').click();
			$('.basket-empty').show();
			$('.basket-footer').hide();
			$('.basket-container').hide();
		}else{
			$('.basket-empty').hide();
			$('.basket-footer').show();
			$('.basket-container').show();
		}
		if ($('.basket-container .basket__el').length < 3) {
			$('.slick-arrow').hide()
		} else {
			$('.slick-arrow').show()
		}
		/*$('.basket-container').on('reInit afterChange', function(event, slick, currentSlide, nextSlide){
			var i = (currentSlide ? currentSlide : 0) + 1;
			console.log(slick.slideCount);
		});*/
	};

	$('.basket__delete').click(function () {

		$(this).closest('.basket__el').remove();
		cartSliderItem();
	});
	//remove item in basket end


	//remove item in basket by decrement
	var Incr;

	$('.basket__el .incr__nav').click(function () {
		Incr = $(this).closest('.incr').find('.incr__val span').html() * 1;
		if (Incr == 0) {
			$(this).closest('.basket__el').remove();
			cartSliderItem();
		}
	});
	//remove item in basket by decrement end

	//clear basket
	$('.js-basket-clear').click(function(){
		$('.basket-container .basket__el').remove();
		$('.basket-container .slick-slide').remove();
		cartSliderItem();
	});
	//clear basket=== end

	var shrinkHeader = 450;
	$(window).scroll(function() {
		var scroll = $(this).scrollTop();
		if ( scroll >= shrinkHeader ) {
				var heightHeader=$('.header-menu-wrap').height();
				$('.header').addClass('shrink');
				$('body').css('paddingTop',heightHeader);
			}
			else {
					$('.header').removeClass('shrink');
					$('body').css('paddingTop',0);
			}
	});
	//animate header end

	// ====== basket ======

	//main slider
	$('.main-slider').slick({
		slidesToShow: 1,
		speed: 500,
		autoplay: true,
		arrows:false,
		dots:true,
		//fade: true
		//autoplaySpeed: 8000, time between
		customPaging : function(slider, i) {
							return '<span class="dot"></span>';
			}
	});

	//main slider === end


	// ==== PRODUCT ====
	$('.product-get').click(function () {
			$(this).closest('.product-footer').find('.product-get').hide();
			$(this).closest('.product-footer').find('.product-add').show();
		});

		//toggle buton
		$('.product-add').click(function () {
			$(this).closest('.product-footer').find('.product-add').hide();
			$(this).closest('.product-footer').toggleClass('product-footer-numb');
		})

		//animate cart on add
		$('.toggle-cart-animate').add('.incr__nav').click(function () {
			$('.cart').addClass('animate-basket');
			setTimeout(function(){
					$('.cart').removeClass('animate-basket');
				}, 400);
		});
		//animate cart on add end

	//check val < 0
	var currentIncr;

	$('.product-incr .incr__nav').click(function () {
		currentIncr = $(this).closest('.incr').find('.incr__val span').html()*1;
		console.log();
		if(currentIncr == 0){
			$(this).closest('.product-footer').find('.product-add').show();
			$(this).closest('.product-footer').toggleClass('product-footer-numb');
			$(this).closest('.incr').find('.incr__val span').html(1)
		}

	});
	//check val < 0 end
	// ==== PRODUCT ==== === end

	$('.product-el').hover(function () {
		$(this).addClass("product-el--hover")
	},function(){
		$(this).removeClass("product-el--hover")
	})

	// sale slider
		$('.sale-slider').slick({
		slidesToShow: 1,
		speed: 500,
		autoplay: true,
		arrows:false,
		dots:true,
		//fade: true
		//autoplaySpeed: 8000, time between
		customPaging : function(slider, i) {
							return '<span class="dot"></span>';
			}
	});
	// sale slider === end


//modals
var modalState = {
	"isModalShow": false, //state show modal
	"scrollPos": 0
};
/*$('.modal-content').click(function (event) {
	event.stopPropagation();
});*/

var openModal = function () {
	if (!$('.modal-layer').hasClass('modal-layer-show')) {
		$('.modal-layer').addClass('modal-layer-show');
		modalState.scrollPos = $(window).scrollTop();
		$('body').css({
			overflow: 'hidden',
			//position: 'fixed',
			overflowY: 'hidden',
			top: -modalState.scrollPos,
			width: '100%'
		});
	}
	modalState.isModalShow = true;
};
var closeModal = function () {
	$('.modal-layer').removeClass('modal-layer-show');
	$('body').css({
		overflow: '',
		position: '',
		top: modalState.scrollPos
	});
	$(window).scrollTop(modalState.scrollPos);
	$('.modal').removeClass('modal__show');
	modalState.isModalShow = false;
};

var initModal = function (el) {
	openModal();
	$('.modal').each(function () {
		if ($(this).data('modal') === el) {
			$(this).addClass('modal__show')
		} else {
			$(this).removeClass('modal__show')
		}
	});
	var modalHeightCont = $(window).height();
	$('.modal-filter').height(modalHeightCont);

};

$('.modal-get').click(function () {
	var currentModal = $(this).data("modal");
	initModal(currentModal);
});


$(' .modal-close , .hide-modal').click(function () {
	closeModal();
});
//modals===end

	//init animate placeholder
	$('.input-animate').each(function(){
		var current = $(this);
		var dataString = "<span class='input-placeholder-val'>"+current.data('input')+"</span>";
		current.parent().append(dataString);
	});

	$('.input-animate').on('input', function (e) {
		$(e.currentTarget).attr('data-empty', !e.currentTarget.value);
	});

	$('.input-placeholder-val').click(function(){
		$(this).parent().find('.input-animate').focus(); //найти Input и повесить focus
	});
	//init animate placeholder end


	//tab delivery
	$('.order-form__tab-el').click(function(){
		var currentTab = $(this).data('tab');
		if(currentTab=='self'){
			$('.order-form__border-el').addClass('order-form__border-el--right')
		} else {
			$('.order-form__border-el').removeClass('order-form__border-el--right')
		}
		$('.order-form__tab-el').removeClass('order-form__tab-el--active');
		$(this).addClass('order-form__tab-el--active');

		$('.order-form__tab-container').each(function(){
			if($(this).data('tab')==currentTab){
				$(this).addClass('order-form__tab-container-active')
			}else{
				$(this).removeClass('order-form__tab-container-active')
			}
		})
	});
	//tab delivery end


	//card type
	$('.card-type__el').click(function () {
		console.log(1);
		$('.card-type__el').removeClass('card-type__el--active');
		$(this).addClass('card-type__el--active');
	});
	//card type-end

	//detect mobile

	$(window).resize(function(){
		if($(window).width() > 769){
			initSlider();
		}
	});
	//detect mobile end

	//mobile menu
	//Фиксируем скрол
	$('.head-toggle--open').click(function(){
		/*$('body').css({
			overflow: '',
			position: '',
			top: ''
		})*/
	});

	$('.head-toggle').click(function(event){
		event.stopPropagation();
		$(this).toggleClass('head-toggle--open');
		$('.slide-menu').toggleClass('slide-menu--open');
		//$('body').toggleClass('body-fix')
	});

	$('.slide-menu').on("click", function (event) {
		event.stopPropagation();
	});

	$(document).on("click", function () {
			$('.head-wrap').removeClass('head--up');
			$('.head-toggle').removeClass('head-toggle--open');
			$('.slide-menu').removeClass('slide-menu--open');
			console.log(modalState.isModalShow);
			if(modalState.isModalShow == false){
				$('body').removeClass('body-fix')
		}
	});
	//mobile menu===end

	// toggle sizes
	$('.size__el').click(function(){
		$(this).closest('.size').find('.size__el').removeClass('size__el--active');
		$(this).addClass('size__el--active');
	});

	$('.duff__el').click(function(){
		$(this).closest('.duff').find('.duff__el').removeClass('duff__el--active');
		$(this).addClass('duff__el--active');
	});
	// toggle sizes === end

	// toggle show map
	$('.footer-info__map').click(function(){
		$(this).toggleClass('footer-info__map--active');
		$('.footer-map-wrap').slideToggle();
	});
	// toggle show map === end

	// toggle review
	$('.like-el').click(function(){
		$('.like-el').removeClass('like-el--active');
		$(this).addClass('like-el--active');
	});
	// toggle review === end

	// template scroll
	$('.scroll').perfectScrollbar({
		wheelSpeed: 1.2,
	});
	// template scroll === end
});
