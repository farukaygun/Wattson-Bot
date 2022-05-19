const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Wattson replies with her commands.'),
	async execute(interaction) {
		await help(interaction);
	},
};

const commands = [
	{ name: '**/author**', description: 'Wattson replies with authors.' },
	{ name: '**/help**', description: 'Wattson replies with her commands.' },
	{
		name: '**/info**',
		description: 'Wattson displays info about the currently playing song.',
	},
	{
		name: '**/nessie**',
		description: 'Wattson replies with random Nessie image.',
	},
	{ name: '**/pause**', description: 'Wattson pauses the song.' },
	{ name: '**/play**', description: 'Wattson plays a song.' },
	{
		name: '**/queue**',
		description: 'Wattson replies with the current song queue.',
	},
	{
		name: '**/random**',
		description: 'Wattson replies with random Wattson quip.',
	},
	{ name: '**/resume**', description: 'Wattson resumes the song.' },
	{ name: '**/skip**', description: 'Wattson skips the current song.' },
	{
		name: '**/stop**',
		description: 'Wattson stops the plays songs and clears the queue.',
	},
];

// map commands variable
const help = async (interaction) => {
	let message = "**Wattson's command list:**\n\n";

	commands.map((command) => {
		message += `${command.name} :arrow_right: ${command.description}\n`;
	});

	interaction.reply(message);
};
