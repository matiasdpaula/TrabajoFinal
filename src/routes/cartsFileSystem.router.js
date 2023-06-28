import { Router } from "express";
import { CartManager } from "../dao/managers/cartManagerFileSystem.js";

const router = Router();
const listaCarts = new CartManager;

router.post('/', (req, res) => {
    listaCarts.addCart();
    res.status(201).send({status : "success", payload : 'Carrito creado con exito'})
});

router.get('/:cid', (req, res) => {
    let idCart = Number(req.params.cid);
    try {
        res.send({status : "success", payload : listaCarts.getCartById(idCart)});
    }
    catch {
        res.status(404).send({status : "Error", error: "Carrito no encontrado"})
    }
});

router.post('/:cid/product/:pid', (req, res) => {
    const idCart = Number(req.params.cid);
    const idProducto = Number(req.params.pid);
    try {
        listaCarts.addProductToCart(idCart, idProducto)
        res.send({status : "success", payload : "Producto agregado con exito"});
    }
    catch {
        res.status(404).send({status : "Error", error: "Carrito o producto no encontrado"})
    }
});

export default router;