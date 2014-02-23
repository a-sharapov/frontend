/*
	Интерактивное повоедение
*/
$(function() {

// modal windwos close function
	$('body').on('click', '.complete, .errors',
		function(){$(this).animate({'top':'0', 'marginTop':'0'},300,"linear",
			function(){$(this).hide(200,"linear")});
	});

	$('.closethis').click(function(){$(this).parent().hide(600,"easeInOutBack",
		function() {
			if ( $(this).parent().hasClass('overlay') ) {
				$(this).parent().hide(100,"linear");
		}}
	)});

// go to ancor on click
	$('a[href*="#"]').click(function(e){
		if ($(this).attr("href") != '#') {
			elementClick = $(this).attr("href");
			tglocationarr= elementClick.split("#");
			elem = '#'+tglocationarr[1];
			destination = $(elem).offset().top;
			$('body,html').animate({ scrollTop: destination }, 800, "easeInOutBack", function(){window.location.hash = elem} );
			return false;
		}
	});

// Scroll to top
	$(window).scroll(function () {
		if ($(document).innerHeight() > 1250) {
			if ($(this).scrollTop() > 100) {
				$('.back2top').show(900,"easeInOutBack");
			} else {
				$('.back2top').hide(400,"easeInOutBack");
			}
		}
	});

	$('.back2top').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 300);
		return false;
	});

	$(window).scroll(function () {
		if ($('body').attr('id') != 'main') {
		var lmheight = $('.main-menu').offset().top+$('.main-menu').height();
		if ($(document).innerHeight() > 1250) {
			if ($(this).scrollTop() > lmheight) {
				$('.inner-wrapper-cloumn').addClass('fixed-top');
			} else {
				$('.inner-wrapper-cloumn').removeClass('fixed-top');
			}
		}}
	});

// QST form popup
	$('.mkqst').click(function() {
		$('#mkqst').show(500,"linear").parent().show(200,"linear");
	})

});
$(document).ready(function(){

// Go to ancor on pageload
	$(function(){
		var loc = window.location.hash;
		if (loc.indexOf("#") !== -1) {
			tglocationarr = loc.split("#");
			target = '#'+tglocationarr[1];
			destination = $(target).offset().top;
			$('body,html').animate({ scrollTop: destination }, 800, "easeInOutBack" );
		}
		return false;
	});

// Wrapp all images in page
	$('img').each(function() {
		if ( $(this).attr('title') ) {
			imghref = $(this).attr('title');
			$(this).removeAttr('title');
		} else {
			imghref = $(this).attr('src');
		}
		$(this).not('.nopreview').wrap('<a href="'+imghref+'" class="imagewrapper"></a>');
	});

// Forms
	$("select, input:checkbox, input:radio, input:file").uniform();

	$('.rangeroll').noUiSlider('init', {
		knobs: 1,
		step: 1,
		scale: [0, 10],
		start: [0, 0],
		connect: "lower",
		change: function(){
					var values = $(this).noUiSlider('value');
					$(this).find('.noUi-handle div').text(values[1]);
					$(this).find('.ranges').attr({'value':values[1]});
				}

	});

// Hide all elements
	$(".arrows").css({'opacity': '0'});
	$(".go-top").hide();

// Init previewer
	$('a.imagewrapper').touchTouch();

});