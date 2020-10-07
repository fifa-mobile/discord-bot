module.exports = async (id) => {
  const baseURL = 'https://fifarenderz.com/20/player/';
  const url = require('url');
  id = url.parse(id);

  id = id.path.split('/');
  id = id[id.length - 1];

  if (id.length !== 8 && !isNaN(Number(id))) {
    throw new Error(`card id doesn't seem to be right ${id}`);
  }

  const axios = require('axios');
  const cheerio = require('cheerio');

  const siteURL = baseURL + id;

  const html = await axios.get(siteURL);
  const $ = await cheerio.load(html.data);

  const card = {id: id};

  const baseEl = '.player-card > .fm-card > ';
  let el = $(`${baseEl}img.background`);
  card.background = el.attr('data-src');
  el = $(`${baseEl}img.player-img`);
  card.playerImg = el.attr('data-src');
  el = $(`${baseEl}img.club-img`);
  card.clubImg = el.attr('data-src');
  el = $(`${baseEl}img.nation-img`);
  card.nationImg = el.attr('data-src');
  el = $(`${baseEl}span.rating`);
  card.rating = Number(el.text());
  el = $(`${baseEl}span.position`);
  card.position = el.text();
  el = $(`${baseEl}span.name`);
  card.name = el.text().toUpperCase();

  if (card.background.indexOf('PRIME') !== -1) {
    card.prime = true;
  }

  if (card.background.indexOf('ICON') !== -1) {
    card.icon = true;
  }

  card.typeID = type(card.rating, card.prime, card.icon);

  if (card.icon && card.prime) {
    throw new Error('prime and icon detected in a card!');
  }

  const imgBuf = await require('../canvas/card')(card);

  return {
    data: card,
    buffer: imgBuf,
  }
};

function type(rating, prime, icon) {
  if (prime) return 10;
  if (icon) return 9;

  if (rating < 60) return 1;
  if (rating < 70) return 2;
  if (rating < 80) return 3;
  if (rating < 85) return 4;
  if (rating < 90) return 5;
  if (rating < 95) return 6;
  if (rating < 100) return 7;
  if (rating >= 100) return 8;
  return false;
}
