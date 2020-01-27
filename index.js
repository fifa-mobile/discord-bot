const Discord = require('discord.js');
const client = new Discord.Client();

let config = null;
try {
  config = require('./config.json');
} catch (e) {
  config = JSON.parse(process.env.config);
}
const { prefix, token } = config;
client.login(token);

client.once('ready', () => {
  console.log(`logged in as ${client.user.tag}!`);
});

client.on('message', m => {
  if (m.content.startsWith(`${prefix}ping`)) {
    m.channel.send('Pong.');
  }
});
