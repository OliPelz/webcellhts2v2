//userInput = all the variables defined from the user through the web interface (html forms) for example dualChannel, varianceAdjust etc.
function ScriptOutput(userInput) {	
	
	
	var myNamespace = de.dkfz.signaling.webcellhts2v2;
	if(myNamespace.cellHTS2Config == null) {
		throw "ScriptOutput() : no global config cellHTS2Config obj defined";
		return null;
	}
	if(myNamespace.currentCELLHTS2ScriptVersion == null) {
		throw "ScriptOutput() : no global config currentCELLHTS2Script obj defined";
		return null;
	}
	this.userInput = userInput;
	this.cellHTS2Config = myNamespace.cellHTS2Config;
    this.currentCELLHTS2Script = myNamespace.global_cellHTS2Script[myNamespace.currentCELLHTS2ScriptVersion];
	/*this.sortedKeys = (jQuery.map(global_CELLHTS2Version,  function (element, index){
            return index
    })).sort(); //keys to array*/
    ScriptOutput.prototype.setUserInput= function(userInput) {
    	this.userInput = userInput;
    }
	//this is the main function
	ScriptOutput.prototype.generateScript = function() {
        //sort the keys by number!
		var output = "";
		for(var i = 0; i < this.currentCELLHTS2Script.length; i++) {
			var stepOutput = this.generateStep(this.currentCELLHTS2Script[i]);
			if(stepOutput == undefined) {
				return output;
			}
			output += stepOutput;
		}
		return output;
	}
	ScriptOutput.prototype.generateStep = function(step) {        
		
		if(step.type == "SPRINTF") {
			var allDefined = true;
			var sprintVars = [];
			for(var i = 0; i < step.dependentVariables.length; i++) {
				var arr = step.dependentVariables[i].split("\.");
				var type = arr[0], myVar = arr[1];
				if(type == "function") {
					var functOut = this.callFunction(myVar);
					if(functOut == undefined) {
						allDefined = false;
						break;
					}
					sprintVars.push(functOut());
				}
				else if(type == "userInput") {
					// if one has defined an alternative using '||'
					var res = myVar.exec(/(.+)\s*\|\|\s*(.+)$/);

					var myUserInput = this.userInput[myVar];
					
					if(res != null && res.length > 0) {
						var firstAttemp = res[1];
						var secAttemp = res[2];
						if(this.userInput[firstAttemp] == undefined) {
							myUserInput = secAttemp;
						}
					}
					
					// if the user has not supplied the variable of interest
					if(myUserInput == undefined) {
						allDefined = false;
						break;
					}					
					sprintVars.push(myUserInput);
				}
			}
			if(!allDefined) {
				return undefined;
			}
	        return step.comment+this.sprintf(step.command, sprintVars);
		}
		else if(step.type == "PLAINTEXT") {
			//if dependentVariables are defined we have to check
			//if they are there otherwise just print it out
			if(step.dependentOnUserInputVariables != undefined) {
				
			}
			return step.command;
		}   
		return undefined;    
	}
	ScriptOutput.prototype.sprintf = function(myString, arr) {
		for(var i = 0; i < arr.length; i++) {
			myString = myString.replace("%s", arr[i]);
		}
		return myString;
	}
    ScriptOutput.prototype.callFunction = function(myFctName) {
		return _myFcts[myFctName];
    }
	
	//private hash we will use in this class
	//contains all the functions we need in the script
	var _myFcts = {
		"currentTimestamp" : function() {
			return formatted_date_and_time();
		},
		"jobDir" : function() {
			//if we are on a test environment we generate a full path to a job directory
			
			//else if we are using a real webserver get a full path to a free JOB dir using AJAX
		},
		"reportDir" : function() {
			//if we are on a test environment we generate the output folder by generating current timestamp
			
			//else if we are using a real webserver get the next free directory (using AJAX) name using a proper mkdir function and return it here 
			
		}
	}
}