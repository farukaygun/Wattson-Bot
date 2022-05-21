const dotenv = require('dotenv');
const fs = require('node:fs');
const { Client, Collection, Intents, MessageEmbed } = require('discord.js');
const {
	GetRandomWelcomeTextQuip,
} = require('./src/libs/randomWelcomeTextQuip');

const { Player } = require('discord-player');

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_VOICE_STATES,
	],
});

dotenv.config();

client.player = new Player(client, {
	ytdlOptions: {
		quality: 'highestaudio',
		highWaterMark: 1 << 25,
	},
});

// commands handler
client.commands = new Collection();
const commandFiles = fs
	.readdirSync('./src/commands')
	.filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./src/commands/${file}`);
	client.commands.set(command.data.name, command);
}

// events handler
const eventFiles = fs
	.readdirSync('./src/events')
	.filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./src/events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.on('interactionCreate', async (interaction) => {
	try {
		if (!interaction.isCommand()) return;

		const command = client.commands.get(interaction.commandName);

		if (!command) return;

		try {
			await interaction.deferReply();
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.editReply({
				content: 'There was an error while executing command!',
				epheremal: true,
			});
		}
	} catch (error) {
		console.error(error);
	}
});

// When Wattson joined new channel send a welcome message
client.on('guildCreate', async (guild) => {
	try {
		const embeddedMessage = new MessageEmbed()
			.setTitle('Hi :wave:, Wattson is here!')
			.setDescription(GetRandomWelcomeTextQuip())
			.addField(
				'Getting Started',
				'Firstly, Wattson is still under development and is getting frequent changes.'
			)
			.addField('/help', "Use the command '/help' to see all the commands.")
			.addField(
				'Support',
				'You can support Wattson [here](https://kreosus.com/farukaygun).'
			)
			.setURL('https://farukaygun.github.io/Wattson-Bot')
			.setImage('https://i.imgur.com/gdt8Cnt.jpg')
			.setFooter({
				text: 'Thanks for adding Wattson, I hope you enjoy it!',
			});

		let channel = guild.channels.cache.find(
			(channel) => channel.name === process.env.WELCOME_CHANNEL_NAME
		);

		if (!channel) {
			channel = await guild.channels.create('welcome', {
				type: 'GUILD_TEXT',
				permissionOverwrites: [
					{
						id: guild.id,
						allow: [
							'VIEW_CHANNEL',
							'READ_MESSAGE_HISTORY',
							'SEND_MESSAGES',
							'SEND_MESSAGES_IN_THREADS',
							'EMBED_LINKS',
						],
					},
				],
			});

			await channel.send({ embeds: [embeddedMessage] });
		} else await channel.send({ embeds: [embeddedMessage] });
	} catch (error) {
		console.error(error);
	}
});

// Welcome message
client.on('guildMemberAdd', async (member) => {
	try {
		const embeddedMessage = new MessageEmbed()
			.setColor('0099ff')
			.setTitle('New Nessie Lover!')
			.setDescription(`Welcome ${member}! \n\n` + GetRandomWelcomeTextQuip());

		const channel = member.guild.channels.cache.find(
			(channel) => channel.name === process.env.WELCOME_CHANNEL_NAME
		);

		await channel.send({ embeds: [embeddedMessage] });
	} catch (error) {
		console.error(error);
	}
});

client.login(process.env.TOKEN);

module.exports = { client };
