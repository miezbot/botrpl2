	const Discord = require("discord.js");
	const botconfig = require("./botconfig.json");
	const fs = require("fs");
	let bot = new Discord.Client();
	bot.commands = new Discord.Collection();
	const coins = require("./coins.json");
	const xp = require("./xp.json");
	const db = require('quick.db');
   const express = require('express');
  const app = express()
  const http = require('http');

	bot.on('ready', () => {
	console.log("Loading...");
	setTimeout(function(){
	console.log("Bot has been loaded completely.");
	}, 1000);
	setTimeout(function(){
	console.log(`Logged in as ${bot.user.tag}`);
	}, 2000);
	bot.user.setActivity(`rplhelp | ${bot.guilds.size} guilds | ${bot.users.size} users`, {type: "PLAYING"});
        setInterval(() => {
        }, 1800000);
	})

	fs.readdir("./commands/", (err, files) => {
	if(err) console.log(err);
	let jsfile = files.filter(f => f.split(".").pop() === "js");
	if(jsfile.length <= 0){
	console.log("Couldn't find commands.");
	return;
	}


	jsfile.forEach((f, i) =>{
	let props = require(`./commands/${f}`);
	console.log(`${f} loaded!`);
	bot.commands.set(props.help.name, props);
	});
	});
	bot.on("message", async message => {
        if(message.content.startsWith() === "<@452872967102136373>"){
        let embed = new Discord.RichEmbed()
       .setTitle("RPL AI")
       .addField("Prefix", "`rpl`", true)
       .addField("Help", "`rplhelp`", true)
       .setThumbnail(bot.user.displayAvatarURL)
       .setColor("YELLOW");
        message.channel.send(embed);
        }
	   else if(message.content.startsWith('@312916765078192139>')){
	    message.delete();
        let embed = new Discord.RichEmbed()
        .setTitle(":speak_no_evil: Sshhh....")
	     .setDescription(`Don\'t ping him! He can demote you!! **${message.author.tag}**`)
	.setColor(botconfig.white);
	message.channel.send(embed)
	}
    
	let prefix = botconfig.prefix;
	let args = message.content.slice(prefix.length).trim().split(" ");
	let cmd = args.shift().toLowerCase();
	if(message.author.bot) return undefined;;
	if(!message.content.startsWith(prefix)) return undefined;


	try {
	let commandFile = require(`./commands/${cmd}.js`);
	commandFile.run(bot, message, args);
	if(!commandFile) return message.channel.send("No command found with that name.");
	} catch (e) { console.log(e) }

	if(!coins[message.author.id]){
	coins[message.author.id] = {
	coins: 0
	};
	}

	let coinAmt = Math.floor(Math.random() * 15) + 14;
	let baseAmt = Math.floor(Math.random() * 15) + 14;
	console.log(`${coinAmt} ; ${baseAmt}`);

	if(coinAmt === baseAmt){
	coins[message.author.id] = {
	coins: coins[message.author.id].coins + coinAmt
	};
	fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
	if (err) console.log(err)
	});

	}

	let xpAdd = Math.floor(Math.random() * 15) + 14;
	console.log(xpAdd);

	if(!xp[message.author.id]){
	xp[message.author.id] = {
	xp: 0,
	level: 1
	};
	}


	let curxp = xp[message.author.id].xp;
	let curlvl = xp[message.author.id].level;
	let nxtLvl = xp[message.author.id].level * 300;
	xp[message.author.id].xp =  curxp + xpAdd;
	if(nxtLvl <= xp[message.author.id].xp){
	xp[message.author.id].level = curlvl + 1;

	}
	fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
	if(err) console.log(err)
	});


	});
	bot.on('guildMemberAdd', member => {
	const members = member.guild.memberCount;
	const channel = member.guild.channels.find('name', 'member-log');
	if (!channel) return;
	
       let Role = member.guild.roles.find(`name`, "Bots");
       if(member.user.bot){
	member.addRole(Role.id)
       }else{
      let role = member.guild.roles.find(`name`, "User");
	member.addRole(role.id)
       }
 
	let Embed = new Discord.RichEmbed()
	.setFooter("User Joined")
	.setColor("#cde246")    
	.setAuthor(`${member.displayName} has joined ${member.guild.name}`, member.user.displayAvatarURL)
	.setTimestamp()
	channel.send(Embed);
	});
	bot.on('guildMemberRemove', member => {
	const channel = member.guild.channels.find(`name`, 'member-log');
	if(!channel) return; 
	let Embed = new Discord.RichEmbed()
	.setColor("#e26346")
	.setAuthor(`${member.displayName}, has left ${member.guild.name}.`, member.user.displayAvatarURL)
	.setTimestamp()
	.setFooter("User Left")
	channel.send(Embed);
	});

	bot.on('guildCreate', guild => {
        if(guild.id !== '603250795374182401') return;
	let joinLogs = guild.channels.find(`name`, 'logs');
        const embed = new Discord.RichEmbed()
        .setColor("#cde246")
        .setAuthor(`Joined ${guild.name}`)
        .setThumbnail(guild.iconURL)
        .addField("Owner", guild.owner)
        .addField("ID", guild.id, true)
        .addField("Users", guild.memberCount, true)
        .addField("Channels", guild.channels.size, true)
         joinLogs.send(embed);
	});

app.get("/", (request, response) => {
console.log(Date.now() + " Ping Received");
response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

	bot.login(process.env.TOKEN);
