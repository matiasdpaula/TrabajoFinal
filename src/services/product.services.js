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
    create(user, newProduct) {
        return this.dao.addProduct(user, newProduct);
    }
    update(id, product) {
        return this.dao.updateProduct(id, product);
    }
    delete(user, productId) {
        return this.dao.deleteProduct(user, productId);
    }
    mocking() {
        return this.dao.makeMockProducts();
    }
}   
