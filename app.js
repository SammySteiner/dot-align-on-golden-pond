function runOnGoldenPond(input){
  var [firstLine, otherLines] = turnInputsToLines(input)

  var pond = Pond.Parse(firstLine)
  var ducks = Duck.Parse(otherLines)
  var instructions = Instruction.Parse(otherLines)

  pond.fillWithDucks(ducks)
  if (validatePond(pond) && validateAllInstructions(instructions)) {
    pond.moveDucks(instructions)
    return pond.ducks
  }
  return 'error'
}

function turnInputsToLines(input){
  var lines = input.split('\n')
  var firstLine = lines[0]
  var otherLines = lines.slice(1)
  return [firstLine, otherLines]
}
