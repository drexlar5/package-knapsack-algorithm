const Packer = require('../packer');
const APIException = require('../apiException');

describe('Packer', () => {
  describe('pack', () => {
    it('should read the file and return the correct output', () => {
      const filePath = './resources/example_input';
      const expectedOutput = '4\n-\n2,7\n8,9\n';
      
      const result = Packer.pack(filePath);

      expect(result).toEqual(expectedOutput);
    });

    it('should throw an exception if the file does not exist', () => {
      const filePath = './resources/nonexistent_file';

      expect(() => Packer.pack(filePath)).toThrow(APIException);
    });
  });
});
