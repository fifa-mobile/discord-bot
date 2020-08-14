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
  
  if(!cmd || cmd === list){
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
  if( cmd === complete){ 
  const amountR = 1;
  if(!args[1] || args[1] > 9 || args[1] < 1){
  _y.reply('Invalid ID.Check `$sbc` or `$sbc list` for IDs.');
  }
 if(args[1] === 1){
 const id1 = 1;
 const amount1 = 4;
 const id2 = 0;
 const amount2 = 0;
 const id3 = 0;
 const amount3 = 0;
 const idR = 2;
 const img1 = `./images/pack/bronze.png`;
 const img2 = img1;
 const img3 = img1;
 const img4 = img1;
 const imgR = `./images/pack/silver.png`;
}else  if(args[1] === 2){
 const id1 = 1;
 const amount1 = 3;
 const id2 = 2;
 const amount2 = 1;
 const id3 = 0;
 const amount3 = 0;
 const idR = 3;
 const img1 = `./images/pack/bronze.png`;
 const img2 = img1;
 const img3 = img1;
 const img4 = `./images/pack/silver.png`;
 const imgR = `./images/pack/gold.png`;
}else  if(args[1] === 3){
 const id1 = 1;
 const amount1 = 2;
 const id2 = 3;
 const amount2 = 1;
 const id3 = 0;
 const amount3 = 0;
 const idR = 4;
 const img1 = `./images/pack/bronze.png`;
 const img2 = img1;
 const img3 = `./images/pack/gold.png`;
 const imgR = `./images/pack/elite.png`;
}else  if(args[1] === 4){
 const id1 = 3;
 const amount1 = 1;
 const id2 = 4;
 const amount2 = 1;
 const id3 = 0;
 const amount3 = 0;
 const idR = 5;
 const img1 = `./images/pack/gold.png`;
 const img2 = `./images/pack/elite.png`;
 const imgR = `./images/pack/elite85.png`;
}else  if(args[1] === 5){
 const id1 = 3;
 const amount1 = 1;
 const id2 = 5;
 const amount2 = 1;
 const id3 = 0;
 const amount3 = 0;
 const idR = 6;
 const img1 = `./images/pack/gold.png`;
 const img2 = `./images/pack/elite85.png`;
 const imgR = `./images/pack/master.png`;
}else if(args[1] === 6){
 const id1 = 5;
 const amount1 = 1;
 const id2 = 6;
 const amount2 = 1;
 const id3 = 0;
 const amount3 = 0;
 const idR = 7;
 const img1 = `./images/pack/elite85.png`;
 const img2 = `./images/pack/master.png`;
 const imgR = `./images/pack/master95.png`;
}else  if(args[1] === 7){
 const id1 = 7;
 const amount1 = 4;
 const id2 = 0;
 const amount2 = 0;
 const id3 = 0;
 const amount3 = 0;
 const idR = 8;
 const img1 = `./images/pack/master95.png`;
 const img2 = img1;
 const img3 = img1;
 const img4 = img1;
 const imgR = `./images/pack/legend.png`;
}else  if(args[1] === 8){
 const id1 = 3;
 const amount1 = 1;
 const id2 = 6;
 const amount2 = 1;
 const id3 = 7;
 const amount3 = 1;
 const idR = 9;
 const img1 = `./images/pack/gold.png`;
 const img2 = `./images/pack/master.png`
 const img3 = `./images/pack/master95.png`
 const imgR = `./images/pack/silver.png`;
 const imgR ='https://fifa-mobile.github.io/images/cards/' + `${weeklyIconID}.png`
}else  if(args[1] === 9){
 const id1 = 9;
 const amount1 = 3;
 const id2 = 8;
 const amount2 = 2;
 const id3 = 0;
 const amount3 = 0;
 const idR = 10;
 const img1 = `./images/pack/icon.png`;
 const img2 = img1;
 const img3 = img1;
 const img4 = `./images/pack/legend.png`;
 const img5 = img4;
 const imgR ='https://fifa-mobile.github.io/images/cards/' + `${weeklyPrimeID}.png`
}
  
 const {
      createCanvas, loadImage
    } = require('canvas');

 const w = 1280;
 const h = 500;
 const canvas = createCanvas(w, h);
 const ctx = canvas.getContext('2d');
    
 ctx.drawImage(`./images/switchArrows.png`, 640, 250, 320, 320);
 ctx.drawImage(imgR, 1040, 250, 400, 400);
 const insertSize = 128;
 const totalAmount = amount1 + amount2 + amount3;
 if(totalAmount === 2){
 ctx.drawImage(img1, 176, 250, insertSize, insertSize);
 ctx.drawImage(img2, 304, 250, insertSize, insertSize);
 }else if(totalAmount === 3){
 ctx.drawImage(img1, 176, 186, insertSize, insertSize);
 ctx.drawImage(img2, 304, 186, insertSize, insertSize);
 ctx.drawImage(img3, 240, 314, insertSize, insertSize);
 }else if(totalAmount === 4){
 ctx.drawImage(img1, 176, 186, insertSize, insertSize);
 ctx.drawImage(img2, 304, 186, insertSize, insertSize);
 ctx.drawImage(img3, 176, 314, insertSize, insertSize);
 ctx.drawImage(img4, 304, 314, insertSize, insertSize);
 }else if(totalAmount === 5){
 ctx.drawImage(img1, 112, 186, insertSize, insertSize);
 ctx.drawImage(img2, 240, 186, insertSize, insertSize);
 ctx.drawImage(img3, 368, 186, insertSize, insertSize);
 ctx.drawImage(img4, 176, 314, insertSize, insertSize);
 ctx.drawImage(img5, 304, 314, insertSize, insertSize);
 }
 
 const attachment = new D.Attachment(canvas.toBuffer(), 'img.png');

 await user.addPack(id1, amount1);
 await user.addPack(id2, amount2);
 await user.addPack(id3, amount3);
 await user.addPack(idR, -amountR); 
 _y.message.channel.send(`SBC completed!`, {files: [attachment]});
  }
  
  
  };
