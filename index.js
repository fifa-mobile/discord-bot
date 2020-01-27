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

const http = require('http');
const server = http.createServer(function (req, res) {
  const url = req.url;
  if (url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('0.0.1\n');
  } else {
    res.statusCode = 404;
    res.end('404, sorry!\n');
  }
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on ${PORT}/`);
});

client.once('ready', () => {
  console.log(`logged in as ${client.user.tag}!`);
});

client.on('message', m => {
  if (m.content.startsWith(`${prefix}ping`)) {
    m.channel.send('Pong.');
  }
});
