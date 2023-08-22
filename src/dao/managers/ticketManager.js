import { ticketModel } from "../models/ticket.model.js";
import { productModel } from "../models/product.model.js";

export default class TicketManager {
    productModel
    ticketModel
    constructor () {
        this.ticketModel = ticketModel;
        this.productModel = productModel;
    }
    // Metodos
    async newOrder (newTicket) {
        try {
            const ticket = await this.ticketModel.create(newTicket);
            return ticket;
        } catch (error) {
            console.error('Error al crear el pedido:', error);
            throw error; 
        }
    }
}