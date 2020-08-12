const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
  let embed = new Discord.RichEmbed()
    .setTitle("Categories")
    .setAuthor("Command List", bot.user.displayAvatarURL)    
  .setDescription(`
**userstats** - Untuk melihat status account discord kamu!
**say** - Membuat bot ini berbicara
**ping** - Melihat status ping bot!
**poll** - Untuk melakukan voting!
**serverstats** - Melihat status server yang tersedia!
**manga** - Melihat manga yang kamu suka/favorit kan!
**meme** - Melihat meme yang lucu menggunakan API!
**invite** - Untuk mengundang bot keserver kamu!
**cat** - Ada gambar gambar kucing yang lucu loh! 
**dog** - Ada juga gambar anjing yang lucu!
**avatar** - Kamu dapat melihat avatar/photo profile yang kamu gunakan atau teman kamu gunakan!
**aib** - Melihat aib-aib dari kelas kami! hahahaha 
**weather** - Mengetahui kabar cuaca!
`)
    message.channel.send(embed);
}
module.exports.help = {
    name: "help"
}
