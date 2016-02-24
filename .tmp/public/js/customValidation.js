$(document).ready(function(){

	// Validate
	// http://bassistance.de/jquery-plugins/jquery-plugin-validation/
	// http://docs.jquery.com/Plugins/Validation/
	// http://docs.jquery.com/Plugins/Validation/validate#toptions

		$('.form').validate({
	    rules: {
	      title: {
	        required: true
	      },
	      description: {
	        required: true
	      },
	      URL: {
	        required: true
	      }
	    }
	  });
      
      //active navbar
      $('.nav li a').click(function() {

        $('.nav li a').removeClass('active');

        var $parent = $(this).parent();
        if (!$parent.hasClass('active')) {
            $parent.addClass('active');
        }
        //e.preventDefault();
    });


    $(".button-collapse").sideNav();
});