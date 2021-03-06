const fs = require('fs');
const path = require('path');
const { GetRandomInt } = require('./randomInt');

const types = [
	'Abilities',
	'Arenas Status',
	'Battle Royale Status',
	'Character Select',
	'Gameplay',
	'Kills',
	'Lobby',
	'Lore',
	'Pings',
	'Quip',
	'Ring Status',
];

const GetRandomTextQuip = async () => {
	try {
		const rawData = fs.readFileSync(
			path.resolve(__dirname, '../data/Wattson Voice Lines.json')
		);

		const parsedData = JSON.parse(rawData.toString());
		const randomTypeIndex = Math.floor(Math.random() * 11);
		const randomType = types[randomTypeIndex];
		const randomObjectIndex = await GetRandomInt(
			0,
			Object.keys(parsedData[randomType]).length - 1
		);

		return parsedData[randomType][randomObjectIndex]['text'];
	} catch (error) {
		console.error(error);
	}
};

module.exports = { GetRandomTextQuip };
