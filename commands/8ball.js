module.exports = (_y, args) => {
   if(args[0] && args[0] !== null) {
     const answers = [
       "Yep!",
       "You may rely on it.",
       "Without a doubt!",
       "As I see it,YES.",
       "Concentrate and ask again.",
       "I didn't get it.Could you ask again please?",
       "My sources say NO.",
       "Don't count on it.",
       "Outlook not so good.",
       "Very doubtful.",
    ];
     let answer = answers[
       Math.floor(Math.random()* answers.length)
     ];
     _y.reply('🎱 | ' + answer);
   } else {
     _y.reply('What do you want to ask?');
   }
};
