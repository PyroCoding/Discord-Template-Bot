 // init project
// ======= All Requirements =======
const express = require('express');
const fs = require('fs');
let app = express();
// ================================

// ======= Bot Requirements =======
const Discord = require("discord.js");
const botconfig = require("./botsettings.json");
const bot = new Discord.Client();
// ================================

// ======= OTHER Requirements =======

bot.commands = new Discord.Collection();  // creates a new collection
fs.readdir('./commands/', (err, files) => {  // Reads the commands folder
 
  if(err) console.error(err);
  
  // filter() creates a new array called commandfiles. split() takes the values and sorts them into 2 different values (e.g. "clear", "js"). 
  // The pop() takes the last value in the array (e.g. "js") and it puts it into its own temp array. Then it checks if it is === the same value (===).
  let commandfiles = files.filter(f => f.split('.').pop() === "js");
  
  if(commandfiles.length <= 0) {  // Check if there is no files found in the command sub-folder
      console.log("No command files found.");  //T ells if there was no files found in the command sub-folder
      return;  // Stops if the "IF" command was triggered. But continues if it wasent
     } 
    -
    console.log(`Found ${commandfiles.length}, commands.`);  // Tells how many files found
  
    commandfiles.forEach((f,i) => {  // For each file found do this
    
    let pcmd = require(`./commands/${f}`) // Creates a new var/let that list the files
    bot.commands.set(pcmd.help.name,pcmd);
    }); 
});



bot.on('ready', async () => {
 // Name, Id, member count, invite link
  let serveramount =  'Currenly connected to: ' + bot.guilds.size;
  bot.guilds.size <= 1 ? console.log(serveramount + ' server.') : console.log(serveramount + ' servers.');
    bot.user.setStatus('available');
    bot.user.setPresence({game: {name: 'Change Me'}}); // IMPORTANT   IMPORTANT   IMPORTANT   IMPORTANT   IMPORTANT   IMPORTANT   
  bot.guilds.forEach((server) => {
    
    console.log(`Server Name: ${server.name} | Server Id: ${server.id} | Members: ${server.members.filter(member => !member.user.bot).size} | Owner: ${server.owner.user.username}#${server.owner.user.discriminator}`);
  });
  
  
}); 

// Command listener
bot.on('message', async (message) => {
 
  if(message.author.bot)return;
  if(message.channel.type === "dm")return;
  
  const prefix = botconfig.prefix;
  let messageArray = message.content.split(/\s+/g);
  let cmd = messageArray[0]; // Command
  let args = messageArray.slice(1);
  if(!cmd.startsWith(prefix))return;
  
  let command = bot.commands.get(cmd.slice(prefix.length))
  if(command) command.run(bot, message, args);
  
});
          

bot.login(process.env.BOT_TOKEN);  // Logs the bot in

app.use(express.static('public'));
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
