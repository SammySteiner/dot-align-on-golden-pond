class Duck {
  constructor(x, y, orientation) {
    this.x = x
    this.y = y
    this.orientation = orientation
  }

  static Parse(otherLines){
    var ducks = []
    for (var i = 0; i < otherLines.length; i++) {
      if (i === 0 || i % 2 === 0) {
        var duck = otherLines[i].toUpperCase().trim().replace(/  +/g, ' ').split(' ')
        var x = parseInt(duck[0])
        var y = parseInt(duck[1])
        var orientation = duck[2]
        ducks.push(new Duck(x, y, orientation))
      }
    }
    return ducks
  }

  move(pond, instructions){
    instructions.forEach( i => {
      if (this.canMove(pond, i)) {
        this.oneStep(i)
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
          if (this.y < pond.y) {
            return true
          }
          return false
        case 'S':
          if (this.y > 0) {
            return true
          }
          return false
        case 'E':
          if (this.x < pond.x) {
            return true
          }
          return false
        case 'W':
          if (this.x > 0) {
            return true
          }
          return false
        }
      }
    }

  oneStep(instruction){
    var dirS = {'N': 'E', 'E': 'S', 'S': 'W', 'W': 'N'}
    var dirP = {'N': 'W', 'E': 'N', 'S': 'E', 'W': 'S'}

    if (instruction === 'P') {
      this.orientation = dirP[this.orientation]
    } else if (instruction === 'S') {
      this.orientation = dirS[this.orientation]
    } else if (instruction === 'F'){
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

}