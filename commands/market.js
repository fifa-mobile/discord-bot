module.exports = async (_y, args) => {
  const {User} = require('../models/index');
  const uid = _y.message.author.id;
  const user = await User.findOne({where: {uid: uid}});
  const y = require('../core/base');
  const D = y.Discord;
  
  if(cmd === 'price' || cmd === 'prices'){
  const { createCanvas, loadImage } = require('canvas');

  const w = 1280;
  const h = 500;

  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext('2d');

  const types = {
    1: {
      price: 1,
      image: "bronze",
    },
    2: {
      price: 7,
      image: "silver",
    },
    3: {
      price: 13,
      image: "gold",
    },
    4: {
      price: 20,
      image: "elite",
    },
    5: {
      price: 39,
      image: "elite85",
    },
    6: {
      price: 65,
      image: "master",
    },
    7: {
      price: 130,
      image: "master95",
    },
    8: {
      price: 650,
      image: "legend",
    },
    9: {
      price: 260,
      image: "icon",
    },
    10: {
      price: 2600,
      image: "prime",
    },
  };

  ctx.font = 'bold 50pt monospace';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#eee';
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 16;

  const packs = await user.getPacks();
  let [posX, posY] = [128, 8];
  let resetX = true;
  for (let i = 10; i > 0; i--) {
    const pack = packs.filter(
      pack => pack.packid === i
    );
    let amount = 0;
    if (pack.length) {
      amount = pack[0].amount;
    }
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
    ctx.strokeText(amount, posX - 5, posY + 60);
    ctx.fillText(amount, posX - 5, posY + 60);
    ctx.drawImage(img, posX, posY, 128, 128);
    posX += 256;
  }

  ctx.fillStyle = "#eee";
  ctx.fillRect(0, 340, canvas.width, 8);

  ctx.font = 'bold 50pt serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = "#eee";


  const buffer = canvas.toBuffer('image/png');
  const attachment = new D.Attachment(buffer, 'x.png');
  _y.reply({files: [attachment]});
};
}
