const Discord = require('discord.js');

module.exports = (client, message) => {

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
let gcEmbed = new Discord.RichEmbed()
 .setTitle("Thanks For Adding Me")
 .setColor("#0x3dfbff")
 .setTimestamp()
 .setDescription("***Please Note:** Ninja Bot requires various channels to complete proper setup")
 .addField("Setup Help", "``nb/setup`` Shows you how to setup Ninja Bot") 
 .setFooter("TRON Bot")
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
 });
}
