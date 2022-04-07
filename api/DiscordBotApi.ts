import { Client, Intents } from 'discord.js';
import { makeBotCommands } from '../jobs/generate_bot_commands.js'
import commands from '../bot/commands/commands.js'
import CatClubApi from './CatClubApi';

export default class DiscordBotApi {
  constructor(api: CatClubApi, config: { token: string; root_users: string[]; }) {
    const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
    this._setupListeners(api, client, config);
    client.login(config.token).then(() => {
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
  }

  // Default listeners we will always want running
  _setupListeners(api: CatClubApi, client: Client<boolean>, config: { token?: string; root_users?: string[]; channel_id?: any; }) {
    // Discord Bot Listeners
    client.on('ready', () => {
      console.log(`Logged in as ${client.user.tag}!`);
      client.channels.fetch(config.channel_id)
        .then((channel: any) => channel.send('We are online! RAWR!'))
        .catch(console.error);
    });
    client.on('login', (result: any) => {
      console.log('Testing both listen types?');
    });
    client.on('interactionCreate', async (interaction: any) => {
      const { id, tag } = interaction.user;
      if (!interaction.isCommand()) return;
      this.actionTriggered(user, command, channel);
      // TODO: This still needs a lot of structuring
      const user = api.getDiscordUserById(id);

      const result = botCommand.run ? await botCommand.run(api, {client, interaction}) : null;
      if (result?.message) return await interaction.reply(result.message);
      if (botCommand.replyText) await interaction.reply(botCommand.replyText);
    });

    // Threads are currently in BETA.
    // This event will fire when a thread is created, if you want to expand
    // the logic, throw this in it's own event file like the rest.
    // client.on("threadCreate", (thread) => thread.join());
  }

  actionTriggered(user: ClubUser, command: string, channel: any) {
    console.log(`[${user.id}] ${user.tag} triggered an interaction with /${command} in #${channel}.`);
    const commandData = commands.find(c => c.name === command);
    if (commandData.needs_roles?.some(role => !user?.roles?.includes(role)))
    return ('Sorry you do not have the roles for this command.')
  }

  addNewUserToStorage({id, roles}) {

  }
}