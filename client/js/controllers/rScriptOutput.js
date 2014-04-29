
myAppModule.controller('RscriptOutput',function($scope, sharedWebCellHTS2Props) {
	var script = sharedWebCellHTS2Props.getSharedObject().script;
	//TODO: this will later be replaced by proper ACE code css blocks
	$scope.script = script;
	$scope.webCellHTS2Version = sharedWebCellHTS2Props.getConfigObject().webcellHTS2Version;
});	