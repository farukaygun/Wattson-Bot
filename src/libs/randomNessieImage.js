const fs = require('fs');
const path = require('path');
const { GetRandomInt } = require('./randomInt');

const GetRandomNessieImage = async () => {
	try {
		const rawData = fs.readFileSync(
			path.resolve(__dirname, '../data/Nessie Images.json')
		);

		const parsedData = JSON.parse(rawData.toString());
		const type = 'Images';
		const randomObjectIndex = await GetRandomInt(
			0,
			Object.keys(parsedData[type]).length - 1
		);

		return parsedData[type][randomObjectIndex]['url'];
	} catch (error) {
		console.error(error);
	}
};

module.exports = { GetRandomNessieImage };
