class Pond {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.ducks = []
  }

  fillWithDucks(ducks){
    ducks.forEach( d => this.ducks.push(d))
  }

  moveDucks(set_of_instructions){
    for (var i = 0; i < this.ducks.length; i++) {
      this.ducks[i].move(this, set_of_instructions[i])
    }
  }

}
