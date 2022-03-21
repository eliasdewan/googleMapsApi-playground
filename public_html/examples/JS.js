/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// Prof. Paolo Remagnino 21 March 2022 @ Kingston University

var map;
var panorama;
var newDiv;
      
      function initialize() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 51.5118, lng: 0.1232},
          zoom: 13,
          streetViewControl: false
        });

      }
      
      
      google.maps.event.addDomListener(window, 'load', initialize);
 


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

  } 
 else 
    alert('Street View data not found for this location.');
   
}
      
        
// select origin and destination
var pp=new Array();
var kk=0;
var drawListener;
var pline;
function selPath()
{
  
    
    if (!drawListener)
    {
       drawListener = google.maps.event.addListener(map, 'click', function (e) {
      
           if(kk<2)
           {
                pp.push(e.latLng);
       
                var marker = new google.maps.Marker({
                    position: e.latLng,
                    map: map,
                    icon: "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_green.png"

                    });
                kk++;
           }
          
       });         
    }
    else {
        
        google.maps.event.removeListener(drawListener);
        pline = new google.maps.Polyline({
          path: pp,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2,
          map: map
        });
        
        // set up a marker half way between origin and destination
        var midpos= google.maps.geometry.spherical.interpolate(pp[0],pp[1],0.5); 
        
            
       var marker = new google.maps.Marker({
             position: midpos,
             // draggable: true,
             map: map,
             icon: "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_blue.png"

        });
                                            
        var infowindow = new google.maps.InfoWindow({
            content: '<div id="ndiv" style="width:200px;height:200px;"></div>' 
         });
                    
        marker.addListener('click', 
            function() {
            
              infowindow.open(map, marker);
              var sv = new google.maps.StreetViewService();
              sv.getPanorama({location: midpos, radius: 50}, processSVData);
            
        });
        }

}

