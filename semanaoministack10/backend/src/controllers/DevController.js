const axios = require('axios'); 
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const {findConnections} = require('../webSocket');

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
                         
                    const { name = login, avatar_url, bio } = apiResponse.data;
                
                    const techsArray = parseStringAsArray(techs);
                     
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

                    const sendSocketMessageTo = findConnections(
                        { latitude, longitude },
                        techsArray,
                    )
                }
                        
            return response.json(dev);
        
    }
};;