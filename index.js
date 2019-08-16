const Discord = require("discord.js")
const config = require("./config.json")
const bot = new Discord.Client();

bot.on("ready", () => {
  console.log(bot.user.username + " is online.")
});

bot.on("message", async message => {
  //a little bit of data parsing/general checks
  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;
  let content = message.content.split(" ");
  let command = content[0];
  let args = content.slice(1);
  let prefix = config.prefix;
  if(message.channel.name==="testing"){
    let bestArr=[],messageArr=[],messages1;
    let messages=message.channel.fetchMessages()
    .then(m => {
      //console.log(messages.filter(m=>m.channel.name==="testing"));
      return m.filter(m=>m.channel.name==="testing");
    })
    .catch(console.error);
    await messages;
    console.log(messages);
    try {
      messages1=messages.array();
      messageArr=messages1.map(Message => { Message.id, Message.channel.id, Message.reactions });
    } catch(e){
      console.error;
    }
    console.log(messageArr);
  };
})

bot.login(config.token)
