var map, marker;

if (typeof mapSettings === 'undefined') {
    // Default settings
    var mapSettings = {
    	lat: 23.211567732295762,
    	lng: -106.42154739286804,
    	zoom: 12,
    	showMarker: true,
    };
}

function initialize() {

    var mapOptions = {
        zoom: mapSettings.zoom,
        center: new google.maps.LatLng(mapSettings.lat, mapSettings.lng),
        mapTypeControl: true,
        disableDefaultUI: true
    };
   
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    marker = new google.maps.Marker({
        position: new google.maps.LatLng(mapSettings.lat, mapSettings.lng),
        map: map,
        draggable: true,
        visible: mapSettings.showMarker,
        title: "Some place",
    
    });

    google.maps.event.addListener(map, "click", function(event) {
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();
	        
        moveMarker(lat, lng);

        console.log('Coordinates: '+lat+', '+lng);
    });
    
	google.maps.event.addListener(map, "zoom_changed", function() {
	    zoomLevel = map.getZoom();
        updateText();
        
	    console.log('Zoom: '+zoomLevel);
        
	});


    google.maps.event.addListener(marker, "dragend", function(event) {

        var point = marker.getPosition();
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();

        //map.panTo(point);

        console.log('Coordinates: '+lat+', '+lng);
        updateText();
    });

    updateText();
    

}

function moveMarker(lat, lng){
    marker.setPosition(new google.maps.LatLng( lat, lng ));
    //map.panTo(marker.getPosition());
    marker.setVisible(true);

    updateText();
}

function updateText() {
    console.log('Update text');
    console.log(marker);
    document.getElementById('text').innerHTML = "<b>Lat:</b> "+marker.position.lat()+ 
        "<br><b> Lng:</b> "+marker.position.lng()+
        "<br><b> Zoom:</b> "+map.getZoom();
}

google.maps.event.addDomListener(window, 'load', initialize);