'use strict';


// setup namespace if not already defined
if(!de) {
	var de = {};
}
if(!de.dkfz)
    de.dkfz = {};
if(!de.dkfz.signaling)
    de.dkfz.signaling = {};
if(!de.dkfz.signaling.webcellhts2v2)
    de.dkfz.signaling.webcellhts2v2 = {};   
//this is a global variable, defined the right way
//applying the module pattern
de.dkfz.signaling.webcellhts2v2.cellHTS2Config = function() {
	var my = {};
	my.webcellHTS2Version = "2.00";

	my.testing = true; //if true than we dont have any webserver and no R
                              //basically this is for testing the client and
                              //generating R scripts and for the jasmine tests
	my.webserver = "NODE.JS";  //allowed values : NODE.JS or JAVA . NODE.JS = local, singlethreaded R server implementation using node.js and  , JAVA = multithreaded, with a queuing system in background, more powerful webserver  

/* this is for parts where we need the R server */
	my.serverConnect = {
		"NODE.JS" : {
   	 		address : "127.0.0.1",
    		webroot : "/",
			xlsConverterAddress : "/xlsConvert",
			rQueryAddress : "/runRScript"
		},
		"JAVA" : {
   	 		address : "127.0.0.1",
    		webroot : "/",
			xlsConverterAddress : "/xlsConvert",
			rQueryAddress : "/runRScript"
		}
	};
// generate cellHTS2 scripts for the following version
	my.dependentCellHTS2Version = "2.16.0";
	my.dependentRVersion = "2.13.1";

	my.currentCellHTS2Version = null;
	my.currentRVersion = null;

	return my;
}();










