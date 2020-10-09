module.exports = async (m, args, curr) => {
  const {User} = require('../models/index');
  const uid = m.author.id;
  const user = await User.findOne({where: {uid: uid}});
  const y = require('../core/base');
  const D = y.Discord;
  const cmd = args[0];
  const balance = curr.getBalance(uid);
  const Card = require('../models/mongoose/card');
  
  if(cmd === 'price' || cmd === 'prices' || !cmd){
    const {
      createCanvas, loadImage
    } = require('canvas');

    const w = 1280;
    const h = 500;

    const canvas = createCanvas(w, h);
    const ctx = canvas.getContext('2d');

    const types = require('../data/pack/types');

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
      ctx.strokeText(
        type.price + '$', posX - 5, posY + 60
      );
      ctx.fillText(
        type.price + '$', posX - 5, posY + 60
      );
      ctx.drawImage(img, posX, posY, 128, 128);
      posX += 256;
    }

    ctx.fillStyle = "#eee";
    ctx.fillRect(0, 340, canvas.width, 8);

    ctx.font = 'bold 50pt serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = "#fffe4c";
    
    ctx.fillText("Market Prices", 400, 420);
    
    const coinpath = `./images/currency_Item_COIN.png`;
    const coinimg = await loadImage(coinpath);
    ctx.drawImage(coinimg, 230, 370, 128, 128);

    const buffer = canvas.toBuffer('image/png');
    const attachment = new D.MessageAttachment(buffer, 'x.png');
    m.channel.send({files: [attachment]});
  };

  if (cmd === 'sell') {
    const data = require('../data/pack/values');
    const id = args[1];
    const amount = Number(args[2]);
    if (!id) {
      return m.channel.send('<:info:751794158162935838> | Id required, see `$pack info`.');
    }
    if (!amount || amount < 1) {
      return m.channel.send('<:info:751794158162935838> | Amount number needed!');
    }
    const pack = await user.getPack(id);
    if (!pack || !pack.amount) {
      return m.channel.send(
        `<:info:751794158162935838> | You don't have ${data[id][2]} player.`
      );
    }
    if (amount > pack.amount) {
      return m.channel.send(
        `<:info:751794158162935838> | You only have **${pack.amount}**.`
        + ` ${data[id][2]} players.`
      );
    }
    const price = data[id][1];
    await user.addPack(id, amount);
    curr.add(uid, price * amount);
    return m.channel.send(`<:info:751794158162935838> | You get ${price * amount}<a:coin:751813392989290546>!`);
  }
  
  if (cmd === 'buy') {
    const data = require('../data/pack/buy');
    const id = Number(args[1]);
    const amount = Number(args[2]);
    const price = data[id][1];
    const cost = price * amount;

    if (!id) {
      return m.channel.send('<:info:751794158162935838> | Id required, see `$pack info`.');
    }
    if (!amount || amount < 1) {
      return m.channel.send('<:info:751794158162935838> | Amount number needed!');
    }
    if (cost > balance) {
      return m.channel.send('<:info:751794158162935838> | You don\'t have enough coins!');
    }

    if(amount > 1 || amount === 1){
      const pack = await user.getPack(id);
      await user.addPack(id, -amount);
      curr.add(uid, -1 * price * amount);

      let choices = [];

      console.log(amount, id);

      if(amount === 1) {
        choices = await Card.find({typeID: id});

        if (id < 1 || id > 10) {
          return m.channel.send(
            `<:info:751794158162935838> | `
            + `The ID ${amount} is not found!`
          );
        }

        const card = choices[
          Math.floor(Math.random() * choices.length)
        ];

        const title = `<a:market:752814593159725106> | You purchased a player`;
        const url = card.img;
        const embed = new D.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(title)
        .setImage(url)
        .setURL(url)
        ;
        m.channel.send(embed);
      }

      if(amount > 1){
        return m.channel.send(
        `<a:market:752814593159725106> | You purchased ${amount} ${data[id][2]} players.`
        );
      }
    }
  }
}
