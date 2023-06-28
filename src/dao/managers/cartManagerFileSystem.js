import { existsSync, readFileSync, writeFileSync} from 'fs';
import { ProductManager } from './productManagerFileSystem.js';

const listaProductos = new ProductManager();

export class CartManager {
    constructor () {
        this.path = './Carts.json'
        this.carts = this.getCarts();
    }
    // Metodos
    getCarts = () =>{
        if (existsSync(this.path)) {
            const data = readFileSync(this.path, 'utf-8');
            const carts = JSON.parse(data);
            return carts;
        }
        return [];
    }
    addCart = () => {
            const cart = {
                products: []
            }
            if(this.carts.length === 0){
                cart.id = 1;
            }else{
                cart.id = this.carts[this.carts.length-1].id +1;
            }
            this.carts.push(cart);
            writeFileSync(this.path,JSON.stringify(this.carts,null,'\t'));
    }
    getCartById = (idCart) =>{
        const cartsFiltrado = this.carts.find(e => e.id === idCart);
        if(!cartsFiltrado) {
            throw new Error("Carrito no encontrado");
        }
        return cartsFiltrado;
    }
    addProductToCart = (idCart, idProducto) => {
        listaProductos.getProductById(idProducto);
        let cartFind = this.getCartById(idCart);
        cartFind = cartFind.products;
        const productFind = cartFind.find(e => e.product === idProducto);
        if (!productFind) {
            const productoAgregado = {
                product : idProducto,
                quantity : 1
            }
            cartFind.push(productoAgregado)
            writeFileSync(this.path,JSON.stringify(this.carts,null,'\t'));
            return
        } else if (productFind.product === idProducto) {
            productFind.quantity++;
            writeFileSync(this.path,JSON.stringify(this.carts,null,'\t'));
            return
        }
    }
}
