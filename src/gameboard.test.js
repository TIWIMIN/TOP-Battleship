import { Gameboard } from "./gameboard";

test("Check ship placements are valid", () => {
    const dummyBoard = new Gameboard(); 
    expect(dummyBoard.placeShip("Carrier", 0, 0)).toBe(true); 
    expect(dummyBoard.placeShip("Battleship", 0, 0)).toBe(false); 
    expect(dummyBoard.placeShip("Submarine", 2, 9)).toBe(false); 
    expect(dummyBoard.placeShip("Destroyer", 9, 6)).toBe(true); 
});