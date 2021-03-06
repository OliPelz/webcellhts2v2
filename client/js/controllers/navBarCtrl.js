
myAppModule.controller('NavBarCtrl',function($scope, $modal, sharedWebCellHTS2Props) {
	$scope.openConfigModal = function () {
	    var modalInstance = $modal.open({
	      templateUrl: 'pages/programSettings.html',
	      controller: 'ProgramSettings',
	    });
	  };
	  $scope.showCurrentRScript = function() {
         var scriptOutput = new ScriptOutput(sharedWebCellHTS2Props.getSharedObject());
         var myScript = scriptOutput.generateScript();
         
		 sharedWebCellHTS2Props.getSharedObject()["script"] = myScript;
		 
  	     var modalInstance = $modal.open({
  	        templateUrl: 'pages/rScriptOutput.html',
  	        controller: 'RscriptOutput',
  	     });
		 	
	  };
});	