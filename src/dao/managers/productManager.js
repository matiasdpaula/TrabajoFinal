import { productModel } from "../models/product.model.js";
import { generateProducts } from "../../utils.js";

class ProductManager {
    productsModel
    constructor() {
        this.productsModel = productModel
    }
    // Metodos
    async getProducts() {
        const listaProductos = await this.productsModel.find({},{});
        return listaProductos;
    }
    async addProduct (user, newProduct) {
        newProduct.status = true;
        newProduct.owner = user.email;
        if(user.email === "adminCoder@coder.com") {
            newProduct.owner = "admin";
        }
        if (await this.validarCodigo(newProduct.code) && this.validarCampos(
            newProduct.title,
            newProduct.description,
            newProduct.price,
            newProduct.category,
            newProduct.code,
            newProduct.stock)) {
            const producto = await this.productsModel.create(newProduct);
            return producto;
        }
    }
    async getProductLimit(limit) {
        const productLimit = await this.productsModel.find({}).limit(limit);
        return productLimit;
    }
    async getProductById(idProducto) {
        const product = await this.productsModel.findOne({_id : idProducto});
        if(!product) {
            throw new Error;
        }
        return product;
    }
    async deleteProduct(user, idProducto) {
        const product = await this.productsModel.findOne({_id : idProducto});
        if(user.email === "adminCoder@coder.com") {
            const productDeleted = await this.productsModel.deleteOne({_id : idProducto});
            return productDeleted;
        }
        if(product.owner === user.email) {
            const productDeleted = await this.productsModel.deleteOne({_id : idProducto});
            return productDeleted;
        }
        throw new Error
    }
    async updateProduct(idProducto, dataToUpdate) {
        const validarDatos = Object.values(dataToUpdate).some(e => e === "");
        if (validarDatos) {
            throw new Error("No se pueden ingresar valores vacios");
        }
        const productUpdated = await this.productsModel.updateOne({_id : idProducto}, dataToUpdate)
        return productUpdated;
    }
    async makeMockingProducts() {
        let products = [];
        for(let i=0; i<100; i++) {
            products.push(generateProducts())
        }
        return products;
    }
    // Validaciones
    validarCampos = (title , description , price , category , code , stock) => {
        return this.validarTitulo(title)
            && this.validarDescripcion(description) 
            && this.validarPrecio(price) 
            && this.validarCategoria(category) 
            && this.validarIngresoCodigo(code) 
            && this.validarStock(stock);
    }
    validarTitulo = (title) => {
        if (!title) {
            throw new Error("Por favor inserte un titulo");
        }
        return true;
    }
    validarDescripcion = (description) => {
        if (!description)  {
            throw new Error("Por favor inserte una descripción");
        }
        return true;
    }
    validarPrecio = (price) => {
        if (!isNaN(price)) {
            return true;
        }
        throw new Error("Ingrese solo números en el precio")
    }
    validarCategoria = (category) => {
        if (!category) {
            throw new Error("Inserte una categoría");
        }
        return true;
    }
    validarIngresoCodigo = (code) => {
        if (!code) {
            throw new Error("Ingrese un código")
        }
        return true;
    }
    validarStock = (stock) => {
        if (!isNaN(stock)) {
            return true;
        }
        throw new Error("Ingrese solo números en el stock")
    }
    async validarCodigo (code) {
        const productos = await this.productsModel.find({});
        const productCode = productos.findIndex(e => e.code === code)
        if (productCode === -1) {
            return true
        }
        throw new Error("El código ingresado ya existe en nuestra base de datos")
    }
}

export default ProductManager;