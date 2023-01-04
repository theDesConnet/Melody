const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "help",
    description: "помощь с командами",
    aliases: [],
    public: true,
    inVoiceChannel: false,
    async execute(client, message, args, config) {
        let serverconfig = await Servercfg.findOne({ guildID: message.guild.id });

        function list(cat, cname) {
            return `**${cname}**: ${client.commands.filter(cmd => cmd.category == cat).map(cmd => `\`${cmd.name}\``).join(", ")}`;
        }


        let embed = new Discord.MessageEmbed()
        .setColor("blue")
        .setTitle(`Список команд | Текущий префикс: \`\`\`${serverconfig.prefix}\`\`\``)
        .setDescription(`${list("fun", "Развлечения")}\n${list("games","Игры")}\n${list("info", "Информация")}\n${list("music","Музыка")}\n${list("settings","Настройки")}`)
        .setThumbnail(client.user.avatarURL([format = 'jpg']))
        .setFooter(`Всего команд: ${client.commands.size} | Мэлоди (Nightly)`, client.user.avatarURL([format='jpg']));

        message.channel.send(embed)
    }
};