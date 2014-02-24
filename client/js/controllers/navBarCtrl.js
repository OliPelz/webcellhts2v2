
myAppModule.controller('NavBarCtrl',function($scope, $modal) {
	$scope.openConfigModal = function () {
	    var modalInstance = $modal.open({
	      templateUrl: 'pages/programSettings.html',
	      controller: 'ProgramSettings',
	     
	    });

	    
	  };
});	