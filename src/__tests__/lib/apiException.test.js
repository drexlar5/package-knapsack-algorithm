const APIException = require('../../lib/apiException');

describe('APIException Class', () => {
  it('should correctly set the exception message', () => {
    const message = 'This is an API exception';
    const exception = new APIException(message);

    expect(exception.message).toBe(message);
  });

  it('should correctly set the exception name', () => {
    const exception = new APIException('message');

    expect(exception.name).toBe('APIException');
  });

  it('should capture stack trace', () => {
    const exception = new APIException('message');

    expect(exception.stack).toBeTruthy();
  });
});
