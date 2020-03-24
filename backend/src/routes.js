const express = require('express');
const ongController = require('./controllers/ongController');
const incidentController = require('./controllers/incidentController');
const sessionController = require('./controllers/sessionController');


const routes = express.Router();
routes.post('/sessions', sessionController.create);

routes.get('/ongs', ongController.index);
routes.post('/ongs', ongController.create);

routes.get('/incidents/query', incidentController.query);
routes.get('/incidents', incidentController.index);
routes.post('/incidents', incidentController.create);
routes.delete('/incidents/:id', incidentController.delete);

module.exports = routes;