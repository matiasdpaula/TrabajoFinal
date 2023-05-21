import { existsSync, readFileSync } from 'fs';

export class ProductManager {
    constructor () {
        this.path = './Productos.json'
        this.productos = this.getProducts();
    }
    // Metodos
    getProducts = () =>{
        if (existsSync(this.path)) {
            const data = readFileSync(this.path, 'utf-8');
            const productos = JSON.parse(data);
            return productos;
        }
        return [];
    }
    getProductLimit = (limit) => {
        const productoSlice = this.productos.slice(0 , limit)
        return productoSlice;
    }
    getProductById = (idProducto) =>{
        const productoFiltrado = this.productos.filter(e => e.id === idProducto);
        console.log(productoFiltrado)
        if(productoFiltrado.length === 0) {
            throw new Error("Producto no encontrado");
        }
        return productoFiltrado;
    }
}
