(function($){
	"use strict";
	
	
	function degree2Radian(degree){
		return ((degree * Math.PI) / 180.0);
	}
	
	function Point2PointBearing(pt1, pt2) {
	    var angle = 0;
	    if (pt1 != null && pt2 != null && !pt1.equals(pt2)) {
	        var y1 = degree2Radian(pt1.lat());
	        var x1 = degree2Radian(pt1.lng());
	        var y2 = degree2Radian(pt2.lat());
	        var x2 = degree2Radian(pt2.lng());
	        var a = Math.sin(x1 - x2) * Math.cos(y2);
	        var b = Math.cos(y1) * Math.sin(y2) - Math.sin(y1) * Math.cos(y2) * Math.cos(x1 - x2);
	        angle = -(Math.atan2(a, b));
	        if (angle < 0.0) {
	            angle += Math.PI * 2.0;
	        }
	        angle = parseInt(angle * 180.0 / Math.PI);
	    }
	    return angle;
	}
	
	function Point(latlng){
		this.latlng = null;
		this.bearing = null;
		this.pano = null;
	}
	

	function StreetViewer(){
		this.mapID = "streetview";
		this.mapTrackerID = "map";
		this.map = null;
		this.mapTracker = null;
		this.streetView = null;
		this.streetViewService = null;
		this.directionsService = null;
		this.directionsRenderer = null;
		this.marker = null;
		
		this.speed = 300;
		
		this.maxPoints = 500;
		this.points = [];
		this.path = [];
		this.currentStep = 0;
		this.pitch = 10;
		
		this.landingPoint = {
			lat: 42.3802,
			lng: -71.0470833
		};
		this.running = false;
	};
	
	
	StreetViewer.prototype.init = function(){
		var self = this;
		this.streetViewService = new google.maps.StreetViewService();
		this.directionsService = new google.maps.DirectionsService();	
		this.directionsRenderer = new google.maps.DirectionsRenderer();
		
		var mapOptions = {
			zoom: 18,
		    center:new google.maps.LatLng(40.766846, -73.970602), // new google.maps.LatLng('42.3802', '-71.0470833'),
		    scrollwheel: false,
		    disableDefaultUI: true,
		    mapTypeId: google.maps.MapTypeId.HYBRID
		};
		this.map = new google.maps.Map(document.getElementById(this.mapID), mapOptions);
		this.map.setTilt(45);
		this.map.setHeading(320);
		function pan(){
			if (self.running) return;
			self.landingPoint.lat -= 0.000023;
			self.landingPoint.lng -= 0.000019;
			
			var point = new google.maps.LatLng(self.landingPoint.lat, self.landingPoint.lng);
			//self.map.panTo(point);
			self.map.panBy(0.2,-0.1);
			
			setTimeout(function(){
				pan();
			},5);
		}
		pan();
	};
	
	StreetViewer.prototype.mapInit = function(){
		var mapOptions = {
			center: this.path[0],
			zoom: 12
		};
		//this.map = new google.maps.Map(document.getElementById(this.mapID), mapOptions);
		//this.mapTracker = new google.maps.Map(document.getElementById(this.mapTrackerID), mapOptions);
		//this.marker = new google.maps.Marker({ position: mapOptions.center, map: this.mapTracker});
		this.directionsRenderer.setMap(this.mapTracker);
		this.streetView = this.map.getStreetView();
		
		/*
		this.streetView.setOptions({
			position: mapOptions.center, 
			linksControl: false,
			zoomControlOptions: false,
			enableCloseButton: false,
			pov: {
				heading: 100,
				pitch: 10
			},
			visible: true
		});
		*/
	}
	
	StreetViewer.prototype.traverse = function(){
		var self = this,
			point = this.points[this.currentStep];
		
		this.streetView.setPano(point.pano);
		this.streetView.setPov({
			heading: point.bearing,
			pitch: 10
		});
		
		
		$(".trip-progress .current").css('left', ((this.currentStep / this.points.length)*100) + '%');
		
		//this.marker.setPosition(point.latlng);
		this.currentStep++;
		
		setTimeout(function(){
			self.traverse();
		},this.speed);
		
		if (this.currentStep > this.maxPoints) return;
	}
	
	StreetViewer.prototype.handleDirections = function( directions ){
		console.log("Direcitons", directions);
		var routes = directions.routes;
			//path = routes[0].overview_path;
		
		this.directionsRenderer.setDirections(directions)
		
		var count = 0;
		var steps = routes[0].legs[0].steps;
		for (var i=0; i<steps.length; i++){
			for (var j=0; j<steps[i].lat_lngs.length; j++){
				this.path.push(steps[i].lat_lngs[j]);
			}
		}
		this.mapInit();
		this.buildPoints();
	};
	
	function updateProgress(step, total){
		var percent = (step / total) * 100;
		if (percent >= 100){
			
		} else {
			$(".progress-bar").css('width', percent + '%');
		}
	}
	
	
	StreetViewer.prototype.buildPoints = function(){
		var self = this,
			i = 0,
			j = 0;
		
		var limit = self.maxPoints > self.path.length ? self.path.length : self.maxPoints;
		function getPano(){
			self.streetViewService.getPanoramaByLocation(self.path[i], 50, function(result, status){
				if (j>limit || i == limit-1) {
					self.buildPointsComplete();
					return;
				}
				if (status == google.maps.StreetViewStatus.OK){
					
					var point = new Point();
					point.latlng = self.path[i];
					point.bearing = Point2PointBearing(self.path[i], self.path[i+1]);
					point.pano = result.location.pano;
					self.points.push(point);
					j++;
					
					updateProgress(i, limit);
				}
				i++;
				getPano();
			});
		};
		
		getPano();
		console.log("Building points..");
	};
	
	StreetViewer.prototype.buildPointsComplete = function(){
		console.log("Build complete");
		console.log("Points", this.points);	
		setTimeout(function(){
			$("#welcome").fadeOut();
			$("#overlay").fadeIn();
		}, 1000);
		
		
		this.streetView.setOptions({
			position: this.points[0].latlng, 
			linksControl: false,
			zoomControl: false,
			enableCloseButton: false,
			panControl: false,
			pov: {
				heading: 100,
				pitch: 10
			},
			visible: true
		});
		this.running = true;
		this.traverse();
	};
	
	StreetViewer.prototype.getDirections = function(origin, destination){
		var self = this;
		var request = {
			origin: origin,
			destination: destination,
			travelMode: google.maps.TravelMode.DRIVING
		}
	
		this.directionsService.route(request, function(response, status){
			if (status == google.maps.DirectionsStatus.OK){
				self.handleDirections(response);
			}
			
		});
	};
		
	
	$(window).load(function(){
		
		var SV = new StreetViewer();
		SV.init();
		window.SV = SV;
		
		$("#go").click(function(){
			var origin = $("#origin").val(),
				destination = $("#destination").val();
				
			$(".search").fadeOut(300, function(){
				$(".loading").show();
			});
			
			SV.getDirections(origin, destination);
		});
		
		$("#speed").slider().on('slide', function(ev){
			var speed = parseInt($(this).val()) * 20;
			speed = 1000 - speed;
			SV.speed = speed;
			console.log(SV.speed);
		});
		
		$("#speed").change(function(){
			SV.speed = parseInt($(this).val());
		});
	});
	
	
	
})(jQuery);