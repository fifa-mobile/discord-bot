module.exports = (_y, args) => {
  if (!args[0]) {
    _y.reply("<a:info:751794158162935838> | Country name needed.");
    return;
  }
  let text = [];
  for (let i = 0; i < args.length; i++) {
    const string = args[i];
    text.push(string[0].toUpperCase() + string.substring(1));
  }
  let country = text.join(' ');
  const fetch = require('node-fetch');
  fetch("https://pomber.github.io/covid19/timeseries.json")
  .then(response => response.json())
  .then(data => {
    let x = data[country];
    if (!x) {
      _y.reply(`<a:cross:751443454244159519> | ${country} data not found!`);
      return;
    }
    x = x[x.length - 1];
    const result = `Date: ${x.date}\nConfirmed: ${x.confirmed}\n`
      + `Deaths: ${x.deaths}\nRecovered: ${x.recovered}`;
    console.log(result);
    _y.reply(result);
  });
};
