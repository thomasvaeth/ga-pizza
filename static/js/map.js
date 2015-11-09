var pizzeria = document.getElementsByTagName('input')[0].value;
var latitude = parseFloat(document.getElementsByTagName('input')[4].value);
var longitude = parseFloat(document.getElementsByTagName('input')[5].value);

var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var isDraggable = width > 800 ? true : false;

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: latitude, lng: longitude},
    zoom: 18,
    scrollwheel: false,
    draggable: isDraggable
  });

  var market = new google.maps.Marker({
  	position: {lat: latitude, lng: longitude},
  	map: map,
  	title: pizzeria
  });
}