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

  const embed = new D.RichEmbed()
    .setTitle('You are ' + hero.name)
    .setURL(url)
    .setImage(hero.img);
  ;

  _y.message.channel.send(embed);
};
