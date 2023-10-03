const {Router} = require('express');
const {createTicketController} = require('../controllers/ticketController');

const ticketRouter = Router();

ticketRouter.post('/', createTicketController);