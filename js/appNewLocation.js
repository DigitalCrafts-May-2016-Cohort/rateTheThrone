var app = angular.module('rateThroneApp', []);

var map;
var infowindow;
var atlanta = {lat: 33.8486730, lng: -84.3733130};
var place;


app.factory('googleMaps', function() {
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
          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            // 'bathroomsymbolsmall.png'
          });
          console.log(place.name + "  //  " + place.place_id + "  //  " + place.vicinity + "  //  " + place.types[0] + "  //  " + place.types[1] + "  //  " + place.types[2])

          google.maps.event.addListener(marker, 'click', function() {
            modal.openModal(place, 'lg');
          });
        }

      }
    };
  });



  app.controller('MainController', function($scope, googleMaps) {
    var map = googleMaps.newMap(atlanta);
    googleMaps.addMarker(place, map, $scope);
  });
