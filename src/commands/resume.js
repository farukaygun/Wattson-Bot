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
	const { client } = require('../../index');

	const queue = client.player.getQueue(interaction.guildId);
	if (!queue)
		return await interaction.reply('Wattson found no songs in the queue.');

	queue.setPaused(false);
	await interaction.reply(
		'Wattson has been resumed the song! Use `/pause` to pause the song.'
	);
};
