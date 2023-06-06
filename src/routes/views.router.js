import { Router } from "express";
import { ProductManager } from "../productManager.js";

const listaProductos = new ProductManager();
const router = Router();
const productosListados = listaProductos.getProducts();

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {title : 'Lista de Productos en Tiempo Real' , style:'styles.css', productosListados})
});

router.get('/' , (req , res) => {
    res.render('index', {title : 'Lista de Productos' , style:'styles.css', productosListados})
});

export default router;

