module.exports = async (card) => {
  const {
    createCanvas, loadImage, registerFont
  } = require('canvas');

  registerFont(
    './public/fonts/Posterama-Bold.ttf',
    {
      family:'PosteramaBold'
    }
  );
  registerFont(
    './public/fonts/DINPro-CondBold.woff',
    {
      family: 'DINProCondBold'
    }
  );

  const canvas = createCanvas(256, 256);
  const ctx = canvas.getContext('2d');

  let image = await loadImage(card.background);
  ctx.drawImage(image, 0, 0);

  image = await loadImage(card.playerImg);
  ctx.drawImage(image, 0, 0);

  ctx.font = '55px DINProCondBold';
  ctx.fillStyle = '#eee';
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 4;

  ctx.strokeText(card.rating, 57, 62);
  ctx.fillText(card.rating, 57, 62);

  ctx.textAlign = 'center';
  ctx.font = 'bold 17px PosteramaBold';

  ctx.strokeText(card.position, 78, 84);
  ctx.fillText(card.position, 78, 84);

  image = await loadImage(card.clubImg);
  ctx.drawImage(image, 58, 90, 38, 38);

  image = await loadImage(card.nationImg);
  ctx.drawImage(image, 62, 140, 30, 18);

  ctx.font = 'bold 21px PosteramaBold';

  ctx.strokeText(card.name, 128, 197);
  ctx.fillText(card.name, 128, 197);

  const imgBuf = canvas.toBuffer('image/png');

  return imgBuf;
}
