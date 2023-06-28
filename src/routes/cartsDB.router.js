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
        await listaCarts.addProductToCart(idCart, idProducto)
        res.send({status : "success", payload : "Producto agregado con exito"});
});

export default router;