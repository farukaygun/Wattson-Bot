const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('author')
		.setDescription('Wattson replies with authors.'),
	async execute(interaction) {
		await author(interaction);
	},
};

const author = async (interaction) => {
	try {
		const embeddedMessage = new EmbedBuilder()
			.setColor('0099ff')
			.setTitle('Contributors')
			.setURL('https://farukaygun.github.io/Wattson-Bot')
			.addFields([
				{ name: 'Author', value: 'Faruk Aygün' },
				{ name: 'Nessie Images', value: 'thanks to u/Grifindor_44' },
			])
			.setImage('https://i.imgur.com/gdt8Cnt.jpg');

		await interaction.editReply({ embeds: [embeddedMessage] });
	} catch (error) {
		console.error(error);
	}
};
