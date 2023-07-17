const Packer = require('../packer');
const FileReader = require('../lib/fileReader');
const Knapsack = require('../knapsack');


class DIContainer {
  constructor() {
    this.dependencies = {
      'packer': new Packer(new FileReader(), new Knapsack()),
      'fileReader': new FileReader(),
      'knapsack': new Knapsack(),
    };
  }

  get(dependency) {
    if (!this.dependencies[dependency]) {
      throw new Error(`Dependency ${dependency} is not registered.`);
    }
    return this.dependencies[dependency];
  }
}

module.exports = new DIContainer();
