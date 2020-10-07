module.exports = async (card) => {
  const { createCanvas, loadImage } = require('canvas');

  const canvas = createCanvas(256, 256);
  const ctx = canvas.getContext('2d');

  let image = await loadImage(card.background);
  ctx.drawImage(image, 0, 0);

  image = await loadImage(card.playerImg);
  ctx.drawImage(image, 0, 0);

  ctx.font = '32px monospace';
  ctx.fillStyle = '#eee';
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 4;

  ctx.strokeText(card.rating, 60, 60);
  ctx.fillText(card.rating, 60, 60);

  ctx.textAlign = 'center';
  ctx.font = 'bold 12px posterama';

  ctx.strokeText(card.position, 78, 80);
  ctx.fillText(card.position, 78, 80);

  image = await loadImage(card.clubImg);
  ctx.drawImage(image, 58, 90, 38, 38);

  image = await loadImage(card.nationImg);
  ctx.drawImage(image, 62, 140, 30, 18);

  ctx.font = 'bold 16px posterama';

  ctx.strokeText(card.name, 128, 194);
  ctx.fillText(card.name, 128, 194);

  const imgBuf = canvas.toBuffer('image/png');

  return imgBuf;
}
