const Discord = require("discord.js")
const {GatewayIntentBits, Partials} = require("discord.js")
require('events').EventEmitter.defaultMaxListeners = 500;


const config = require("./config.json")

const client = new Discord.Client({ 
  intents: [ 
    Object.keys(GatewayIntentBits),
    Discord.GatewayIntentBits.Guilds
       ],
       partials: [Object.keys(Partials)],
    });

module.exports = client

// const logs = require('discord-logs');

// const {handleLogs} = require("./handler/handleLogs")


client.on('interactionCreate', (interaction) => {

  if(interaction.type === Discord.InteractionType.ApplicationCommand){

      const cmd = client.slashCommands.get(interaction.commandName);

      if (!cmd) return interaction.reply(`Error`);

      interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

      cmd.run(client, interaction)

   }
})

client.on("guildBanAdd", (member) => {
  const channel = client.channels.cache.get("1070835157038280806");
  const embed = new Discord.EmbedBuilder()
  .setColor("#eb0927")
  .setThumbnail(`${client.user.displayAvatarURL({ size: 2048 })}`)
  .setTitle(`<:1288discordrole:1028430849915498606> ‣ LOG | Usuario Banido.`)
  .setDescription(`<:1288discordrole:1028430849915498606> ‣ Informações do usuario:\n > **Membro:${member.user}** \n > **ID:${member.user.id}**`)
  .setFooter({ text:  `© ${client.user.username} 2023`})
  .setTimestamp(new Date())
  channel.send({ embeds: [embed] });
})

client.on("guildBanRemove", (member) => {
  const channel = client.channels.cache.get("1070835157038280806");
  const embed = new Discord.EmbedBuilder()
  .setColor("#eb0927")
  .setThumbnail(`${client.user.displayAvatarURL({ size: 2048 })}`) 
  .setTitle(`<:1288discordrole:1028430849915498606> ‣ LOG | Usuario Desbanido.`)
  .setDescription(`<:1288discordrole:1028430849915498606> ‣ Informações do usuario:\n > **Membro:${member.user}** \n > **ID:${member.user.id}**`)
  .setFooter({ text:  `© ${client.user.username} 2023`})
  .setTimestamp(new Date())
  channel.send({ embeds: [embed] });
})

client.on('messageUpdate', (message, newMessage, oldMessage) => {
  if(message.author.bot) return;


  const canalLogs = message.guild.channels.cache.get("1070835157038280806") 


  let usuárioMSGe = message.author.id;
  let usuárioMSGf = message.author;
  let ConteúdoAntigoMSG = message.content;
  let ConteúdoNovoMSG = newMessage;
  let CanalMSGEditada = message.channel;

  const embed_editada = new Discord.EmbedBuilder()
      .setTitle(`**Mensagem Editada**`)
      .setColor("#eb0927")
      .setFooter({text: `ID do usuário: ${usuárioMSGe}`})
      .setTimestamp(new Date()) 
      .setDescription(`**📝 ${usuárioMSGf} editou uma mensagem de texto**\n\n**Canal:** ${CanalMSGEditada} \n\n**Antiga mensagem:** \n \`\`\`${ConteúdoAntigoMSG}\`\`\` \n\n**Nova mensagem:** \n \`\`\`${ConteúdoNovoMSG}\`\`\``)


  try {

      canalLogs.send({ embeds: [embed_editada] })

  } catch (e) { }
}) 

client.on("messageDelete", (message, oldMessage, newMessage) => {
  const channel = client.channels.cache.get("1070835157038280806");
  const embed = new Discord.EmbedBuilder()
      .setTitle(`<:7889discordchat:1046476120297582622> ‣ LOG | Mensagem Deletada.`)
      .setColor('#eb0927')
      .setFooter({ text:  `© ${client.user.username} 2023`})
      .setThumbnail(`${client.user.displayAvatarURL({ size: 2048 })}`)
      .setTimestamp(new Date())
      .setDescription(`**<:1288discordrole:1028430849915498606> ‣ Autor da mensagem**  \n> **Usuário:** ${message.author} \n> **ID:** ${message.author.id} \n\n**<:7889discordchat:1046476120297582622> ‣ Canal:** \n> ${message.channel} \n\n**Mensagem deletada:** \n \`\`\`${message.content}\`\`\``)
      channel.send({ embeds: [embed] });
})

const { ActivityType } = require('discord.js')

setInterval(() => {

let list = ['estão me codando', 'em manutenção', 'sendo testada']

let status = list[Math.floor(Math.random() * list.length)]

client.user.setPresence({
activities: [{
name: status,
type: ActivityType.Watching
}],
status: 'online e roteando'
})      
}, 3000) 

client.on("messageCreate", message =>{

  let mention = new Discord.EmbedBuilder()

  .setDescription(`Olá`)
  .setColor(`#eb0927`)

  if (message.author.bot) return
  if (message.content == `<@${client.user.id}>`) message.channel.send({ embeds: [mention] })

})

client.on('ready', () => {
  console.log(`🔥 Estou online em ${client.user.username}!`)
})


client.slashCommands = new Discord.Collection()

require('./handler')(client)

client.login(config.token)

