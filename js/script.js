var lat = 0
var lng = 0
var geocoder;
var map;
var trailsContainerEl = document.querySelector('#trails-container');

var displayTrails = function(trails) {
	if (trails.length === 0) {
		trailsContainerEl.textContent = "No Trails Close By";
		return;
	};
	
	for (var i=0; i < trails.length; i++) {
		var trailname = trails[i].name;
		var trailnameEl = document.createElement('p');
		trailnameEl.textContent = trailname
		trailsContainerEl.appendChild(trailnameEl);

		var trailsiteEl = document.createElement('a');
		trailsiteEl.setAttribute("href", trails[i].url);
		trailsiteEl.textContent = "Visit Website";
		trailsContainerEl.appendChild(trailsiteEl);

		var mapEl = document.createElement("button");
		mapEl.textContent = "View on Map";
		mapEl.setAttribute("id", trails[i].lat+','+trails[i].lon);
		mapEl.onclick = function() { pinMap() };
		trailsContainerEl.appendChild(mapEl);
		
	};
};

function pinMap() {
console.log("yay");
};
// Use entered address to find trails
function getAddress() {
	var address = $('#address').val();
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({ address: address }, (results, status) => {
    	if (status === "OK") {
			var lat = results[0].geometry.location.lat();
			var lng = results[0].geometry.location.lng();
    	} 
		else {
        	alert("Geocode error: " + status);
    	}	
		var trailapi = "https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=" + lat + "&lon=" + lng;
		fetch(trailapi, {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com",
				"x-rapidapi-key": "2d78d93295msh3f3b2883bfcb2f3p1482cejsna6723b0a74ea"
			}
		})
		.then(function(response) {
			if (response.ok) {
    			response.json().then(function(fetchedData) {
				displayTrails(fetchedData.data);
				})
			}
			else {
				alert("we gots a problem");
			}
		})
		.catch(err => {
			console.error(err);
		});
	});
};

// Use the user's current location to find trails
$("#coords").click(function() {
	navigator.geolocation.getCurrentPosition(geolocationCallback);  

	function geolocationCallback(position){
	let lat = position.coords.latitude;
	let lng = position.coords.longitude;
	let trailapi = "https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=" + lat + "&lon=" + lng;
	fetch(trailapi, {
		"method": "GET",
		"headers": {
		"x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com",
		"x-rapidapi-key": "2d78d93295msh3f3b2883bfcb2f3p1482cejsna6723b0a74ea"
		}
	})
	.then(function(response) {
			if (response.ok) {
				response.json().then(function(fetchedData) {
				
				displayTrails(fetchedData.data);
				})
			}
			else {
				alert("we gots a problem")
			}
		})
	.catch(err => {
		console.error(err);
		});
	}
});

