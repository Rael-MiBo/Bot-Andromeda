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


client.slashCommands = new Discord.Collection()

require('./handler')(client)

client.on("interactionCreate", async (interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId === "verificar") {
      let role_id = await db.get(`cargo_verificação_${interaction.guild.id}`);
      let role = interaction.guild.roles.cache.get(role_id);
      if (!role) return;
      interaction.member.roles.add(role.id)
      interaction.reply({ content: `Ola **${interaction.user.username}**, você foi verificado!`, ephemeral: true })
    }
  }
})

const prefix = "/";

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});