<?php include('../header.php'); ?>
<div class="container">
	<div class="row">
		<div class="col-md-12">
			<h2>Street Viewer</h2>
		</div>
	</div>
	
	<div class="row">
		<div class="col-md-12">
			<div id="map"></div>
			
		</div>
	</div>
</div>

<a href="#" id="move">Move</a>
<style type="text/css">
#map { width: 800px; height: 500px; background-color:gray;}
</style>

<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAU0mkZ8G0JLpXpbCqX4-vIJC0UZcFEFKU&sensor=false"></script>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script type="text/javascript" src="streetviewer.js"></script>
<script type="text/javascript" src="GSVPano.js"></script>


<script type="text/javascript">

$(window).load(function(){
	return;
	var directionService = new google.maps.DirectionsService();
	
	var request = {
		origin: 'Boston, MA',
		destination: 'Waltham, MA',
		travelMode: google.maps.TravelMode.DRIVING
	};
	
	directionService.route(request, function(response, status){
		if (status == google.maps.DirectionsStatus.OK){
			console.log("directions", response);
		}
		
	});


	return;

	var point = new google.maps.LatLng(42.345573,-71.098326);
	var loader = new GSVPANO.PanoLoader({ zoom: 1 });
	
	loader.load(point, function(){
		console.log('initailized');
	});
		loader.composePanorama("gq21nsoEPpzTNpIlQWc5Nw");
	
	/* gq21nsoEPpzTNpIlQWc5Nw */
	loader.onPanoramaLoad = function(){
		console.log("onPanoramaLoad", loader.canvas);
		
		$("#map").append(loader.canvas);
		/*
		var img = new Image();
		img.id = 'test';
		img.src = loader.canvas.toDataURL();
		$("#map").append(img);
		*/
		
		//context.drawImage(loader.canvas, 0, 0);
	};
	
/*	
	var canvas = document.createElement("canvas");
	var context = canvas.getContext('2d');
	canvas.setAttribute('width',this.canvas.width);
	canvas.setAttribute('height',this.canvas.height);
	context.drawImage(this.canvas, 0, 0);
*/


});

</script>
			
<?php include('../footer.php'); ?>