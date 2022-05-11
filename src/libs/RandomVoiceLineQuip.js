const fs = require('fs');
const path = require('path');
const { GetRandomInt } = require('./RandomInt');

const GetRandomVoiceLineQuip = async () => {
	const filePath = path.resolve(
		__dirname,
		'../data/Wattson Voice Lines/sounds/',
	);
	const files = fs.readdirSync(filePath);

	// const randomFileIndex = Math.floor(Math.random() * files.length);
	const randomFileIndex = await GetRandomInt(1, files.length);

	const randomVoiceLine = files[randomFileIndex];
	return randomVoiceLine;
};

module.exports = { GetRandomVoiceLineQuip };
