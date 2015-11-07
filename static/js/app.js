// Attempted not to use jQuery for my project, but this was the easiest way to fade out.
$(document).ready(function() {
	// Alert fade out.
	$('.alert').delay(2200).fadeOut(300);

	// Modal autofocus.
	$('#signup-modal').on('shown.bs.modal', function () {
		$('#first-name').focus()
	});
	$('#signin-modal').on('shown.bs.modal', function () {
  	$('.signin-email').focus()
	});

	// Ajax delete.
	$('.deleted').click(function(e) {
		e.preventDefault();
		var url = $(this).attr('href');
		$.ajax({
			url: url,
			method: 'DELETE'
		}).done(function(data) {
			window.location.reload();
		});
	});
});