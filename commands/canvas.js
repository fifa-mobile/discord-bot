module.exports = (_y, args) => {
  const y = require('../core/base');
  const D = y.Discord;
  const fs = require('fs')
  const { createCanvas, loadImage } = require('canvas')

  const width = 1200
  const height = 630

  const canvas = createCanvas(width, height)
  const context = canvas.getContext('2d')

  context.fillStyle = '#000'
  context.fillRect(0, 0, width, height)

  context.font = 'bold 70pt Menlo'
  context.textAlign = 'center'
  context.textBaseline = 'top'
  context.fillStyle = '#3574d4'

  const text = 'Hello, World!'

  const textWidth = context.measureText(text).width
  context.fillRect(600 - textWidth / 2 - 10, 170 - 5, textWidth + 20, 120)
  context.fillStyle = '#fff'
  context.fillText(text, 600, 170)

  context.fillStyle = '#fff'
  context.font = 'bold 30pt Menlo'
  context.fillText('flaviocopes.com', 600, 530)

  loadImage('./logo.png').then(image => {
    context.drawImage(image, 340, 515, 70, 70)
    const buffer = canvas.toBuffer('image/png')
    const attachment = new D.Attachment(buffer, 'x.png');
    _y.reply(`Welcome!`, attachment);
    fs.writeFileSync('./test.png', buffer)
  })
};
