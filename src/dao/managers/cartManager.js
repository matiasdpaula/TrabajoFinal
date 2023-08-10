import { cartModel } from '../models/cart.model.js';
import ProductManager from './productManager.js';

const productMng = new ProductManager();

export class CartManager {
    cartsModel
    constructor () {
        this.cartsModel = cartModel;
    }
    // Metodos
    async getCarts() {
        const listaCarts = await this.cartsModel.find();
        return listaCarts;
    }
    async addCart() {
        const cart = await this.cartsModel.create([{}]);
        return cart;
    }
    async createAndAdd(idProducto) {
        const cart = await this.cartsModel.create([{}]);
        const cartId = cart[0]._id;
        const nuevoProducto = {product : idProducto , quantity : 1}
        const cartUpdated = await this.cartsModel.updateOne({_id : cartId},{$push : { products : nuevoProducto }})
        return cartUpdated;
    }
    async getCartById(idCart) {
        const cartsFiltrado = await this.cartsModel.findOne({_id : idCart}).populate("products.product");
        if(!cartsFiltrado) {
            throw new Error;
        }
        return cartsFiltrado;
    }
    async deleteProduct(idCart, idProducto) {
        const cartsFiltrado = await this.cartsModel.findOne({_id : idCart});
        if(!cartsFiltrado) {
            throw new Error;
        }
        const productoPorBorrar = cartsFiltrado.products.find(e => e.product.toString() === idProducto)
        if (!productoPorBorrar) {
            throw new Error;
        }
        cartsFiltrado.products.pull(productoPorBorrar);
        const salvar = await cartsFiltrado.save()
        return salvar;
    }
    async emptyCart(idCart) {
        const cartsFiltrado = await this.cartsModel.findOne({_id : idCart});
        if(!cartsFiltrado) {
            throw new Error;
        }
        const vaciar = await this.cartsModel.updateOne({_id : idCart},{$set:{products:[]}})
        return vaciar;
    }
    async updateProduct(idCart, idProducto, quantity) {
        const cartsFiltrado = await this.cartsModel.findOne({_id : idCart});
        const productoPorBorrar = cartsFiltrado.products.find(e => e.product.toString() === idProducto)
        if(!cartsFiltrado || !productoPorBorrar) {
            throw new Error;
        } else if (!isNaN(parseInt(quantity))) {
            const cartUpdated = await this.cartsModel.updateOne({_id : idCart , "products.product" : idProducto},{$set:{"products.$.quantity":quantity}})
            return cartUpdated;
        } else {
            throw new Error;
        }
    }
    async updateProducts(idCart, newProducts) {
        const cartsFiltrado = await this.cartsModel.findOne({_id : idCart});
        if(!cartsFiltrado){
            throw new Error;
        } else if (cartsFiltrado.products.length === 0) {
            const productosActualizados = await this.cartsModel.updateOne({_id : idCart},{$push: {products: newProducts}})
            return productosActualizados;
        }
        const productosActualizados = newProducts.forEach(products => {this.actualizacion(idCart, products)})
        return productosActualizados;
    }
    async actualizacion(idCart, products) {
        const productId = products.product;
        const productQuantity = products.quantity;
        const cartsFiltrado = await this.cartsModel.findOne({_id : idCart});
        const productoEncontrado = cartsFiltrado.products.find(e => e.product.toString() === productId)
        if (!productoEncontrado) {
            const productosActualizados = await this.cartsModel.updateOne({_id : idCart},{$push: {products: products}})
            return productosActualizados;
        }
        const productosActualizados = await this.cartsModel.updateOne({_id : idCart, "products.product" : productId},{$set:{"products.$.quantity":productQuantity}});
        return productosActualizados;
    }
    async addProductToCart(idCart, idProducto) {
        const producto = await productMng.getProductById(idProducto)
        let cartFind = await this.cartsModel.findOne({_id : idCart, "products.product" : producto._id});
        if (!cartFind) {
            const productAdded = await this.cartsModel.updateOne({_id : idCart},{$push: {products: {product:producto, quantity:1}}});
            return productAdded;
        }
        const arrayDeProductos = cartFind.products;
        const productoAgregado = arrayDeProductos.filter(e => e.product.toString() === producto._id.toString());
        const cantidad = productoAgregado[0].quantity;
        const cartUpdated = await this.cartsModel.updateOne({_id : idCart , "products.product" : producto._id},{$set:{"products.$.quantity":cantidad+1}})
        return cartUpdated
    }
}

