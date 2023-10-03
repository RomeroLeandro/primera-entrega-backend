const Ticket = require("../dao/model/ticketModel");

async function createTicket(code, amount, purcharser) {
    try {
        const ticket = new Ticket({
            code,
            amount,
            purcharser
        });
        const ticketCreated = await ticket.save();
        return ticketCreated;
    }
    catch (error) {
        throw error;
    }
}

module.exports = {
    createTicket
}