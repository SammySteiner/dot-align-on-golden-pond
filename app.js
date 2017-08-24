function runOnGoldenPond(input){

  var parsedInputs = new StringParser(input)
  var validator = new Validation(input)
  var [firstLine, otherLines] = [parsedInputs.firstLine, parsedInputs.otherLines]

  var pond = parsedInputs.parsePond(firstLine)
  var ducks = parsedInputs.parseDucks(otherLines)
  var instructions = parsedInputs.parseInstructions(otherLines)

  pond.fillWithDucks(ducks)
  if (validator.validatePond(pond) && validator.validateAllInstructions(instructions)) {
    pond.moveDucks(instructions)
    return pond.ducks
  }
  return 'error'
}
