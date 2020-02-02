const l = console.log;
const { prefix, token } = require('./config');
const Discord = require('discord.js');
const client = new Discord.Client();

client.login(token);

client.once('ready', () => {
  l(`logged in as ${client.user.tag}!`);
});

client.on('message', async m => {
  if (!m.content.startsWith(prefix) || m.author.bot) return;

  const args = m.content.slice(prefix.length).split(/[\n, \s]+/);
  const cmd = args.shift().toLowerCase();

  l(cmd, args);
});
