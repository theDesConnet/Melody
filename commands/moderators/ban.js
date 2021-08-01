module.exports = {
    name: 'ban',
    description: 'Забанить пользователя',
    aliases: [],
    public: true,
    async execute(bot, message, args, config) {
        let User = message.guild.member(message.mentions.users.first());
        let banReason = args.join(" ").slice(21);

        if(!message.member.hasPermission("BAN_MEMBERS")) return errorembed('> ***К сожелению у вас нету прав \n\n\n"Банить участников"\n\n\n. Я не могу исполнить вашу команду.***');
        if(!User) return errorembed('> ***Пользователь не указан***');
        if(User.id == bot.user.id) return errorembed("> Эй! Ты чего! Я не могу забанить сама себя -_-");
        if(User.id == message.author.id) return errorembed("Ты наверное бог если пытаешся забанить сам себя o_0");
        if(banReason.length > 100) return errorembed('> ***Причина больше чем 100 символов***');

        let embed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setAuthor("Бан")
        .setDescription(`**Вы успешно забанили пользователя** \`${User.tag}\`\nПричина: ***${banReason || "Без причины"}***\n\nЗабанил: **${message.author.tag}**`)
        .setFooter(`${message.guild.name} | Мэлоди`, bot.user.avatarURL([format='jpg']))

        User.ban({reason: banReason})
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
