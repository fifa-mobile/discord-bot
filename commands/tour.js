const y = require('../core/base');

module.exports = (m, args) => {
  args = args.filter(
    arg =>
      !y.Discord.MessageMentions
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
      m.channel.send('options: participants');
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
        m, data, await sheets[ids.shuffled].getRows()
      );
      const groups = require('./tour/groups')(
        m, data, shuffled 
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
          m, args, group
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
        m, data, sheets[ids.participants]
        , await sheets[ids.participants].getRows()
        , args[0] === 'participants'
      );
    }

    if (args[0] === 'draw' && !data.locked) {
      require('./tour/draw')(m, data, teams);
    }
  };

  run();
};
