const y = require('../core/base');

module.exports = (_y, args) => {
  const spreadSheet = y.c.insource.spreadSheets.tour;
  const { GoogleSpreadsheet } = require(
    'google-spreadsheet'
  );

  const doc = new GoogleSpreadsheet(spreadSheet.id);

  const run = async function() {
    await doc.useServiceAccountAuth(y.c.google);
    await doc.loadInfo();

    const ids = spreadSheet.indexes;
    const sheets = [
      doc.sheetsByIndex[ids.participants],
      doc.sheetsByIndex[ids.data],
    ];

    if (!args[0]) {
      _y.reply('options: participants');
      return;
    }

    const data = require('./tour/data')(
      await sheets[ids.data].getRows()
    );

    let teams = [];

    if (
      args[0] === 'participants'
      ||
      args[0] === 'draw'
    ) {
      teams = require('./tour/participants')(
        _y, data, sheets[ids.participants]
        , await sheets[ids.participants].getRows()
        , args[0] === 'participants'
      );
    }

    if (args[0] === 'draw' && !data.locked) {
      require('./tour/draw')(_y, data, teams);
    }
  };

  run();
};
