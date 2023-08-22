import { Router } from "express";
import { getAllCarts , getCartById , addProduct , emptyCart , deleteProduct , updateProduct , endShop, updateProducts , createCart, addProductToCart } from "../controllers/carts.controller.js";

const router = Router();

router.get('/', getAllCarts);
router.get('/:cid', getCartById);
router.post('/', createCart);
router.post('/addToCart', addProduct);
router.post('/:cid/product/:pid', addProductToCart);
router.delete('/:cid/product/:pid', deleteProduct);
router.delete('/:cid', emptyCart);
router.put('/:cid', updateProducts);
router.put('/:cid/product/:pid', updateProduct);
router.post('/:cid/purchase', endShop);

export default router;