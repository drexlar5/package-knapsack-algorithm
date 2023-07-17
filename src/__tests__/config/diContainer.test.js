const DIContainer = require('../../config/diContainer');
const Packer = require('../../packer');
const FileReader = require('../../lib/fileReader');
const Knapsack = require('../../knapsack');

describe('DIContainer', () => {
  let diContainer;

  beforeEach(() => {
    diContainer = DIContainer;
  });

  it('should be able to retrieve the packer dependency', () => {
    const packer = diContainer.get('packer');
    expect(packer).toBeInstanceOf(Packer);
  });

  it('should be able to retrieve the fileReader dependency', () => {
    const fileReader = diContainer.get('fileReader');
    expect(fileReader).toBeInstanceOf(FileReader);
  });

  it('should be able to retrieve the knapsack dependency', () => {
    const knapsack = diContainer.get('knapsack');
    expect(knapsack).toBeInstanceOf(Knapsack);
  });

  it('should throw an error when trying to retrieve a non-existent dependency', () => {
    expect(() => diContainer.get('nonExistent')).toThrow(`Dependency nonExistent is not registered.`);
  });
});
