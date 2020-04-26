module.exports = async (_y, args) => {
  const y = require('../core/base');
  const D = y.Discord;
  const fs = require('fs')
  const { createCanvas, loadImage } = require('canvas')

  const w = 578;
  const h = 578;

  const canvas = createCanvas(w, h);
  const context = canvas.getContext('2d');

  context.fillStyle = '#000';
  context.fillRect(0, 0, w, h);

  context.font = 'bold 70pt Menlo';
  context.textAlign = 'center';
  context.textBaseline = 'top';
  context.fillStyle = '#3574d4';

  const text = 'Hello, World!';

  const textWidth = context.measureText(text).width;
  context.fillRect(
    600 - textWidth / 2 - 10, 170 - 5
    , textWidth + 20, 120
  );
  context.fillStyle = '#fff'
  context.fillText(text, 600, 170);

  context.fillStyle = '#fff'
  context.font = 'bold 30pt Menlo'
  context.fillText('flaviocopes.com', 600, 530)

  const logo = await loadImage('./images/logo-wa.png');
  context.drawImage(logo, 340, 515, 70, 70)

  const buffer = canvas.toBuffer('image/png')
  const attachment = new D.Attachment(buffer, 'x.png');
  _y.reply({files: [attachment]});
};
