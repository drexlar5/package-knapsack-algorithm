const { parseInput, validateWeightLimit, validateNumberOfItems } = require('../../lib/utils');
const Item = require('../../item');
const APIException = require('../../lib/apiException');

describe('Utils', () => {
  describe('parseInput', () => {
    it('should correctly parse the file content into test cases', async () => {
      const fileContent = Promise.resolve('10:(1,10,60) (2,20,100)\n20:(1,10,60) (2,20,100) (3,30,120)\n');
      const expectedTestCases = [
        {
          weightLimit: 10,
          items: [new Item(1, 10, 60), new Item(2, 20, 100)]
        },
        {
          weightLimit: 20,
          items: [new Item(1, 10, 60), new Item(2, 20, 100), new Item(3, 30, 120)]
        },
      ];

      await expect(parseInput(fileContent)).resolves.toEqual(expectedTestCases);
    });

    it('should throw an APIException if the file content is not correctly formatted', async () => {
      const fileContent = Promise.resolve('10 (1,10,60) (2,20,100)\n20:(1,10,60) (2,20,100) (3,30,120)\n'); // Missing ':' in the first line

      await expect(parseInput(fileContent)).rejects.toThrow(new APIException('Invalid line format'));
    });
  });

  describe('validateWeightLimit', () => {
    it('should not throw an exception if the weight limit is valid', () => {
      expect(() => validateWeightLimit(50)).not.toThrow();
    });

    it('should throw an APIException if the weight limit is not a number', () => {
      expect(() => validateWeightLimit('abc')).toThrow(new APIException('Invalid weight limit'));
    });

    it('should throw an APIException if the weight limit is greater than 100', () => {
      expect(() => validateWeightLimit(101)).toThrow(new APIException('Invalid weight limit'));
    });

    it('should throw an APIException if the weight limit is less than 0', () => {
      expect(() => validateWeightLimit(-1)).toThrow(new APIException('Invalid weight limit'));
    });
  });

  describe('validateNumberOfItems', () => {
    it('should not throw an exception if the number of items is valid', () => {
      const items = Array(15).fill(new Item(1, 10, 60));

      expect(() => validateNumberOfItems(items)).not.toThrow();
    });

    it('should throw an APIException if the number of items is greater than 15', () => {
      const items = Array(16).fill(new Item(1, 10, 60));

      expect(() => validateNumberOfItems(items)).toThrow(new APIException('Number of items should be <= 15'));
    });
  });
});
