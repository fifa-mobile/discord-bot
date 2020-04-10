const y = require('../core/base');

module.exports = (_y, args) => {
  const msg = _y.message;
  const { GoogleSpreadsheet } = require(
    'google-spreadsheet');

  const doc = new GoogleSpreadsheet(
    y.c.insource.spreadSheets.tour);

  const run = async function() {
    await doc.useServiceAccountAuth(y.c.google);

    await doc.loadInfo();
    console.log(doc.title);

    console.log('Loaded doc: ' + doc.title);

    const sheet = doc.sheetsByIndex[0];
    
    console.log(
      'sheet.title: ' + sheet.title + '\n'
      + 'rowCount: ' + sheet.rowCount + '\n'
      + 'columnCount: ' + sheet.columnCount + '\n'
    );

    if (!args[0]) {
      _y.reply('options: participants');
      return;
    }

    if (args[0] === 'participants') {
      const rows = await sheet.getRows();
      let result = [
        '  #| ign            | ahq            ',
        '-------------------------------------',
      ];

      for (let i = 0; i < 10; i++) {
        const row = rows[i];
        console.log(row.ign, row.ahq);
        const number = (i+1).toString().padStart(3, ' ');
        const ign = row.ign.padEnd(15, ' ');
        const ahq = row.ahq.padEnd(15, ' ');
        const line = `${number}| ${ign}| ${ahq}`; 
        result.push(line);
        /*
        */
      }
      _y.reply('```' + result.join('\n') + '```');
    }
  };

  run();
};
