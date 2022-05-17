const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play songs.')
		.addSubcommand((subCommad) =>
			subCommad
				.setName('song')
				.setDescription("Song's url")
				.addStringOption((option) =>
					option
						.setName('url')
						.setDescription('Wattson will play song.')
						.setRequired(true)
				)
		)
		.addSubcommand((subCommad) =>
			subCommad
				.setName('playlist')
				.setDescription("Playlist's url")
				.addStringOption((option) =>
					option
						.setName('url')
						.setDescription('Wattson will play playlist.')
						.setRequired(true)
				)
		)
		.addSubcommand((subCommad) =>
			subCommad
				.setName('search')
				.setDescription('Search song with keywords')
				.addStringOption((option) =>
					option
						.setName('keywords')
						.setDescription('Wattson will find song with your keywords.')
						.setRequired(true)
				)
		),
	async execute(interaction) {
		await playSong(interaction);
	},
};

const playSong = async (interaction) => {
	const { client } = require('../../index');

	// check user voice channel
	const voiceChannel = interaction.member.voice.channel;
	if (!voiceChannel) {
		await interaction.reply('Nessie lovers must be in voice channel!');
		return;
	}

	// check required permissions
	const permissions = interaction.guild.me.permissions;
	if (
		!permissions.has(Permissions.FLAGS.CONNECT) ||
		!permissions.has(Permissions.FLAGS.SPEAK)
	) {
		await interaction.reply(
			'Wattson need the permissions to join and speak in your voice channel!'
		);
		return;
	}

	const queue = await client.player.createQueue(interaction.guild);
	if (!queue.connection) {
		await queue.connect(interaction.member.voice.channel);
	}

	let embed = new MessageEmbed();

	//sub commands
	if (interaction.options.getSubcommand() === 'song') {
		let url = interaction.options.getString('url');
		const result = await client.player.search(url, {
			requestedBy: interaction.user,
			searchEngine: QueryType.YOUTUBE_VIDEO,
		});
		if (result.tracks.length === 0) {
			return interaction.reply('No results!');
		}

		const song = result.tracks[0];
		await queue.addTrack(song);
		embed
			.setDescription(
				`**[${song.title}](${song.url})** has been added to the Queue`
			)
			.setThumbnail(song.thumbnail)
			.setFooter({ text: `Duration: ${song.duration}` });
	} else if (interaction.options.getSubcommand() === 'playlist') {
		let url = interaction.options.getString('url');
		const result = await client.player.search(url, {
			requestedBy: interaction.user,
			searchEngine: QueryType.YOUTUBE_PLAYLIST,
		});

		if (result.tracks.length === 0) return interaction.reply('No results');

		const playlist = result.playlist;
		await queue.addTracks(result.tracks);
		embed
			.setDescription(
				`**${result.tracks.length} songs from [${playlist.title}](${playlist.url})** have been added to the Queue`
			)
			.setThumbnail(playlist.thumbnail);
	} else if (interaction.options.getSubcommand() === 'search') {
		let url = interaction.options.getString('keywords');
		const result = await client.player.search(url, {
			requestedBy: interaction.user,
			searchEngine: QueryType.AUTO,
		});

		if (result.tracks.length === 0) return interaction.reply('No results');

		const song = result.tracks[0];
		await queue.addTrack(song);
		embed
			.setDescription(
				`**[${song.title}](${song.url})** has been added to the Queue`
			)
			.setThumbnail(song.thumbnail)
			.setFooter({ text: `Duration: ${song.duration}` });
	}

	if (!queue.playing) {
		await queue.play();
	}

	await interaction.reply({
		embeds: [embed],
	});
};
