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

	//if new scripts are available
de.dkfz.signaling.webcellhts2v2.global_cellHTS2Script = {
	    "2.1.0" : de.dkfz.signaling.webcellhts2v2.script210,
		"2.1.6" : de.dkfz.signaling.webcellhts2v2.script216
	};

de.dkfz.signaling.webcellhts2v2.currentCELLHTS2Version 
	= de.dkfz.signaling.webcellhts2v2.global_cellHTS2Scriptglobal_cellHTS2Script["2.1.6"]; 
	

