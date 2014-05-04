//load all scripts statically here 



//point to the script you want to use
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

//if new scripts for new versions are available put in here
de.dkfz.signaling.webcellhts2v2.global_cellHTS2Script = {
	    "2.10.0" : de.dkfz.signaling.webcellhts2v2.script210,
		"2.16.0" : de.dkfz.signaling.webcellhts2v2.script216
	};
	
//choose one of your scripts to work with
de.dkfz.signaling.webcellhts2v2.currentCELLHTS2ScriptVersion
	= "2.16.0"; 
	


