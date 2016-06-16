var app = angular.module('rateThroneApp', ['ui.bootstrap']);

var map;
var infowindow;
var atlanta = {lat: 33.8486730, lng: -84.3733130};
var place;

app.controller('ModalController', function($scope, place, $uibModalInstance) {
  $scope.place = place;
  $scope.location = linkData(place.place_id);
  $scope.averageRating = ratingAverage(linkData(place.place_id));
  $scope.modalReviewData = $scope.location.review;
  $scope.publicOrNot = $scope.location.public;

  $scope.addNewReview = function(author, rating, comment) {
    $scope.newReview = {
      "author": author,
      "rating": rating,
      "comment": comment
    };
    $scope.modalReviewData.push($scope.newReview);
    document.reviewForm.reset();
    document.getElementById('submit-review').style.visibility='hidden';
  };

  function linkData(placeId) {
    for (var i = 0; i < reviewData.length; i++) {
      if (placeId === reviewData[i].place_id) {
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
    var avg = Math.ceil(sum / someLocation.review.length);
    console.log ("the avg is:" + avg);
    if (avg === 5) {
      return "★★★★★";
    } else if (avg === 4) {
      return "★★★★☆";
    } else if (avg === 3) {
      return "★★★☆☆";
    } else if (avg === 2) {
      return "★★☆☆☆";
    } else if (avg === 1) {
      return "★☆☆☆☆";
    } else {
      return "I need a Rating!";
    }
  }

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

});

app.factory('modal', function($uibModal){
  return {
    openModal: function(place, size) {
      var modalInstance = $uibModal.open({
        // animation: $scope.animationsEnabled,
        templateUrl: 'myModalContent.html',
        controller: 'ModalController',
        size: size,
        resolve: {
          place: function () {
            return place;
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
        zoom: 17,
        styles: [
          {
            "featureType": "landscape",
            "stylers": [
              {
                "hue": "#FFBB00"
              },
              {
                "saturation": 43.400000000000006
              },
              {
                "lightness": 37.599999999999994
              },
              {
                "gamma": 1
              }
            ]
          },
          {
            "featureType": "road.highway",
            "stylers": [
              {
                "hue": "#FFC200"
              },
              {
                "saturation": -61.8
              },
              {
                "lightness": 45.599999999999994
              },
              {
                "gamma": 1
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "stylers": [
              {
                "hue": "#FF0300"
              },
              {
                "saturation": -100
              },
              {
                "lightness": 51.19999999999999
              },
              {
                "gamma": 1
              }
            ]
          },
          {
            "featureType": "road.local",
            "stylers": [
              {
                "hue": "#FF0300"
              },
              {
                "saturation": -100
              },
              {
                "lightness": 52
              },
              {
                "gamma": 1
              }
            ]
          },
          {
            "featureType": "water",
            "stylers": [
              {
                "hue": "#0078FF"
              },
              {
                "saturation": -13.200000000000003
              },
              {
                "lightness": 2.4000000000000057
              },
              {
                "gamma": 1
              }
            ]
          },
          {
            "featureType": "poi",
            "stylers": [
              {
                "hue": "#00FF6A"
              },
              {
                "saturation": -1.0989010989011234
              },
              {
                "lightness": 11.200000000000017
              },
              {
                "gamma": 1
              }
            ]
          }
        ]
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
      }

      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var theIcon = 'bathroomsymbolsmall.png';
        var theRating = ratingAverage(place.place_id);
        var publicRestroom = linkData(place.place_id).public;

        if (publicRestroom === false) {
          theIcon = 'images/noGo.png';
        } else {
          if (theRating >= 2 && theRating < 4) {
            theIcon = 'images/orange.png';
          } else if (theRating >= 4) {
            theIcon = 'images/green.png';
          } else if (theRating < 2) {
            theIcon = 'images/red.png';
          }}


          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            icon: theIcon
            // 'bathroomsymbolsmall.png'
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
            return sum / someLocation.review.length;
          }
          // setTimeout(function() {
          //   $scope.blah = 'NOT HELLO';
          //   $scope.$apply();
          // }, 1000);
          google.maps.event.addListener(marker, 'click', function() {
            modal.openModal(place, 'lg');
          });
        }

      }
    };
  });



  app.controller('MainController', function($scope, googleMaps, $uibModal, modal) {
    var map = googleMaps.newMap(atlanta);
    googleMaps.addMarker(place, map, $scope);
  });
