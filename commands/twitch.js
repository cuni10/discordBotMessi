const apiFetch = require("../misc/apiFetch");
const Discord = require('discord.js');

module.exports = {

    name:"twitch",
    description:"Busca stramer en vivo.",
    execute(message,args) {

        var info = {
            access_token:"",
            id:"",
            name:"",
            is_live: false,
            thumbnail_user: "",
            title:"",
            game_id:"",
            game_name:"",
            thumbnail_game:"",
            thumbnail_stream:"",
          };

        var usuarioTwitch = message.content.slice(8,message.content.length);

        async function peticion() {

            let response;
        
            try{
                response = await apiFetch.postData("https://id.twitch.tv/oauth2/token",{
                client_id: process.env.ID_TWITCH,
                client_secret: process.env.TOKEN_TWITCH,
                grant_type: "client_credentials"
                });
            }catch(e){
                console.log("Error al obtener autenticacion." + e);
                return;
            }
            info.access_token = response.access_token;
            console.log("Access Token: " + info.access_token);
        
            let response2;
        
            try{
                response2 = await apiFetch.getData(`https://api.twitch.tv/helix/search/channels?query=${usuarioTwitch}&first=1`,{
                    Authorization: "Bearer " + info.access_token,
                    "Client-ID": process.env.ID_TWITCH,
                });
            }catch(e){
                console.log("Error al recuperar datos etapa 1. " + e);
                return;
            }
            
        
            info.id = response2.data[0].id;
            info.title = response2.data[0].title;
            info.is_live = response2.data[0].is_live;
            info.profile = response2.data[0].thumbnail_url;
            info.name = response2.data[0].display_name;
            info.game_id = response2.data[0].game_id;
            info.thumbnail_user = response2.data[0].thumbnail_url;
            console.log("Streamer: "+info.name + " - " + info.id);
            console.log("Live: " + info.is_live);
        
            if(info.is_live === false) return;
        
            let response3;
            try {
                response3 = await apiFetch.getData(`https://api.twitch.tv/helix/games?id=${info.game_id}`,{
                    Authorization: "Bearer " + info.access_token,
                    "Client-ID": process.env.ID_TWITCH,
                });
            }catch(e){
                console.log("Error al recuperar datos etapa 2. " + e);
                return;
            }
            
            info.game_name = response3.data[0].name;
            info.thumbnail_game = response3.data[0].box_art_url;
            console.log("Game: " +info.game_name);
        
            let response4;
        
            try{
                response4 = await apiFetch.getData(`https://api.twitch.tv/helix/streams?user_id=${info.id}`,{
                    Authorization: "Bearer " + info.access_token,
                    "Client-ID": process.env.ID_TWITCH,
                }); 
            }catch(e){
                console.log("Error al recuperar datos etapa 3. " + e);
                return;
            }
        
            info.thumbnail_stream = response4.data[0].thumbnail_url.replace("{width}","640").replace("{height}","360");;
        
            console.log("API consultada con exito.");
        
            
            await apiFetch.downloadImage(info.thumbnail_stream);

            var ContentEmbed = new Discord.MessageEmbed();
            
            ContentEmbed.attachFiles("./images/image.jpg");
            ContentEmbed.attachFiles("./images/twitch.png");
            ContentEmbed.setColor("#6441a5");
            ContentEmbed.setTitle(`${info.name} ESTA EN VIVO`.toUpperCase());
            ContentEmbed.setDescription(`${info.title}`);
            ContentEmbed.setImage("attachment://image.jpg");
            ContentEmbed.setFooter(`https://www.twitch.tv/${info.name}`,"attachment://twitch.png");
            ContentEmbed.setURL(`https://www.twitch.tv/${info.name}`);
            ContentEmbed.setAuthor(info.name, info.thumbnail_user, `https://www.twitch.tv/${info.name}`);
            ContentEmbed.addFields({name:"Game:",value:info.game_name});
        
            await message.channel.send(ContentEmbed);
            console.log("Embebido fue posteado.");
        }
      
        peticion();
    }
};