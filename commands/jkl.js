module.exports = async (_y, args) => {
  const {User} = require('../models/index');
  const uid = _y.message.author.id;
  const user = await User.findOne({where: {uid: uid}});
  const y = require('../core/base');
  const D = y.Discord;
  
  const challengeTeam = 'Real Madrid';
  var p1id;
  var p2id;
  var p3id;
  var p4id;
  var p5id;
  var p6id;
  var p7id;
  var p8id;
  var p9id;
  var p10id;
  var p11id;
  const hasBenzema = false;
  const hasVinicius = true;
  const hasHazard = false;
  const hasKroos = true;
  const hasModric = false;
  const hasCasemiro = false;
  const hasMarcelo = false;
  const hasRamos = false;
  const hasVarane = false;
  const hasCarvajal = false;
  const hasCourtois = true;
  
  
console.log('var');
   if(hasBenzema){
      p1id = '21165153';
    }else{
      p1id = '21165153B';
    }
   
   if(hasVinicius){
      p2id = '21238794';
    }else{
      p2id = '21238794B';
    }
   
    if(hasHazard){
      p3id = '21183277';
    }else{
      p3id = '21183277B';
    }
  
    if(hasCasemiro){
      p4id = '21200145';
    }else{
      p4id = '21200145B';
    }
  
    if(hasKroos){
      p5id = '21182521';
    }else{
      p5id = '21182521B';
    }
  if(hasModric){
      p6id = '21177003';
    }else{
      p6id = '21177003B';
    }
  if(hasMarcelo){
      p7id = '21176676';
    }else{
      p7id = '21176676B';
    }
  if(hasRamos){
      p8id = '21155862';
    }else{
      p8id = '21155862B';
    }
  if(hasVarane){
      p9id = '21201535';
    }else{
      p9id = '21201535B';
    }
  if(hasCarvajal){
      p10id = '21204963';
    }else{
      p10id = '21204963B';
    }
  if(hasCourtois){
      p11id = '21192119';
    }else{
      p11id = '21192119B';
    }
console.log('id');
      const p1 ='https://raw.githubusercontent.com/fifa-mobile/discord-bot/master/images/TestImg/' + p1id +'.png'
      const p2 ='https://raw.githubusercontent.com/fifa-mobile/discord-bot/master/images/TestImg/' + p2id +'.png'
      const p3 ='https://raw.githubusercontent.com/fifa-mobile/discord-bot/master/images/TestImg/' + p3id +'.png'
      const p4 ='https://raw.githubusercontent.com/fifa-mobile/discord-bot/master/images/TestImg/' + p4id +'.png'
      const p5 ='https://raw.githubusercontent.com/fifa-mobile/discord-bot/master/images/TestImg/' + p5id +'.png'
      const p6 ='https://raw.githubusercontent.com/fifa-mobile/discord-bot/master/images/TestImg/' + p6id +'.png'
      const p7 ='https://raw.githubusercontent.com/fifa-mobile/discord-bot/master/images/TestImg/' + p7id +'.png'
      const p8 ='https://raw.githubusercontent.com/fifa-mobile/discord-bot/master/images/TestImg/' + p8id +'.png'
      const p9 ='https://raw.githubusercontent.com/fifa-mobile/discord-bot/master/images/TestImg/' + p9id +'.png'
      const p10 ='https://raw.githubusercontent.com/fifa-mobile/discord-bot/master/images/TestImg/' + p10id +'.png'
      const p11 ='https://raw.githubusercontent.com/fifa-mobile/discord-bot/master/images/TestImg/' + p11id +'.png'
    console.log('images');
    const {createCanvas, loadImage} = require('canvas');

    const w = 1053;
    const h = 960;
    const canvas = createCanvas(w, h);
    const ctx = canvas.getContext('2d');
    const pitch = 'https://raw.githubusercontent.com/fifa-mobile.github.io/images/TestImg/pitch.png'
    
    const canP1 = await loadImage(p1);
  
    const canP2 = await loadImage(p2);
    const canP3 = await loadImage(p3);
    const canP4 = await loadImage(p4);
    const canP5 = await loadImage(p5);
    const canP6 = await loadImage(p6);
    const canP7 = await loadImage(p7);
    const canP8 = await loadImage(p8);
    const canP9 = await loadImage(p9);
    const canP10 = await loadImage(p10);
    const canP11 = await loadImage(p11);
    const canPitch = await loadImage(pitch);
    
   console.log('images loaded');
    
    const s = 192;
    ctx.drawImage(canPitch, 0, 0, w, h);
    ctx.drawImage(canP1, 96, 96, s, s);
  console.log('testSuccessful');
    ctx.drawImage(canP2, 384, 0, s, s);
    ctx.drawImage(canP3, 702, 96, s, s);
    ctx.drawImage(canP4, 192, 384, s, s);
    ctx.drawImage(canP5, 384, 384, s, s);
    ctx.drawImage(canP6, 576, 384, s, s);
    ctx.drawImage(canP7, 0, 702, s, s);
    ctx.drawImage(canP8, 192, 768, s, s);
    ctx.drawImage(canP9, 576, 768, s, s);
    ctx.drawImage(canP10, 768, 702, s, s);
    ctx.drawImage(canP11, 384, 816, s, s);
     
  console.log('canvas');

    const attachment = new D.MessageAttachment(canvas.toBuffer(), 'img.png');

    _y.message.channel.send(`Your **${challengeTeam}** reward:`, {files: [attachment]});
  
};
  
  
  
