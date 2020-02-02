const http = require('http');
const server = http.createServer(function (req, res) {
  const url = req.url;
  if (url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('0.0.1\n');
  } else {
    res.statusCode = 404;
    res.end('404, sorry!\n');
  }
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on ${PORT}/`);
});
