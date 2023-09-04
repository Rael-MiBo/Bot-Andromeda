const Discord = require("discord.js");
const axios = require("axios");

axios.get("https://economia.  /json/last/USD-BRL", {
  headers: {
    Authorization:
      "bot MTA3MDEyNzI1MjAwNTczMjQxMw.GtigCx.TJ7Izn7VPXsoeodT-CL9-V49oYb0PdF0VPinlY",
  },
});

module.exports = {
  name: "cotação",
  description: "Veja a cotação de hoje",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    try {
      let response = await axios.get(
        "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL"
      );
      let cota = response.data;

      const embed = new Discord.EmbedBuilder()
        .setTitle("Cotação de hoje")
        .setColor("#eb0927")
        .addFields(
          {
            name: "Cotação do Dólar: ",
            value: `${parseFloat(cota.USDBRL.bid).toFixed(2)}`,
            inline: true,
          },
          { name: "\u200B", value: "\u200B", inline: true },
          { name: "\u200B", value: "\u200B", inline: true },
          {
            name: "Alta do Dólar",
            value: `${parseFloat(cota.USDBRL.high).toFixed(2)}`,
            inline: true,
          },
          {
            name: "Baixa do Dólar",
            value: `${parseFloat(cota.USDBRL.low).toFixed(2)}`,
            inline: true,
          },
          { name: "\u200B", value: "\u200B", inline: true },
          { name: "\u200B", value: "\u200B", inline: true },
          { name: "\u200B", value: "\u200B", inline: true },
          { name: "\u200B", value: "\u200B", inline: true }
        )
        .addFields(
          {
            name: "Cotação do Euro: ",
            value: `${parseFloat(cota.EURBRL.bid).toFixed(2)}`,
            inline: true,
          },
          { name: "\u200B", value: "\u200B", inline: true },
          { name: "\u200B", value: "\u200B", inline: true },
          {
            name: "Alta do Euro",
            value: `${parseFloat(cota.EURBRL.high).toFixed(2)}`,
            inline: true,
          },
          {
            name: "Baixa do Euro",
            value: `${parseFloat(cota.EURBRL.low).toFixed(2)}`,
            inline: true,
          },
          { name: "\u200B", value: "\u200B", inline: true },
          { name: "\u200B", value: "\u200B", inline: true },
          { name: "\u200B", value: "\u200B", inline: true },
          { name: "\u200B", value: "\u200B", inline: true }
        )
        .addFields(
          {
            name: "Cotação do Bitcoin: ",
            value: `${parseFloat(cota.BTCBRL.bid).toFixed(2)}`,
            inline: true,
          },
          { name: "\u200B", value: "\u200B", inline: true },
          { name: "\u200B", value: "\u200B", inline: true },
          {
            name: "Alta do Bitcoin",
            value: `${parseFloat(cota.BTCBRL.high).toFixed(2)}`,
            inline: true,
          },
          {
            name: "Baixa do Bitcoin",
            value: `${parseFloat(cota.BTCBRL.low).toFixed(2)}`,
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
    }
  },
};
