const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const path = require('path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('random')
		.setDescription('Replies with random Wattson text quip.'),
	async execute(interaction) {
		await interaction.reply(GetRandomTextQuip())
	}
}

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
	'Ring Status'
]

const GetRandomTextQuip = () => {
	let rawData = fs.readFileSync(path.resolve(__dirname, '../data/Wattson Voice Lines.json'));
	
	let parsedData = JSON.parse(rawData);
	let randomTypeIndex = Math.floor(Math.random() * 11);
	let randomType = types[randomTypeIndex];
	let randomObjectIndex = Math.floor(Math.random() * Object.keys(parsedData[randomType]).length)
	
	let randomQuip = parsedData[randomType][randomObjectIndex]['text'];

	return randomQuip;
}