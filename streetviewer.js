(function($){
	"use strict";
	
	function StreetViewer(){
		this.mapID = "map";
		this.map = null;
		this.streetView = null;
		this.streetViewService = null;
		this.directionsService = null;
		
		
		this.pitch = 10;
	};
	
	StreetViewer.prototype.init = function(){
		this.streetViewService = new google.maps.StreetViewService();
		this.directionsService = new google.maps.DirectionsService();
		
		
		//this.map = new google.maps.Map(document.getElementById(this.mapID), mapOptions);
		//this.streetView = this.map.getStreetView();
		//this.streetView.setOptions(streetViewOptions);		
	};
	
	StreetViewer.prototype.handleDirections = function( direction ){
		console.log("Direcitons", directions);
	};
	
	StreetViewer.prototype.getDirections = function(origin, destination){
		var request = {
			origin: origin,
			destination: destination,
			travelMode: google.maps.TravelMode.DRIVING
		}
	
		this.directionService.route(request, function(response, status){
			if (status == google.maps.DirectionsStatus.OK){
				self.handleDirections(repsonse);
			}
			
		});
	};
	
	StreetViewer.prototype.orient = function(){
		var links = this.streetView.getLinks();
		this.streetView.setPov({
			heading: links[0].heading,
			pitch: this.pitch
		});
	};
	
	
	StreetViewer.prototype.move = function(){
		var target = this.getNextLink();
		
		this.streetView.setPano(target.pano);
		this.streetView.setPov({
			heading: target.heading,
			pitch: this.pitch
		});
	};
	
	
	StreetViewer.prototype.getNextLink = function(){
		var links = this.streetView.getLinks(),
			currentHeading = this.streetView.getPov().heading,
			closestHeading = false;
		
		var delta = false;
		console.log("Current heading", currentHeading);
		for (var i=0; i<links.length; i++){
			console.log("candidate heading", links[i].heading);
			
			var d = Math.abs(currentHeading - links[i].heading);
			if (delta === false){
				delta = d;
				closestHeading = i;
			} else if (d < delta) {
				delta = d;
				closestHeading = i;
			}
		}
		
		console.log("Selected heading", links[closestHeading].heading);
		
		return links[closestHeading];
		
	};
	
	
	
	
	$(window).load(function(){
		var streetViewer = new StreetViewer();
		streetViewer.init();
		window.SV = streetViewer;
	});
	
	
	
})(jQuery);