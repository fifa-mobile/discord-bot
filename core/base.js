class Base {
  constructor() {
    this._();
  }
}

const {debug } = Base.c = require('./config');
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

module.exports = Base;
