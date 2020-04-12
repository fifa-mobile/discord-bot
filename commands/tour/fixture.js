class Team {
  constructor(name) {
    this.name = name;
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

module.exports = (_y, args, group, rows) => {
  const count = group.length;
  const map = _y.c.insource.tour.maps[count];

  let teams = [];
  for (let i = 0; i < group.length; i++) {
    const team = new Team(group[i]);
    teams.push(team);
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
  _y.replyCode(fixture.toString());
};
