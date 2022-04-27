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
    //greenMArkerInfoWindow();
    //getMessageLocation();
    //circleMarker();
    // doughnutMarker();
    //streetView(); // London now
    //question1();
    //button3();
    //button4();
    //button5();
    // button7();
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
        position: {lat: -34.4, lng: 150.6}, map: map, title: 'I am here', icon: {path: google.maps.SymbolPath.CIRCLE, scale: 15}});
}


function greenMArkerInfoWindow() {
    var markerGreen = new google.maps.Marker({position: {lat: -34.5, lng: 150.5}, map: map, title: 'I am here Green', icon: ' http://maps.google.com/mapfiles/ms/icons/green-dot.png'});
    //can be pink, yellow or purple
    var InfoWindow = new google.maps.InfoWindow({content: 'This is my green marker!'});
    // we can use full html divs and set their class and customise in html style tags,(the class)
    google.maps.event.addListener(markerGreen, 'click', function () {
        InfoWindow.open(map, markerGreen);
    });
}


function getMessageLocation() {
    // -- COPIED CODE FROM HERE
    let infoWindow = new google.maps.InfoWindow({content: "Click the map to get Lat/Lng!", position: latlng});
    infoWindow.open(map);
    map.addListener("click", (mapsMouseEvent) => {// Configure the click listener.
        infoWindow.close();// Close the current InfoWindow.
        infoWindow = new google.maps.InfoWindow({position: mapsMouseEvent.latLng});// Create a new InfoWindow.
        infoWindow.setContent(JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2));
        infoWindow.open(map);
    });
}
// -- action and buttons code -- //
function london()
{
    var mapOptions = {center: new google.maps.LatLng(51.51, -0.17), zoom: 12, mapTypeId: google.maps.MapTypeId.ROADMAP};
    // coordinates for hydepark
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
    var randomMarker = new google.maps.Marker({position: randomLocation, map, title: "Randmo marker " + randomCount});
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

function circle() { // circle of marker place in interval 
    var lat = -34.397, lng = 150.644; // SETTING THE LAT LNG VALUES where to begin from
    map.panTo({lat: lat, lng: lng});
    map.setZoom(6);
    var angle = 0, radius = 2; //SETTING ANGLE AND RADIUS
    var markerInterval = setInterval(function () {
        //console.log(angle + " " + Math.cos(Math.PI * 2 * angle / 360) * radius + " " + Math.sin(Math.PI * 2 * angle / 360) * radius);
        // ALTERNATIVE METHOD - in random function this is uniform to angle
        var location = {lat: lat + Math.cos(Math.PI * 2 * angle / 360) * radius, lng: lng + Math.sin(Math.PI * 2 * angle / 360) * radius};
        new google.maps.Marker({position: location, map, title: "Randmo marker " + angle});
        // map.panTo(location);
        angle += 45;
        if (angle > 359) {
            clearInterval(markerInterval);
        }
        console.log(angle);
    }, 500);
}

function randomMarker() {// 
    var lat = -34.397;
    var lng = 150.644;
    map.panTo({lat: lat, lng: lng});
    var angle = 0;
    var radius = 1;
    // angle - radius - orginal lat and length - delay and pan to original location
    //alert("workig" + angle);

    var markerInterval = setInterval(function () {
        if (angle > 359) {
            clearInterval(markerInterval);
        }
        // console.log(angle + " " + Math.cos(Math.PI * 2 * angle/360) + " "  + Math.sin(Math.PI * 2 * angle/360));
        // BETTER METHOD in circle function - this is uniform to angle
        var location = {lat: lat + Math.cos(angle) * radius, lng: lng + Math.sin(angle) * radius};
        new google.maps.Marker({position: location, map, title: "Randmo marker " + angle});
        angle++;
    }, 5);
}

function random100() { // 1000 random markers in an area
    var local = new google.maps.LatLng(-34.397, 150.644); // start position
    for (var i = 0; i < 1000; i++) {
        var latitude = (Math.random() * 2 * 2 * 100) / 100 - 2; // random number from 2 to -2
        var longitude = (Math.random() * 2 * 2 * 100) / 100 - 2;
        var circleRadius = 2; // Max radius
        // var circleRadius = Math.sqrt(2 * 2 + 2 * 2); // radius in x y location
        var currentCircle = Math.sqrt(latitude * latitude + longitude * longitude);
        console.log(circleRadius);
        console.log(currentCircle);
        if (currentCircle < circleRadius) {
            var reandomPosition = {lat: local.lat() + latitude, lng: local.lng() + longitude};
            new google.maps.Marker({position: reandomPosition, map: map, title: 'I am here Green', icon: ' http://maps.google.com/mapfiles/ms/icons/green-dot.png'});//can be pink, yellow or purple
        }
    }
}



function rectangle() { // moves in a rectangular way
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

    marker.addListener('mouseup',
            function () {
                var markerLocation = marker.position;//{lat: marker.getPosition().lat(), lng: marker.getPosition().lng()};
                infowindow.open(map, marker);
                var sv = new google.maps.StreetViewService();
                sv.getPanorama({location: markerLocation, radius: 50}, function (data, status) { // search radius
                    if (status === 'OK')
                    {
                        panorama = new google.maps.StreetViewPanorama(document.getElementById('ndiv'), {position: data.location.latLng});
                    } else {
                        alert('Street View data not found for this location.');
                    }
                });
            });
}

function setCoordinate() { // Prompt function to choose coordinate
    var lon = prompt('Longitude');
    var lat = prompt('Latitude');
    map.panTo(new google.maps.LatLng(lon, lat));
    document.getElementById('coordbutton').innerHTML = 'Change coordinate | ' + lon + ',' + lat;
}

function getRandomLocation() {
    var latitude = (Math.random() * 85 * 2 * 10000) / 10000 - 85; // -90 to 90 -- map limit is 85
    var longitude = (Math.random() * 180 * 2 * 10000) / 10000 - 180; // -180 to 90
    var randomLocation = new google.maps.LatLng(latitude, longitude);
    return randomLocation;
}


function question1() {
    map.setZoom(5);
    var firstPosition = getRandomLocation();
    // var action = google.maps.event.addListener(map, 'click', function (e) {
    //var firstPosition = e.latLng;
    map.panTo(firstPosition);
    const spherical = google.maps.geometry.spherical;
    var marker = new google.maps.Marker({
        position: firstPosition,
        map: map,
        icon: "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_green.png"
    });
    google.maps.event.addListener(marker, 'click', function () {
        antipode(marker.position);
    });

    function addMarker(position, activeAction) {
        var cretedMarker = new google.maps.Marker({position: position, map: map});
        if (activeAction === true) {
            middleAction(cretedMarker);
        }
        return cretedMarker;
    }
    addMarker(spherical.computeOffset(firstPosition, 500000, 0), true);
    addMarker(spherical.computeOffset(firstPosition, 500000, 90), true);
    addMarker(spherical.computeOffset(firstPosition, 500000, 180), true);
    addMarker(spherical.computeOffset(firstPosition, 500000, 270), true);

    function middleAction(uniqueMarker) {
        google.maps.event.addListener(uniqueMarker, 'click', function () {
            var middleMarker = addMarker(spherical.interpolate(firstPosition, uniqueMarker.position, 0.5), false);
            map.panTo(middleMarker.position);
            middleMarker.setIcon("https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_white+.png");
            //google.maps.event.addListener(middleMarker, 'click', function () {antipode(middleMarker.position);}); // adds antipode transport for the marker
        });
    }

    function antipode(location) {
        console.log('Clicked original' + location);
        var antipodelat = location.lat() * -1; // The latitude of the point, with a change of sign: θa = −θ
        var antipodelng = location.lng() + 180; // Automatically over lapses when over 180

        var antipodelocation = new google.maps.LatLng(antipodelat, antipodelng);
        map.panTo(antipodelocation);
        var antinorth = addMarker(spherical.computeOffset(antipodelocation, 300000, 0), false);
        var antieast = addMarker(spherical.computeOffset(antipodelocation, 300000, 90), false);
        var antisouth = addMarker(spherical.computeOffset(antipodelocation, 300000, 180), false);
        var antiwest = addMarker(spherical.computeOffset(antipodelocation, 300000, 270), false);
        map.setZoom(6);

        var antifill = new google.maps.Polygon({
            paths: [antinorth.position, antieast.position, antisouth.position, antiwest.position],
            strokeColor: "#FF0000",
            strokeOpacity: 0,
            strokeWeight: 2,
            fillOpacity: 0.1
        });

        document.getElementById('perimeterColorOn').addEventListener("click", () => {
            antifill.setMap(map);// starts the fill

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

function button3() {
    var circle = new google.maps.Circle();
    const spherical = google.maps.geometry.spherical;
    google.maps.event.addListenerOnce(map, 'click', function (click) {
        var q2marker = new google.maps.Marker({position: click.latLng, map: map});


        var locationtouse = spherical.computeOffset(click.latLng, 200000, Math.random() * 360); // Location, Distance in km , Angle - random
        var rmarker = new google.maps.Marker({position: locationtouse, map: map});

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
        map.setZoom(8);

        google.maps.event.addListener(circle, 'click', () => {
            for (var i = 0; i <= 10; i++) {
                var color = '#' + Math.floor(Math.random() * 16777215).toString(16);
                var centerLocation = google.maps.geometry.spherical.computeOffset(circle.getCenter(), circle.getRadius(), Math.random() * 360);
                new google.maps.Circle({
                    strokeColor: color,
                    strokeOpacity: 9,
                    strokeWeight: 2,
                    fillColor: color,
                    fillOpacity: 0.8,
                    map,
                    radius: 10000,
                    center: centerLocation
                });
            }
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
        var spherical = google.maps.geometry.spherical;
        var square = new google.maps.Rectangle({
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            map,
            bounds: new google.maps.LatLngBounds(
                    spherical.computeOffset(location.latLng, Math.hypot(150000, 150000), 225, 6378137),
                    spherical.computeOffset(location.latLng, Math.hypot(150000, 150000), 45, 6378137)
                    )
        });


        console.log('spherical.computeOffset(location,150000,0)');
        //console.log(google.maps.LatLngBounds(location.latLng,Math.hypot(150000, 15000),45));
        console.log(google.maps.LatLngBounds(spherical.computeOffset(location.latLng, Math.hypot(150000, 15000), 45), spherical.computeOffset(location.latLng, Math.hypot(150000, 15000), 225)));
        console.log('up');
        console.log(spherical.computeOffset(location.latLng, 150000, 0).lng());
        // console.log(spherical.computeOffset(location.latLng, 150000, 0));
        console.log(square.getBounds().getNorthEast());
        console.log(square);

        function squareMarkers(location) {

            var smarker = new google.maps.Marker({position: location, map});

            var infoWindow = new google.maps.InfoWindow({position: location});
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({location: location}, function (results, status) {
                if (status === 'OK') {
                    infoWindow.setContent(results[0].formatted_address);
                } else {
                    console.log('Geocode was not successful for the following reason: ' + status);
                    infoWindow.setContent('no address found');
                }
                google.maps.event.addListener(smarker, 'click', function () {
                    infoWindow.open(map);
                });
            });
        }

        squareMarkers(location.latLng);
        squareMarkers(square.getBounds().getNorthEast());
        squareMarkers(new google.maps.LatLng(square.getBounds().getNorthEast().lat(), square.getBounds().getSouthWest().lng()));
        squareMarkers(new google.maps.LatLng(square.getBounds().getSouthWest().lat(), square.getBounds().getNorthEast().lng()));
        squareMarkers(square.getBounds().getSouthWest());


        var maxlat = square.getBounds().getNorthEast().lat() - square.getBounds().getSouthWest().lat();
        var maxlng = square.getBounds().getNorthEast().lng() - square.getBounds().getSouthWest().lng();
        for (var i = 0; i <= 3; i++) {
            var loclng = location.latLng.lng() + (Math.random() * maxlng - maxlng / 2);
            var loclat = location.latLng.lat() + (Math.random() * maxlat - maxlat / 2);
            squareMarkers(new google.maps.LatLng(loclat, loclng));
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
                        var singleMarker = new google.maps.Marker({position: currentPosition, map: map});
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

function button6() {
    if (map.overlayMapTypes.getLength() >= 1) {
        map.overlayMapTypes.clear();
    } else {
        var weatherLayer = new google.maps.ImageMapType({
            //maxZoom: 18,
            tileSize: new google.maps.Size(256, 256),
            getTileUrl: function (coord, zoom) {
                return 'https://tile.openweathermap.org/map/clouds_new/' + zoom + '/' + coord.x + '/' + coord.y + '.png?appid=0af3058a2bca33028fae5ed6dd50664c';
            }
        });
        map.overlayMapTypes.push(weatherLayer);
    }
}
function button7() {
    map.panTo({lat: 51.51, lng: -0.17});
    map.setZoom(15);
    var directionsService = new google.maps.DirectionsService();
    var locations = [];
    var request;

    new google.maps.event.addListener(map, 'click', (clickPoint) => {
        locations.push(clickPoint.latLng);
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({location: clickPoint.latLng}, function (results, status) {
            if (status === 'OK') {

                console.log(results[0].formatted_address);
                console.log(results[0]);
                console.log(results[0].plus_code);
                var infoWindow = new google.maps.InfoWindow({content: results[0].formatted_address, position: clickPoint.latLng});
                infoWindow.open(map);
            } else {
                console.log('Geocode was not successful for the following reason: ' + status);
                var infoWindow = new google.maps.InfoWindow({content: 'no address found', position: clickPoint.latLng});
                infoWindow.open(map);
            }
        });

        //new google.maps.Marker({position: clickPoint.latLng, map: map});
        console.log(clickPoint.latLng);
        console.log(clickPoint.latLng.toJSON());

        if (locations.length >= 2) {
            google.maps.event.clearListeners(map, 'click');
            request = {origin: locations[0], destination: locations[1], travelMode: 'DRIVING', provideRouteAlternatives: true};

            directionsService.route(request, function (result, status) {
                if (status === 'OK') {
                    console.log('passed ok state');
                    console.log(result.routes);
                    console.log(result.routes.length);

                    var openWindow = null;
                    for (var i = 0; result.routes.length > i; i++) {
                        console.log('in loop');
                        console.log('Printing leg now');
                        console.log(result.routes[i].legs[0].steps);
                        console.log(result.routes[i].legs[0].steps[0].instructions);
                        console.log(result.routes[i].legs[0].steps[0].start_location.toJSON());
                        console.log(result.routes[i].legs[0].steps[0].start_point.toJSON());
                        console.log(result.routes[i].legs[0].steps[0].end_location.toJSON());//same
                        console.log(result.routes[i].legs[0].steps[0].end_point.toJSON());
                        console.log(result.routes[i].legs[0].steps[1].start_location.toJSON());
                        console.log(result.routes[i].legs[0].steps[1].start_point.toJSON());

                        new google.maps.DirectionsRenderer({map: map, directions: result, routeIndex: i, polylineOptions: {strokeColor: '#' + Math.floor(Math.random() * 16777215).toString(16)}});
                        for (var ii = 0; result.routes[i].legs[0].steps.length > ii; ii++) {
                            (function () {
                                var marker = new google.maps.Marker({map: map, position: result.routes[i].legs[0].steps[ii].start_location, animation: google.maps.Animation.DROP});
                                google.maps.event.addListener(marker, 'click',
                                        function () {
                                            if (openWindow !== null) {
                                                console.log(openWindow);
                                                openWindow.close();
                                                openWindow = null;
                                            }

                                            var infowindow = new google.maps.InfoWindow({content: '<div id="ndiv' + ii + '" style="width:300px;height:300px;"></div>'});
                                            infowindow.open(map, marker);
                                            openWindow = infowindow;
                                            var sv = new google.maps.StreetViewService();
                                            sv.getPanorama({location: marker.position, radius: 50}, function (data, status) { // search radius
                                                if (status === 'OK')
                                                {
                                                    panorama = new google.maps.StreetViewPanorama(document.getElementById('ndiv' + ii), {position: data.location.latLng});
                                                    //console.log(panorama.getPosition().toJSON()); // Next line for mooving the info window with the marker
                                                    google.maps.event.addListener(panorama, 'position_changed', () => infowindow.setPosition(panorama.getPosition()));
                                                } else {
                                                    alert('Street View data not found for this location.');
                                                }
                                            });
                                        });
                            })();
                        }
                    }
                }
            });
        }
        ;
    });
}

// -- dom actuib listeber
//google.maps.event.addDomListener(window, 'load', initialize);
window.addEventListener('load', initialize);





