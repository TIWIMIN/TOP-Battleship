import { Gameboard } from "./gameboard";

export class Player {
  #gameboard;
  #name;
  #isBot;
  #shipList = [
    ["Carrier", 5],
    ["Battleship", 4],
    ["Destroyer", 3],
    ["Submarine", 3],
    ["Patrol Boat", 2],
  ];
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

  populateBoard() {
    let coordinateList = new Set();
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        coordinateList.add(JSON.stringify([i, j]));
      }
    }

    for (const ship of shipList) {
      // Ensures that we cannot place a ship on an invalid spot
      const coordinatesToRemove = new Set();
      for (let i = 0; i < 10; i++) {
        for (let j = 10 - (ship[1] + 1); j < 10; j++) {
          coordinatesToRemove.add(JSON.stringify([i, j]));
        }
      }
      const tempCoordinateList = coordinateList.difference(coordinatesToRemove);

      // Picks random coordinate from valid entries
      const chosenCoordinate = JSON.parse(
        Array.from(tempCoordinateList)[
          Math.floor(Math.random() * tempCoordinateList.size)
        ]
      );
      this.#gameboard.placeShip(ship[0], ...chosenCoordinate);

      // Updates our set of valid of coordinates after removing used spots
      const coordinatesExpended = new Set();
      for (
        let i = chosenCoordinate[1];
        i <= chosenCoordinate[1] + ship[1];
        i++
      ) {
        coordinatesExpended.add(JSON.stringify([chosenCoordinate[0], i]));
      }
      coordinateList = coordinateList.difference(coordinatesExpended);
    }
  }
}
