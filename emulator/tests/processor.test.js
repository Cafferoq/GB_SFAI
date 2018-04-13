const Z80 = require("../scripts/core/processor.js");

const processor = new Z80({});

describe("Z80 Processor", function(){

	beforeEach(function(){
		processor.reset();
	});
	
	describe("Init", function(){
		test("Initializes Properly", function(){
			expect(processor._memoryUnit).toEqual({});
		});
	});
	
});