const y = require('../core/base');

module.exports = async (_y, args) => {
  const m = _y.message;
  if (m.member.roles.find(r => r.name === 'Staff')) {
    if (!args[0]) {
      m.channel.send(
      'What do you want to announce?'
      );
      return;
    }

    const axios = require('axios');

    const toAttach = [];
    const attachments = Array.from(m.attachments);
    for (let i = 0; i < attachments.length; i++) {
      try {
        const a = attachments[i][1];

        const response = await axios.get(
          a.url,  { responseType: 'arraybuffer' }
        );
        const ext = a.url.split('.').pop();
        const buffer = Buffer.from(
          response.data, ext
        );

        toAttach.push({
          attachment: buffer,
          name: `file${i}.${ext}`,
        });
      } catch (e) {
        console.log('error getting url', e.message);
      }
    }

    //console.log(toAttach);

    m.channel.send(
      _y.message.content.replace(
        /.announce\s+/, ''
      )
      , {
        files: toAttach
      }
    );
    m.delete();
  } else {
    m.channel.send(
    "You do not have enough permissions"
    + " to use this command."
    );
  }
};
