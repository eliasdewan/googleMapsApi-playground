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
            mapTypeId: typeId,
            disableDefaultUI: true,
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.TOP,
                mapTypeIds: [
                    google.maps.MapTypeId.ROADMAP,
                    google.maps.MapTypeId.HYBRID,
                    google.maps.MapTypeId.SATELLITE,
                    google.maps.MapTypeId.TERRAIN
                ]
            }
        };
var map; // Main map variable
function initialize() {
    var mapDiv = document.getElementById('map');
    map = new google.maps.Map(mapDiv, mapOptions);

    const cityCircle = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map,
        center: latlng,
        radius: 5000,
    });
    var marker = new google.maps.Marker({
        position: {lat: -34.4, lng: 150.6},
        map: map,
        title: 'I am here',
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 15
        }
    });


    var markerGreen = new google.maps.Marker({
        position: {lat: -34.5, lng: 150.5},
        map: map,
        title: 'I am here Green',
        icon: ' http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                //can be pink, yellow or purple
    });
    var InfoWindow = new google.maps.InfoWindow({content: 'This is my green marker!'});
    // we can use full html divs and set their class and customise in html style tags,(the class)
    google.maps.event.addListener(markerGreen,'click', function(){InfoWindow.open(map,markerGreen)});
    
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
    var latitude = Math.floor(Math.random() * 90 * 2 * 10000) / 10000 - 90; // -90 to 90
    var longitude = Math.floor(Math.random() * 180 * 2 * 10000) / 10000 - 180; // -180 to 90
    map.panTo(new google.maps.LatLng(latitude, longitude));
    // map.setZoom(3);

    //alert(latitude+" "+longitude);
    
    // adding the marker
    new google.maps.Marker({
    position: ma,
    map,
    title: "Hello World!"
  });
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
function zoomIn() {
    map.setZoom(map.getZoom() + 1);
}
function zoomOut() {
    map.setZoom(map.getZoom() - 1);
}

function circle() {
    map.panTo(map.get);
}
function rectangle() {
    map.panTo();
}




function setCoordinate() {
    var lon = prompt('Longitude');
    var lat = prompt('Latitude');
    map.panTo(new google.maps.LatLng(lon, lat));
    map.setMapTypeId('terrain');
    document.getElementById('coordbutton').innerHTML = 'Change coordinate | ' + lon + ',' + lat;
}



// -- dom actuib listeber
google.maps.event.addDomListener(window, 'load', initialize);




