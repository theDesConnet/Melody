module.exports = {
    name: "about",
    description: "Информация о боте",
    aliases: [],
    public: true,
    async execute(bot, message, args, config) {
        let embed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setAuthor(bot.user.tag, bot.user.avatarURL([format = 'jpg']))
        .addField("Техническая информация:", `**Версия бота:** ${config.botinfo.version}\n**Версия Node.js:** ${config.botinfo.nodejs}\n**Версия Discord.js:** ${config.botinfo.discordjs}\n**Версия Mongoose:** ${config.botinfo.mongoose}`, false)
        .addField("Создатель",`<@${config.owner}>`)
        .setFooter(`${message.guild.name} | Мэлоди`, bot.user.avatarURL('jpg'))

        message.channel.send(embed)
    }
};
