class Commands {
  _(y, cmd, args) {
    this.y = y;
    this.cmd = cmd;
    this.args = args;
  }
}

module.exports = (y, c, a) => new Commands(y, c, a);
