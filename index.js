const Packer = require('./src/packer');
const FileReader = require('./src/lib/fileReader');
const Knapsack = require('./src/knapsack');

const knapsack = new Knapsack();
const fileReader = new FileReader();

(async function main() {
	try {
		const filePath = './resources/example_input';
		const packer = new Packer(fileReader, knapsack);
		const result = await packer.pack(filePath, knapsack);
		console.log(result);
	} catch (err) {
		console.error(err.stack)
	}
})()

