const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Wattson displays info about the currently playing song.'),
	async execute(interaction) {
		await info(interaction);
	},
};

const info = async (interaction) => {
	try {
		const { client } = require('../../index');

		const queue = client.player.getQueue(interaction.guildId);
		if (!queue)
			return await interaction.editReply(
				'Wattson found no songs in the queue.'
			);

		let bar = queue.createProgressBar({
			queue: false,
			length: 19,
		});

		const song = queue.current;
		await interaction.editReply({
			embeds: [
				new EmbedBuilder()
					.setThumbnail(song.thumbnail)
					.setDescription(
						`Currently Playing [${song.title}](${song.url})\n\n` + bar
					),
			],
		});
	} catch (error) {
		console.error(error);
	}
};
