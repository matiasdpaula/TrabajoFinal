import {ProductService} from "../services/product.services.js"

const productService = new ProductService();

export const getAllProducts =  async (req, res) => {
    try {
        res.status(200).send({status : "success", payload: await productService.getAll()})
    } catch (error) {
        res.status(404).send({status : "Error", error: "Ningún producto encontrado"})
    }
}

export const getProductById = async (req, res) => {
    try {
        res.send({status : "success", payload : await productService.getById(req.params.pid)});
    }
    catch {
        res.status(404).send({status : "Error", error: "Producto no encontrado"})
    }
};

export const createProduct = async (req, res) => {
    try {
        await productService.create(req.body);
        res.status(201).send({status : "success", payload : "Producto agregado con exito"})
    }
    catch {
        res.status(400).send({status : "Error", error : "El código ingresado ya se encuentra en la base de datos"})
    }
};

export const updateProduct = async (req, res) => {
    try {
        await productService.update(req.params.pid , req.body)
        res.send({status : "success", payload : "Producto actualizado correctamente"});
    }
    catch {
        res.status(400).send({status : "Error", error: "Producto no encontrado, propiedades vacias o intento de ingresar letras donde no corresponde"})
    }
};

export const deleteProduct = async (req, res) => {
    try {
        await productService.delete(req.params.pid)
        res.send({status : "success", payload : "Producto borrado"});
    }
    catch {
        res.status(400).send({status : "Error", error: "Producto no encontrado"})
    }
};