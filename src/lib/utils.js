const Item = require('../item');
const APIException = require('./apiException');

const parseInput = async (fileContentPromise) => {
  const fileContent = await fileContentPromise;
  const lines = fileContent.split('\n').filter(Boolean);
  const testCases = [];

  for (const line of lines) {
    if (!line.includes(':')) {
      throw new APIException('Invalid line format');
    }

    const [weightLimitStr, itemsStr] = line.split(':');
    const weightLimit = parseFloat(weightLimitStr);

    const items = itemsStr.split(' ').map((itemStr) => {
      const [indexStr, weightStr, costStr] = itemStr.replace(/[()€]/g, '').split(',');
      const index = parseInt(indexStr);
      const weight = parseInt(weightStr);
      const cost = parseInt(costStr);

      return new Item(index, weight, cost);
    });

    testCases.push({ weightLimit, items });
  }

  return testCases;
}

const validateWeightLimit = (weightLimit) => {
  if (isNaN(weightLimit) || weightLimit > 100 || weightLimit < 0) {
    throw new APIException('Invalid weight limit');
  }
}

const validateNumberOfItems = (items) => {
  if (items.length > 15) {
    throw new APIException('Number of items should be <= 15');
  }
}

module.exports = {
  parseInput,
  validateWeightLimit,
  validateNumberOfItems
};