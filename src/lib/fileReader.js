const APIException = require('./apiException');

class FileReader {
  constructor() {
      this.fs = require('fs');
  }

  async readFile(filePath) {
    return new Promise((resolve, reject) => {
      this.fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(new APIException('Error reading file'));
        } else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = FileReader;