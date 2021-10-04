// A simple utility function that finds a DOM element with id 'id', 
// and assigns the click handler function 'func'.
function setOnClick(startBTN, func) {
    var element = document.getElementById(startBTN);
    element.onclick = func;
}

// A simple utility function that finds a DOM element with id 'id', 
// and sets its innerHTML to the value in 'value';
function setInnerHTML(id, value) {
    var element = document.getElementById(id);
    element.innerHTML = value;
}

function clickHandler(){
	window.location.href = 'data.html';
}
setOnClick("startBTN", clickHandler);

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
				<td class="trail-data-right"><a href="URL">Click Here</a></td>
			</tr>	
		</tbody>
	</table>
</div>
`;

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
	// alert(`lat: ${lat}, lng: ${lng}`)

	
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
	var html = '';
	for (var i = 0; i < data.length; i++) {
		var trail = data[i];
		var div = template;
		div = div.replace('NAME', trail.name);
		div = div.replace('CITY', trail.city);
		div = div.replace('REGION', trail.region);
		div = div.replace('URL', trail.url);
		html = html + div;
	}
	// alert(html);

	setInnerHTML("trails-container", html);


	 console.log(JSON.stringify(response, null, 4));
}

setOnClick("submitBtn", submitButtonHandler);