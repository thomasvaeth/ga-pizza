// Attempted not to use jQuery for my project, but this was the easiest way to fade out.
$(document).ready(function() {
	// Alert fade out.
	$('.alert').delay(2200).fadeOut(300);

	// Disable gelocation button for 4 seconds because it takes a few seconds to get.
	setTimeout(function() {
		$('.geolocation').removeAttr('disabled');
	}, 4000);
});