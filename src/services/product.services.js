import ProductManager from "../dao/managers/productManager.js";

export class ProductService {
    constructor() {
        this.dao = new ProductManager();
    }
    getAll() {
        return this.dao.getProducts();
    }
    getById(id) {
        return this.dao.getProductById(id);
    }
    create(product) {
        return this.dao.addProduct(product);
    }
    update(id, product) {
        return this.dao.updateProduct(id, product);
    }
    delete(id) {
        return this.dao.deleteProduct(id);
    }
}   
