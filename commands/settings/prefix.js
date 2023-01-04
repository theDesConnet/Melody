module.exports = {
    name: 'prefix',
    description: 'Сменить префикс боту.',
    aliases: ["set-prefix"],
    public: true,
    async execute(client, message, args, config) {
        if(!message.member.hasPermission("ADMINISTRATOR")) return errorembed('> ***К сожелению у вас нету прав "Администратор". Я не могу исполнить вашу команду.***')
        if(!args[0]) return errorembed('> ***Укажите желаемый префикс***')
        if(args[0].length > 5) return errorembed('> ***Я не могу поставить префикс в длинную больше чем 5 символов***')

        let data = await Servercfg.findOne({ guildID: message.guild.id })

        let embed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setDescription(`**Вы успешно сменили префикс бота на** \`${args[0]}\``)
        .setFooter(`${message.guild.name} | Мэлоди (Nightly)`, client.user.avatarURL([format='jpg']))
        message.channel.send(embed)

        data.prefix = args[0]; data.save();
    }
  }