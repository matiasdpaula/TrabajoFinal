import { Router } from "express";
import { ProductManager } from "../dao/managers/productManagerFileSystem.js";

const router = Router();
const listaProductos = new ProductManager();
const productosListados = listaProductos.getProducts();

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {title : 'Lista de Productos en Tiempo Real' , style:'styles.css'})
});

router.get('/' , (req , res) => {
    res.render('index', {title : 'Lista de Productos' , style:'styles.css', productosListados})
});

router.get('/chat', (req , res) => {
    res.render('chat',{title: 'chat', style:'styles.css'} )
})

export default router;

