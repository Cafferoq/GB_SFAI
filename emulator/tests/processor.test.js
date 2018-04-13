const Z80 = require("../scripts/core/processor.js");

const processor = new Z80({});

describe("Z80 Processor", function(){

	beforeEach(function(){
		processor.reset();
	});
	
	describe("Init", function(){
		test("Initializes Properly", function(){
			//Make sure the memory unit was passed in.
			expect(processor._memoryUnit).toEqual({});
			
			//Make sure that the ime flags are properly set.
			expect(processor._ime).toBe(1);
			
			//Ensure the clock is zeroed initially.
			expect(processor._clock.t).toBe(0);
			expect(processor._clock.m).toBe(0);

			//Ensure flags are set properly initially.
			expect(processor._flags.zero).toBe(false);
			expect(processor._flags.subtract).toBe(false);
			expect(processor._flags.halfCarry).toBe(false);
			expect(processor._flags.carry).toBe(false);
			
			//Ensure registers are zeroed out.
			expect(processor._registers.a).toBe(0);
			expect(processor._registers.b).toBe(0);
			expect(processor._registers.c).toBe(0);
			expect(processor._registers.d).toBe(0);
			expect(processor._registers.e).toBe(0);
			expect(processor._registers.h).toBe(0);
			expect(processor._registers.l).toBe(0);
			expect(processor._registers.pc).toBe(0);
			expect(processor._registers.sp).toBe(0);
			expect(processor._registers.m).toBe(0);
			expect(processor._registers.t).toBe(0);
		});
	});
	
	describe("Reset", function(){
		test("Resets everything", function(){
	
			processor._ime = 0;
			processor._clock.m = 42;
			processor._clock.t = 42;
	
			processor._flags.zero = true;
			processor._flags.subtract = true;
			processor._flags.halfCarry = true;
			processor._flags.carry = true;
	
			processor._registers.a = 32;
			processor._registers.b = 32;
			processor._registers.c = 32;
			processor._registers.d = 32;
			processor._registers.e = 32;
			processor._registers.h = 32;
			processor._registers.l = 32;
			
			processor._registers.pc = 32;
			processor._registers.sp = 32;
	
			processor._registers.m = 10;
			processor._registers.t = 10;
	
			processor.reset();
	
			//Make sure that the ime flags are properly set.
			expect(processor._ime).toBe(1);
			
			//Ensure the clock is zeroed initially.
			expect(processor._clock.t).toBe(0);
			expect(processor._clock.m).toBe(0);

			//Ensure flags are set properly initially.
			expect(processor._flags.zero).toBe(false);
			expect(processor._flags.subtract).toBe(false);
			expect(processor._flags.halfCarry).toBe(false);
			expect(processor._flags.carry).toBe(false);
			
			//Ensure registers are zeroed out.
			expect(processor._registers.a).toBe(0);
			expect(processor._registers.b).toBe(0);
			expect(processor._registers.c).toBe(0);
			expect(processor._registers.d).toBe(0);
			expect(processor._registers.e).toBe(0);
			expect(processor._registers.h).toBe(0);
			expect(processor._registers.l).toBe(0);
			expect(processor._registers.pc).toBe(0);
			expect(processor._registers.sp).toBe(0);
			expect(processor._registers.m).toBe(0);
			expect(processor._registers.t).toBe(0);
			
		});
	});
	
	describe("ADD OP Codes", function(){
		test("ADD A, A #0x87", function(){
			processor._registers.a = 10;
			processor._flags.subtract = true;
			
			processor.ADD_a();
			
			//Check the value
			expect(processor._registers.a).toBe(20);

			//Make sure subtract flag is set correctly
			expect(processor._flags.subtract).toBe(false);
			expect(processor._flags.zero).toBe(false);
			
			//Ensure correct clock time.
			expect(processor._registers.m).toBe(1);
			expect(processor._registers.t).toBe(4);
			
			processor.reset();
			
			processor._registers.a = 0;
			
			processor.ADD_a();
			
			expect(processor._flags.zero).toBe(true);
			expect(processor._registers.a).toBe(0);
		});
	});
	
});