
import express from 'express';
import CatClubApi from './api/CatClubApi';
import fs from 'fs';

const api = new CatClubApi();
const app = express();
const port = 5555;

// Express can continue to live here for the time being as Jupyter notebooks will
// contain most of the content being served.
// Express can, for now, expose public APIs on HTTPS.
// Tho those should probably be defined inside the classes of said API and exposed
// to the app scope.
// Find a good replacement for Express
fs.readFile('./bot/config.json', 'utf-8', (err, data) => {
  if (err) throw err;
  const config = JSON.parse(data);
  api._setupDiscordBot(config); // api.discordBot

  // Express listeners and routes
  app.listen(port, () => {
    console.log(`TheCatClub.io | listening on port ${port}`);
  });
  app.get('/docs', (req, res) => {
    res.send('DOCS HERE!');
  });
});



