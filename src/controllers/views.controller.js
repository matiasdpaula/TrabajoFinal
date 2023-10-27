import { cartModel } from "../dao/models/cart.model.js";
import { ObjectId } from "mongodb";
import { productModel } from "../dao/models/product.model.js";
import { PaginationParameters } from "mongoose-paginate-v2";
import { UserService } from "../services/users.services.js";

const userService = new UserService();

export const productos = async (req , res) => {
    const query = req.query.query;
    const sort = req.query.sort;
    productModel
    .paginate(...new PaginationParameters(req).get())
    .then((result) => {
        const { docs, hasPrevPage, hasNextPage, nextPage, prevPage, limit } =
        result;
        const products = JSON.parse(JSON.stringify(docs));
        res.render("products", {
        title: "Productos",
        style: "styles.css",
        products,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        limit,
        query,
        sort,
        user : req.session.user
        });
    });
}

export const chat = (req , res) => {
    res.render("chat", { title: "chat", user: req.session.user, style: "styles.css"});
}

export const log = (req , res) => {
    res.render("loginRegister", {
        title: "Login",
        style: "styles.css",
    });
}

export const profile = (req , res) => {
    res.render("profile", {
        title: "Mi Perfil",
        user: req.session.user,
        style: "styles.css",
    });}

export const inicio = (req , res) => {
    res.render("index", {
        title: "Home",
        style: "styles.css"
    })
}

export const carritos = async (req , res) => {
    const idCart = req.params.cid;
    const carrito = await cartModel
    .findOne({ _id: new ObjectId(idCart) })
    .populate({
        path: "products.product",
        model: "products",
    });
    let cartProducts = carrito.toJSON();
    cartProducts = cartProducts.products;
    res.render("cart", {
    title: "Carrito",
    style: "styles.css",
    carrito: cartProducts,
    total: total(cartProducts)
    });
}

const total = (carrito) => {
    let total = 0;
    carrito.forEach(item => {
        total += item.product.price * item.quantity
    });
    return total
}

export const loggerTest = async (req, res) => {
    res.render("loggerTest", {
        title : "Logger Test",
        style: "styles.css"
    })
}

export const recover = async (req, res) => {
    res.render("recover", {
        title : "Recuperar cuenta",
        style: "styles.css"
    })
}

export const changePassword = async (req, res) => {
    res.render("changePassword", {
        title : "Crear contraseña",
        style: "styles.css"
    })
}

export const users = async (req, res) => {
    let listaUsuarios = await userService.getAllUsers();
    listaUsuarios = JSON.parse(JSON.stringify(listaUsuarios))
    res.render("usersList", {
        title: "Lista de usuarios",
        style: "styles.css",
        usuarios: listaUsuarios 
    })
}