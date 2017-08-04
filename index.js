// Submit Listener
document.getElementById('pond_form').addEventListener('submit', function(event) {
  event.preventDefault()
  navigateDucks()
})

// Runner Function
function navigateDucks(){
  var boundariesRaw = document.getElementById('pond_size').value
  var boundaries = boundariesRaw.toUpperCase().trim().replace(/  +/g, ' ').split(' ')

  var duckPutsRaw = document.getElementById('duck_info').value
  var duckPuts = duckPutsRaw.toUpperCase().trim().split(/\r?\n|\r/)

  var inDuckStions = duckPutsToInstructions(duckPuts)
  var whereAreTheyNow = []
  if (validateBoundaries(boundaries) && validateInDuckStions(inDuckStions, boundaries)) {
    for(var i = 0; i < inDuckStions.length; i++){
      var movement = inDuckStions[i].slice(3, inDuckStions[i].length)
      var coords = [inDuckStions[i][0], inDuckStions[i][1], inDuckStions[i][2]]
      whereAreTheyNow.push(moveDuck(coords, movement, boundaries))
    }
  }
  stringFormatAndOutput(whereAreTheyNow)
  viewOutput()
}

// Runner Helpers

function duckPutsToInstructions(duckPuts) {
  var inDuckStions = []
  if (validateDuckPuts(duckPuts)) {
    for (var i = 0; i < duckPuts.length; i++) {
      if (i === 0 || i % 2 === 0) {
        inDuckStions.push(duckPuts[i].trim().split(' ').concat(duckPuts[i + 1].trim().split('')))
      }
    }
  }
  return inDuckStions
}

function stringFormatAndOutput(whereAreTheyNow){
  var outputText = whereAreTheyNow.map(t => {
    return `<p>${t.join(' ')}</p>`
  }).join('')
  document.getElementById('output').innerHTML = (`<label>Output:</label><br> ${outputText}`)
}

function viewOutput(){
  document.getElementById('output').style.display = 'inline'
}

// Ducky Computation

function moveDuck(coords, movement, boundaries){
  var newCoords = coords
  var dirS = {'N': 'E', 'E': 'S', 'S': 'W', 'W': 'N'}
  var dirP = {'N': 'W', 'E': 'N', 'S': 'E', 'W': 'S'}
  movement.forEach( m => {
    if (m === 'P') {
      newCoords[2] = dirP[coords[2]]
    } else if (m === 'S') {
      newCoords[2] = dirS[coords[2]]
    } else {
      switch (coords[2]) {
        case 'N':
          if (!(parseInt(newCoords[1], 10) === parseInt(boundaries[1], 10))) {
            newCoords[1] = parseInt(coords[1], 10) + 1
          }
          break
        case 'S':
          if (!(parseInt(newCoords[1], 10) === 0)) {
            newCoords[1] = parseInt(coords[1], 10) - 1
          }
          break
        case 'E':
          if (!(parseInt(newCoords[0], 10) === parseInt(boundaries[0], 10))) {
            newCoords[0] = parseInt(coords[0], 10) + 1
          }
          break
        case 'W':
          if (!(parseInt(newCoords[0], 10) === 0)) {
            newCoords[0] = parseInt(coords[0], 10) - 1
          }
          break
      }
    }
  })
  return newCoords
}

// Validations

function validateBoundaries(boundaries){
  if (boundaries.length > 2 || boundaries.some(isNaN)) {
    alert('boundaries must contain only 2 numbers seperated by a space.')
    return false
  }
  return true
}

function validateDuckPuts(duckPuts){
  if (duckPuts.length % 2 !== 0) {
    alert('Duck Info must contain two lines per duck with starting coordinates followed by movement instructions.')
    return false
  }
  return true
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
