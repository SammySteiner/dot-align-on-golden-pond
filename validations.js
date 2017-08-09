function runValidations(){
  var boundariesRaw = document.getElementById('pond_size').value
  var boundaries = boundariesRaw.toUpperCase().trim().replace(/  +/g, ' ').split(' ')

  var duckPutsRaw = document.getElementById('duck_info').value
  var duckPuts = duckPutsRaw.toUpperCase().trim().split(/\r?\n|\r/)

  if (validateBoundaries(boundaries) && validateDuckPuts(duckPuts) ) {
    return true
  }
}

function validateBoundaries(boundaries){
  if (boundaries.length === 2 && !boundaries.some(isNaN)) {
    return true
  }
  alert('boundaries must contain only 2 numbers seperated by a space.')
}

function validateDuckPuts(duckPuts){
  if (duckPuts.length % 2 === 0) {
    return true
  }
  alert('Duck Info must contain two lines per duck with starting coordinates followed by movement instructions.')
}

function validatePondBoundaries(pond){
  if (typeof pond.x === 'number') {
    if (typeof pond.y === 'number') {
      return true
    }
  }
  alert('Pond Size must contain only 2 numbers seperated by a space.')
}

function validatePond(pond){
  if (validatePondBoundaries(pond)) {
    var counter = 0
    pond.ducks.forEach(d => {
      if (validateDuck(d, pond)) {
        counter += 1
      }
    })
    if (counter === pond.ducks.length) {
      return true
    }
  }
  alert('a')
}

function validateDuck(duck, pond){
  if (typeof duck.x === 'number' && duck.x <= pond.x && duck.x >= 0) {
    if (typeof duck.y === 'number' && duck.y <= pond.y && duck.y >= 0) {
      if (validateDirection(duck.orientation)) {
        return true
      }
    }
  }
  alert("Duck starting location must contain two numbers and a direction, represented by N, E, S, or W. Each element must be seperated by a space. Each duck's starting coordinates must be within the pond size. Duck movement instructions must be written as either S, P, or F.")
}

function validateAllInstructions(set_of_instructions){
  var counter = 0
  set_of_instructions.forEach( instructions => {
    if (validateInstructions(instructions)) {
      counter += 1
    }
  })
  if (counter === set_of_instructions.length) {
    return true
  }
  alert("Duck Instructinos must begin with a duck's coordinates. The duck's instructions must be written as a set of letters 'P', 'S', and 'F.'")
}

function validateInstructions(instructions){
  var counter = 0
  instructions.forEach( i => {
    if (validateMovement(i)) {
      counter += 1
    }
  })
  if (counter === instructions.length) {
    return true
  }
}

function validateInDuckStions(inDuckStions, boundaries){
  var counter = 0
  inDuckStions.forEach( duck => {
    if (typeof(parseInt(duck[0], 10)) !== 'number' || typeof(parseInt(duck[1], 10)) !== 'number' || !validateDirection(duck[2]) ) {
      alert("Duck starting location must contain two numbers and a direction, represented by N, E, S, or W. Each element must be seperated by a space.")
      counter++
      return false
    }
    if (parseInt(duck[0], 10) > parseInt(boundaries[0], 10) || parseInt(duck[1], 10) > parseInt(boundaries[1], 10)) {
      alert('Duck starting coordinates must be within the pond size.')
      counter++
      return false
    }
    for (var i = 3; i < duck.length; i++) {
      if(!validateMovement(duck[i])) {
        alert('Duck movement instructions must be written as either S, P, or F.')
        counter++
        return false
      }
    }
  })
  return counter === 0 ? true : false
}

const validateMovement = m => ['P', 'S', 'F'].includes(m)

const validateDirection = d => ['N', 'S', 'E', 'W'].includes(d)
