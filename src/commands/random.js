const path = require('path');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
const { GetRandomTextQuip } = require('../libs/randomTextQuip');
const { GetRandomVoiceLineQuip } = require('../libs/randomVoiceLineQuip');
const {
	createAudioPlayer,
	createAudioResource,
	joinVoiceChannel,
	AudioPlayerStatus,
} = require('@discordjs/voice');

const player = createAudioPlayer();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('random')
		.setDescription('Replies with random Wattson quip.')
		.addSubcommand((subCommand) =>
			subCommand
				.setName('text')
				.setDescription('Replies with random Wattson text quip.')
		)
		.addSubcommand((subCommand) =>
			subCommand
				.setName('voice')
				.setDescription('Replies with random Wattson voice line.')
		),
	async execute(interaction) {
		if (interaction.options.getSubcommand() === 'text') {
			await interaction.reply(await GetRandomTextQuip());
		} else if (interaction.options.getSubcommand() === 'voice') {
			await RandomVoiceLine(interaction);
		}
	},
};

const RandomVoiceLine = async (interaction) => {
	const connection = joinVoiceChannel({
		channelId: interaction.member.voice.channelId,
		guildId: interaction.guildId,
		adapterCreator: interaction.guild.voiceAdapterCreator,
	}).subscribe(player);

	// check user voice channel
	const voiceChannel = connection.connection.joinConfig.channelId;
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
			'I need the permissions to join and speak in your voice channel!'
		);
		return;
	}

	const fileName = await GetRandomVoiceLineQuip();
	const audio = createAudioResource(
		path.join(__dirname, '../data/Wattson Voice Lines/sounds/' + fileName)
	);
	player.play(audio);
	player.once(AudioPlayerStatus.Playing, () => {
		interaction.reply('playing ' + fileName);
	});
};
