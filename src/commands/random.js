const path = require('path');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField } = require('discord.js');
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
		.setDescription('Wattson replies with random Wattson quip.')
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
			await interaction.editReply(await GetRandomTextQuip());
		} else if (interaction.options.getSubcommand() === 'voice') {
			await RandomVoiceLine(interaction);
		}
	},
};

const RandomVoiceLine = async (interaction) => {
	try {
		// check user voice channel
		const voiceChannel = interaction.member.voice.channel;
		if (!voiceChannel) {
			await interaction.editReply('Nessie lovers must be in voice channel!');
			return;
		}

		const connection = joinVoiceChannel({
			channelId: interaction.member.voice.channelId,
			guildId: interaction.guildId,
			adapterCreator: interaction.guild.voiceAdapterCreator,
		});
		const subscription = connection.subscribe(player);

		// check required permissions
		const permissions = interaction.guild.members.me.permissions;
		if (
			!permissions.has(PermissionsBitField.Flags.Connect) ||
			!permissions.has(PermissionsBitField.Flags.Speak)
		) {
			await interaction.editReply(
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
			interaction.editReply(':thumbsup:');
		});

		player.once(AudioPlayerStatus.Idle, () => {
			if (subscription) {
				subscription.unsubscribe();
			}
			connection.destroy();
		});
	} catch (error) {
		console.log(error);
	}
};
