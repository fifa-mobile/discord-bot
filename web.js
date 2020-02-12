const y = require('./base');

class Web {
  constructor(_y) {
    this.y = _y;
    this.init();
  }

  init() {
    const http = require('http');
    const server = http.createServer(
      (req, res) => {
        const url = req.url;
        if (url === '/') {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain');
          res.end('0.0.1\n');
        } else {
          res.statusCode = 404;
          res.end('404, sorry!\n');
        }
      }
    );
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      y.l(`Server running on ${PORT}`);
    });
  }
}

module.exports = y => new Web(y);
