function toArray(string) {
  const lines = string.split("\n");
  let board = [];
  for (let i = 0; i < lines.length; i++) {
    let squares = lines[i].split('');
    for (let j = squares.length - 1; j >= 0; j--) {
      if (j % 2 === 0) continue;
      squares.splice(j, 1);
    }
    board.push(squares);
  }
  return board;
}

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

  const boardArray = toArray(chessDisplay.toAscii());

  const Canvas = require('canvas');
  const canvas = Canvas.createCanvas(578, 578);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const [mapNumbers, mapChars] = [
    '12345678',
    'abcdefgh',
  ];

  ctx.font = 'bold 30pt Serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#fff';

  let [posX, posY] = [32, 546];
  for (let i = 0; i < 8; i++) {
    ctx.fillText(mapNumbers[i], posX, posY);
    posY -= 64;
  }

  [posX, posY] = [96, 32];
  for (let i = 0; i < 8; i++) {
    ctx.fillText(mapChars[i], posX, posY);
    posX += 64;
  }

  const boardImage = await Canvas.loadImage(
    './images/chess/board.png'
  );
  ctx.drawImage(
    boardImage, 64, 64, 512, 512 
  );

  posY = 64;
  for (let i = 0; i < boardArray.length; i++) {
    posX = 64;
    const boardLine = boardArray[i];
    for (let j = 0; j < boardLine.length; j++) {
      const squareValue = boardLine[j];
      const imgPath = tPiece(squareValue);
      if (imgPath) {
        const piece = await Canvas.loadImage(imgPath);
        ctx.drawImage(piece, posX, posY, 64, 64);
      }
      posX += 64;
    }
    posY += 64;
  }

  const attachment = new D.Attachment(
    canvas.toBuffer(), 'img.png'
  );

  let validMoves = [];
  Object.keys(
    gameClient.notatedMoves
  ).forEach(notation => {
    validMoves.push('`' + notation + '`');
  });

  let turn = 'white';

  _y.message.channel.send(
    `Valid **_${turn}_** moves:`
    + ` ${validMoves.join(' , ')}`
    , {
      files: [attachment]
    }
  );
};

function tPiece(char) {
  let path = './images/chess/pieces/';
  const map = {
    '♜': 'black-rook',
    '♞': 'black-knight',
    '♝': 'black-bishop',
    '♛': 'black-queen',
    '♚': 'black-king',
    '♟': 'black-pawn',
    /* ------------- */
    '♙': 'white-pawn',
    '♖': 'white-rook',
    '♘': 'white-knight',
    '♗': 'white-bishop',
    '♕': 'white-queen',
    '♔': 'white-king',
  };
  const value = map[char];
  if (!value) return false;
  return `./images/chess/pieces/${value}.png`;
}
