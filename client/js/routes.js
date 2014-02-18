// my routes


// configure our routes
myAppModule.config(function($routeProvider) {
	// route for the home page
	$routeProvider.when('/advancedFileImporter', {
		templateUrl : 'pages/advancedFileImporter.html',
		controller  : 'AdvancedFileImporter'
	});
});