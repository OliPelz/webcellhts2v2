'use strict';



var myAppModule = angular.module('app', [
	/*'ngRoute',*/
	'mgo-angular-wizard',
	'ui.bootstrap'
]);


/*
*  define a service to be able to share webcellhts2 config data between controllers
*/
myAppModule.service('sharedWebCellHTS2Props', function() {
    var sharedObject = {};
    var configObject = cellHTS2Config;
	
    
     this.getSharedObject = function() {
         return sharedObject;
     }
     this.getConfigObject = function() {
	     return configObject;
     }
    
});


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

