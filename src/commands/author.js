const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('author')
		.setDescription('Wattson replies with authors.'),
	async execute(interaction) {
		const embeddedMessage = new MessageEmbed()
			.setColor('0099ff')
			.setTitle('Contributors')
			.setURL('https://farukaygun.github.io/Wattson-Bot')
			.addField('Author', 'Faruk Aygün', true)
			.addField('Nessie Images', 'thanks to u/Grifindor_44')
			.setImage('https://i.imgur.com/gdt8Cnt.jpg');

		await interaction.reply({ embeds: [embeddedMessage] });
	},
};
