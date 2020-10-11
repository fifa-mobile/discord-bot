const y = require('../core/base');
const D = y.Discord

module.exports = async (m, args) => {
  if (m.member.roles.cache.find(r => r.name === 'Staff')) {
    const attachments = Array.from(m.attachments);
    if (!args[0] && !attachments.length) {
      m.channel.send(
      '<a:announce:751806445254606928> | What do you want to announce?'
      );
      return;
    }
   /*if(args[0]==='jngksbraeirg'){
   const D = y.Discord;
   const url = 'https://raw.githubusercontent.com/fifa-mobile/discord-bot/master/images/20201011_121401.jpg';
   const attachment = new D.MessageAttachment(url, 'AHQH2H.jpg');
   m.channel.send("Hello @everyone ! \nWe hope our H2H Tourney memebers are enjoying/have enjoyed our actual tourney.<a:1peepoJedi:739413703128252448> \nAs we get closer to our <a:one:764910636974604328>st birthday, we are announcing our second **AHQ Anniversary H2H Tourney**!! \nThis tourney is going to be different from our previous ones, encouraging teamwork towards victory. More information to come in the upcoming days. \n\nSo, you know the drill, simply click the reaction below to apply. Applications are open until 15th October reset time. \nGood luck!<:vamos:683393120200556556> ", {files: [attachment]})
   m.delete();
   }else{*/
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

    let result = m.content.replace(
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
   /*}*/
  } else {
    m.channel.send(
    "<a:cross:751443454244159519> | You do not have enough permissions"
    + " to execute this command."
    );
  }
};
