import { Router } from "express";
import { cartModel } from "../dao/models/cart.model.js";
import ProductManagerDB from "../dao/managers/productManagerDB.js";
import { ObjectId } from "mongodb";

const router = Router();
const productMng = new ProductManagerDB();

router.get('/products', async (req, res) => {
    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;
    const sort = req.query.sort;
    const {docs,hasPrevPage,hasNextPage,nextPage,prevPage} = await productMng.getProducts(limit, page);
    const productos = docs;
    res.render('products', {title : 'Productos', style:'styles.css', productos, hasPrevPage, hasNextPage, prevPage, nextPage, limit})
});

router.get('/chat', (req , res) => {
    res.render('chat',{title: 'chat', style:'styles.css'} )
})

router.get('/:cid', async (req , res) => {
    const idCart = req.params.cid;
    const carrito = await cartModel.findOne({_id : new ObjectId(idCart)}).populate({
        path:'products.product',
        model:'products'
    });
    console.log(carrito)
    const cartProducts = carrito.toJSON();
    console.log(cartProducts);
    res.render('cart',{title: 'Carrito', style:'styles.css', carrito: cartProducts.products})
})

export default router;

