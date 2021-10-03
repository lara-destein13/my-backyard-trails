var trailsContainerEl = document.querySelector('#trails-container');
var displayTrails = function(trails) {
	if (trails.length === 0) {
		trailsContainerEl.textContent = "No Trails Close By";
		return;
	}

	 console.log("trails", trails)
	for (var i=0; i < trails.length; i++) {
		var trailname = trails[i].name;
		var trailsEl = document.createElement('a');
		trailsEl.setAttribute("href", trails[i].url)
		trailsEl.textContent = trailname;
		trailsContainerEl.appendChild(trailsEl);
	};
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

// A simple utility function that finds a DOM element with id 'id', 
// and assigns the click handler function 'func'.
function setOnClick(id, func) {
    var element = document.getElementById(id);
    element.onclick = func;
}

async function submitButtonHandler() {
	var streetAddress = $('#address-text').val();
	var cityAndState = $('#address-text-2').val();
	var address = `${streetAddress} ${cityAndState}`
	// alert(address);
	
	var geocoder = new google.maps.Geocoder();
	var geocoderFunction = geocoder.geocode
	var request = {
		address: address
	}
	

	var response = await geocoderFunction(request);
	var result = response.results[0];
	var geometry = result.geometry;
	var location = geometry.location;
	var lat = location.lat();
	var lng = location.lng();
	alert(`lat: ${lat}, lng: ${lng}`)

	
	var trailapi = "https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=" + lat + "&lon=" + lng;
	var response = await fetch(trailapi, {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com",
			"x-rapidapi-key": "2d78d93295msh3f3b2883bfcb2f3p1482cejsna6723b0a74ea"
		}
	})

	response = await response.json();
	console.log(JSON.stringify(response, null, 4));
}

setOnClick("submitBtn", submitButtonHandler);