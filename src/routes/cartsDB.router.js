import { Router } from "express";
import { CartManagerDB } from "../dao/managers/cartManagerDB.js";

const router = Router();
const listaCarts = new CartManagerDB;

router.post('/', async (req, res) => {
    await listaCarts.addCart();
    res.status(201).send({status : "success", payload : 'Carrito creado con exito'})
});

router.get('/:cid', async (req, res) => {
    let idCart = req.params.cid;
    try {
        res.send({status : "success", payload : await listaCarts.getCartById(idCart)});
    }
    catch {
        res.status(404).send({status : "Error", error: "Carrito no encontrado"})
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    const idCart = req.params.cid;
    const idProducto = req.params.pid;
    try {
        await listaCarts.addProductToCart(idCart, idProducto)
        res.send({status : "success", payload : "Producto agregado con exito"});
    } catch (error) {
        res.status(404).send({status : "Error", error: "Carrito o producto no encontrado"})
    }
});

router.delete('/:cid/product/:pid', async (req, res) => {
    const idCart = req.params.cid;
    const idProducto = req.params.pid;
    try {
        await listaCarts.deleteProduct(idCart, idProducto);
        res.status(201).send({status : "success", payload : 'Producto borrado con exito'})
    } catch (error) {
        res.status(404).send({status : "Error", error: "Carrito o producto no encontrado"})
    }
});
router.delete('/:cid', async (req, res) => {
    const idCart = req.params.cid;
    try {
        await listaCarts.emptyCart(idCart);
        res.status(201).send({status : "success", payload : 'Carrito vaciado con exito'})
    } catch (error) {
        res.status(404).send({status : "Error", error: "Carrito no encontrado"})
    }
});

router.put('/:cid', async (req, res) => {
    let idCart = req.params.cid;
    let newProducts = req.body;
    try {
        await listaCarts.updateProducts(idCart, newProducts)
        res.send({status : "success", payload : "Productos actualizados"});
    }
    catch {
        res.status(404).send({status : "Error", error: "Carrito no encontrado"})
    }
});

router.put('/:cid/product/:pid', async (req, res) => {
    const idCart = req.params.cid;
    const idProducto = req.params.pid;
    const quantity = req.body.quantity;
    try {
        await listaCarts.updateProduct(idCart, idProducto, quantity)
        res.send({status : "success", payload : "Producto actualizado con exito"});
    } catch (error) {
        res.status(400).send({status : "Error", error: "Por favor ingrese solo números en la cantidad"})
    }
});

export default router;