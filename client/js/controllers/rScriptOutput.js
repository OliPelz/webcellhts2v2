
myAppModule.controller('RscriptOutput',function($scope, sharedWebCellHTS2Props) {
	$scope.script = sharedWebCellHTS2Props.getSharedObject().script;
	$scope.webCellHTS2Version = sharedWebCellHTS2Props.getConfigObject().webcellHTS2Version;
});	