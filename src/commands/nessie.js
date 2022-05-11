const { SlashCommandBuilder } = require('@discordjs/builders');
const { GetRandomNessieImage } = require('../libs/RandomNessieImage');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nessie')
		.setDescription('Replies with random Nessie image.'),
	async execute(interaction) {
		const imageObj = { image: await GetRandomNessieImage() };
		await interaction.reply(imageObj.image);
	},
};
