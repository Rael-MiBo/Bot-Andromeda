const Discord = require("discord.js")

module.exports = {
  name: "start-confessions", 
  description: "slaooe",
  type: Discord.ApplicationCommandType.ChatInput,
  
  run: async (client, interaction) => {
    
    const prefix = "/";

    client.on("message", (message) => {
        if (!message.content.startsWith(prefix) || message.author.bot) return;
      
        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();
      
        if (command === "start-confession") {
          let channelName = `confession-${message.author.id}`;
          
          message.guild.channels.create(channelName, {
            type: "text",
            reason: `Confession channel for ${message.author.username}`,
          })
            .then((channel) => {
              channel.send(`${message.author}, você tem algum segredo para confessar?`);
            })
            .catch((error) => {
              console.error(`Error creating confession channel: ${error}`);
            });
        }
      });

  }
}