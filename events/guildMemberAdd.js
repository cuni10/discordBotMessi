const Discord = require('discord.js');

require('dotenv').config();
const fs = require('fs');

module.exports = (client, guildMemberAdd) => {

    let role = guildMemberAdd.guild.roles.cache.find(role => role.name === "Changos") || guildMemberAdd.guild.roles.fetch('796894992278355968');

    if(!role){
        console.log("No existe el rol.");
    }else{
        guildMemberAdd.roles.add(role);
        console.log(`Se le agrego el rol "Changos" a "${guildMemberAdd.displayName}".`);
    }
    
}