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

const c = y.client;
c.login(y.c.main.token);

c.once('ready', async () => {
  const storedCoins = await User.findAll();
  storedCoins.forEach(b => currency.set(b.uid, b));

  const client = y.client;
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
});

c.on('message', m => {
  const { prefix } = y.c.main;
  if (
    m.channel.name !== 'emoji-spam'
    &&
    m.channel.name !== 'one_word_story'
    &&
    m.channel.name !== 'rythm_songrequests'
    &&
    m.channel.name !== 'red-card'
    &&
    !m.content.startsWith(prefix)
    &&
    !m.author.bot
  ) currency.add(m.author.id, 1);
  if (
    !m.content.startsWith(prefix)
    || m.author.bot
  ) return;
  
  if (
    m.channel.name !== 'bots'
    && 
    m.channel.name !== 'commands'
    &&
    m.channel.name !== 'test'
    &&
    m.channel.name !== 'test-bot'
    &&
    m.channel.name !== 'bot-chat'
    &&
    m.channel.name !== 'server-announcements'
    && 
    m.channel.name !== 'bot-updates'
  ) {
    const guilds = {
      '633689372742516746': '636253531812134942', // ahq
      '743927679476301864': '746842934422405181', // fifa dads
    };

    const channelID = guilds[m.guild.id]
      ? guilds[m.guild.id] : 'unknown';
    
    return m.channel.send(
      `Please use it on <#${channelID}> channel`
    );
  }
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
  require('./commands')(m, cmd, args, currency);
});
