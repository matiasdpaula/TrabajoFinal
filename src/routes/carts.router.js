import { Router } from "express";
import { getAllCarts , getCartById , createAndAddProduct , emptyCart , deleteProduct , updateProduct , updateProducts , createCart, addProductToCart } from "../controllers/carts.controller.js";

const router = Router();

router.get('/', getAllCarts);
router.get('/:cid', getCartById);
router.post('/', createCart);
router.post('/addToCart/:pid', createAndAddProduct);
router.post('/:cid/product/:pid', addProductToCart);
router.delete('/:cid/product/:pid', deleteProduct);
router.delete('/:cid', emptyCart);
router.put('/:cid', updateProducts);
router.put('/:cid/product/:pid', updateProduct);

export default router;