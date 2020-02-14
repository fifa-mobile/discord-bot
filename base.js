const config = require('./config');
const { debug } = config;
const df = require('dateformat');
const chalk = require('chalk');

class Base {
  constructor() {
    this._();
  }
}

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

Base.chalk = chalk;
Base.c = config;

Base.l = function l() {
  if (!debug) return;

  const TIME = df(new Date(), "dd/mm/yy|HH:MM:ss")
  const CALLER = caller();
  const LOG_PREFIX = chalk.blue(`${TIME} ### `);
  const LOG_SUFFIX = chalk.blue(` ### ${CALLER}`);
  

  let args = Array.prototype.slice.call(arguments);
  args.unshift(LOG_PREFIX);
  args.push(LOG_SUFFIX);
  console.log.apply(console, args);
};

module.exports = Base;
