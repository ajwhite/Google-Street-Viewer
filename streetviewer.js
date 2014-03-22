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
		this.mapID = "map";
		this.map = null;
		this.streetView = null;
		this.streetViewService = null;
		this.directionsService = null;
		
		this.maxPoints = 100;
		this.points = [];
		this.path = [];
		this.currentStep = 0;
		this.pitch = 10;
	};
	
	
	StreetViewer.prototype.init = function(){
		this.streetViewService = new google.maps.StreetViewService();
		this.directionsService = new google.maps.DirectionsService();	
	};
	
	StreetViewer.prototype.mapInit = function(){
		var mapOptions = {
			center: this.path[0],
			zoom: 12
		};
		this.map = new google.maps.Map(document.getElementById(this.mapID), mapOptions);
		this.streetView = this.map.getStreetView();
		this.streetView.setOptions({
			position: mapOptions.center, 
			pov: {
				heading: 100,
				pitch: 10
			},
			visible: true
		});
	}
	
	StreetViewer.prototype.traverse = function(){
		var self = this,
			point = this.points[this.currentStep];
		
		console.log("POINT", point);
		this.streetView.setPano(point.pano);
		this.streetView.setPov({
			heading: point.bearing,
			pitch: 10
		});
		//this.map.setCenter(this.path[this.currentStep]);
		this.currentStep++;
		
		setTimeout(function(){
			self.traverse();
		},800);
		
		if (this.currentStep > this.maxPoints) return;
	}
	
	StreetViewer.prototype.handleDirections = function( directions ){
		console.log("Direcitons", directions);
		var routes = directions.routes;
			//path = routes[0].overview_path;
			
		
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
			setTimeout(function(){
				$(".loading-section").fadeOut();
			}, 1000);
		} else {
			$(".progress-bar").css('width', percent + '%');
		}
	}
	
	
	StreetViewer.prototype.buildPoints = function(){
		var self = this,
			i = 0,
			j = 0;
		function getPano(){
			self.streetViewService.getPanoramaByLocation(self.path[i], 50, function(result, status){
				if (j>self.maxPoints || i == self.path.length-1) {
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
					
					updateProgress(j, self.maxPoints);
				}
				i++;
				getPano();
			});
		};
		
		getPano();
		console.log("Building points..");
		/*
		 
		
		this.streetViewService.getPanoramaByLocation()
		for(var i=0; i<this.path.length-1; i++){
			var point = new Point();
			point.bearing = Point2PointBearing(this.path[i], this.path[i+1]);
			point.latlng = this.path[i];
			
		}
		*/
	};
	
	StreetViewer.prototype.buildPointsComplete = function(){
		console.log("Build complete");
		console.log("Points", this.points);	
		this.traverse();
	};
	
	StreetViewer.prototype.getDirections = function(origin, destination){
		$(".loading-section").show();
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
			
			SV.getDirections(origin, destination);
		});
	});
	
	
	
})(jQuery);