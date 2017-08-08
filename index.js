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
  var whereAreTheyNow = instructionsToMovement(boundaries, inDuckStions)
  if (whereAreTheyNow.length !== 0) {
    stringFormatAndOutput(whereAreTheyNow)
    viewOutput()
  } else {
    hideOutput()
  }
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

function instructionsToMovement(boundaries, inDuckStions){
  var dirS = {'N': 'E', 'E': 'S', 'S': 'W', 'W': 'N'}
  var dirP = {'N': 'W', 'E': 'N', 'S': 'E', 'W': 'S'}
  var whereAreTheyNow = []
  if (validateBoundaries(boundaries) && validateInDuckStions(inDuckStions, boundaries)) {
    for(var i = 0; i < inDuckStions.length; i++){
      var movement = inDuckStions[i].slice(3, inDuckStions[i].length)
      var coords = [inDuckStions[i][0], inDuckStions[i][1], inDuckStions[i][2]]
      whereAreTheyNow.push(moveDuck(coords, movement, boundaries, dirS, dirP))
    }
  }
  return whereAreTheyNow
}

// DOM Manipulation

function stringFormatAndOutput(whereAreTheyNow){
  var outputText = whereAreTheyNow.map(t => `<p>${t.join(' ')}</p>`).join('')
  document.getElementById('output').innerHTML = (`<label>Output:</label><br> ${outputText}`)
}

function viewOutput(){
  document.getElementById('output').style.display = 'inline'
}

function hideOutput(){
  document.getElementById('output').style.display = 'none'
}

// Ducky Computation

function moveDuck(coords, movement, boundaries, dirS, dirP){
  var newCoords = coords
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
