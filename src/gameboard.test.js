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
})

test("receiveAttack() on hit lowers ship HP", () => {
    const dummyBoard = new Gameboard(); 
    dummyBoard.placeShip("Destroyer", 0, 0); 
    dummyBoard.receiveAttack(0, 0); 
    expect(dummyBoard.getShip("Destroyer").getHP()).toBe(2); 
})