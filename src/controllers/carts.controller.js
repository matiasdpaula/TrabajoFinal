import { CartService } from "../services/carts.services.js";
import CustomError from "../services/errors/CustomError.js";
import { generateInvalidTypesError, generateNotFoundError } from "../services/errors/info.js";
import EErrors from "../services/errors/enum.js";

const cartService = new CartService();

export const getAllCarts = async (req , res, next) => {
    try {
        res.status(200).send({status : "success", payload: await cartService.getAll()})
    } catch (error) {
        next(new CustomError("Carritos no encontrados", generateNotFoundError(), EErrors.NOT_FOUND_ERROR, "Carritos no encontrados"));
    }
}

export const createCart = async (req , res) => {
    await cartService.create();
    res.status(201).send({status : "success", payload : 'Carrito creado con exito'})
}

export const addProduct = async (req, res, next) => {
    const user = req.session.user;
    const idCart = req.body.cart;
    const idProducto = req.body.product;
    try {
        await cartService.addProduct(user, idCart, idProducto);
        res.status(201).send({status : "success", payload : 'Producto añadido con exito'})
    } catch (error) {
        next(new CustomError("No es posible agregar productos propios", generateNotFoundError(), EErrors.CLEARENCE_ERROR, "No es posible agregar productos propios"));
    }
}

export const getCartById = async (req , res, next) => {
    try {
        res.status(200).send({status : "success", payload : await cartService.getById(req.params.cid)});
    } catch (error) {
        next(new CustomError("Carrito no encontrado", generateNotFoundError(), EErrors.NOT_FOUND_ERROR, "Carrito no encontrado"));
    }
}

export const addProductToCart = async (req , res, next) => {
    const user = req.session.user;
    const idCart = req.body.cart;
    const idProducto = req.body.product;
    try {
        await cartService.addProduct(user, idCart, idProducto)
        res.status(201).send({status : "success", payload : "Producto agregado con exito"});
    } catch (error) {
        next(new CustomError("Carrito no encontrado", generateNotFoundError(), EErrors.NOT_FOUND_ERROR, "Carrito o producto no encontrado"));
    }
}

export const deleteProduct = async (req , res, next) => {
    try {
        await cartService.deleteProduct(req.params.cid , req.params.pid);
        res.status(200).send({status : "success", payload : 'Producto borrado con exito'})
    } catch (error) {
        next(new CustomError("Carrito o producto no encontrado", generateNotFoundError(), EErrors.NOT_FOUND_ERROR, "Carrito o producto no encontrado"));
    }
}

export const emptyCart = async (req , res, next) => {
    try {
        await cartService.emptyCart(req.params.cid);
        res.status(200).send({status : "success", payload : 'Carrito vaciado con exito'})
    } catch (error) {
        next(new CustomError("Carrito no encontrado", generateNotFoundError(), EErrors.NOT_FOUND_ERROR, "Carrito no encontrado"));
    }
}

export const updateProducts = async (req , res) => {
    await cartService.updateProducts(req.params.cid , req.body);
    res.send({status : "success", payload : "Productos actualizados"});
}

export const updateProduct = async (req , res, next) => {
    try {
        await cartService.update(req.params.cid , req.params.pid , req.body.quantity)
        res.status(200).send({status : "success", payload : "Producto actualizado con exito"});
    } catch (error) {
        next(new CustomError("Caracteres invalidos", generateInvalidTypesError(), EErrors.INVALID_TYPES_ERROR, "Verificar caracteres ingresados"));
    }
}

export const endShop = async (req , res, next) => {
    const idCart = req.params.cid;
    try {
        await cartService.purchase(idCart)
        res.status(200).send({status : "success", payload : "Compra realizada"});
    } catch (error) {
        next(new CustomError("Error de Stock", "Error de Stock", EErrors.DATABASE_ERROR, "Verificar stock de los productos"));
    }
}

