import {ProductService} from "../services/product.services.js"
import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enum.js";
import { generateNotFoundError , generateInvalidTypesError, generateClearenceError} from "../services/errors/info.js";

const productService = new ProductService();

export const getAllProducts =  async (req, res, next) => {
    try {
        res.status(200).send({status : "success", payload: await productService.getAll()})
    } catch (error) {
        req.logger.warning('Productos no encontrados');
        next(new CustomError("Productos no encontrados", generateNotFoundError(), EErrors.NOT_FOUND_ERROR, "Productos no encontrados"));
    }
}

export const getProductById = async (req, res, next) => {
    try {
        res.send({status : "success", payload : await productService.getById(req.params.pid)});
    }
    catch {
        req.logger.warning('Producto no encontrado')
        next(new CustomError("Producto no encontrado", generateNotFoundError(), EErrors.NOT_FOUND_ERROR, "Producto no encontrado"));
    }
};

export const getMockingProducts = async (req, res) => {
    try {
        req.logger.debug('Mocking funcionando')
        res.status(200).send({status : "success", payload : await productService.mocking()});
    }
    catch {
        res.status(400).send({status : "Error", error: "No sé pudieron cargar los products Mock"})
    }
};

export const createProduct = async (req, res, next) => {
    const user = req.session.user;
    const newProduct = req.body;
    try {
        await productService.create(user, newProduct);
        res.status(201).send({status : "success", payload : "Producto agregado con exito"})
    }
    catch {
        req.logger.error('Error al crear el producto')
        next(new CustomError("Caracteres invalidos", generateInvalidTypesError(), EErrors.INVALID_TYPES_ERROR, "El código ingresado ya se encuentra en la base de datos"));
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        await productService.update(req.params.pid , req.body)
        res.send({status : "success", payload : "Producto actualizado correctamente"});
    }
    catch {
        req.logger.error('Error al actualizar el producto')
        next(new CustomError("Caracteres invalidos", generateInvalidTypesError(), EErrors.INVALID_TYPES_ERROR, "Verificar caracteres ingresados"));
    }
};

export const deleteProduct = async (req, res, next) => {
    const productId = req.params.pid;
    const user = req.session.user;
    try {
        await productService.delete(user, productId);
        res.send({status : "success", payload : "Producto borrado"});
    }
    catch {
        req.logger.error('Error al borrar el producto')
        next(new CustomError("Producto no encontrado o autorización insuficiente", generateClearenceError(), EErrors.CLEARENCE_ERROR, "Producto no encontrado o autorización insuficiente"));
    }
};

export const mockFatalError = async (req, res) => {
    req.logger.fatal('Error fatal');
    res.send({status : "Success", payload : "Tarea realizada con exito"});
}