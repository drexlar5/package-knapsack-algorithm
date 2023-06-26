class Item {
  constructor(index, weight, cost) {
    this.index = index;
    this.weight = Number(weight);
    this.cost = Number(cost);
  }
}

module.exports = Item;