const y = require('../core/base');
const D = y.Discord

module.exports = async (_y, args) => {
  const m = _y.message;
  if (m.member.roles.find(r => r.name === 'Staff')) {
    const attachments = Array.from(m.attachments);
    if (!args[0] && !attachments.length) {
      m.channel.send(
      'What do you want to announce?'
      );
      return;
    }
    if( args[0]==='fe64e5wp12rtghth'){
       const attachment = new D.Attachment('https://raw.githubusercontent.com/fifa-mobile/discord-bot/master/images/SBC.jpg');
    m.channel.send("__**Bot Update**__ :mega: \n Hello everyone!We have made a few changes to the bot: \n **-Added SBC!** <a:1pepeHype:739414958760263680><a:1kirbyHype:739414600440610836> \n Squad Building Challenges are here!Trade players you don't want in your inventory for higher value ones.Use `$sbc` to see a full list of available SBCs. Use `$sbc complete [id]` to complete a SBC.IDs can be found in the list. \n Always wanted a specific Icon or a Prime Icon but ended up getting other ones in market or packs?Fear no more.SBCs give you the chance of choosing the Icon or Prime Icon you want.Each week there will be a different Icon and Prime Icon.(Yes, itzsrs, you will be able to get that Nesta!)This week we have Icon Schmeichel and Prime Icon Zidane! \n **-Added new cards**<a:crabDance:751080988250996736> \n Go out there and pack them all! \n **-Adding new heeroes** :superhero: \n Thanks Praddep for all the great work you have been doing adding new heroes. \n\n This is it for now.Stay safe. <a:pepeMaskJam:751443538532892783>" , { files: [attachment]});
    m.delete();
    } else if(args[0]==='fe64e5wp12rtghth')
    {
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

    m.channel.send(
      _y.message.content.replace(
        /.announce\s?/, ''
      )
      , {
        files: toAttach
      }
    );
    m.delete();
  } 
  }else {
    m.channel.send(
    "You do not have enough permissions"
    + " to use this command."
    );
  }
};
