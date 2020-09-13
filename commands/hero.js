const y = require('../core/base');
const {User, Hero} = require('../models/index.js');
const site = 'https://www.superherodb.com';
const heroesData = require('./hero/data');

module.exports = async (_y, args) => {
  // crawl();return;
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
    usedKeys.push(usedHeroes[i].source);
  }

  if (cmd === 'list') {
    let reply = `Couldn't find any hero!`;
    if (usedHeroes.length) {
      reply = `:information_source: | The Heroes`;
      reply += `\n`;
      reply +=
        `----------------------------------------`;
      reply += `\n`;
      const lines = [];
      for (let i = 0; i < usedHeroes.length; i++) {
        let line = '';
        const usedHero = usedHeroes[i];
        line += String(i + 1).padStart(3, ' ');
        line += '. ';
        const hero = heroesData.find(
          hero => hero.key === usedHero.source
        );
        if (!hero) continue;
        line +=
          (
            hero.name
            + (
              (hero.name !== hero.fullName)
              ? ` (${hero.fullName})`
              : ''
            )
          ).substr(0, 20).padEnd(20, ' ')
        ;
        line += '| ';
        line += (
          await usedHero.getUser()
        ).uname(_y.message).padEnd(14, ' ');
        lines.push(line);
      }
      if (lines.length) {
        reply =
          '```' + reply + lines.join ('\n') + '```';
      } else {
        reply = `Couldn't find any hero!`;
      }
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
        `<a:info:751794158162935838> | You killed yourself... `
        + `you reborn as Puny Human`;
    }
    return _y.reply(reply);
  }

  let savedHero = await user.getHero();

  if (cmd === 'show' || cmd === 'fight') {
    if (!args[1]) {
      return _y.reply('<a:info:751794158162935838> | Mention a user!');
    }

    const uid2 = getUser(args[1]);
    const user2 = await User.findOne({
      where: {uid: uid2}
    });
    if (
      user2
      &&
      user.uid === user2.uid
      && cmd === 'fight'
    ) {
      return _y.reply(`<a:cross:751443454244159519> | You can't fight yourself!`);
    }
    let otherHero = false;
    try {
      otherHero = await user2.getHero();
    } catch (e) {}

    const otherName = y.uname(_y.message, uid2);

    if (cmd === 'show') {
      if (otherHero)
        return showHero(_y, otherHero, otherName);
      else
        return _y.reply(
          `<a:info:751794158162935838> | ${otherName} is only a Puny Human.`
        );
    }

    if (!user2) {
      return _y.reply('<a:cross:751443454244159519> | Cannot fight the user!');
    }

    return fight(
      _y, savedHero, otherHero
      , user, user2
    );
  }

  if (savedHero) {
    console.log('... loading hero from db');
  } else {
    console.log('... assigning you a hero ...');
    if (!unusedHeroesData.length) {
      return _y.reply(
        '<a:info:751794158162935838> | No available hero for you. Kill one!'
      );
    }
    const choosenIndex = Math.floor(
      Math.random() * unusedHeroesData.length
    );
    source = unusedHeroesData[choosenIndex].key;
    savedHero = await user.assignHero(source);
  }

  return showHero(_y, savedHero);
};

function getUser(client, str) {
	if (!str) return false;

  if (
    str.startsWith('<@') && str.endsWith('>')
  ) {
		str = str.slice(2, -1);

		if (str.startsWith('!')) {
			str = str.slice(1);
		}

    console.log('get user', str);

		return client.users.cache.get(str);
	}
}

async function crawl() {
  const heroURLs = [
    /*
    '/loki-mcu/10-12508/',
    '/hela-mcu/10-12595/',
    '/hulk-mcu/10-12494/',
    '/thor-mcu/10-12497/',
    '/odin-mcu/10-13763/',
    '/wasp-mcu/10-13873/',
    '/wong-mcu/10-13900/',
    '/groot-mcu/10-12501/',
    */
    /*
    '/shuri-mcu/10-13971/',
    '/yondu-mcu/10-13901/',
    '/falcon-mcu/10-12510/',
    '/gamora-mcu/10-12502/',
    '/mbaku-mcu/10-16672/',
    '/mantis-mcu/10-12592/',
    '/nebula-mcu/10-13897/',
    '/thanos-mcu/10-12505/',
    '/ultron-mcu/10-12509/',
    '/vision-mcu/10-12589/',
    '/ant-man-mcu/10-13875/',
    '/hawkeye-mcu/10-12498/',
    '/wasp-ii-mcu/10-13874/',
    '/agent-13-mcu/10-13903/',
    '/fat-thor-mcu/10-16834/',
    '/heimdall-mcu/10-13882/',
    '/iron-man-mcu/10-12496/',
    '/mysterio-mcu/10-15699/',
    */
    /*
    '/kid-goku/10-12646/',
    '/goku/10-1284/',
    */
    '/valkyrie-mcu/10-12730/',
    '/nick-fury-mcu/10-16352/',
    '/star-lord-mcu/10-12500/',
    '/ant-man-ii-mcu/10-12594/',
    '/maria-hill-mcu/10-13884/',
    '/spider-man-mcu/10-12514/',
    '/black-widow-mcu/10-12499/',
    '/iron-spider-mcu/10-12563/',
    '/jane-foster-mcu/10-13883/',
    '/quicksilver-mcu/10-12507/',
    '/war-machine-mcu/10-12511/',
    '/bucky-barnes-mcu/10-12601/',
    '/peggy-carter-mcu/10-13969/',
    '/black-panther-mcu/10-12586/',
    '/scarlet-witch-mcu/10-12506/',
    '/captain-marvel-mcu/10-12611/',
    '/doctor-strange-mcu/10-12588/',
    '/professor-hulk-mcu/10-16756/',
    '/rocket-raccoon-mcu/10-12503/',
    '/winter-soldier-mcu/10-12728/',
    '/captain-america-mcu/10-12495/',
    '/ronan-the-accuser-mcu/10-13069/',
    '/drax-the-destroyer-mcu/10-12591/',
    '/iron-man-model-prime-mcu/10-13701/',
    '/captain-america-worthy-mcu/10-16755/',
    '/thanos-infinity-gauntlet-mcu/10-14396/',
    '/bruce-banner-hulkbuster-mcu/10-12616/',
    '/star-lord-celestial-power-mcu/10-15124/',
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

function getUser(str) {
	if (!str) return false;

  if (
    str.startsWith('<@') && str.endsWith('>')
  ) {
		str = str.slice(2, -1);

		if (str.startsWith('!')) {
			str = str.slice(1);
		}

		return str;
	}
}

async function showHero(_y, savedHero, name = false) {
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
  ctx.drawImage(img, 40, 0);

  let posY = 0;
  const stats = [...hero.stats];
  stats.unshift(['HP', savedHero.hp]);
  for (let i = 0; i < stats.length; i++) {
    const stat = stats[i];
    const percent = stat[1]/100;

    if (stat[1] === '0') continue;

    ctx.textAlign = 'left';
    ctx.fillStyle = '#eee';

    ctx.strokeText(stat[0], 300, posY);
    ctx.fillText(stat[0], 300, posY);

    const green = Math.round(255 * percent);
    const red = Math.round(255 * (1 - percent));
    const rgb = `rgb(${red}, ${green}, 0)`;
    ctx.fillStyle = rgb;

    ctx.textAlign = 'right';
    ctx.strokeText(stat[1], 650, posY);
    ctx.fillText(stat[1], 650, posY);
    
    ctx.fillRect(660, posY, 320 * percent, 32);
    posY += 48;
  }

  const buffer = canvas.toBuffer('image/png');
  const attachment = new D.MessageAttachment(buffer, 'x.png');

  let person = `<a:hero:752812855358783560> | You are`;
  if (name) person = `${name} is`;
  const embed = new D.MessageEmbed()
    .setTitle(
      person + ': ' + hero.name
      + (
        (hero.name !== hero.fullName)
        ? ` (${hero.fullName})`
        : ''
      )
    )
    .setURL(site + hero.key)
    .attachFiles([attachment])
    .setImage('attachment://x.png');
  ;

  return _y.reply(embed);
}

async function fight(
  _y, savedHero, otherHero, user, user2
) {
  let firstHero, secondHero, firstHP, secondHP;
  try {
    firstHero = heroesData.find(
      hero => hero.key === savedHero.source
    );
  } catch (e) {}
  try {
    secondHero = heroesData.find(
      hero => hero.key === otherHero.source
    );
  } catch (e) {}

  const punyHuman = {
    key: false,
    name: 'Puny Human',
    fullName: '',
    stats: [
      [ 'HP', '0' ],
      [ 'Intelligence', '1' ],
      [ 'Strength', '1' ],
      [ 'Speed', '1' ],
      [ 'Durability', '1' ],
      [ 'Power', '1' ],
      [ 'Combat', '1' ],
      [ 'Tier', '0' ]
    ],
    img: 'https://i.ibb.co/mhLYHCQ/puny-human.png'
  };

  if (!firstHero) {
    firstHero = punyHuman;
    firstHP = 0;
  } else {
    firstHP = savedHero.hp;
  }
  if (!secondHero) {
    secondHero = punyHuman;
    secondHP = 0;
  } else {
    secondHP = otherHero.hp;
  }

  calculateFight(
    firstHero, secondHero
    , firstHP, secondHP
  );

  let result = '';

  if (
    firstHero.dead && secondHero.dead
  ) {
    result = '<a:hero:752812855358783560> | You are both dead!';
  } else if (firstHero.dead) {
    result = '<a:hero:752812855358783560> | You are dead!';
  } else if (secondHero.dead) {
    result = '<a:hero752812855358783560> | You killed ' + secondHero.name;
  } else {
    result = '<a:hero:752812855358783560> | You both survived!';
  }

  const D = y.Discord;

  const {
    createCanvas, loadImage, Image
  } = require('canvas');
  const w = 1024;
  const h = 320;
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext('2d');

  if (savedHero) {
    savedHero.hp -= firstHero.damage;
    await savedHero.save();

    if (firstHero.dead) {
      user.removeHero();
    } else {
      const percent = savedHero.hp / 100;
      const green = Math.round(255 * percent);
      const red = Math.round(255 * (1 - percent));
      const rgb = `rgb(${red}, ${green}, 0)`;

      ctx.fillStyle = rgb;
      
      ctx.fillRect(280, 40, 232 * percent, 32);
    }
  }

  if (otherHero) {
    otherHero.hp -= secondHero.damage;
    await otherHero.save();

    if (secondHero.dead) {
      user2.removeHero();
    } else {
      const percent = otherHero.hp / 100;
      const green = Math.round(255 * percent);
      const red = Math.round(255 * (1 - percent));
      const rgb = `rgb(${red}, ${green}, 0)`;

      ctx.fillStyle = rgb;
      
      ctx.fillRect(
        513 + (232 * (1 - percent)), 40
        , 232 * percent, 32
      );
    }
  }

  ctx.font = 'bold 28px monospace';
  ctx.textBaseline = 'top';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#eee';
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 4;

  ctx.strokeText(result, 512, 2);
  ctx.fillText(result, 512, 2);

  ctx.fillRect(512, 60, 8, 240);

  ctx.drawImage(
    await loadImage(firstHero.img), 40, 0
  );
  ctx.drawImage(
    await loadImage(secondHero.img)
    , canvas.width - 280, 0
  );

  ctx.font = 'bold 72px monospace';
  ctx.fillStyle = 'red';
  ctx.textAlign = 'center';

  ctx.fillText(`-${firstHero.damage}`, 422, 140);
  ctx.fillText(`-${secondHero.damage}`, 602, 140);

  const buffer = canvas.toBuffer('image/png');
  const attachment = new D.MessageAttachment(buffer, 'x.png');

  const embed = new D.MessageEmbed()
    .setTitle(
      firstHero.name
      + ' ~ VS ~ '
      + secondHero.name
    )
    .attachFiles([attachment])
    .setImage('attachment://x.png');
  ;

  return _y.reply(embed);
}

function calculateFight(
  firstHero, secondHero
  , firstHeroHP, secondHeroHP
) {
  firstHero.dead = false;
  secondHero.dead = false;
  firstHero.total = totalPower(firstHero.stats);
  secondHero.total = totalPower(secondHero.stats);

  const selectorFactory = require("random-selector");
  const winner =
    selectorFactory
    .createFrequencySelectorWithReplacement(
      [
        [1, firstHero.total],
        [2, secondHero.total],
      ]
      , firstHero.total + secondHero.total
    ).select();

  if (winner === 1) {
    secondHero.damage = 70;
    const shHP = Number(secondHeroHP) - 70;
    if (shHP <= 0) secondHero.dead = true;

    firstHero.damage = 30;
    const fhHP = Number(firstHeroHP) - 30;
    if (fhHP <= 0) firstHero.dead = true;
  }
  if (winner === 2) {
    secondHero.damage = 30;
    const shHP = Number(secondHeroHP) - 30;
    if (shHP <= 0) secondHero.dead = true;

    firstHero.damage = 70;
    const fhHP = Number(firstHeroHP) - 70;
    if (fhHP <= 0) firstHero.dead = true;
  }
}

function totalPower(stats) {
  let total = 0;
  for (let i = 0; i < stats.length; i++) {
    const stat = stats[i];
    total += Number(stat[1]);
  }
  return total;
}
