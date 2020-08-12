const fs = require("fs");
const Discord = require('discord.js')

exports.run = (client, message, args) => {
  message.delete()
let copypastas = JSON.parse(fs.readFileSync("./aibrpl.json", "utf8"));
    args = args.join(" ");
  var embed = new Discord.RichEmbed()
  .setTitle("Random Aib RPL 2")
  .setImage(`${copypastas[Math.floor(Math.random() * copypastas.length)]}`,'\u200b')
    message.channel.send(embed);
}
//${copypastas[Math.floor(Math.random() * copypastas.length)]}
module.exports.help = {
	name: "aib"
}