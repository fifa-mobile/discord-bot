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
  
  if(!cmd || cmd === 'list'){
  const botEmbed = new D.RichEmbed()
    .setColor('#74b4c3')
    .setTitle('SBC')
    .setDescription('Use $sbc complete [id] to complete a SBC.')
    .setThumbnail('https://raw.githubusercontent.com/fifa-mobile/discord-bot/master/images/sbc.jpg')
    .addField('1.Bronze Upgrade:', '4 Bronze players<->1 Silver player')
    .addField('2.Silver Upgrade:', '3 Bronze players+1 Silver player<->1 Gold player')
    .addField('3.Gold Upgrade:', '2 Bronze players+1 Gold player<->1 Elite 80-85 player')
    .addField('4.Weak Elite Upgrade:', '1 Gold player+1 80-85 Elite player<->1 85+ Elite player')
    .addField('5.Elite Upgrade:', '1 Gold player+1 85+ Elite player<->1 90-95 Master player')
    .addField('6.Weak Master Upgrade:', '1 85+ Elite player+1 90-95 Master player<->1 95+ Master player')
    .addField('7.Master Upgrade:', '4 95+ Master player<->1 Legendary player')
    .addField('8.Icon '+ weeklyIcon +':', '1 Gold player+1 90-95 Master player+1 95+ Master player<->1 '+ weeklyIcon +' Icon player')
    .addField('9.Prime Icon '+ weeklyPrime +':', '3 Icon players+2 Legendary players<->1 '+ weeklyPrime +' Prime Icon player')
    .setFooter('The players used in the challenge will be removed from your inventory, so think well before completing.');
  _y.reply(botEmbed);
  }
 var img1;
 var img2;
 var img3;
 var img4;
 var img5;
 var imgR;
 var id1;
 var amount1;
 var id2;
 var amount2;
 var id3;
 var amount3;
 var idR;
  if( cmd === 'complete'){ 
  const amountR = 1;
  if(!args[1] || args[1] > 9 || args[1] < 1){
  _y.reply('Invalid ID.Check `$sbc` or `$sbc list` for IDs.');
  }
 if(args[1] === 1){
 id1 = 1;
 amount1 = 4;
 id2 = 0;
 amount2 = 0;
 id3 = 0;
 amount3 = 0;
 idR = 2;
 img1 = `./images/pack/bronze.png`;
 img2 = img1;
 img3 = img1;
 img4 = img1;
 imgR = `./images/pack/silver.png`;
}else  if(args[1] === 2){
 id1 = 1;
 amount1 = 3;
 id2 = 2;
 amount2 = 1;
 id3 = 0;
 amount3 = 0;
 idR = 3;
 img1 = `./images/pack/bronze.png`;
 img2 = img1;
 img3 = img1;
 img4 = `./images/pack/silver.png`;
 imgR = `./images/pack/gold.png`;
}else  if(args[1] === 3){
 id1 = 1;
 amount1 = 2;
 id2 = 3;
 amount2 = 1;
 id3 = 0;
 amount3 = 0;
 idR = 4;
 img1 = `./images/pack/bronze.png`;
 img2 = img1;
 img3 = `./images/pack/gold.png`;
 imgR = `./images/pack/elite.png`;
}else  if(args[1] === 4){
 id1 = 3;
 amount1 = 1;
 id2 = 4;
 amount2 = 1;
 id3 = 0;
 amount3 = 0;
 idR = 5;
 img1 = `./images/pack/gold.png`;
 img2 = `./images/pack/elite.png`;
 imgR = `./images/pack/elite85.png`;
}else  if(args[1] === 5){
 id1 = 3;
 amount1 = 1;
 id2 = 5;
 amount2 = 1;
 id3 = 0;
 amount3 = 0;
 idR = 6;
 img1 = `./images/pack/gold.png`;
 img2 = `./images/pack/elite85.png`;
 imgR = `./images/pack/master.png`;
}else if(args[1] === 6){
 id1 = 5;
 amount1 = 1;
 id2 = 6;
 amount2 = 1;
 id3 = 0;
 amount3 = 0;
 idR = 7;
 img1 = `./images/pack/elite85.png`;
 img2 = `./images/pack/master.png`;
 imgR = `./images/pack/master95.png`;
}else  if(args[1] === 7){
 id1 = 7;
 amount1 = 4;
 id2 = 0;
 amount2 = 0;
 id3 = 0;
 amount3 = 0;
 idR = 8;
 img1 = `./images/pack/master95.png`;
 img2 = img1;
 img3 = img1;
 img4 = img1;
 imgR = `./images/pack/legend.png`;
}else  if(args[1] === 8){
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
}else  if(args[1] === 9){
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
}
  
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
 const totalAmount = amount1 + amount2 + amount3;
 if(totalAmount === 2){
 ctx.drawImage(canImg1, 176, 250, insertSize, insertSize);
 ctx.drawImage(canImg2, 304, 250, insertSize, insertSize);
 }else if(totalAmount === 3){
 ctx.drawImage(canImg1, 176, 186, insertSize, insertSize);
 ctx.drawImage(canImg2, 304, 186, insertSize, insertSize);
 ctx.drawImage(canImg3, 240, 314, insertSize, insertSize);
 }else if(totalAmount === 4){
 ctx.drawImage(canImg1, 176, 186, insertSize, insertSize);
 ctx.drawImage(canImg2, 304, 186, insertSize, insertSize);
 ctx.drawImage(canImg3, 176, 314, insertSize, insertSize);
 ctx.drawImage(canImg4, 304, 314, insertSize, insertSize);
 }else if(totalAmount === 5){
 ctx.drawImage(canImg1, 112, 186, insertSize, insertSize);
 ctx.drawImage(canImg2, 240, 186, insertSize, insertSize);
 ctx.drawImage(canImg3, 368, 186, insertSize, insertSize);
 ctx.drawImage(canImg4, 176, 314, insertSize, insertSize);
 ctx.drawImage(canImg5, 304, 314, insertSize, insertSize);
 }
 
 const attachment = new D.Attachment(canvas.toBuffer(), 'img.png');

 await user.addPack(id1, amount1);
 await user.addPack(id2, amount2);
 await user.addPack(id3, amount3);
 await user.addPack(idR, -amountR); 
 _y.message.channel.send(`SBC completed!`, {files: [attachment]});
  }
  
  
  };
