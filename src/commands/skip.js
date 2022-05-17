const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Wattson skips the current song.'),
	async execute(interaction) {
		await skip(interaction);
	},
};

const skip = async (interaction) => {
	const { client } = require('../../index');

	const queue = client.player.getQueue(interaction.guildId);
	if (!queue)
		return await interaction.reply('Wattson found no songs in the queue.');

	let currentSong = queue.current;
	queue.skip();

	await interaction.reply({
		embeds: [
			new MessageEmbed()
				.setDescription(`${currentSong.title} has been skipped!`)
				.setThumbnail(currentSong.thumbnail),
		],
	});
};
