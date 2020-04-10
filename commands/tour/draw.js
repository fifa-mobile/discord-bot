function shuffle(array) {
  var currentIndex =
    array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(
      Math.random() * currentIndex
    );
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

module.exports = (_y, data, teams) => {
  const shuffled = shuffle(teams); 
  let lines = [
    'Group-A             Group-B             ',
    '----------------------------------------',
  ];
  for (let i = 0; i < shuffled.length; i+=2) {
    const s1 = shuffled[i].padEnd(20, ' ');
    const s2 = shuffled[i+1].padEnd(20, ' ');
    const line = `${s1}${s2}`;
    lines.push(line);
  }
  console.log(lines);
  _y.reply('```' + lines.join('\n') + '```');
};
