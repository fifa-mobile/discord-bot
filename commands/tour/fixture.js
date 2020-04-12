class Team {
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
}

class Match {
  constructor(teamA, teamB, score) {
    this.teamA = teamA;
    this.teamB = teamB;
    this.id = '';
    this.scores = [] ;
    const scores = score.split(',');
    for (let i = 0; i < scores.length; i++) {
      let score = [];
      const numbers = scores[i].split('-');
      const number1 = parseInt(numbers[0]);
      const number2 = parseInt(numbers[1]);
      if (!isNaN(number1) && !isNaN(number2)) {
        this.scores.push([number1, number2]);
        teamA.add(number1, number2);
        teamB.add(number2, number1);
      }
    }
  }

  scoreToString() {
    let result = '   vs.   ';
    if (this.scores.length) {
      let scores = [];
      for (let i = 0; i < this.scores.length; i++) {
        let aScoreText = '';
        const scoreA = this.scores[i][0];
        //.toString().padEnd(2, ' ');
        const scoreB = this.scores[i][1];
        //.toString().padStart(2, ' ');
        aScoreText += [scoreA, scoreB].join('-');
        scores.push(aScoreText);
      }
      if (scores.length) {
        result = scores.join(' , ');
      }
      if (result.length === 3) {
        result = '   ' + result + '   ';
      }
    }
    return result;
  }

  setId(number) {
    this.id = number;
  }
}

function find(name, teams) {
  for(let i = 0; i < teams.length; i++) {
    if (name === teams[i].name) return teams[i];
  }
}

class Fixture {
  constructor(teams, map, matches) {
    this.teams = teams;
    this.map = map;
    this.matches = matches;
    this.roundCount = map.length;
    this.rounds = [];
    this.generate();
  }

  generate() {
    for (let i = 0; i < this.roundCount; i++) {
      let round = [];
      for (let j = 0; j < this.map[i].length; j++) {
        const id = this.map[i][j];
        const match = this.matches[id - 1];
        match.setId(id);
        round.push(match);
      }
      this.rounds.push(round);
    }
  }

  toString() {
    let result = '';
    let resultRounds = [];
    for (let i = 0; i < this.rounds.length; i++) {
      let roundText = '';
      const roundNumber = (i + 1).toString().padStart(
        3, ' '
      );
      roundText +=
        `Round #${roundNumber}:` + ''.padEnd(28, '-');
      roundText += '\n';
      roundText += '\n';
      for (let j = 0; j < this.rounds[i].length; j++) {
        const match = this.rounds[i][j];
        const max = 12;
        const matchId = match.id.toString().padStart(
          3, ' '
        );
        const teamA = match.teamA.name.substring(
          0, max
        ).padEnd(max, ' ');
        const teamB = match.teamB.name.substring(
          0, max
        ).padStart(max, ' ');
        const mid = match.scoreToString();
        roundText += 
          `${matchId}| ${teamA}${mid}${teamB}`
        ;
        roundText += '\n';
      }
      resultRounds.push(roundText);
    }
    result += resultRounds.join('\n');
    return result;
  }
}

class Standing {
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

  toString() {
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

module.exports = (_y, args, group, rows) => {
  const count = group.length;
  const map = _y.c.insource.tour.maps[count];

  let standing = new Standing();
  let teams = [];
  for (let i = 0; i < group.length; i++) {
    const team = new Team(group[i]);
    teams.push(team);
    standing.add(team);
  }

  let increment = 1;
  let matches = [];
  for (let h = 0; h < count; h++) {
    const row = rows[h];
    const team = find(row.team, teams);
    for (let i = 0; i < teams.length; i++) {
      const opponent = teams[i];
      if (
        row[opponent.name] === undefined
        ||
        row[opponent.name] === ''
      ) continue;
      if (team.name === opponent.name) continue;
      const dataScore = row[opponent.name];
      if (
        args[0] === 'score'
        &&
        args[2] && args[3]
        &&
        increment === parseInt(args[2])
      ) {
        _y.reply('Saving score...');
        const save = async function(row, opponent, _y) {
          let scores = [];
          for(let j = 3; j < args.length; j++) {
            scores.push(args[j]);
          }
          row[opponent.name] = scores.join(',');
          await row.save();
          _y.reply('Score saved!');
        };
        save(row, opponent, _y);
        return;
      }
      const match = new Match(team, opponent, dataScore);
      matches.push(match);
      increment++;
    }
  };

  const fixture = new Fixture(teams, map, matches);
  if (args[0] === 'standing') {
    _y.replyCode(standing.toString());
    return;
  }
  _y.replyCode(fixture.toString());
};
