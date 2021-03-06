
myAppModule.controller('WizardCtrl',function($scope, WizardHandler, sharedWebCellHTS2Props) {
	//initalize standard settings
	$scope.stepStart = {channel : "",
						showChannelDesc : false,
						channel1Name : "Channel1",
						channel2Name : "Channel2"
						};
	sharedWebCellHTS2Props.getSharedObject().stepStart = $scope.stepStart;
	$scope.finished = function() {
		alert("Wizard finished :)");
	}

	$scope.logStep = function() {
		console.log("Step continued");
	}

	$scope.goBack = function() {
		WizardHandler.wizard().goTo(0);
	}
	
	$scope.stepStartChangeChannel = function() {
		if($scope.stepStart.channel == "dual_channel") {
			$scope.stepStart.showChannelDesc = true;
		}
		else {
			$scope.stepStart.showChannelDesc = false;
		}
	}
	
	// here are the step validators
	$scope.validateStepStart = function() {
		var errorFree = true;
		if($scope.stepStart.channel == "") {
					             
			toastr.error('Please define a channel first');
			//alert("Please define a channel first");
			errorFree = false;
		}
		if(errorFree) {
			WizardHandler.wizard().next();
		}
	}
});	