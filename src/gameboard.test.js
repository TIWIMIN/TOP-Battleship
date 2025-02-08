import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

test("Check ship placements are valid", () => {
  const dummyBoard = new Gameboard();
  expect(dummyBoard.placeShip("Carrier", 0, 0)).toBe(true);
  expect(dummyBoard.placeShip("Battleship", 0, 0)).toBe(false);
  expect(dummyBoard.placeShip("Submarine", 2, 9)).toBe(false);
  expect(dummyBoard.placeShip("Destroyer", 9, 6)).toBe(true);
});

test("getShip() returns a Ship object", () => {
  const dummyBoard = new Gameboard();
  dummyBoard.placeShip("Destroyer", 0, 0);
  expect(dummyBoard.getShip("Destroyer")).toBeInstanceOf(Ship);
  expect(dummyBoard.getShip("")).toBeFalsy();
});

test("getBoard() returns a 10x10 board", () => {
  const dummyBoard = new Gameboard();
  expect(dummyBoard.getBoard()).toHaveLength(10);
  for (let i = 0; i < 10; i++) {
    expect(dummyBoard.getBoard()[i]).toHaveLength(10);
  }
});

test("receiveAttack() on hit lowers ship HP", () => {
  const dummyBoard = new Gameboard();
  dummyBoard.placeShip("Destroyer", 0, 0);
  dummyBoard.receiveAttack(0, 0);
  expect(dummyBoard.getShip("Destroyer").getHP()).toBe(2);
});

test("receiveAttack() on miss marks tile as miss", () => {
  const dummyBoard = new Gameboard();
  dummyBoard.receiveAttack(0, 0);
  expect(dummyBoard.getBoard()[0][0]).toBe("miss");
});

test("receiveAttack() cannot hit already hit tiles", () => {
  const dummyBoard = new Gameboard();
  dummyBoard.placeShip("Destroyer", 0, 0);
  dummyBoard.receiveAttack(0, 0);
  expect(dummyBoard.receiveAttack(0, 0)).toBe(false);
  dummyBoard.receiveAttack(2, 2);
  expect(dummyBoard.receiveAttack(2, 2)).toBe(false);
});

test("areAllShipsSunk() checks if all ships are sunk", () => {
    const dummyBoard = new Gameboard(); 
    dummyBoard.placeShip("Destroyer", 0, 0);
    expect(dummyBoard.areAllShipsSunk()).toBe(false);  
    dummyBoard.receiveAttack(0, 0); 
    dummyBoard.receiveAttack(0, 1); 
    dummyBoard.receiveAttack(0, 2); 
    expect(dummyBoard.areAllShipsSunk()).toBe(true); 
})