import mongoose from "mongoose";
import ProductManager from "../dao/managers/productManager.js";
import chai from 'chai';

const DBConnection = mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const expect = chai.expect;

describe('Prueba de products con Chai', () => {
    before(function () {
        this.productDao = new ProductManager()
        this.mockProduct = {
            title: "Producto de testing",
            description: "Descripción de testing",
            category: "categoria de prueba",
            price: 485,
            thumbnails: [],
            code: "des123",
            stock: 1000,
        };
    })
    beforeEach(function () {
        this.timeout(5000);
    })
    it('El dao debe devolver todos los productos en formato de array', async function () {
        const result = await this.productDao.getProducts();
        expect(result).to.be.a('array');
    })
    it('El dao debe devolver un producto especifico en formato objeto', async function () {
        const user = {
            email: "adminCoder@coder.com" 
        };
        const newProduct = this.mockProduct;
        const productoMock = await this.productDao.addProduct(user, newProduct);
        const productId = productoMock._id;
        const result = await this.productDao.getProductById(productId);
        await this.productDao.deleteProduct(user, productId);
        expect(result).to.be.a('object');
    })
    it('El dao debe borrar un producto', async function () {
        const user = {
            email: "adminCoder@coder.com" 
        };
        const newProduct = this.mockProduct;
        const productoMock = await this.productDao.addProduct(user, newProduct);
        const productId = productoMock._id;
        const result = await this.productDao.deleteProduct(user, productId);
        expect(result).to.be.a('object');
    })
    it('El dao debe crear un nuevo producto', async function () {
        const user = {
            email: "adminCoder@coder.com" 
        };
        const newProduct = this.mockProduct;
        const result = await this.productDao.addProduct(user, newProduct);
        const productId = result._id;
        await this.productDao.deleteProduct(user, productId)
        expect(result).to.be.a('object');
    })
})