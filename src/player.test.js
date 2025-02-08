import { Player } from "./player";
test("getName() returns the player's name", () => {
    const dummyPlayer = new Player("John", false); 
    expect(dummyPlayer.getName()).toBe("John"); 
})