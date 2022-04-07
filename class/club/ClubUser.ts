import ClubCache from '/ClubCache';

export class ClubUser {
  constructor(id: number, name: string, tag: string, roles: []) {
    // This is our main user object we will across the platform
    
  }

  addNewUser(input) { // TODO: Validate this new user's correct intro XP
    // Add user to cached database object
    if (this.cached_bot_data[input.id]) return {allowed: true, message: 'You have already joined!'};
    this.cached_bot_data[input.id] = {
      ...input
    };
    this._writeCachedBotData();
  }
}