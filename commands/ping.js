module.exports = (_y, args) => {
  const pingTypes = [
    "🏓|**Pong.**Testing,testing.Is this thing working?",
    "🏓|**Pong.**Match point.Let's see what you've got.",
    "🏓|**Pong.**Keep on pinging me.",
    "🏓|**Pong.**I am alive.",
    "🏓|**Pong.**Can't play now.Got a meeting with the bots.We're planning to conquer the wor... Wait!Did I say that loudly?!",
    "🏓|**Pong.**You had a 0.1% chance of getting this message.",
  ];
  const pingMultiply = [
    250,
    250,
    250,
    244,
    5,
    1,
  ];

  let pingNames = [];
  for (let i = 0; i < pingTypes.length; i++) {
    const type = pingTypes[i];
    for (let j = 0; j < pingMultiply[i]; j++) {
      pingNames.push(type);
    }
  }

  let pongName = pingNames[
    Math.floor(Math.random()* pingNames.length)
  ];
  var pong=pongName;
  _y.reply(pong);
};
