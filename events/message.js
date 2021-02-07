if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const prefix = "!";

module.exports = (client, message) => {

  if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  
  if (!client.commands.has(command)) return;

  try {
	  client.commands.get(command).execute(message, args);
  } catch (error) {
	  console.error(error);
	  message.reply('Hubo un problema al ejecutar el comando.');
  }
    
};