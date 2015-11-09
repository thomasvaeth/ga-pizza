var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var isDraggable = width > 800 ? true : false;

function initMap() {
  var map = new google.maps.Map(document.getElementById('profile-map'), {
    center: {lat: 47.613962504402, lng: -122.31890001031},
    zoom: 11,
    scrollwheel: false,
    draggable: isDraggable
  });
}