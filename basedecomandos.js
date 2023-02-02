const Discord = require("discord.js")

module.exports = {
  name: "", 
  description: "",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "",
      description: "",
      type: Discord.ApplicationCommandOptionType.Channel,
      required: true,
    }
  ],
  
  
  
  run: async (client, interaction) => {


  }
}