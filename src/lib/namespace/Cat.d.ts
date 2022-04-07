declare namespace Cat {
  interface User extends Club.User {

  }
  interface DiscordBot extends Bot.Discord {
    
  }
  interface Cache {

  }
  interface LoadConfigFiles {

  }

  // Certain people can create clubs to host their own bots on their servers, etc
  // This will just hold the entire collection of Clubs this instance knows about
  const Clubs: Club[];


  // Various publicly scoped APIs
  class Toaster {}
}
