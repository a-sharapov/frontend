// Front-end UI script

$(document).ready(function($) {
	// header catalog menu out
	$('.header-menu .menu-item-5').hover(function () {
		$(".catalog-out-menu").not(".dropped").addClass("dropped").mouseleave(function() {
			$(this).removeClass("dropped");
		});
	});
	
	$('.header-menu > span').not('.menu-item-5').hover(function () {
		$(".catalog-out-menu.dropped").removeClass("dropped");
	});
	
	// footer sub-menu hide
	$(".footer-submenu").each(function() {
		if ($(this).find("span").length > 5) {
		$(this).find("span").slice(5).hide().addClass('hidden');
		$(this).append("<span class='expander hide'><i>Expande &darr;</i></span>");
		}
	});
	// footer sub-menu buttons bind
	$("body").on("click", ".expander", function() {
		if ($(".expander").is(".hide")) {
			$(".footer-submenu .hidden").show(200, "linear");
			$(this).removeClass("hide");
			$(this).find("i").html("Collapse &uarr;");
		} else {
			$(".footer-submenu .hidden").hide(200, "linear");
			$(this).addClass("hide");
			$(this).find("i").html("Expande &darr;");
		}
	});
	
	// go to top button bind
	$(document).height()>$(window).height()&&$(window).scroll(function(){$(document).height()-$("footer").height()>$(this).scrollTop()+$(window).height()&&$(this).scrollTop()>800?$("#to-top").fadeIn(200,"linear"):$("#to-top").fadeOut(200,"linear")});
	$("body").on("click", "#to-top", function() {
		$("body,html").animate({
			scrollTop: 0
		}, 300);
	});
	
	// header floater show
	$(window).scroll(function() {
		if ($(document).innerHeight()-$("header").height() > 2000 && $(this).scrollTop() > $("header").height()+500) {
			$("header").addClass("fixed-top");
		}
		if ($(this).scrollTop() == 0) {
			$("header").removeClass("fixed-top");
		}
	});
	
	// close modals
	$(document).keyup(function(e) {
		switch (e.keyCode) {
				case 27: //esc
					$(".closethis").trigger("click");
		   		break;
		}
	});
	$("body").on("click", ".closethis", function() {
		$(this).parent().hasClass("window") && $("html").removeClass("noscroll");
		$(this).parent().hide(200, "linear", function() {
			$(this).parent().hasClass("overlay") && $(this).parent().hide(100, "linear");
		})
	});
	
	// formcallers
	function windowcaller(target, caller) {
		$("body").on("click", caller, function () {
		$("html").addClass('noscroll');
		$(target).parent().show(200, "linear", function() {
			$(target).show(200, "linear");
		});
		return false;
		});
	}
	windowcaller(".feedback-placeholder", ".feedback-form-caller");
	windowcaller("#searchform-placeholder", ".search-form-caller");
	
	// styling assets
	$("article img").each(function() { $(this).attr("data-original") ? (imghref = $(this).attr("data-original")) : imghref = $(this).attr("src"), $(this).not(".nopreview, .img-responsive").wrap('<a href="' + imghref + '" class="imagewrapper"></a>')}), 
	$("a.imagewrapper").touchTouch();
	
	// forms
	$("select, input:checkbox, input:radio, input:file").uniform({
		fileButtonHtml: "Прикрепить файл",
        fileDefaultHtml: "Файл не выбран"
	});
	$("body").on("click", ".uploader .action", function() {
		$(this).parent().find("input").trigger("click");
	});
	
	$("textarea, input[type=\"text\"]").each(function() {
		var pltext = $(this).attr("placeholder");
		if (pltext != "") {
			pltextsp = "<span class=\"fade-placeholder\" style=\"display: none\">" + pltext + "</span>"
			$(this).parent().addClass("fade-ph").prepend(pltextsp);
		}
	});
	$("body").on("focus", "textarea, input[type=\"text\"]", function() {
		if( $(this).val() != "" ) {
			$(this).parent().find(".fade-placeholder").fadeIn(150, "linear");	
		}
	});
	$("body").on("blur", "textarea, input[type=\"text\"]", function() {
		$(this).parent().find(".fade-placeholder").fadeOut(150, "linear");
	});
	
	// HL code
	$("pre code").each(function(i, block) {
    	hljs.highlightBlock(block);
  	});
	
	// tabs switch
	$("body").on("click", ".tab-switcher > li", function() {
		if (!$(this).hasClass("active")) {
			var ic_id = $(this).parent().attr("id")+"-target";
			$(this).parent().find("li").removeClass("active")
			$(this).addClass("active");
			var target = $(this).attr("class").split(" ")[0]+"-placeholder";
			$("#"+ic_id+" > div").hide(200);
			$("#"+ic_id).find("."+target).show(200);
		} else {
			return false;
		}
	});
	
	// Parallax
	$("*").mousemove(function(e) {
		var     p = $("html").width()/2 - e.pageX;
		$("#coffee-cup").css("background-position", -p/40+"px 100%");
		$("#cover").css("background-position", p/30+"px 100%")
	});
	
	// Response aside
	$("span.button.responsive-menu-caller").on("click", function() {
		if ($(this).is(".active")) {
			$("html").removeClass("noscroll");
			$(this).removeClass("active");
			$("main#main-content-placeholder, aside#floater").removeClass("responsed");
		} else {
			$("html").addClass("noscroll");
			$(this).addClass("active");
			$("main#main-content-placeholder, aside#floater").addClass("responsed");
		}
	});
	
	// Gallery
	$("body").on("TToverlayShow", function() {
		$("html").addClass("noscroll");
	});
	$("body").on("TToverlayHide", function() {
		$("html").removeClass("noscroll");
	});
	
	// Zoom
	$("body").append("<div id=\"gallery-zoom-placeholder\"><span class=\"closethis\">&times;</span><div class=\"galleryzoom\"></div></div>");
	$("#gallery-zoom-placeholder").append("<div id=\"gallery-zoom-controls\"><span class=\"zoom-control zoomin\">+</span><span class=\"zoom-control zoomreset\">100%</span><span class=\"zoom-control zoomout\">-</span></div>");
	
	$(document).on("click", "a.view-zoomed", function(e) {
		e.preventDefault();
		target_src = $(this).attr("href");
		$("html").addClass("noscroll");
		$("#gallery-zoom-placeholder").show(200, "linear");
		$("#gallery-zoom-placeholder .galleryzoom").append("<img src=\""+target_src+"\" />").trigger("TTzoomCalling");		
	});
	$("body").on("click", "#gallery-zoom-placeholder .closethis", function() {
		$(this).trigger("TTzoomClose");
	});
	
	$("body").on("TTzoomCalling", function() {
		$(".galleryzoom").panzoom({
		  minScale: 1,
		  maxScale: 3,
		  cursor: "move",
          startTransform: "scale(1)",
		  $zoomIn: $("span.zoom-control.zoomin"),
		  $zoomOut: $("span.zoom-control.zoomout"),
		  $reset: $("span.zoom-control.zoomreset")
		}).panzoom('zoom', true);
	});
	$("body").on("TTzoomClose", function() {
		$("html").removeClass("noscroll");
		$(".galleryzoom").panzoom("destroy");
		$(".galleryzoom").find("img").remove();
	});
	
	// Zoom controllers
	$("#gallery-zoom-placeholder").on("mousewheel", function(e) {
		switch  (e.deltaY) {
		case +1:
			$("span.zoom-control.zoomin").trigger("click");
		break
		case -1:
			$("span.zoom-control.zoomout").trigger("click");
		break
		}
	});
	
	/*
	// Ajaxify
	// Start
	$(document).bind('ajaxifystart', function(event) {
		$("#loading-overlay").show(50, "linear");
		$("html").addClass("noscroll");
	});
	// Complete
	$(document).bind('ajaxifycomplete', function(event) {
		$("#loading-overlay").hide(550, "linear");
		$("html").removeClass("noscroll");
		
		// styling assets
		$("article img").each(function() { $(this).attr("data-original") ? (imghref = $(this).attr("data-original")) : imghref = $(this).attr("src"), $(this).not(".nopreview, .img-responsive").wrap('<a href="' + imghref + '" class="imagewrapper"></a>')}), $("a.imagewrapper").touchTouch();
		
		// forms
		$("select, input:checkbox, input:radio, input:file").uniform({
			fileButtonHtml: "Прикрепить файл",
			fileDefaultHtml: "Файл не выбран"
		});
		$("body").on("click", ".uploader .action", function() {
			$(this).parent().find("input").trigger("click");
		});
	});
	*/
});