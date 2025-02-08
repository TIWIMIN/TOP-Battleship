import { Gameboard } from "./gameboard";

export class Player {
  #gameBoard;
  #name;
  #isBot;   
  constructor(name, isBot) {
    this.#gameBoard = new Gameboard(); 
    this.#name = name; 
    if (isBot) this.#isBot = true; 
    else this.#isBot = false; 
  }
}
