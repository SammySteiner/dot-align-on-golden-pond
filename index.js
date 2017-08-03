document.getElementById('pond_form').addEventListener('click', function(event) {
  event.preventDefault()
  return navigateDucks()
})

function navigateDucks(){
  // get pond boundaries
  var boundaries = document.getElementById('pond_size').value.split(' ')
  // split the duck lists into an array of duck info arrays
  var duckPuts = document.getElementById('duck_info').value.split(/\r?\n|\r/)
  var inDuckStions = []
  for (var i = 0; i < duckPuts.length; i++) {
    if (i === 0 || i % 2 === 0) {
      inDuckStions.push(duckPuts[i].concat(duckPuts[i + 1]))
    }
  }
  var whereAreTheyNow = []
  if (validateInputs(boundaries, duckPuts)) {
    for(var i = 0; i < inDuckStions.length; i++){
      var movement = inDuckStions[i].slice(2, inDuckStions[i].length - 1)
      if (validateMovement(coords, movement, boundaries)) {
        moveDuck([inDuckStions[i][0], inDuckStions[i][1], inDuckStions[i][2]], movement, boundaries)
      }
    }
  }
  // loop over the array and for each duck with a map function
    // modify their starting position based on the inputs
    // validate that the duck doesn't go out of bounds
    // assign the return value to a variable
  // Format output
  // append output to output field
  // Make the output field visible
  viewOutput()
}

function moveDuck(coords, movement, boundaries){
  var newCoords = coords
  var dirS = {
    'N': 'E',
    'E': 'S',
    'S': 'W',
    'W': 'N'
  }
  var dirP = {
    'N': 'W',
    'E': 'N',
    'S': 'E',
    'W': 'S'
  }
  movement.forEach( m => {
    if (m === 'P') {
      newCoords[2] = dirP[coords[2]]
    } else if (m === 'S') {
      newCoords[2] = dirS[coords[2]]
    } else {
      if (validateMovement(coords, m, boundaries)) {
        switch (coords[2]) {
          case 'N':
            newCoords[1] = coords[1] + 1
            break
          case 'S':
            newCoords[1] = coords[1] - 1
            break
          case 'E':
            newCoords[0] = coords[0] + 1
            break
          case 'W':
            newCoords[0] = coords[0] - 1
            break
        }
      }
    }
  })
  return newCoords
}

function validateInputs(boundaries, duckPuts){
  return true
}

function validateMovement(coords, m, boundaries){
  return true
}

function viewOutput(){
  document.getElementById('output').style.display = 'inline'
}
