const { SlashCommandBuilder } = require('@discordjs/builders');
const { GetRandomNessieImage } = require('../libs/randomNessieImage');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nessie')
		.setDescription('Wattson replies with random Nessie image.'),
	async execute(interaction) {
		await nessie(interaction);
	},
};

const nessie = async (interaction) => {
	try {
		const imageObj = { image: await GetRandomNessieImage() };
		await interaction.editReply(imageObj.image);
	} catch (error) {
		console.error(error);
	}
};
