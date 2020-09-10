class Base {
  constructor() {
    this._();
  }
}

Base.c = require('./config');
const { debug } = Base.c.main;
Base.Discord = require('discord.js');
Base.client = new Base.Discord.Client();
Base.chalk = require('chalk');
Base.df = require('dateformat');
Base.fs = require('fs');

function getErrorObject() {
  try { throw Error('') } catch(e) {return e;}
}

function caller() {
  const err = getErrorObject();
  const callerLine = err.stack.split("\n")[4];
  const index = callerLine.indexOf("at ");
  return callerLine.slice(
    index+2, callerLine.length
  );
}

function applyTemplate(template, properties) {
  var returnValue = "";
  var templateFragments = template.split("{{");
  returnValue += templateFragments[0];
  for (var i = 1; i < templateFragments.length; i++) {
    var fragmentSections = templateFragments[i].split(
      "}}", 2
    );
    returnValue += properties[fragmentSections[0]];
    returnValue += fragmentSections[1];
  }
  return returnValue;
}

Base.r = (path, args = {}) => {
  return applyTemplate(Base.fs.readFileSync(
    `./commands/files/${path}.txt`, 'utf8'
  ), args);
};

Base.l = function l() {
  if (!debug) return;

  const TIME = Base.df(new Date(), "dd/mm/yy|HH:MM:ss");
  const CALLER = caller();
  const LOG_PREFIX = Base.chalk.blue(`${TIME} ### `);
  const LOG_SUFFIX = Base.chalk.blue(` ### ${CALLER}`);

  let args = Array.prototype.slice.call(arguments);
  args.unshift(LOG_PREFIX);
  args.push(LOG_SUFFIX);
  console.log.apply(console, args);
};

function generate(data, isHeader) {
  let items = [];
  let separators = [];
  for (let i = 0; i < data.length; i++) {
    let [name, length, isStart] = data[i];
    if (typeof name === 'function') {
      name = name()[1];
    }
    const string = String(name).substring(0, length);
    let item = string.padEnd(length, ' ');
    if (!isHeader && isStart) {
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

Base.table = function(data, map) {
  let lines = [generate(map, true)];
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    let line = [];
    for (let j = 0; j < map.length; j++) {
      const [key, length, isStart] = map[j];
      let value = item[key];
      if (typeof key === 'function') {
        value = key(item[key()[1]])[0];
      }
      line.push([value, length, isStart]);
    }
    lines.push(generate(line));
  }
  return '```' + lines.join('\n') + '```';
};

Base.uname = function(m, uid) {
  const user = Base.client.users.cache.get(uid);
  if (!user) return 'unknown';
  const member = m.guild.member(user);
  if (!member) return user.username;
  return member.displayName ?
    member.displayName : member.name
  ;
};

module.exports = Base;
