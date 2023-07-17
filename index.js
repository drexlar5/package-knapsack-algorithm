const diContainer = require('./src/config/diContainer');

(async function main() {
	try {
		const filePath = './resources/example_input';
		const packer = diContainer.get('packer');
		const result = await packer.pack(filePath);
		console.log(result);
	} catch (err) {
		console.error(err.stack)
	}
})()

