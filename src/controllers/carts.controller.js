import { CartService } from "../services/carts.services.js";

const cartService = new CartService();

export const getAllCarts = async (req , res) => {
    try {
        res.status(200).send({status : "success", payload: await cartService.getAll()})
    } catch (error) {
        res.status(404).send({status : "Error", error: "Carritos no encontrados"})
    }
}

export const createCart = async (req , res) => {
    await cartService.create();
    res.status(201).send({status : "success", payload : 'Carrito creado con exito'})
}

export const addProduct = async (req , res) => {
    const idCart = req.body.cart;
    const idProducto = req.body.product
    await cartService.addProduct(idCart , idProducto);
    res.status(201).send({status : "success", payload : 'Producto añadido con exito'})
}

export const getCartById = async (req , res) => {
    try {
        res.status(200).send({status : "success", payload : await cartService.getById(req.params.cid)});
    } catch (error) {
        res.status(404).send({status : "Error", error: "Carrito no encontrado"})
    }
}

export const addProductToCart = async (req , res) => {
    try {
        await cartService.addProduct(req.params.cid , req.params.pid)
        res.status(201).send({status : "success", payload : "Producto agregado con exito"});
    } catch (error) {
        res.status(404).send({status : "Error", error: "Carrito o producto no encontrado"})
    }
}

export const deleteProduct = async (req , res) => {
    try {
        await cartService.deleteProduct(req.params.cid , req.params.pid);
        res.status(200).send({status : "success", payload : 'Producto borrado con exito'})
    } catch (error) {
        res.status(404).send({status : "Error", error: "Carrito o producto no encontrado"})
    }
}

export const emptyCart = async (req , res) => {
    try {
        await cartService.emptyCart(req.params.cid);
        res.status(200).send({status : "success", payload : 'Carrito vaciado con exito'})
    } catch (error) {
        res.status(404).send({status : "Error", error: "Carrito no encontrado"})
    }
}

export const updateProducts = async (req , res) => {
    await cartService.updateProducts(req.params.cid , req.body);
    res.send({status : "success", payload : "Productos actualizados"});
}

export const updateProduct = async (req , res) => {
    try {
        await cartService.update(req.params.cid , req.params.pid , req.body.quantity)
        res.status(200).send({status : "success", payload : "Producto actualizado con exito"});
    } catch (error) {
        res.status(400).send({status : "Error", error: "Por favor ingrese solo números en la cantidad"})
    }
}

export const endShop = async (req , res) => {
    const idCart = req.params.cid;
    try {
        await cartService.purchase(idCart)
        res.status(200).send({status : "success", payload : "Compra realizada"});
    } catch (error) {
        res.status(406).send({status : "Error", error: "Alguno de los productos seleccionados se encuentran fuera de stock"})
    }
}

