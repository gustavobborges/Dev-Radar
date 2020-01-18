const axios = require('axios'); 
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    
    async index( request, response) {
        const devs = await Dev.find();
        const parseStringAsArray = require('../utils/parseStringAsArray')

        return response.json(devs);
    },
    
    async store(request, response) {         //async é pq vai demorar

            const { github_username, techs, latitude, longitude } = request.body;

            let dev = await Dev.findOne({ github_username });

            if (!dev) {
                const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
                // o await ira fazer aguardar a busca o perfil do git... 
                  
                    const { name = login, avatar_url, bio } = apiResponse.data;
                
                    const techsArray = parseStringAsArray(techs);
                //o split dividirá o array sempre q tiver a virgula.... o tech é para inserir o trim, que remove espaços antes e dps de uma string
                
                    const location = {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    };
                
                    dev = await Dev.create({
                        github_username,
                        name,
                        avatar_url,
                        bio,
                        techs: techsArray,
                        location,
                    })
            }
            
            
            return response.json(dev);
        
    }
};;