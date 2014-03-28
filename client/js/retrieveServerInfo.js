$( document ).ready(function() {
	//check dependencies to file system, config files etc
	//check server if R is running etc
	var failedChecks = false;
	
    //if we have a webserver check if we can request stuff from it
    if(cellHTS2Config.no_webserver) {
	    currentCellHTS2Version = cellHTS2Config.dependentCellHTS2Version;
	    currentRVersion = cellHTS2Config.dependentRVersion;          
    }
	else {  // make a connection here to the R server
		//if it fails set failedChecks to true
		
	}
           
		            
	if(!failedChecks) {
		toastr.info("web cellHTS2 loaded");
	}	
});