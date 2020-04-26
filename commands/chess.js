module.exports = async (_y, args) => {
  const
    y = require('../core/base'),
    D = y.Discord,
    chess = require('chess'),
    gameClient = chess.create(),
    { Chess } = require('chess-base'),
    chessDisplay = new Chess()
  ;

  let status = gameClient.getStatus();
  let validMoves = status.notatedMoves;

  const stringBoard = chessDisplay.toAscii();

  _y.reply(
    '```' +
    stringBoard
    + '```'
  );

  Object.keys(
    gameClient.notatedMoves
  ).forEach(notation => {
    console.log(notation);
  });

  const Canvas = require('canvas');
  const canvas = Canvas.createCanvas(700, 250);
  const ctx = canvas.getContext('2d');
  const background = await Canvas.loadImage(
    './wallpaper.jpg'
  );
  ctx.drawImage(
    background, 0, 0, canvas.width, canvas.height
  );
  const attachment = new D.Attachment(
    canvas.toBuffer(), 'welcome-image.png'
  );

  console.log(attachment);

  _y.reply({
    files: [attachment]
  });
};
