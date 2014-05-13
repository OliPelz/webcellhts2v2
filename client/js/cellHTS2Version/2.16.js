/*
*   this script is generating R output script vor cellHTS2 version 2.16
*
*
*/

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

de.dkfz.signaling.webcellhts2v2.script216 = [
		{
		type: "SPRINTF",
		comment:  "#cellHTS2 header\n#\n#\n",
		command : "#script generated on %s\n"+
        		  "#target cellHTS2 version %s\n"+
                  "#target R version %s\n"+
                  "#current R version %s\n"+
                  "#current cellHTS2 version %s\n#\n\n",// this is a sprintf string
		dependentVariables : ["function.currentTimestamp",
                              "userInput.dependentCellHTS2Version",
                              "userInput.dependentRVersion",
                              "userInput.currentRversion",
                              "userInput.currenCellHTS2Version"
                              ],
		weightForProgressbar : 0	
		},
		{
		type : "PLAINTEXT",
		command :  "# redirecting program output to a file\n"
				  +"zz <- file('R_OUTPUT.TXT', open=\"w\")\n"
				  +"sink(file=zz,type=\"message\" )\n",
		dependentOnUserInputVariables : ["name"], //can be defined but most not be		  
		weightForProgressbar : 0
		},
	{
		TYPE : 	    "SPRINTF",
		command : 	"Title='%s'"+
					"Jobdir='%s'"+                               /*this will be the full path to the output job dir*/
					"Outdir_report='%s'"+                        /*this will be a subdir for the current run */
					"LogTransform='%s'"+
					"PlateList='%s'"+
					"Plateconf='%s'"+
					"Description='%s'"+
					"NormalizationMethod='%s'"+
					"NormalizationScaling='%s'"+
					"VarianceAdjust='%s'"+
					"SummaryMethod='%s'"+
					"Screenlog='%s'"+
					"Score='%s'",
		dependentVariables : ["userInput.title || 'n.a.'",
							  "function.jobDir",
							  "function.reportDir",
							  ""
		],
		weightForProgressbar : 0
	},
	{
		TYPE : "WORSCHD",
		command : "library(cellHTS2)",  
		weightForProgressbar : 0
	},
	{
		TYPE : "PLAINTEXT",
		command : "x = readPlateList(PlateList, name = Name, path = Indir)"+
                  "x=configure(x, descripFile=Description, confFile=Plateconf, logFile=Screenlog,path=Indir)" , 
		weightForProgressbar : 0
	},
	{
		TYPE : "PLAINTEXT",
		command : "xn=normalizePlates(x, scale =NormalizationScaling ,"+
				  "log =LogTransform,method=NormalizationMethod,"+
				  "varianceAdjust=VarianceAdjust)",
		weightForProgressbar : 0
	},
	{
		TYPE : "SPRINTF",
		command : "ViabilityMethod = function(r1, r2, thresh = quantile(r1,"+
			       "probs = 0.05, na.rm = TRUE)) ifelse(r1 > thresh,"+
				   "log2(r2/r1), + as.numeric(NA))"+
				   "xn = summarizeChannels(xn, fun = ViabilityMethod)"+
				   "xn@state['normalized'] = TRUE",
		dependentVariables : ["singleChannel"],
		conditionDependentVariables : ["VARS_DEFINED"],
		extraConditions : ["singleChannel"],
		extraConditionTypes : ["IS_FALSE"],  /* allowed here: IS_TRUE, IS_FALSE*/
		weightForProgressbar : 0
	},
	{
		TYPE : "PLAINTEXT",
		command : "xsc = scoreReplicates(xn, sign = "-", method = Score)"+
				  "xsc = summarizeReplicates(xsc, summary = SummaryMethod)",
		weightForProgressbar : 0
	},
	{
		TYPE : "SPRINTF",
		command : "xsc = annotate(xsc, geneIDFile = Annotation)",
		dependentVariables : ["uploadedAnnotationFile"],
		conditionDependentVariables : ["VARS_DEFINED"],
		extraConditions : ["uploadedAnnotationFile"],
		extraConditionTypes : ["IS_TRUE"],  /* allowed here: IS_TRUE, IS_FALSE*/
		weightForProgressbar : 0
	},
	{
		TYPE : "TEXTCONDITION",
		command : "scores=Data(xsc)"+
				  "ylim=quantile(scores, c(0.001, 0.999), na.rm = TRUE)",
		conditions : ["singleChannel"],
		extraConditionTypes : ["IS_TRUE"],  /* allowed here: IS_TRUE, IS_FALSE*/
		weightForProgressbar : 0
	}
];
