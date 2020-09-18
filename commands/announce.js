const y = require('../core/base');
const D = y.Discord

module.exports = async (_y, args) => {
  const m = _y.message;
  if (m.member.roles.cache.find(r => r.name === 'Staff')) {
    const attachments = Array.from(m.attachments);
    if (!args[0] && !attachments.length) {
      m.channel.send(
      '<a:announce:751806445254606928> | What do you want to announce?'
      );
      return;
    }
   if(args[0]==='ejiwoqhdieks'){
   m.channel.send("Hello @everyone ! \n It is time for another **AHQ Tournament**!!! <a:1blobDance:739413657028526091> \n This time it is a special one and we will reveal more regarding the reason in the upcomming days. \n So let's get to action, shall we? \n To enter the Tournament all you need to do is click the reaction below. Keep in mind that this Tournament will have some restrictions regarding team building but don't worry, they aren't too hard. See you on the virtual pitch! <a:football:751811132834054255>")
   }else{
    const axios = require('axios');

    const toAttach = [];
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

    let result = _y.message.content.replace(
      /.announce\s?/, ''
    );

    result = result.replace(/\[([^\][]+)]/g, "<a:$1>");

    console.log(result);

    m.channel.send(
      result
      , {
        files: toAttach
      }
    );
    m.delete();
  }
  }else {
    m.channel.send(
    "<a:cross:751443454244159519> | You do not have enough permissions"
    + " to execute this command."
    );
  }
};
