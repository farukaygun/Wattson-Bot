const dotenv = require('dotenv');
const fs = require('node:fs');
const { Client, Collection, Intents, MessageEmbed } = require('discord.js');
const { GetRandomWelcomeTextQuip } = require('./libs/RandomWelcomeTextQuip');
const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_VOICE_STATES,
	],
});

dotenv.config({ path: __dirname + '/../.env' });

// commands handler
client.commands = new Collection();
const commandFiles = fs
	.readdirSync('./commands')
	.filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

// events handler
const eventFiles = fs
	.readdirSync('./events')
	.filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({
			content: 'There was an error while executing command!',
			epheremal: true,
		});
	}
});

// Welcome message
client.on('guildMemberAdd', async (member) => {
	const embeddedMessage = new MessageEmbed()
		.setColor('0099ff')
		.setTitle('New Nessie Lover!')
		.setDescription(`Welcome ${member}! \n\n` + GetRandomWelcomeTextQuip());

	member.guild.channels.cache
		.get(process.env.WELCOME_CHANNEL_ID)
		.send({ embeds: [embeddedMessage] });
});

client.login(process.env.TOKEN);
