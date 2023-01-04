module.exports = {
    name: "config",
    description: "Текущие настройки сервера",
    aliases: ["cfg"],
    public: true,
    async execute(client, message, args, config) {
        let data = await Servercfg.findOne({ guildID: message.guild.id });
        let result;

        if (data.defaultautoplay === "true") {result = "Включено"}
        if (data.defaultautoplay === "false") {result = "Выключено"}

        let embed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setTitle(`Настройки бота для текущего сервера`)
        .setDescription(`**Префикс:**\`${data.prefix||config.prefix}\`\n**Кастомный цвет:**\`${data.color}\``)
        .setThumbnail(client.user.avatarURL([format = 'jpg']))
        .setFooter(`Всего команд: ${client.commands.size} | Мэлоди (Nightly)`, client.user.avatarURL([format='jpg']));

        message.channel.send(embed)
    }
};
