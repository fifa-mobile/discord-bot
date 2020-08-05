const y = require('../core/base');
const {User} = require('../models/index.js');

module.exports = async (_y, args) => {
  const curr = _y.currency;
  const uid = _y.message.author.id;
  const cost = 10;
  const user = await User.findOne({where: {uid: uid}});
  const balance = curr.getBalance(uid);
  const cmd = args[0];

  const data = [
    [],
    [400  , 1     , ":brown_circle:│Bronze"],
    [300  , 5     , ":white_circle:│Silver"],
    [175  , 10    , ":yellow_circle:│Gold"],
    [50   , 15    , ":red_circle:│Elite 80-85"],
    [30   , 30    , ":red_circle:│Elite 85+"],
    [20   , 50    , ":purple_circle:│Master 90-95"],
    [10   , 100   , ":purple_circle:│Master 95+"],
    [2    , 500  , ":black_circle:│Legendary"],
    [12   , 200   , ":star:│Icon"],
    [1    , 2000 , ":star2:│Prime Icon"],
  ];

  const cards = [
    [],
    //'bronze',
    [
      21181849,
      21186969,
      21206425,
      21236946,
      21220306,
      21221589,
      21228757,
      21250774,
      21245893,
      21232325,
      21240262,
      21238983,
      21240775,
      21229429,
      21245862,
      21233667,
      21248268,
      21248272,
      21251867,
      21242106,
      21242874,
      21243898,
      21244927,
      21251840,
      21245510,
      21251824,
      21244809,
      21251980,
      21245426,
      21248408,
      21239515,
      21252911,
      
    ],
    //'silver',
    [
      21196976,
      21228464,
      21229488,
      21101488,
      21242289,
      21229349,
      21111590,
      21248550,
      21201958,
      21240035,
      21243619,
      21193187,
      21201891,
      21220638,
      21234463,
      21220895,
      21226783,
      21239631,
      21245008,
      21228625,
      21232360,
      21235689,
      21213763,
      21193277,
      21232360,
      21246951,
      21242191,
      21235290,
      21234059,
      21201179,
      21239838,
      21501653,
      21501309,
    ],
    //'gold',
    [
      21202646,
      21208534,
      21231318,
      21230147,
      21220932,
      21200197,
      21193158,
      21137351,
      21172937,
      21217605,
      21188166,
      21236920,
      21215417,
      21238095,
      21184501,
      21213353,
      21192883,
      21242444,
      21194333,
      21186648,
      21198420,
      21230613,
      21212616,
      21189881,
      21220018,
      21205402,
      21501052,
      21500491,
      21501642,
      21501490,
      21500459,
      21501297,
      21500112,
    ],
    //'elite',
    [
      21500257,
      21206113,
      21500684,
      21501964,
      21501710,
      21500978,
      21501994,
      21501734,
      21501294,
      21501044,
      21501178,
      21503085,	
      21502926,	
      21503201,	
      21503403,	
      21503536,	
      21503089,	
      21503404,	
      21503204,	
      21503539,	
      21503205,
    ],
    //'elite85',
    [
      21502425,
      21501408,
      21502350,
      21500565,
      21501338,
      21500480,
      21501885,
      21500353,
      21501334,
      21502204,
      21503044,	
      21503041,	
      21503491,	
      21503494,	
      21503360,	
      21503356,	
      21503159,	
      21503156,	
      21502965,	
      21502962,	
      21502882,	
      21502885,
    ],
    //'master',
    [
      21500962,
      21501987,
      21501220,
      21501347,
      21500742,
      21501572,
      21500140,
      21501365,
      21502062,
      21500551,
      21501160,
      21500828,
    ],
    //'master95',
    [
      21501958,
      21501720,
      21501511,
      21500728,
      21501769,
      21501868,
      21502275,
      21500874,
      21500482,
      21501511,
      21502077,
      21503474,	
      21503131,	
      21502938,	
      21502858,
    ],
    //'legend',
    [
      21502272,
      21502458,
      21502385,
      21503329,	
      21503013,
    ],
    //'icon',
    [
      21502635,
      21502193,
      21502634,
      21502631,
      21502791,
      21502632,
      21502633,
      21502194,
      21502195,
      21502639,
      21502198,
      21502199,
      21502642,
    ],
    //'prime',
    [
      21500198,
      21501546,
      21502457,
      21502055,
      21501668,
      21502188,
      21502076,
    ]
  ];

  if (cmd === 'info') {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (!item.length) continue;
      const [possibility,, type] = item;
      total += possibility;
    }
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (!item.length) continue;
      const [possibility,, type] = item;
      const percentage = (
        possibility / total * 100
      ).toLocaleString(
          undefined, {minimumFractionDigits: 1}
      );
      data[i].push(percentage);
    }
    let lines = [
      '`·id│price   │ chance %`'
    ];
    for (let i = data.length - 1; i >= 0; i--) {
      const item = data[i];
      if (!item.length) continue;
      let [, price, type, percentage] = item;
      const id = String(i).padStart(2, ' ');
      price = String(
        price
      ).substring(0, 5).padStart(6, ' ');
      percentage = String(
        percentage
      ).substring(0, 6).padStart(6, ' ');
      const line =
        `\`·${id}│$${price} │ ${percentage} %\` │`
        + `${type}`
      ;
      lines.push(line);
    }
    return _y.reply(lines.join('\n'));
  }

  if (cmd === 'list') {
    const packs = await user.getPacks();
    if (!packs.length) {
      return _y.reply(`You don't have any player.`);
    }
    let lines = [];
    for (let i = 0; i < packs.length; i++) {
      const pack = packs[i];
      const [,,type] = data[pack.packid];
      const amount = '`' + '·' + String(
        pack.amount
      ).padStart(4, ' ') + '`';
      const line = `${amount} - ${type}`;
      lines.push(line);
    }
    return _y.reply(lines.join('\n'));
  }

  if (cmd) {
    return _y.reply(
      `Option **${cmd}** not found, `
      + `try, \`list / info\``
    );
  }

  if (!user || cost > balance) {
    return _y.reply(
      `You don't have enough coins! Cost: $${cost}`
    );
  }

  let players = [];
  for (let i = 0; i < data.length; i++) {
    if (!data[i].length) continue;
    const [multiplier,, player] = data[i];
    for (let j = 0; j < multiplier; j++) {
      players.push({id: i, type: player});
    }
  }

  const choosen = players[
    Math.floor(Math.random() * players.length)
  ];
  const card = cards[choosen.id][
    Math.floor(Math.random() * cards[choosen.id].length)
  ];

  curr.add(uid, -cost);
  await user.addPack(choosen.id);

  const title = `You got a ${choosen.type} player`;

  const url =
    'https://fifa-mobile.github.io/images/cards/'
    +
    `${card}.png`
  ;
  const D = y.Discord;
  const embed = new D.RichEmbed()
    .setColor('#0099ff')
    .setTitle(title)
    .setImage(url)
    .setURL(url)
  ;
	_y.reply(embed);
};
