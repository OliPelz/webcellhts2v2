//userInput = all the variables defined from the user through the web interface (html forms) for example dualChannel, varianceAdjust etc.
function ScriptOutput(userInput) {	
	
	//private hash we will use in this class
	//contains all the functions we need in the script
	var _myFcts = {
		"currentTimestamp" : function() {
			return formatted_date_and_time();
		}
	}
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
    ScriptOutput.prototype.setDefinedVariables = function(definedVariables) {
    	this.variables = definedVariables;
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
			for(var i = 0; i < step.dependentVariables.length; i++) {
				var arr = step.dependentVariables[i];
				var type = arr[0], myVar = arr[1];
				if(type == "function") {
					var functOut = callFunction(myVar);
					if(functOut == undefined) {
						allDefined = false;
						break;
					}
				}
				else if(type == "userInput") {
					// if the user has not supplied the variable of interest
					if(this.userInput[myVar] == undefined) {
						allDefined = false;
						break;
					}
				}
			}
			if(!allDefined) {
				return undefined;
			}
	        return step.comment+this.sprintf(step.command, step.dependentVariables);
		}
		else if(step.type == "SPRINTF") {
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
		return _myFct[myFctName];
    }
}