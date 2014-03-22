<?php include('../header.php'); ?>
<div class="container">
	<div id="bgmapHolder"><div id="streetview"></div></div>
	
	<div id="overlay">
		<div class="top"><h3>Boston,MA --> Toronto,ON</h3></div>
		<div class="body">
			<div class="trip-progress">
				<div class="start"></div>
				<div class="progress-wrapper">
					<div class="current"></div>
				</div>
				<div class="end"></div>
			</div>
		
		</div>
	</div>
	
	
	<div id="welcome">
		<div class="search">
			<h2>Welcome to the Street View Experience</h2>
			<div class="row">
				<div class="col-xs-5">
					<label>Starting Location</label>
					<input type="text" class="form-control" placeholder="Enter address" id="origin" value="West Townsend, MA" />
				</div>
				<div class="col-xs-5">
					<label>Destination Location</label>
					<input type="text" class="form-control" placeholder="Enter address" id="destination" value="Shirley, MA" />
				</div>
				<div class="col-xs-2">
					<label>&nbsp;</label>
					<button class="btn btn-primary" id="go">Experience it</button>
				</div>
			</div>
			
		</div>
	
		<div class="loading">
			<h2>Loading your Street View Experience</h2>
			<div class="progress">
				<div class="progress-bar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
			</div>
				<p>We are loading all of your trip segments. This may take a moment.</p>
		</div>
	</div>
	
	
	
	<div style="display:none;">
		<div class="row">
			<div class="col-xs-2">
				<strong>Speed</strong><br/>
				<input type="text" id="speed" value="" data-slider-min="10" data-slider-max="40" data-slider-step="1" data-slider-value="10" data-slider-orientation="horizontal" data-slider-selection="after" data-slider-tooltip="true">
			</div>
		</div>
		
		<div class="row loading-section">
			<div class="col-md-12">
				<h3>Loading paths...</h3>
				<div class="progress">
					<div class="progress-bar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
				</div>
			</div>
		</div>
		
		
		<div class="row">
			<div class="col-md-8">
				<div id="streetview"></div>
			</div>
			<div class="col-md-4">
				<!--<div id="map"></div>-->
			</div>
		</div>
	
	</div>
	
</div>

<style type="text/css">

#overlay {
	background: rgba(25, 25, 25, 0.60);
	padding: 10px 10px 20px 10px;
	width: 300px; 
	position: fixed;
	top: 100px;
	left:0;
	z-index: 10;
	color: #cccccc;
	display:none;
}
#overlay .top { border-bottom: 1px solid #ccc; }
#overlay .top h3 { font-size: 16px; margin: 5px 0; text-align: center }

#overlay .trip-progress { padding: 10px 0; position: relative; height: 50px; }
#overlay .trip-progress:before {
	content: ' ';
	position: absolute;
	top: 30px;
	width: 100%;
	height: 1px;
	border-bottom: 3px dashed #ccc;
	
}
#overlay .trip-progress .start,
#overlay .trip-progress .end { 
	display: block;
	position: absolute;
	background-color: #ccc;
	height: 25px;
	width: 25px;
	border-radius: 20px;
	top: 19px;
}
#overlay .trip-progress .start { left: -3px; }
#overlay .trip-progress .end { right: -3px; }
#overlay .trip-progress .current {
	display: block;
	position: absolute;
	background-color:#ccc;
	height: 15px;
	width: 15px;
	border-radius: 15px;
	top:0;
	left: 0;
}
#overlay .trip-progress .progress-wrapper {
	position: absolute; top: 24px;
	left:20px;
	right: 20px;
}


header { position: relative; z-index:10; }
.row { margin-bottom: 20px; }
/* #streetview { width: 100%; height: 500px; background-color:gray;} */
.loading-section { display: none; }

#welcome { background-color: #fbfbfb; padding: 40px; width: 800px; position: absolute; z-index: 10; top:50%; margin-top:-100px;
	left: 50%; margin-left:-400px;
	-webkit-box-shadow: 0px 0px 13px 5px rgba(50, 50, 50, 0.85);
	-moz-box-shadow:    0px 0px 13px 5px rgba(50, 50, 50, 0.85);
	box-shadow:         0px 0px 13px 5px rgba(50, 50, 50, 0.85);
	
	border-radius: 8px;
}

#welcome h2 { margin: 0 0 20px;text-align: center;  color:#8e8e8e; }
#welcome .loading { display: none; text-align: center; }

#bgmapHolder { position: fixed; top:0; left:0; width:100%; height: 100%; z-index: 1;  }
#streetview { height: 100%; width: 100%; }
</style>

<link rel="stylesheet" type="text/css" href="slider/css/slider.css" />

<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAU0mkZ8G0JLpXpbCqX4-vIJC0UZcFEFKU&sensor=false"></script>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="slider/js/bootstrap-slider.js"></script>
<script type="text/javascript" src="streetviewer.js"></script>


<script type="text/javascript">

(function($){
	$(window).load(function(){

	});
})(jQuery);
</script>
			
<?php include('../footer.php'); ?>