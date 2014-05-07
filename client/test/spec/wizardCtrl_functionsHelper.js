
describe("wizardCtrl_functions testsuite", function() {
	
	var cellHTS2Config;
	
	beforeEach(function() {
		jasmine.addMatchers(CustomMatchers);
	})
	
	//create a new spec
	describe("parseDataFilename", function() {
		it("should return the array of files from input even no regexp matched",
			 function(){
				 var files = [
				 	{name: "FileA.txt",channel: null,replicate: null},
				 	{name: "FileB.txt",channel: null,replicate: null},
					{name: "FileC.txt",channel: null,replicate: null},
					{name: "FileD.txt",channel: null,replicate: null}		
				 ]
				 var files2 = parseDataFilename(files)
			 expect(files2).toEqual(files);
		});
	});
});

