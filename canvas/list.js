module.exports = async (header, data) => {
  console.log(data);
  const y = require('../core/base');
  const D = y.Discord;
  const { createCanvas, loadImage } = require('canvas');

  const h = 36;
  const canvas = createCanvas(512, h * 11);
  const ctx = canvas.getContext('2d');

  let posY = 0;
  let posX = 0;
  for (let i = 0; i < 11; i++) {
    if (i % 2 === 0) {
      ctx.fillStyle = `#002136`;
    } else {
      ctx.fillStyle = `#00273E`;
    }
    ctx.fillRect(0, posY, canvas.width, h);
    posY += h;
  }

  ctx.font = `bold 18px sans-serif`;
  ctx.textBaseline = `middle`;
  ctx.fillStyle = `#eee`;
  ctx.strokeStyle = `#111`;
  ctx.lineWidth = 2;

  for (let i = 0; i < header.fields.length; i++) {
    const o = header.fields[i];
    posY = o.y ? header.y : h / 2;
    posX = o.x + (h / 2);
    ctx.strokeText(o.text, posX, posY);
    ctx.fillText(o.text, posX, posY);

    if (i === 0) continue;
    ctx.fillRect(posX - (h / 2), 0, 1, canvas.height);
  }
  ctx.fillRect(0, h, canvas.width, 1);

  ctx.font = `18px sans-serif`;
  posY = h;
  for (let i = 0; i < data.length; i++) {
    posY += h;
    const p = data[i];
    for (let j = 0; j < header.fields.length; j++) {
      const o = header.fields[j];
      if (o.textAlign === `right`) {
        const nextO = j < header.fields.length
          ? header.fields[j + 1]
          : false
        ;
        if (nextO) {
          posX = nextO.x - (h / 2);
        } else {
          console.log('canvas.width', canvas.width);
          posX = canvas.width - (h / 2);
        }
      } else {
        posX = o.x + (h / 2);
      }
      ctx.textAlign = o.textAlign ? o.textAlign : `left`;
      const posY_ = posY - (h / 2);
      console.log(p[o.text], posX, posY_);
      ctx.strokeText(p[o.text], posX, posY_);
      ctx.fillText(p[o.text], posX, posY_);
    }
  }

  const imgBuf = canvas.toBuffer('image/png');
  return imgBuf;
};
