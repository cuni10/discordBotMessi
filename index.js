if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client();


client.on("ready",()=>{

    client.user.setPresence( {
      activity: {
          name: `!help | hola cocu`,
        type: "LISTENING"
      },
      status: "online"
    });

    console.log("Tamo on pa " + client.user.tag);
});

fs.readdir('./events/', (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
      if (!file.endsWith('.js')) return;
      const evt = require(`./events/${file}`);
      let evtName = file.split('.')[0];
      console.log(`Evento cargado '${evtName}'`);
      client.on(evtName, evt.bind(null, client));
    });
  });

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
  
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
    
      
  client.commands.set(command.name, command);
  console.log(`Comando '${command.name}' fue cargado correcamente`);
}

  

client.login(process.env.TOKEN_DISCORD);