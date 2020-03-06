//////////////////////////////***REQUIRED NODE MODULES***////////////////////////////////////////////////
const Discord = require("discord.js");
const Music = require('discord.js-musicbot-addon');
const Enmap = require("enmap");
const fs = require("fs");
const moment = require("moment"); 
const snekfetch = require('snekfetch');
const talkedRecently = new Set();
const star = new Discord.Client();
const starLog = console.log;
const config = require('./data/config.json');
const embeds = require('./data/embeds.json');
const chalk = require('chalk');
const Canvas = require('canvas');
const dbots = require('superagent')
const timers = require('timers')
const activity1 = config.activity1
const type1 = config.type1
const activity2 = config.activity2
const type2 = config.type2
const activity3 = config.activity3
const type3 = config.type3
const type4 = config.type4
const activity4 = config.activity4
const time1 = config.activitytime
const prefix = process.env.PREFIX;

//////////////////////////////***MESSAGE DELETE FUNCTIONS***/////////////////////////////////////////////
/*This event allows any message that the bot reacts to with the emoji provided,
to be deleted when the reaction is pressed by ANY user (Not admin only)*/
star.on('messageReactionAdd', (reaction, user) => {
    if (user.bot) return;
    if (reaction.emoji.name === "🆗") {
    reaction.message.delete();
    }
})

//////////////////////////////***EVENT COLLECTION FUNCTION***////////////////////////////////////////////////
//Allows the bot to log and show events (Joining New Servers)
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    star.on(eventName, event.bind(null, star));
  });
});

star.commands = new Enmap();
star.aliases = new Enmap();

//Stops the bot from responding to other bots.
star.on('message', message => {
  if(message.author.bot) return;
})

//////////////////////////////***DEFINE COMMANDS FUNCTION***////////////////////////////////////////////////
const modules = ['Help', 'System']; // This will be the list of the names of all modules (folder) your bot oown

modules.forEach(c => {
fs.readdir(`./src/commands/${c}/`, (err, files) => { // Here we go through all folders (modules)
 if (err) throw err; // If there is error, throw an error in the console
  starLog(`[Commandlogs] Loaded ${files.length} commands of module ${c}`); // When commands of a module are successfully loaded, you can see it in the console
   files.forEach(f => { // Now we go through all files of a folder (module)
    const props = require(`./src/commands/${c}/${f}`); // Location of the current command file
     star.commands.set(props.help.name, props); // Now we add the commmand in the client.commands Collection which we defined in previous code
      props.conf.aliases.forEach(alias => { // It could be that the command has aliases, so we go through them too
       star.aliases.set(alias, props.help.name); // If we find one, we add it to the client.aliases Collection
       });
    });
 });

});
star.login(process.env.BOT_TOKEN); //process.env.BOT_TOKEN Allows the token to be defined and set via the bots database to ensure it is never public!

