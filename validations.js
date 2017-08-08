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
