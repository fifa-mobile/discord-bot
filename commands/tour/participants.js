module.exports = (_y, data, sheet, rows, reply) => {
  let value = [];
  let result = [
    '  #| In-game name   | AHQ            ',
    '-------------------------------------',
  ];

  for (let i = 0; i < data.count; i++) {
    const row = rows[i];
    if (!row) continue;
    const number = (i+1).toString().padStart(3, ' ');
    const ign = row["In-game name"].padEnd(15, ' ');
    const ahq = row["AHQ"].padEnd(15, ' ');
    const line = `${number}| ${ign}| ${ahq}`; 
    result.push(line);
    value.push(row["In-game name"]);
  }
  if (reply) {
    _y.reply('```' + result.join('\n') + '```');
  }
  return value;
};
