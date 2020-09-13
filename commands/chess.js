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

  const {KeyValue} = require('../models/index');

  const chessData = await KeyValue.findOne({
    where: {key: 'chess'}
  });

  let moves = [];

  const cmd = args[0];
  const newMove = args[1];

  if (chessData) {
    moves = JSON.parse(chessData.value);
    if (!moves || cmd === 'new') {
      moves = [];
    }
  } else {
    await KeyValue.create({
      key: 'chess'
    });
  }

  if (cmd === 'undo' && moves.length) {
    moves.pop();
    chessData.value = JSON.stringify(moves);
    chessData.save();
  }

  let turn = 'white';
  let move = false;
  let validMoves = [];
  let addNew = false;
  let movesIndex = -1;

  if (moves.length) {
    movesIndex = 0;
  }

  do {
    validMoves = [];

    Object.keys(
      gameClient.notatedMoves
    ).forEach(notation => {
      validMoves.push('`' + notation + '`');
    });

    if (
      movesIndex > -1
      &&
      movesIndex < moves.length
    ) {
      move = moves[movesIndex];
    } else if (cmd === 'move') {
      move = newMove;
      addNew = true;
    } else if (movesIndex === moves.length) {
      move = false;
    }

    if (
      move
      &&
      validMoves.indexOf('`' + move + '`') !== -1
    ) {
      if (turn === 'white') {
        turn = 'black';
      } else {
        turn = 'white';
      }
      gameClient.move(move);
      validMoves = [];
      Object.keys(
        gameClient.notatedMoves
      ).forEach(notation => {
        validMoves.push('`' + notation + '`');
      });
      movesIndex++;
      if (addNew) {
        moves.push(move);
        break;
      }
    } else if (cmd === 'move') {
      return _y.reply(`<a:cross:751806445246218301> | Invalid move!`);
    }
  } while(move);

  for (let i = 0; i < moves.length; i++) {
    chessDisplay.move(moves[i]);
  }

  chessData.value = JSON.stringify(moves);
  chessData.save();

  const boardArray = toArray(chessDisplay.toAscii());

  const Canvas = require('canvas');
  const canvas = Canvas.createCanvas(640, 640);
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

  const attachment = new D.MessageAttachment(
    canvas.toBuffer(), 'img.png'
  );

  _y.message.channel.send(
    `<a:chess:751820693959868517> | Valid **_${turn}_** moves:`
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
