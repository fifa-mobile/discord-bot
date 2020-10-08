function table(data) {
  const header =
    `id │name   │desc           │owner │usage`
    + '\n' +
    `───┼───────┼───────────────┼──────┼─────`
  ;
  let lines = [header];
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const line = [
      item.id.toString().padStart(3, ' ')
        .substring(0, 3),
      item.name.padEnd(7, ' ')
        .substring(0, 7),
      String(item.description).padEnd(15, ' ')
        .substring(0, 15),
      String(item.username).padEnd(6, ' ')
        .substring(0, 6),
      item.usage.toString().padStart(5, ' ')
        .substring(0, 5),
    ].join('│');
    lines.push(line);
  }
  return '```' + lines.join('\n') + '```';
}

module.exports = async (m, args) => {
  let text = "init...";
  const db = require('../models/index.js');

  const name = args[0];
  const description = args[1];
  const username = m.author.username;

  if (!name) {
    const tags = await db.Tag.findAll({
      order: [['id']]
    });
    return m.channel.send(table(tags));
  }

  const data = await db.Tag.findOrBuild({
    where: {name: name}
  });
  const tag = data[0];
  const isNew = data[1];

  if (isNew) {
    tag.username = username;
    tag.description = description;
    await tag.save();
    return m.channel.send(`tag **${name}** created!`);
  }

  if (tag.username === username && description) {
    tag.description = description;
    await tag.save();
    return m.channel.send(
      `tag **${name}**'s`
      + `description updated!`
    );
  } else if (!description) {
    await tag.increment('usage');
    await tag.save();
    return m.channel.send(
      `Name: ${tag.name}`
      + `\nDesc: ${tag.description}`
      + `\nusage: ${tag.usage}`
    );
  } else if (tag.username !== username) {
    return m.channel.send(
      `tag **${name}** is created by `
      + `**${tag.username}**, `
      + `you can't change its description!`
    );
  }
};
