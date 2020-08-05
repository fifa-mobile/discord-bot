module.exports = async (_y, args) => {
  const {User} = require('../models/index');
  const uid = _y.message.author.id;
  const user = await User.findOne({where: {uid: uid}});
  const y = require('../core/base');
  const D = y.Discord;
  const cmd = args[0];
  const curr = _y.currency;
  const balance = curr.getBalance(uid);
  
  if(cmd === 'price' || cmd === 'prices'){
  const { createCanvas, loadImage } = require('canvas');

  const w = 1280;
  const h = 500;

  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext('2d');

  const types = {
    1: {
      price: 2,
      image: "bronze",
    },
    2: {
      price: 8,
      image: "silver",
    },
    3: {
      price: 15,
      image: "gold",
    },
    4: {
      price: 23,
      image: "elite",
    },
    5: {
      price: 45,
      image: "elite85",
    },
    6: {
      price: 75,
      image: "master",
    },
    7: {
      price: 150,
      image: "master95",
    },
    8: {
      price: 750,
      image: "legend",
    },
    9: {
      price: 300,
      image: "icon",
    },
    10: {
      price: 3000,
      image: "prime",
    },
  };

  ctx.font = 'bold 30pt monospace';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#eee';
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 16;

  let [posX, posY] = [128, 8];
  let resetX = true;
  for (let i = 10; i > 0; i--) {
    
    if (i < 6) {
      posY = 180;
      if (resetX) {
        posX = 128;
        resetX = false;
      }
    }
    const type = types[i];
    const path = `./images/pack/${type.image}.png`;
    const img = await loadImage(path);
    ctx.strokeText(type.price, posX - 5, posY + 60);
    ctx.fillText(type.price, posX - 5, posY + 60);
    ctx.drawImage(img, posX, posY, 128, 128);
    posX += 256;
  }

  ctx.fillStyle = "#eee";
  ctx.fillRect(0, 340, canvas.width, 8);

  ctx.font = 'bold 50pt serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = "#fffe4c";
  
  ctx.fillText("Market Prices", 350, 420);
  
  ctx.drawImage(currency_Item_COIN.png, 100, 420, 128, 128);

  const buffer = canvas.toBuffer('image/png');
  const attachment = new D.Attachment(buffer, 'x.png');
  _y.reply({files: [attachment]});
};


if (cmd === 'sell') {
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
    const id = args[1];
    const amount = Number(args[2]);
    if (!id) {
      return _y.reply('Id required, see `$pack info`.');
    }
    if (!amount || amount < 1) {
      return _y.reply('Amount number needed!');
    }
    const pack = await user.getPack(id);
    if (!pack || !pack.amount) {
      return _y.reply(
        `You don't have ${data[id][2]} player.`
      );
    }
    if (amount > pack.amount) {
      return _y.reply(
        `You only have **${pack.amount}**.`
        + ` ${data[id][2]} player`
      );
    }
    const price = data[id][1];
    await user.addPack(id, amount);
    curr.add(uid, price * amount);
    return _y.reply(`You get $${price * amount} coins!`);
  }
  
    if (cmd === 'buy') {
      const data = [
    [],
    [400  , 2     , ":brown_circle:│Bronze"],
    [300  , 8     , ":white_circle:│Silver"],
    [175  , 15    , ":yellow_circle:│Gold"],
    [50   , 23    , ":red_circle:│Elite 80-85"],
    [30   , 45    , ":red_circle:│Elite 85+"],
    [20   , 75    , ":purple_circle:│Master 90-95"],
    [10   , 150   , ":purple_circle:│Master 95+"],
    [2    , 750  , ":black_circle:│Legendary"],
    [12   , 300   , ":star:│Icon"],
    [1    , 3000 , ":star2:│Prime Icon"],
  ];
    const id = args[1];
    const amount = Number(args[2]);
    if (!id) {
      return _y.reply('Id required, see `$pack info`.');
    }
    if (!amount || amount < 1) {
      return _y.reply('Amount number needed!');
    }
    const pack = await user.getPack(id);
    const price = data[id][1];
    await user.addPack(id, -amount);
    curr.add(uid, -1 * price * amount);
    return _y.reply(`You purchased ${amount} ${data[id][2]} players.`);
  }
}
