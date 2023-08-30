import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import { faker } from '@faker-js/faker/locale/es';
import EErrors from "./services/errors/enum.js";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

export const publicAccess = (req, res, next) => {
    if (req.session.user) return res.redirect("/products");
    next();
};

export const privateAccess = (req, res, next) => {
    if (!req.session.user) return res.redirect("/login");
    next();
};

export const adminAccess = (req, res, next) => {
    if (!req.session.user) return res.redirect("/login");
    if (req.session.user.role === "Admin"){
        return next();
    } return res.redirect("/login");
}

export const generateProducts = () => {
    return {
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        category: faker.commerce.productAdjective(),
        price: faker.commerce.price(),
        status: faker.number.binary(),
        thumbnails: [],
        code: faker.string.alphanumeric(6),
        stock: faker.number.int(500),
    }
}

export const errorHandler = (error, req, res, next) => {
    switch (error.code) {
        case EErrors.NOT_FOUND_ERROR:
            res.status(404).send({status: 'error', error: error.message, cause: error.cause, code: error.code});
            break;
        case EErrors.INVALID_TYPES_ERROR:
            res.status(400).send({status: 'error', error: error.message, cause: error.cause, code: error.code});
            break;
        case EErrors.DATABASE_ERROR:
            res.status(406).send({status : "Error", error: error.message, cause: error.cause, code: error.code})
            break;
        default:
            res.send({status: 'error', error: 'Internal Server Error'});
    }
};
