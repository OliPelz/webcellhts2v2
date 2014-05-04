// specs for scriptOutput
//given the version

// creation of scriptOutput should generate a ScriptOutput instance
// given a scriptOutput object and no defined variable, define an empty script only with header
// given  a scriptOutput object and the variables defined for a certain step , define that step
// given  a scriptOutput object and all variables have been defined - define the wholw script
// given  a scriptOutput object and dualchannel the defined script is different
// given  a scriptOutput object and HTSAnalyzer info, the script defines HTSAnalyser part


//define new test context, this creates a new test suite
describe("scriptOuput testsuite", function() {
	var scriptOutput;
	var webcellhts2v2 = de.dkfz.signaling.webcellhts2v2;
	var cellHTS2Config = webcellhts2v2.cellHTS2Config;
	//this is needed for our testing
	cellHTS2Config.testing = true;
	//this test-suite depends on version
	webcellhts2v2.currentCELLHTS2ScriptVersion = "2.16.0";
	
	beforeEach(function() {
		jasmine.addMatchers(CustomMatchers);
		scriptOutput = new ScriptOutput({}); //empty variables obj, we set this later with the setDefinedVariables() method
	})
	
	//create a new spec
	describe("scriptOutput", function() {
		it("should generate a scriptOutput object", function() {
			expect(scriptOutput).toBeInstanceOf(ScriptOutput);
		});
		it("generate an empty script for no variables defined", function(){
			scriptOutput.setDefinedVariables({});
			expect(scriptOutput.generateScript()).toEqual("");
		});
	});
});

