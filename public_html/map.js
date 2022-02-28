/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global google */

var latlng = new google.maps.LatLng(-34.397, 150.644);

var typeId = google.maps.MapTypeId.ROADMAP;
var mapOptions =
        {
            center: latlng,
            zoom: 8,
            mapTypeId: typeId
        };
var map;
function initialize() {
    var mapDiv = document.getElementById('map');
    map = new google.maps.Map(mapDiv, mapOptions);
}
;
//
google.maps.event.addDomListener(window, 'load', initialize);




