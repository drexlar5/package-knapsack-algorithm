const FileReader = require('../../lib/fileReader');
const APIException = require('../../lib/apiException');

jest.mock('fs');

describe('FileReader', () => {
  let fileReader;

  beforeEach(() => {
    fileReader = new FileReader();
  });

  describe('readFile', () => {
    const fs = require('fs');

    it('should resolve with the file data if the file is read successfully', async () => {
      const filePath = 'test.txt';
      const fileData = 'file data';

      fs.readFile.mockImplementation((filePath, encoding, callback) => {
        callback(null, fileData);
      });

      await expect(fileReader.readFile(filePath)).resolves.toEqual(fileData);
    });

    it('should reject with an APIException if an error occurs while reading the file', async () => {
      const filePath = 'test.txt';
      const error = new Error('Error reading file');

      fs.readFile.mockImplementation((filePath, encoding, callback) => {
        callback(error, null);
      });

      await expect(fileReader.readFile(filePath)).rejects.toThrow(new APIException('Error reading file'));
    });
  });
});
