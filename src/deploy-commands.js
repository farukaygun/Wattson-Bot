/**
 * ! don't forget to run once for registration after added new commands!
 */

const fs = require('node:fs');
const dotenv = require('dotenv');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');

dotenv.config({ path: __dirname + '/../.env' });

const commands = [];
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: 10 }).setToken(process.env.TOKEN);

rest
	.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands })
	.then(() => console.log('Successfully registered application commands!'))
	.catch(console.error);

