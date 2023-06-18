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

    // Other codes to run after the map load
    greenMArkerInfoWindow();
    //getMessageLocation();
    circleMarker();
    doughnutMarker();
    //streetView(); // London now
    question1();
}
;


function circleMarker() {
    const cityCircle = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.25,
        map,
        center: latlng,
        radius: 50000
    });

}

function doughnutMarker() {
    var marker = new google.maps.Marker({
        position: {lat: -34.4, lng: 150.6},
        map: map,
        title: 'I am here',
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 15
        }
    });
}


function greenMArkerInfoWindow() {
    var markerGreen = new google.maps.Marker({
        position: {lat: -34.5, lng: 150.5},
        map: map,
        title: 'I am here Green',
        icon: ' http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                //can be pink, yellow or purple
    });
    var InfoWindow = new google.maps.InfoWindow({content: 'This is my green marker!'});
    // we can use full html divs and set their class and customise in html style tags,(the class)
    google.maps.event.addListener(markerGreen, 'click', function () {
        InfoWindow.open(map, markerGreen);
    });
}


function getMessageLocation() {
    // -- COPIED CODE FROM HERE
    let infoWindow = new google.maps.InfoWindow({
        content: "Click the map to get Lat/Lng!",
        position: latlng
    });

    infoWindow.open(map);

    // Configure the click listener.
    map.addListener("click", (mapsMouseEvent) => {
        // Close the current InfoWindow.
        infoWindow.close();

        // Create a new InfoWindow.
        infoWindow = new google.maps.InfoWindow({
            position: mapsMouseEvent.latLng
        });
        infoWindow.setContent(
                JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
                );
        infoWindow.open(map);
    });
}




// -- action and buttons code -- //
function london()
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
//Loacation pan to and marker
var randomCount = 1;
function random() { 
    var randomLocation = getRandomLocation();
    map.panTo(randomLocation);
    // map.setZoom(3);
    //alert(latitude+" "+longitude);
    // adding the marker
    var randomMarker = new google.maps.Marker({
        position: randomLocation,
        map,
        title: "Randmo marker " + randomCount

    });

    //Message
    var InfoWindow = new google.maps.InfoWindow({content: 'This is random marker n ' + randomCount + ' !'});
    // we can use full html divs and set their class and customise in html style tags,(the class)
    google.maps.event.addListener(randomMarker, 'click', function () {
        InfoWindow.open(map, randomMarker);
    });
    randomCount++;
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
    var lat = -34.397;
    var lng = 150.644;
    map.panTo({lat: lat, lng: lng});
    map.setZoom(6);
    var angle = 0;
    var radius = 1;

    var markerInterval = setInterval(function () {

        // console.log(angle + " " + Math.cos(Math.PI * 2 * angle/360) + " "  + Math.sin(Math.PI * 2 * angle/360));
        // BETTER METHOD
        var location = {lat: lat + Math.cos(Math.PI * 2 * angle / 360), lng: lng + Math.sin(Math.PI * 2 * angle / 360)};
        // var location = {lat: lat + Math.cos(angle) * radius, lng: lng + Math.sin(angle) * radius};
        new google.maps.Marker({position: location, map, title: "Randmo marker " + angle});
        // map.panTo(location);
        angle += 45;
        if (angle > 359) {
            clearInterval(markerInterval);
        }
        console.log(angle);
    }, 1000);
}

function randomMarker() {
    var orilat = -34.397;
    var orilng = 150.644;
    map.panTo({lat: orilat, lng: orilng});
    var angle = 0;
    var radius = 1;

    // angle - radius - orginal lat and length - delay and pan to original location
    //alert("workig" + angle);

    var markerInterval = setInterval(function () {
        if (angle > 359) {
            clearInterval(markerInterval);
        }
        // console.log(angle + " " + Math.cos(Math.PI * 2 * angle/360) + " "  + Math.sin(Math.PI * 2 * angle/360));
        // BETTER METHOD
        //var location = {lat: orilat + Math.cos(Math.PI * 2 * angle/360), lng: orilng + Math.sin(Math.PI * 2 * angle/360)};
        var location = {lat: orilat + Math.cos(angle) * radius, lng: orilng + Math.sin(angle) * radius};
        new google.maps.Marker({position: location, map, title: "Randmo marker " + angle});
        angle++;
    }, 5);
}

function rectangle() {
//alert("for showing message");
    var lat = -34.397;
    var lng = 150.644;
    //var position = {lat: lat, lng: lng};
    //map.panTo(position);
    map.panTo({lat: lat - 1, lng: lng});
    setTimeout(() => map.panTo({lat: lat - 1, lng: lng - 1}), 1000);
    setTimeout(() => map.panTo({lat: lat, lng: lng - 1}), 2000);
    setTimeout(() => map.panTo({lat: lat, lng: lng}), 3000);
}

//X = 5 + cos(5) * 5;
//Y = 5 + sin(5) * 5;

//X := originX + cos(angle)*radius;
//Y := originY + sin(angle)*radius;
//Math.PI * 2 * angle/360
//x = Math.cos(Math.PI * 2 * angle/360); and y = Math.sin(Math.PI * 2 * angle/360);

function processSVData(data, status) {

    if (status === 'OK')
    {


        panorama = new google.maps.StreetViewPanorama(document.getElementById('ndiv'));


        panorama.setPosition(data.location.latLng);
        panorama.setPov(({
            heading: 265,
            pitch: 0
        }));

        panorama.setVisible(true);

    } else
        alert('Street View data not found for this location.');

}

function streetView() {

    //var london = new google.maps.LatLng(51.51, -0.17);
    var london = {lat: 51.51, lng: -0.17};
    map.panTo(london);

    var marker = new google.maps.Marker({
        position: london,
        draggable: true,
        map: map,
        icon: "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_blue.png"
    });

    var infowindow = new google.maps.InfoWindow({
        content: '<div id="ndiv" style="width:200px;height:200px;"></div>'
    });

    //marker.addListener('click',
    marker.addListener('mouseup',
            function () {
                var markerLocation = {lat: marker.getPosition().lat(), lng: marker.getPosition().lng()};
                infowindow.open(map, marker);
                var sv = new google.maps.StreetViewService();
                sv.getPanorama({location: markerLocation, radius: 50}, processSVData);
            });
}

function setCoordinate() { // Prompt function to choose coordinate
    var lon = prompt('Longitude');
    var lat = prompt('Latitude');
    map.panTo(new google.maps.LatLng(lon, lat));
    map.setMapTypeId('terrain');
    document.getElementById('coordbutton').innerHTML = 'Change coordinate | ' + lon + ',' + lat;
}

function getRandomLocation(){
    var latitude = (Math.random() * 90 * 2 * 10000) / 10000 - 90; // -90 to 90
    var longitude = (Math.random() * 180 * 2 * 10000) / 10000 - 180; // -180 to 90
    var randomLocation = new google.maps.LatLng(latitude, longitude);
    return randomLocation;
}


function random100() {

    var local = new google.maps.LatLng(-34.397, 150.644);
    for (var i = 0; i < 1000; i++) {

        var latitude = (Math.random() * 2 * 2 * 100) / 100 - 2; // -90 to 90
        var longitude = (Math.random() * 2 * 2 * 100) / 100 - 2; // -180 to 90


        var circleRadius = 2; // Max radius
        // var circleRadius = Math.sqrt(2 * 2 + 2 * 2); // radius in x y location
        var currentCircle = Math.sqrt(latitude * latitude + longitude * longitude);

        console.log(circleRadius);
        console.log(currentCircle);

        if (currentCircle < circleRadius) {
            var reandomPosition = {lat: -34.397 + latitude, lng: 150.644 + longitude};
            new google.maps.Marker({
                position: reandomPosition,
                map: map,
                title: 'I am here Green',
                icon: ' http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                        //can be pink, yellow or purple
            });
        }

    }
}

function question1() {
    map.setZoom(4);
    var action = google.maps.event.addListener(map, 'click', function (e) {
        
        var firstPosition = e.latLng;
        map.panTo(firstPosition);
        var marker = new google.maps.Marker({
            position: e.latLng,
            map: map,
            icon: "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_green.png"
        });
        // console.log(e.latLng.lat());
        //console.log(e.latLng.lat() + 1);
        var north = new google.maps.Marker({
            position: {lat: e.latLng.lat() + 8.33, lng: e.latLng.lng()},
            map: map});
        var east = new google.maps.Marker({
            position: {lat: e.latLng.lat(), lng: e.latLng.lng() + 8.33},
            map: map});
        var south = new google.maps.Marker({
            position: {lat: e.latLng.lat() - 8.33, lng: e.latLng.lng()},
            map: map});
        var west = new google.maps.Marker({
            position: {lat: e.latLng.lat(), lng: e.latLng.lng() - 8.33},
            map: map});

        middleAction(north);
        middleAction(east);
        middleAction(south);
        middleAction(west);
        function middleAction(uniqueMarker) {
            google.maps.event.addListener(uniqueMarker, 'click', function (e) {
                console.log("Map location");
                map.panTo(uniqueMarker.position);
                var middleMarker = new google.maps.Marker({
                    position: google.maps.geometry.spherical.interpolate(firstPosition, uniqueMarker.position, 0.5),
                    map: map,
                    icon: "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_white+.png"});
                map.panTo(middleMarker.position);
                map.setZoom(6);
                google.maps.event.addListener(middleMarker, 'click', function () {
                    antipode(middleMarker.position);
                });
            });
        }
    });
    function antipode(location) {
        console.log('Clicked white original' + location);
        map.panTo(location);
        var antipodelat = location.lat() * -1;
        var antipodelng = location.lng() + 180;

        var antipodelocation = new google.maps.LatLng(antipodelat, antipodelng);
        console.log(antipodelocation.lat(), antipodelocation.lng());
        map.panTo(antipodelocation);
        var antinorth = new google.maps.Marker({position: {lat: antipodelocation.lat() + 5, lng: antipodelocation.lng()}, map: map});
        var antieast = new google.maps.Marker({position: {lat: antipodelocation.lat(), lng: antipodelocation.lng() + 5}, map: map});
        var antisouth = new google.maps.Marker({position: {lat: antipodelocation.lat() - 5, lng: antipodelocation.lng()}, map: map});
        var antiwest = new google.maps.Marker({position: {lat: antipodelocation.lat(), lng: antipodelocation.lng() - 5}, map: map});
        map.setZoom(4);

        var antifill = new google.maps.Polygon({
            paths: [new google.maps.LatLng(antinorth.position), new google.maps.LatLng(antieast.position), new google.maps.LatLng(antisouth.position), new google.maps.LatLng(antiwest.position)],
            strokeColor: "#FF0000",
            strokeOpacity: 0,
            strokeWeight: 2,
            fillOpacity: 0.1
        });
        antifill.setMap(map);

        document.getElementById('perimeterColorOn').addEventListener("click", () => {
            google.maps.event.addListener(antifill, 'mouseover', function () {
                console.log('Fill area hover');
                this.setOptions({strokeOpacity: 1});
            });
            google.maps.event.addListener(antifill, 'mouseout', function () {
                console.log('Fill area hover');
                this.setOptions({strokeOpacity: 0});
            });
        });

    }
}
// -- dom actuib listeber
google.maps.event.addDomListener(window, 'load', initialize);




