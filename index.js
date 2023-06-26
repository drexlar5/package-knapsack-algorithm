const Packer = require('./src/packer');

try {
    const filePath = './resources/example_input';
    const result = Packer.pack(filePath);
    console.log(result);
} catch (err) {
    console.error(err.stack)
}