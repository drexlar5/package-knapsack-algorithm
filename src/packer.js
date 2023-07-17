const APIException = require('./lib/apiException');
const { parseInput, validateWeightLimit, validateNumberOfItems } = require('./lib/utils');

class Packer {
  constructor(fileReader, knapsack) {
    this.fileReader = fileReader;
    this.knapsack = knapsack;
  }

  async pack(filePath) {
    if (typeof filePath !== 'string') {
      throw new APIException('Invalid filePath');
    }

    const fileContent = await this.fileReader.readFile(filePath);
    const testCases = await parseInput(fileContent);

    let result = '';

    for (const testCase of testCases) {
      const { weightLimit, items } = testCase;

      validateWeightLimit(weightLimit);
      validateNumberOfItems(items);

      const chosenItems = this.knapsack.computeKnapsack(items, weightLimit);

      const chosenItemIndexes = chosenItems.map((item) => item.index).join(',');
      result += `${chosenItemIndexes}\n`;
    }

    return result;
  }
}

module.exports = Packer;