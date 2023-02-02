 const Discord = require("discord.js")
  
  const config = require("./config.json")
  
  const client = new Discord.Client({ 
    intents: [ 
      Discord.GatewayIntentBits.Guilds
    ]
  });
  
  client.login(config.token)

  module.exports = client

const { QuickDB } = require("quick.db")
const db = new QuickDB()

client.on('interactionCreate', (interaction) => {

  if(interaction.type === Discord.InteractionType.ApplicationCommand){

      const cmd = client.slashCommands.get(interaction.commandName);

      if (!cmd) return interaction.reply(`Error`);

      interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

      cmd.run(client, interaction)

   }
})

client.on('ready', () => {
  console.log(`🔥 Estou online em ${client.user.username}!`)
})