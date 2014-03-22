<?php include('../header.php'); ?>
<div class="container">
	<div class="row">
		<div class="col-md-12">
			<h2>Street Viewer</h2>
		</div>
	</div>
	
	<div class="row">
		<div class="col-xs-4">
			<strong>Starting Location</strong><br/>
			<input type="text" id="origin" class="form-control" value="West Townsend, MA" />
		</div>
		<div class="col-xs-4">
			<strong>Ending Location</strong><br/>
			<input type="text" id="destination" class="form-control" value="Shirley, MA" />
		</div>
		<div class="col-xs-2"><br/>
			<button class="btn btn-primary" id="go">Go!</button>
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
		<div class="col-md-12">
			<div id="map"></div>
		</div>
	</div>
</div>

<style type="text/css">
.row { margin-bottom: 20px; }
#map { width: 750px; height: 500px; background-color:gray;}
.loading-section { display: none; }
</style>

<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAU0mkZ8G0JLpXpbCqX4-vIJC0UZcFEFKU&sensor=false"></script>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script type="text/javascript" src="streetviewer.js"></script>


<script type="text/javascript">


</script>
			
<?php include('../footer.php'); ?>