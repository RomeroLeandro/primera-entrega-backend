const {createTicket} = require("../services/ticketService");

async function createTicketController(req, res) {
    try {
        const {code, amount, purcharser} = req.body;
        const ticket = await createTicket(code, amount, purcharser);
        res.status(201).json(ticket);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    createTicketController
}