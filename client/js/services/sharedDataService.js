/*
*  define a service to be able to share webcellhts2 config data between controllers
*/
myAppModule.service('sharedWebCellHTS2Props', function() {
    var sharedObject = {};
    
    return {
        getSharedObject: function() {
            return sharedObject;
        }
    }
});