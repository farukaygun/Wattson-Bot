/**
 * ! don't forget to run once for registration after added new commands!
 */

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const dotenv = require('dotenv');

dotenv.config();

const commands = [
	new SlashCommandBuilder()
		.setName('random')
		.setDescription('Replies with random Wattson text quip!'),
].map((command) => command.toJSON());

const rest = new REST({ version: 10 }).setToken(process.env.TOKEN);

rest
	.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands })
	.then(() => console.log('Successfully registered application commands!'))
	.catch(console.error);
