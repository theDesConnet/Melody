module.exports = {
    name: "ai",
    description: "Даже не спрашивай",
    aliases: [],
    public: true,
    inVoiceChannel: false,
    async execute(client, message, args, config) {
        let cleverbot = require('cleverbot-free');

        let text = args.join(" ");
        if (!text) return message.channel.send("Нет, ну так не интересно бяка s( ^ ‸ ^)-p \n Напиши мне что нибудь s( ^ ‿ ^)-b")
    
        cleverbot(text).then(reply => {
            message.channel.send(reply);
        })
    }
};