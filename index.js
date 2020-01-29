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
    const pingTypes = [
  "🏓|**Pong.**Testing,testing.Is this thing working?",
  "🏓|**Pong.**Match point.Let's see what you've got.''",
  "🏓|**Pong.**Keep on pinging me.",
  "🏓|**Pong.**I am alive.",
  "🏓|**Pong.**Can't play niw.Got a meeting with the bots.We're planning to conquer the wor... Wait!Did I say that loudly?!''",
  "🏓|**Pong.**You had a 0.1% chance of getting this message.",
];
const pingMultiply = [
  250,
  250,
  250,
  244,
  5,
  1,
];

let pingNames = [];
for (let i = 0; i < pingTypes.length; i++) {
  const type = pingTypes[i];
  for (let j = 0; j < pingMultiply[i]; j++) {
    pingNames.push(type);
  }
}

let pongName = pingNames[Math.floor(Math.random()* pingNames.length)];
var pong=pongName;
message.channel.send(pong);
  }
});
