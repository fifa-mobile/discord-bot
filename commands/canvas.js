module.exports = async (m, args) => {
  const y = require('../core/base');
  const D = y.Discord;
  const { createCanvas, loadImage } = require('canvas');

  const w = 1200;
  const h = 630;

  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, w, h);

  ctx.font = 'bold 70pt Menlo';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillStyle = '#3574d4';

  const text = 'Hello, World!';

  const textWidth = ctx.measureText(text).width;
  ctx.fillRect(
    600 - textWidth / 2 - 10, 170 - 5
    , textWidth + 20, 120
  );
  ctx.fillStyle = '#fff';
  ctx.fillText(text, 600, 170);

  ctx.fillStyle = '#fff';
  ctx.font = 'bold 30pt Menlo';
  ctx.fillText('flaviocopes.com', 600, 530);

  const logo = await loadImage('./images/logo-wa.png');
  ctx.drawImage(logo, 340, 515, 70, 70);

  const buffer = canvas.toBuffer('image/png');
  const attachment = new D.MessageAttachment(buffer, 'x.png');
  m.channel.send({files: [attachment]});
};
