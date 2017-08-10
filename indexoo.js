document.getElementById('pond_form').addEventListener('submit', function(event) {
  event.preventDefault()
  if (inputValidations()) {
    var input = returnInputs()
    var updatedPond = runOnGoldenPond(input)
    updatedPond === 'error' ? hideOutput() : displayOutput(updatedPond)
  } else {
    hideOutput()
  }
})

function returnInputs(){
  var input = ''
  var boundaries = document.getElementById('pond_size').value.trim().replace(/  +/g, ' ')
  var ducksAndInstructions = document.getElementById('duck_info').value.toUpperCase().trim()
  input += boundaries
  input += '\n'
  input += ducksAndInstructions
  return input
}

function displayOutput(ducks){
  var outputText = composeOutput(ducks)
  sendOutputToDom(outputText)
  viewOutput()
}

function composeOutput(ducks){
  var outputText = ducks.map(duck => `<p>${duck.x} ${duck.y} ${duck.orientation}</p>`).join('')
  return outputText
}

function sendOutputToDom(text){
  document.getElementById('output').innerHTML = (`<label>Output:</label><br> ${text}`)
}

function viewOutput(){
  document.getElementById('output').style.display = 'inline'
}

function hideOutput(){
  document.getElementById('output').style.display = 'none'
}
