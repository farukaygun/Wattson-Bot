const fs = require('fs');
const path = require('path');

const GetRandomWelcomeTextQuip = () => {
	try {
		const rawData = fs.readFileSync(
			path.resolve(__dirname, '../data/Wattson Voice Lines.json')
		);

		const parsedData = JSON.parse(rawData.toString());
		const type = 'Welcome Messages';
		const randomObjectIndex = Math.floor(
			Math.random() * Object.keys(parsedData[type]).length
		);

		return parsedData[type][randomObjectIndex]['text'];
	} catch (error) {
		console.error(error);
	}
};

module.exports = { GetRandomWelcomeTextQuip };
