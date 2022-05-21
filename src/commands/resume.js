const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('resume')
		.setDescription('Wattson resumes the song.'),
	async execute(interaction) {
		await resume(interaction);
	},
};

const resume = async (interaction) => {
	try {
		const { client } = require('../../index');

		const queue = client.player.getQueue(interaction.guildId);
		if (!queue)
			return await interaction.editReply(
				'Wattson found no songs in the queue.'
			);

		queue.setPaused(false);
		await interaction.editReply(
			'Wattson has been resumed the song! Use `/pause` to pause the song.'
		);
	} catch (error) {
		console.error(error);
	}
};
