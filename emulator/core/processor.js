var Z80 = function(){
  this._clock;        //The Artifical Z80's clock
  this._registers;    //An object containing all of the Z80'a registers
  this._memoryUnit;   //The memory unit that actually read/writes.
  this._flags;        //The flags register of the Z-80, but as bools.


  this.running = true;

  /**
   * Initializes the flags and the registers in the "Z80"
   *
   * @param mmu - The memory unit to be used in read and write instructions.
   */
  this.init = function(mmu){
    this._memoryUnit = mmu;
    this.reset();
  };

  this.reset = function(){
    this._clock = {
      m: 0, t: 0
    };

    this._flags = {
      zero : false,
      subtract : false,
      halfCarry : false,
      carry : false
    };

    this._registers = {
      a:0, b:0, c:0, d:0, e:0, h:0, l:0,     //8b registers
      pc:0, sp:0,                            //Program Counter, Stack Pointer
      m:0, t:0                               //Clock at last instruction
    };
  };

  this.mainLoop = function(){
    while(this.running){
      var opCode = this._memoryUnit.readByte(this._registers.pc++);
      this._instructionMap[opCode]();
      this._registers.pc &= 0xFFFF;
      this._clock.m += this._registers.m;
      this._clock.t += this._registers.t;
    }
  };

  /**---------------------ADD Operations----------------------------------------**/
  //ADD A, A #0x87
  this.ADD_a = function(){
    var temp = this._registers.a + this._registers.a;

    this._flags.halfCarry = (temp & 0xF) < (this._registers.a & 0xF);
    this._flags.carry = temp > 0xFF;

    this._registers.a = temp & 0xFF;

    this._flags.zero = this._registers.a == 0;
    this._flags.subtract = false;

    this._registers.m = 1;
    this._registers.t = 4;
  };

  //ADD A, B #0x80
  this.ADD_b = function(){
    var temp = this._registers.a + this._registers.b;

    this._flags.halfCarry = (temp & 0xF) < (this._registers.a & 0xF);
    this._flags.carry = temp > 0xFF;

    this._registers.a = temp & 0xFF;

    this._flags.zero = this._registers.a == 0;
    this._flags.subtract = false;

    this._registers.m = 1;
    this._registers.t = 4;
  };

  //ADD A, C #0x81
  this.ADD_c = function(){
    var temp = this._registers.a + this._registers.c;

      this._flags.halfCarry = (temp & 0xF) < (this._registers.a & 0xF);
      this._flags.carry = temp > 0xFF;

      this._registers.a = temp & 0xFF;

      this._flags.zero = this._registers.a == 0;
      this._flags.subtract = false;

      this._registers.m = 1;
      this._registers.t = 4;
  };

  //ADD A, D 0x82
  this.ADD_d = function(){
      var temp = this._registers.a + this._registers.d;

      this._flags.halfCarry = (temp & 0xF) < (this._registers.a & 0xF);
      this._flags.carry = temp > 0xFF;

      this._registers.a = temp & 0xFF;

      this._flags.zero = this._registers.a == 0;
      this._flags.subtract = false;

      this._registers.m = 1;
      this._registers.t = 4;
  };

  //ADD A, E #0x83
  this.ADD_e = function(){
      var temp = this._registers.a + this._registers.e;

      this._flags.halfCarry = (temp & 0xF) < (this._registers.a & 0xF);
      this._flags.carry = temp > 0xFF;

      this._registers.a = temp & 0xFF;

      this._flags.zero = this._registers.a == 0;
      this._flags.subtract = false;

      this._registers.m = 1;
      this._registers.t = 4;
  };

  //ADD A, H #0x84
  this.ADD_h = function(){
      var temp = this._registers.a + this._registers.h;

      this._flags.halfCarry = (temp & 0xF) < (this._registers.a & 0xF);
      this._flags.carry = temp > 0xFF;

      this._registers.a = temp & 0xFF;

      this._flags.zero = this._registers.a == 0;
      this._flags.subtract = false;

      this._registers.m = 1;
      this._registers.t = 4;
  };

  //ADD A, L #0x85
  this.ADD_l = function(){
    var temp = this._registers.a + this._registers.l;

    this._flags.halfCarry = (temp & 0xF) < (this._registers.a & 0xF);
    this._flags.carry = temp > 0xFF;

    this._registers.a = temp & 0xFF;

    this._flags.zero = this._registers.a == 0;
    this._flags.subtract = false;

    this._registers.m = 1;
    this._registers.t = 4;
  };

  //ADD A, (HL) #0x86
  this.ADDr_hl = function(){
    var temp = this._registers.a + this._memoryUnit.readByte((this._registers.h << 8) + this._registers.l);
    this._flags.halfCarry = ((temp & 0xF) < (this._registers.a & 0xF));
    this._flags.carry = temp > 0xFF;
    this._registers.a = temp & 0xFF;
    this._flags.zero = this._registers.a == 0;
    this._flags.subtract = false;
	
	this._registers.m = 2;
    this._registers.t = 8;
  };
  
  //ADD HL, BC #0x09
  this.ADDHL_BC = function(){
	  var tempHL = (this._registers.h << 8) + this._registers.l;
	  var tempSum = tempHL + (this._registers.b << 8) + this._registers.c;
	  
	  this._flags.carry = tempSum > 0xFFFF;
	  this._flags.halfCarry = (tempHL & 0xFFF) > (tempSum & 0xFFF);
	  this._flags.subtract = false;
	  
	  this._registers.h = (tempSum >> 8) & 0xFF;
	  this._registers.l = tempSum & 0xFF;
	  
      this._registers.m = 3; 
	  this._registers.t = 12;
  };
  
  //ADD HL, DE #0x19
  this.ADDHL_DE = function(){
	  var tempHL = (this._registers.h << 8) + this._registers.l;
	  var tempSum = tempHL + (this._registers.d << 8) + this._registers.e;
	  
	  this._flags.carry = tempSum > 0xFFFF;
	  this._flags.halfCarry = (tempHL & 0xFFF) > (tempSum & 0xFFF);
	  this._flags.subtract = false;
	  
	  this._registers.h = (tempSum >> 8) & 0xFF;
	  this._registers.l = tempSum & 0xFF;
	  
      this._registers.m = 3; 
	  this._registers.t = 12;
  };
  
  //ADD HL, HL #0x29
  this.ADDHL_HL = function(){
	  var tempHL = (this._registers.h << 8) + this._registers.l;
	
	  this._flags.halfCarry = (tempHL & 0xFFF) > 0x7FF;
	  this._flags.carry = tempHL > 0x7FFF;
	  
	  tempHL = (tempHL << 1) & 0xFFFF;
	  
	  this._flags.subtract = false;
	  
	  this._registers.h = (tempHL >> 8) & 0xFF;
	  this._registers.l = tempHL & 0xFF;
	  
	  this._registers.m = 3;
	  this._registers.t = 12;
  };
  
  //ADD HL, SP #0x39
  this.ADDHL_SP = function(){
	  var tempHL = (this._registers.h << 8) + this._registers.l;
	  var tempSum = tempHL + this._registers.sp;
	  
	  this._flags.halfCarry = (tempHL & 0xFFF) > (tempSum & 0xFFF);
	  this._flags.carry = tempSum > 0xFFFF;
	  this._flags.subtract = false;
	  
	  this._registers.h = (tempSum >> 8) & 0xFF;
	  this._registers.l = tempSum & 0xFF;
	  	  
	  this._registers.m = 3;
	  this._registers.t = 12;
  };

  /**---------------------End ADD Operations-------------------------------------**/

  /**---------------------PUSH Operations-------------------------------------**/

  //PUSH BC #0xC5
  this.PUSH_bc = function(){
    this._registers.sp--;
    this._memoryUnit.writeByte(this._registers.sp, this._registers.b);
    this._registers.sp--;
    this._memoryUnit.writeByte(this._registers.sp, this._registers.c);
    this._registers.m = 3; this._registers.t = 12;
  };

  //PUSH DE #0xD5
  this.PUSH_de = function(){
    this._registers.sp--;
    this._memoryUnit.writeByte(this._registers.sp, this._registers.d);
    this._registers.sp--;
    this._memoryUnit.writeByte(this._registers.sp, this._registers.e);
    this._registers.m = 3; this._registers.t = 12;
  };

  //PUSH HL #0xE5
  this.PUSH_hl = function(){
    this._registers.sp--;
    this._memoryUnit.writeByte(this._registers.sp, this._registers.h);
    this._registers.sp--;
    this._memoryUnit.writeByte(this._registers.sp, this._registers.l);
    this._registers.m = 3; this._registers.t = 12;
  };

  //PUSH AF #0xF5
  this.PUSH_af = function(){
    this._registers.sp--;
    this._memoryUnit.writeByte(this._registers.sp, this._registers.a);
    this._registers.sp--;
    this._memoryUnit.writeByte(this._registers.sp, (
      this._flags.zero      ? 0x80 : 0 |
      this._flags.subtract  ? 0x40 : 0 |
      this._flags.halfCarry ? 0x20 : 0 |
      this._flags.carry     ? 0x10 : 0
    ));
    this._registers.m = 3; this._registers.t = 12;
  };
  /**---------------------End PUSH Operations-------------------------------------**/

  /**---------------------POP Operations-------------------------------------**/

  //POP BC #0xC1
  this.POP_bc = function(){
    this._registers.c = this._memoryUnit.readByte(this._registers.sp);
    this._registers.sp++;
    this._registers.b = this._memoryUnit.readByte(this._registers.sp);
    this._registers.sp++;
    this._registers.m = 3; this._registers.t = 12;
  };

  //POP DE #0xD1
  this.POP_de = function(){
    this._registers.e = this._memoryUnit.readByte(this._registers.sp);
    this._registers.sp++;
    this._registers.d = this._memoryUnit.readByte(this._registers.sp);
    this._registers.sp++;
    this._registers.m = 3; this._registers.t = 12;
  };

  //POP HL #0xE1
  this.POP_hl = function(){
    this._registers.l = this._memoryUnit.readByte(this._registers.sp);
    this._registers.sp++;
    this._registers.h = this._memoryUnit.readByte(this._registers.sp);
    this._registers.sp++;
    this._registers.m = 3; this._registers.t = 12;
  };

  //POP AF #0xF1
  this.POP_af = function(){
    var temp = this._memoryUnit.readByte(this._registers.sp);
    this._flags.zero      = (temp > 0x7F);
    this._flags.subtract  = ((temp & 0x40) == 0x40);
    this._flags.halfCarry = ((temp & 0x20) == 0x20);
    this._flags.carry     = ((temp & 0x10) == 0x10);
    this._registers.sp++;

    this._registers.a = this._memoryUnit.readByte(this._registers.sp);
    this._registers.sp++;
    this._registers.m = 3; this._registers.t = 12;
  };

  /**---------------------End POP Operations-------------------------------------**/

  /**----------------------LD Operation------------------------------------------**/
  //LD BC, nn #0x01
  this.LDBCnn = function(){
    this._registers.c = this._memoryUnit.readByte(this._registers.pc);
    this._registers.pc++;
    this._registers.b = this._memoryUnit.readByte(this._registers.pc);
    this._registers.pc++;
    this._registers.m = 3;
    this._registers.t = 12;
  };

  //LD DE, nn #0x11
  this.LDDEnn = function(){
    this._registers.e = this._memoryUnit.readByte(this._registers.pc);
    this._registers.pc++;
    this._registers.d = this._memoryUnit.readByte(this._registers.pc);
    this._registers.pc++;
    this._registers.m = 3;
    this._registers.t = 12;
  };

  //LD HL, nn #0x21
  this.LDHLnn = function(){
    this._registers.l = this._memoryUnit.readByte(this._registers.pc);
    this._registers.pc++;
    this._registers.h = this._memoryUnit.readByte(this._registers.pc);
    this._registers.pc++;
    this._registers.m = 3;
    this._registers.t = 12;
  };

  //LD SP, nn #0x31
  this.LDSPnn = function(){
    this._registers.sp = this._memoryUnit.readWord(this._registers.pc);
    this._registers.pc += 2;
    this._registers.m = 3;
    this._registers.t = 12;
  };

  //LD (BC), A #0x02
  this.LDBCmA = function(){
    this._memoryUnit.writeByte((this._registers.b << 8) + this._registers.c,
      this._registers.a);
    this._registers.m = 2;
    this._registers.t = 8;
  };
  
  //LD (DE), A #0x12
  this.LDDEmA = function(){
    this._memoryUnit.writeByte((this._registers.d << 8) + this._registers.e,
      this._registers.a);
    this._registers.m = 2;
    this._registers.t = 8;
  };

  //LDI (HL), A #0x22
  this.LDIHLA = function(){
    this._memoryUnit.writeByte((this._registers.h << 8) + this._registers.l,
      this._registers.a);
	 
	this._registers.l = (this._registers.l + 1) & 0xFF;
	if(this._registers.l == 0) this._registers.h = (this._registers.h + 1) & 0xFF;
	  
    this._registers.m = 2;
    this._registers.t = 8;
  };
  
  //LDI A, (HL) #0x2A Load register A from address (HL) and increment HL.
  this.LDIAHL = function(){
	  this._registers.a = this._memoryUnit.readByte((this._registers.h << 8) + this._registers.l);
	  this._registers.l++;
	  this._registers.l &= 0xFF;
	  
	  if(this._registers.l == 0)
		  this._registers.h = (this._registers.h + 1) & 0xFF;
	  
	  this._registers.m = 2;
	  this._registers.t = 8;
  };
  
  //LDD A, (HL) #0x3A Load register A from address (HL) and decrement HL
  this.LDDAHL = function(){
	  this._registers.a = this._memoryUnit.readByte((this._registers.h << 8) + this._registers.l);
	  this._registers.l--;
	  this._registers.l &= 0xFF;
	  
	  if(this._registers.l == 0xFF)
		  this._registers.h = (this._registers.h - 1) & 0xFF;
	  
	  this._registers.m = 2;
	  this._registers.t = 8;
  };
  
  //LDD (HL), A #0x32
  this.LDDHLA = function(){
    this._memoryUnit.writeByte((this._registers.h << 8) + this._registers.l,
      this._registers.a);
	 
	this._registers.l = (this._registers.l - 1) & 0xFF;
	if(this._registers.l == 0xFF) this._registers.h = (this._registers.h - 1) & 0xFF;
	  
    this._registers.m = 2;
    this._registers.t = 8;
  };
  
  //LD B, n #0x06 Load Immediate into register B
  this.LDB_n = function(){
	  this._registers.b = this._memoryUnit.readByte(this._registers.pc);
	  this._registers.pc++;
	  
  	  this._registers.m = 2;
	  this._registers.t = 8;
  };
  
  //LD C, n #0x0E Load Immediate into register C
  this.LDC_n = function(){
	  this._registers.c = this._memoryUnit.readByte(this._registers.pc);
	  this._registers.pc++;
	  
  	  this._registers.m = 2;
	  this._registers.t = 8;
  };
  
  //LD D, n #0x16 Load Immediate into register D
  this.LDD_n = function(){
	  this._registers.d = this._memoryUnit.readByte(this._registers.pc);
	  this._registers.pc++;
	  
  	  this._registers.m = 2;
	  this._registers.t = 8;
  };
  
  //LD E, n #0x1E Load Immediate into register E
  this.LDE_n = function(){
	  this._registers.e = this._memoryUnit.readByte(this._registers.pc);
	  this._registers.pc++;
	  
  	  this._registers.m = 2;
	  this._registers.t = 8;
  };
  
  //LD H, n #0x26 Load Immediate into register H
  this.LDH_n = function(){
	  this._registers.h = this._memoryUnit.readByte(this._registers.pc);
	  this._registers.pc++;
	  
  	  this._registers.m = 2;
	  this._registers.t = 8;
  };
  
  //LD L, n #0x2E Load Immediate into register L
  this.LDL_n = function(){
	this._registers.l = this._memoryUnit.readByte(this._registers.pc);
	this._registers.pc++;
	  
  	this._registers.m = 2;
	this._registers.t = 8;
  };
  
  //LD (HL), n #0x36 Load Immediate into address pointed to by (HL)
  this.LDHLm_n = function(){
	this._memoryUnit.writeByte(
		(this._registers.h << 8) + this._registers.l, 
		this._memoryUnit.readByte(this._registers.pc)
	);
	
	this._registers.m = 3;
    this._registers.t = 12;
  };
  
  //LD A, n #0x3E Load Immediate into register A
  this.LDA_n = function(){
	this._registers.a = this._memoryUnit.readByte(this._registers.pc);
	this._registers.pc++;
	  
  	this._registers.m = 2;
	this._registers.t = 8;
  };
  
  //LD (nn), SP #0x08 Save the stack pointer to given address.
  this.LDnn_SP = function(){
	  var temp_addr = ((this._memoryUnit.readByte(this._registers.pc + 1) & 0xFFFF) << 8) | this._memoryUnit.readByte(this._registers.pc);
	  this._registers.pc += 2;
	  this._registers.pc &= 0xFFFF;
	  this._memoryUnit.writeByte(temp_addr, this._registers.sp & 0xFF);
	  this._memoryUnit.writeByte((temp_addr + 1) & 0xFFFF, this._registers.sp >> 8);
	  
	//TODO These clock values may be wrong?
	  this._registers.m = 3;
	  this._registers.t = 12;
  };
  
  //LD A, (BC) #0x0A Load value in address (BC) to register A.
  this.LDA_BC = function(){
	this._registers.a = this._memoryUnit.readByte((this._registers.b << 8) | this._registers.c);
	  
  	this._registers.m = 2;
	this._registers.t = 8;
  };

  //LD A, (DE) #0x1A Load value in address (DE) to register A.
  this.LDA_DE = function(){
	this._registers.a = this._memoryUnit.readByte((this._registers.b << d) | this._registers.e);
	  
  	this._registers.m = 2;
	this._registers.t = 8;
  };
  
  //LD B, B 0x40 Copy B into B
  this.LDBB = function(){
	  //BTW: Most useless opcode ever.
	  this._registers.m = 1;
	  this._registers.t = 4;
  };
  
  //LD B, C 0x41 Copy C into B
  this.LDBC = function(){
	  this._registers.b = this._registers.c;
	  
	  this._registers.m = 1;
	  this._registers.t = 4;
  };
  
  //LD B, D 0x42 Copy D into B
  this.LDBD = function(){
	  this._registers.b = this._registers.d;
	  
	  this._registers.m = 1;
	  this._registers.t = 4;
  };
  
  
  //LD B, E 0x43 Copy E into B
  this.LDBE = function(){
	  this._registers.b = this._registers.e;
	  
	  this._registers.m = 1;
	  this._registers.t = 4;
  };
  
  
  //LD B, H 0x44 Copy H into B
  this.LDBH = function(){
	  this._registers.b = this._registers.h;
	  
	  this._registers.m = 1;
	  this._registers.t = 4;
  };
  
  
  //LD B, L 0x45 Copy C into B
  this.LDBL = function(){
	  this._registers.b = this._registers.l;
	  
	  this._registers.m = 1;
	  this._registers.t = 4;
  };
  
  //LD B, (HL) 0X46 Load value at address (HL) to register B
  this.LDB_hl = function(){
	  this._registers.b = this._memoryUnit.readByte((this._registers.h << 8) + this._registers.l);
	  
	  this._registers.m = 2;
	  this._registers.t = 8;
  };
  
  //LD B, A 0x47 Copy A into B
  this.LDBA = function(){
	  this._registers.b = this._registers.a;
	  
	  this._registers.m = 1;
	  this._registers.t = 4;
  };
  
  //LD C, B 0x48 Copy B into C
  this.LDCB = function(){
	  this._registers.c = this._registers.b;
	  
	  this._registers.m = 1;
	  this._registers.t = 4;
  };

  //LD C, C 0x49 Copy C into C
  this.LDCC = function(){
	  //Also Useless...
	  
	  this._registers.m = 1;
	  this._registers.t = 4;
  };
  
  //LD C, D 0x4A Copy D into C
  this.LDCD = function(){
	  this._registers.c = this._registers.d;
	  
	  this._registers.m = 1;
	  this._registers.t = 4;
  };
  
  //LD C, E 0x4B Copy E into C
  this.LDCE = function(){
	  this._registers.c = this._registers.e;
	  
	  this._registers.m = 1;
	  this._registers.t = 4;
  };
  
  //LD C, H 0x4C Copy H into C
  this.LDCH = function(){
	  this._registers.c = this._registers.h;
	  
	  this._registers.m = 1;
	  this._registers.t = 4;
  };
  
  //LD C, L 0x4D Copy L into C
  this.LDCL = function(){
	  this._registers.c = this._registers.l;
	  
	  this._registers.m = 1;
	  this._registers.t = 4;
  };
  
  //LD C, (HL) 0X4E Load value at address (HL) to register C
  this.LDC_hl = function(){
	  this._registers.c = this._memoryUnit.readByte((this._registers.h << 8) + this._registers.l);
	  
	  this._registers.m = 2;
	  this._registers.t = 8;
  };  
  
  //LD C, A 0x4F Copy A into C
  this.LDCA = function(){
	  this._registers.c = this._registers.a;
	  
	  this._registers.m = 1;
	  this._registers.t = 4;
  };
  
  //LD D, B 0x50 Copy B into D
  this.LDDB = function(){
	  this._registers.d = this._registers.b;
	  
	  this._registers.m = 1;
	  this._registers.t = 4;
  };
  
  //LD D, C 0x51 Copy C into D
  this.LDDC = function(){
	  this._registers.d = this._registers.c;
	  
	  this._registers.m = 1;
	  this._registers.t = 4;
  };  
  
  //LD D, D 0x52 Copy D into D
  this.LDDD = function(){
	  //This should just be a no-op...
	  this._registers.m = 1;
	  this._registers.t = 4;
  };
  
  
  //LD D, E 0x53 Copy E into D
  this.LDDE = function(){
	  this._registers.d = this._registers.e;
	  
	  this._registers.m = 1;
	  this._registers.t = 4;
  };
  

  //LD D, H 0x54 Copy H into D
  this.LDDH = function(){
	  this._registers.d = this._registers.h;
	  
	  this._registers.m = 1;
	  this._registers.t = 4;
  };
  

  //LD D, L 0x55 Copy L into D
  this.LDDL = function(){
	  this._registers.d = this._registers.l;
	  
	  this._registers.m = 1;
	  this._registers.t = 4;
  };
  
  //LD D, (HL) 0X56 Load value at address (HL) to register D
  this.LDD_hl = function(){
	  this._registers.d = this._memoryUnit.readByte((this._registers.h << 8) + this._registers.l);
	  
	  this._registers.m = 2;
	  this._registers.t = 8;
  };  
  
  //LD D, A 0x57 Copy A into D
  this.LDDA = function(){
	  this._registers.d = this._registers.a;
	  
	  this._registers.m = 1;
	  this._registers.t = 4;
  };
  
  //LD E, B 0x58 Copy B into E
  this.LDEB = function(){
	  this._registers.e = this._registers.b;
	  
	  this._registers.m = 1;
	  this._registers.t = 4;
  };
  
  //LD E, C 0x59 Copy C into E
  this.LDEC = function(){
	  this._registers.e = this._registers.c;
	  
	  this._registers.m = 1;
	  this._registers.t = 4;
  };
  
  //LD E, D 0x5A Copy D into E
  this.LDED = function(){
	  this._registers.e = this._registers.d;
	  
	  this._registers.m = 1;
	  this._registers.t = 4;
  };

  //LD E, E 0x5B Copy E into E
  this.LDEE = function(){
	  //You know the drill
	  this._registers.m = 1;
	  this._registers.t = 4;
  };  

  //LD E, H 0x5C Copy H into E
  this.LDEH = function(){
	  this._registers.e = this._registers.h;
	  
	  this._registers.m = 1;
	  this._registers.t = 4;
  };    
  
  //LD E, L 0x5D Copy L into E
  this.LDEL = function(){
	  this._registers.e = this._registers.l;
	  
	  this._registers.m = 1;
	  this._registers.t = 4;
  };  
  
  //LD E, (HL) 0X5E Load value at address (HL) to register E
  this.LDE_hl = function(){
	  this._registers.e = this._memoryUnit.readByte((this._registers.h << 8) + this._registers.l);
	  
	  this._registers.m = 2;
	  this._registers.t = 8;
  };  
  
  //LD E, A 0x5F Copy D into E
  this.LDEA = function(){
	  this._registers.e = this._registers.a;
	  
	  this._registers.m = 1;
	  this._registers.t = 4;
  };  
    
  //LD H, B 0x60 Copy B into H
  this.LDHB = function(){
	  this._registers.h = this._registers.b;
	  
	  this._registers.m = 1;
	  this._registers.t = 4;
  };
   
  //LD H, C 0x61 Copy C into H
  this.LDHC = function(){
	  this._registers.h = this._registers.c;
	  
	  this._registers.m = 1;
	  this._registers.t = 4;
  };    
  
  //LD H, D 0x62 Copy D into H
  this.LDHD = function(){
	  this._registers.h = this._registers.d;
	  
	  this._registers.m = 1;
	  this._registers.t = 4;
  };  
  
  //LD H, E 0x63 Copy E into H
  this.LDHE = function(){
	  this._registers.h = this._registers.e;
	  
	  this._registers.m = 1;
	  this._registers.t = 4;
  };  
     
  //LD H, H 0x64 Copy H into H
  this.LDHH = function(){
	  //Witty comment about how useless this is.
	  this._registers.m = 1;
	  this._registers.t = 4;
  };  
     
  //LD H, B 0x65 Copy L into H
  this.LDHL = function(){
	  this._registers.h = this._registers.l;
	  
	  this._registers.m = 1;
	  this._registers.t = 4;
  };  
  
  //LD H, (HL) 0x66 Load value at address (HL) to register H
  this.LDH_hl = function(){
	  this._registers.h = this._memoryUnit.readByte((this._registers.h << 8) + this._registers.l);
	  
	  this._registers.m = 2;
	  this._registers.t = 8;
  }; 
  
  //LD H, A 0x67 Copy A into H
  this.LDHA = function(){
	  this._registers.h = this._registers.a;
	  
	  this._registers.m = 1;
	  this._registers.t = 4;
  };  
  
  //LD L, B 0x68 Copy B into L
  this.LDLB = function(){
	  this._registers.l = this._registers.b;
	  
	  this._registers.m = 1;
	  this._registers.t = 4;
  };
  
  //LD L, C 0x69 Copy C into L
  this.LDLC = function(){
	  this._registers.l = this._registers.c;
	  
	  this._registers.m = 1;
	  this._registers.t = 4;
  };
  
  //LD L, D 0x6A Copy D into L
  this.LDLD = function(){
	  this._registers.l = this._registers.d;
	  
	  this._registers.m = 1;
	  this._registers.t = 4;
  };
  
  //LD L, E 0x6B Copy E into L
  this.LDLE = function(){
	  this._registers.l = this._registers.e;
	  
	  this._registers.m = 1;
	  this._registers.t = 4;
  };
  
  //LD L, H 0x6C Copy H into L
  this.LDLH = function(){
	  this._registers.l = this._registers.h;
	  
	  this._registers.m = 1;
	  this._registers.t = 4;
  };
  
  //LD L, L 0x6D Copy L into L
  this.LDLL = function(){
	  //NOPE
	  this._registers.m = 1;
	  this._registers.t = 4;
  };
  
  //LD L, (HL) 0x6E Load value at address (HL) to register L
  this.LDL_hl = function(){
	  this._registers.l = this._memoryUnit.readByte((this._registers.h << 8) + this._registers.l);
	  
	  this._registers.m = 2;
	  this._registers.t = 8;
  }; 
  
  //LD L, A 0x6F Copy A into L
  this.LDLA = function(){
	  this._registers.l = this._registers.a;
	  
	  this._registers.m = 1;
	  this._registers.t = 4;
  };
  /**------------------End LD Operation------------------------------------------**/
  
  
  /**------------------Rotate Operation------------------------------------------**/
 
  //RLC A #0x07 Rotate register A left with Carry
  this.RLCa = function(){
	  this._flags.carry = this._registers.a > 0x7F;
	  this._registers.a = ((this._registers.a << 1) & 0xFF) | (this._flags.carry ? 1 : 0);
	  
	  this._flags.halfCarry = false;
	  this._flags.subtract = false;
	  this._flags.zero = this._registers.a == 0;
	
	  this._registers.m = 1;
      this._registers.t = 4;
  };
  
  //RL A #0x17 Rotate register A left without carry
  this.RLa = function(){
	  var carry = this._flags.carry;
	  this._flags.carry = this._registers.a > 0x7F;
	  
	  this._registers.a = ((this._registers.a << 1) & 0xFF) | (carry ? 1 : 0);
	  
	  this._flags.halfCarry = false;
	  this._flags.subtract = false;
	  this._flags.zero = false;
	  
	  this._registers.m = 1;
      this._registers.t = 4;
  };
  
  //RRC A #0x0F Rotate register A right with carry
  this.RRCa = function(){
	  this._registers.a = (this._registers.a >> 1) | ((this._registers.a & 1) << 7);
	  
	  this._flags.carry = this._registers.a > 0x7F;
	  this._flags.zero = false;
	  this._flags.subtract = false;
	  this._flags.halfCarry = false;
	 
	  this._registers.m = 1;
      this._registers.t = 4;
  };
  
  //RR A #0x1F Rotate register A right without carry
  this.RRa = function(){
	  var carry = this._flags.carry ? 0x80 : 0;
	
	  this._flags.carry = (this._registers.a & 1) == 1;
	
	  this._registers.a = (this._registers.a >> 1) | carry;
	  
	  this._flags.zero = false;
	  this._flags.subtract = false;
	  this._flags.halfCarry = false;
	  
	  this._registers.m = 1;
      this._registers.t = 4;
  };
  
  /**------------------End Rotate Operation--------------------------------------**/
  
  
  /**------------------- 8b INC Operation----------------------------------------**/  
  
  //INC B #0x04 Increment register B
  this.INC_b = function(){
	this._registers.b = (this._registers.b + 1) & 0xFF;
	
	this._flags.zero = this._registers.b == 0;
	this._flags.halfCarry = (this._registers.b & 0xF) == 0;
	this._flags.subtract = false;
	
	this._registers.m = 1;
    this._registers.t = 4;
  };
  
  //INC C #0x0C Increment register C
  this.INC_c = function(){
	this._registers.c = (this._registers.c + 1) & 0xFF;
	
	this._flags.zero = this._registers.c == 0;
	this._flags.halfCarry = (this._registers.c & 0xF) == 0;
	this._flags.subtract = false;
	
	this._registers.m = 1;
    this._registers.t = 4;
  };
  
  //INC D #0x14 Increment register D
  this.INC_d = function(){
	this._registers.d = (this._registers.d + 1) & 0xFF;
	
	this._flags.zero = this._registers.d == 0;
	this._flags.halfCarry = (this._registers.d & 0xF) == 0;
	this._flags.subtract = false;
	
	this._registers.m = 1;
    this._registers.t = 4;
  };
  
  //INC E #0x1C Increment register E
  this.INC_e = function(){
	this._registers.e = (this._registers.e + 1) & 0xFF;
	
	this._flags.zero = this._registers.e == 0;
	this._flags.halfCarry = (this._registers.e & 0xF) == 0;
	this._flags.subtract = false;
	
	this._registers.m = 1;
    this._registers.t = 4;
  };
  
  //INC H #0x24 Increment register H
  this.INC_h = function(){
	this._registers.h = (this._registers.h + 1) & 0xFF;
	
	this._flags.zero = this._registers.h == 0;
	this._flags.halfCarry = (this._registers.h & 0xF) == 0;
	this._flags.subtract = false;
	
	this._registers.m = 1;
    this._registers.t = 4;
  };
  
  //INC L #0x2C Increment register L
  this.INC_l = function(){
	this._registers.l = (this._registers.l + 1) & 0xFF;
	
	this._flags.zero = this._registers.l == 0;
	this._flags.halfCarry = (this._registers.l & 0xF) == 0;
	this._flags.subtract = false;
	
	this._registers.m = 1;
    this._registers.t = 4;
  };
  
  // INC (HL) #0x34 Increment the value at (HL) 
  this.INC_hlm = function(){
	var temp = this._memoryUnit.readByte(this._registers.h << 8 + this._registers.l) + 1;
	temp &= 0xFF;
	this._memoryUnit.writeByte(this._registers.h << 8 + this._registers.l, temp);
	
	this._flags.zero = temp == 0;
	this._flags.halfCarry = (temp & 0xF) == 0;
	this._flags.subtract = false;
	
	this._registers.m = 3;
    this._registers.t = 12;
  };
  
  //INC A #0x3C Increment register A
  this.INC_a = function(){
	this._registers.a = (this._registers.a + 1) & 0xFF;
	
	this._flags.zero = this._registers.a == 0;
	this._flags.halfCarry = (this._registers.a & 0xF) == 0;
	this._flags.subtract = false;
	
	this._registers.m = 1;
    this._registers.t = 4;
  };
  
  /**--------------- End 8b INC Operation----------------------------------------**/  
  
  /**------------------- 8b DEC Operation----------------------------------------**/
  
  // DEC B #0x05 Decrement register B
  this.DEC_b = function(){
	this._registers.b = (this._registers.b - 1) & 0xFF;

	this._flags.zero = this._registers.b == 0;
	this._flags.halfCarry = (this._registers.b & 0xF) == 0xF;
	this._flags.subtract = true;
	
	this._registers.m = 1;
    this._registers.t = 4;
  };
  
  // DEC C #0x0D Decrement register C
  this.DEC_c = function(){
	this._registers.c = (this._registers.c - 1) & 0xFF;

	this._flags.zero = this._registers.c == 0;
	this._flags.halfCarry = (this._registers.c & 0xF) == 0xF;
	this._flags.subtract = true;
	
	this._registers.m = 1;
    this._registers.t = 4;
  };
  
  // DEC D #0x15 Decrement register D
  this.DEC_d = function(){
	this._registers.d = (this._registers.d - 1) & 0xFF;

	this._flags.zero = this._registers.d == 0;
	this._flags.halfCarry = (this._registers.d & 0xF) == 0xF;
	this._flags.subtract = true;
	
	this._registers.m = 1;
    this._registers.t = 4;
  };
  
  // DEC E #0x1D Decrement register E
  this.DEC_e = function(){
	this._registers.e = (this._registers.e - 1) & 0xFF;

	this._flags.zero = this._registers.e == 0;
	this._flags.halfCarry = (this._registers.e & 0xF) == 0xF;
	this._flags.subtract = true;
	
	this._registers.m = 1;
    this._registers.t = 4;
  };
  
  // DEC H #0x25 Decrement register H
  this.DEC_h = function(){
	this._registers.h = (this._registers.h - 1) & 0xFF;

	this._flags.zero = this._registers.h == 0;
	this._flags.halfCarry = (this._registers.h & 0xF) == 0xF;
	this._flags.subtract = true;
	
	this._registers.m = 1;
    this._registers.t = 4;
  };
  
  // DEC L #0x2D Decrement register L
  this.DEC_l = function(){
	this._registers.l = (this._registers.l - 1) & 0xFF;

	this._flags.zero = this._registers.l == 0;
	this._flags.halfCarry = (this._registers.l & 0xF) == 0xF;
	this._flags.subtract = true;
	
	this._registers.m = 1;
    this._registers.t = 4;
  };
  
  // DEC (HL) #0x35 Decrement the value at (HL) 
  this.DEC_hlm = function(){
	var temp = this._memoryUnit.readByte(this._registers.h << 8 + this._registers.l) - 1;
	temp &= 0xFF;
	this._memoryUnit.writeByte(this._registers.h << 8 + this._registers.l, temp);
	
	this._flags.zero = temp == 0;
	this._flags.halfCarry = (temp & 0xF) == 0xF;
	this._flags.subtract = true;
	
	this._registers.m = 3;
    this._registers.t = 12;
  };
  
  // DEC A #0x3D Decrement register A
  this.DEC_a = function(){
	this._registers.a = (this._registers.a - 1) & 0xFF;

	this._flags.zero = this._registers.a == 0;
	this._flags.halfCarry = (this._registers.a & 0xF) == 0xF;
	this._flags.subtract = true;
	
	this._registers.m = 1;
    this._registers.t = 4;
  };
  
  /**--------------- End 8b DEC Operation----------------------------------------**/
  
  
  /**------------------ 16b DEC Operation----------------------------------------**/
  
  // DEC BC #0x0B Decrement BC as a 16 bit value.
  this.DEC_bc = function(){
	  this._registers.c = (this._registers.c - 1) & 0xFF;
	  if(this._registers.c == 0xFF)
		  this._registers.b = (this._registers.b - 1) & 0xFF;
	  
	  this._registers.m = 1;
	  this._registers.t = 4;
  };
  
  // DEC DE #0x1B Decrement DE as a 16 bit value.
  this.DEC_de = function(){
	  this._registers.e = (this._registers.e - 1) & 0xFF;
	  if(this._registers.e == 0xFF)
		  this._registers.d = (this._registers.d - 1) & 0xFF;
	  
	  this._registers.m = 1;
	  this._registers.t = 4;
  };
  
  // DEC HL #0x2B Decrement HL as a 16 bit value.
  this.DEC_hl = function(){
	  this._registers.l = (this._registers.l - 1) & 0xFF;
	  if(this._registers.l == 0xFF)
		  this._registers.h = (this._registers.h - 1) & 0xFF;
	  
	  this._registers.m = 1;
	  this._registers.t = 4;  
  };
  
  // DEC SP #0x3B Decrement the 16 bit Stack Pointer
  this.DEC_sp = function(){
	  this._registers.sp --;
	  this._registers.sp &= 0xFFFF;
	  	  
	  this._registers.m = 1;
	  this._registers.t = 4;  
  };
  
  /**------------------ 16b DEC Operation----------------------------------------**/
  
  /**------------------ 16b INC Operation----------------------------------------**/
  
  //INC BC #0x03 Increment BC as a 16 bit value.
  this.INC_bc = function(){
	this._registers.c = (this._registers.c + 1) & 0xFF;
	if(this._registers.c == 0) this._registers.b = (this._registers.b + 1) & 0xFF;
	
    this._registers.m = 1;
    this._registers.t = 4;
  };
  
  //INC DE #0x13 Increment DE as a 16 bit value.
  this.INC_de = function(){
	this._registers.e = (this._registers.e + 1) & 0xFF;
	if(this._registers.e == 0) this._registers.d = (this._registers.d + 1) & 0xFF;
	
    this._registers.m = 1;
    this._registers.t = 4;
  };  
  
  //INC HL #0x23 Increment HL as a 16 bit value.
  this.INC_hl = function(){
	this._registers.l = (this._registers.l + 1) & 0xFF;
	if(this._registers.l == 0) this._registers.h = (this._registers.h + 1) & 0xFF;
		
    this._registers.m = 1;
    this._registers.t = 4;
  };
  
  //INC SP #0x33 Increment SP as a 16 bit value.
  this.INC_sp = function(){
	this._registers.sp = (this._registers.sp + 1) & 0xFFFF;
	
    this._registers.m = 1;
    this._registers.t = 4;
  };
  
  /**------------------ End 16b INC Operation------------------------------------**/
  
  /**-------------------Jump Operations------------------------------------------**/
  
  //JR n #0x18 Relative jump
  this.JR_n = function(){
	  var temp = this._memoryUnit.readByte(this._registers.pc);
	  if(temp > 127) i = -((~i + 1) & 0xFF); //Checking if negative
	  this._registers.pc += (i + 1);
	  
	  this._registers.m = 3;
	  this._registers.t = 12;
  };
  
  //JR NZ, n #0x20 Relative jump if last result not zero
  this.JRNZ_n = function(){
	  var temp = this._memoryUnit.readByte(this._registers.pc);
	  if (temp > 127)
		  temp = -((~temp & 0xFF);
	  
	  this._registers.pc++;
	  this._registers.m = 2;
	  this._registers.t = 8;
	  
	  if(!this._flags.zero){
		  this._registers.pc += temp;
		  this._registers.m++;
		  this._registers.t += 4;
	  }
  };
  
  //JR Z, n #0x20 Relative jump if last result zero
  this.JRZ_n = function(){
	  var temp = this._memoryUnit.readByte(this._registers.pc);
	  if (temp > 127)
		  temp = -((~temp & 0xFF);
	  
	  this._registers.pc++;
	  this._registers.m = 2;
	  this._registers.t = 8;
	  
	  if(this._flags.zero){
		  this._registers.pc += temp;
		  this._registers.m++;
		  this._registers.t += 4;
	  }
  };
  
  //JR NC, n 0x30 Relative jump if no carry flags
  this.JRNC_n = function(){
	  var temp = this._memoryUnit.readByte(this._registers.pc);
	  if (temp > 127)
		  temp = -((~temp & 0xFF);
	  
	  this._registers.pc++;
	  this._registers.m = 2;
	  this._registers.t = 8;
	  
	  if(!this._flags.carry){
		  this._registers.pc += temp;
		  this._registers.m++;
		  this._registers.t += 4;
	  }
  };
  
  //JR C, n 0x30 Relative jump if carry flag is set
  this.JRC_n = function(){
	  var temp = this._memoryUnit.readByte(this._registers.pc);
	  if (temp > 127)
		  temp = -((~temp & 0xFF);
	  
	  this._registers.pc++;
	  this._registers.m = 2;
	  this._registers.t = 8;
	  
	  if(this._flags.carry){
		  this._registers.pc += temp;
		  this._registers.m++;
		  this._registers.t += 4;
	  }
  };
  
  /**---------------End Jump Operations------------------------------------------**/
  
  /**-------------------Misc Operations------------------------------------------**/
  
  //NOP  #0x00 (No-op)
  this.NOP = function(){
    this._registers.m = 1;
    this._registers.t = 4;
  };
  
  //STOP #0x10 (Stop...)
  this.STOP = function(){
	  //TODO
  };
  
  //CPL #0x2F (Compliment of A)
  this.CPL = function(){
	this._registers.a ^= 0xFF;
	this._flags.subtract = true;
	this._flags.halfCarry = true;
	
    this._registers.m = 1;
    this._registers.t = 4;
  };

  //CCF #0x3F (Clear Carry Flags)
  this.CCF = function(){
	this._flags.carry = !this._flags.carry;
	this._flags.subtract = false;
	this._flags.halfCarry = false;

    this._registers.m = 1;
    this._registers.t = 4;
  };
  
  //DAA #0x27 (Ready register A for BCD addition
  this.DAA = function(){
	  if(!this._flags.subtract){
		  
		  if(this._flags.carry || this._registers.a > 0x99){
			  this._registers.a = (this._registers.a + 0x60) & 0xFF;
			  this._flags.carry = true;
		  }
		  
		  if(this._flags.halfCarry || (this._registers.a + 0x0F) & 0x09){
			  this._registers.a = (this._registers.a + 0x06) & 0xFF;
			  this._flags.halfCarry = false;
		  }
		  
	  } else if(this._flags.carry && this._flags.halfCarry){
		
		  this._registers.a = (this._registers.a + 0x9A) & 0xFF;
		  this._flags.halfCarry = false;
	  
	  } else if(this._flags.carry){
		
		  this._registers.a = (this._registers.a + 0xA0) & 0xFF;
	  
	  } else if(this._flags.halfCarry){
		  
		  this._registers.a = (this._registers.a + 0xFA) & 0xFF;
		  this._flags.halfCarry = false;
	  
	  }
	  
	  this._flags.zero = this._registers.a == 0;
	  
	  //Had to do some research to find this clock time. May be wrong.
	  this._registers.m = 1;
	  this._registers.t = 4;
  };
  
  //SCF #0x37 Set carry flag
  this.SCF = function(){
	  this._flags.carry = true;
	  this._flags.subtract = false;
	  this._flags.halfCarry = false;
	  
	  this._registers.m = 1;
	  this._registers.t = 4;
  };
  
  /**-------------------END Misc Operations---------------------------------------**/
  

  //Map the instructions to their op codes.
  this._instructionMap = [
	// 00
    this.NOP,
    this.LDBCnn,
    this.LDBCmA,
	this.INC_bc,
	this.INC_b,
	this.DEC_b,
	this.LDB_n,
	this.RLCa,
	this.LDnn_SP,
	this.ADDHL_BC,
	this.LDA_BC,
	this.DEC_bc,
	this.INC_c,
	this.DEC_c,
	this.LDC_n,
	this.RRCa,
	
	// 10
	this.STOP,
	this.LDDEnn,
	this.LDDEmA,
	this.INC_de,
	this.INC_d,
	this.DEC_d,
	this.LDD_n,
	this.RLa,
	this.JR_n,
	this.ADDHL_DE,
	this.LDA_DE,
	this.DEC_de,
	this.INC_e,
	this.DEC_e,
	this.LDE_n,
	this.RRA,
	
	// 20
	this.JRNZ_n,
	this.LDHLnn,
	this.LDIHLA,
	this.INC_hl,
	this.INC_h,
	this.DEC_h,
	this.LDH_n,
	this.DAA,
	this.JRZ_n,
	this.ADDHL_HL,
	this.LDIAHL,
	this.DEC_hl,
	this.INC_l,
	this.DEC_l,
	this.LDL_n,
	this.CPL,
	
	// 30
	this.JRNC_n,
	this.LDSPnn,
	this.LDDHLA,
	this.INC_sp,
	this.INC_hlm,
	this.DEC_hlm,
	this.LDHLm_n,
	this.SCF,
	this.JRC_n,
	this.ADDHL_SP,
	this.LDDAHL,
	this.DEC_sp,
	this.INC_a,
	this.DEC_a,
	this.LDA_n,
	this.CCF,
	
	// 40
	this.LDBB,
	this.LDBC,
	this.LDBD,
	this.LDBE,
	this.LDBH,
	this.LDBL,
	this.LDB_hl,
	this.LDBA,
	this.LDCB,
	this.LDCC,
	this.LDCD,
	this.LDCE,
	this.LDCH,
	this.LDCL,
	this.LDC_hl,
	this.LDCA,
	
	//50
	this.LDDB,
	this.LDDC,
	this.LDDD,
	this.LDDE,
	this.LDDH,
	this.LDDL,
	this.LDD_hl,
	this.LDDA,
	this.LDEB,
	this.LDEC,
	this.LDED,
	this.LDEE,
	this.LDDH,
	this.LDDL,
	this.LDE_hl,
	this.LDEA,
	
	//60
	this.LDHB,
	this.LDHC,
	this.LDHD,
	this.LDHE,
	this.LDHH,
	this.LDHL,
	this.LDH_hl,
	this.LDHA,
	this.LDLB,
	this.LDLC,
	this.LDLD,
	this.LDLE,
	this.LDLH,
	this.LDLL,
	this.LDL_hl,
	this.LDLA
	
	// 70
  ];

  this.init(...arguments); //Call init with arguments passed in.
}
