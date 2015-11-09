var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var isDraggable = width > 800 ? true : false;

function initMap() {
  var map = new google.maps.Map(document.getElementById('profile-map'), {
    center: {lat: parseFloat(pizzas[pizzas.length - 1].latitude), lng: parseFloat(pizzas[pizzas.length - 1].longitude)},
    zoom: 13,
    scrollwheel: false,
    draggable: isDraggable
  });

	pizzas.forEach(function(pizza) {
		var marker = new google.maps.Marker({
	  	position: {lat: parseFloat(pizza.latitude), lng: parseFloat(pizza.longitude)},
	  	map: map,
	  	title: pizza.name
	  });
		marker.addListener('click', function() {
			window.location.href='/search/' + pizza.yelpId;
		});
	});
}