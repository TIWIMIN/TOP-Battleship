import { Ship } from "./ship";

test("getHP() function returns the hitPoints of a Ship object", () => {
  const dummyShip = new Ship(3);
  expect(dummyShip.getHP()).toBe(3);
});

test("getLength() function returns length of a Ship object", () => {
  const dummyShip = new Ship(2);
  expect(dummyShip.getLength()).toBe(2);
});

test("hit() function decreases the hitPoints of a Ship object", () => {
  const dummyShip = new Ship(5);
  dummyShip.hit();
  expect(dummyShip.getHP()).toBe(4);
});

test("isSunk() should determine if the hitPoints of a Ship object is 0", () => {
  const dummyShip = new Ship(1);
  expect(dummyShip.isSunk()).toBe(false);
  dummyShip.hit();
  expect(dummyShip.isSunk()).toBe(true);
});
