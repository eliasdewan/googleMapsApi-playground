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



// -- action and buttons code -- //
function lock0()
{
    var mapOptions = {
        // coordinates for hydepark
        center: new google.maps.LatLng(51.51, -0.17),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map"), mapOptions);

}

function africa() {
    map.panTo(new google.maps.LatLng(5, 20));
    map.setZoom(3);
}
function random() {
    var latitude = Math.floor(Math.random() * 90*2*10000)/10000-90; // -90 to 90
    var longitude = Math.floor(Math.random() * 180*2*10000)/10000-180; // -180 to 90
    map.panTo(new google.maps.LatLng(latitude, longitude));
   // map.setZoom(3);
    
   //alert(latitude+" "+longitude);
}



function toSatellite() {
    map.setMapTypeId('satellite');
}
function toRoadmap() {
    map.setMapTypeId('roadmap');
}
function toHybrid() {
    map.setMapTypeId('hybrid');
}
function toTerrain() {
    map.setMapTypeId('terrain');
}




function setCoordinate() {
    var lon = prompt('Longitude');
    var lat = prompt('Latitude');
    map.panTo(new google.maps.LatLng(lon, lat));
    map.setMapTypeId('terrain');
    document.getElementById('coordbutton').innerHTML = 'Change coordinate | '+ lon + ',' + lat;
}



// -- dom actuib listeber
google.maps.event.addDomListener(window, 'load', initialize);
google.maps.event.addDomListener(window, 'load', initialize);




