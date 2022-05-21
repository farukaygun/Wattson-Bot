module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		client.user.setActivity(
			`Wattson is on ${client.guilds.cache.size} Servers.`,
			{
				type: 'PLAYING',
			}
		);

		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
