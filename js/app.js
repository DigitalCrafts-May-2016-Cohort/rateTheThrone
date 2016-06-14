var app = angular.module('rateThroneApp', []);

var map;
var infowindow;
var atlanta = {lat: 33.748995, lng: -84.387982};
var place;

app.factory('googleMaps', function() {
  return {
    newMap: function(city) {

      var element = document.getElementById('map');
      var mapOptions = {
        center: atlanta,
        zoom: 15
      };
      map = new google.maps.Map(element, mapOptions);
      return map;
    },
    addMarker: function(result, map) {
      infowindow = new google.maps.InfoWindow();

      var service = new google.maps.places.PlacesService(map);
      // service.textSearch(request, callback);
      service.nearbySearch({
        location: atlanta,
        radius: 850,
        types: ['bar', 'store', 'restaurant']
      }, callback);


      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            place = results[i];
            createMarker(results[i]);
          }
        }
        // console.log(results);
      }

      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });
        function linkData(placeId) {
          for (var i = 0; i < reviewData.length; i++) {
            if (placeId === reviewData[i].place_id) {
              console.log(reviewData[i]);
              return reviewData[i];
            }
          }
        }
        function ratingAverage(placeId) {
          debugger;
          var someLocation = linkData(place.place_id);
          var sum = 0;
          for (var i = 0; i < someLocation.review.length; i++) {
            sum += someLocation.review[i].rating;
          }
          console.log(sum / someLocation.review.length);
          return sum / someLocation.review.length;
        }
        google.maps.event.addListener(marker, 'click', function() {
          var windowContent =
          '<div class="content"><p>' + place.name + '<br>' +
          place.vicinity + '<br>average throne rating: ' + ratingAverage(linkData(place.place_id)) +
          ' stars<br><a href="#">rate this throne</a></p>' + '<p class="rating"><span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span></p>'+ '</div>';

          infowindow.setContent(windowContent);
          infowindow.open(map, this);
        });
      }

    }
  };
});



app.controller('MainController', function($scope, googleMaps) {
  var map = googleMaps.newMap(atlanta);
  googleMaps.addMarker(place, map);
  console.log(reviewData);
});
