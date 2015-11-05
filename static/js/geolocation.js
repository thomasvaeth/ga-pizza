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
	document.getElementsByTagName('input')[1].value = position.coords.latitude;
	document.getElementsByTagName('input')[2].value = position.coords.longitude;
}

document.addEventListener('DOMContentLoaded', function() {
	getLocation();
	if (document.getElementsByTagName('input')[1].value = null && document.getElementsByTagName('input')[1].value = null) {
		document.getElementsByClassName('geolocation')[0].setAttribute('disabled', 'disabled');
	}
});