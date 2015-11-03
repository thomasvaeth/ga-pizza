var latitude = null;
var longitude = null;

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		console.log('Geolocation is not supported by this browser.');
	}
}

function showPosition(position) {
	console.log(position);
	document.getElementsByTagName('input')[0].value = position.coords.latitude;
	document.getElementsByTagName('input')[1].value = position.coords.longitude;
}

document.addEventListener('DOMContentLoaded', function() {
	getLocation();
});