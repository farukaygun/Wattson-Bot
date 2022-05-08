const fs = require('fs');
const path = require('path');

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

const GetRandomTextQuip = () => {
	const rawData = fs.readFileSync(
		path.resolve(__dirname, '../data/Wattson Voice Lines.json'),
	);

	const parsedData = JSON.parse(rawData);
	const randomTypeIndex = Math.floor(Math.random() * 11);
	const randomType = types[randomTypeIndex];
	const randomObjectIndex = Math.floor(Math.random() * Object.keys(parsedData[randomType]).length);

	const randomQuip = parsedData[randomType][randomObjectIndex]['text'];

	return randomQuip;
};

module.exports = { GetRandomTextQuip };