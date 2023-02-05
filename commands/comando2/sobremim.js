const Discord = require("discord.js")
const { ApplicationCommandOptionType } = require('discord.js');
const { QuickDB } = require('quick.db')
const db = new QuickDB()

module.exports = {
  name: "sobre-mim", 
  description: "Muda o seu sobre mim no user-info", 
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'descrição',
      description: 'A descrição que vai mudar no sobre mim',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  run: async (client, interaction, args) => {

    const descrição = interaction.options.getString("descrição");

    // const sobremim = interaction.options.getString("descrição");

    const usuarioTest = (`${interaction.user}`);

    await db.set(`aboutme_${usuarioTest}`, descrição);

    const sobre = new Discord.EmbedBuilder()

    .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`})
    .setTitle(`<:verificado1:1049840590948405370> | Sobre mim atualizado com sucesso!`)
    .setDescription(`Use /user-info (Sua TAG) para ver suas informações/sobre mim.\n\nSobre mim novo: **\`${descrição}\`**.`)
    .setColor(`#00000`)
    .setFooter({
      text: `Requisitado por: ${interaction.user.tag}`,
      iconURL: interaction.user.displayAvatarURL({ format: "png" })
    });

    interaction.reply({ embeds: [sobre], ephemeral: true });

  }
}