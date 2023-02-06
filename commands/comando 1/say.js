const Discord = require("discord.js")

module.exports = {
    name: "say", 
    description: "oque você deseja que eu fale?", 
    type: Discord.ApplicationCommandType.ChatInput,
    options:[
        {
            name: "mensagem",
            description: "escreva uma mensagem",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "titulo",
            description: "selecione o titulo da embed",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "cor",
            description: "selecione a cor da mensagem (hexadecimal)",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "canal",
            description: "selecione um canal",
            type: Discord.ApplicationCommandOptionType.Channel,
            required: true,
        },
        {
            name: "log",
            description: "log da mensagem (opcional)",
            type: Discord.ApplicationCommandOptionType.Channel,
            required: false,
        },
        {
            name: "usuario",
            description: "author da mensagem (para a log)",
            type: Discord.ApplicationCommandOptionType.User,
            required: false,
        }
    ],

    run: async (client, interaction) => {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
            interaction.reply({ content: `Você não tem permissão para usar este comando!`, ephemeral: true })
        } else {

            let msg = interaction.options.getString("mensagem")
            let titulo = interaction.options.getString("titulo")
            let cor = interaction.options.getString("cor")
            let canal = interaction.options.getChannel("canal")
            let log = interaction.options.getChannel("log")
            let user = interaction.options.getUser("usuario")

            const embed = new Discord.EmbedBuilder()
            .setTitle(`${titulo}`)
            .setColor(`${cor}`)
            .setDescription(`${msg}`)
            .setFooter({ text: `Andromeda` })
            .setThumbnail("https://d3qdvvkm3r2z1i.cloudfront.net/media/catalog/product/cache/1/thumbnail/85e4522595efc69f496374d01ef2bf13/l/u/lucipurr_thumb.png")
            
             canal.send({ embeds: [embed], content: `` }).then( () => {
                let emb = new Discord.EmbedBuilder()
                .setColor("#eb0927")
                .setDescription(`Mensagem enviada com sucesso!`)

                interaction.reply({ embeds: [emb], ephemeral: true })
             }).catch (e => {
                let emb1 = new Discord.EmbedBuilder()
                .setColor("#eb0927")
                .setDescription(`Houve algum erro ao enviar a mensagem em ${canal}`)

                interaction.reply({ embed: [emb1], ephemeral: true })
             })             
                              
            }
        }


    }