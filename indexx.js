document.getElementById('pond_form').addEventListener('submit', function(event) {
  event.preventDefault()
  runOnGoldenPond()
})

// When the submit button is pressed:
function runOnGoldenPond(){
  if (runValidations()) {
    var pond = createPondFromBoundaries()
    var ducks = createDucksFromInputs()
    var set_of_instructions = createInstrunctionsFromInputs()
    pond.fillWithDucks(ducks)
    if (validateAllInstructions(set_of_instructions) && validatePond(pond)) {
      pond.moveDucks(set_of_instructions)
      displayOutput(pond.ducks)
    }
  }
}

function getBoundariesFromInputs(){
  var boundariesRaw = document.getElementById('pond_size').value
  var boundariesText = boundariesRaw.toUpperCase().trim().replace(/  +/g, ' ').split(' ')
  var boundaries = boundariesText.map( b => parseInt(b, 10))
  return boundaries
}

function createPondFromBoundaries(){
  boundaries = getBoundariesFromInputs()
  return new Pond(boundaries[0], boundaries[1])
}

function getDuckLocationsFromInputs(){
  var duckLocations = []
  var duckPutsRaw = document.getElementById('duck_info').value
  var allDuckPuts = duckPutsRaw.toUpperCase().trim().split(/\r?\n|\r/)
  for (var i = 0; i < allDuckPuts.length; i++) {
    if (i === 0 || i % 2 === 0) {
      var duckPutsText = allDuckPuts[i].split(' ')
      var x = parseInt(duckPutsText[0])
      var y = parseInt(duckPutsText[1])
      duckLocations.push({x: x, y: y, orientation: duckPutsText[2]})
    }
  }
  return duckLocations
}

function createDucksFromInputs(){
  var ducks = []
  var duckLocations = getDuckLocationsFromInputs()
  duckLocations.forEach( loc => {
    ducks.push(new Duck(loc.x, loc.y, loc.orientation))
  })
  return ducks
}

function createInstrunctionsFromInputs(){
  var duckInstructions = []
  var duckPutsRaw = document.getElementById('duck_info').value
  var allDuckPuts = duckPutsRaw.toUpperCase().trim().split(/\r?\n|\r/)
  for (var i = 0; i < allDuckPuts.length; i++) {
    if (i % 2 === 1) {
      var duckStructionsArr = allDuckPuts[i].split('')
      duckInstructions.push(duckStructionsArr)
    }
  }
  return duckInstructions

}
// 8. Compose output
function composeOutput(ducks){
  var outputText = ducks.map(duck => `<p>${duck.x} ${duck.y} ${duck.orientation}</p>`).join('')
  return outputText
}

function sendOutputToDom(text){
  document.getElementById('output').innerHTML = (`<label>Output:</label><br> ${text}`)
}
// 9. Append output to the DOM
function displayOutput(ducks){
  var outputText = composeOutput(ducks)
  sendOutputToDom(outputText)
  viewOutput()
}

function viewOutput(){
  document.getElementById('output').style.display = 'inline'
}

function hideOutput(){
  document.getElementById('output').style.display = 'none'
}
