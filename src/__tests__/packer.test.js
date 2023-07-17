const APIException = require('../lib/apiException');
const { parseInput, validateWeightLimit, validateNumberOfItems } = require('../lib/utils');
const Packer = require('../packer');
const FileReader = require('../lib/fileReader');
const Knapsack = require('../knapsack');

jest.mock('../lib/fileReader');
jest.mock('../knapsack');
jest.mock('../lib/utils');

describe('Packer', () => {
  let packer;
  let fileReader;
  let knapsack;

  beforeEach(() => {
    fileReader = new FileReader();
    knapsack = new Knapsack();
    packer = new Packer(fileReader, knapsack);
    jest.clearAllMocks();
  });

  it('should throw an APIException if filePath is not a string', async () => {
    await expect(packer.pack(123)).rejects.toThrow(new APIException('Invalid filePath'));
  });

  it('should read the file and parse the input', async () => {
    const filePath = 'test.txt';
    fileReader.readFile.mockReturnValue('content');
    parseInput.mockReturnValue([]);
    
    await packer.pack(filePath);
    
    expect(fileReader.readFile).toHaveBeenCalledWith(filePath);
    expect(parseInput).toHaveBeenCalledWith('content');
  });

  it('should validate weight limit and number of items for each test case', async () => {
    const testCases = [
      { weightLimit: 50, items: [{ index: 1, weight: 10, cost: 60 }, { index: 2, weight: 20, cost: 100 }] }
    ];
    const chosenItems = [{ index: 2, weight: 20, cost: 100 }];
    fileReader.readFile.mockResolvedValue('content');
    parseInput.mockReturnValue(testCases);
    knapsack.computeKnapsack.mockReturnValue(chosenItems);

    await packer.pack('test.txt');

    expect(validateWeightLimit).toHaveBeenCalledWith(50);
    expect(validateNumberOfItems).toHaveBeenCalledWith(testCases[0].items);
  });

  it('should compute knapsack for each test case and return result', async () => {
    const testCases = [
      { weightLimit: 50, items: [{ index: 1, weight: 10, cost: 60 }, { index: 2, weight: 20, cost: 100 }] }
    ];
    const chosenItems = [{ index: 2, weight: 20, cost: 100 }];
    fileReader.readFile.mockResolvedValue('content');
    parseInput.mockResolvedValue(testCases);
    knapsack.computeKnapsack.mockReturnValue(chosenItems);

    const result = await packer.pack('test.txt');

    expect(knapsack.computeKnapsack).toHaveBeenCalledWith(testCases[0].items, 50);
    expect(result).toBe('2\n');
  });
});
