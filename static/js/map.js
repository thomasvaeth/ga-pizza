var pizzeria = document.getElementsByTagName('input')[0].value;
var latitude = parseFloat(document.getElementsByTagName('input')[4].value);
var longitude = parseFloat(document.getElementsByTagName('input')[5].value);

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: latitude, lng: longitude},
    zoom: 18
  });

  var market = new google.maps.Marker({
  	position: {lat: latitude, lng: longitude},
  	map: map,
  	title: pizzeria
  });
}