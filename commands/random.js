const { SlashCommandBuilder } = require('@discordjs/builders');
const { GetRandomTextQuip } = require('../libs/RandomTextQuip');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('random')
		.setDescription('Replies with random Wattson text quip.'),
	async execute(interaction) {
		await interaction.reply(await GetRandomTextQuip());
	},
};