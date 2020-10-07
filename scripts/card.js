console.log('script/card.js');

const fs = require('fs');
(async() => {
  fs.writeFileSync(
    'image.png',
    (await require('../modules/card')(process.argv[3])).buffer
  );
})();
