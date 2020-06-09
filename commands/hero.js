module.exports = async (_y, args) => {
  const site = 'https://www.superherodb.com';
  const heroes = [
    '/loki-mcu/10-12508/',
    '/hela-mcu/10-12595/',
    '/hulk-mcu/10-12494/',
    '/thor-mcu/10-12497/',
    '/odin-mcu/10-13763/',
    '/wasp-mcu/10-13873/',
    '/wong-mcu/10-13900/',
    '/groot-mcu/10-12501/',
  ];
  const url = site + heroes[
    Math.floor(Math.random() * heroes.length)
  ];

  const axios = require('axios');
  const cheerio = require('cheerio');

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

  console.log(stats);

  const hero = {
    img: site + $('div.portrait.user > img').attr('src'),
    name: $('div.column > h2').text(),
  };

  console.log(hero);

  const y = require('../core/base');
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
    console.log(
      'red', red, 'green', green, 'rgb', rgb
    );
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
    .setURL(url)
    .attachFiles([attachment])
    .setImage('attachment://x.png');
  ;

  return _y.message.channel.send(embed);
};
