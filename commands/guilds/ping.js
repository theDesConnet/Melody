module.exports = {
    name: 'ping',
    description: 'Просмотреть информацию о задержки бота',
    aliases: [],
    public: true,
    async execute(bot, message, args, config) {
      let a = new Discord.MessageEmbed()
      .setDescription(`:heart:Сердцебиение клиента: ${Date.now() - message.createdTimestamp}мс\n:satellite:Ответ api Discord: ${bot.ws.ping | 0 }мс`)
      .setColor('GREEN')
      .setFooter(`${message.guild.name} | Мэлоди`, bot.user.avatarURL([format='jpg']))
      message.channel.send(a)
    }
  }
