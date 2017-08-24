class Duck {
  constructor(x, y, orientation) {
    this.x = x
    this.y = y
    this.orientation = orientation
  }


  move(pond, instructions){
    instructions.forEach( i => {
      if (this.canMove(pond, i)) {
        this.takeStep(i)
      }
    })
  }

  canMove(pond, instruction){
    if (instruction === 'P') {
      return true
    } else if (instruction === 'S') {
      return true
    } else {
      switch (this.orientation) {
        case 'N':
          return this.y < pond.y ? true : false
        case 'S':
          return this.y > 0 ? true : false
        case 'E':
          return this.x < pond.x ? true : false
        case 'W':
          return this.x > 0 ? true : false
      }
    }
  }

  takeStep(instruction){
    if (instruction === 'P') {
      this.turnPort()
    } else if (instruction === 'S') {
      this.turnStarboard()
    } else if (instruction === 'F'){
      this.moveForward()
    }
  }

  turnStarboard(){
    var starboardHash = {'N': 'E', 'E': 'S', 'S': 'W', 'W': 'N'}
    this.orientation =  starboardHash[this.orientation]
  }

  turnPort(){
    var portHash = {'N': 'W', 'E': 'N', 'S': 'E', 'W': 'S'}
    this.orientation = portHash[this.orientation]
  }

  moveForward(){
    switch (this.orientation) {
      case 'N':
        this.y += 1
        break
      case 'S':
        this.y -= 1
        break
      case 'E':
        this.x += 1
        break
      case 'W':
        this.x -= 1
        break
    }
  }

}
