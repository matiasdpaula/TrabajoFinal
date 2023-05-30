import { Router } from "express";
import { ProductManager } from "../productManager.js";

const router = Router();
const listaProductos = new ProductManager();

router.get('/', (req, res) => {
    let limit = req.query.limit;
    if(!limit) {
        res.send({status : "success", payload : listaProductos.getProducts()})
    } else {
        res.send({status : "success", payload : listaProductos.getProductLimit(limit)});
    }
});

router.post('/', (req, res) => {
    const newProduct = req.body;
    try {
        listaProductos.addProduct(newProduct);
        res.status(201).send({status : "success", payload : "Producto agregado con exito"})
    }
    catch {
        res.status(400).send({status : "Error", error: "El código ingresado ya se encuentra en la base de datos"})
    }
});

router.get('/:pid', (req, res) => {
    let idProducto = Number(req.params.pid);
    try {
        res.send({status : "success", payload : listaProductos.getProductById(idProducto)});
    }
    catch {
        res.status(404).send({status : "Error", error: "Producto no encontrado"})
    }
});

router.put('/:pid', (req, res) => {
    let idProducto = Number(req.params.pid);
    let dataToUpdate = req.body
    try {
        listaProductos.updateProduct(idProducto, dataToUpdate)
        res.send({status : "success", payload : "Producto actualizado correctamente"});
    }
    catch {
        res.status(400).send({status : "Error", error: "Producto no encontrado o propiedades vacias"})
    }
});

router.delete('/:pid', (req, res) => {
    let idProducto = Number(req.params.pid);
    try {
        listaProductos.deleteProduct(idProducto)
        res.send({status : "success", payload : "Producto borrado"});
    }
    catch {
        res.status(400).send({status : "Error", error: "Producto no encontrado"})
    }
});

export default router;