const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Wattson skips the current song.'),
	async execute(interaction) {
		await skip(interaction);
	},
};

const skip = async (interaction) => {
	try {
		const { client } = require('../../index');

		const queue = client.player.getQueue(interaction.guildId);
		if (!queue)
			return await interaction.editReply(
				'Wattson found no songs in the queue.'
			);

		let currentSong = queue.current;
		queue.skip();

		await interaction.editReply({
			embeds: [
				new EmbedBuilder()
					.setDescription(`${currentSong.title} has been skipped!`)
					.setThumbnail(currentSong.thumbnail),
			],
		});
	} catch (error) {
		console.error(error);
	}
};
