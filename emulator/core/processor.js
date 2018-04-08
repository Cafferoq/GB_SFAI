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
    //TODO
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

  //NOP  #0x00
  this.NOP = function(){
    this._registers.m = 1;
    this._registers.t = 4;
  };

  //Map the instructions to their op codes.
  this._instructionMap = [
    this.NOP
  ];

  this.init(...arguments); //Call init with arguments passed in.
}
