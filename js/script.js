let lat = -68
let lon = 36
var trailapi = "https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=" + lat + "&lon=" + lon

fetch(trailapi, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com",
		"x-rapidapi-key": "2d78d93295msh3f3b2883bfcb2f3p1482cejsna6723b0a74ea"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});






