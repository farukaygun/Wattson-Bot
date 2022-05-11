const fs = require('fs');
const path = require('path');
const { GetRandomInt } = require('./RandomInt');

const GetRandomNessieImage = async () => {
	const rawData = fs.readFileSync(
		path.resolve(__dirname, '../data/Nessie Images.json'),
	);

	const parsedData = JSON.parse(rawData);
	const type = 'Images';
	// const randomObjectIndex = Math.floor(Math.random() * Object.keys(parsedData[type]).length);
	const randomObjectIndex = await GetRandomInt(1, Object.keys(parsedData[type]).length - 1);
	const randomImage = parsedData[type][randomObjectIndex]['url'];

	return randomImage;
};

module.exports = { GetRandomNessieImage };
