module.exports = async(_y, args) => {
  const cards = require('../olddata/cards');
  const Card = require('../models/mongoose/card');
  const dbCards = await Card.find({});

  for (let i = 0; i < cards.length; i++) {
    const id = cards[i];
    const added = dbCards.find(
      o => o.id === id
    ) ? true : false;
    console.log('card#', i, ' id:', id, '...is added?', added);
    //await require('./addcard')(_y, [cards[i]]);
  }
};
