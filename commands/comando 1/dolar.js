const Discord = require("discord.js");
const axios = require("axios");

module.exports = {
  name: "montante",
  description: "Veja a cotação de hoje",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "quanto",
      description: "Escreva o montante que voce quer cambiar.",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    try {
      let response = await axios.get(
        "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL"
      );
      let cota = response.data;
      let amount = cota.USDBRL.bid;
      let msg = interaction.options.getString("quanto");

      let value = amount * msg;

      const embed = new Discord.EmbedBuilder()
        .setTitle("Com a cotação de hoje, voce pode ter em dolar: ")
        .setColor("#eb0927")
        .addFields({
          name: "Seu montante após a conversão: ",
          value: `${parseFloat(value).toFixed(2)}`,
          inline: true,
        },
        {
            name: "O valor do dolar está: ",
            value: `${parseFloat(amount).toFixed(2)}`,
            inline: true,
        }
        )
        .setImage("https://pngimg.com/uploads/coin/coin_PNG36941.png")
        .setFooter({
          text: `Cotação de ${cota.BTCBRL.create_date}`,
          iconURL:
            "https://images-ext-2.discordapp.net/external/iB0DMppkLqhv4lQDix_OQGQn6FyoRZDK49roAl2tkV4/https/d3qdvvkm3r2z1i.cloudfront.net/media/catalog/product/cache/1/thumbnail/85e4522595efc69f496374d01ef2bf13/l/u/lucipurr_thumb.png?width=499&height=499",
        });

      interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error("Erro ao buscar a cotação:", error);
      interaction.reply("Desculpe, ocorreu um erro ao buscar a cotação.");
      console.log(amount);
    }
  },
};
