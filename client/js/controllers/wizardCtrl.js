
myAppModule.controller('WizardCtrl',function($scope, WizardHandler, sharedWebCellHTS2Props) {
	//initalize standard settings
	$scope.stepStart = {channel : "",
						isDualChannel : false,
						channel1Name : "Channel1",
						channel2Name : "Channel2"
						};
	$scope.stepUploadDF = {                   //DF = datafiles
							filenameParsing : true,
							dataFiles : []
						};
						//add to our shared obj so we can access from everywhere
	sharedWebCellHTS2Props.getSharedObject().stepStart = $scope.stepStart;
	sharedWebCellHTS2Props.getSharedObject().stepUploadDF = $scope.stepUploadDF;
	
	$scope.finished = function() {
		alert("Wizard finished :)");
	}

	$scope.logStep = function() {
		console.log("Step continued");
	}

	$scope.goBack = function() {
		WizardHandler.wizard().goTo(0);
	}
	//first step methods
	$scope.stepStartChangeChannel = function() {
		if($scope.stepStart.channel == "dual_channel") {
			$scope.stepStart.isDualChannel = true;
		}
		else {
			$scope.stepStart.isDualChannel = false;
		}
	}
	
	//second step methods  - stepUploadDF
	$scope.onDataFileUpload = function($files) {
		$scope.stepUploadDF.dataFiles = [];
		for (var i = 0; i < $files.length; i++) {
			//add additional stuff
			  var myFile = {};
			  myFile.channel = "";
			  myFile.replicate = "";
			  myFile.name = $files[i].name;
			  myFile.size = $files[i].size;
		      $scope.stepUploadDF.dataFiles.push(myFile);
		}
		      /*$http.uploadFile({
		        url: 'my/upload/url',
		        file: $file
		      }).then(function(data, status, headers, config) {
		        // file is uploaded successfully
		        console.log(data);
		      }); 
		    }*/
		/*var f = document.getElementById('file').files[0],
		r = new FileReader();
		r.onloadend = function(e){
		     $scope.data = e.target.result;
		}
		r.readAsBinaryString(f);*/
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