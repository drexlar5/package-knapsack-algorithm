const fs = require('fs');
const APIException = require('./apiException');
const Item = require('./item');

class Packer {
  static pack(filePath) {
    if (typeof filePath !== 'string') {
      throw new APIException('Invalid filePath');
    }

    if (!fs.existsSync(filePath)) {
      throw new APIException('File does not exist');
    }

    const lines = fs.readFileSync(filePath, 'utf-8').split('\n').filter(Boolean);
    let result = '';

    for (let line of lines) {
      if (!line.includes(':')) {
        throw new APIException('Invalid line format');
      }

      const [weightLimitStr, itemsStr] = line.split(':');
      const weightLimit = parseFloat(weightLimitStr);

      if (isNaN(weightLimit) || weightLimit > 100 || weightLimit < 0) {
        throw new APIException('Invalid weight limit');
      }

      const items = itemsStr.match(/\(([^)]+)\)/g).map((itemStr, i) => {
        const [index, weight, costStr] = itemStr.slice(1, -1).split(',');
        const cost = parseFloat(costStr.slice(1));
      
        if (isNaN(index) || index > i + 1 || isNaN(weight) || weight > 100 || weight < 0 || isNaN(cost) || cost > 100 || cost < 0) {
          throw new APIException('Invalid item parameters');
        }
      
        return new Item(index, weight, cost);
      });

      if (items.length > 15) {
        throw new APIException('Number of items should be <= 15');
      }

      const chosenItems = this._knapsack(items, weightLimit);
      result += chosenItems.length > 0 ? chosenItems.map(item => item.index).join(',') + '\n' : '-\n' ;
    }

    return result;
  }

  static _knapsack(items, weightLimit) {
    // Initialize DP table
    const dp = Array(items.length + 1).fill().map(() => Array(Math.floor(weightLimit) + 1).fill({ cost: 0, weight: 0, items: [] }));

    // Iterate over items
    for (let i = 1; i <= items.length; i++) {
      for (let w = 0; w <= Math.floor(weightLimit); w++) {
        const item = items[i - 1];
        if (item.weight <= w) {
          const costIfChosen = item.cost + dp[i - 1][w - Math.floor(item.weight)].cost;
          const weightIfChosen = item.weight + dp[i - 1][w - Math.floor(item.weight)].weight;
          const itemsIfChosen = dp[i - 1][w - Math.floor(item.weight)].items.concat([item]);

          if (dp[i - 1][w].cost < costIfChosen || 
              (dp[i - 1][w].cost == costIfChosen && dp[i - 1][w].weight > weightIfChosen)) {
            dp[i][w] = { cost: costIfChosen, weight: weightIfChosen, items: itemsIfChosen };
          } else {
            dp[i][w] = dp[i - 1][w];
          }
        } else {
          dp[i][w] = dp[i - 1][w];
        }
      }
    }

    // Find chosen items
    return dp[items.length][Math.floor(weightLimit)].items;
  }
}

module.exports = Packer;