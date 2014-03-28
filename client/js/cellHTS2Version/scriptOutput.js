function ScriptOutput(config) {	
	this.config = config;
    this.sortedKeys = (jQuery.map(currentVersion,  function (element, index){
            return index
    })).sort(); //keys to array
    
	ScriptOutput.prototype.generateScript = function() {
        //sort the keys by number!
		var output = "";
		for(var i = 0; i < this.sortedKeys.length; i++) {
			output += this.generateStep(this.sortedKeys[i]);
		}
	}
	ScriptOutput.prototype.generateStep = function(stepId) {
		var output = "";
        
        var step = currentVersion[stepId];
       
        //if we dont have any dependencies
        if(step.dependentVariables == null) {
            output+=step.preLine+step.command;
        }
        var foundCount = 0;
        var printValues = [];
        for(var i = 0; i < step.dependentVariables.length; i++) {
            var myVar = step.dependentVariables[i];
            var result = myVar.match(/(.+)_(.+)$/);
            if (result != null) {
                if(result[1] == "literal") {
                    printValues[i] = result[2];
                }
                else if(result[1] == "method") {
                    printValues[i] = this.processMethod(result[2]);
                    if(printValues[i] != null) {
                    }
                }
                else if(result[1] == "dictkey") {
                    if(this.config[result[2]] != null) {
                       printValues[i] = this.config[result[2]];
                    }
                }
                
                if(printValues[i] != null) {
                    foundCount++;
                }
                
            }
            
        }
        //only print the preline and the command if all
        //dependentVariables have been defined
        if(foundCount == step.dependentVariables.length) {
            output+=step.preLine+this.sprintf(step.command, printValues);
        }
        return output;
	}
    ScriptOutput.prototype.processMethod = function(name) {
        if(name == "date") {
            return new Date();
        }
        if(name == "currentRversion") {
            return cellHTS2Config.dependentRVersion;
        }
        if(name == "currenCellHTS2Version") {
            return cellHTS2Config.dependentCellHTS2Version;
        }
    }
	ScriptOutput.prototype.sprintf = function(myString, arr) {
		for(var i = 0; i < arr.length; i++) {
			myString = myString.replace("%s", arr[i]);
		}
		return myString;
	}
    
}