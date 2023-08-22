import ProductManager from "../dao/managers/productManager.js";
import userModel from "../dao/models/user.model.js";
import TicketManager from "../dao/managers/ticketManager.js";

const productDao = new ProductManager();

export class TicketService {
    constructor() {
        this.dao = new TicketManager();
        this.user = userModel;
    }
    async create(carrito , productoFinal) {
        try {
            let usuario = await this.user.findOne({ cart: carrito._id });
            if (!usuario) {
                throw new Error("Usuario no encontrado");
            }
            if (productoFinal.length === 0) {
                throw new Error("Productos fuera de stock");
            }
            const usuarioEmail = usuario.email;
            const code = this.generateUniqueCode();
            const newTicket = {
                code: code,
                purchaser: usuarioEmail,
                products: productoFinal,
                amount: await this.calculateTotal(productoFinal),
            };
            return this.dao.newOrder(newTicket);
        } catch (error) {
            console.error('Error al crear el ticket:', error);
            throw error;
        }
    }
    async calculateTotal(products) {
        try {
            const productos = products;
            let totalAmount = 0;
            for (const productInfo of productos) {
                const product = await productDao.getProductById(productInfo.product);
                const price = product.price;
                const amount = price * productInfo.quantity;
                totalAmount += amount;
            }
            return totalAmount;
        } catch (error) {
            console.error('Error al calcular el total:', error);
            throw error;
        }
    }
    generateUniqueCode() {
        return Math.random().toString(36).slice(2);
    }
}

