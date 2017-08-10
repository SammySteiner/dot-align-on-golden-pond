class Pond {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.ducks = []
  }

  static Parse(firstLine){
    var integers = firstLine.split(' ').map(i => parseInt(i))
    var [x, y] = integers
    return new Pond(x, y)
  }

  fillWithDucks(ducks){
    this.ducks = ducks
  }

  moveDucks(instructions){
    for (var i = 0; i < this.ducks.length; i++) {
      var duck = this.ducks[i]
      var movements = instructions[i].movements
      duck.move(this, movements)
    }
  }
}
