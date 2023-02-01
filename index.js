// const Discord = require("discord.js");
// const client = new Discord.Client({ intents: [1, 512, 32768, 2, 128] });
// const config = require("./config.json");
// const fs = require("fs");

// client.login(config.token)

// client.commands = new Discord.Collection();
// client.aliases = new Discord.Collection();
// client.categories = fs.readdirSync(`./commands/`);

// fs.readdirSync('./commands/').forEach(local => {
//     const comandos = fs.readdirSync(`./commands/${local}`).filter(arquivo => arquivo.endsWith('.js'))

//     for(let file of comandos) {
//         let puxar= require(`./commands/${local}/${file}`)

//         if(puxar.name) {
//             client.commands.set(puxar.name, puxar)
//         } 
//         if(puxar.aliases && Array.isArray(puxar.aliases))
//         puxar.aliases.forEach(x => client.aliases.set(x, puxar.name))
//     } 
// });

// client.on("messageCreate", async (message) => {

//     let prefix = config.prefix;
  
//     if (message.author.bot) return;
//     if (message.channel.type === Discord.ChannelType.DM) return;     
  
//     if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
  
//     if(!message.content.startsWith(prefix)) return;
//     const args = message.content.slice(prefix.length).trim().split(/ +/g);
  
//     let cmd = args.shift().toLowerCase()
//     if(cmd.length === 0) return;
//     let command = client.commands.get(cmd)
//     if(!command) command = client.commands.get(client.aliases.get(cmd)) 
    
//   try {
//       command.run(client, message, args)
//   } catch (err) { 
//      console.error('Erro:' + err); 
//   }
// });

// module.exports = client

// client.on('interactionCreate', (interaction) => {

//   if(interaction.type === Discord.InteractionType.ApplicationCommand){

//       const cmd = client.slashCommands.get(interaction.commandName);

//       if (!cmd) return interaction.reply(`Error`);

//       interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

//       cmd.run(client, interaction)

//    }
// })

// client.on("ready", () => {
//     console.log(`🔥 Estou online em ${client.user.username}!`)
// })

// client.slashCommands = new Discord.Collection()

// require('./handler')(client)

// client.login(config.token)









const Discord = require("discord.js")

const config = require("./config.json")

const client = new Discord.Client({ 
  intents: [ 
Discord.GatewayIntentBits.Guilds
       ]
    });

module.exports = client

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

client.login(config.token)
