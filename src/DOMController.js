import { Player } from "./player";

export class DOMController {
  #playerOne;
  #playerTwo;
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
      this.#playerOne = new Player(this.#playerOneNameInput.value, false);
      this.#playerTwo = new Player(CPU, true);
      this.clearScreen();
      this.renderGame(playerOne, playerTwo);
    });
  }

  renderGame() {
    this.#playScreenContainer.appendChild(this.#gameContainer);
    for (const row of this.#playerOne.getGameboard().getBoard()) {
      for (const cell of row) {
        const cellOnDOM = document.createElement("button");
        cellOnDOM.classList.add("cell");
        if (cell === null) cellOnDOM.classList.add("empty");
        else if (cell === "hit") cellOnDOM.classList.add("hit");
        else if (cell === "miss") cellOnDOM.classList.add("miss");
        else cellOnDOM.classList.add("ship");
        this.#playerOneBoard.appendChild(cellOnDOM);
      }
    }
    for (const row of this.#playerTwo.getGameboard().getBoard()) {
      for (const cell of row) {
        const cellOnDOM = document.createElement("button");
        cellOnDOM.classList.add("cell");
        if (cell === null) cellOnDOM.classList.add("empty");
        else if (cell === "hit") cellOnDOM.classList.add("hit");
        else if (cell === "miss") cellOnDOM.classList.add("miss");
        else cellOnDOM.classList.add("ship");
        this.#playerTwoBoard.appendChild(cellOnDOM);
      }
    }
  }
}
