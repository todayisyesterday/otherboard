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
    let messageArr=[],messages1=[];
    let messages=message.channel.fetchMessages({limit:100})
    .then(m => {
      //console.log(messages.filter(m=>m.channel.name==="testing"));
      messages1=m.filter(m=>m.channel.name==="testing").array();
      return true;
    })
    .catch(console.error);
    await messages;
    messageArr=messages1.map(Message => {
      let mapObj={};
      mapObj["id"]=Message.id;
      mapObj["ida"]=Message.author.id;
      mapObj["rea"]=Message.reactions;
      return mapObj;
    });
    messageArr.forEach(e => {
      let reac=e.rea;
      let reacm=reac.find(e => e.message);
      if(reacm){
        let reacem=reacm._emoji.name;
        if(reacem==="⭐"){
          e.rea=reacm.count;
        } else {
          e.rea=0
        }
      } else {
        e.rea=0;
      };
    });
    messageArr.sort((a,b) => {
      return a.rea-b.rea;
    });
    console.log(messageArr);
    let reaEmbed = new Discord.RichEmbed()
    .setDescription("Best last STARRED 100 messages");
  };
})

bot.login(config.token)
