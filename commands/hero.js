const y = require('../core/base');
const {User, Hero} = require('../models/index.js');
const site = 'https://www.superherodb.com';

module.exports = async (_y, args) => {
  const heroesData = require('./hero/data');
  const cmd = args[0];
  const uid = _y.message.author.id;
  const user = await User.findOne({where: {uid: uid}});
  const curr = _y.currency;
  const balance = curr.getBalance(uid);
  const usedHeroes = (await Hero.findAll()).filter(
    hero => hero.userid !== null
  );
  let usedKeys = [];
  for (let i = 0; i < usedHeroes.length; i++) {
    usedKeys.push(usedHeroes.source);
  }

  if (cmd === 'list') {
    let reply = `Couldn't find any hero!`;
    if (usedHeroes.length) {
      reply = `The Heroes`;
      reply += `\n`;
      reply +=
        `----------------------------------------`;
      reply += `\n`;
      for (let i = 0; i < usedHeroes.length; i++) {
        const usedHero = usedHeroes[i];
        reply += String(i + 1).padStart(3, ' ');
        reply += '. ';
        const hero = heroesData.find(
          hero => hero.key === usedHero.source
        );
        reply +=
          (
            hero.name.replace('(MCU)', '')
            + `(${hero.fullName})`
          ).substr(0, 20).padEnd(20, ' ')
        ;
        reply += '| ';
        reply += (
          await usedHero.getUser()
        ).uname(_y.message).padEnd(14, ' ');
        reply += `\n`;
      }
      reply = '```' + reply + '```';
    }
    return _y.reply(reply);
  }

  const unusedHeroesData = heroesData.filter(hero => {
    return usedKeys.indexOf(hero.key) === -1;
  });

  if (cmd === 'suicide') {
    let reply = `Something right, you're not dead!`;
    const status = await user.removeHero();
    if (status) {
      reply =
        `You killed yourself... `
        + `you reborn as puny human`;
    }
    return _y.reply(reply);
  }

  let savedHero = await user.getHero();

  if (savedHero) {
    console.log('... loading hero from db');
  } else {
    console.log('... assigning you a hero ...');
    const choosenIndex = Math.floor(
      Math.random() * unusedHeroesData.length
    );
    source = unusedHeroesData[choosenIndex].key;
    savedHero = await user.assignHero(source);
  }

  const hero = heroesData.find(
    hero => hero.key === savedHero.source
  );

  const D = y.Discord;

  const {
    createCanvas, loadImage, Image
  } = require('canvas');
  const w = 1024;
  const h = 320;
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext('2d');

  ctx.font = 'bold 32px monospace';
  ctx.textBaseline = 'top';
  ctx.fillStyle = '#eee';
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 4;

  const img = await loadImage(hero.img);
  ctx.drawImage(img, 0, 0);

  let posY = 0;
  const stats = hero.stats;
  stats.unshift(['HP', savedHero.hp]);
  for (let i = 0; i < stats.length; i++) {
    const stat = stats[i];
    const percent = stat[1]/100;

    if (stat[1] === '0') continue;

    ctx.textAlign = 'left';
    ctx.fillStyle = '#eee';

    ctx.strokeText(stat[0], 320, posY);
    ctx.fillText(stat[0], 320, posY);

    const green = Math.round(255 * percent);
    const red = Math.round(255 * (1 - percent));
    const rgb = `rgb(${red}, ${green}, 0)`;
    ctx.fillStyle = rgb;

    ctx.textAlign = 'right';
    ctx.strokeText(stat[1], 670, posY);
    ctx.fillText(stat[1], 670, posY);
    
    ctx.fillRect(680, posY, 320 * percent, 32);
    posY += 48;
  }

  const buffer = canvas.toBuffer('image/png');
  const attachment = new D.Attachment(buffer, 'x.png');

  const embed = new D.RichEmbed()
    .setTitle('You are: ' + hero.name)
    .setURL(site + hero.key)
    .attachFiles([attachment])
    .setImage('attachment://x.png');
  ;

  return _y.message.channel.send(embed);
};

async function crawl() {
  const heroURLs = [
    '/loki-mcu/10-12508/',
    '/hela-mcu/10-12595/',
    '/hulk-mcu/10-12494/',
    '/thor-mcu/10-12497/',
    '/odin-mcu/10-13763/',
    '/wasp-mcu/10-13873/',
    '/wong-mcu/10-13900/',
    '/groot-mcu/10-12501/',
  ];

  const axios = require('axios');
  const cheerio = require('cheerio');

  for (let i = 0; i < heroURLs.length; i++) {
    const url  = site + heroURLs[i];
    const html = await axios.get(url);
    const $ = await cheerio.load(html.data);

    const s = $('.columns > .column > script');

    const regExp = /\[([^\]]+)\]/;
    const matches = regExp.exec(s.html());

    const values = matches[1].split(',');

    const stats = [];
    $('.stat-bar').each(function(i, e) {
      const attribute = $(this).find('label').text();
      const o = [attribute, values[i]];
      stats[i] = o;
    });

    const hero = {
      key: heroURLs[i],
      name: $('div.column > h1').text(),
      fullName: $('div.column > h2').text(),
      stats: stats,
      img:
        site + $('div.portrait.user > img').attr('src'),
    };

    console.log(hero);
  }
}
