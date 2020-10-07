console.log('script.js');

const script = process.argv[2];

require(`./scripts/${script}`);
