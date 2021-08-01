// bot const
global.Discord = require('discord.js')
global.mongoose = require('mongoose')
const ms = require('ms')
const config = require('./config.json')
const fs = require('fs');
const bot = new Discord.Client()
bot.commands = new Discord.Collection()
global.Guild = require("./data/guilds.js");
global.User = require('./data/users.js');

mongoose.connect(config.dataurl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected',()=>{
  console.log('[✅ DataBase] Connected!')
})

fs.readdirSync('./commands').forEach(module => {
    const commandFiles = fs.readdirSync(`./commands/${module}/`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${module}/${file}`);
        command.category = module;
        bot.commands.set(command.name, command);
    }
})

bot.on('ready', () => {
  console.log(`[✅ Bot] ${bot.user.tag} Online!`);
  console.log(`[✅ Bot] Creator: DesConnet#6666`);
  bot.user.setPresence({ activity: { name: `Идет разработка... (Секрет) | ${config.prefix}help` }, status: 'online' })
  .then(console.log)
  .catch(console.error);
})

bot.on('message', async(message) => {
  function clean(text) {
    if (typeof(text) === "string")
       return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
   else
       return text;
  }

  if(message.author.bot) return;
  if(message.channel.type == 'dm') return;

  bot.nodb = (user) => message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`К сожелению **${user.tag}** нету в базе-данных.`));

  let user = await User.findOne({ guildID: message.guild.id, userID: message.author.id });
  let guild = await Guild.findOne({ guildID: message.guild.id });
  if(!user) { User.create({ guildID: message.guild.id, userID: message.author.id});}
  if(!guild) { Guild.create({ guildID: message.guild.id });}
    if (!message.content.startsWith(guild.prefix)) return;
    const args = message.content.slice(guild.prefix.length).trim().split(/ +/g);
    const cmdName = args.shift().toLowerCase();
    const command = bot.commands.get(cmdName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));
    if(!require('./config.json').owner.includes(message.author.id) && command.public === false) return;

    global.errorembed = function errorembed(text){
        let errembed = new Discord.MessageEmbed()
        .setColor('RED')
        .setAuthor(message.author.tag,message.author.displayAvatarURL({dynamic : true}))
        .setTitle('Ошибка!')
        .addField("Команда:", guild.prefix + cmdName, false)
        .addField("Причина:", text, false)
        .setFooter(`${message.guild.name} | Мэлоди`, bot.user.avatarURL('jpg'))
        message.channel.send(errembed)
    }

    global.infoembed = function infoembed(infohelp,text){
        let infembed = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setAuthor(message.author.tag,message.author.displayAvatarURL({dynamic : true}))
        .setTitle('Информация')
        .addField("Команда:", guild.prefix + cmdName, false)
        .addField("Помощь:", infohelp, false)
        .addField("Пример использования:", guild.prefix + text, false)
        .setFooter(`${message.guild.name} | Мэлоди`, bot.user.avatarURL('jpg'))
        message.channel.send(infembed)
    }

    command.execute(bot, message, args, config).catch((err) =>{
      if (cmdName == "eval"){
        errorembed(`Произошла ошибка: \`\`\`xl\n${clean(err)}\n\`\`\``);
      }
      else{
        console.log(`Недостаточно прав или произошла ошибка: ${err}`);
      }
    });
})

bot.login(config.token);
