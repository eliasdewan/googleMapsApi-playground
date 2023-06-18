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
}
;

function question1() {
    map.setZoom(5);

    var latitude = (Math.random() * 85 * 2 * 10000) / 10000 - 85; // -90 to 90 -- map limit is 85
    var longitude = (Math.random() * 180 * 2 * 10000) / 10000 - 180; // -180 to 90
    var firstPosition = new google.maps.LatLng(latitude, longitude);

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
        document.getElementById('perimeterColorOn').style.backgroundColor = 'red';
        console.log(document.getElementById('perimeterColorOn').style);
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

    google.maps.event.addListenerOnce(map, 'click', (location) => {
        map.panTo(location.latLng);
        map.setZoom(6.5);

        var spherical = google.maps.geometry.spherical;
        var square = new google.maps.Rectangle({
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            map,
            bounds: new google.maps.LatLngBounds(
                    spherical.computeOffset(location.latLng, Math.hypot(150000, 150000), 225),
                    spherical.computeOffset(location.latLng, Math.hypot(150000, 150000), 45)
                    )
        });

        function squareMarkers(location) {

            var smarker = new google.maps.Marker({position: location, map});

            var infoWindow = new google.maps.InfoWindow({position: location});
            const geocoder = new google.maps.Geocoder();

            google.maps.event.addListener(smarker, 'click', function () {
                geocoder.geocode({location: location}, function (results, status) {
                    if (status === 'OK') {
                        var contentHtml = '<h1>' + results[0].formatted_address + '</h1>';
                        var addressLength = results[0].address_components.length;

                        for (var ii = 1; addressLength > ii; ii++) {
                            contentHtml += '<h' + (addressLength - ii) + '>' + results[0].address_components[ii].long_name + '</h' + (addressLength - ii) + '>';
                        }

                        infoWindow.setContent(contentHtml);

                    } else {
                        console.log('Geocode was not successful for the following reason: ' + status);
                        infoWindow.setContent('no address found');
                    }
                });

                infoWindow.open(map);
            });
        }
        // for markers in four corners and middle
        squareMarkers(location.latLng);
        squareMarkers(square.getBounds().getNorthEast());
        squareMarkers(new google.maps.LatLng(square.getBounds().getNorthEast().lat(), square.getBounds().getSouthWest().lng()));
        squareMarkers(new google.maps.LatLng(square.getBounds().getSouthWest().lat(), square.getBounds().getNorthEast().lng()));
        squareMarkers(square.getBounds().getSouthWest());

        // For the random 3 markers
        var maxlat = square.getBounds().getNorthEast().lat() - square.getBounds().getSouthWest().lat();
        var maxlng = square.getBounds().getNorthEast().lng() - square.getBounds().getSouthWest().lng();
        for (var i = 0; i < 3; i++) {
            var loclng = location.latLng.lng() + (Math.random() * maxlng - maxlng / 2);
            var loclat = location.latLng.lat() + (Math.random() * maxlat - maxlat / 2);
            squareMarkers(new google.maps.LatLng(loclat, loclng));
        }
    });
}


function button5() {
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
        points.push(clicklocation.latLng);
        area.setOptions({paths: points});
        boundsofPolygon.extend(clicklocation.latLng);

        if (points.length >= 3) {
            //google.maps.event.removeListener(addPointAction); // comment out to stop adding more point with clicks
            var areaLat = boundsofPolygon.getNorthEast().lat() - boundsofPolygon.getSouthWest().lat();
            var areaLng = boundsofPolygon.getNorthEast().lng() - boundsofPolygon.getSouthWest().lng();

            console.log(areaLat + 'lat:lng' + areaLng);
            if (areaLng < 0) { // for overlapping
                areaLng += 360;
                console.log('overlapping');
            }
            var heatmapData = [];
            var hundredMarkers = [];

            google.maps.event.addListener(area, 'mouseover', () => {
                density.setMap(null); // 
                heatmapData = [];
                area.setOptions({strokeColor: "#FF0000", fillColor: "#00ff00"}); // poligon colours
                for (var i = 0; i <= 100; ) { //hundred markers
                    var currentPosition = {lat: boundsofPolygon.getCenter().lat() + (Math.random() * areaLat * 2) - areaLat, lng: boundsofPolygon.getCenter().lng() + (Math.random() * areaLng * 2) - areaLng};

                    if (google.maps.geometry.poly.containsLocation(currentPosition, area)) { // validating location inside the bounds
                        var singleMarker = new google.maps.Marker({position: currentPosition, map: map}); // marker
                        hundredMarkers.push(singleMarker); // adding for removing later
                        heatmapData.push(singleMarker.position); // adding the locations for the heat map
                        i++; // incrementing only when validated contains location
                    }
                }

                google.maps.event.addListener(area, 'mouseout', () => {
                    for (i = 0; i < hundredMarkers.length; i++) {
                        hundredMarkers[i].setMap(null); // removes the markers
                    }
                    area.setOptions({strokeColor: "#00ff00", fillColor: "#FF0000"}); // poligon colours
                    density.setOptions({data: heatmapData}); // the array of locations
                    density.setMap(map); // view the heatmap on the map
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
    var openWindow = null;
    var request;
    var micon = "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_blue@.png";
    new google.maps.event.addListener(map, 'click', (clickPoint) => {
        locations.push(clickPoint.latLng);

        var pointmarker = new google.maps.Marker({map: map, position: clickPoint.latLng, animation: google.maps.Animation.DROP, icon: micon});
        micon = "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_grey%23.png";

        google.maps.event.addListener(pointmarker, 'click', () => {
            (function () {
                if (openWindow !== null) {
                    openWindow.close();
                    openWindow = null;
                }
                var infoWindow = new google.maps.InfoWindow({content: '<div id="start' + locations.length + '" style="width:300px;height:300px;"></div>', position: clickPoint.latLng});
                var sv = new google.maps.StreetViewService();
                sv.getPanorama({location: clickPoint.latLng, radius: 50}, function (data, status) { // search radius
                    if (status === 'OK')
                    {
                        new google.maps.StreetViewPanorama(document.getElementById('start' + locations.length), {position: data.location.latLng});
                    } else {
                        alert('Street View data not found for this location.');
                    }
                });

                infoWindow.open(map);
                openWindow = infoWindow;
            }());
        });

        if (locations.length >= 2) {
            google.maps.event.clearListeners(map, 'click');
            request = {origin: locations[0], destination: locations[1], travelMode: 'DRIVING', provideRouteAlternatives: true};

            directionsService.route(request, function (result, status) {
                if (status === 'OK') {
                    for (var i = 0; result.routes.length > i; i++) {

                        new google.maps.DirectionsRenderer({map: map, directions: result, routeIndex: i, polylineOptions: {strokeWeight: 5, strokeColor: '#' + Math.floor(Math.random() * 16777215).toString(16)}});
                        for (var ii = 0; result.routes[i].legs[0].steps.length > ii; ii++) {
                            (function () {
                                var marker = new google.maps.Marker({map: map, position: result.routes[i].legs[0].steps[ii].start_location, animation: google.maps.Animation.DROP});
                                google.maps.event.addListener(marker, 'click',
                                        function () {
                                            if (openWindow !== null) {
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
                                                    // Next line for mooving the info window with the marker
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





