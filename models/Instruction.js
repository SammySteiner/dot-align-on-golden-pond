class Instruction {
  constructor(movements) {
    this.movements = movements
    // movements is a duck object pointing to an array of movemnts
  }

  static Parse(otherLines){
    var instructions = []
    for (var i = 0; i < otherLines.length; i++) {
      if (i === 1 || i % 2 === 1) {
        var movements = otherLines[i].toUpperCase().trim().split('')
        instructions.push(new Instruction(movements))
      }
    }
    return instructions
  }
}
