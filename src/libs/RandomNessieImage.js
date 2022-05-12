const fs = require('fs');
const path = require('path');
const { GetRandomInt } = require('./RandomInt');

const GetRandomNessieImage = async () => {
	try {
		const rawData = fs.readFileSync(path.resolve(__dirname, '../data/Nessie Images.json'));

		const parsedData = JSON.parse(rawData);
		const type = 'Images';
		const randomObjectIndex = await GetRandomInt(0, Object.keys(parsedData[type]).length - 1);

		const randomImage = parsedData[type][randomObjectIndex]['url'];

		return randomImage;
	} catch (error) {
		console.error(error);
	}
};

module.exports = { GetRandomNessieImage };
