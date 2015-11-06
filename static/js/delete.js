$(document).ready(function() {
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