// class CatApi {


// }
// ... elsewhere ...
// namespace C {
//   export interface D {}
// }
// let y: C.D; // OK


// TODO: Backend API Handler for reading/write data between disk, memory and cloud
// Will also handle APIs needed for website hosting, etc
import { Storage } from '@google-cloud/storage';
// import * as fs from 'fs/promises';
import fs from 'fs';
import DiscordBot from './DiscordBotApi.js';

export default class CatClubApi {
  discordBot: DiscordBot;
  cached_bot_data: Object; // convert to buffer
  cloud_bot_data: Object;

  constructor() {
    this.cached_bot_data = {}; // Make the cache entries into a class?
    this.cloud_bot_data = {};
  }

  async _setup() {
    await this._readCloudBotData();
    await this._writeCloudBotData();
  }

  async _setupDiscordBot(config) {
    this.discordBot = new DiscordBot(this, config);
    return true; // false with thrown error messages
  }

  async _setupJupyterServer() {
    return null;
  }

  // Private
  async _updateDiskToCloud() {
    const storage = new Storage({
      projectId: 'thecatclub',
      keyFilename: 'api/cloud_config.json'
    });
    const bot_bucket = storage.bucket('thecatclub');
    bot_bucket.upload('./bot/bot_database.json', function(err, file, apiResponse) {
      if (err) throw err;
      console.log('Wrote disk cache to cloud', apiResponse);
    });
  }
  async _readCachedBotData() {
    const _this = this;
    fs.readFile('./bot/bot_database.json', 'utf8', (err, data) => {
      if (err) throw err;

      _this.cached_bot_data = JSON.parse(data);
      console.log('Read disk cache to memory');
    });
  }

  async _writeCachedBotData() {
    const _this = this;
    // use try/catch?
    fs.writeFile('./bot/bot_database.json', JSON.stringify(_this.cached_bot_data), () => {
      console.log('Wrote memory cache to disk');
    });
  }

  async _writeCloudBotData() {
    const _this = this;
    // use try/catch?
    fs.writeFile('./bot/bot_database.json', JSON.stringify(_this.cloud_bot_data), () => {
      console.log('Wrote cloud memory cache to disk');
    });
  }

  async _readCloudBotData() { // TODO: Clean up with awaits again
    const _this = this;
    const storage = new Storage({
      projectId: 'thecatclub',
      keyFilename: 'api/cloud_config.json'
    });
    const bucket = storage.bucket('thecatclub');
    const file = bucket.file('bot_database.json');

    file.download(function(err, contents) {
      if (err) throw err;
      console.log('Read cloud bot data to memory');
      _this.cloud_bot_data = contents;
    });
  }

  // Public
  // API access permissions should be stored in a bucket and accessed via another api object
  // return any errors from writing to the cache/memory,
  // let the discord api handle displaying the correct error messages and handling


  // Move these to the discord api
  // TODO: Add validators to each command and API request
  // joinValidator(username) {
  //   return this.root_users.has(username);
  // }
  updateBotCloud() { // Perform backend validate for permissions as well
    this._updateDiskToCloud();
  }
  sendMessage() { // This needs to be private-ish
  }
  getDiscordUserById(id) {
    return this.cached_bot_data[id];
  }
  // TODO: All APIs should have this: Log all API requests to the cloud bucket
  // TODO: Debug everything important and have a toggle for on/on
  // Similar to a prod/test toggle
  // Removes the need to continue writing random console logs
  // Get vscode debugger attached
  logger() {
  }
  debug() {
  }


}
