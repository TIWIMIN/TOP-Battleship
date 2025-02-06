export class Ship {
  #length
  #hitPoints; 
  constructor(length) {
    this.#length = length; 
    this.#hitPoints = length; 
  }

  getHP() {
    return this.#hitPoints; 
  }

  hit() {
    if (this.#hitPoints > 0) {
        this.#hitPoints -= 1; 
    }
  }

  isSunk() {
    if (this.#hitPoints > 0) {
        return false; 
    }
    return true; 
  }

}
