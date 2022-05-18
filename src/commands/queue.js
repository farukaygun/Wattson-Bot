const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Wattson displays the current queue.')
		.addNumberOption((option) =>
			option
				.setName('page')
				.setDescription('Page number of the queue')
				.setMinValue(1)
		),

	async execute(interaction) {
		await queue(interaction);
	},
};

const queue = async (interaction) => {
	const { client } = require('../../index');

	const queue = client.player.getQueue(interaction.guildId);
	if (!queue || !queue.playing)
		return await interaction.reply('Wattson found no songs in the queue.');

	const totalPages = Math.ceil(queue.tracks.length / 10) || 1;
	const page = (interaction.options.getNumber('page') || 1) - 1;

	if (page > totalPages)
		return await interaction.reply(
			`Invalid Page. There are only a total of ${totalPages} pages of songs`
		);

	const queueString = queue.tracks
		.slice(page * 10, page * 10 + 10)
		.map((song, i) => {
			return `**${page * 10 + i + 1}.** \`[${song.duration}]\` ${
				song.title
			} -- <@${song.requestedBy.id}>`;
		})
		.join('\n');

	const currentSong = queue.current;

	await interaction.reply({
		embeds: [
			new MessageEmbed()
				.setDescription(
					`**Currently Playing**\n` +
						(currentSong
							? `\`[${currentSong.duration}]\` ${currentSong.title} -- <@${currentSong.requestedBy.id}>`
							: 'None') +
						`\n\n**Queue**\n${queueString}`
				)
				.setFooter({
					text: `Page ${page + 1} of ${totalPages}`,
				})
				.setThumbnail(currentSong.setThumbnail),
		],
	});
};