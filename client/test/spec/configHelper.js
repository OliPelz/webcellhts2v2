// specs for global webcellhts2 config obj


//given the global cellHTS2Config obj (load the config.js), all important fields should be accessible 
//in this global space

//define new test context, this creates a new test suite
describe("cellHTS2Config testsuite", function() {
	
	var cellHTS2Config;
	
	beforeEach(function() {
		jasmine.addMatchers(CustomMatchers);
		cellHTS2Config = de.dkfz.signaling.webcellhts2v2.cellHTS2Config; 
	})
	
	//create a new spec
	describe("cellHTS2Config", function() {
		it("should have a webcellhTS2Version defined",
			 function(){
			 expect(cellHTS2Config.webcellHTS2v2Version).toBeDefined();
		});
		it("should have a boolean testing variable",
			 function(){
			expect(cellHTS2Config.testing).toBeBoolean();
		});
		it("should have a webserver variable defined",
			 function(){
			expect(cellHTS2Config.webserver).toMatch(/NODE.JS|JAVA/);
		});
		it("should have a serverConnect variable defined",
			 function(){
			expect(cellHTS2Config.serverConnect).toBeDefined();
		});
		it("should have a java serverConnect address variable defined",
			 function(){
			expect(cellHTS2Config.serverConnect["JAVA"].address).toBeDefined();
		});
		it("should have a dependentRVersion variable defined",
			 function(){
			expect(cellHTS2Config.dependentRVersion).toBeDefined();
		});
	});
});

