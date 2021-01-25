const fs = require("fs");

module.exports = {
    name: "help",
    description:"Lista de comandos del bot.",
    execute(message,args){

        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
  
        var cadena = "";

        for (const file of commandFiles) {
        const command = require(`./${file}`);
    
        cadena += `\n- !${command.name} | ${command.description}`;

        }
        message.reply(
            "Hola cocu estos son los comandos:\n" + cadena)
    }
}