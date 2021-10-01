alert("hello");
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
    		response.json().then(function(data) {
      		//displayTrials(data.name)
			console.log(data);
			})
		}})
		.catch(err => {
			console.error(err);
		});
	});
};

// Use the user's current location to find trails
$("#coords").click(function() {
	navigator.geolocation.getCurrentPosition( geolocationCallback );  
//});
function geolocationCallback( position ){
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
	  response.json().then(function(data) {
		console.log(data);
	  })
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

function clickHandler(){
	alert("click")
}

setOnClick("startBTN", clickHandler);