const { MessageButton } = require("discord-buttons");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "cp",
    description: "Проигрываем музыку)",
    aliases: [],
    public: false,
    inVoiceChannel: true,
    async execute(client, message, args, config) { 
        let skipsng = new MessageButton().setStyle("blurple").setID("skipsong").setEmoji("853167047965540354");
        let playpausebtn = new MessageButton().setStyle("blurple").setID("playpausesong").setEmoji("853167047965540354");
        let stopbtn = new MessageButton().setStyle("blurple").setID("stop").setEmoji("853167047965540354");


        message.channel.send("Панель управления (Beta)", {buttons: [skipsng, playpausebtn, stopbtn]});
    }
};