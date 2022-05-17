const fs = require('fs');
const path = require('path');
const { GetRandomInt } = require('./randomInt');

const GetRandomVoiceLineQuip = async () => {
	try {
		const filePath = path.resolve(
			__dirname,
			'../data/Wattson Voice Lines/sounds/'
		);
		const files = fs.readdirSync(filePath);

		const randomFileIndex = await GetRandomInt(1, files.length - 1);

		return files[randomFileIndex];
	} catch (error) {
		console.error(error);
	}
};

module.exports = { GetRandomVoiceLineQuip };
