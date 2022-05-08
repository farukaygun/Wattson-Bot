const { SlashCommandBuilder } = require('@discordjs/builders');
const { GetRandomTextQuip } = require('../helpers/RandomTextQuip');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('random')
		.setDescription('Replies with random Wattson text quip.'),
	async execute(interaction) {
		await interaction.reply(GetRandomTextQuip());
	},
};