import { Ship } from "./ship";

export class Gameboard {
  #width;
  #height;
  #board;
  #shipMap;

  constructor() {
    this.#width = 10;
    this.#height = 10;
    this.#board = new Array(10).fill(null).map(() => new Array(10).fill(null));
    this.#shipMap = new Map();
  }

  placeShip(shipName, x, y) {
    const length = this.#shipNameToLength(shipName);
    if (!this.#isValidPlacement(length, x, y)) return false;

    const ship = new Ship(length);
    this.#shipMap.set(shipName, ship);
    for (let i = y; i < y + length; i++) {
      this.#board[x][i] = shipName;
    }
    return true;
  }

  getShip(shipName) {
    return this.#shipMap.get(shipName);
  }

  getBoard() {
    return this.#board;
  }

  receiveAttack(x, y) {
    // Check if coordinates marks a ship
    if (
      this.#board[x][y] !== null &&
      this.#board[x][y] !== "miss" &&
      this.#board[x][y] !== "hit"
    ) {
      this.#shipMap.get(this.#board[x][y]).hit();
      this.#board[x][y] = "hit";
      return true;
    }
    // Check if coordinates marks an empty spot
    else if (this.#board[x][y] === null) {
      this.#board[x][y] = "miss";
      return true;
    } else return false;
  }

  receiveRandomAttack() {
    const validCoordinates = new Set();
    for (const [x, row] of this.#board) {
      for (const [y, cell] of row) {
        if (cell !== "hit" || cell !== "miss") {
          validCoordinates.add(JSON.stringify([x, y]));
        }
      }
    }

    const randomCoord = JSON.parse(
      Array.from(validCoordinates)[
        Math.floor(Math.random() * validCoordinates.size)
      ]
    );
    this.receiveAttack(...randomCoord); 
  }

  areAllShipsSunk() {
    for (const ship of this.#shipMap.values()) {
      if (!ship.isSunk()) return false;
    }
    return true;
  }

  #isValidPlacement(length, x, y) {
    // Check if coordinates are within board boundaries
    if (x < 0 || x >= 10) return false;
    else if (y < 0 || y + length >= 10) return false;
    // Check if ship overlaps with an existing one
    else if (this.#doesShipOverlap(length, x, y)) return false;
    else return true;
  }

  #doesShipOverlap(length, x, y) {
    for (let i = y; i < y + length; i++) {
      if (this.#board[x][i] !== null) {
        return true;
      }
    }
    return false;
  }

  #shipNameToLength(shipName) {
    if (shipName === "Carrier") {
      return 5;
    } else if (shipName === "Battleship") {
      return 4;
    } else if (shipName === "Destroyer" || shipName == "Submarine") {
      return 3;
    } else if (shipName === "Patrol Boat") {
      return 2;
    } else {
      return 0;
    }
  }
}
