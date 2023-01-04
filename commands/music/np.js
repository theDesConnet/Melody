module.exports = {
    name: "np",
    description: "Текущий трек",
    aliases: ["nowplaying"],
    public: true,
    inVoiceChannel: true,
    async execute(client, message, args, config) {
        let queue = distube.getQueue(message);

        if (!queue) return errorembed("Плейлист пустой!").then(msg => msg.delete({ timeout: 5000 }));

        let currentsong = queue.songs[0];

        let embed = new Discord.MessageEmbed()
            .setColor(0xC30AC9)
            .setTitle("Текущий трек:")
            .setThumbnail(currentsong.thumbnail)
            .addField("Название:",currentsong.name, false)
            .addField("Количество просмотров:",currentsong.views,true)
            .addField("Количество лайков:",currentsong.likes,true)
            .addField("Количество дизлайов:",currentsong.dislikes,true)
            .addField("Длительность:",currentsong.formattedDuration,false)
            .addField("Предложил:",currentsong.user,false)
            .setDescription(`[Ссылка на трек](${currentsong.url})`)
            .setFooter(`${message.guild.name} | Мэлоди (Nightly)`, client.user.avatarURL('jpg'))

        message.channel.send(embed);
    }
};