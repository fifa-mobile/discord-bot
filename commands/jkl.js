
module.exports = async (_y, args) => {
  const {User} = require('../models/index');
  const cards = require('../data/cards');
  const uid = _y.message.author.id;
  const user = await User.findOne({where: {uid: uid}});
  const y = require('../core/base');
  const D = y.Discord;
  const cmd = args[0];
  const curr = _y.currency;
  const balance = curr.getBalance(uid);
  
  const weeklyIcon = 'Schmeichel';
  const weeklyIconID = 21502635;
  const weeklyPrime = 'Zidane';
  const weeklyPrimeID = 21500198;

 id1 = 9;
 amount1 = 3;
 id2 = 8;
 amount2 = 2;
 id3 = 0;
 amount3 = 0;
 idR = 10;
 img1 = `./images/pack/icon.png`;
 img2 = img1;
 img3 = img1;
 img4 = `./images/pack/legend.png`;
 img5 = img4;
 imgR ='https://fifa-mobile.github.io/images/cards/' + `${weeklyPrimeID}.png`
 console.log("choice9");

  
const {
      createCanvas, loadImage
    } = require('canvas');

 const w = 1280;
 const h = 500;
 const canvas = createCanvas(w, h);
 const ctx = canvas.getContext('2d');
  
 const path = `./images/switchArrows.png`;
 const switchArrows = await loadImage(path);
 ctx.drawImage(switchArrows, 640, 250, 320, 320);
 const canImgR = await loadImage(imgR);
 ctx.drawImage(canImgR, 1040, 250, 400, 400);
 const canImg1 = await loadImage(img1);
 const canImg2 = await loadImage(img2);
 const canImg3 = await loadImage(img3);
 const canImg4 = await loadImage(img4);
 const canImg5 = await loadImage(img5);
 const insertSize = 128;
 ctx.drawImage(canImg1, 112, 186, insertSize, insertSize);
 ctx.drawImage(canImg2, 240, 186, insertSize, insertSize);
 ctx.drawImage(canImg3, 368, 186, insertSize, insertSize);
 ctx.drawImage(canImg4, 176, 314, insertSize, insertSize);
 ctx.drawImage(canImg5, 304, 314, insertSize, insertSize);
 
 
 const attachment = new D.Attachment(canvas.toBuffer(), 'img.png');

 
 _y.message.channel.send(`SBC completed!`, {files: [attachment]});
  }
  
  
  };
