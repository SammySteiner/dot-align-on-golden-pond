document.getElementById('pond_form').addEventListener('submit', function(event) {
  event.preventDefault()
  return navigateDucks()
})

function navigateDucks(){
  var boundaries = document.getElementById('pond_size').value.split(' ')
  var duckPuts = document.getElementById('duck_info').value.split(/\r?\n|\r/)
  // remove spaces from before and after the string (before the split)
  // remove all spaces preceded by a space
  var inDuckStions = []
  for (var i = 0; i < duckPuts.length; i++) {
    if (i === 0 || i % 2 === 0) {
      inDuckStions.push(duckPuts[i].split(' ').concat(duckPuts[i + 1].split(' ')))
    }
  }
  var whereAreTheyNow = []
  if (validateInputs(boundaries, duckPuts)) {
    for(var i = 0; i < inDuckStions.length; i++){
      var movement = inDuckStions[i].slice(3, inDuckStions[i].length)
      var coords = [inDuckStions[i][0], inDuckStions[i][1], inDuckStions[i][2]]
      whereAreTheyNow.push(moveDuck(coords, movement, boundaries))
    }
  }
  var outputText = whereAreTheyNow.map(t => {
    return `<p>${t.join(' ')}</p>`
  }).join('')
  document.getElementById('output').innerHTML = (`<label>Output:</label><br> ${outputText}`)
  viewOutput()
}

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
      if (validateMovement(coords, m, boundaries)) {
        switch (coords[2]) {
          case 'N':
            if (!(newCoords[1] === boundaries[1])) {
              newCoords[1] = coords[1] + 1
            }
            break
          case 'S':
            if (!(newCoords[1] === 0)) {
              newCoords[1] = coords[1] - 1
            }
            break
          case 'E':
            if (!(newCoords[0] === boundaries[0])) {
              newCoords[0] = coords[0] + 1
            }
            break
          case 'W':
            if (!(newCoords[0] === 0)) {
              newCoords[0] = coords[0] - 1
            }
            break
        }
      }
    }
  })
  return newCoords
}

function validateInputs(boundaries, duckPuts){
  return true
  // only allow spaces and numbers
  // split the duckputs into coords, direction, movement
  // make sure coords are within bounaries
  // make sure direction is included in the cardinals
  // validate each movement of the duckput
}

function validateMovement(m){
  return true
}

function validateDirection(d){
  return true
}

function viewOutput(){
  document.getElementById('output').style.display = 'inline'
}
