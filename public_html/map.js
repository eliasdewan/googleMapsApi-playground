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
    //circleMarker();
    // doughnutMarker();
    //streetView(); // London now
    //question1();
    //question2();
    // button4();
    button5();
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

function getRandomLocation() {
    var latitude = (Math.random() * 90 * 2 * 10000) / 10000 - 90; // -90 to 90
    var longitude = (Math.random() * 180 * 2 * 10000) / 10000 - 180; // -180 to 90
    var randomLocation = new google.maps.LatLng(latitude, longitude);
    return randomLocation;
}


function random100() {

    var local = new google.maps.LatLng(-34.397, 150.644);
    for (var i = 0; i < 1000; i++) {

        var latitude = (Math.random() * 2 * 2 * 100) / 100 - 2; // random number from 2 to -2
        var longitude = (Math.random() * 2 * 2 * 100) / 100 - 2;


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
    var firstPosition = getRandomLocation();
    // var action = google.maps.event.addListener(map, 'click', function (e) {
    //var firstPosition = e.latLng;
    map.panTo(firstPosition);
    var marker = new google.maps.Marker({
        position: firstPosition,
        map: map,
        icon: "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_green.png"
    });
    google.maps.event.addListener(marker, 'click', function () {
        antipode(marker.position);
    });
    // console.log(e.latLng.lat());
    //console.log(e.latLng.lat() + 1);
    var north = new google.maps.Marker({
        position: {lat: firstPosition.lat() + 8.33, lng: firstPosition.lng()},
        map: map});
    var east = new google.maps.Marker({
        position: {lat: firstPosition.lat(), lng: firstPosition.lng() + 8.33},
        map: map});
    var south = new google.maps.Marker({
        position: {lat: firstPosition.lat() - 8.33, lng: firstPosition.lng()},
        map: map});
    var west = new google.maps.Marker({
        position: {lat: firstPosition.lat(), lng: firstPosition.lng() - 8.33},
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
    // });
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

function question2() {
    var circle = new google.maps.Circle();
    google.maps.event.addListenerOnce(map, 'click', function (e) {
        console.log(e.latLng);
        var q2marker = new google.maps.Marker({
            position: e.latLng, //new google.maps.LatLng(-34, 150), //choosen position from the user
            map: map
        });
        map.panTo(q2marker.position);
        google.maps.event.addListenerOnce(q2marker, 'click', function () {
            var angle = Math.random() * 360;
            var radius = 10 / 3;
            var x = radius * Math.sin(Math.PI * 2 * angle / 360);
            var y = radius * Math.cos(Math.PI * 2 * angle / 360);
            map.setZoom(7);

            rmarker = new google.maps.Marker({
                position: {lat: q2marker.position.lat() + y, lng: q2marker.position.lng() + x}, //choosen position from the user
                map: map
            });

            var distance = google.maps.geometry.spherical.computeDistanceBetween(q2marker.position, rmarker.position);
            var middlePoint = google.maps.geometry.spherical.interpolate(q2marker.position, rmarker.position, 0.5);
            circle.setOptions({
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#FF0000",
                fillOpacity: 0.25,
                map,
                center: middlePoint,
                radius: distance / 2});
            map.panTo(circle.getCenter());

            google.maps.event.addDomListener(circle, 'click', () => {
                for (var i = 0; i <= 10; i++) {
                    var color = '#' + Math.floor(Math.random() * 16777215).toString(16);
                    //console.log(color);
                    // var angle = Math.random() * 360;  
                    // var location = google.maps.geometry.spherical.computeOffset(circle.getCenter(),circle.getRadius(),angle);                        
                    new google.maps.Circle({
                        strokeColor: color,
                        strokeOpacity: 9,
                        strokeWeight: 2,
                        fillColor: color,
                        fillOpacity: 0.8,
                        map,
                        radius: 10000,
                        center: google.maps.geometry.spherical.computeOffset(circle.getCenter(), circle.getRadius(), Math.random() * 360)
                    });
                }
            });
        });
    });
}
//69 miles (111 kilometers)
function button4() {
    console.log('button 4');
    google.maps.event.addListenerOnce(map, 'click', (location) => {
        map.panTo(location.latLng);
        map.setZoom(6.5);
        console.log('button 4 inside click');
        var square = new google.maps.Rectangle({
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            map,
            bounds: {
                north: location.latLng.lat() + 300 / 111,
                south: location.latLng.lat() - 300 / 111,
                east: location.latLng.lng() + 300 / 111,
                west: location.latLng.lng() - 300 / 111
            }
        });
        console.log(square.getBounds().getNorthEast());

        squareMarkers(square.getBounds().getNorthEast());
        squareMarkers(new google.maps.LatLng(square.getBounds().getNorthEast().lat(), square.getBounds().getSouthWest().lng()));
        squareMarkers(new google.maps.LatLng(square.getBounds().getSouthWest().lat(), square.getBounds().getNorthEast().lng()));
        squareMarkers(square.getBounds().getSouthWest());


        // new google.maps.PlusCode.Builder.getGlobalCode(square.getBounds().getNorthEast());
        //new google.maps.places.PlacePlusCode.getGlobalCode(square.getBounds().getNorthEast());

        function squareMarkers(location) {
            var Http = new XMLHttpRequest();
            var plus = 'https://plus.codes/api?address=' + location.lat() + ',' + location.lng();
            Http.open("GET", plus, false);
            Http.send();
            var webreturn = JSON.parse(Http.responseText);
            // console.log((webreturn.plus_code.global_code));

            var smarker = new google.maps.Marker({
                position: location,
                map,
                title: "Square marker "}
            );
            var InfoWindow = new google.maps.InfoWindow({content: webreturn.plus_code.global_code});
            google.maps.event.addListener(smarker, 'click', function () {
                InfoWindow.open(map, this);
            });
        }
    });
}


function button5() {
    console.log('button 5');
    google.maps.event.clearListeners(map, 'click');
    var area = new google.maps.Polygon({
        strokeColor: "#00ff00",
        strokeOpacity: 0.8,
        strokeWeight: 5,
        fillColor: "#FF0000",
        fillOpacity: 0.35
    });
    var points = [];
    var density = new google.maps.visualization.HeatmapLayer();
    var boundsofPolygon = new google.maps.LatLngBounds();
    var addPointAction = google.maps.event.addListener(map, 'click', (clicklocation) => {
        points.push(clicklocation.latLng.toJSON());
        area.setOptions({paths: points});
        boundsofPolygon.extend(clicklocation.latLng);
        var areaLat = boundsofPolygon.getNorthEast().lat() - boundsofPolygon.getSouthWest().lat();
        var areaLng = boundsofPolygon.getNorthEast().lng() - boundsofPolygon.getSouthWest().lng();
        if (areaLng < 0) {
            areaLng += 360;
        }

        console.log(areaLng + ' and ' + areaLat);
        if (points.length >= 4) {
            google.maps.event.removeListener(addPointAction);
            var heatmapData = [];
            var hundredMarkers = [];

            google.maps.event.addListener(area, 'mouseover', () => {
                density.setMap(null);
                heatmapData = [];
                area.setOptions({strokeColor: "#FF0000", fillColor: "#00ff00"});
                for (var i = 0; i <= 100; ) {
                    var currentPosition = {lat: boundsofPolygon.getCenter().lat() + (Math.random() * areaLng * 2) - areaLng, lng: boundsofPolygon.getCenter().lng() + (Math.random() * areaLat * 2) - areaLat};
                    if (google.maps.geometry.poly.containsLocation(currentPosition, area)) {
                        var singleMarker = new google.maps.Marker({
                            position: currentPosition,
                            map: map
                        });
                        hundredMarkers.push(singleMarker);
                        heatmapData.push(singleMarker.position);
                        i++;
                    }
                }
                google.maps.event.addListener(area, 'mouseout', () => {
                    for (i = 0; i < hundredMarkers.length; i++) {
                        hundredMarkers[i].setMap(null);
                    }
                    area.setOptions({strokeColor: "#00ff00", fillColor: "#FF0000"});
                    // var density = new google.maps.visualization.HeatmapLayer();
                    density.setOptions({data: heatmapData});
                    density.setMap(map);
                });
            });
        }
    });
    area.setMap(map);
}
// -- dom actuib listeber
google.maps.event.addDomListener(window, 'load', initialize);




