import { cartModel } from '../models/cart.model.js';
import ProductManagerDB from './productManagerDB.js';

const listaProductos = new ProductManagerDB();

export class CartManagerDB {
    cartsModel
    constructor () {
        this.cartsModel = cartModel;
    }
    // Metodos
    async getCarts() {
        const listaCarts = await this.cartsModel.find();
        console.log(listaCarts);
        return listaCarts;
    }
    async addCart() {
        const cart = await this.cartsModel.create([{}]);
        return cart;
    }
    async getCartById(idCart) {
        const cartsFiltrado = await this.cartsModel.findOne({_id : idCart});
        if(!cartsFiltrado) {
            throw new Error;
        }
        return cartsFiltrado;
    }
    async addProductToCart(idCart, idProducto) {
        const productoEncontrado = await listaProductos.getProductById(idProducto);
        if(!productoEncontrado) {
            throw new Error;
        }
        let cartFind = await this.getCartById(idCart);
        cartFind = cartFind.products;
        const productFind = cartFind.find(e => e.product === idProducto);
        if (!productFind) {
            const productAdded = await this.cartsModel.updateOne({_id : idCart},{$push: {products: {product:idProducto, quantity:1}}})
            return productAdded
        } else if (productFind.product === idProducto) {
            const quantity = productFind.quantity
            const cartUpdated = await this.cartsModel.updateOne({_id : idCart , "products.product" : idProducto},{$set:{"products.$.quantity":quantity+1}})
            return cartUpdated
        }
    }
}