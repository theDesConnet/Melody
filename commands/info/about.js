const { MessageButton } = require("discord-buttons");
const { MessageEmbed } = require("discord.js");
const botinfo = require('../../jsons/botinfo.json');

module.exports = {
    name: "about",
    description: "о боте",
    aliases: [],
    public: true,
    inVoiceChannel: false,
    async execute(client, message, args, config) {
        let msgembd = new MessageEmbed().setThumbnail(client.user.displayAvatarURL(dynamic = true)).setTitle("Немного про меня").addField("Меня зовут:", client.user.username,false).addField("Моя версия:",botinfo.version).setDescription("P.s Я еще нахожусь в бета-тесте").setFooter('Если есть пожелания то пишите моему автору DesConnet#6666')
        message.channel.send(msgembd);
    }
};