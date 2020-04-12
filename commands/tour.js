const y = require('../core/base');

module.exports = (_y, args) => {
  args = args.filter(
    arg =>
      !_y.Discord.MessageMentions
        .CHANNELS_PATTERN.test(arg)
  );

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
      doc.sheetsByIndex[ids.shuffled],
      doc.sheetsByIndex[ids.groups + 0],
      doc.sheetsByIndex[ids.groups + 1],
    ];

    if (!args[0]) {
      _y.reply('options: participants');
      return;
    }

    const data = require('./tour/data')(
      await sheets[ids.data].getRows()
    );

    if (
      args[0] === 'standing'
      ||
      args[0] === 'fixture'
      ||
      args[0] === 'score'
      ||
      args[0] === 'round'
    ) {
      const shuffled = require('./tour/shuffled')(
        _y, data, await sheets[ids.shuffled].getRows()
      );
      const groups = require('./tour/groups')(
        _y, data, shuffled 
      );
      const group = groups[args[1] - 1];

      if (
        args[0] === 'fixture'
        ||
        args[0] === 'score'
        ||
        args[0] === 'standing'
        ||
        args[0] === 'round'
      ) {
        require('./tour/fixture')(
          _y, args, group
          , await sheets[
            ids.groups + (args[1] - 1)
          ].getRows()
        );
      }
    }

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
