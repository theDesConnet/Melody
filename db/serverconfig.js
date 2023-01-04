const config = require('../jsons/config.json')
const schema = mongoose.Schema({
    guildID: String,
    prefix: { type: String, default: config.prefix },
    defaultautoplay: {type: String, default: config.defaultap},
    color: {type: String, default: config.color}
});
module.exports = mongoose.model("serverconfig", schema)