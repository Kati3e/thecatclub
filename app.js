
import express from 'express';
import CatClubApi from './api/CatClubApi.js';
import botClient from './bot/bot.js';
import fs from 'fs';
import commands from './bot/commands/commands.js';
import { makeBotCommands } from './jobs/generate_bot_commands.js';

const api = new CatClubApi();
const app = express();
const port = 5555;

api._setup().then(() => {
  fs.readFile('./bot/config.json', 'utf-8', (err, data) => {
    if (err) throw err;
    const config = JSON.parse(data);

    // Discord Bot Listeners
    botClient.on('ready', client => {
      console.log(`Logged in as ${botClient.user.tag}!`);
      client.channels.fetch(config.channel_id)
        .then(channel => channel.send('We are online! RAWR!'))
        .catch(console.error);
    });
    botClient.on('interactionCreate', async interaction => {
      const id = interaction.user.id;
      console.log(`[${interaction.user.id}] ${interaction.user.tag} triggered an interaction with /${interaction.commandName} in #${interaction.channel.name}.`);
      if (!interaction.isCommand()) return;
      const botCommand = commands.find(command => command.name === interaction.commandName);
      // TODO: This still needs a lot of structuring
      const user = api.getUser(id);
      if (botCommand.needs_roles?.some(role => !user?.roles?.includes(role))) return await interaction.reply('Sorry you do not have the roles for this command.')
      const result = botCommand.run ? await botCommand.run(api, {botClient, interaction}) : null;
      if (result?.message) return await interaction.reply(result.message);
      if (botCommand.replyText) await interaction.reply(botCommand.replyText);
    });

    // Express listeners and routes
    app.listen(port, () => {
      console.log(`TheCatClub.io | listening on port ${port}`);
    });
    app.get('/docs', (req, res) => {
      res.send('DOCS HERE!');
    });

    // Main
    botClient.login(config.token).then(() => {
      // Other jobs to perform
      console.log('Queuing jobs for work');
      config?.root_users.forEach(id => api.addNewUser({id, roles: ['root']}));

      makeBotCommands(config).then(commands => { // TODO: Only run this job if our local file has changed.
        //console.log('Commands: ', commands);
        // TODO: Run a job to create the static doc pages based off our custom defined commands
      });

      setInterval(() => {
        api.updateBotCloud();
      }, 1800000); // 30 mins
      console.log('All jobs queued');
    });
  });
});


