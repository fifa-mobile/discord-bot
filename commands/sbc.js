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
  
  const weeklyIcon = 'Van Nistelrooy';
  const weeklyIconID = 21502193;
  const weeklyPrime = 'Figo';
  const weeklyPrimeID = 21501546;
  const sbcEmote = '<a:sbc:751850029358121000>';
  
  if(!cmd || cmd === 'list'){
  const botEmbed = new D.MessageEmbed()
    .setColor('#74b4c3')
    .setTitle('SBC')
    .setDescription('Use $sbc complete [id] to complete a SBC.')
    .setThumbnail('https://raw.githubusercontent.com/fifa-mobile/discord-bot/master/images/sbc.jpg')
    .addField(
      '1. Bronze Upgrade'
      ,
        '───┤     '
        +
        '4<:bronze:752816224424951848>'
        +
        sbcEmote
        +
        '<:silver:752816253487415326>'
    )
    .addField(
      '2. Silver Upgrade'
      ,
        '───┤     '
        +
        '3<:bronze:752816224424951848>'
        +
        ' + '
        +
        '<:silver:752816253487415326>'
        +
        sbcEmote
        +
        '<:gold:752816253151871016>'
    )
    .addField(
      '3. Gold Upgrade'
      ,
        '───┤     '
        +
        '2<:bronze:752816224424951848>'
        +
        ' + '
        +
        '<:gold:752816253151871016>'
        +
        sbcEmote
        +
        '<:elite:752803219083755570>'
    )
    .addField(
      '4. Weak Elite Upgrade'
      ,
        '───┤     '
        +
        '<:gold:752816253151871016>'
        +
        ' + '
        +
        '<:elite:752803219083755570>'
        +
        sbcEmote
        +
        '<:elite85:752816252308684822>'
    )
    .addField(
      '5. Elite Upgrade'
      ,
        '───┤     '
        +
        '<:gold:752816253151871016>'
        +
        ' + '
        +
        '<:elite85:752816252308684822>'
        +
        sbcEmote
        +
        '<:master:752816257807548417>'
    )
    .addField(
      '6. Weak Master Upgrade'
      ,
        '───┤     '
        +
        '<:elite85:752816252308684822>'
        +
        ' + '
        +
        '<:master:752816257807548417>'
        +
        sbcEmote
        +
        '<:master95:752816259086942270>'
    )
    .addField(
      '7. Master Upgrade'
      ,
        '───┤     '
        +
        '4<:master95:752816259086942270>'
        +
        sbcEmote
        +
        '<:legend:752816257379860561>'
    )
    .addField(
      '8. Icon ' + weeklyIcon
      ,
        '───┤     '
        +
        '<:gold:752816253151871016>'
        +
        ' + '
        +
        '<:master:752816257807548417>'
        +
        ' + '
        +
        '<:master95:752816259086942270>'
        +
        sbcEmote
        +
        weeklyIcon + '<:icon:752816254892507177>'
    )
    .addField(
      '9. Prime Icon ' + weeklyPrime
      ,
        '───┤     '
        +
        '3<:icon:752816254892507177>'
        +
        ' + '
        +
        '2<:legend:752816257379860561>'
        +
        sbcEmote
        +
        weeklyPrime + '<:prime:752816261251072040>'
    )
    .setFooter('The players used in the challenge will be removed from your inventory, so think well before completing.');
  _y.reply(botEmbed);
  console.log("list");
  }
 
  if( cmd === 'complete'){ 
    const amountR = 1;
    console.log("complete");
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
    var url;
    if(!args[1] || args[1] > 9 || args[1] < 1){
      _y.reply('<:info:751794158162935838> | Invalid ID.Check `$sbc` or `$sbc list` for IDs.');
      console.log("invalid");
    }

    if(args[1] === '1'){
      choices = require ('../data/cards/silver.js');
      const card = choices[Math.floor(Math.random() * choices.length)];
      url ='https://fifa-mobile.github.io/images/cards/' +`${card}.png`;
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
      img5 = img1;
      console.log("choice1");
    }else  if(args[1] === '2'){
      choices = require ('../data/cards/gold.js');
      const card = choices[Math.floor(Math.random() * choices.length)];
      url ='https://fifa-mobile.github.io/images/cards/' +`${card}.png`;
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
      img5 = img1;
      console.log("choice2");
    }else  if(args[1] === '3'){
      choices = require ('../data/cards/elite.js');
      const card = choices[Math.floor(Math.random() * choices.length)];
      url ='https://fifa-mobile.github.io/images/cards/' +`${card}.png`;
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
      img4 = img1;
      img5 = img1;
      console.log("choice3");
    }else  if(args[1] === '4'){
     choices = require ('../data/cards/elite85.js');
      const card = choices[Math.floor(Math.random() * choices.length)];
      url ='https://fifa-mobile.github.io/images/cards/' +`${card}.png`;
      id1 = 3;
      amount1 = 1;
      id2 = 4;
      amount2 = 1;
      id3 = 0;
      amount3 = 0;
      idR = 5;
      img1 = `./images/pack/gold.png`;
      img2 = `./images/pack/elite.png`;
      img3 = img1;
      img4 = img1;
      img5 = img1;
      console.log("choice4");
    }else  if(args[1] === '5'){
      choices = require ('../data/cards/master.js');
      const card = choices[Math.floor(Math.random() * choices.length)];
      url ='https://fifa-mobile.github.io/images/cards/' +`${card}.png`;
      id1 = 3;
      amount1 = 1;
      id2 = 5;
      amount2 = 1;
      id3 = 0;
      amount3 = 0;
      idR = 6;
      img1 = `./images/pack/gold.png`;
      img2 = `./images/pack/elite85.png`;
      img3 = img1;
      img4 = img1;
      img5 = img1;
      console.log("choice5");
    }else if(args[1] === '6'){
      choices = require ('../data/cards/master95.js');
      const card = choices[Math.floor(Math.random() * choices.length)];
      url ='https://fifa-mobile.github.io/images/cards/' +`${card}.png`;
      id1 = 5;
      amount1 = 1;
      id2 = 6;
      amount2 = 1;
      id3 = 0;
      amount3 = 0;
      idR = 7;
      img1 = `./images/pack/elite85.png`;
      img2 = `./images/pack/master.png`;
      img3 = img1;
      img4 = img1;
      img5 = img1;
      console.log("choice6");
    }else  if(args[1] === '7'){
      choices = require ('../data/cards/legend.js');
      const card = choices[Math.floor(Math.random() * choices.length)];
      url ='https://fifa-mobile.github.io/images/cards/' +`${card}.png`;
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
      img5 = img1;
      console.log("choice7");
    }else  if(args[1] === '8'){
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
      img4 = img1;
      img5 = img1;
      url ='https://fifa-mobile.github.io/images/cards/' + `${weeklyIconID}.png`
      console.log("choice8");
    }else  if(args[1] === '9'){
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
      url ='https://fifa-mobile.github.io/images/cards/' + `${weeklyPrimeID}.png`
      console.log("choice9");
    }
    imgR = url;
    console.log('aaaaaaaaaaaaaaaaaaaaaa');
    const pack1 = await user.getPack(id1);
    const pack2 = await user.getPack(id2);
    const pack3 = await user.getPack(id3);
     if(
       (pack1 && pack1.amount < amount1)
       ||
       (pack2 && pack2.amount < amount2)
       ||
       (pack3 && pack3.amount < amount3)
     ){
      _y.message.channel.send(`<:info:751794158162935838> | You don't have enough players for this SBC!`);
     }else{
    const {
        createCanvas, loadImage
      } = require('canvas');

    const w = 1280;
    const h = 500;
    const canvas = createCanvas(w, h);
    const ctx = canvas.getContext('2d');
    console.log('bbbbbbbbbbbbbbb3');

    console.log(imgR, img1, img2, img3, img4, img5);
    const path = `./images/switchArrows.png`;
    const switchArrows = await loadImage(path);
    ctx.drawImage(switchArrows, 480, 90, 320, 320);
    const canImgR = await loadImage(imgR);
    ctx.drawImage(canImgR, 840, 50, 400, 400);
    const canImg1 = await loadImage(img1);
    const canImg2 = await loadImage(img2);
    const canImg3 = await loadImage(img3);
    const canImg4 = await loadImage(img4);
    const canImg5 = await loadImage(img5);
    const insertSize = 128;
    const totalAmount = amount1 + amount2 + amount3;
    console.log('bbbbbbbbbbbbbbb2');

    if(totalAmount === 2){
      ctx.drawImage(canImg1, 112, 186, insertSize, insertSize);
      ctx.drawImage(canImg2, 240, 186, insertSize, insertSize);
      console.log("total2");
    }else if(totalAmount === 3){
      ctx.drawImage(canImg1, 112, 122, insertSize, insertSize);
      ctx.drawImage(canImg2, 240, 122, insertSize, insertSize);
      ctx.drawImage(canImg3, 176, 250, insertSize, insertSize);
      console.log("total3")
    }else if(totalAmount === 4){
      ctx.drawImage(canImg1, 112, 122, insertSize, insertSize);
      ctx.drawImage(canImg2, 240, 122, insertSize, insertSize);
      ctx.drawImage(canImg3, 112, 250, insertSize, insertSize);
      ctx.drawImage(canImg4, 240, 250, insertSize, insertSize);
      console.log("total4")
    }else if(totalAmount === 5){
      ctx.drawImage(canImg1, 48, 122, insertSize, insertSize);
      ctx.drawImage(canImg2, 176, 122, insertSize, insertSize);
      ctx.drawImage(canImg3, 304, 122, insertSize, insertSize);
      ctx.drawImage(canImg4, 112, 250, insertSize, insertSize);
      ctx.drawImage(canImg5, 240, 250, insertSize, insertSize);
      console.log("total5")
    }
    console.log('bbbbbbbbbbbbbbb1');

    const attachment = new D.MessageAttachment(
      canvas.toBuffer(), 'img.png'
    );

    await user.addPack(id1, amount1);
    await user.addPack(id2, amount2);
    await user.addPack(id3, amount3);
    await user.addPack(idR); 

    console.log('bbbbbbbbbbbbbbb');
    _y.message.channel.send(`<a:sbc:751850029358121000> | SBC completed!`, {files: [attachment]});
  }
  }
};
