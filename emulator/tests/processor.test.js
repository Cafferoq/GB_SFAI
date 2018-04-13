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
		test("ADD A, B #0x80", function(){
			processor._registers.a = 10;
			processor._registers.b = 30;
			processor._flags.subtract = true;
			
			processor.ADD_b();
			
			//Check the value
			expect(processor._registers.a).toBe(40);

			//Make sure subtract flag is set correctly
			expect(processor._flags.subtract).toBe(false);
			expect(processor._flags.zero).toBe(false);
			
			//Ensure correct clock time.
			expect(processor._registers.m).toBe(1);
			expect(processor._registers.t).toBe(4);
			
			processor.reset();
			
			processor._registers.a = 0;
			processor._registers.b = 0;
			
			processor.ADD_b();
			
			expect(processor._flags.zero).toBe(true);
			expect(processor._registers.a).toBe(0);
			
			processor.reset();
			
			processor._registers.a = 255;
			processor._registers.b = 1;
			
			processor.ADD_b();
			
			expect(processor._registers.a).toBe(0);
			expect(processor._flags.carry).toBe(true);
		});
		
		test("ADD A, C #0x81", function(){
			processor._registers.a = 10;
			processor._registers.c = 30;
			processor._flags.subtract = true;
			
			processor.ADD_c();
			
			//Check the value
			expect(processor._registers.a).toBe(40);

			//Make sure subtract flag is set correctly
			expect(processor._flags.subtract).toBe(false);
			expect(processor._flags.zero).toBe(false);
			
			//Ensure correct clock time.
			expect(processor._registers.m).toBe(1);
			expect(processor._registers.t).toBe(4);
			
			processor.reset();
			
			processor._registers.a = 0;
			processor._registers.c = 0;
			
			processor.ADD_c();
			
			expect(processor._flags.zero).toBe(true);
			expect(processor._registers.a).toBe(0);
			
			processor.reset();
			
			processor._registers.a = 255;
			processor._registers.c = 1;
			
			processor.ADD_c();
			
			expect(processor._registers.a).toBe(0);
			expect(processor._flags.carry).toBe(true);
		});
		
		test("ADD A, D #0x82", function(){
			processor._registers.a = 10;
			processor._registers.d = 30;
			processor._flags.subtract = true;
			
			processor.ADD_d();
			
			//Check the value
			expect(processor._registers.a).toBe(40);

			//Make sure subtract flag is set correctly
			expect(processor._flags.subtract).toBe(false);
			expect(processor._flags.zero).toBe(false);
			
			//Ensure correct clock time.
			expect(processor._registers.m).toBe(1);
			expect(processor._registers.t).toBe(4);
			
			processor.reset();
			
			processor._registers.a = 0;
			processor._registers.d = 0;
			
			processor.ADD_d();
			
			expect(processor._flags.zero).toBe(true);
			expect(processor._registers.a).toBe(0);
			
			processor.reset();
			
			processor._registers.a = 255;
			processor._registers.d = 1;
			
			processor.ADD_d();
			
			expect(processor._registers.a).toBe(0);
			expect(processor._flags.carry).toBe(true);
		});
		
		test("ADD A, E #0x83", function(){
			processor._registers.a = 10;
			processor._registers.e = 30;
			processor._flags.subtract = true;
			
			processor.ADD_e();
			
			//Check the value
			expect(processor._registers.a).toBe(40);

			//Make sure subtract flag is set correctly
			expect(processor._flags.subtract).toBe(false);
			expect(processor._flags.zero).toBe(false);
			
			//Ensure correct clock time.
			expect(processor._registers.m).toBe(1);
			expect(processor._registers.t).toBe(4);
			
			processor.reset();
			
			processor._registers.a = 0;
			processor._registers.e = 0;
			
			processor.ADD_e();
			
			expect(processor._flags.zero).toBe(true);
			expect(processor._registers.a).toBe(0);
			
			processor.reset();
			
			processor._registers.a = 255;
			processor._registers.e = 1;
			
			processor.ADD_e();
			
			expect(processor._registers.a).toBe(0);
			expect(processor._flags.carry).toBe(true);
		});
		
		test("ADD A, H #0x84", function(){
			processor._registers.a = 10;
			processor._registers.h = 30;
			processor._flags.subtract = true;
			
			processor.ADD_h();
			
			//Check the value
			expect(processor._registers.a).toBe(40);

			//Make sure subtract flag is set correctly
			expect(processor._flags.subtract).toBe(false);
			expect(processor._flags.zero).toBe(false);
			
			//Ensure correct clock time.
			expect(processor._registers.m).toBe(1);
			expect(processor._registers.t).toBe(4);
			
			processor.reset();
			
			processor._registers.a = 0;
			processor._registers.h = 0;
			
			processor.ADD_h();
			
			expect(processor._flags.zero).toBe(true);
			expect(processor._registers.a).toBe(0);
			
			processor.reset();
			
			processor._registers.a = 255;
			processor._registers.h = 1;
			
			processor.ADD_h();
			
			expect(processor._registers.a).toBe(0);
			expect(processor._flags.carry).toBe(true);
		});
		
		test("ADD A, L #0x85", function(){
			processor._registers.a = 10;
			processor._registers.l = 30;
			processor._flags.subtract = true;
			
			processor.ADD_l();
			
			//Check the value
			expect(processor._registers.a).toBe(40);

			//Make sure subtract flag is set correctly
			expect(processor._flags.subtract).toBe(false);
			expect(processor._flags.zero).toBe(false);
			
			//Ensure correct clock time.
			expect(processor._registers.m).toBe(1);
			expect(processor._registers.t).toBe(4);
			
			processor.reset();
			
			processor._registers.a = 0;
			processor._registers.l = 0;
			
			processor.ADD_l();
			
			expect(processor._flags.zero).toBe(true);
			expect(processor._registers.a).toBe(0);
			
			processor.reset();
			
			processor._registers.a = 255;
			processor._registers.l = 1;
			
			processor.ADD_l();
			
			expect(processor._registers.a).toBe(0);
			expect(processor._flags.carry).toBe(true);
		});
		
		test("ADD A, (hl) #0x86", function(){
			processor._registers.a = 10;
			
			processor._memoryUnit.readByte = jest.fn();
			processor._memoryUnit.readByte.mockReturnValueOnce(30);
			
			processor._flags.subtract = true;
			
			processor.ADDr_hl();
			
			//Check the value
			expect(processor._registers.a).toBe(40);

			//Make sure subtract flag is set correctly
			expect(processor._flags.subtract).toBe(false);
			expect(processor._flags.zero).toBe(false);
			
			//Ensure correct clock time.
			expect(processor._registers.m).toBe(2);
			expect(processor._registers.t).toBe(8);
			
			processor.reset();
			
			processor._registers.a = 0;
			processor._memoryUnit.readByte.mockReturnValueOnce(0);
			
			processor.ADDr_hl();
			
			expect(processor._flags.zero).toBe(true);
			expect(processor._registers.a).toBe(0);
			
			processor.reset();
			
			processor._registers.a = 255;
			processor._memoryUnit.readByte.mockReturnValueOnce(1);
			
			
			processor.ADDr_hl();
			
			expect(processor._registers.a).toBe(0);
			expect(processor._flags.carry).toBe(true);
			
			expect(processor._memoryUnit.readByte).toHaveBeenCalledTimes(3);
		});
		
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
			
			processor._registers.a = 255;
			
			processor.ADD_a();
			
			expect(processor._registers.a).toBe(254);
			expect(processor._flags.carry).toBe(true);
		});
	});
	
});