var app = angular.module('rateThroneApp', ['ui.bootstrap']);

var map;
var infowindow;
var atlanta = {lat: 33.748995, lng: -84.387982};
var place;

app.factory('modal', function($uibModal){
  return {
    openModal: function(placeID, size) {
      var modalInstance = $uibModal.open({
        // animation: $scope.animationsEnabled,
        templateUrl: 'myModalContent.html',
        controller: 'MainController',
        size: size,
        resolve: {
          items: function () {
            return;
          }
        }
      });
    }
  };
});

app.factory('googleMaps', function($uibModal, modal) {
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
    addMarker: function(result, map, $scope) {
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
          position: place.geometry.location,
          icon: 'bathroomsymbolsmall.png'
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
          var someLocation = linkData(place.place_id);
          var sum = 0;
          if (someLocation.review.length === 0) {
            return "No reviews yet!";
          }
          for (var i = 0; i < someLocation.review.length; i++) {
            sum += someLocation.review[i].rating;
          }
          console.log(sum / someLocation.review.length);
          return sum / someLocation.review.length + " stars";
        }
        // setTimeout(function() {
        //   $scope.blah = 'NOT HELLO';
        //   $scope.$apply();
        // }, 1000);
        google.maps.event.addListener(marker, 'click', function() {
          modal.openModal(place.place_id, 'lg');
          setTimeout(function() {
            $scope.blah = 'NOT HELLO';
            $scope.$apply();
            console.log('did apply');
          }, 1000);
          console.log('Was here');
          // $scope.averageRating = ratingAverage(linkData(place.place_id));
          // $scope.blah = 'NOT HELLO';
          // $scope.$apply();
          console.log($scope.averageRating);
          // $scope.modalData = ;
        });
      }

    }
  };
});



app.controller('MainController', function($scope, googleMaps, $uibModal, modal) {
  var map = googleMaps.newMap(atlanta);
  googleMaps.addMarker(place, map, $scope);
  console.log(reviewData);
  setTimeout(function() {
    $scope.blah = 'HELLO';
    $scope.$apply();
  }, 1000);

  $scope.open = function (size) {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'MainController',
      size: size,
      resolve: {
        items: function () {
          return $scope.place;
        }
      }
    });
  };
});
