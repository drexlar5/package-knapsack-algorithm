const Packer = require('../packer');
const Item = require('../item');

describe('Packer', () => {
  describe('knapsack', () => {
    it('should select items that maximize cost while respecting the weight limit', () => {
      const items = [
        new Item(1, 85.31, 29),
        new Item(2, 14.55, 74),
        new Item(3, 3.98, 16),
        new Item(4, 26.24, 55),
        new Item(5, 63.69, 52),
        new Item(6, 76.25, 75),
        new Item(7, 60.02, 74),
        new Item(8, 93.18, 35),
        new Item(9, 89.95, 78)
      ];
      const weightLimit = 75;

      const result = Packer._knapsack(items, weightLimit);

      expect(result).toEqual([items[1], items[6]]); // Expect items 2 and 7 to be chosen
    });

    it('should select items that maximize cost while respecting the weight limit', () => {
      const items = [
        new Item(1, 90.72, 13),
        new Item(2, 33.80, 40),
        new Item(3, 43.15, 10),
        new Item(4, 37.97, 16),
        new Item(5, 46.81, 36),
        new Item(6, 48.77, 79),
        new Item(7, 81.80, 45),
        new Item(8, 19.36, 79),
        new Item(9, 6.76, 64)
      ];

      const weightLimit = 56;

      const result = Packer._knapsack(items, weightLimit);

      expect(result).toEqual([items[7], items[8]]); // Expect items 8 and 9 to be chosen
    });

    it('should select items that maximize cost while respecting the weight limit', () => {
      const items = [
        new Item(1, 53.38, 45),
        new Item(2, 88.62, 98),
        new Item(3, 78.48, 3),
        new Item(4, 72.30, 76),
        new Item(5, 30.18, 9),
        new Item(6, 46.34, 48)
      ];
      const weightLimit = 81;

      const result = Packer._knapsack(items, weightLimit);

      expect(result).toEqual([items[3]]); // Expect item 4 to be chosen
    });

    it('should return an empty array if no items can be chosen within the weight limit', () => {
      const items = [
        new Item(1, 15.3, 34)
      ];
      const weightLimit = 8;

      const result = Packer._knapsack(items, weightLimit);

      expect(result).toEqual([]); // Expect no items to be chosen
    });
  });
});
