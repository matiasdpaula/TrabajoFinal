import { Router } from "express";
import { getAllProducts , getProductById , createProduct , updateProduct , deleteProduct } from "../controllers/product.controller.js";

const router = Router();

router.get('/', getAllProducts);
router.post('/', createProduct);
router.get('/:pid', getProductById);
router.put('/:pid', updateProduct);
router.delete('/:pid', deleteProduct);

export default router;