module.exports = {
    name: 'kick',
    description: 'Выгнать пользователя',
    aliases: [],
    public: true,
    async execute(bot, message, args, config) {
        let User = message.guild.member(message.mentions.users.first());
        let kickReason = args.join(" ").slice(21);
        let userstag = User.tag;

        if(!message.member.hasPermission("KICK_MEMBERS")) return errorembed('> ***К сожелению у вас нету прав \n\n\n"Выгонять участников"\n\n\n. Я не могу исполнить вашу команду.***')
        if(!User) return errorembed('> ***Пользователь не указан***')
        if(User.id == bot.user.id) return errorembed("> Эй! Ты чего! Я не могу кикнуть сама себя -_-")
        if(User.id == message.author.id) return errorembed("Ты наверное бог если пытаешся кикнуть сам(а) себя o_0")
        if(kickReason.length > 100) return errorembed('> ***Причина больше чем 100 символов***')

        let embed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setAuthor("Кик")
        .setDescription(`**Вы успешно выгнали пользователя** \`${userstag}\`\nПричина: ***${kickReason || "Без причины"}***\n\nВыгнал: **${message.author.tag}**`)
        .setFooter(`${message.guild.name} | Мэлоди`, bot.user.avatarURL([format='jpg']))

        User.kick({reason: kickReason})
        .then((r) => {
            message.channel.send(embed)
        })
        .catch((err) => {
            if(err == "DiscordAPIError: Missing Permissions"){
                errorembed(`> ***Недостаточно прав или моя роль стоит ниже роли участника которого вы хотите забанить***`);
            }
            else{
                errorembed(`> ***${err}***`);
            }
        });
    }
  }
