
myAppModule.controller('WizardCtrl',function($scope, WizardHandler) {
	$scope.stepStart = {channel : ""};
	$scope.finished = function() {
		alert("Wizard finished :)");
	}

	$scope.logStep = function() {
		console.log("Step continued");
	}

	$scope.goBack = function() {
		WizardHandler.wizard().goTo(0);
	}
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