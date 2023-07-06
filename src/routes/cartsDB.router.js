import { Router } from "express";
import { CartManagerDB } from "../dao/managers/cartManagerDB.js";
import ProductManagerDB from "../dao/managers/productManagerDB.js";

const router = Router();
const cartMng = new CartManagerDB;
const productMng = new ProductManagerDB

router.post('/', async (req, res) => {
    await cartMng.addCart();
    res.status(201).send({status : "success", payload : 'Carrito creado con exito'})
});

router.get('/', async (req, res) => {
    try {
        res.status(201).send({status : "success", payload: await cartMng.getCarts()})
    } catch (error) {
        res.status(404).send({status : "Error", error: "Error inesperado"})
    }
});

router.post('/addToCart/:pid', async (req, res) => {
    const idProducto = req.params.pid;
    await cartMng.createAndAdd(idProducto);
    res.status(201).send({status : "success", payload : 'Carrito creado con exito'})
})

router.get('/:cid', async (req, res) => {
    let idCart = req.params.cid;
    try {
        res.send({status : "success", payload : await cartMng.getCartById(idCart)});
    }
    catch {
        res.status(404).send({status : "Error", error: "Carrito no encontrado"})
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    const idCart = req.params.cid;
    const idProducto = req.params.pid;
    try {
        const producto = await productMng.getProductById(idProducto)
        await cartMng.addProductToCart(idCart, producto)
        res.send({status : "success", payload : "Producto agregado con exito"});
    } catch (error) {
        res.status(404).send({status : "Error", error: "Carrito o producto no encontrado"})
    }
});

router.delete('/:cid/product/:pid', async (req, res) => {
    const idCart = req.params.cid;
    const idProducto = req.params.pid;
    try {
        await cartMng.deleteProduct(idCart, idProducto);
        res.status(201).send({status : "success", payload : 'Producto borrado con exito'})
    } catch (error) {
        res.status(404).send({status : "Error", error: "Carrito o producto no encontrado"})
    }
});

router.delete('/:cid', async (req, res) => {
    const idCart = req.params.cid;
    try {
        await cartMng.emptyCart(idCart);
        res.status(201).send({status : "success", payload : 'Carrito vaciado con exito'})
    } catch (error) {
        res.status(404).send({status : "Error", error: "Carrito no encontrado"})
    }
});

router.put('/:cid', async (req, res) => {
    let idCart = req.params.cid;
    let newProducts = req.body;
        await cartMng.updateProducts(idCart, newProducts);
        res.send({status : "success", payload : "Productos actualizados"});
});

router.put('/:cid/product/:pid', async (req, res) => {
    const idCart = req.params.cid;
    const idProducto = req.params.pid;
    const quantity = req.body.quantity;
    try {
        await cartMng.updateProduct(idCart, idProducto, quantity)
        res.send({status : "success", payload : "Producto actualizado con exito"});
    } catch (error) {
        res.status(400).send({status : "Error", error: "Por favor ingrese solo números en la cantidad"})
    }
});

export default router;