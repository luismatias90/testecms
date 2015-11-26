
$(document).ready(function(){
	/*****************SCROLL SUBMENU FIXO********************************/
	
	var el = $(".submenu");
	
	var elpos = el.offset().top;
	
	$(window).on("scroll", function(e) {
	    
	  if ($(this).scrollTop() > elpos && !el.hasClass("fixed-submenu")) {
		  el.addClass("fixed-submenu");
	  } else if($(this).scrollTop() < elpos){
		  el.removeClass("fixed-submenu");
	  }
	  
	});
	
	/*****************SCROLL ANIMATION LINKS********************************/
	$('[role=presentation] a[href^="#"]').on('click',function (e) {
	    e.preventDefault();
	
	    var target = this.hash;
	    $target = $(target);
	
	    var hasClass = $(".submenu").hasClass("fixed-submenu");//tinha classe antes do click
	    
	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top - 60
	    }, 900, 'swing', function () {
	    	if($(".submenu").hasClass("fixed-submenu") && !hasClass){//classe fixed foi adicionada, então precisa ajustar posição
	    		$('html, body').stop().animate({
	    	        'scrollTop': $target.offset().top - 60
	    	    }, 300, 'swing');
	    	}
	    });
	});
	
});//FIM $(document).ready