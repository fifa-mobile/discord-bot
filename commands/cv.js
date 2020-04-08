module.exports = (_y, args) => {
  if (!args[0]) {
    _y.reply("cv [country name]");
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
      _y.reply(`${country} data not found!`);
      return;
    }
    x = x[x.length - 1];
    const result = `date: ${x.date}\nconfirmed: ${x.confirmed}\n`
      + `deaths: ${x.deaths}\nrecovered: ${x.recovered}`;
    console.log(result);
    _y.reply(result);
  });
};
