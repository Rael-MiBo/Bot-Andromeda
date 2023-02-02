const Discord = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB()

module.exports = {
  name: "verificação",
  description: "Ative o sistema de verificação.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "cargo_verificado",
        description: "Mencione um cargo para o membro receber após se verificar.",
        type: Discord.ApplicationCommandOptionType.Role,
        required: true,
    },
    {
        name: "canal",
        description: "Mencione um canal de texto.",
        type: Discord.ApplicationCommandOptionType.Channel,
        required: false,
    }
],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
        interaction.reply(`Olá ${interaction.user}, você não possui permissão para utilizar este comando.`)
    } else {
        let canal = interaction.options.getChannel("canal");
        if (!canal) canal = interaction.channel;

        let cargo = interaction.options.getRole("cargo_verificado");
        await db.set(`cargo_verificação_${interaction.guild.id}`, cargo.id);

        let embed_ephemeral = new Discord.EmbedBuilder()
        .setColor("#ffffff")
        .setDescription(`Pronto ${interaction.user}, o sistema foi ativado no canal ${canal} com sucesso.`);

        let embed_verificacao = new Discord.EmbedBuilder()
        .setColor("Green")
        .setTitle(`Você é um robô?`)
        .setThumbnail('https://d3qdvvkm3r2z1i.cloudfront.net/media/catalog/product/cache/1/thumbnail/85e4522595efc69f496374d01ef2bf13/l/u/lucipurr_thumb.png')
        .setDescription(`> Clique no botão abaixo para se verficar`);

        let botao = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
            .setCustomId("verificar")
            .setEmoji("✅")
            .setLabel("Verifique-se")
            .setStyle(Discord.ButtonStyle.Primary)
        );

        interaction.reply({ embeds: [embed_ephemeral], ephemeral: true }).then( () => {
            canal.send({ embeds: [embed_verificacao], components: [botao] })
        })
    }


    
  }
}