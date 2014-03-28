/*
*   this script is generating R output script vor cellHTS2 version 2.16
*
*
*/

var global_script216 = {};


global_script216["0"] = {
		preLine : "# cellHTS2 header\n#\n#\n",
		command : "#script generated on %s\n"+
                  "#target R version %s\n"+
                  "#target webcellhts2v2 version %s\n"+
                  "#current R version %s\n"+
                  "#current cellHTS2 version %s\n#\n\n",// this is a sprintf string
		dependentVariables : ["method_date",
                              "literal_"+cellHTS2Config.dependentCellHTS2Version,
                              "literal_"+cellHTS2Config.dependentRVersion,
                              "method_currentRversion",
                              "method_currenCellHTS2Version"
                              ],
		
};
global_script216["1"] = {
		preLine : "# piping output to file\n",
		command : "#TODO",  // this is a sprintf string 
		dependentVariables : [],
		
};
global_script216["2"] = {
		preLine : null,
		command : "singleChannel=%s",  // this is a sprintf string 
		dependentVariables : ["dictkey_singleChannel"],
};
