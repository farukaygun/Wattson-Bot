const fs = require('fs');
const path = require('path');

const GetRandomWelcomeTextQuip = () => {
	const rawData = fs.readFileSync(
		path.resolve(__dirname, '../data/Wattson Voice Lines.json'),
	);

	const parsedData = JSON.parse(rawData);
	const type = 'Welcome Messages';
	const randomObjectIndex = Math.floor(Math.random() * Object.keys(parsedData[type]).length);

	const randomQuip = parsedData[type][randomObjectIndex]['text'];

	return randomQuip;
};

module.exports = { GetRandomWelcomeTextQuip };