module.exports = {
    name: "help",
    description: "Команда позволяющая узнать описание других, не круто ли?",
    aliases: ["h"],
    public: true,
    async execute(bot, message, args, config) {
        let data = await Guild.findOne({ guildID: message.guild.id });

        function list(cat, cname) {
            return `**${cname}**: ${bot.commands.filter(cmd => cmd.category == cat).map(cmd => `\`${cmd.name}\``).join(", ")}`;
        }


        let embed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setTitle(`Список команд | Текущий префикс: \`\`\`${data.prefix}\`\`\``)
        .setDescription(`${list("moderators", "Модерация")}\n${list("guilds", "Стандартные")}\n${list("other","Остальное")}\n${list("settings","Настройки")}\n${list("fun", "Развлечение")}`)
        .setThumbnail(bot.user.avatarURL([format = 'jpg']))
        .setFooter(`Всего команд: ${bot.commands.size} | Мэлоди`, bot.user.avatarURL([format='jpg']));

        message.channel.send(embed)
    }
};
