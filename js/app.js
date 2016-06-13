

//put map up

var map;
var infowindow;

function initMap() {
     var atlanta = {lat: 33.748995, lng: -84.387982};
     var element = document.getElementById('map');
     var mapOptions = {
          center: atlanta,
          zoom: 15
     };
     map = new google.maps.Map(element, mapOptions);

     // var request = {
     //      location: atlanta,
     //      radius: 500,
     //      query: "gas_station"
     // };

     infowindow = new google.maps.InfoWindow();

     var service = new google.maps.places.PlacesService(map);
     // service.textSearch(request, callback);
     service.nearbySearch({
       location: atlanta,
       radius: 850,
       types: ['bar', 'store', 'restaurant']
     }, callback);


}

function callback(results, status) {
     if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
               var place = results[i];
               createMarker(results[i]);
          }
     }
     console.log(results);
}

function createMarker(place) {
     var placeLoc = place.geometry.location;
     var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
     });


     google.maps.event.addListener(marker, 'click', function() {
          var windowContent =
          '<div class="content"><p>' + place.name + '<br>' +
          place.formatted_address + '<br>throne rating: ' + 'rating' +
          '<br><a href="#">rate this throne</a></p>' + '<p class="rating"><span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span></p>'+ '</div>';

          infowindow.setContent(windowContent);
          infowindow.open(map, this);
     });

}
