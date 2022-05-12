const fs = require('fs');
const path = require('path');
const { GetRandomInt } = require('./RandomInt');

const GetRandomVoiceLineQuip = async () => {
	try {
		const filePath = path.resolve(__dirname, '../data/Wattson Voice Lines/sounds/');
		const files = fs.readdirSync(filePath);

		const randomFileIndex = await GetRandomInt(1, files.length - 1);

		const randomVoiceLine = files[randomFileIndex];
		return randomVoiceLine;
	} catch (error) {
		console.error(error);
	}
};

module.exports = { GetRandomVoiceLineQuip };
