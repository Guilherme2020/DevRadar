const { Router } = require('express');

const DevController = require('./controllers/DevController');

const SearchController = require('./controllers/SearchController');

const routes = Router();

//Métodos http: GET, POST, PUT, DELETE


//tipos de parâmetros

//query params: request.query (filtros, ordenação, paginação)

//route params:  request.params (identificar um recurso na alteração ou remoção)

//body: request.body (dados para criação ou alteração de um registro)




routes.get('/devs', DevController.index )

routes.post('/devs', DevController.store);

routes.get('/search', SearchController.index)

module.exports = routes;
