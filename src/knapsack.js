class Knapsack {
  computeKnapsack(items, weightLimit) {
    const dp = this.calculateDPTable(items, weightLimit);
    return this.findChosenItems(dp, items, weightLimit);
  }
  
  calculateDPTable(items, weightLimit) {
    return Array(items.length + 1).fill().map(() => Array(Math.floor(weightLimit) + 1).fill({ cost: 0, weight: 0, items: [] }));
  }
  
  findChosenItems(dp, items, weightLimit) {
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

    const chosenItems = dp[items.length][Math.floor(weightLimit)].items;
    return chosenItems;
  }
}

module.exports = Knapsack;