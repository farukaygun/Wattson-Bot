const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Wattson pauses the song.'),

	async execute(interaction) {
		await pause(interaction);
	},
};

const pause = async (interaction) => {
	try {
		const { client } = require('../../index');

		const queue = client.player.getQueue(interaction.guildId);
		if (!queue)
			return await interaction.editReply(
				'Wattson found no songs in the queue.'
			);

		queue.setPaused(true);
		await interaction.editReply(
			'Wattson has been paused the song! Use `/resume` to resume the music.'
		);
	} catch (error) {
		console.error(error);
	}
};
