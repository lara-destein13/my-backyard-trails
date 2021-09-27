



$("#coords").click(function() {
	navigator.geolocation.getCurrentPosition( geolocationCallback );  
});

function geolocationCallback( position ){
  var lat = position.coords.latitude;
  var long = position.coords.longitude;

let trailapi = "https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=" + lat + "&lon=" + long;
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





