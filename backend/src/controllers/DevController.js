const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray')
//index, show, store, update, destroy

module.exports = {
    async index(request,response){
       
        const devs = await Dev.find();

        return response.json(devs);
        
    },

    async store(request, response){

        const { github_username, techs, latitude, longitude } = request.body;
        
        let dev = await Dev.findOne({ github_username });

        if(!dev){

            const apiResponse =  await axios.get(`https://api.github.com/users/${github_username}`);
        
            console.log(apiResponse.data)
        
            const {name = login,  avatar_url, bio } = apiResponse.data
        
            const techsArrays =  parseStringAsArray(techs);
            
            const location = {
                type: "Point",
                coordinates: [longitude, latitude]
            };

            dev = await Dev.create({
                github_username: github_username,
                name,
                avatar_url,
                bio,
                techs: techsArrays,
                location
            })
        }

       
    
     
        return response.json(dev);
        
    },

    async exclude(request, response) {
        const dev = await Dev.findById(request.params.id);
        const [latitude, longitude] = dev.location.coordinates;
    
        const sendSocketMessageTo = findConnections(
          { latitude, longitude },
          dev.techs
        );
        sendMessage(sendSocketMessageTo, "exclude-dev", dev);
    
        await Dev.deleteOne({ _id: request.params.id });
        return response.json({ ok: true });
    }
    
}
