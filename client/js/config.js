'use strict';



var myAppModule = angular.module('app', [
	/*'ngRoute',*/
	'mgo-angular-wizard',
	'ui.bootstrap'
]);

var cellHTS2Config = {};

cellHTS2Config.webcellHTS2Version = "2.00";

cellHTS2Config.no_webserver = true; //if true than we dont have any webserver and no R
                         //basically this is for testing the client and
                         //generating R scripts

/* this is for parts where we need the R server */
cellHTS2Config.serverConnect = {
    address : "127.0.0.1",
    webroot : "/",
	xlsConverterAddress : "/xlsConvert",
	rQueryAddress : "/runRScript"
};
// generate cellHTS2 scripts for the following version
cellHTS2Config.dependentCellHTS2Version = "2.16";
cellHTS2Config.dependentRVersion = "13.1";

cellHTS2Config.currentCellHTS2Version = null;
cellHTS2Config.currentRVersion = null;

//the toastr error messages
toastr.options = {
	"closeButton": false,
	"debug": false,
	"positionClass": "toast-top-right",
	"onclick": null,
	"showDuration": "300",
	"hideDuration": "1000",
	"timeOut": "5000",
	"extendedTimeOut": "1000",
	"showEasing": "swing",
	"hideEasing": "linear",
	"showMethod": "fadeIn",
	"hideMethod": "fadeOut"
}



