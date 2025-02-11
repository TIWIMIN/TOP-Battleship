import { Player } from "./player";
import { Gameboard } from "./gameboard";
test("getName() returns the player's name", () => {
    const dummyPlayer = new Player("John", false); 
    expect(dummyPlayer.getName()).toBe("John"); 
})

test("getBoard() returns a gameBoard()", () => {
    const dummyPlayer = new Player("John", false); 
    expect(dummyPlayer.getGameboard()).toBeInstanceOf(Gameboard); 
})
