//https://discordjs.guide/creating-your-bot/command-handling.html#individual-command-files
// We recommend attaching a .commands property to your client instance so that you
// can access your commands in other files. The rest of the examples in this guide
// will follow this convention.
export default [{
  name: 'join',
  description: 'Join The Cat Club for exclusive perks!',
  run: (api, input) => {
    const { client, interaction } = input;
    if(!interaction.guild) return; // Returns as there is no guild?
    const result = api.addNewUser({
      id: interaction.user.id,
      guide_id: interaction.guild.id,
      user_tag: interaction.user.tag,
      xp: 1000
    });
    return result;
  },
  successText: 'Welcome to The Cat Club!',
  xp: 100
}, {
  name: 'leave',
  description: 'Leave The Cat Club and delete all account data',
  replyText: 'We will miss you! All your account data has been deleted. Hope to see you again soon!',
  run: (client, interaction) => {
    // TODO: Remove user object from cloud
  },
}, {
  name: 'help',
  description: 'Help with The Cat Club bot commands'
}, {
  name: 'level',
  description: 'Gain some level xp for no reason!',
  run: (client, interaction) => {
    // TODO: Write a class for creating simple mini-games
  },
  replyText: 'Congratulations you found our first secret! Enjoy this +1000 XP Bonus!',
  xp: 1000
}, {
  name: 'ping',
  description: 'Replies with pong!',
  replyText: 'Pong!',
  xp: 1
}, {
  name: 'server',
  description: 'Replies with server info!',
  run: (client, interaction) => {
    // TODO: Fetch server object from cloud and return a public summary to the user based on roles and perks
    // Each server has shared missions that server users can complete,
    // have leaderboards and show progress/completion of the shared server wide missions.
  },
}, {
  name: 'user',
  description: 'Replies with user info!',
  run: (api, input) => {
    // TODO: Fetch user object from cloud and return a summary to the user
  }
}, {
  name: 'update',
  description: 'Updates the bot data in the cloud.',
  needs_roles: ['root'],
  run: (api, input) => {
    api.updateBotCloud();
  },
  replyText: 'Cloud data has been updated.'
}];