class Validation {
  constructor(input) {
    this.input = input
  }

  firstLine(){
    return new StringParser(this.input).firstLine
  }

  otherLines(){
    return new StringParser(this.input).otherLines
  }

  validateInputs(){
    if (this.validateBoundaries() && this.validateDuckPuts()) {
      return true
    }
  }

  validateBoundaries(){
    var coordinates = this.firstLine()
    if (coordinates.length === 2 && !coordinates.some(isNaN)) {
      return true
    }
    alert('boundaries must contain only 2 numbers seperated by a space.')
  }

  validateDuckPuts(){
    var duckPuts = this.otherLines()
    if (duckPuts.length % 2 === 0) {
      return true
    }
    alert('Duck Info must contain two lines per duck with starting coordinates followed by movement instructions.')
  }

  validatePond(pond){
    if (this.validatePondBoundaries(pond)) {
      var counter = 0
      pond.ducks.forEach(d => {
        if (this.validateDuck(d, pond)) {
          counter += 1
        }
      })
      if (counter === pond.ducks.length) {
        return true
      }
    }
  }

  validatePondBoundaries(pond){
    if (typeof pond.x === 'number') {
      if (typeof pond.y === 'number') {
        return true
      }
    }
    alert('Pond Size must contain only 2 numbers seperated by a space.')
  }

  validateDuck(duck, pond){
    if (typeof duck.x === 'number' && duck.x <= pond.x && duck.x >= 0) {
      if (typeof duck.y === 'number' && duck.y <= pond.y && duck.y >= 0) {
        if (this.validateDirection(duck.orientation)) {
          return true
        }
      }
    }
    alert("Duck starting location must contain two numbers and a direction, represented by N, E, S, or W. Each element must be seperated by a space. Each duck's starting coordinates must be within the pond size. Duck movement instructions must be written as either S, P, or F without spaces.")
  }

  validateDirection(d){
    return ['N', 'S', 'E', 'W'].includes(d)
  }

  validateAllInstructions(instructions){
    var counter = 0
    instructions.forEach( instruction => {
      if (this.validateInstructions(instruction.movements)) {
        counter += 1
      }
    })
    if (counter === instructions.length) {
      return true
    }
    alert("Duck Instructinos must begin with a duck's coordinates. The duck's instructions must be written as a set of letters 'P', 'S', and 'F', without spaces.")
  }

  validateInstructions(instructions){
    var counter = 0
    instructions.forEach( i => {
      if (this.validateMovement(i)) {
        counter += 1
      }
    })
    if (counter === instructions.length) {
      return true
    }
  }

  validateMovement(m){
    return ['P', 'S', 'F'].includes(m)
  }
}
