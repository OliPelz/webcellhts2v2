$( document ).ready(function() {
	//check dependencies to file system, config files etc
	//check server if R is running etc
	var failedChecks = false;
	
    if(cellHTS2Config.testing) {
		//if testing than we dont have a webserver 
		//only local connections and only for generating scripts
	    cellHTS2Config.currentCellHTS2Version = cellHTS2Config.dependentCellHTS2Version;
	    cellHTS2Config.currentRVersion = cellHTS2Config.dependentRVersion;          
    }
	else {  // make a connection here to the R server
		//if it fails set failedChecks to true
	    //if we have a webserver check if we can request stuff from it
		
	}
           
		            
	if(!failedChecks) {
		toastr.info("web cellHTS2 loaded");
	}	
});