const fetch = require("node-fetch");
const fs = require("fs");

module.exports = {

    async postData(url = "",data={}) {

        const response = await fetch(url,{
      
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
            
        });
        
        return response.json();
      },
      
      async getData(url = "",data={}) {
        const response = await fetch(url,{
            method:"GET",
            headers: data
      })
        return response.json();
      },
      
      async downloadImage(url="") {
        const response = await fetch(url);
        const buffer = await response.buffer();
        fs.writeFile(`./images/image.jpg`, buffer, () => 
          console.log('Thumbnail descargado con exito.'));
      },
    
};