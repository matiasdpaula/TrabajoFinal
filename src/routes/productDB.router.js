import { Router } from "express";
import ProductManagerDB  from "../dao/managers/productManagerDB.js";

const router = Router();
const listaProductos = new ProductManagerDB();

router.get('/', async (req, res) => {
    try {
        res.send({status : "success", payload : await listaProductos.getProducts()})
    } catch (error) {
        res.status(404).send({status : "Error", error: "Ningún producto encontrado"})
    }
});

router.post('/', async (req, res) => {
    const newProduct = req.body;
    try {
        await listaProductos.addProduct(newProduct);
        res.status(201).send({status : "success", payload : "Producto agregado con exito"})
    }
    catch {
        res.status(400).send({status : "Error", error: "El código ingresado ya se encuentra en la base de datos"})
    }
});

router.get('/:pid', async (req, res) => {
    const idProducto = req.params.pid;
    try {
        res.send({status : "success", payload : await listaProductos.getProductById(idProducto)});
    }
    catch {
        res.status(404).send({status : "Error", error: "Producto no encontrado"})
    }
});

router.put('/:pid', async (req, res) => {
    const idProducto = req.params.pid;
    const dataToUpdate = req.body;
    try {
        await listaProductos.updateProduct(idProducto, dataToUpdate)
        res.send({status : "success", payload : "Producto actualizado correctamente"});
    }
    catch {
        res.status(400).send({status : "Error", error: "Producto no encontrado, propiedades vacias o intento de ingresar letras donde no corresponde"})
    }
});

router.delete('/:pid', async (req, res) => {
    const idProducto = req.params.pid;
    try {
        await listaProductos.deleteProduct(idProducto)
        res.send({status : "success", payload : "Producto borrado"});
    }
    catch {
        res.status(400).send({status : "Error", error: "Producto no encontrado"})
    }
});

export default router;