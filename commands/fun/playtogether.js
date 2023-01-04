const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "playtogether",
    description: "несколько игр вместе с друзьями",
    aliases: [],
    public: true,
    inVoiceChannel: true,
    async execute(client, message, args, config) {
        const games = ['poker','chess','betrayal','fishing','Poker','Chess','Betrayal','Fishing']
        const input = args.join(" ")
        const { DiscordTogether } = require('discord-together');
        client.discordTogether = new DiscordTogether(client);

        let embedsel = new MessageEmbed()
            .setTitle("Доступные игры")
            .setDescription("Poker\nChess\nBetrayal\nFishing")
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setFooter(`${message.guild.name} | Мэлоди (Nightly)`, client.user.avatarURL('jpg'))
            .setColor(0xC30AC9)

        if (!args.join()) return message.channel.send(embedsel)

        if (games.includes(input)){
            client.discordTogether.createTogetherCode(message.member.voice.channelID, input).then(async invite => {
                let embed = new MessageEmbed().setDescription(`Давайте поиграем в ${input}\n[Присоединится!](${invite.code})`).setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true })).setFooter(`${message.guild.name} | Мэлоди (Nightly)`, client.user.avatarURL('jpg')).setColor(0xC30AC9)
                return message.channel.send(embed).then(msg => {
                    msg.delete({ timeout: 120000 })
                });
            });
        }
        else return errorembed("Игра указана неверно")
    }
};