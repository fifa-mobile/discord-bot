const db = require('../models/index.js');
const Shop = db.Shop;

function generate(data, isHeader) {
  let items = [];
  let separators = [];
  for (let i = 0; i < data.length; i++) {
    const [name, length, isStart] = data[i];
    const string = String(name).substring(0, length);
    let item = string.padEnd(length, ' ');
    if (isStart) {
      item = string.padStart(length, ' ');
    }
    const separator = ''.padEnd(length, '─');
    items.push(item);
    separators.push(separator);
  }
  const baseValue = items.join('│');
  if (baseValue.length > 40) {
    throw new Error('table length exceeded!');
  }
  if (!isHeader) return baseValue;
  return baseValue + '\n' + separators.join('┼');
}

function table(data, map) {
  let lines = [generate(map, true)];
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    let line = [];
    for (let j = 0; j < map.length; j++) {
      const [key, length, isStart] = map[j];
      line.push([item[key], length, isStart]);
    }
    lines.push(generate(line));
  }
  return '```' + lines.join('\n') + '```';
}

module.exports = async (m, args) => {
  const cmd = args[0];
  const name = args[1];
  const cost = Number(args[2]);

  if (cmd === 'add' || cmd === 'update' && member.hasPermission('ADMINISTRATOR')) {
    if (!name || !cost) {
      return m.channel.send(`name and cost required!`);
    }
    if (isNaN(cost)) {
      return m.channel.send(`cost must be a number!`);
    }
    const [item, isNew] = await Shop.findOrBuild({
      where: {
        name: name
      }
    });
    item.cost = cost;
    await item.save();
    if (isNew) {
      return m.channel.send(`new item **${name}** created!`);
    }
    return m.channel.send(`**${name}** updated!`);
  }

  const shop = await Shop.findAll({
    order: [['id']]
  });
  return m.channel.send(table(shop, [
    ['id', 3, 1],
    ['name', 14],
    ['cost', 5, 1],
    ['updatedAt', 15],
  ]));
};
