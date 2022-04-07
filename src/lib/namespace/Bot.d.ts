import DiscordApi from 'discord.js';
declare namespace Bot {
  export namespace Discord { // Namespace -> Class -> Interface on top of class, this allows extend
    export class Login {}
    export class _setupListeners {}
    export class Client extends DiscordApi.Client {
      constructor(_config: any) {
        super(null);
        return this;
      }
    }
  }
}