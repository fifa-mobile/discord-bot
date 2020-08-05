module.exports = async (_y, args, data) => {
  console.log(data);
  const y = require('../../core/base');
  const D = y.Discord;
  const { createCanvas, loadImage } = require('canvas');

  const titleHeight = 24;
  const listHeight = 18;
  const listPad = 8;
  const listTH = listHeight + listPad;
  const height = data.length * listTH + 32;

  const canvas = createCanvas(
    384
    , titleHeight + 8 + height
  );
  const ctx = canvas.getContext('2d');

  /* title */
  let text = "Player Packs LeaderBoard";
  let [posX, posY] = [4, 8];

  ctx.font = `Bold ${24}px Serif`;
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

  /* list */
  ctx.lineWidth = 4;
  [posX, posY] = [4, 48];
  for (let i = 0; i < data.length; i++){
    ctx.fillStyle = '#999';
    ctx.strokeStyle = '#333';
    if (i < 3) {
      ctx.strokeStyle = '#000';
    }
    if (i === 0) {
      ctx.fillStyle = '#c9b037';
    } else if (i === 1) {
      ctx.fillStyle = '#d7d7d7';
    } else if (i === 2) {
      ctx.fillStyle = '#ad8a56';
    }

    const user = data[i];

    ctx.font = `Normal ${listHeight}px Sans-Serif`;

    ctx.textAlign = "left";
    let uname = `${i + 1}. ${user.uname}`.substring(
      0, 26 
    );
    if (user.uname.length > 26) uname += '...';
    ctx.strokeText(uname, posX, posY);
    ctx.fillText  (uname, posX, posY);

    ctx.textAlign = "center";
    ctx.strokeText(
      '$', posX + canvas.width - 96, posY
    );
    ctx.fillText(
      '$', posX + canvas.width - 96, posY
    );

    ctx.font = `Normal ${listHeight}px monospace`;

    ctx.textAlign = "right";
    ctx.strokeText(
      user.total, posX + canvas.width - 8, posY
    );
    ctx.fillText(
      user.total, posX + canvas.width - 8, posY
    );

    posY += listTH;
  }
  /* list */

  const imgBuf = canvas.toBuffer('image/png');
  const attachment = new D.Attachment(imgBuf, 'i.png');

  _y.reply({files: [attachment]});
};
