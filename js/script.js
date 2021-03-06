var lat = 0
var lng = 0
var geocoder;
let map;

var trailsContainerEl = document.querySelector('#trails-container');

var template = `
<div class="trail-div">
	<table class="trail-table">
		<tbody>
			<tr class="trail-row">
				<td class="trail-data-left"> Name</td>
				<td class="trail-data-right">NAME</td>
			</tr>
			<tr class="trail-row">
				<td class="trail-data-left">City</td>
				<td class="trail-data-right">CITY</td>
			</tr>
			<tr class="trail-row">
				<td class="trail-data-left">Region</td>
				<td class="trail-data-right">REGION</td>	
			</tr>	
			<tr class="trail-row">
				<td class="trail-data-left">url</td>
				<td class="trail-data-right"><a href="URL" target="_blank">Click Here</a></td>
			</tr>
                        <tr class="trail-row">
				<td class="trail-data-left">map</td>
				<td class="trail-data-right"><a href="https://www.google.com/maps/search/?api=1&query=LAT%2CLON" target="_blank">map</a></td>
			</tr>
		</tbody>
	</table>
</div>
`;

function displayTrails(trails) {
  var html = '';
  for (var i = 0; i < trails.length; i += 1) {
    var trail = trails[i];
    var div = template;
    div = div.replace('NAME', trail.name);
    div = div.replace('CITY', trail.city);
    div = div.replace('REGION', trail.region);
    div = div.replace('URL', trail.url);
    div = div.replace('LAT', trail.lat);
    div = div.replace('LON', trail.lon);
    html += div;
    var element = document.getElementById('trails-container');
    element.innerHTML = html;
  }
}

var oldDisplayTrails = function(trails) {
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
		mapEl.setAttribute("class","map-button")
		trailsContainerEl.appendChild(mapEl);
	};

	var buttons = document.querySelectorAll('button');
	for (var i=0; i<buttons.length; ++i) {
  		buttons[i].addEventListener('click', clickFunc);
	}
	function clickFunc() {
  		coordinates = this.id;
		const latlngstr = coordinates.split(',', 2);
		const latlng = {
			lat: parseFloat(latlngstr[0]),
			lng: parseFloat(latlngstr[1]),
		};
		console.log(latlng);
		const map = new google.maps.Map(document.getElementById("map"), {
			zoom: 12,
			center: latlng,
			

		  });
		var geocoder = new google.maps.Geocoder();
		const infowindow = new google.maps.InfoWindow();
		geocoder.geocode({ location: latlng })
    	.then((response) => {
      	if (response.results[0]) {
        const marker = new google.maps.Marker({
          position: latlng,
          map: map,
		  zoom: 12,
        });

        infowindow.setContent(response.results[0].formatted_address);
        infowindow.open(map, marker);
      } else {
        window.alert("No results found");
      }
    })
    .catch((e) => window.alert("Geocoder failed due to: " + e));
		
}
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

	
	var trailapi = "https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=" + lat + "&lon=" + lng;
	var response = await fetch(trailapi, {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com",
			"x-rapidapi-key": "2d78d93295msh3f3b2883bfcb2f3p1482cejsna6723b0a74ea"
		}
	})

	response = await response.json();
	var data = response.data;
	displayTrails(data);
}









function heartButtonClicked() {
	window.location.href = "module.html";
}

var element = document.getElementById("heartBTN");
if (element) {
	element.onclick = heartButtonClicked;
}

var element = document.getElementById("searchBtn");
if (element) {
	element.onclick = submitButtonHandler;
}



// element = document.getElementById("heartBTN");
// if (element) {
// 	element.onclick = heartButtonClicked;
// }











// // A simple utility function that finds a DOM element with id 'id', 
// // and assigns the click handler function 'func'.
// function setOnClick(id, func) {
//     var element = document.getElementById(id);
//     element.onclick = func;
// }

// setOnClick("searchBtn", submitButtonHandler);
