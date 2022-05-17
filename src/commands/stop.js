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
	const { client } = require('../../index');

	const queue = client.player.getQueue(interaction.guildId);
	if (!queue)
		return await interaction.reply('Wattson found no songs in the queue.');

	queue.destroy();
	await interaction.reply('Bye-bye squad!');
};
