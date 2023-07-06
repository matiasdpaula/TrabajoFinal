import { Router } from "express";
import { cartModel } from "../dao/models/cart.model.js";
import { ObjectId } from "mongodb";
import { productModel } from "../dao/models/product.model.js";
import { PaginationParameters } from "mongoose-paginate-v2";

const router = Router();

router.get('/products', async (req, res) => {
    const query = req.query.query;
    const sort = req.query.sort;
    productModel.paginate(...new PaginationParameters(req).get()).then((result) => {
        const {docs,hasPrevPage,hasNextPage,nextPage,prevPage, limit} = result;
        const products = JSON.parse(JSON.stringify(docs));
        res.render('products', {title : 'Productos', style:'styles.css', products, hasPrevPage, hasNextPage, prevPage, nextPage, limit, query, sort})
    });
});

router.get('/chat', (req , res) => {
    res.render('chat',{title: 'chat', style:'styles.css'} )
})

router.get('/carts/:cid', async (req , res) => {
    const idCart = req.params.cid;
    const carrito = await cartModel.findOne({_id : new ObjectId(idCart)}).populate({
        path:'products.product',
        model:'products'
    });
    const cartProducts = carrito.toJSON();
    res.render('cart',{title: 'Carrito', style:'styles.css', carrito: cartProducts.products})
})

export default router;

