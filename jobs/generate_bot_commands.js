import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import botCommands from '../bot/commands/commands.js';

export function makeBotCommands(config) { // Move to new discord API hooker
  const { clientId, guildId, token } = config;
  const commands = [ // TODO: Clean this up
    ...botCommands.map(command =>
      new SlashCommandBuilder().setName(command.name).setDescription(command.description))
  ].map(command => command.toJSON());

  const rest = new REST({ version: '9' }).setToken(token);

  return rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => {
      console.log('Successfully registered application commands.'); //, commands);
      return commands;
    }).catch(console.error);
}

