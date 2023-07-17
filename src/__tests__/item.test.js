const Item = require('../item');

describe('Item Class', () => {
  it('should correctly set index, weight, and cost', () => {
    const item = new Item(1, '10', '60');

    expect(item.index).toBe(1);
    expect(item.weight).toBe(10); // Converted string '10' to number 10
    expect(item.cost).toBe(60); // Converted string '60' to number 60
  });

  it('should handle negative values', () => {
    const item = new Item(-1, '-10', '-60');

    expect(item.index).toBe(-1);
    expect(item.weight).toBe(-10); // Converted string '-10' to number -10
    expect(item.cost).toBe(-60); // Converted string '-60' to number -60
  });

  it('should handle floating point values', () => {
    const item = new Item(1, '10.5', '60.5');

    expect(item.index).toBe(1);
    expect(item.weight).toBe(10.5); // Converted string '10.5' to number 10.5
    expect(item.cost).toBe(60.5); // Converted string '60.5' to number 60.5
  });

  it('should handle non-numeric values', () => {
    const item = new Item(1, 'not-a-number', 'also-not-a-number');

    expect(item.index).toBe(1);
    expect(item.weight).toBeNaN(); // 'not-a-number' is not a valid number
    expect(item.cost).toBeNaN(); // 'also-not-a-number' is not a valid number
  });
});
