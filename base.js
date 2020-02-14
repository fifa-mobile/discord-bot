class Base {
  constructor() {
    this._();
  }
}

const {debug } = Base.c = require('./config');
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
