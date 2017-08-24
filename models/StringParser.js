class StringParser {
  constructor(input) {
 [this.firstLine, this.otherLines] = StringParser.turnInputsToLines(input)
  }

  static turnInputsToLines(input){
    var lines = input.split('\n')
    var firstLine = lines[0].split(' ')
    var otherLines = lines.slice(1)
    return [firstLine, otherLines]
  }

  parsePond(firstLine){
    var integers = firstLine.map(i => parseInt(i))
    var [x, y] = integers
    return new Pond(x, y)
  }

  parseDucks(otherLines){
    var ducks = []
    for (var i = 0; i < otherLines.length; i++) {
      if (i === 0 || i % 2 === 0) {
        var duck = otherLines[i].toUpperCase().trim().replace(/  +/g, ' ').split(' ')
        var x = parseInt(duck[0])
        var y = parseInt(duck[1])
        var orientation = duck[2]
        ducks.push(new Duck(x, y, orientation))
      }
    }
    return ducks
  }

  parseInstructions(otherLines){
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
