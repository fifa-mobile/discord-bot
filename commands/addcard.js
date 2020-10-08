module.exports = async(m, args) => {
  const Card = require('../models/mongoose/card');
  const y = require('../core/base');
  const D = y.Discord;

  const cardData = await require('../modules/card')(args[0]);

  const attachment = new D.MessageAttachment(
    cardData.buffer, 'card.png'
  );

  const message = await m.channel.send(
    {files: [attachment]}
  );

  const postedAttachment = Array.from(message.attachments)[0][1];

  console.log(cardData.data, postedAttachment.url);

  const dbData = {
    id: cardData.data.id,
    typeID: cardData.data.typeID,
    img: postedAttachment.url,
    updatedAt: Date.now(),
  };
  const filter = {id: dbData.id};
  const doc = {
    typeID: cardData.data.typeID,
    img: postedAttachment.url,
    updatedAt: Date.now(),
  };

  const card = new Card(dbData);

  let resultText = 'card added! ';
  
  await card.save(function(e, o) {
    if (e) {
      console.log('handle newCard error');
      Card.findOne(filter)
      .exec(function(err, found) {
        if (err) throw new Error(`can't save new and not found`);
        if (found) {
          Card.updateOne(
            filter, doc, function(e, docs) {
              if (e) throw new Error(`error updating card!`);
              console.log("updated docs:", docs);
            }
          );
          resultText = 'card updated! ';

          const type = require('../data/pack/values')[dbData.typeID][2];
          resultText += type;

          return m.channel.send(resultText);
        }
      });
      return;
    }
    const type = require('../data/pack/values')[dbData.typeID][2];
    resultText += type;

    return m.channel.send(resultText);
  });
};
