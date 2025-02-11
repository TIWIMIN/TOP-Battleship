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

  #gameOverContainer = document.querySelector(".game-over-container");
  #gameOverMessage = document.querySelector(".game-over-message");
  #newGameButton = document.querySelector("button.new-game");

  constructor() {
    this.clearScreen();
    this.renderGameInitialization();
  }

  clearScreen() {
    this.#playScreenContainer.textContent = "";
    this.#playerOneBoard.textContent = "";
    this.#playerTwoBoard.textContent = "";
  }

  renderGameInitialization() {
    this.#playScreenContainer.appendChild(this.#gameInitializationContainer);
    this.#gameInitializationSubmit.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.#playerOne = new Player(this.#playerOneNameInput.value, false);
      this.#playerTwo = new Player("CPU", true);
      this.#playerOne.populateBoard();
      this.#playerTwo.populateBoard();
      this.clearScreen();
      this.renderPlayerOneTurn();
    });
  }

  renderPlayerOneTurn() {
    this.#playScreenContainer.appendChild(this.#gameContainer);
    for (const [x, row] of this.#playerTwo.getGameboard().getBoard().entries()) {
      for (const [y, cell] of row.entries()) {
        const cellOnDOM = document.createElement("button");
        cellOnDOM.classList.add("cell");
        if (cell === "hit") cellOnDOM.classList.add("hit");
        else if (cell === "miss") cellOnDOM.classList.add("miss");
        else cellOnDOM.classList.add("empty");

        if (cell !== "hit" && cell !== "miss") {
          cellOnDOM.addEventListener("click", (e) => {
            e.stopPropagation();
            this.#playerTwo.getGameboard().receiveAttack(x, y);
            if (this.#playerTwo.getGameboard().areAllShipsSunk()) {
              this.clearScreen();
              this.renderGameOver(this.#playerOne.getName());
            } else {
              this.clearScreen();
              this.renderPlayerTwoTurn();
            }
          });
        }
        this.#playerOneBoard.appendChild(cellOnDOM);
      }
    }

    for (const [x, row] of this.#playerOne.getGameboard().getBoard().entries()) {
      for (const [y, cell] of row.entries()) {
        const cellOnDOM = document.createElement("button");
        cellOnDOM.classList.add("cell");
        if (cell === "null") cellOnDOM.classList.add("empty");
        else if (cell === "hit") cellOnDOM.classList.add("hit");
        else if (cell === "miss") cellOnDOM.classList.add("miss");
        else cellOnDOM.classList.add("ship");
        this.#playerTwoBoard.appendChild(cellOnDOM);
      }
    }
  }

  renderPlayerTwoTurn() {
    this.#playScreenContainer.appendChild(this.#gameContainer);
    for (const [x, row] of this.#playerTwo.getGameboard().getBoard().entries()) {
      for (const [y, cell] of row.entries()) {
        const cellOnDOM = document.createElement("button");
        cellOnDOM.classList.add("cell");
        if (cell === "hit") cellOnDOM.classList.add("hit");
        else if (cell === "miss") cellOnDOM.classList.add("miss");
        else cellOnDOM.classList.add("empty");
        this.#playerOneBoard.appendChild(cellOnDOM);
      }
    }
    for (const [x, row] of this.#playerOne.getGameboard().getBoard().entries()) {
      for (const [y, cell] of row.entries()) {
        const cellOnDOM = document.createElement("button");
        cellOnDOM.classList.add("cell");
        if (cell === "null") cellOnDOM.classList.add("empty");
        else if (cell === "hit") cellOnDOM.classList.add("hit");
        else if (cell === "miss") cellOnDOM.classList.add("miss");
        else cellOnDOM.classList.add("ship");
        this.#playerTwoBoard.appendChild(cellOnDOM);
      }
    }
    this.#playerOne.getGameboard().receiveRandomAttack();
    if (this.#playerOne.getGameboard().areAllShipsSunk()) {
      this.clearScreen();
      this.renderGameOver(this.#playerOne.getName());
    } else {
      this.clearScreen();
      this.renderPlayerOneTurn();
    }
  }

  renderGameOver(winner) {
    this.#playScreenContainer.appendChild(this.#gameOverContainer);
    this.#gameOverMessage.textContent = `Congratulations, ${winner} has won!`;
    this.#newGameButton.addEventListener("click", (e) => {
      e.preventDefault(); 
      e.stopPropagation(); 
      this.clearScreen(); 
      this.renderGameInitialization(); 
    });
  }
}
