module.exports = async (_y, args) => {
  const y = require('../core/base');
  const D = y.Discord;
  const { createCanvas, loadImage } = require('canvas');

  const canvas = createCanvas(440, 340);
  const ctx = canvas.getContext('2d');

  /* title */
  let text = "Player Packs LeaderBoard";
  let [posX, posY] = [0, 0];

  ctx.font = 'Bold 32px Serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';

  ctx.fillStyle = '#eee';
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 8;

  ctx.strokeText(text, posX, posY);
  ctx.fillText  (text, posX, posY);
  /* title */

  /* hr */
  ctx.fillRect(0, 40, canvas.width, 2);
  /* hr */

  /* */
  ctx.font = 'Normal 24px Sans-Serif';
  ctx.lineWidth = 4;
  [posX, posY] = [0, 48];
  for (let i = 0; i < 10; i++) 
    var space;
    if(i<10){
    space=" ";
    }
    text = `${i + 1}.` + space + ` xxxxxxxxx`;
    ctx.strokeText(text, posX, posY);
    ctx.fillText  (text, posX, posY);
    posY += 28;
  }
  /* */

  const imgBuf = canvas.toBuffer('image/png');
  const attachment = new D.Attachment(imgBuf, 'i.png');

  _y.reply({files: [attachment]});
};
