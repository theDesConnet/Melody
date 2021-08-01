module.exports = {
    name: "eval",
    description: "Для создателя!",
    aliases: [],
    public: false,
    async execute(bot, message, args, config) {
     function clean(text) {
        if (typeof(text) === "string")
           return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
       else
           return text;
      }
      try{
        if (!code) return errorembed("> Что мне выполнять если ничего не написано?")
       const code = args.join(" ");
       let evaled = eval(code);

       if (typeof evaled !== "string")
         evaled = require("util").inspect(evaled);
       let embed = new Discord.MessageEmbed()
       .setColor(config.color)
       .setAuthor("Eval")
       .setDescription(`**Команда выполнена успешно!** \`${clean(evaled), {code:"x1"}}\``)
       .setFooter(`${message.guild.name} | Мэлоди`, bot.user.avatarURL([format='jpg']))      

        message.channel.send(embed);
      } catch(err) {

      }
    }
};
