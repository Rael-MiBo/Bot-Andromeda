// const Discord = require("discord.js")

// module.exports = {
//   name: "pingado", 
//   description: "Vendo o ping", 
//   type: Discord.ApplicationCommandType.ChatInput,

//   run: async (client, interaction) => {

//     let ping = client.ws.ping;

//     let embed_1 = new Discord.EmbedBuilder()
//     .setColor("#BF40BF")
//     .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
//     .setDescription(`🏓 Olá ${message.author}, seu ping está em: \`carregando...\`.`);
    
//     let embed_2 = new Discord.EmbedBuilder()
//     .setColor("#BF40BF")
//     .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
//     .setDescription(`🏓 Olá ${message.author}, seu ping está em: \`${ping}\`.`);

//     interaction.reply({ embeds: [embed_1]}).than (() => {
//         setTimeout(() => {
//             interaction.editreply({ embeds: [embed_2] })
//         },2000)
//     } ) 
//   }
// }

const Discord = require("discord.js")

module.exports = {
  name: "ping", // Coloque o nome do comando
  description: "Veja o ping do bot.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    let ping = client.ws.ping;

    let embed_1 = new Discord.EmbedBuilder()
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setDescription(`Olá ${interaction.user}, meu ping está em \`calculando...\`.`)
    .setColor("Random");

    let embed_2 = new Discord.EmbedBuilder()
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setDescription(`Olá ${interaction.user}, meu ping está em \`${ping}ms\`.`)
    .setColor("Random");

    interaction.reply({ embeds: [embed_1] }).then( () => {
        setTimeout( () => {
            interaction.editReply({ embeds: [embed_2] })
        }, 2000)
    })
  }
}