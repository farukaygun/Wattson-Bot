const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Wattson stops the plays songs and clears the queue.'),
	async execute(interaction) {
		await stop(interaction);
	},
};

const stop = async (interaction) => {
	try {
		const { client } = require('../../index');

		const queue = client.player.getQueue(interaction.guildId);
		if (!queue)
			return await interaction.editReply(
				'Wattson found no songs in the queue.'
			);

		queue.clear();
		queue.destroy();

		await interaction.editReply('Bye-bye squad!');
	} catch (error) {
		console.error(error);
	}
};
