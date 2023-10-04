import { CartManager } from "../dao/managers/cartManager.js";
import chai from 'chai';
import supertest from "supertest";
import mongoose from "mongoose";

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

const DBConnection = mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

describe('Prueba de carritos', () => {
    let cookie;
    before(function () {
        this.cartDao = new CartManager()
    })
    beforeEach(function () {
        this.timeout(5000);
    })
    it('El dao debe devolver todos los carritos en formato de array', async function () {
        const result = await this.cartDao.getCarts();
        expect(result).to.be.a('array');
    })
    it('El dao debe crear un nuevo carrito', async function () {
        const result = await this.cartDao.addCart();
        await this.cartDao.deleteCart(result._id);
        expect(result).to.be.a('object');
    })
    it('El dao debe devolver un carrito especifico en formato array', async function () {
        const carritoNuevo = await this.cartDao.addCart();
        const result = await this.cartDao.getCartById(carritoNuevo._id);
        await this.cartDao.deleteCart(carritoNuevo._id);
        expect(result).to.be.a('array');
    })
    it('El endpoint POST /api/carts/addToCart debe agregar un producto correctamente', async function () {
        const result = await requester.post('/api/sessions/login').send({ email: 'correoTest@test.com', password: "456456" })
        const cookieResult = result.headers['set-cookie'][0];
        cookie = cookieResult
        const { statusCode, ok } = await requester.post('/api/carts/addToCart').set('Cookie', cookie)
        .send({ product: "651a26f9bc038411b754166f", cart: "651c95f865cecbc5e871afa7" });
        expect(statusCode).to.equal(201);
        expect(ok).to.equal(true);
    })
    it('El dao debe borrar un producto', async function () {
        const idProducto = "651a26f9bc038411b754166f";
        const idCart = "651c95f865cecbc5e871afa7";
        const result = await this.cartDao.deleteProduct(idCart , idProducto);
        expect(result).to.be.a('object');
    })
    it('El dao debe vaciar el carrito', async function () {
        const idCart = "651c95f865cecbc5e871afa7";
        const result = await this.cartDao.emptyCart(idCart);
        expect(result).to.be.a('object');
    });
    it('Se debe cerrar la sesión', async function () {
        const result = await requester.get('/api/sessions/logout').set('Cookie', cookie)
        expect(result.statusCode).to.be.equal(302);
    })
})