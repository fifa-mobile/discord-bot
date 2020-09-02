
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

id1 = 3;
 amount1 = 1;
 id2 = 6;
 amount2 = 1;
 id3 = 7;
 amount3 = 1;
 idR = 9;
 img1 = `./images/pack/gold.png`;
 img2 = `./images/pack/master.png`
 img3 = `./images/pack/master95.png`
 imgR ='https://fifa-mobile.github.io/images/cards/' + `${weeklyIconID}.png`

  
const {
      createCanvas, loadImage
    } = require('canvas');

 const w = 1280;
 const h = 500;
 const canvas = createCanvas(w, h);
 const ctx = canvas.getContext('2d');
  
 const path = `./images/switchArrows.png`;
 const switchArrows = await loadImage(path);
 ctx.drawImage(switchArrows, 480, 90, 320, 320);
 const canImgR = await loadImage(imgR);
 ctx.drawImage(canImgR, 840, 50, 400, 400);
 const canImg1 = await loadImage(img1);
 const canImg2 = await loadImage(img2);
 const canImg3 = await loadImage(img3);
 const insertSize = 128;
 ctx.drawImage(canImg1, 48, 122, insertSize, insertSize);
 ctx.drawImage(canImg2, 176, 122, insertSize, insertSize);
 ctx.drawImage(canImg3, 304, 122, insertSize, insertSize);
 
 
 const attachment = new D.Attachment(canvas.toBuffer(), 'img.png');

 
 _y.message.channel.send(`SBC completed!`, {files: [attachment]});
  }
  
  
  
