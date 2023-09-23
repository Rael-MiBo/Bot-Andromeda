const Discord = require("discord.js")

module.exports = {
    name: "apagar",
    description: "Limpa o Canal de texto",
    type: 1,
    options: [
        {
            name: 'quantidade',
            description: 'Número de mensagens para serem apagadas.',
            type: 10,
            required: true,
        },
        {
            name: 'mostrar',
            description: 'notificação de deletar, será exibida?',
            type: 3,
            required: true,
            choices: [
                {
                    name: "sim",
                    value: apagar = "sim",
                },
                {
                    name: "nao",
                    value: apagar = "nao",
                }
            ]
        }
    ],

    run: async (client, interaction) => {

        let numero = interaction.options.getNumber('quantidade')
        let apagar = interaction.options.getString('mostrar')

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
            interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
        }
        else {

            if (parseInt(numero) > 99 || parseInt(numero) <= 0) {

                let embed = new Discord.EmbedBuilder()

                    .setColor("#eb0927")
                    .setDescription(`\`/clear [1 - 99]\``);

                interaction.reply({ embeds: [embed] })

            }
            else {

                interaction.channel.bulkDelete(parseInt(numero))

                let embed = new Discord.EmbedBuilder()
                    .setColor("#eb0927")
                    .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                    .setDescription(`🗑️ O canal de texo ${interaction.channel} teve \`${numero}\` mensagens deletadas por \`${interaction.user.username}\`.`);

                interaction.reply({ embeds: [embed] })

            }

        }
        if (apagar === "nao") {

            setTimeout(() => {

                interaction.deleteReply()

            }, 2000)

        }

    }
}