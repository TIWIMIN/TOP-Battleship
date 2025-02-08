import { Gameboard } from "./gameboard";

export class Player {
  #gameboard;
  #name;
  #isBot;   
  constructor(name, isBot) {
    this.#gameboard = new Gameboard(); 
    this.#name = name; 
    if (isBot) this.#isBot = true; 
    else this.#isBot = false; 
  }

  getName() {
    return this.#name; 
  }

  getGameboard() {
    return this.#gameboard; 
  }
}
