
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');



module.exports = {
    async index(request,response){
        //buscaar todos os devs num raio 10km
        //filtrar por tecnologia
        const { latitude, longitude, techs} = request.query;



        const techsArray = parseStringAsArray(techs)
        console.log(techsArray)
        const devs = await Dev.find({
            techs: {
                $in: techsArray
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [latitude,longitude]
                    },
                    $maxDistance: 10000
                }
            }
        })

        console.log(request.query)
        
        return response.json({ devs })
     
    }, 

    async update(){

    },

    async destroy(){
        
    }
}