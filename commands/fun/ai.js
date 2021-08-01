module.exports = {
    name: "ai",
    description: "Слабенький и глупенький ИИ",
    aliases: ["h"],
    public: true,
    async execute(bot, message, args, config) {
        let cleverbot = require('cleverbot-free');

        let text = args.join(" ");
        if (!text) return message.channel.send("Нет, ну так не интересно бяка s( ^ ‸ ^)-p \n Напиши мне что нибудь s( ^ ‿ ^)-b")
    
        cleverbot(text).then(reply => {
            message.channel.send(reply);
        });
    }
};
