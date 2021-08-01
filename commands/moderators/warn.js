module.exports = {
    name: 'warn',
    description: 'Предупреждение пользователю',
    aliases: [],
    public: true,
    async execute(bot, message, args, config) {
        let member = message.guild.member(message.mentions.users.first());
        let kickReason = args.join(" ").slice(21);
        let data = await User.findOne({ guildID: message.guild.id, userID: member.user.id })
        if(!data) return bot.nodb(member.user)
        let dataGuild = await Guild.findOne({ guildID: message.guild.id})

        if(!message.member.hasPermission("KICK_MEMBERS")) return errorembed('> ***К сожелению у вас нету прав \`\`\`"Выгонять участников"\`\`\`. Я не могу исполнить вашу команду.***')
        if(!member) return errorembed('> ***Пользователь не указан***')
        if(member.id == bot.user.id) return errorembed("> Эй! Ты чего! Я не могу предупредить сама себя -_-")
        if(member.id == message.author.id) return errorembed("Ты наверное бог если пытаешся предупредить сам(а) себя o_0")
        if(kickReason.length > 100) return errorembed('> ***Причина больше чем 100 символов***')

        let embed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setAuthor("Warn")
        .setDescription(`**Вы успешно предупредили пользователя** \`${member.tag}\`\nПричина: ***${kickReason || "Без причины"}***\n\nПредупредил: **${message.author.tag}**\n\nПредупреждений: ${data.warns}/${dataGuild.warnlimit}`)
        .setFooter(`${message.guild.name} | Мэлоди`, bot.user.avatarURL([format='jpg']))
        data.warn += 1;

          if(data.warn >= dataGuild.warnlimit){
            if(member.kickable == false){
              message.reply(`Я не могу кикнуть данного пользователя из за нехватки прав. Предупреждения были обнулены.`); data.warn = 0;
            }else{
              message.guild.member(member).kick(reason).then(x => {
                message.reply(`${member.user.tag} был кикнут за \`${reason}\``)
                data.warn = 0;
              })
            }
        data.save();
        message.channel.send(embed);
    }
  }
}
