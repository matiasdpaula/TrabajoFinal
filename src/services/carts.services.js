import {CartManager} from "../dao/managers/cartManager.js";

export class CartService {
    constructor() {
        this.dao = new CartManager();
    }
    getAll() {
        return this.dao.getCarts();
    }
    getById(idCart) {
        return this.dao.getCartById(idCart);
    }
    create() {
        return this.dao.addCart();
    }
    createAndAdd(idProducto) {
        return this.dao.createAndAdd(idProducto);
    }
    addProduct(idCart , idProducto) {
        return this.dao.addProductToCart(idCart , idProducto)
    }
    deleteProduct(idCart, idProducto) {
        return this.dao.deleteProduct(idCart, idProducto);
    }
    emptyCart(id) {
        return this.dao.emptyCart(id);
    }
    update(idCart , idProducto , quantity) {
        return this.dao.updateProduct(idCart , idProducto , quantity);
    }
    updateProducts(idCart , newProducts) {
        return this.dao.updateProducts(idCart , newProducts);
    }
}   