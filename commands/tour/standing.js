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
        p.name.substring(0, 10).padEnd(10, ' ') +
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

module.exports = (_y, args, group) => {
  console.log(group);
  const standing = new Standings();
  for (let i = 0; i < group.length; i++) {
    standing.add(new Standing(group[i]));
  }
  _y.replyCode(standing.table());
};
