module.exports = (args, msg, sheet, standing) => {
  const run = async function() {
    await sheet.loadCells('A1:J15');

    console.log(sheet.cellStats);
    const stats = sheet.cellStats;

    let players = [];
    let x, y = 0;

    const cell = sheet.getCell(x, y);
    console.log(cell.value);

    /*
    for (let i = 0; i < stats.loaded; i++) {
      const cell = sheet.getCell(x, y);
      console.log(cell.value);
      */
      /*
      if (cell.row === 1 && cell.value !== 'players') {
        players.push(cell.value);
      }
      row++;
      if (row > 9) {
        x++;
        y = 0;
      }
      */
    /*
    }
    console.log(players);
    */
    /*
    require('./tour-score-data.js')(
      args, msg, sheet, players, standing
    );
    */
  };

  run();

  /*
  sheet.getCells({
    'min-row': 1,
    'max-row': 1,
    'return-empty': !true,
  }, (err, cells) => {
    console.log(err);
    let players = [];
    for (let i = 0; i < cells.length; i++) {
      let cell = cells[i];
      if (cell.row === 1 && cell.value !== 'players') {
        players.push(cell.value);
      }
    }
    require('./tour-score-data.js')(
      args, msg, sheet, players, standing
    );
  });
  */
};
