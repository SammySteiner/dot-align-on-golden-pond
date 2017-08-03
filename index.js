document.getElementById('pond_form').addEventListener('click', function(event) {
  event.preventDefault()
  return navigateDucks()
})

function navigateDucks(){
  // get pond boundaries
  var boundaries = document.getElementById('pond_size').value.split(' ')
  // split the duck lists into an array of duck info arrays
  var duck_instructions = document.getElementById('duck_info').value.split(/\r?\n|\r/)
  // loop over the array and for each duck with a map function
    // modify their starting position based on the inputs
    // validate that the duck doesn't go out of bounds
    // assign the return value to a variable
  // Format output
  // append output to output field
  // Make the output field visible
  viewOutput()
}

function moveDuck(coords, movement){

}

function validateMovement(coords, movement, boundaries){
  
}

function viewOutput(){
  document.getElementById('output').style.display = 'inline'
}
