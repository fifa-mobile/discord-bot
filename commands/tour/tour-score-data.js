class Standing {
  constructor(name) {
    this.name = name;
    this.P = 0;
    this.W = 0;
    this.D = 0;
    this.L = 0;
    this.Pts = 0;
    this.GS = 0;
    this.GA = 0;
    this.GD = 0;
  }

  add(gs, ga) {
    this.P++;
    if(gs > ga) {
      this.W++;
      this.Pts += 3;
    }
    if(gs < ga) {
      this.L++;
    }
    if(gs === ga) {
      this.D++;
      this.Pts += 1;
    }
    this.GS += gs;
    this.GA += ga;
    this.GD = this.GS - this.GA;
  }
};

class Standings {
  constructor() {
    this.players = [];
  }

  get(name) {
    for (let i = 0;i < this.players.length;i++) {
      let player = this.players[i];
      if (name === player.name) {
        return player;
      }
    }
  }

  add(player) {
    this.players.push(player);
  }

  table() {
    this.players.sort((a, b) => b.GD - a.GD);
    this.players.sort((a, b) => b.Pts - a.Pts);
    let o = '';
    let heading =
      '# ' +
      '|' +
      'Team'.padEnd(10, ' ') +
      '|' +
      'P'.padEnd(2, ' ') +
      '|' +
      'W'.padEnd(2, ' ') +
      '|' +
      'D'.padEnd(2, ' ') +
      '|' +
      'L'.padEnd(2, ' ') +
      '|' +
      'Pts'.padEnd(3, ' ') +
      '|' +
      'GS'.padEnd(2, ' ') +
      '|' +
      'GA'.padEnd(2, ' ') +
      '|' +
      'GD'.padEnd(2, ' ') +
      '\n';
    o += heading;
    o += ''.padEnd(39, '-') + '\n';
    for (let i = 0; i < this.players.length; i++) {
      let p = this.players[i];
      o +=
        (i + 1).toString().padStart(2, ' ') +
        '|' +
        p.name.padEnd(10, ' ') +
        '|' +
        p.P.toString().padStart(2, ' ') +
        '|' +
        p.W.toString().padStart(2, ' ') +
        '|' +
        p.D.toString().padStart(2, ' ') +
        '|' +
        p.L.toString().padStart(2, ' ') +
        '|' +
        p.Pts.toString().padStart(3, ' ') +
        '|' +
        p.GS.toString().padStart(2, ' ') +
        '|' +
        p.GA.toString().padStart(2, ' ') +
        '|' +
        p.GD.toString().padStart(3, ' ') +
        '\n';
    }
    return o;
  }
}

module.exports = (args, msg, sheet, players, isStanding) => {
  let count = players.length + 1;
  let standings = new Standings();
  for (let i = 0; i < players.length; i++) {
    let player = players[i];
    let standing = new Standing(player);
    standings.add(standing);
  }
  sheet.getCells({
    'min-row': 2,
    'max-row': count,
    'min-col': 2,
    'max-col': count,
    'return-empty': !true,
  }, (err, cells) => {
    console.log(err);
    let id = args[1];
    let o = '';
    for (let i = 0; i < cells.length; i++) {
      let cell = cells[i];
      if (id == (i + 1) && !isStanding) {
        if (args[2] === undefined) {
          cell.value = '-';
        } else {
          cell.value = args[2] + ' - ' + args[3];
        }
        cell.save();
        msg.channel.send('ℹ|Fixture updated!');
      }
      let score = cell.value.split('-');
      score = score.map(s => s.trim());
      let player0 = standings.get(players[cell.row - 2]);
      let player1 = standings.get(players[cell.col - 2]);
      if (score[0].length > 0) {
        let score0 = Number(score[0]);
        let score1 = Number(score[1]);
        player0.add(score0, score1);
        player1.add(score1, score0);
      }
      let match =
        (i + 1).toString().padStart(2, ' ') + '| '
        + player0.name.padEnd(16, ' ')
        + score[0].padStart(3, ' ')
        + ' vs '
        + score[1].padEnd(3, ' ')
        + player1.name.padStart(16, ' ')
      ;
      o += match + "\n";
    }
    console.log(o);
    if (isStanding) {
      console.log(standings.table());
      msg.channel.send('```\n'+standings.table()+'```');
    }
  });
};
