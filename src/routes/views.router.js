import { Router } from "express";
import { ProductManager } from "../dao/managers/productManagerFileSystem.js";
import { CartManagerDB } from "../dao/managers/cartManagerDB.js";
import { cartModel } from "../dao/models/cart.model.js";

const router = Router();
const listaProductos = new ProductManager();
const listaCarts = new CartManagerDB();
const productosListados = listaProductos.getProducts();

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {title : 'Lista de Productos en Tiempo Real' , style:'styles.css'})
});

router.get('/' , (req , res) => {
    console.log(productosListados)
    res.render('index', {title : 'Lista de Productos' , style:'styles.css', productosListados})
});

router.get('/chat', (req , res) => {
    res.render('chat',{title: 'chat', style:'styles.css'} )
})

router.get('/:cid', async (req , res) => {
    const idCart = req.params.cid;
    let carrito = await cartModel.findOne({_id : idCart},{}).populate("products.product");
    carrito = carrito.products;
    console.log(carrito)
    res.render('cart',{title: 'Carrito', style:'styles.css', carrito})
})

export default router;

