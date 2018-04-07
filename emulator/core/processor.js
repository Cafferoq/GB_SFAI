var Z80 = function(){
  this._clock;        //The Artifical Z80's clock
  this._registers;    //An object containing all of the Z80'a registers
  this._memoryUnit;   //The memory unit that actually read/writes.
  this._flags;        //The flags register of the Z-80, but as bools.

  /**
   * Initializes the flags and the registers in the "Z80"
   *
   * @param mmu - The memory unit to be used in read and write instructions.
   */
  this.init = function(mmu){

    this._memoryUnit = mmu;

    this._clock = {
      m: 0, t: 0
    };

    this._flags = {
      zero : true,
      subtract : false,
      halfCarry : true,
      carry : true
    };

    this._registers = {
      a:0, b:0, c:0, d:0, e:0, h:0, l:0,     //8b registers
      pc:0, sp:0,                            //Program Counter, Stack Pointer
      m:0, t:0                               //Clock at last instruction
    };
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

  //NOP  #0x00
  this.NOP = function(){
    this._registers.m = 1;
    this._registers.t = 4;
  };

  this.init(...arguments); //Call init with arguments passed in.
}
