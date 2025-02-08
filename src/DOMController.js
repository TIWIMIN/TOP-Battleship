import { Player } from "./player";

export class DOMController {
  #playScreenContainer = document.querySelector(".play-screen-container");

  #gameInitializationContainer = document.querySelector(
    ".game-initialization-container"
  );
  #playerOneNameInput = document.querySelector("input.player-one-name-input");
  #gameInitializationSubmit = document.querySelector(
    "button.game-initialization-submit"
  );

  #gameContainer = document.querySelector(".game-container");
  #playerOneBoard = document.querySelector(".player-one-board");
  #playerTwoBoard = document.querySelector(".player-two-board");
  constructor() {
    this.clearScreen();
    this.renderGameInitialization();
  }

  clearScreen() {
    this.#playScreenContainer.textContent = "";
  }

  renderGameInitialization() {
    this.#playScreenContainer.appendChild(this.#gameInitializationContainer);
    this.#gameInitializationSubmit.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const playerOne = new Player(this.#playerOneNameInput.value, false);
      const playerTwo = new Player(CPU, true);
      this.clearScreen(); 
      this.renderGame(playerOne, playerTwo); 
    });
  }

  renderGame(playerOne, playerTwo) {
    this.#playScreenContainer.appendChild(this.#gameContainer);
  }
}
