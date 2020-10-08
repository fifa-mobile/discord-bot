module.exports = (m, args) => {
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
    m.channel.send('<a:8ball:751810566661734460> | ' + answer);
  } else {
    m.channel.send('<a:8ball:751810566661734460> | What do you want to ask?');
  }
};
