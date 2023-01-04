const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "watchtogether",
    description: "что-то новое",
    aliases: [],
    public: true,
    inVoiceChannel: true,
    async execute(client, message, args, config) {
        const { DiscordTogether } = require('discord-together');
        client.discordTogether = new DiscordTogether(client);

        client.discordTogether.createTogetherCode(message.member.voice.channelID, 'youtube').then(async invite => {
            let embed = new MessageEmbed().setDescription(`Давайте посмотрим ютуб :3\n[Присоединится!](${invite.code})`).setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true })).setFooter(`${message.guild.name} | Мэлоди (Nightly)`, client.user.avatarURL('jpg')).setColor(0xC30AC9)
            return message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 120000 })
            });
        });
    }
};