const { SlashCommandBuilder } = require('@discordjs/builders');
const { GetRandomNessieImage } = require('../libs/randomNessieImage');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nessie')
		.setDescription('Wattson replies with random Nessie image.'),
	async execute(interaction) {
		const imageObj = { image: await GetRandomNessieImage() };
		await interaction.editReply(imageObj.image);
	},
};
