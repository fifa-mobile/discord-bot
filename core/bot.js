const y = require('./base');

const currency = new y.Discord.Collection();
const db = require('../models/index.js');
const User = db.User;

Reflect.defineProperty(currency, 'getBalance', {
  value: function getBalance(id) {
    const user = currency.get(id);
    return user ? user.coins : 0;
  },
});

Reflect.defineProperty(currency, 'add', {
  value: async function add(id, amount) {
    const user = currency.get(id);
    if (user) {
      user.coins += Number(amount);
      return user.save();
    }
    const newUser = await User.create({
      uid: id, coins: amount
    });
    currency.set(id, newUser);
    return newUser;
  },
});

async function ready() {
  const storedCoins = await User.findAll();
  storedCoins.forEach(b => currency.set(b.uid, b));

  const client = this.y.client;
  y.l(`logged in as ${client.user.tag}!`);

  client.user.setActivity(
    y.c.insource.activity.content
    , { type: y.c.insource.activity.type }
  ).then(presence => {
    console.log(
      `Activity set to ${
        presence.activities[0].name
      }`
    );
  }).catch(console.error);
}

function message(m) {
  this.y.message = m;
  this.y.reply = text => {
    m.channel
      .send(text)
      .then(
        message => console.log(
          `------------ message sent!`
          +
          `\nreplyingTo: ${y.uname(m, m.author.id)}`
          +
          `\nmessage: ${y.uname(message, message.author.id)}`
          +
          `\nonChannel: ${m.channel.name}`
          +
          `\nmessage: ${message.channel.name}`
          +
          `\ncontent: ${message.content}`
        )
      )
      .catch(console.error)
    ;
  };
  this.y.replyCode = text => {
    m.channel
      .send('```' + text + '```')
      .then(
        message => console.log(
          `------------ message sent!`
          +
          `\nreplyingTo: ${y.uname(m, m.author.id)}`
          +
          `\nonChannel: ${m.channel.name}`
          +
          `\ncontent: ${message.content}`
        )
      )
      .catch(console.error)
    ;
  };
  this.y.currency = currency;
  const { prefix } = y.c.main;
  if (
    m.channel.name !== 'emoji-spam'
    &&
    m.channel.name !== 'one_word_story'
    &&
    !m.content.startsWith(prefix)
    &&
    !m.author.bot
  ) currency.add(m.author.id, 1);
  if (
    !m.content.startsWith(prefix)
    || m.author.bot
  ) return;

  const input = m.content.slice(prefix.length).trim();
  const { parseArgsStringToArgv } = require(
    'string-argv'
  );
  const args = parseArgsStringToArgv(input);
  const cmd = args.shift();
  require('./commands')(this.y, cmd, args);
}

class Bot {
  constructor(_y) {
    this.y = _y;
    this.init();
  }

  init() {
    const c = this.y.client;
    c.login(y.c.main.token);
    c.once('ready', ready.bind(this));
    c.on('message', message.bind(this));
  }
}

module.exports = (y) => new Bot(y);
